import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import levels from './levels';

import { Zone, Level, Cell, Stage, Setup, Board } from './types';

const Menu = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledLink = styled(NavLink)`
  background: green;
  /* margin:  0 auto; */
  margin: 0px 5px;
  padding: 10px;
  :hover {
    cursor: pointer;
    background: darkgreen;
  }
  text-decoration: none;
  color: white;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  user-select: none;
  background: #1C1B26;
`;

const Container = styled.div`
  display: flex;
  margin: auto;
`;

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
`;

const CellElement = styled.div<{ isTarget?: boolean }>`
  width: 38px;
  border-radius: 3px;
  font-weight: 400;
  font-size: 27px;
  margin: 10px;
  height: 38px;
  display: flex;
  font-family: Fira Code;
  text-align: center;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  ${props => props.isTarget && `background: blue;`}
`;

const PointCell = styled(CellElement)`
  border-radius: 40px;
  border: 3px solid gold;
  align-self: center;
  justify-content: center;

  width: 15px;
  height: 15px;

  :hover {
    cursor: pointer;
  }
`;

const Reset = styled.div`
  background: green;
  /* margin:  0 auto; */
  margin: 0px 5px;
  padding: 10px;
  :hover {
    cursor: pointer;
    background: darkgreen;
  }
`;

const StageCell = styled(CellElement)`
  border: 2px solid gold;
`;

function maxPosition(positions: Zone[]) {
  return positions.reduce((max, current) => {
    return [
      max[0] >= current.x ? max[0] : current.x,
      max[1] >= current.y ? max[1] : current.y,
    ];
  }, [0, 0]);
}

function getSquare(board: Board, i: number, j: number) {
  try {
    return board[i][j] === Stage.SQUARE ? [i, j] : undefined;
  } catch (error) {
    return undefined;
  }
}

function copyBoard(board: Board) {
  return board.map(row => row.slice());
}


function notEmpty<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

function getConnectedSquares(board: Board, i: number, j: number) {
  return [
    getSquare(board, i + 1, j),
    getSquare(board, i, j + 1),
    getSquare(board, i - 1, j),
    getSquare(board, i, j - 1),
  ].filter(notEmpty);
}

function triggerPoint(board: Board, i: number, j: number) {
  const connectedSquares = getConnectedSquares(board, i, j);

  const newBoard = copyBoard(board);

  newBoard[i][j] = Stage.SQUARE;

  connectedSquares.forEach(s => {
    newBoard[s[0]][s[1]] = undefined;
  });

  return newBoard;
}

function evaluateBoard(board: Board) {
  const newBoard = copyBoard(board);

  for (let x = 0; x < newBoard.length; x++) {
    const row = newBoard[x];
    for (let y = 0; y < row.length; y++) {

      if (newBoard[x][y] === Setup.POINT) {
        newBoard[x][y] = undefined;
      }

      if (newBoard[x][y] === undefined) {
        const connectedSquares = getConnectedSquares(newBoard, x, y);

        if (connectedSquares.length >= 2) {
          newBoard[x][y] = Setup.POINT;
        }
      }
    }
  }

  return newBoard;
}

function setupTargetBoard(blocks: Zone[], targets: Zone[]) {
  const [x, y] = maxPosition(blocks);

  console.log(x, y);

  const board: Board = [];

  for (let row = 0; row <= x; row++) {
    const column = new Array(y + 1).fill(undefined);
    board.push(column);
  }

  targets.forEach(t => {
    board[t.x][t.y] = Stage.TARGET;
  });

  return board;
}

function setupBoard(blocks: Zone[]) {
  const [x, y] = maxPosition(blocks);

  const board: Board = [];

  for (let row = 0; row <= x; row++) {
    const column = new Array(y + 1).fill(undefined);
    board.push(column);
  }

  blocks.forEach(t => {
    board[t.x][t.y] = Stage.SQUARE;
  });

  return evaluateBoard(board);
}

function checkEnd(board: Board, targetBoard: Board) {
  for (let x = 0; x < board.length; x++) {
    const row = board[x];
    for (let y = 0; y < row.length; y++) {
      if (board[x][y] === Stage.SQUARE && targetBoard[x][y] !== Stage.TARGET) {
        return false;
      }
    }
  }
  return true;
}

function Monodes() {
  const params = useParams<{ level?: string }>();

  const levelIndex = params?.level ? parseInt(params.level) : 0;
  const level = levelIndex >= 0 && levelIndex < levels.length ? levels[levelIndex] : levels[0];

  const [board, setBoard] = useState(setupBoard(level.blocks));
  const [targetBoard, setTargetBoard] = useState(setupTargetBoard(level.blocks, level.targets));

  const [end, setEnd] = useState(false);

  useEffect(() => {
    setEnd(checkEnd(board, targetBoard));
  }, [board, targetBoard]);


  function handleReset() {
    setBoard(setupBoard(level.blocks));
    setEnd(false);
  }

  function handleCellClick(i: number, j: number) {
    const newBoard = triggerPoint(board, i, j);
    setBoard(evaluateBoard(newBoard));
  }

  useEffect(() => {
    setEnd(checkEnd(board, targetBoard));
  }, [board, targetBoard]);

  useEffect(() => {
    setBoard(setupBoard(level.blocks));
    setTargetBoard(setupTargetBoard(level.blocks, level.targets));
    setEnd(false);
  }, [level]);

  console.log(board);

  return (
    <Content>
      <Menu>
        <StyledLink to={{
          pathname: `/levels/${levelIndex === 0 ? 0 : levelIndex - 1}`,
        }} > {'<'} </StyledLink>
        <Reset onClick={handleReset}>RESET LEVEL {levelIndex}</Reset>
        <StyledLink to={{
          pathname: `/levels/${levelIndex === levels.length - 1 ? levels.length - 1 : levelIndex + 1}`,
        }} > {'>'} </StyledLink>
      </Menu>
      <Container>
        {end && <StyledLink to={{
          pathname: `/levels/${levelIndex === levels.length - 1 ? levels.length - 1 : levelIndex + 1}`,
        }} > {'NEXT'} </StyledLink>}

        {!end && <BoardContainer>
          {
            board.map((row, i) =>
              <Row key={i.toString()}>
                {
                  row.map((cell, j) => {

                    const target = targetBoard[i][j] === Stage.TARGET;

                    switch (cell) {
                      case Setup.POINT:
                        return <CellElement isTarget={target} key={j.toString()} onClick={() => handleCellClick(i, j)}>
                          <PointCell  ></PointCell>
                        </CellElement>
                      case Stage.SQUARE:
                        return <StageCell isTarget={target} key={j.toString()} />;
                      default:
                        return <CellElement isTarget={target} key={j.toString()} />;
                    }
                  })
                }
              </Row>
            )
          }
        </BoardContainer>}
      </Container>
    </Content>
  );
}

export default Monodes;
