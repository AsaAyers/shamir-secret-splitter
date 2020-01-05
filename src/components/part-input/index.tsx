import React from 'react'
import { TextField } from '@material-ui/core';
import { Part, MinimumPart } from '../../types'
import { hexToWords, wordsToHex } from '../../pgp-phrase'
import { useHtmlId } from '../../hooks';

type Props = {
  part?: MinimumPart | Part,
  onChange?: (index: number, hex: string) => void,
  index: number,
}

type State = {
  hex: string,
  text: string,
  error: null | string,
}

const initialState: State = {
  hex: '',
  text: '',
  error: null,
}


function reducer(state: State, text: string): State {
  let hex = wordsToHex(text)
  if (typeof hex !== 'string') {
    const tmp = text.split(/\s+/g)
    tmp.pop()
    hex = wordsToHex(tmp.join(' '))
  }

  if (typeof hex == 'string') {
    return { hex, text, error: null, }
  }

  return {
    ...state,
    text,
    error: `${hex.word} not recognized`
  }
}

export default function PartInput({ part, onChange, index }: Props) {
  const id = useHtmlId()
  const hex = part?.hex ?? ""
  const [state, dispatch] = React.useReducer(reducer, initialState, (state) => {
    const result = hexToWords(hex).join(' ')
    if (typeof result === 'string') {
      return {
        ...state,
        text: result
      }
    }
    return state
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) { return }

    const value = e.target.value
    dispatch(value)
    const newHex = wordsToHex(value)

    if (typeof newHex === 'string' && newHex !== hex) {
      onChange(index, newHex)
    }
  }

  return (
    <TextField
      onChange={handleChange}
      multiline
      id={id(`part-${index}`)}
      error={state.error != null}
      helperText={state.error}
      value={state.text}
      name="label"
      label={`Part ${index}`} />
  )

}
