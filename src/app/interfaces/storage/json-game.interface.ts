import { JSONBoard } from "./json-board.interface";

export interface JSONGame {
   id: string;
   board: JSONBoard;
   settings: {
    xCells: number,
    yCells: number,
    totalBombs: number
    level: 'easy' | 'medium' | 'hard' | 'custom',
   };
   stats: {
    finished: boolean,
    startDate: string,
    endDate: string | null,
    timeSpent: number,
    won: boolean
  }
}
