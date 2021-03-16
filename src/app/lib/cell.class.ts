import {JSONCell} from "../interfaces/storage/json-cell.interface";

export type Guess = 'flag' | 'question' | null;
export type Coordinate = {x: number, y: number};

export class Cell {
  public coordinate!: Coordinate;
  public hidden!: boolean;
  public hasBomb!: boolean;
  public bombExploded!: boolean;
  public nearbyBombs!: number;
  public guess!: Guess;

  constructor() {}

  public init(coordinate: Coordinate): void {
    this.coordinate = coordinate;
    this.hidden = true;
    this.hasBomb = false
    this.bombExploded = false;
    this.nearbyBombs = 0;
    this.guess = null;
  }

  public static createFromJSON(jsonCell: JSONCell): Cell {
    const cell = new Cell();
    cell.coordinate = jsonCell.coordinate;
    cell.hidden = jsonCell.hidden;
    cell.hasBomb = jsonCell.hasBomb;
    cell.bombExploded = jsonCell.bombExploded;
    cell.nearbyBombs = jsonCell.nearbyBombs;
    cell.guess = jsonCell.guess;
    return cell;
  }

}
