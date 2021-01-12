import {
  Connection,
  Stage,
  Board,
} from './types';

const levels: Board[] = [
  [
    [Stage.STAGE_1, Connection.HORIZONTAL, Stage.STAGE_2, Connection.HORIZONTAL, Stage.STAGE_1],
    [Connection.VERTICAL, Connection.EMPTY, Connection.VERTICAL, Connection.EMPTY, Connection.EMPTY],
    [Stage.STAGE_1, Connection.EMPTY, Stage.STAGE_1, Connection.HORIZONTAL, Stage.STAGE_1],
  ],
];

export default levels;
