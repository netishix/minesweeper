import {Game} from "../../../src/app/lib/game.class";

const GameMock: Game = new Game();
GameMock.init({
  level: 'easy',
  xCells: 10,
  yCells: 10,
  totalBombs: 20,
});


export { GameMock };
