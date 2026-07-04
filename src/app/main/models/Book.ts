import { Department } from "./Department";
import { Shelf } from "./Shelf";
import { Row } from "./Row";
import Category from "./Category";
import { MediaType } from "./MediaType";
import Publisher from "./Publisher";
import Writer from "./Writer";

export default class CatalogItem {
  id: number;
  isbn: string;
  title: string;
  subtitle: string;
  writer: Writer;
  edition: string;
  edition_year: string;
  number_of_books: string;
  photo: string;
  physical_form: string;
  physical_description: string;  // New field added for physical description
  publisher: Publisher;
  series: string;
  size: string;
  price: string;
  call_no: string;
  location: string;
  clue_page: string;
  editor: string;
  publishing_year: string;
  publication_place: string;
  number_of_pages: string;
  source_details: string;
  notes: string;
  pdf: string;
  link: string;
  category: Category;
  mediaType: MediaType;            // New field added for media type
  departement: Department;           // New field added for department
  shelf: Shelf;                // New field added for shelf location
  row: Row;                  // New field added for row location
  bookStatus: string;           // New field added for book status

  // ── MARC 21 Cataloging Fields ─────────────────────────────────────────────
  /** MARC Leader (LDR) — 24-char fixed metadata (record type, status, etc.) */
  marc_leader: string;
  /** 001 – Control Number assigned by the library */
  marc_001: string;
  /** 041$a – Language code (ISO 639-2, e.g. "eng", "vie", "fre") */
  marc_041: string;
  /** 082$a – Dewey Decimal Classification (DDC) number, e.g. "025.431" */
  marc_082: string;
  /** 082$2 – DDC edition used (e.g. "23", "22") */
  marc_082_ed: string;
  /** 245$c – Statement of responsibility ("by F. Scott Fitzgerald") */
  marc_245_c: string;
  /** 246$a – Varying/parallel form of title */
  marc_246: string;
  /** 490$a – Series statement */
  marc_490: string;
  /** 520$a – Summary / abstract */
  marc_520: string;
  /** 650$a – Topical subject terms (comma-separated, LCSH / MARC 21VN) */
  marc_650: string;
  /** 651$a – Geographic subject term */
  marc_651: string;
  /** 700$a – Added entry for co-author, editor, or translator */
  marc_700: string;
  /** 856$u – URL for electronic full-text or related resource */
  marc_856: string;

  // ── Dublin Core Extensions ────────────────────────────────────────────────
  /** dc:rights – Copyright or license statement */
  dc_rights: string;
  /** dc:coverage – Temporal or geographic coverage */
  dc_coverage: string;
  /** dc:relation – Related resource (title or identifier) */
  dc_relation: string;
  /** dc:source – Resource from which this item is derived */
  dc_source: string;
}
