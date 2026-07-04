import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import CatalogItem from 'src/app/main/models/Book';
import { DublinCoreExportService } from 'src/app/main/services/DublinCoreExportService';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';
import { MarcEditorComponent } from '../marc-editor/marc-editor.component';

@Component({
  selector: 'app-cataloging',
  templateUrl: './cataloging.component.html',
  styleUrls: ['./cataloging.component.css'],
  standalone: false
})
export class CatalogingComponent extends URLLoader implements OnInit {
  selectedTabIndex = 0;
  loading = false;

  // ─── MARC / Catalog Items tab ────────────────────────────────────────────
  allItems: CatalogItem[] = [];
  filteredItems: CatalogItem[] = [];
  searchQuery = '';

  // ─── DDC tab ─────────────────────────────────────────────────────────────
  ddcItems: CatalogItem[] = [];
  ddcFilter = '';
  ddcFilteredItems: CatalogItem[] = [];

  // ─── Dublin Core export tab ───────────────────────────────────────────────
  dcItems: CatalogItem[] = [];
  dcSelected: CatalogItem[] = [];
  dcSearchQuery = '';
  dcFilteredItems: CatalogItem[] = [];

  constructor(
    private httpService: HTTPService,
    private modalService: NgbModal,
    private dcExport: DublinCoreExportService
  ) {
    super();
  }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.httpService.getAll(CONFIG.URL_BASE + '/book/all').subscribe(
      (data: CatalogItem[]) => {
        this.allItems = data;
        this.filteredItems = data;
        this.ddcItems = data;
        this.ddcFilteredItems = data;
        this.dcItems = data;
        this.dcFilteredItems = data;
        this.loading = false;
      },
      (err: HttpErrorResponse) => {
        super.show('Error', err.message, 'warning');
        this.loading = false;
      }
    );
  }

  // ─── MARC 21 tab ─────────────────────────────────────────────────────────

  searchCatalog(): void {
    const q = this.searchQuery.toLowerCase();
    this.filteredItems = q
      ? this.allItems.filter(i =>
          i.title?.toLowerCase().includes(q) ||
          i.isbn?.toLowerCase().includes(q) ||
          i.writer?.name?.toLowerCase().includes(q) ||
          i.marc_082?.includes(q) ||
          i.marc_001?.toLowerCase().includes(q)
        )
      : [...this.allItems];
  }

  openMarcEditor(item: CatalogItem): void {
    const modalRef = this.modalService.open(MarcEditorComponent, {
      size: 'xl',
      centered: true,
      windowClass: 'll-modal-xl'
    });
    modalRef.componentInstance.item = { ...item };
    modalRef.result.then((updated: CatalogItem) => {
      if (updated) {
        const idx = this.allItems.findIndex(i => i.id === updated.id);
        if (idx !== -1) this.allItems[idx] = updated;
        this.searchCatalog();
      }
    }).catch(() => {});
  }

  marcCompleteness(item: CatalogItem): number {
    const fields = [
      item.isbn, item.title, item.writer?.name, item.publisher?.name,
      item.publishing_year, item.marc_041, item.marc_082,
      item.marc_520 || item.notes, item.marc_650, item.call_no
    ];
    const filled = fields.filter(Boolean).length;
    return Math.round((filled / fields.length) * 100);
  }

  // ─── DDC tab ─────────────────────────────────────────────────────────────

  searchDdc(): void {
    const q = this.ddcFilter.toLowerCase();
    this.ddcFilteredItems = q
      ? this.ddcItems.filter(i =>
          i.marc_082?.includes(q) ||
          i.title?.toLowerCase().includes(q) ||
          i.call_no?.toLowerCase().includes(q)
        )
      : [...this.ddcItems];
  }

  getDdcClass(ddc: string): string {
    if (!ddc) return 'Unclassified';
    const n = parseInt(ddc, 10);
    if (n < 100) return '000 – General Works';
    if (n < 200) return '100 – Philosophy';
    if (n < 300) return '200 – Religion';
    if (n < 400) return '300 – Social Sciences';
    if (n < 500) return '400 – Language';
    if (n < 600) return '500 – Natural Sciences';
    if (n < 700) return '600 – Technology';
    if (n < 800) return '700 – Arts';
    if (n < 900) return '800 – Literature';
    return '900 – History & Geography';
  }

  // ─── Dublin Core export tab ───────────────────────────────────────────────

  searchDcItems(): void {
    const q = this.dcSearchQuery.toLowerCase();
    this.dcFilteredItems = q
      ? this.dcItems.filter(i =>
          i.title?.toLowerCase().includes(q) || i.isbn?.toLowerCase().includes(q)
        )
      : [...this.dcItems];
  }

  isDcSelected(item: CatalogItem): boolean {
    return this.dcSelected.some(s => s.id === item.id);
  }

  toggleDcSelect(item: CatalogItem): void {
    if (this.isDcSelected(item)) {
      this.dcSelected = this.dcSelected.filter(s => s.id !== item.id);
    } else {
      this.dcSelected.push(item);
    }
  }

  selectAllDc(): void {
    this.dcSelected = [...this.dcFilteredItems];
  }

  clearDcSelection(): void {
    this.dcSelected = [];
  }

  exportSelectedXml(): void {
    if (!this.dcSelected.length) {
      super.show('Warning', 'Select at least one item to export', 'warning');
      return;
    }
    this.dcExport.downloadXml(this.dcSelected, 'dublin-core-export.xml');
  }

  exportSelectedJson(): void {
    if (!this.dcSelected.length) {
      super.show('Warning', 'Select at least one item to export', 'warning');
      return;
    }
    this.dcExport.downloadJson(this.dcSelected, 'dublin-core-export.json');
  }

  exportAllXml(): void {
    this.dcExport.downloadXml(this.dcItems, 'dublin-core-all.xml');
  }

  dcPreview(item: CatalogItem): string {
    return this.dcExport.toXml(item);
  }

  // ─── DDC summary cards ────────────────────────────────────────────────────

  readonly ddcSummary = [
    { number: '0', caption: 'General' },
    { number: '1', caption: 'Philosophy' },
    { number: '2', caption: 'Religion' },
    { number: '3', caption: 'Social Sci.' },
    { number: '4', caption: 'Language' },
    { number: '5', caption: 'Sciences' },
    { number: '6', caption: 'Technology' },
    { number: '7', caption: 'Arts' },
    { number: '8', caption: 'Literature' },
    { number: '9', caption: 'History' },
  ];

  getDdcClassCount(prefix: string): number {
    return this.allItems.filter(i => i.marc_082?.startsWith(prefix)).length;
  }

  // ─── Reference tables (displayed in expansion panels) ─────────────────────

  readonly marcFieldRef = [
    { tag: 'LDR', name: 'Leader',                 desc: '24-char fixed record metadata (type, status, encoding level)', indicator: '–/–' },
    { tag: '001', name: 'Control Number',          desc: 'Unique record identifier assigned by the library',              indicator: '–/–' },
    { tag: '003', name: 'Control Number ID',       desc: 'MARC organization code for the 001 issuer',                    indicator: '–/–' },
    { tag: '005', name: 'Date/Time Transaction',   desc: 'Date and time of the latest record change (YYYYMMDDHHMMSS.F)', indicator: '–/–' },
    { tag: '008', name: 'Fixed-Length Data',       desc: '40-char coded data: language, country, dates, audience, etc.', indicator: '–/–' },
    { tag: '020', name: 'ISBN',                    desc: 'International Standard Book Number with qualifier',            indicator: '–/–' },
    { tag: '041', name: 'Language Code',           desc: 'ISO 639-2 language of the text/summary (e.g. eng, vie)',       indicator: '0/–' },
    { tag: '050', name: 'LC Call Number',          desc: 'Library of Congress Classification call number',               indicator: '–/4' },
    { tag: '082', name: 'DDC Number',              desc: 'Dewey Decimal Classification number ($a number, $2 edition)',  indicator: '0/4' },
    { tag: '100', name: 'Main Entry – Author',     desc: 'Personal name: surname, forename (inverted form)',             indicator: '1/–' },
    { tag: '245', name: 'Title Statement',         desc: '$a title : $b subtitle / $c statement of responsibility',      indicator: '1/0' },
    { tag: '246', name: 'Varying Form of Title',   desc: 'Parallel title, abbreviated, or portion of title',            indicator: '3/–' },
    { tag: '250', name: 'Edition Statement',       desc: 'Edition/impression designation as found on the item',         indicator: '–/–' },
    { tag: '264', name: 'Production/Publication',  desc: '$a place : $b publisher/producer, $c date',                   indicator: '–/1' },
    { tag: '300', name: 'Physical Description',    desc: '$a pages : $b illustrations ; $c cm',                         indicator: '–/–' },
    { tag: '490', name: 'Series Statement',        desc: 'Series title and volume as transcribed from the item',        indicator: '0/–' },
    { tag: '520', name: 'Summary Note',            desc: 'Abstract, review, or annotation of the item',                 indicator: '–/–' },
    { tag: '650', name: 'Subject – Topical',       desc: 'LCSH or MARC 21VN topical subject heading',                   indicator: '–/7' },
    { tag: '651', name: 'Subject – Geographic',    desc: 'Geographic name used as subject heading',                     indicator: '–/7' },
    { tag: '700', name: 'Added Entry – Person',    desc: 'Co-author, editor, translator, illustrator name',             indicator: '1/–' },
    { tag: '856', name: 'Electronic Access',       desc: '$u URL of the electronic resource or related page',           indicator: '4/0' },
  ];

  readonly dcElementRef = [
    { element: 'title',       marc: '245$a,$b',  desc: 'Title and subtitle of the resource' },
    { element: 'creator',     marc: '100$a',     desc: 'Primary author or creator of the work' },
    { element: 'subject',     marc: '650$a, 651$a', desc: 'Topic or keywords (LCSH / MARC 21VN)' },
    { element: 'description', marc: '520$a',     desc: 'Abstract, summary or free-text description' },
    { element: 'publisher',   marc: '264$b',     desc: 'Entity responsible for publication' },
    { element: 'contributor', marc: '700$a',     desc: 'Co-author, editor, translator' },
    { element: 'date',        marc: '264$c',     desc: 'Date of publication or creation (ISO 8601)' },
    { element: 'type',        marc: 'LDR/06',    desc: 'Nature of the resource (Text, Image, Sound…)' },
    { element: 'format',      marc: '300$a,$c',  desc: 'Physical medium or digital format (MIME type)' },
    { element: 'identifier',  marc: '020$a / 001', desc: 'Unique identifier — ISBN, ISSN, URI, or DOI' },
    { element: 'source',      marc: '786$t',     desc: 'Resource from which this item is derived' },
    { element: 'language',    marc: '041$a',     desc: 'ISO 639-2 language code (e.g. eng, vie)' },
    { element: 'relation',    marc: '787$t',     desc: 'Related resource (title or URI)' },
    { element: 'coverage',    marc: '651$a / 500$a', desc: 'Spatial/temporal extent of the content' },
    { element: 'rights',      marc: '540$a',     desc: 'Copyright or license statement' },
  ];
}
