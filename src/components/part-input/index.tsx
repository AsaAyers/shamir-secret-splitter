import React from 'react'
import { TextField } from '@material-ui/core';
import { Part, MinimumPart } from '../../types'

type Props = {
  part?: MinimumPart | Part,
  onChange: (index: number, hex: string) => void,
  index: number,
}

export default function PartInput({ part, onChange, index }: Props) {
  const hex = part?.hex ?? ""
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(index, e.target.value)
  }

  return (
    <TextField
      onChange={handleChange}
      value={hex}
      name="label"
      label={`Part ${index}`} />
  )

}
