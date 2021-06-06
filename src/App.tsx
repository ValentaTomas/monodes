import React from 'react';
import {
  Switch,
  Route,
  HashRouter as Router,
  Redirect,
} from 'react-router-dom';
import styled from 'styled-components';

import Afold from './Afold';
import Monodes from './Monodes';

const Content = styled.div`
  margin: 0 auto;
  height: 100%;
`;

function App() {
  return (
    <Content>
      <Router>
        <Switch>
          <Route
            path="/"
            exact
          >
            <Redirect to={{ pathname: "/levels/0" }} />
          </Route>

          <Route
            path="/test-mechanic"
            exact
          >
            <Redirect to={{ pathname: "/test-mechanic/0" }} />
          </Route>

          <Route
            path="/levels"
            exact
          >
            <Redirect to={{ pathname: "/levels/0" }} />
          </Route>

          <Route
            path="/test-mechanic/:level"
          >
            <Afold />
          </Route>

          <Route
            path="/levels/:level"
          >
            <Monodes />
          </Route>

        </Switch>
      </Router>
    </Content>
  );
}

export default App;
