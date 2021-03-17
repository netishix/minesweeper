import { Cell } from "./cell.class";
import { JSONBoard } from "../interfaces/storage/json-board.interface";
import { EventEmitter } from "@angular/core";

export class Board {

  public size!: {x: number, y: number};
  public bombs!: number;
  public bombsLeft!: number
  public grid!: Cell[][];
  public onOpenCell!: EventEmitter<boolean>
  public onFinish!: EventEmitter<boolean>

  constructor() {}

  public init(settings: {size: Board['size'], bombs: Board['bombs']}): void {
    this.onOpenCell = new EventEmitter<boolean>();
    this.onFinish = new EventEmitter<boolean>();
    this.grid = [];
    this.size = settings.size;
    this.bombs = settings.bombs;
    this.bombsLeft = settings.bombs;
    this.createGrid(settings.size.x, settings.size.y);
    this.setupCells();
  }

  public static createFromJSON(jsonBoard: JSONBoard): Board {
    const board = new Board();
    board.onOpenCell = new EventEmitter<boolean>();
    board.onFinish = new EventEmitter<boolean>();
    board.size = jsonBoard.size;
    board.bombs = jsonBoard.bombs;
    board.bombsLeft = jsonBoard.bombsLeft;
    const grid: Board['grid'] = [];
    jsonBoard.grid.forEach((row, rowIndex) => {
      grid[rowIndex] = [];
      row.forEach((jsonCell, colIndex) => {
        grid[rowIndex][colIndex] = Cell.createFromJSON(jsonCell);
      });
    })
    board.grid = grid;
    return board;
  }

  public toJSON(): JSONBoard {
    const board: any = {...this};
    // Delete event emitters
    delete board.onOpenCell;
    delete board.onFinish;
    return board;
  }

  public createGrid(x: number, y: number): void {
    for (let row = 0; row < y; row += 1 ) {
      this.grid[row] = [];
      for (let col = 0; col < x; col += 1) {
        const cell = new Cell();
        const coordinate = {x: col, y: row};
        cell.init(coordinate);
        this.grid[row][col] = cell;
      }
    }
  }

  public setupCells(): void {
    this.placeBombs();
    this.calculateNearbyBombs();
  }

  public placeBombs(): void {
    for (let i = 0; i < this.bombs; i += 1) {
      let placed = false;
      while (!placed) {
        const randomX = Board.getRandomInt(0, this.size.x - 1);
        const randomY = Board.getRandomInt(0, this.size.y - 1);
        const randomCell = this.grid[randomY][randomX];
        if (!randomCell.hasBomb) {
          randomCell.hasBomb = true;
          placed = true;
        }
      }
    }
  }

  public calculateNearbyBombs(): void {
    this.grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const neighborCells = this.getNeighborCells(cell);
        const neighborCellsWithBombs = neighborCells.filter((neighborCell) => neighborCell.hasBomb);
        this.grid[rowIndex][colIndex].nearbyBombs = neighborCellsWithBombs.length;
      });
    })
  }

  public getNeighborCells(cell: Cell): Cell[] {
    const neighborCells: Cell[] = [];
    const xMinBound = 0;
    const xMaxBound = this.grid[0].length - 1;
    const yMinBound = 0;
    const yMaxBound = this.grid.length - 1;
    for (let y = cell.coordinate.y - 1; y <= cell.coordinate.y + 1; y += 1) {
      for (let x = cell.coordinate.x - 1; x <= cell.coordinate.x + 1; x += 1) {
        if ((y >= yMinBound && y <= yMaxBound) && (x >= xMinBound && x <= xMaxBound)) {
          const neighborCell: Cell = this.grid[y][x];
          neighborCells.push(neighborCell)
        }
      }
    }
    const idx = neighborCells.indexOf(cell);
    neighborCells.splice(idx, 1);
    return neighborCells;
  }

  public onMove(type: 'open' | 'guess', cell: Cell): void {
    if (cell.hidden) {
      if (type === 'open') {
        this.openCell(cell);
      } else if (type === 'guess') {
        this.guessCell(cell);
      }
    }
  }

  public openCell(cell: Cell): void {
    if (cell.hidden && cell.guess === null) {
      this.onOpenCell.emit();
      cell.hidden = false;
      if (cell.hasBomb) {
        cell.bombExploded = true;
        this.finish(false);
      } else if (cell.nearbyBombs === 0) {
        const neighborCells = this.getNeighborCells(cell);
        neighborCells.forEach((neighborCell) => {
          this.openCell(neighborCell);
        });
      }
      if (this.hasWon()) {
        this.finish(true);
      }
    }
  }

  public guessCell(cell: Cell): void {
    switch (cell.guess) {
      case null:
        cell.guess = 'flag';
        this.bombsLeft -= 1;
        break;
      case 'flag':
        this.bombsLeft += 1;
        cell.guess = 'question';
        break;
      case 'question':
        cell.guess = null;
        break;
      default:
        cell.guess = null;
        break
    }
  }

  public revealBoard(): void {
    this.grid.forEach((row) => {
      row.forEach((cell) => {
        cell.hidden = false;
      })
    });
  }

  public hasWon(): boolean {
    const allCells: Cell[] = [];
    this.grid.forEach((row) => {
      row.forEach((cell) => {
        allCells.push(cell);
      });
    });
    const visibleCells = allCells.filter((cell) => !cell.hidden);
    const nonBombCells = allCells.filter((cell) => !cell.hasBomb);
    return visibleCells.length === nonBombCells.length;
  }

  public finish(won: boolean): void {
    this.revealBoard();
    this.onFinish.emit(won);
  }

  public static getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
