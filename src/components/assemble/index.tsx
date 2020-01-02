import React from 'react';
import QrReader from 'react-qr-reader'
import { useHistory } from 'react-router-dom'
import { Routes, MAX_PARTS, MIN_PARTS, DEFAULT_PARTS } from '../../constants'
import { useHtmlId, useQuery } from '../../hooks'
import { Part, MinimumPart } from '../../types'
import { join } from '../../wrapper'
import styles from './styles.module.css'
import PartInput from '../part-input'

type State = {
  scanning: boolean,
  secret: string | null,
  numParts: number,
  parts: Record<string, Part | MinimumPart>
}

type ActionSetNumParts = {
  type: 'setNumParts',
  payload: number,
}

type ActionsSetPart = {
  type: 'setPart',
  payload: MinimumPart | Part,
}

type ActionsSetSecret = {
  type: 'setSecret',
  payload: string,
}

type ActionScan = {
  type: 'scan',
}

type Action =
  | ActionScan
  | ActionSetNumParts
  | ActionsSetPart
  | ActionsSetSecret

const unreachable = (_n: never) => { }
function reducer(state: State, action: Action): State {

  switch (action.type) {
    case "scan":
      return {
        ...state,
        scanning: true,
      }
    case "setNumParts":
      return {
        ...state,
        numParts: action.payload,
        parts: {},
      }
    case "setPart": {
      const part = action.payload
      const numParts = 'numParts' in part ? part.numParts : state.numParts
      let parts = state.parts
      if (numParts !== state.numParts) {
        parts = {}
      }

      return {
        ...state,
        parts: {
          ...parts,
          [part.index]: part
        },
        numParts,
      }
    }
    case "setSecret":
      return {
        ...state,
        secret: action.payload,
      }
    default:
      unreachable(action)
  }

  return state
}

const initialState = {
  scanning: false,
  secret: null,
  numParts: DEFAULT_PARTS,
  parts: {},
}

export default function AssembleSecret() {
  const id = useHtmlId()
  const query = useQuery()
  const history = useHistory()
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const { secret, numParts, scanning, parts } = state
  const handleChangeNumParts = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: 'setNumParts',
      payload: Number(e.target.value)
    })
  }

  const qIndex = query.get('index')
  const qHex = query.get('hex')
  const qNumParts = query.get('numParts')
  React.useEffect(() => {

    if (qIndex && qHex && qNumParts) {
      history.replace(Routes.Edit, {
        index: qIndex,
        hex: qHex,
        numParts: qNumParts,
      })

    }

  }, [history, qHex, qIndex, qNumParts])

  const handleChangeHex = (index: number, hex: string) => {
    const current = parts[index] ?? { index, hex: '' }
    dispatch({
      type: 'setPart',
      payload: {
        ...current,
        hex
      }
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const secret = join(
        Object.values(parts)
      )
      dispatch({
        type: 'setSecret',
        payload: secret,
      })
    } catch (e) {
      console.error(e)
    }
  }

  const handleScanError = (err: any) => {
    console.error(err)
  }
  const handleScan = (data: string | null) => {
    console.log('scan', data)
    if (data) {
      try {
        const part = JSON.parse(data)

        if (part.hex && part.numParts && part.index) {
          dispatch({
            type: 'setPart',
            payload: part
          })
        }

      } catch (e) {

      }

    }
  }

  const partsOptions = new Array(MAX_PARTS - MIN_PARTS)
    .fill(0)
    .map((_n, index) => (
      <option key={index} value={index + MIN_PARTS}>{index + MIN_PARTS}</option>
    ))

  const partInputs: JSX.Element[] = []
  for (let i = 1; i <= numParts; i++) {
    partInputs.push(
      <PartInput key={i} index={i} part={parts[i]} onChange={handleChangeHex} />
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>AssembleSecret</h2>

      {scanning ? (
        <QrReader
          className={styles.reader}
          delay={500}
          onError={handleScanError}
          onScan={handleScan}
        />

      ) : (
          <button onClick={() => dispatch({ type: 'scan' })}>Scan QR Codes</button>
        )}

      <br />
      <label htmlFor={id('numParts')}>
        Parts
      </label>
      <select name="numParts" id={id('numParts')} value={numParts} onChange={handleChangeNumParts}>
        {partsOptions}
      </select>

      {partInputs}

      <button type="submit">
        Done
      </button>

      {secret && (
        <div>
          Secret: {secret}
        </div>
      )}

    </form>
  )
}
