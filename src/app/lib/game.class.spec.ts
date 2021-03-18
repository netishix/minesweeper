import { Game } from "./game.class";
import { Board } from "./board.class";
import { JSONGame } from "../interfaces/storage/json-game.interface";

describe('Game', () => {

  let game: Game;

  beforeEach( () => {
    game = new Game();
  });

  describe('Game creation and initialization', () => {

    describe('constructor', () => {
      it('should create a Game object', () => {
        expect(typeof game.id).toEqual('undefined');
        expect(typeof game.board).toEqual('undefined');
        expect(typeof game.settings).toEqual('undefined');
        expect(typeof game.stats).toEqual('undefined');
      });
    });

    describe('init', () => {
      it('should initialize a Game given some settings', () => {
        const initBoardSpy = spyOn(Board.prototype, 'init');
        initBoardSpy.and.returnValue();
        const settings: Game['settings'] = {
          xCells: 10,
          yCells: 10,
          totalBombs: 15,
          level: 'easy',
        };
        game.init(settings);
        expect(game.id).toBeTruthy();
        expect(game.settings).toEqual(settings);
        expect(game.board).toBeTruthy();
        expect(initBoardSpy).toHaveBeenCalledTimes(1);
        const boardSettings = {
          size: {
            x: game.settings.xCells,
            y: game.settings.yCells
          },
          bombs: game.settings.totalBombs,
        };
        expect(initBoardSpy).toHaveBeenCalledWith(boardSettings);
        expect(game.stats).toBeTruthy();
        expect(game.stats.finished).toEqual(false);
        expect(game.stats.endDate).toEqual(null);
        expect(game.stats.startDate).toBeTruthy();
        expect(game.stats.timeSpent).toEqual(0);
        expect(game.stats.won).toEqual(false);
        // Reset spy
        initBoardSpy.calls.reset();
      });
    });

    describe('createFromJSON', () => {
      it('should create a Game from a JSONGame object', () => {
        const createFromJSONBoardSpy = spyOn(Board, 'createFromJSON');
        const boardMock = new Board();
        createFromJSONBoardSpy.and.returnValue(boardMock);
        const jsonGame: JSONGame = {
          board: {
            bombs: 10,
            bombsLeft: 4,
            grid: [],
            size: {x: 10, y: 10}
          },
          id: '1234',
          settings: {
            level: 'easy',
            totalBombs: 10,
            xCells: 10, yCells: 10
          },
          stats: {
            endDate: null,
            finished: false,
            startDate: new Date().toISOString(),
            timeSpent: 25,
            won: false
          }
        };
        const createdGame = Game.createFromJSON(jsonGame);
        expect(createdGame.id).toEqual(jsonGame.id);
        expect(createdGame.settings).toEqual(jsonGame.settings);
        expect(createdGame.board).toEqual(boardMock);
        expect(createFromJSONBoardSpy).toHaveBeenCalledTimes(1);
        expect(createFromJSONBoardSpy).toHaveBeenCalledWith(jsonGame.board);
        expect(createdGame.stats).toEqual(jsonGame.stats);
        // Reset spy
        createFromJSONBoardSpy.calls.reset();
      });
    });

  });


  describe('Time spent in the game', () => {
    beforeEach(() => {
      const gameSettings: Game['settings'] = {
        xCells: 10,
        yCells: 10,
        totalBombs: 15,
        level: 'easy',
      };
      game.init(gameSettings);
    });

    describe('recordTime', () => {
      it('should record the time spent in the game', async () => {
        game.recordTime();
        // wait 3 seconds before making assertions
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(true);
          }, 3000)
        });
        expect(game.stats.timeSpent).toEqual(3);
      });
    });

    describe('stopRecordingTime', () => {
      it('should stop recording the time spent in the game', async () => {
        game.recordTime();
        // stop recording after 3 seconds
        setTimeout(() => {
          game.stopRecordingTime();
        }, 3000);

        // wait 6 seconds before making assertions
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(true);
          }, 6000)
        });
        expect(game.stats.timeSpent).toEqual(3);
      }, 7000);
    });
  });
});
