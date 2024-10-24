import { Department } from "./Department";

export interface Shelf {
    id?: number; // Optional, for auto-generated IDs
    shelfName: string;
    shelfCode: string;
    location: string;
    capacity: number;
    material: string;
    color: string;
    department?: Department; // Optional, if linked to Department
  }
  