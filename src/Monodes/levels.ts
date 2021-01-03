import LevelBuilder from './LevelBuilder';
import Level from './Level';

const builder = new LevelBuilder();

const levels: Level[] = [];

builder.addBlock(0, 1);
builder.addBlock(1, 0);
builder.addTarget(0, 0);
levels.push(builder.constructLevel());

builder.addBlock(0, 1);
builder.addBlock(1, 0);
builder.addBlock(2, 1);
builder.addTarget(1, 1);
levels.push(builder.constructLevel());

builder.addBlock(0, 1);
builder.addBlock(1, 0);
builder.addBlock(2, 1);
builder.addBlock(1, 2);
builder.addTarget(1, 1);
levels.push(builder.constructLevel());

builder.addBlock(0, 2);
builder.addBlock(1, 1);
builder.addBlock(1, 0);
builder.addTarget(0, 0);
levels.push(builder.constructLevel());

builder.addBlock(0, 1);
builder.addBlock(1, 0);
builder.addBlock(1, 1);
builder.addBlock(2, 0);
builder.addTarget(1, 0);
levels.push(builder.constructLevel());

builder.addBlock(0, 0);
builder.addBlock(2, 1);
builder.addBlock(0, 2);
builder.addBlock(0, 1);
builder.addBlock(1, 3);
builder.addBlock(1, 2);
builder.addBlock(1, 1);
builder.addTarget(0, 1);
levels.push(builder.constructLevel());

builder.addBlocks({ x: 0, y: 0 }, { x: 3, y: 3 });
builder.removeBlock(1, 2);
builder.removeBlock(0, 0);
builder.removeBlock(3, 3);
builder.removeBlock(3, 0);
builder.removeBlock(0, 3);
builder.removeBlock(2, 1);
builder.addTarget(1, 1);
levels.push(builder.constructLevel());

builder.addBlocks({ x: 0, y: 0 }, { x: 3, y: 3 });
builder.removeBlock(1, 2);
builder.removeBlock(3, 3);
builder.removeBlock(1, 1);
builder.removeBlock(0, 3);
builder.removeBlock(3, 2);
builder.removeBlock(2, 1);
builder.removeBlock(1, 1);
builder.removeBlock(0, 0);
builder.addTarget(3, 1);
levels.push(builder.constructLevel());

builder.addBlocks({ x: 0, y: 0 }, { x: 7, y: 7 });
builder.removeBlock(0, 0);
builder.removeBlock(7, 7);
builder.removeBlock(7, 0);
builder.removeBlock(0, 7);
builder.removeBlock(4, 3);
builder.removeBlock(3, 4);
builder.addTarget(3, 3);
levels.push(builder.constructLevel());

export default levels;
