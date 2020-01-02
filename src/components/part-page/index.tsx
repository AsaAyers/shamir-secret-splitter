import React from 'react'
import { Part } from '../../types'
import PartInput from '../part-input'
import styles from './styles.module.css'


type Props = {
  part: Part
  children: React.ReactNode
}

export default function PartPage({ part, children }: Props) {


  return (
    <div className={styles.page}>
      <h1>{part.label}</h1>
      <h2>{part.index} of {part.numParts}</h2>

      {children}

      <p>
        If the QR code doesn't scan, you can type in the following:
      </p>
      <div>
        <PartInput part={part}
          onChange={() => { }}
          index={part.index}
        />
      </div>
    </div>
  )
}
