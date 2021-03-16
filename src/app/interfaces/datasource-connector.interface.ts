import {Game} from "../lib/game.class";

export interface DatasourceConnector {
  createGame: (game: Game) => Promise<void>,
  getGame: (gameId: string) => Promise<Game | null>,
  updateGame: (game: Game) => Promise<void>,
  removeGame: (gameId: string) => Promise<void>,
  getGames: () => Promise<Game[]>
  saveSettings: (settings: any) => Promise<void>,
}
