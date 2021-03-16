import { Injectable } from '@angular/core';
import { DatasourceConnector } from "../interfaces/datasource-connector.interface";
import { JSONGame } from "../interfaces/storage/json-game.interface";
import { Game } from "../lib/game.class";

const LOCAL_STORAGE_GAMES_KEY = 'games';
const LOCAL_STORAGE_SETTINGS_KEY = 'settings';

@Injectable({
  providedIn: 'root'
})
export class BrowserDatasourceService implements DatasourceConnector{
  public localstorage: Storage;
  constructor() {
    this.localstorage = localStorage;
    this.initializeLocalStorageVariables();
  }

  public initializeLocalStorageVariables() {
    const games = this.localstorage.getItem(LOCAL_STORAGE_GAMES_KEY);
    if (!games) {
      this.localstorage.setItem(LOCAL_STORAGE_GAMES_KEY, JSON.stringify([]));
    }
    const settings = this.localstorage.getItem(LOCAL_STORAGE_SETTINGS_KEY);
    if (!settings) {
      this.localstorage.setItem(LOCAL_STORAGE_SETTINGS_KEY, JSON.stringify({}));
    }
  }

  public async createGame(game: Game): Promise<void> {
    const localStorageGames = this.localstorage.getItem(LOCAL_STORAGE_GAMES_KEY)!;
    const games: JSONGame[] = JSON.parse(localStorageGames);
    games.push(game);
    this.localstorage.setItem(LOCAL_STORAGE_GAMES_KEY, JSON.stringify(games));
  }

  public async getGame(gameId: string): Promise<Game | null> {
    let targetGame;
    const localStorageGames = this.localstorage.getItem(LOCAL_STORAGE_GAMES_KEY)!;
    const jsonGames: JSONGame[] = JSON.parse(localStorageGames);
    const foundJSONGame = jsonGames.find((jg: JSONGame) => jg.id === gameId);
    targetGame = foundJSONGame ? Game.createFromJSON(foundJSONGame) : null;
    return targetGame;
  }

  public async updateGame(game: Game): Promise<void> {
    const localStorageGames = this.localstorage.getItem(LOCAL_STORAGE_GAMES_KEY)!;
    const jsonGames: JSONGame[] = JSON.parse(localStorageGames);
    const foundJSONGame = jsonGames.find((jg: JSONGame) => jg.id === game.id);
    if (!foundJSONGame) {
      throw new Error(`Cannot update game: The game with id ${game.id} does not exist`);
    }
    const idx = jsonGames.indexOf(foundJSONGame);
    jsonGames[idx] = game;
    this.localstorage.setItem(LOCAL_STORAGE_GAMES_KEY, JSON.stringify(jsonGames));
  }

  public async removeGame(gameId: string): Promise<void> {
    const localStorageGames = this.localstorage.getItem(LOCAL_STORAGE_GAMES_KEY)!;
    const jsonGames: JSONGame[] = JSON.parse(localStorageGames);
    const foundJSONGame = jsonGames.find((jg: JSONGame) => jg.id === gameId);
    if (!foundJSONGame) {
      throw new Error(`Cannot remove game: The game with id ${gameId} does not exist`);
    }
    const idx = jsonGames.indexOf(foundJSONGame);
    jsonGames.splice(idx, 1);
    this.localstorage.setItem(LOCAL_STORAGE_GAMES_KEY, JSON.stringify(jsonGames));
  }

  public async getGames(): Promise<Game[]> {
    const localStorageGames = this.localstorage.getItem(LOCAL_STORAGE_GAMES_KEY)!;
    const jsonGames: JSONGame[] = JSON.parse(localStorageGames);
    return jsonGames.map((jg) => Game.createFromJSON(jg));
  }

  public saveSettings(settings: any): Promise<void> {
    return Promise.resolve();
  }
}
