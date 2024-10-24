import { Contract } from "./Contract";
import { Invoice } from "./Invoice";
import { OrderItem } from "./OrderItem";
import { Vendor } from "./Vendor";


export interface Order {
  id?: number; // Optional because it will be generated on the server
  orderNumber: string;
  orderDate: string; // ISO date string
  vendor: Vendor;
  items?: OrderItem[]; // Optional in case items are not always provided
  totalCost: number;
  status: string;
  notes?: string; // Optional
  contract: Contract;
  invoice: Invoice;
}
