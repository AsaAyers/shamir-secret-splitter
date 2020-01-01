import React from 'react'
import { useHistory } from "react-router-dom";
import { Routes } from './constants'
import { useSecretFromLocation } from './print-secret'
import { Secret } from './types'

function useHtmlId() {
  const id = React.useMemo(() => Math.random().toString(16).substr(2), [])

  return (name: string) => name + '-' + id
}


const emptySecret: Secret = {
  label: "",
  secret: "",
  parts: 4,
  subset: 3,
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
  const subsetOptions: number[] = []
  for (let i = 1; i < 10; i++) {
    if (i > 1) {
      partsOptions.push(i)
    }
    if (i < state.parts) {
      subsetOptions.push(i)
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

      <label htmlFor={id('secret')}>
        Secret Text
      </label>
      <textarea
        onChange={handleChange}
        value={state.secret}
        name="secret"
        id={id('secret')} />

      <br />

      <label htmlFor={id('subset')}>
        Subset
      </label>
      <select name="subset" id={id('subset')} value={state.subset} onChange={handleChange}>
        {subsetOptions.map((n) => (
          <option key={n} value={n}>{n}</option>
        ))}
      </select>

      <br />
      <label htmlFor={id('parts')}>
        Parts
      </label>
      <select name="parts" id={id('parts')} value={state.parts} onChange={handleChange}>
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
