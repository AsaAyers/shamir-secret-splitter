import React from 'react'
import { Part } from '../types'
import styles from './part-page.module.css'


type Props = {
  part: Part
}

export default function PartPage({ part }: Props) {

  return (
    <div className={styles.page}>
      <h1>{part.label}</h1>
      <h2>{part.index} of {part.numParts}</h2>


      If the QR code doesn't scan, you can type in the following:
      <div>
        {part.hex}
      </div>
    </div>
  )
}
