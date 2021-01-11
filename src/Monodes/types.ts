export interface Zone {
  x: number;
  y: number;
}

export interface Level {
  blocks: Zone[];
  targets: Zone[];
}
