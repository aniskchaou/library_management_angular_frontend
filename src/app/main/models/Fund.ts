import { Budget } from "./Budget";

export interface Fund {
  id?: number;
  fundCode: string;
  fundName: string;
  amount: number;
  warningAtPercentage: number;
  warningAtAmount: number;
  owner: string;
  notes?: string;
  budget: Budget; // This represents the relationship with the Budget entity
}

  