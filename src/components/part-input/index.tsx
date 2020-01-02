import React from 'react'
import { useHtmlId } from '../../hooks'
import { Part, MinimumPart } from '../../types'

type Props = {
  part?: MinimumPart | Part,
  onChange: (index: number, hex: string) => void,
  index: number,
}

export default function PartInput({ part, onChange, index }: Props) {
  const id = useHtmlId()

  const hex = part?.hex ?? ""
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(index, e.target.value)
  }

  return (
    <div>
      <label htmlFor={id('hex')}>
        Part {index}
      </label>
      <input
        onChange={handleChange}
        value={hex}
        name="hex"
        id={id('hex')} />


    </div>
  )

}
