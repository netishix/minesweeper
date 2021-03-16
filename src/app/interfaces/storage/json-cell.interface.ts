export interface JSONCell {
  coordinate: {x: number, y: number},
  hidden: boolean;
  hasBomb: boolean;
  bombExploded: boolean;
  nearbyBombs: number;
  guess: 'flag' | 'question' | null;
}
