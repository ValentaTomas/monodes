import { Zone, Level } from './types';

export default class LevelBuilder {
  public blocks: Zone[] = [];
  public targets: Zone[] = [];

  public addBlock(x: number, y: number) {
    if (!this.blocks.find(b => b.x === x && b.y === y)) {
      this.blocks.push({ x, y });
    }
  }

  public addTarget(x: number, y: number) {
    if (!this.targets.find(t => t.x === x && t.y === y)) {
      this.targets.push({ x, y });
    }
  }

  public removeBlock(x: number, y: number) {
    const index = this.blocks.findIndex(b => b.x === x && b.y === y);
    if (index >= 0) {
      this.blocks.splice(index, 1);
    }
  }

  public removeTarget(x: number, y: number) {
    const index = this.targets.findIndex(t => t.x === x && t.y === y);
    if (index >= 0) {
      this.targets.splice(index, 1);
    }
  }

  public addBlocks(start: Zone, stop: Zone) {
    const startX = start.x < stop.x ? start.x : stop.x;
    const stopX = start.x > stop.x ? start.x : stop.x;

    const startY = start.y < stop.y ? start.y : stop.y;
    const stopY = start.y > stop.y ? start.y : stop.y;

    for (let x = startX; x <= stopX; x++)
      for (let y = startY; y <= stopY; y++)
        this.addBlock(x, y);
  }

  public removeBlocks(start: Zone, stop: Zone) {
    const startX = start.x < stop.x ? start.x : stop.x;
    const stopX = start.x > stop.x ? start.x : stop.x;

    const startY = start.y < stop.y ? start.y : stop.y;
    const stopY = start.y > stop.y ? start.y : stop.y;

    for (let x = startX; x <= stopX; x++)
      for (let y = startY; y <= stopY; y++)
        this.removeBlock(x, y);
  }

  private clear() {
    this.blocks = [];
    this.targets = [];
  }

  public constructLevel(): Level {
    const level = { blocks: this.blocks, targets: this.targets };
    this.clear();
    return level;
  }
}
