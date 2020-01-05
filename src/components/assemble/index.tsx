import React from 'react';
import QrReader from 'react-qr-reader'
import { useHistory } from 'react-router-dom'
import { Card, CardContent, CardActions, TextField, MenuItem, Button, makeStyles } from '@material-ui/core';
import { Routes, MAX_PARTS, MIN_PARTS, DEFAULT_PARTS } from '../../constants'
import { useQuery, useLocalStorage } from '../../hooks'
import { Part, MinimumPart } from '../../types'
import { join } from '../../wrapper'
import PartInput from '../part-input'

const useStyles = makeStyles({
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
  }
})

function notEmpty<T>(item: T | null | undefined): item is T {
  return item != null
}

type State = {
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

type Action =
  | ActionSetNumParts
  | ActionsSetPart

const unreachable = (_n: never) => { }
function reducer(state: State, action: Action): State {

  switch (action.type) {
    case "setNumParts":
      return {
        ...state,
        numParts: action.payload,
        parts: {},
      }
    case "setPart": {
      let part = action.payload
      const numParts = 'numParts' in part ? part.numParts : state.numParts
      let parts = state.parts
      if (numParts !== state.numParts) {
        parts = {}
      }

      if (part.hex.trim() === '') {
        // Clone parts so I don't mutate the original object
        parts = { ...parts }
        delete parts[part.index]
        return {
          ...state,
          parts,
          numParts,
        }
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
    default:
      unreachable(action)
  }

  return state
}

const initialState: State = {
  numParts: DEFAULT_PARTS,
  parts: {},
}

function queryToPart(query: URLSearchParams): Part | null {
  const index = Number(query.get('index'))
  const hex = query.get('hex')
  const numParts = Number(query.get('numParts'))
  const label = query.get('label')
  const quorum = Number(query.get('quorum'))
  if (
    !isNaN(index)
    && index > 0
    && hex
    && !isNaN(numParts)
    && numParts > 0
    && !isNaN(quorum)
    && quorum > 0
    && label != null
  ) {
    const part: Part = {
      index,
      hex,
      label,
      numParts,
      quorum
    }
    return part
  }
  return null
}

function usePartParameters(callback: (p: Part) => void) {
  const query = useQuery()
  const part = queryToPart(query)
  React.useEffect(() => {
    if (part != null) {
      callback(part)
    }
  }, [callback, part])
}

export default function AssembleSecret() {
  const classes = useStyles()
  const history = useHistory()
  const [scanning, setScanning] = React.useState(false)
  const [secret, setSecret] = React.useState<null | string>(null)

  // I couldn't figure out the types to extract this into its own hook
  /* useStorageReducer(key, reducer, initialState) */
  const [storage, setStorage] = useLocalStorage('state', initialState)
  const [state, dispatch] = React.useReducer(reducer, storage)
  React.useEffect(() => {
    if (storage !== state) {
      setStorage(state)
    } else {
    }
  }, [setStorage, state, storage])


  const paramCB = React.useCallback((part) => {
    dispatch({
      type: 'setPart',
      payload: part,
    })
    history.replace(Routes.Assemble)
  }, [history])
  usePartParameters(paramCB)

  const { numParts, parts } = state
  const handleChangeNumParts = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    dispatch({
      type: 'setNumParts',
      payload: Number(e.target.value)
    })
  }

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

  const handleSubmit = React.useCallback((e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault()
    }

    try {
      const secret = join(
        Object.values(parts)
      )
      setSecret(secret)
    } catch (e) {
      console.error(e)
    }
  }, [parts])

  React.useEffect(() => {
    const parts = Object.values(state.parts)
      .filter(notEmpty)


    const done = parts.every(p => (
      'label' in p
      && 'label' in parts[0]
      && p.label === parts[0].label
      && p.numParts === parts[0].numParts
      && p.quorum === parts[0].quorum

    ))

    if (
      parts[0]
      && 'quorum' in parts[0]
      && parts.length === parts[0].quorum
      && done
    ) {
      handleSubmit()
    }

  }, [handleSubmit, state.parts])

  const handleScanError = (err: any) => {
    console.error(err)
  }
  const handleScan = (data: string | null) => {
    if (data) {
      try {
        const url = new URL(data)
        const part = queryToPart(url.searchParams)

        if (part != null) {
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
      <MenuItem key={index} value={index + MIN_PARTS}>{index + MIN_PARTS}</MenuItem>
    ))

  const partInputs: JSX.Element[] = []
  for (let i = 1; i <= numParts; i++) {
    partInputs.push(
      <PartInput key={`${i}/${numParts}`} index={i} part={parts[i]} onChange={handleChangeHex} />
    )
  }
  if (secret) {

    return (
      <Card>
        <CardContent>
          {secret}
        </CardContent>
      </Card>
    )

  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent className={classes.cardContent}>
          {scanning ? (
            <React.Fragment>
              <QrReader
                delay={500}
                onError={handleScanError}
                onScan={handleScan}
              />
              <Button variant="outlined" onClick={() => setScanning(false)}>Stop Scanning</Button>
            </React.Fragment>
          ) : (
              <Button variant="outlined" onClick={() => setScanning(true)}>Scan QR Codes</Button>
            )}

          <br />

          <TextField
            name="numParts"
            select
            label="Parts"
            value={numParts}
            onChange={handleChangeNumParts}
          >
            {partsOptions}
          </TextField>

          {partInputs}

        </CardContent>
        <CardActions>
          <Button type="submit" color="primary" variant="outlined">
            Done
          </Button>
        </CardActions>
      </Card>
    </form>
  )
}
