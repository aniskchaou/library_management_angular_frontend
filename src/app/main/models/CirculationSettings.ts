export interface CirculationSettings {
    finePerDay: number;
    maxFine: number;
    itemType: string; // Book, etc.
    loanPeriod: number; // In days
    renewalsAllowed: number;
    holdsAllowed: boolean;
  }
  