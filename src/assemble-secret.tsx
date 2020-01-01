import React from 'react';
import { MAX_PARTS, MIN_PARTS, DEFAULT_PARTS } from './constants'
import { useHtmlId } from './hooks'
import { Part, MinimumPart } from './types'
import { join } from './wrapper'

const defaultParts: Record<string, Part | MinimumPart> = {}

defaultParts[1] = { index: 1, hex: "9cd7abd051be9f766af0a9" }
defaultParts[3] = { index: 3, hex: "f2cfe26ecbf14c140c8656" }
defaultParts[4] = { index: 4, hex: "cdd2a352f50591f0fdcf62" }

export default function AssembleSecret() {
  const id = useHtmlId()
  const [secret, setSecret] = React.useState<null | string>(null)
  const [numParts, setNumParts] = React.useState(DEFAULT_PARTS)
  const handleChangeNumParts = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNumParts(Number(e.target.value))
  }

  const [parts, setParts] = React.useState(defaultParts)

  const handleChangeHex = (index: number, hex: string) => setParts((parts) => {
    const current = parts[index] ?? { index, hex: '' }
    return {
      ...parts,
      [index]: {
        ...current,
        hex
      }
    }
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const secret = join(
        Object.values(parts)
      )
      setSecret(secret)
    } catch (e) {
      console.error(e)
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

type PartProps = {
  part?: MinimumPart | Part,
  onChange: (index: number, hex: string) => void,
  index: number,
}
function PartInput({ part, onChange, index }: PartProps) {
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
