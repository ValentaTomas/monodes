import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Ctx } from 'boardgame.io';

const Cell = styled.td`
  border: 1px solid #555;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
`;

interface BoardProps {
  moves: {
    clickCell: (id: string | number) => void;
  };
  ctx: Ctx;
  G: { [id: string]: any };
}

function Board(props: any) {
  const rowSize = 3;
  const columnSize = 3;

  console.log('Board');

  return (
    <div>
      <table id='board'>
        <tbody>
          {Array(rowSize).map((_, row) => (
            <tr key={row}>
              {Array(columnSize).map((_, column) => {
                const id = rowSize * row + column;
                return (
                  <Cell key={id} onClick={() => props.moves.clickCell(id)}>
                    {props.G.cells[id]}
                  </Cell>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {props.ctx.gameover && props.ctx.gameover.winner && <div id='winner'>Winner: {props.ctx.gameover.winner}</div>}
      {props.ctx.gameover && props.ctx.gameover.winner !== undefined && <div id='winner'>Draw!</div>}
    </div>
  );
}

export default Board;
