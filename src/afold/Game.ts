import { Game, Ctx } from 'boardgame.io';
import { INVALID_MOVE } from 'boardgame.io/core';

type GameState = {
  cells: Array<any>;
}

function IsVictory(cells: number[][]) {
  const positions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const isRowComplete = (row: number[]) => {
    const symbols = row.map(i => cells[i]);
    return symbols.every(i => i !== null && i === symbols[0]);
  };

  return positions.map(isRowComplete).some(i => i === true);
}

// Return true if all `cells` are occupied.
function IsDraw(cells: number[][]) {
  return cells.filter(c => c === null).length === 0;
}

const game: Game<GameState> = {
  setup: () => ({ cells: Array(9).fill(null) }),
  moves: {
    clickCell: (G: GameState, ctx: Ctx, id: number) => {
      if (G.cells[id] !== null) {
        return INVALID_MOVE;
      }
      G.cells[id] = ctx.currentPlayer;
    },
  },
  turn: {
    moveLimit: 1,
  },
  endIf: (G: GameState, ctx: Ctx) => {
    if (IsVictory(G.cells)) {
      return { winner: ctx.currentPlayer };
    }
    if (IsDraw(G.cells)) {
      return { draw: true };
    }
  },
};

export default game;