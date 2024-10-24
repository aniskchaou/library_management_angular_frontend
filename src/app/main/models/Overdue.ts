import CatalogItem from "./Book";

export interface Overdue {
  id: number;
  catalogItem: CatalogItem
  dueDate: Date;
  returnDate?: Date;
  fineAmount: number;
  }
  