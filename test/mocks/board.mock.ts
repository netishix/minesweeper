import { Board }  from "../../src/app/lib/board.class";

const BoardMock: Board = new Board();
BoardMock.init({
  size: {
    x: 10,
    y: 10
  },
  bombs: 20,
});


export { BoardMock };
