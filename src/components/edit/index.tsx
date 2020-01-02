import React from 'react'
import { useHistory } from "react-router-dom";
import { Routes, MAX_PARTS, MIN_PARTS, DEFAULT_PARTS, DEFAULT_QUORUM } from '../../constants'
import { useSecretFromLocation } from '../print'
import { Secret } from '../../types'
import { useHtmlId } from '../../hooks'


const emptySecret: Secret = {
  label: "",
  text: "",
  numParts: DEFAULT_PARTS,
  quorum: DEFAULT_QUORUM,
}


export default function NewSecret() {
  const history = useHistory()
  const id = useHtmlId()
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
    if (i <= state.numParts) {
      quorumOptions.push(i)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>NewSecret</h2>

      <label htmlFor={id('label')}>
        Label
      </label>
      <input
        onChange={handleChange}
        value={state.label}
        name="label"
        id={id('label')} />

      <br />

      <label htmlFor={id('text')}>
        Secret Text
      </label>
      <textarea
        onChange={handleChange}
        value={state.text}
        name="text"
        id={id('text')} />

      <br />

      <label htmlFor={id('quorum')}>
        quorum
      </label>
      <select name="quorum" id={id('quorum')} value={state.quorum} onChange={handleChange}>
        {quorumOptions.map((n) => (
          <option key={n} value={n}>{n}</option>
        ))}
      </select>

      <br />
      <label htmlFor={id('numParts')}>
        Parts
      </label>
      <select name="numParts" id={id('numParts')} value={state.numParts} onChange={handleChange}>
        {partsOptions.map((n) => (
          <option key={n} value={n}>{n}</option>
        ))}
      </select>

      <br />
      <button type="submit">
        Done
      </button>
    </form>
  )
}
