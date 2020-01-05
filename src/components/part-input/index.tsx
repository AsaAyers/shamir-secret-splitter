import React from 'react'
import { TextField } from '@material-ui/core';
import { Part, MinimumPart } from '../../types'
import { hexToWords, wordsToHex } from '../../pgp-phrase'
import { useHtmlId } from '../../hooks';

type Props = {
  part?: MinimumPart | Part,
  onChange: (index: number, hex: string) => void,
  index: number,
}

type State = {
  hex: string,
  text: string,
  error: boolean,
}

const initialState = {
  hex: '',
  text: '',
  error: false,
}


function reducer(state: State, text: string) {
  let hex = wordsToHex(text)
  if (hex == null) {
    const tmp = text.split(/\s*/g)
    tmp.pop()
    hex = wordsToHex(tmp.join(' '))
  }

  if (hex != null) {
    return { hex, text, error: false, }
  }

  return {
    ...state,
    text,
    error: true
  }
}

export default function PartInput({ part, onChange, index }: Props) {
  const id = useHtmlId()
  const hex = part?.hex ?? ""
  const [state, dispatch] = React.useReducer(reducer, initialState, (state) => {
    state.text = hexToWords(hex).join(' ')
    return state
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    dispatch(value)
    const hex = wordsToHex(value)

    if (hex) {
      onChange(index, hex)
    }
  }

  return (
    <TextField
      onChange={handleChange}
      multiline
      id={id(`part-${index}`)}
      error={state.error}
      value={state.text}
      name="label"
      label={`Part ${index}`} />
  )

}
