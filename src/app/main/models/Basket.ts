import { Vendor } from "./Vendor";

export interface Basket {
    id?: number; // Optional, for auto-generated IDs
    basketName: string;
    billingPlace: string;
    deliveryPlace: string;
    vendor: Vendor; // Required, linked to Vendor
    internalNote: string;
    vendorNote: string;
    createItemsWhen: string; // Criteria for item creation
  }
  