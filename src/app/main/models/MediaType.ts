export interface MediaType {
    id?: number; // Optional because it will be generated on the server
    imageUrl: string;
    name: string;
    code: string;
    parentCode: string;
    searchCategory: string;
    notForLoan: boolean;
    rentalCharge: number;
    dailyRentalCharge: number;
    hourlyRentalCharge: number;
    defaultReplacementCost: number;
    processingFee: number;
    checkinMessage: string;
    libraryLimitations: string;
  }
  