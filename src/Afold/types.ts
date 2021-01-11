export enum Stage {
  STAGE_1 = 1,
  STAGE_2 = 2,
}

export enum Setup {
  EMPTY = 'empty',
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

export type Level = BoardCell[][];

export type BoardCell = (Stage | Setup);
