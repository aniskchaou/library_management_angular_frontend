import { Order } from "./Order";
import { Vendor } from "./Vendor";

export interface Contract {
  id?: number;
  contractNumber: string;
  startDate: Date; // Use `Date` type for LocalDate
  endDate: Date;   // Use `Date` type for LocalDate
  vendor: Vendor; // Foreign key representing the Vendor entity
  orders?: Order; // Optional array of related orders
  terms?: string; // Optional field for terms and conditions
}
