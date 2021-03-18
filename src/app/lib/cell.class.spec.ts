import { Cell } from "./cell.class";
import { JSONCell } from "../interfaces/storage/json-cell.interface";

describe('Cell', () => {

  let cell: Cell;

  beforeEach( () => {
    cell = new Cell();
  });

  describe('Cell creation and initialization', () => {

    describe('constructor', () => {
      it('should create a Cell object', () => {
        expect(typeof cell.coordinate).toEqual('undefined');
        expect(typeof cell.hidden).toEqual('undefined');
        expect(typeof cell.hasBomb).toEqual('undefined');
        expect(typeof cell.bombExploded).toEqual('undefined');
        expect(typeof cell.nearbyBombs).toEqual('undefined');
        expect(typeof cell.guess).toEqual('undefined');
      });
    });

    describe('init', () => {
      it('should initialize a Cell given a coordinate', () => {
        const coordinate = {x: 2, y: 0};
        cell.init(coordinate);
        expect(cell.coordinate).toEqual(coordinate);
        expect(cell.hidden).toEqual(true);
        expect(cell.hasBomb).toEqual(false);
        expect(cell.bombExploded).toEqual(false);
        expect(cell.nearbyBombs).toEqual(0);
        expect(cell.guess === null).toEqual(true);
      });
    });

    describe('createFromJSON', () => {
      it('should create a Cell from a JSONCell object', () => {
        const jsonCell: JSONCell = {
          bombExploded: false,
          coordinate: {x: 3, y: 5},
          guess: 'flag',
          hasBomb: true,
          hidden: true,
          nearbyBombs: 3
        };
        const createdCell = Cell.createFromJSON(jsonCell);
        expect(createdCell.coordinate).toEqual(jsonCell.coordinate);
        expect(createdCell.hidden).toEqual(jsonCell.hidden);
        expect(createdCell.hasBomb).toEqual(jsonCell.hasBomb);
        expect(createdCell.bombExploded).toEqual(jsonCell.bombExploded);
        expect(createdCell.nearbyBombs).toEqual(jsonCell.nearbyBombs);
        expect(createdCell.guess === jsonCell.guess).toEqual(true);
      });
    });
  });
});
