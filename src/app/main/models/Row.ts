import { Department } from "./Department";
import { Shelf } from "./Shelf";

export interface Row {
  id?: number; // Optional for auto-generated IDs
  rowName: string;
  position: number;
  shelf?: Shelf;
  department?: Department;
}
