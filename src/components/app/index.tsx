import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import { Routes } from '../../constants'
import Edit from '../edit'
import Print from '../print'
import AssembleSecret from '../assemble'
import Nav from '../nav'

export default function App() {
  return (
    <React.Fragment>
      <Nav />
      <Switch>
        <Route path={Routes.Print}>
          <Print />
        </Route>
        <Route path={Routes.Assemble}>
          <AssembleSecret />
        </Route>
        <Route path={Routes.Edit}>
          <Edit />
        </Route>
      </Switch>
    </React.Fragment>
  );
}
