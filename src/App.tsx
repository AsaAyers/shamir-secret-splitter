import React from 'react';
import {
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import Home from './home'
import NewSecret from './new-secret'
import PrintSecret from './print-secret'
import AssembleSecret from './assemble-secret'

export default function App() {
  const location = useLocation()
  return (
    <React.Fragment>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/edit">NewSecret</Link>
            </li>
            <li>
              <Link to="/assemble">AssembleSecret</Link>
            </li>
          </ul>
          {JSON.stringify(location)}
        </nav>

        <Switch>
          <Route path="/edit">
            <NewSecret />
          </Route>
          <Route path="/print">
            <PrintSecret />
          </Route>
          <Route path="/assemble">
            <AssembleSecret />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </React.Fragment>
  );
}
