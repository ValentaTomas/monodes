export enum Stage {
  STAGE_1 = 1,
  STAGE_2 = 2,
}

export enum Connection {
  EMPTY = 'empty',
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

export type Board = Cell[][];

export type Cell = (Stage | Connection);
