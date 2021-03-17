import { Board } from './board.class';
import { v1 as uuidv1 } from "uuid";
import {JSONGame} from "../interfaces/storage/json-game.interface";

export class Game {

  public id!: string;
  public board!: Board;
  public settings!: {
    xCells: number,
    yCells: number,
    totalBombs: number
    level: 'easy' | 'medium' | 'hard' | 'custom',
  };
  public stats!: {
    finished: boolean,
    startDate: string,
    endDate: string | null,
    timeSpent: number,
    won: boolean
  }
  private recordingTimeInterval: any;

  constructor() {}

  public init(settings: Game['settings']): void {
    this.id = uuidv1()
    this.settings = settings;
    const boardSettings = {
      size: {
        x: this.settings.xCells,
        y: this.settings.yCells
      },
      bombs: this.settings.totalBombs,
    };
    this.board = new Board();
    this.board.init(boardSettings);
    this.stats = {
      finished: false,
      endDate: null,
      startDate: new Date().toISOString(),
      timeSpent: 0,
      won: false
    };
  }

  public static createFromJSON(jsonGame: JSONGame): Game {
    const game = new Game();
    game.id = jsonGame.id;
    game.settings = jsonGame.settings;
    game.stats = jsonGame.stats;
    game.board = Board.createFromJSON(jsonGame.board);
    return game;
  }

  public recordTime(): void {
    this.recordingTimeInterval = setInterval(() => {
      this.stats.timeSpent += 1;
    }, 1000)
  }

  public stopRecordingTime(): void {
    if (this.recordingTimeInterval) {
      clearInterval(this.recordingTimeInterval);
    }
  }

}
