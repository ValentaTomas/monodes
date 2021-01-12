import {
  useParams,
  NavLink,
} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Board, Stage, Connection } from './types';
import levels from './levels';

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

const Cell = styled.div`
  width: 38px;
  border-radius: 3px;
  font-weight: 400;
  font-size: 27px;
  margin: 10px;
  height: 38px;
  display: flex;
  font-family: Fira Code;
  text-align: center;
  justify-content: center;
  white-space: nowrap;
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

const StageCell = styled(Cell)`
  border: 2px solid gold;
  
  :hover {
    cursor: pointer;
    background: darkorange;
  }
`;

function notEmpty<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

function getNeighbour(board: Board, position: [number, number]) {
  try {
    return {
      type: board[position[0]][position[1]],
      position,
    }
  } catch (error) {
    return;
  }
}

function getConnections(board: Board, position: [number, number]) {
  return [
    getNeighbour(board, [position[0] + 1, position[1]]),
    getNeighbour(board, [position[0] - 1, position[1]]),
    getNeighbour(board, [position[0], position[1] + 1]),
    getNeighbour(board, [position[0], position[1] - 1]),
  ]
    .filter(notEmpty)
    .filter(n => n.type === Connection.VERTICAL || n.type === Connection.HORIZONTAL);
}

function getPositionInDirection(position: [number, number], direction: [number, number]) {
  const i = direction[0] - (position[0] - direction[0]);
  const j = direction[1] - (position[1] - direction[1]);
  return [i, j];
}

function getPositionBetween(position1: [number, number], position2: [number, number]) {
  const i = (position1[0] + position2[0]) / 2;
  const j = (position1[1] + position2[1]) / 2;
  return [i, j];
}

function getConnectedStages(board: Board, position: [number, number]) {
  const connections = getConnections(board, position);

  return connections.map(connection => {
    if (connection.position[0] === position[0] && connection.position[1] === position[1]) {
      return;
    }

    switch (connection.type) {
      case Connection.HORIZONTAL:
        const j = connection.position[1] - (position[1] - connection.position[1]);
        return getNeighbour(board, [position[0], j]);

      case Connection.VERTICAL:
        const i = connection.position[0] - (position[0] - connection.position[0]);
        return getNeighbour(board, [i, position[1]]);

      default:
        return;
    }
  })
    .filter(notEmpty);
}

function evaluateStage(stage: Stage): [Stage, number] {
  if (stage <= 2) {
    return [stage, 0];
  }

  const newStage = stage % 2;

  const resonance = Math.floor(stage / 2);

  if (newStage === 0) {
    return [1, resonance];
  }

  return [newStage, resonance];
}

function copyBoard(board: Board) {
  return board.map(row => row.slice());
}

function copyEmpty(board: Board) {
  return board.map(row => row.slice().fill(0));
}

function calculateResonance(board: Board, ignorePosition: [number, number]): Board {
  let hasResonance = false;

  const newStages = copyBoard(board);


  const resonanceBoard = copyEmpty(board) as number[][];

  board.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (typeof cell === 'number') {
        if (ignorePosition[0] === i && ignorePosition[1] === j) {
          return;
        }

        const [newStage, resonance] = evaluateStage(cell);
        newStages[i][j] = newStage as Stage;

        if (resonance > 0) {
          hasResonance = true;

          const connectedStages = getConnectedStages(board, [i, j]);
          connectedStages.map(connected => {
            resonanceBoard[connected.position[0]][connected.position[1]] = resonanceBoard[connected.position[0]][connected.position[1]] + resonance;
          });
        }
      }
    });
  });

  const newBoard = newStages.map((row, i) => {
    return row.map((cell, j) => {
      if (typeof cell === 'number') {
        return ((cell as number) + resonanceBoard[i][j]) as Stage;
      }
      else return cell;
    });
  });

  return hasResonance ? calculateResonance(newBoard, ignorePosition) : newBoard;
}

function transformState(board: Board, position: [number, number]) {

  const cell = board[position[0]][position[1]];

  const stages = getConnectedStages(board, position);

  const canBeExecuted = stages.length === 1 && stages[0].type >= cell;

  if (position[0] === 0 && position[1] === 0) {
    return board;
  }

  if (!canBeExecuted) {
    return board;
  }

  const target = stages[0];

  const newStage = cell as Stage + (target.type as Stage);

  board[target.position[0]][target.position[1]] = newStage;

  const newBoard = calculateResonance(board, position);

  newBoard[position[0]][position[1]] = Connection.EMPTY;
  const executedConnectionPosition = getPositionBetween(position, target.position);
  newBoard[executedConnectionPosition[0]][executedConnectionPosition[1]] = Connection.EMPTY;

  return newBoard;
}

function checkEnd(board: Board) {
  return board.flat().reduce((acc, cell) => {
    switch (cell) {
      case Stage.STAGE_1:
      case Stage.STAGE_2:
        return acc + 1;
      default:
        return acc;
    }
  }, 0) === 1;
}

function Afold() {
  const params = useParams<{ level?: string }>();

  const levelIndex = params?.level ? parseInt(params.level) : 0;

  const level = levelIndex >= 0 && levelIndex < levels.length ? levels[levelIndex] : levels[0];

  const [boardState, setBoardState] = useState(() => copyBoard(level));
  const [end, setEnd] = useState(false);

  function handleCellClick(i: number, j: number) {
    if (end) {
      return;
    }
    const newBoardState = transformState(boardState, [i, j]);
    setBoardState(newBoardState);
    setEnd(checkEnd(newBoardState));
  }

  function handleReset() {
    setBoardState(copyBoard(level));
    setEnd(false);
  }

  useEffect(() => {
    setBoardState(copyBoard(level));
    setEnd(false);
  }, [level]);

  return (
    <Content>
      <Menu>
        <StyledLink to={{
          pathname: `/afold/${levelIndex === 0 ? 0 : levelIndex - 1}`,
        }} > {'<'} </StyledLink>
        <Reset onClick={handleReset}>RESET LEVEL {levelIndex}</Reset>
        <StyledLink to={{
          pathname: `/afold/${levelIndex === levels.length - 1 ? levels.length - 1 : levelIndex + 1}`,
        }} > {'>'} </StyledLink>
      </Menu>
      <Container>
        <Cell>{end ? 'END' : '|-'}</Cell>
        {!end && <BoardContainer>
          {
            boardState.map((row, i) =>
              <Row key={i.toString()}>
                {
                  row.map((cell, j) => {
                    switch (cell) {
                      case Connection.EMPTY:
                        return <Cell key={j.toString()} />;
                      case Connection.HORIZONTAL:
                        return <Cell key={j.toString()}> —— </Cell>;
                      case Connection.VERTICAL:
                        return <Cell key={j.toString()} > | </Cell>;
                      case Stage.STAGE_1:
                        return <StageCell key={j.toString()} onClick={() => handleCellClick(i, j)}> 1 </StageCell>;
                      case Stage.STAGE_2:
                        return <StageCell key={j.toString()} onClick={() => handleCellClick(i, j)}> 2 </StageCell>;
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

export default Afold;
