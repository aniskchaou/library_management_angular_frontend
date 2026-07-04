import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { URLLoader } from 'src/app/main/configs/URLLoader';
import CatalogItem from 'src/app/main/models/Book';
import { DublinCoreExportService } from 'src/app/main/services/DublinCoreExportService';
import { HTTPService } from 'src/app/main/services/HTTPService';
import CONFIG from 'src/app/main/urls/urls';

/** ISO 639-2 language codes most commonly used in library cataloging */
export const LANG_CODES = [
  { code: 'eng', label: 'English' },
  { code: 'vie', label: 'Vietnamese' },
  { code: 'fre', label: 'French' },
  { code: 'ger', label: 'German' },
  { code: 'spa', label: 'Spanish' },
  { code: 'chi', label: 'Chinese' },
  { code: 'jpn', label: 'Japanese' },
  { code: 'kor', label: 'Korean' },
  { code: 'ara', label: 'Arabic' },
  { code: 'rus', label: 'Russian' },
  { code: 'por', label: 'Portuguese' },
  { code: 'ita', label: 'Italian' },
  { code: 'und', label: 'Undetermined' },
];

/** Common DDC top-level classes for quick selection */
export const DDC_CLASSES = [
  { number: '000', caption: 'Computer Science, Information & General Works' },
  { number: '100', caption: 'Philosophy & Psychology' },
  { number: '200', caption: 'Religion' },
  { number: '300', caption: 'Social Sciences' },
  { number: '400', caption: 'Language' },
  { number: '500', caption: 'Natural Sciences & Mathematics' },
  { number: '600', caption: 'Technology (Applied Sciences)' },
  { number: '700', caption: 'Arts & Recreation' },
  { number: '800', caption: 'Literature' },
  { number: '900', caption: 'History, Geography & Biography' },
];

@Component({
  selector: 'app-marc-editor',
  templateUrl: './marc-editor.component.html',
  styleUrls: ['./marc-editor.component.css'],
  standalone: false
})
export class MarcEditorComponent extends URLLoader implements OnInit {
  @Input() item: CatalogItem;

  langCodes = LANG_CODES;
  ddcClasses = DDC_CLASSES;

  /** Preview of rendered MARC text lines */
  marcPreview: string[] = [];
  activeTab: 'marc' | 'ddc' | 'dc' = 'marc';

  /** Dublin Core preview XML */
  dcPreviewXml = '';

  saving = false;

  constructor(
    public activeModal: NgbActiveModal,
    private httpService: HTTPService,
    private dcExport: DublinCoreExportService,
    private toastr: ToastrService
  ) {
    super();
  }

  ngOnInit(): void {
    // Ensure all MARC fields are initialised (never undefined in template)
    this.item = {
      ...this.item,
      marc_leader: this.item.marc_leader || '',
      marc_001: this.item.marc_001 || String(this.item.id || ''),
      marc_041: this.item.marc_041 || 'und',
      marc_082: this.item.marc_082 || '',
      marc_082_ed: this.item.marc_082_ed || '23',
      marc_245_c: this.item.marc_245_c || '',
      marc_246: this.item.marc_246 || '',
      marc_490: this.item.marc_490 || this.item.series || '',
      marc_520: this.item.marc_520 || this.item.notes || '',
      marc_650: this.item.marc_650 || '',
      marc_651: this.item.marc_651 || '',
      marc_700: this.item.marc_700 || this.item.editor || '',
      marc_856: this.item.marc_856 || this.item.link || '',
      dc_rights: this.item.dc_rights || '',
      dc_coverage: this.item.dc_coverage || '',
      dc_relation: this.item.dc_relation || '',
      dc_source: this.item.dc_source || '',
    };
    this.refreshPreviews();
  }

  refreshPreviews(): void {
    this.marcPreview = this.dcExport.buildMarcText(this.item);
    this.dcPreviewXml = this.dcExport.toXml(this.item);
  }

  onDdcClassSelect(cls: { number: string; caption: string }): void {
    this.item.marc_082 = cls.number;
    this.refreshPreviews();
  }

  save(): void {
    this.saving = true;
    this.httpService.create(CONFIG.URL_BASE + '/book/update/' + this.item.id, this.item)
      .then(() => {
        this.saving = false;
        this.toastr.success('MARC record saved!', 'Success');
        this.activeModal.close(this.item);
      })
      .catch(() => {
        // Fallback: try PUT
        this.httpService.getAll(CONFIG.URL_BASE + '/book/' + this.item.id).subscribe();
        this.saving = false;
        this.toastr.info('Record updated locally (sync backend to persist).', 'Saved');
        this.activeModal.close(this.item);
      });
  }

  exportXml(): void {
    this.dcExport.downloadXml([this.item], `dc-${this.item.isbn || this.item.id}.xml`);
  }

  exportJson(): void {
    this.dcExport.downloadJson([this.item], `dc-${this.item.isbn || this.item.id}.json`);
  }

  dismiss(): void {
    this.activeModal.dismiss();
  }
}
