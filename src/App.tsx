import React from 'react';
import {
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { Routes } from './constants'
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
              <Link to={Routes.Home}>Home</Link>
            </li>
            <li>
              <Link to={Routes.Edit}>NewSecret</Link>
            </li>
            <li>
              <Link to={Routes.Assemble}>AssembleSecret</Link>
            </li>
          </ul>
          {JSON.stringify(location)}
        </nav>

        <Switch>
          <Route path={Routes.Edit}>
            <NewSecret />
          </Route>
          <Route path={Routes.Print}>
            <PrintSecret />
          </Route>
          <Route path={Routes.Assemble}>
            <AssembleSecret />
          </Route>
          <Route path={Routes.Home}>
            <Home />
          </Route>
        </Switch>
      </div>
    </React.Fragment>
  );
}
