import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';

import Afold from './Afold';

function App() {
  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact
        >
          <Redirect to={{ pathname: "/afold" }} />
        </Route>

        <Route
          path="/afold"
        >
          <Afold />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
