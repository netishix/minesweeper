import { Game } from "./game.class";
import { Board } from "./board.class";
import { JSONBoard } from "../interfaces/storage/json-board.interface";
import { Cell } from "./cell.class";
import { JSONCell } from "../interfaces/storage/json-cell.interface";

describe('Board', () => {

  let board: Board;

  beforeEach( () => {
    board = new Board();
  });

  describe('Board creation and initialization', () => {

    describe('constructor', () => {
      it('should create a Board object', () => {
        expect(typeof board.size).toEqual('undefined');
        expect(typeof board.bombs).toEqual('undefined');
        expect(typeof board.bombsLeft).toEqual('undefined');
        expect(typeof board.grid).toEqual('undefined');
        expect(typeof board.onOpenCell).toEqual('undefined');
        expect(typeof board.onFinish).toEqual('undefined');
      });
    });

    describe('init', () => {
      it('should initialize a board given some settings', () => {
        const createGridSpy = spyOn(board, 'createGrid');
        createGridSpy.and.returnValue();
        const fillGridSpy = spyOn(board,'fillGrid');
        fillGridSpy.and.returnValue();
        const boardSettings = {
          size: {
            x: 10,
            y: 10,
          },
          bombs: 15,
        };
        board.init(boardSettings);
        expect(board.onOpenCell).toBeTruthy();
        expect(board.onFinish).toBeTruthy();
        expect(board.size).toEqual(boardSettings.size);
        expect(board.bombs).toEqual(boardSettings.bombs);
        expect(board.bombsLeft).toEqual(boardSettings.bombs);
        expect(createGridSpy).toHaveBeenCalledTimes(1);
        expect(createGridSpy).toHaveBeenCalledWith(boardSettings.size.x, boardSettings.size.y);
        expect(fillGridSpy).toHaveBeenCalledTimes(1);
        // Reset spy
        createGridSpy.calls.reset();
        fillGridSpy.calls.reset();
      });
    });

    describe('createFromJSON', () => {
      it('should create a Board from a JSONBoard object', () => {
        const createFromJSONCellSpy = spyOn(Cell, 'createFromJSON');
        const cellMock = new Cell();
        createFromJSONCellSpy.and.returnValue(cellMock);
        const jsonCellMock: JSONCell = {
          bombExploded: false,
          coordinate: {x: 0, y: 0},
          guess: null,
          hasBomb: false,
          hidden: false,
          nearbyBombs: 0
        };
        const jsonBoard: JSONBoard = {
          bombs: 1,
          bombsLeft: 1,
          grid: [
            [
              jsonCellMock, jsonCellMock
            ],
            [
              jsonCellMock, jsonCellMock
            ]
          ],
          size: {
            x: 2,
            y: 2
          }
        };
        const createdBoard = Board.createFromJSON(jsonBoard);
        expect(createdBoard.onOpenCell).toBeTruthy();
        expect(createdBoard.onFinish).toBeTruthy();
        expect(createdBoard.size).toEqual(jsonBoard.size);
        expect(createdBoard.bombs).toEqual(jsonBoard.bombs);
        expect(createdBoard.bombsLeft).toEqual(jsonBoard.bombs);
        expect(createdBoard.grid.length).toEqual(jsonBoard.grid.length);
        createdBoard.grid.forEach((row, rowIndex) => {
          expect(row.length).toEqual(jsonBoard.grid[rowIndex].length);
        });
        const totalCells = jsonBoard.size.x * jsonBoard.size.y;
        expect(createFromJSONCellSpy).toHaveBeenCalledTimes(totalCells);
        expect(createFromJSONCellSpy).toHaveBeenCalledWith(jsonCellMock);
        // Reset spy
        createFromJSONCellSpy.calls.reset();
      });
    });


    describe('toJSON', () => {
      it('should convert a Board to a JSONBoard object', () => {
        const boardSettings = {
          size: {
            x: 10,
            y: 10,
          },
          bombs: 15,
        };
        board.init(boardSettings);
        const jsonBoard = board.toJSON();
        expect(jsonBoard.size).toEqual(board.size);
        expect(jsonBoard.bombs).toEqual(board.bombs);
        expect(jsonBoard.bombsLeft).toEqual(board.bombs);
        expect(jsonBoard.grid).toEqual(board.grid);
      });
    });
  });

  describe('Grid initialization', () => {
    beforeEach(() => {
      const boardSettings: {
        size: Board['size'];
        bombs: Board['bombs'];
      } = {
        size: {
          x: 10,
          y: 10,
        },
        bombs: 15,
      };
      board.init(boardSettings);
    });

    describe('createGrid', () => {
      it('should create the board grid given a specific size', () => {
        const cellInitSpy = spyOn(Cell.prototype, 'init');
        cellInitSpy.and.returnValue();
        board.createGrid(board.size.x, board.size.y);
        expect(board.grid.length).toEqual(board.size.y);
        board.grid.forEach((row, rowIndex) => {
          row.forEach((cell, colIndex) => {
            expect(cell).toBeTruthy();
            const coordinate = {x: colIndex, y: rowIndex};
            expect(cellInitSpy).toHaveBeenCalledWith(coordinate);
          })
        });
        const totalCells = board.size.x * board.size.y;
        expect(cellInitSpy).toHaveBeenCalledTimes(totalCells);
        // Reset spy
        cellInitSpy.calls.reset();
      });
    });

    describe('fillGrid', () => {
      it('should fill the grid by placing bombs and calculating nearby bombs for each cell', () => {
        const placeBombsSpy = spyOn(board, 'placeBombs');
        placeBombsSpy.and.returnValue();
        const calculateNearbyBombsSpy = spyOn(board, 'calculateNearbyBombs');
        calculateNearbyBombsSpy.and.returnValue();
        board.fillGrid();
        expect(placeBombsSpy).toHaveBeenCalledTimes(1);
        expect(calculateNearbyBombsSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('placeBombs', () => {

      beforeEach(() => {
        // Clear already placed bombs
        board.grid.forEach((row) => {
          row.forEach((cell) => {
            cell.hasBomb = false
          });
        });
      })

      it('should loop the grid and place bombs randomly on some cells', () => {
        board.bombs = 4;
        board.placeBombs();
        let totalPlacedBombs = 0;
        board.grid.forEach((row) => {
          row.forEach((cell) => {
            if (cell.hasBomb) {
              totalPlacedBombs += 1;
            }
          });
        });
        expect(board.bombs).toEqual(totalPlacedBombs);
      });

    });

    describe('calculateNearbyBombs', () => {

      it('should calculate nearby bombs for each cell in the grid', () => {
        const getNeighborCellsSpy = spyOn(board, 'getNeighborCells');
        const cellWithBombMock = new Cell();
        cellWithBombMock.hasBomb = true;
        const cellWithoutBombMock = new Cell();
        cellWithBombMock.hasBomb = false;
        const neighborCellsResultMock = [cellWithBombMock, cellWithoutBombMock];
        getNeighborCellsSpy.and.returnValue(neighborCellsResultMock);
        board.calculateNearbyBombs();
        board.grid.forEach((row) => {
          row.forEach((cell) => {
            expect(cell.nearbyBombs).toEqual(0);
            expect(getNeighborCellsSpy).toHaveBeenCalledWith(cell);
          });
        })
        expect(getNeighborCellsSpy).toHaveBeenCalledTimes(board.size.x * board.size.y);
      });

    });

    describe('getNeighborCells', () => {

      it('should get all the neighbor cells (including diagonals) for a given cell', () => {
        const targetCell = board.grid[0][0];
        const neighbors = board.getNeighborCells(targetCell);
        expect(neighbors.length).toEqual(3);
        expect(neighbors[0].coordinate).toEqual({x: 1, y: 0});
        expect(neighbors[1].coordinate).toEqual({x: 0, y: 1});
        expect(neighbors[2].coordinate).toEqual({x: 1, y: 1});
      });

    });

  });

  describe('Game moves',() => {

    beforeEach(() => {
      const boardSettings: {
        size: Board['size'];
        bombs: Board['bombs'];
      } = {
        size: {
          x: 10,
          y: 10,
        },
        bombs: 15,
      };
      board.init(boardSettings);
    });

    describe('onMove', () => {

      it('should open a cell', () => {
        const openCellSpy = spyOn(board, 'openCell');
        openCellSpy.and.returnValue();
        const guessCellSpy = spyOn(board, 'guessCell');
        guessCellSpy.and.returnValue();
        const cellMock = new Cell();
        cellMock.hidden = true;
        board.onMove('open', cellMock);
        expect(openCellSpy).toHaveBeenCalledTimes(1);
        expect(openCellSpy).toHaveBeenCalledWith(cellMock);
        expect(guessCellSpy).toHaveBeenCalledTimes(0);
      });

      it('should guess a cell', () => {
        const openCellSpy = spyOn(board, 'openCell');
        openCellSpy.and.returnValue();
        const guessCellSpy = spyOn(board, 'guessCell');
        guessCellSpy.and.returnValue();
        const cellMock = new Cell();
        cellMock.hidden = true;
        board.onMove('guess', cellMock);
        expect(guessCellSpy).toHaveBeenCalledTimes(1);
        expect(guessCellSpy).toHaveBeenCalledWith(cellMock);
        expect(openCellSpy).toHaveBeenCalledTimes(0);
      });

      it('should not make a move because the cell has already been revealed', () => {
        const openCellSpy = spyOn(board, 'openCell');
        openCellSpy.and.returnValue();
        const guessCellSpy = spyOn(board, 'guessCell');
        guessCellSpy.and.returnValue();
        const cellMock = new Cell();
        cellMock.hidden = false;
        board.onMove('guess', cellMock);
        expect(guessCellSpy).toHaveBeenCalledTimes(0);
        expect(openCellSpy).toHaveBeenCalledTimes(0);
      });

    });


    describe('openCell', () => {

      it('should open a cell that has a bomb and loose', () => {
        const onOpenCellEmitSpy = spyOn(board.onOpenCell, 'emit');
        onOpenCellEmitSpy.and.returnValue();
        const finishSpy = spyOn(board, 'finish');
        finishSpy.and.returnValue();
        const getNeighborCellsSpy = spyOn(board, 'getNeighborCells');
        const mockedNeighborCell = new Cell();
        mockedNeighborCell.guess = 'flag';
        getNeighborCellsSpy.and.returnValue([mockedNeighborCell]);
        const hasWonSpy = spyOn(board, 'hasWon');
        hasWonSpy.and.returnValue(false);
        const mockedCell: Cell = new Cell();
        mockedCell.hidden = true;
        mockedCell.guess = null;
        mockedCell.hasBomb = true;
        mockedCell.bombExploded = false;
        mockedCell.nearbyBombs = 0;
        board.openCell(mockedCell);
        expect(onOpenCellEmitSpy).toHaveBeenCalledTimes(1);
        expect(mockedCell.hidden).toEqual(false);
        expect(mockedCell.bombExploded).toEqual(true);
        expect(finishSpy).toHaveBeenCalledTimes(1);
        expect(finishSpy).toHaveBeenCalledWith(false);
        expect(getNeighborCellsSpy).toHaveBeenCalledTimes(0);
        expect(hasWonSpy).toHaveBeenCalledTimes(1);
      });

      it('should open a cell that hasn\'t got nearby bombs and win', () => {
        const onOpenCellEmitSpy = spyOn(board.onOpenCell, 'emit');
        onOpenCellEmitSpy.and.returnValue();
        const finishSpy = spyOn(board, 'finish');
        finishSpy.and.returnValue();
        const getNeighborCellsSpy = spyOn(board, 'getNeighborCells');
        const mockedNeighborCell = new Cell();
        mockedNeighborCell.hidden = true;
        mockedNeighborCell.guess = null;
        mockedNeighborCell.hasBomb = false;
        getNeighborCellsSpy.and.returnValue([mockedNeighborCell]);
        const hasWonSpy = spyOn(board, 'hasWon');
        hasWonSpy.and.returnValue(true);
        const openCellSpy = spyOn(board, 'openCell');
        openCellSpy.and.callThrough();
        const mockedCell: Cell = new Cell();
        mockedCell.guess = null;
        mockedCell.hidden = true;
        mockedCell.hasBomb = false;
        mockedCell.bombExploded = false;
        mockedCell.nearbyBombs = 0;
        board.openCell(mockedCell);
        expect(onOpenCellEmitSpy).toHaveBeenCalledTimes(2);
        expect(mockedCell.hidden).toEqual(false);
        expect(mockedCell.bombExploded).toEqual(false);
        expect(getNeighborCellsSpy).toHaveBeenCalledTimes(1);
        expect(getNeighborCellsSpy).toHaveBeenCalledWith(mockedCell);
        expect(openCellSpy).toHaveBeenCalledTimes(2);
        expect(openCellSpy).toHaveBeenCalledWith(mockedNeighborCell);
        expect(hasWonSpy).toHaveBeenCalled();
        expect(finishSpy).toHaveBeenCalledWith(true);
      });

      it('should not open a cell because it had a flag', () => {
        const onOpenCellEmitSpy = spyOn(board.onOpenCell, 'emit');
        onOpenCellEmitSpy.and.returnValue();
        const mockedCell: Cell = new Cell();
        mockedCell.guess = 'flag';
        mockedCell.hidden = true;
        board.openCell(mockedCell);
        expect(onOpenCellEmitSpy).toHaveBeenCalledTimes(0);
      });

      it('should not open a cell because it has already been revealed', () => {
        const onOpenCellEmitSpy = spyOn(board.onOpenCell, 'emit');
        onOpenCellEmitSpy.and.returnValue();
        const mockedCell: Cell = new Cell();
        mockedCell.guess = null;
        mockedCell.hidden = false;
        board.openCell(mockedCell);
        expect(onOpenCellEmitSpy).toHaveBeenCalledTimes(0);
      });

    });

    describe('guessCell', () => {

      it('should change the guess position from null to flag', () => {
        const mockedCell: Cell = new Cell();
        mockedCell.guess = null;
        const cachedLeftBombs = board.bombsLeft;
        board.guessCell(mockedCell);
        expect(mockedCell.guess === 'flag').toEqual(true);
        expect(board.bombsLeft).toEqual(cachedLeftBombs - 1);
      });

      it('should change the guess position from flag to question', () => {
        const mockedCell: Cell = new Cell();
        mockedCell.guess = 'flag';
        board.bombsLeft -= 1;
        const cachedLeftBombs = board.bombsLeft;
        board.guessCell(mockedCell);
        expect(mockedCell.guess).toEqual('question');
        expect(board.bombsLeft).toEqual(cachedLeftBombs + 1);
      });

      it('should change the guess position from question to null', () => {
        const mockedCell: Cell = new Cell();
        mockedCell.guess = 'question';
        board.bombsLeft -= 1;
        const cachedLeftBombs = board.bombsLeft;
        board.guessCell(mockedCell);
        expect(mockedCell.guess === null).toEqual(true);
        expect(board.bombsLeft).toEqual(cachedLeftBombs);
      });

    });

    describe('revealBombs', () => {

      it('should reveal the all the bombs in the board', () => {
        board.revealBombs();
        board.grid.forEach((row) => {
          row.forEach((cell) => {
            if (cell.hasBomb) {
              expect(cell.hidden).toEqual(false);
            }
          });
        });
      });

    });

    describe('hasWon', () => {

      it('should win the game because all the revealed cells are non-bomb cells', () => {
        board.grid.forEach((row) => {
          row.forEach((cell) => {
            if (!cell.hasBomb) {
              cell.hidden = false;
            }
          });
        });
        const hasWon = board.hasWon();
        expect(hasWon).toEqual(true);
      });

      it('should not win the game because there are still non-bomb cells to reveal', () => {
        const hasWon = board.hasWon();
        expect(hasWon).toEqual(false);
      });

    });

    describe('finish', () => {

      it('should finish a board', () => {
        const won = true;
        const revealBombsSpy = spyOn(board, 'revealBombs');
        revealBombsSpy.and.returnValue();
        const onFinishEmitSpy = spyOn(board.onFinish, 'emit');
        onFinishEmitSpy.and.returnValue();
        board.finish(won);
        expect(revealBombsSpy).toHaveBeenCalledTimes(1);
        expect(onFinishEmitSpy).toHaveBeenCalledTimes(1);
        expect(onFinishEmitSpy).toHaveBeenCalledWith(won);
      });

    })

  });
});
