export interface Vendor {
    id?: number; // Optional, for auto-generated IDs
    name: string;
    address: string;
    phone: string;
    fax: string;
    website: string;
    accountNumber: string;
    position: string;
    alternativePhone: string;
    email: string;
    notes: string;
    invoicePricesRupees: number;
    invoicePricesDollar: number;
    invoicePricesEuro: number;
    taxNumberRegistered: boolean;
    invoicePricesIncludeTax: boolean;
    taxRate: number;
    discount: number;
    deliveryTime: string;
    additionalNotes: string;
  }
  