import { JSONCell } from "./json-cell.interface";

export interface JSONBoard {
  size: {x: number, y: number};
  bombs: number;
  bombsLeft: number
  grid: JSONCell[][];
}
