import React from 'react'
import { Paper, TextField, MenuItem, Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { Routes, MAX_PARTS, MIN_PARTS, DEFAULT_PARTS, DEFAULT_QUORUM } from '../../constants'
import { useSecretFromLocation } from '../print'
import { Secret } from '../../types'
import styles from './styles.module.css'

const emptySecret: Secret = {
  label: "",
  text: "",
  numParts: DEFAULT_PARTS,
  quorum: DEFAULT_QUORUM,
}


export default function NewSecret() {
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
  const quorumOptions: number[] = []
  for (let i = 1; i <= MAX_PARTS; i++) {
    if (i >= MIN_PARTS) {
      partsOptions.push(i)
    }
    if (i < state.numParts) {
      quorumOptions.push(i)
    }
  }

  return (
    <form onSubmit={handleSubmit} >
      <Paper className={styles.form}>
        <TextField
          onChange={handleChange}
          value={state.label}
          name="label"
          label="Label" />

        <TextField
          multiline={true}
          label="Secret Text"
          onChange={handleChange}
          value={state.text}
          name="text" />


        <TextField
          name="quorum"
          select
          label="Quorum"
          value={state.quorum}
          onChange={handleChange}
        >
          {quorumOptions.map((n) => (
            <MenuItem key={n} value={n}>{n}</MenuItem>
          ))}
        </TextField>

        <TextField
          name="numParts"
          select
          label="Parts"
          value={state.numParts}
          onChange={handleChange}
        >
          {partsOptions.map((n) => (
            <MenuItem key={n} value={n}>{n}</MenuItem>
          ))}
        </TextField>

        <Button type="submit" color="primary" variant="outlined">
          Done
        </Button>
      </Paper>
    </form>
  )
}
