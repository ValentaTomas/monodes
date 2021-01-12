export interface Zone {
  x: number;
  y: number;
}

export interface Level {
  blocks: Zone[];
  targets: Zone[];
}

export enum Stage {
  SQUARE = 'square',
  TARGET = 'target',
}

export enum Setup {
  POINT = 'point',
}

export type Cell = (Stage | Setup | undefined);

export type Board = Cell[][];
