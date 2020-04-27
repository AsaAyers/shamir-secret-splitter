import React from 'react'
import { Card, CardContent, CardActions, TextField, Button, makeStyles, Typography } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { Routes, MAX_PARTS, MIN_PARTS, DEFAULT_PARTS, DEFAULT_QUORUM } from '../shared/constants'
import { useSecretFromLocation } from '../shared/components/print'
import { Secret } from './shared/types'

const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  }
})

const emptySecret: Secret = {
  label: "",
  text: "",
  shares: DEFAULT_PARTS,
  threshold: DEFAULT_QUORUM,
}


export default function NewSecret() {
  const classes = useStyles()
  const history = useHistory()
  const defaultState = useSecretFromLocation() || emptySecret

  const [state, setState] = React.useState<Secret>(defaultState)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const update = { [e.target.name]: e.target.value }
    setState((state) => Object.assign({}, state, update))
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    history.push(Routes.Print, state)

  }

  const partsOptions: number[] = []
  const thresholdOptions: number[] = []
  for (let i = 1; i <= MAX_PARTS; i++) {
    if (i >= MIN_PARTS) {
      partsOptions.push(i)
    }
    if (i < state.shares) {
      thresholdOptions.push(i)
    }
  }

  return (
    <form onSubmit={handleSubmit} >
      <Card>
        <CardContent className={classes.content}>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Create Secret
          </Typography>

          <TextField
            onChange={handleChange}
            value={state.label}
            id="label"
            name="label"
            label="Label" />

          <TextField
            multiline={true}
            label="Secret Text"
            id="secret-text"
            onChange={handleChange}
            value={state.text}
            name="text" />


          <TextField
            name="shares"
            select
            label="Shares"
            id="parts"
            SelectProps={{
              native: true
            }}
            data-testid="parts"
            value={state.shares}
            onChange={handleChange}
          >
            {partsOptions.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </TextField>

          <TextField
            name="threshold"
            select
            SelectProps={{
              native: true
            }}
            id="threshold"
            data-testid="threshold"
            label="Threshold"
            value={state.threshold}
            onChange={handleChange}
          >
            {thresholdOptions.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </TextField>

          <p>
            In order to reassemble your secret, you will need {state.threshold} out
            of {state.shares} pieces. Your label will be printed at the top of
            each page.
          </p>
        </CardContent>
        <CardActions>
          <Button type="submit" color="primary" data-testid="done-btn" variant="outlined">
            Done
          </Button>
        </CardActions>
      </Card>
    </form >
  )
}
