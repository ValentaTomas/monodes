import {
  Setup,
  Stage,
  Level,
} from './types';

const levels: Level[] = [
  [
    [Stage.STAGE_1, Setup.HORIZONTAL, Stage.STAGE_2, Setup.HORIZONTAL, Stage.STAGE_1],
    [Setup.VERTICAL, Setup.EMPTY, Setup.VERTICAL, Setup.EMPTY, Setup.EMPTY],
    [Stage.STAGE_1, Setup.EMPTY, Stage.STAGE_1, Setup.HORIZONTAL, Stage.STAGE_1],
  ],
];

export default levels;
