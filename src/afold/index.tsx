import { Client } from 'boardgame.io/react';

import Board from './Board';
import Game from './Game';

const Afold = Client({
  game: Game,
  board: Board,
});

export default Afold;
