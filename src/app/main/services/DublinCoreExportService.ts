import { Injectable } from '@angular/core';
import CatalogItem from '../models/Book';

/**
 * Dublin Core Export Service
 *
 * Converts CatalogItem records to Dublin Core metadata in both XML (OAI-PMH
 * compatible) and JSON-LD formats, enabling data exchange with other libraries
 * and institutional repositories that implement the Dublin Core standard.
 *
 * Dublin Core 15 elements (DCMI Metadata Terms):
 *   title, creator, subject, description, publisher, contributor, date,
 *   type, format, identifier, source, language, relation, coverage, rights
 */
@Injectable({ providedIn: 'root' })
export class DublinCoreExportService {

  // ─── Single-item export ──────────────────────────────────────────────────

  toXml(item: CatalogItem): string {
    const e = (tag: string, value: string) =>
      value ? `  <dc:${tag}>${this.escape(value)}</dc:${tag}>\n` : '';

    const subjects = [
      item.marc_650,
      item.marc_651,
      item.category?.categoryName
    ].filter(Boolean).join(', ');

    const contributors = [item.marc_700, item.editor].filter(Boolean).join('; ');

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<oai_dc:dc\n`;
    xml += `  xmlns:oai_dc="http://www.openarchives.org/OAI/2.0/oai_dc/"\n`;
    xml += `  xmlns:dc="http://purl.org/dc/elements/1.1/"\n`;
    xml += `  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n`;
    xml += `  xsi:schemaLocation="http://www.openarchives.org/OAI/2.0/oai_dc/ http://www.openarchives.org/OAI/2.0/oai_dc.xsd">\n`;
    xml += e('title', this.fullTitle(item));
    xml += e('creator', item.writer?.name);
    xml += e('subject', subjects);
    xml += e('description', item.marc_520 || item.notes);
    xml += e('publisher', item.publisher?.name);
    xml += e('contributor', contributors);
    xml += e('date', item.publishing_year || item.edition_year);
    xml += e('type', this.dcType(item));
    xml += e('format', item.physical_description?.toString());
    xml += e('identifier', this.identifier(item));
    xml += e('source', item.dc_source || item.source_details);
    xml += e('language', item.marc_041 || 'und');
    xml += e('relation', item.dc_relation);
    xml += e('coverage', item.dc_coverage || item.publication_place);
    xml += e('rights', item.dc_rights);
    xml += `</oai_dc:dc>`;
    return xml;
  }

  toJsonLd(item: CatalogItem): object {
    const subjects = [item.marc_650, item.marc_651, item.category?.categoryName]
      .filter(Boolean);

    return {
      '@context': 'http://purl.org/dc/terms/',
      '@type': 'BibliographicResource',
      'title': this.fullTitle(item),
      'creator': item.writer?.name,
      'subject': subjects,
      'description': item.marc_520 || item.notes,
      'publisher': item.publisher?.name,
      'contributor': [item.marc_700, item.editor].filter(Boolean),
      'date': item.publishing_year || item.edition_year,
      'type': this.dcType(item),
      'format': item.physical_description,
      'identifier': this.identifier(item),
      'source': item.dc_source || item.source_details,
      'language': item.marc_041 || 'und',
      'relation': item.dc_relation,
      'coverage': item.dc_coverage || item.publication_place,
      'rights': item.dc_rights,
      // extended: MARC-derived
      'marc:ddc': item.marc_082,
      'marc:callNumber': item.call_no,
      'marc:series': item.marc_490 || item.series,
      'marc:varyingTitle': item.marc_246,
    };
  }

  // ─── Batch export ────────────────────────────────────────────────────────

  toBatchXml(items: CatalogItem[]): string {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<records>\n`;
    items.forEach(item => {
      xml += this.toXml(item).replace('<?xml version="1.0" encoding="UTF-8"?>\n', '') + '\n';
    });
    xml += `</records>`;
    return xml;
  }

  toBatchJsonLd(items: CatalogItem[]): object {
    return {
      '@context': 'http://purl.org/dc/terms/',
      '@graph': items.map(i => this.toJsonLd(i))
    };
  }

  // ─── Browser download helpers ────────────────────────────────────────────

  downloadXml(items: CatalogItem[], filename = 'dublin-core-export.xml'): void {
    const content = items.length === 1 ? this.toXml(items[0]) : this.toBatchXml(items);
    this.triggerDownload(content, 'application/xml', filename);
  }

  downloadJson(items: CatalogItem[], filename = 'dublin-core-export.json'): void {
    const obj = items.length === 1 ? this.toJsonLd(items[0]) : this.toBatchJsonLd(items);
    this.triggerDownload(JSON.stringify(obj, null, 2), 'application/json', filename);
  }

  // ─── MARC to text helpers for display ───────────────────────────────────

  buildMarcText(item: CatalogItem): string[] {
    const fields: string[] = [];
    const f = (tag: string, label: string, value: string) => {
      if (value) fields.push(`${tag}  ${label}: ${value}`);
    };
    f('LDR', 'Leader', item.marc_leader);
    f('001', 'Control Number', item.marc_001 || String(item.id));
    f('020', 'ISBN', item.isbn);
    f('041', 'Language', item.marc_041);
    f('082', 'DDC Number', item.marc_082 ? `${item.marc_082} (ed. ${item.marc_082_ed || '23'})` : '');
    f('100', 'Main Entry – Author', item.writer?.name);
    f('245', 'Title', `${this.fullTitle(item)}${item.marc_245_c ? ' / ' + item.marc_245_c : ''}`);
    f('246', 'Varying Title', item.marc_246);
    f('250', 'Edition', item.edition);
    f('264', 'Publication', `${item.publication_place || ''} : ${item.publisher?.name || ''}, ${item.publishing_year || ''}`);
    f('300', 'Physical Desc.', `${item.number_of_pages || ''} pages${item.size ? ' ; ' + item.size : ''}`);
    f('490', 'Series', item.marc_490 || item.series);
    f('520', 'Summary', item.marc_520);
    f('650', 'Subject (Topical)', item.marc_650);
    f('651', 'Subject (Geographic)', item.marc_651);
    f('700', 'Added Entry', item.marc_700);
    f('856', 'Electronic Access', item.marc_856 || item.link);
    return fields;
  }

  // ─── Private helpers ─────────────────────────────────────────────────────

  private fullTitle(item: CatalogItem): string {
    return item.subtitle ? `${item.title} : ${item.subtitle}` : item.title;
  }

  private identifier(item: CatalogItem): string {
    if (item.isbn) return `ISBN: ${item.isbn}`;
    if (item.marc_001) return `Control No.: ${item.marc_001}`;
    return `ID: ${item.id}`;
  }

  private dcType(item: CatalogItem): string {
    const mt = item.mediaType?.name?.toLowerCase() || '';
    if (mt.includes('ebook') || mt.includes('digital')) return 'InteractiveResource';
    if (mt.includes('video') || mt.includes('dvd')) return 'MovingImage';
    if (mt.includes('audio') || mt.includes('cd')) return 'Sound';
    if (mt.includes('map')) return 'Image';
    if (mt.includes('journal') || mt.includes('periodical')) return 'Collection';
    return 'Text';
  }

  private escape(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  private triggerDownload(content: string, mimeType: string, filename: string): void {
    const blob = new Blob([content], { type: `${mimeType};charset=utf-8;` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
}
