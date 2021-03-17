export const DEFAULT_DATASOURCE = 'browser';

export const LEVELS = {
  easy: {
    label: 'Easy',
    xCells: 10,
    yCells: 10,
    totalBombs: 15,
  },
  medium: {
    label: 'Medium',
    xCells: 20,
    yCells: 20,
    totalBombs: 40,
  },
  hard: {
    label: 'Hard',
    xCells: 30,
    yCells: 30,
    totalBombs: 100,
  },
  custom: {
    label: 'Custom',
    xCells: 10,
    yCells: 10,
    totalBombs: 10
  }
}

export const ALLOWED_RANGE_CELLS = [10, 100];
export const ALLOWED_RANGE_BOMBS = [1, 100];


export const DEFAULT_LEVEL = 'easy';
