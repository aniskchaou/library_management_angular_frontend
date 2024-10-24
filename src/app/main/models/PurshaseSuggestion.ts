import { Fund } from "./Fund";
import { MediaType } from "./MediaType";
import Publisher from "./Publisher";
import Writer from "./Writer";

export interface PurchaseSuggestion {
  id?: number;
  title: string;
  author: Writer; // Assuming Writer model exists
  copyrightDate: string; // Use ISO date format string
  isbnIssnOtherStandardNumber: string;
  publisher: Publisher; // Assuming Publisher model exists
  publicationPlace: string;
  collectionTitle?: string;
  mediaType: MediaType; // Assuming MediaType model exists
  reasonForSuggestion: string;
  notes?: string;
  fund: Fund; // Assuming Fund model exists
  showInactive: boolean;
  copies: number;
  currency: string;
  price: number;
  total: number;
  }
  