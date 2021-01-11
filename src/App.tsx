import {
  Switch,
  Route,
  BrowserRouter as Router,
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
            <Redirect to={{ pathname: "/afold/0" }} />
          </Route>

          <Route
            path="/afold/:level"
          >
            <Afold />
          </Route>

          <Route
            path="/monodes/:level"
          >
            <Monodes />
          </Route>

        </Switch>
      </Router>
    </Content>
  );
}

export default App;
