import { Fund } from "./Fund";


export interface Budget {
  id?: number; // Optional because it will be generated on the server
  startDate: Date; // ISO date string
  endDate: Date; // ISO date string
  description: string;
  totalAmount: number;
  makeBudgetActive: boolean;
  lockBudget: boolean;
  //funds?: Fund[]; // Optional, in case funds are not always provided
}
