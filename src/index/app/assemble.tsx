import React from 'react';
import QrReader from 'react-qr-reader'
import { useHistory } from 'react-router-dom'
import classnames from 'classnames'
import { Card, CardContent, CardActions, TextField, MenuItem, Button, makeStyles } from '@material-ui/core';
import { Routes, MAX_PARTS, MIN_PARTS, DEFAULT_PARTS } from '../shared/constants'
import { useQuery, useLocalStorage } from './shared/hooks'
import { Part, MinimumPart } from './shared/types'
import { join } from './shared/wrapper'
import PartInput from './shared/components/part-input'
import styles from './assemble/styles.module.css'
// https://www.partnersinrhyme.com/soundfx/PUBLIC-DOMAIN-SOUNDS/beep_sounds/beep_beep-pure_wav.shtml
import mp3 from './assemble/BEEPPURE.mp3'

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
  shares: number,
  parts: Record<string, Part | MinimumPart>
  scanIndex: undefined | number
}

type ActionSetShares = {
  type: 'setShares',
  payload: number,
}

type ActionsSetPart = {
  type: 'setPart',
  payload: MinimumPart | Part,
  meta?: { scan: number }
}

type ActionClearScan = {
  type: 'clearScan',
  payload: State['scanIndex'],
}

type ActionReset = {
  type: 'reset',
}

type Action =
  | ActionSetShares
  | ActionsSetPart
  | ActionClearScan
  | ActionReset


const initialState: State = {
  shares: DEFAULT_PARTS,
  parts: {},
  scanIndex: undefined,
}

const unreachable = (_n: never) => { }
function reducer(state: State, action: Action): State {

  switch (action.type) {
    case "reset":
      return initialState
    case "setShares":
      return {
        ...state,
        shares: action.payload,
        parts: {},
      }
    case "setPart": {
      let part = action.payload
      const shares = 'shares' in part ? part.shares : state.shares
      let parts = state.parts
      if (shares !== state.shares) {
        parts = {}
      }

      if (part.hex.trim() === '') {
        // Clone parts so I don't mutate the original object
        parts = { ...parts }
        delete parts[part.index]
        return {
          ...state,
          parts,
          shares,
        }
      }

      let scanIndex = (action.meta?.scan || state.scanIndex)
      return {
        ...state,
        parts: {
          ...parts,
          [part.index]: part
        },
        shares,
        scanIndex,
      }
    }
    case 'clearScan': {
      if (state.scanIndex === action.payload) {
        return {
          ...state,
          scanIndex: undefined
        }
      }
      return state
    }
    default:
      unreachable(action)
  }

  return state
}


function queryToPart(query: URLSearchParams): Part | null {
  const index = Number(query.get('index'))
  const hex = query.get('hex')
  const shares = Number(query.get('shares') ?? query.get('numParts'))
  const label = query.get('label')
  const threshold = Number(query.get('threshold') ?? query.get('quorum'))
  if (
    !isNaN(index)
    && index > 0
    && hex
    && !isNaN(shares)
    && shares > 0
    && !isNaN(threshold)
    && threshold > 0
    && label != null
  ) {
    const part: Part = {
      index,
      hex,
      label,
      shares,
      threshold
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
  var beep = React.useMemo(() => new Audio(mp3), [])

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

  const { shares, parts } = state
  const handleChangeShares = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    dispatch({
      type: 'setShares',
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
      dispatch({ type: 'reset' })
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
      && p.shares === parts[0].shares
      && p.threshold === parts[0].threshold

    ))

    if (
      parts[0]
      && 'threshold' in parts[0]
      && parts.length === parts[0].threshold
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
        const url = new URL(data.replace(/#/, '?'))
        const part = queryToPart(url.searchParams)

        if (part != null && part.hex !== parts[part.index]?.hex) {

          const scan = Math.random()
          dispatch({
            type: 'setPart',
            payload: part,
            meta: { scan }
          })
          setTimeout(() => {
            dispatch({ type: 'clearScan', payload: scan })
          }, 1000)
        }
      } catch (e) {
      }
    }
  }

  React.useEffect(() => {
    if (state.scanIndex != null) {

      try {
        window.navigator.vibrate(200);
      } catch (e) {
        console.error(e)
      }
      try {
        beep.play();
      } catch (e) {
        console.error(e)
      }

    }
  }, [beep, state.scanIndex])

  const partsOptions = new Array(MAX_PARTS - MIN_PARTS)
    .fill(0)
    .map((_n, index) => (
      <MenuItem key={index} value={index + MIN_PARTS}>{index + MIN_PARTS}</MenuItem>
    ))

  const partInputs: JSX.Element[] = []
  for (let i = 1; i <= shares; i++) {
    partInputs.push(
      <PartInput key={`${i}/${shares}`} index={i} part={parts[i]} onChange={handleChangeHex} />
    )
  }
  if (secret) {
    let content = <span>{secret}</span>
    try {
      const url = new URL(secret)
      content = (
        <a href={url.href}>{secret}</a>
      )
    } catch (e) {
      // Ignore URL parsing errors
    }

    return (
      <Card>
        <CardContent>
          {content}
        </CardContent>
      </Card>
    )

  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent className={classnames(classes.cardContent, {
          [styles.success]: state.scanIndex != null,
        })}>
          {scanning ? (
            <React.Fragment>
              <QrReader
                className={styles.qr}
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
            name="shares"
            select
            label="Shares"
            value={shares}
            onChange={handleChangeShares}
          >
            {partsOptions}
          </TextField>

          {partInputs}

        </CardContent>
        <CardActions>
          <Button type="submit" color="primary" variant="outlined" data-testid="done-btn">
            Done
          </Button>
        </CardActions>
      </Card>
    </form>
  )
}
