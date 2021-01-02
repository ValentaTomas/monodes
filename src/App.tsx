import React from 'react';
import styled from 'styled-components';
// import { Client } from 'boardgame.io/react';
// import { game } from './Game';
// import Board from './Board';

import Board from './afold/Board';

const Content = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

function App() {
  return (
    <Content>
      <Board />
    </Content>
  );
}

// const App = Client({
//   game,
//   board: Board,
// });

export default App;
