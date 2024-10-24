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

}
