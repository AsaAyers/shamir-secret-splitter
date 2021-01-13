import React from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import { Card, CardContent, Typography, CssBaseline, Container, makeStyles } from '@material-ui/core';
import packageJson from '../../package.json'
import { Routes } from './shared/constants'
import Edit from './app/edit'
import Print from './shared/components/print'
import AssembleSecret from './app/assemble'
import Nav from './app/nav'

export default function App() {
  return (
    <Container maxWidth="sm">
      <CssBaseline />
      <Nav />
      <Switch>
        <Route path={Routes.Print}>
          <Print />
        </Route>
        <Route path={Routes.Assemble}>
          <AssembleSecret />
        </Route>
        <Route path={Routes.Edit}>
          <Home />
          <Edit />
        </Route>
      </Switch>
    </Container>
  );
}

const useStyles = makeStyles({
  home: {
    margin: '1em 0'
  }
})

function Home() {
  const classes = useStyles()

  return (
    <Card className={classes.home}>
      <CardContent>
        <Typography component="h1">
          Overview
        </Typography>

        <p>
          Say you have an important password to backup in case you ever forget
          it. Maybe you use a password manager for most passwords, but how do
          you backup your password for your password manager? You don’t want to
          just write it down because anyone who finds it will have your
          password.
        </p>
        <p>
          Using the Shamir Secret Splitter you can split your password into
          pices and store them in different places. You might decide to split it
          into 4 pages and any set of 3 can be used to assemble the password.
        </p>
        <p>
          Each page contains a QR code with a link back to this site. No special
          software is needed, just point your phone's camera at the page and
          follow the link. From the limited testing I’ve done, it seems like QR
          code scanners are built into the default camera apps on Android and
          iOS. When the camera finds a QR code you should get some kind of
          notification asking if you want to open the link in your browser. If
          it doesn’t work, you may need to go change a setting to turn on QR
          code scanning.
        </p>
        <p>
          When you arrive on the "Assemble Secret" page it has a Scan QR Codes
          button that you can use to scan the remaining pages. But what if you
          can't scan a QR code? Every page also has a series of words that
          contain the same piece of your secret as the QR code. If you need to,
          you can simply type those into the "Assemble Secret" page.
        </p>
        <p>
          For additional details view the project on <a
            href={packageJson.repository}
            target="_blank"
            rel="noopener noreferrer">
            GitHub
          </a>


        </p>
      </CardContent>
    </Card>
  )
}
