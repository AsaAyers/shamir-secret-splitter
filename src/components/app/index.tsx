import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import { Routes } from '../../constants'
import Edit from '../edit'
import Print from '../print'
import AssembleSecret from '../assemble'

export default function App() {
  return (
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
  );
}
