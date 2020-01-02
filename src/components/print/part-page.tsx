import React from 'react'
import { Part } from '../../types'
import styles from './part-page.module.css'
import QRCode from 'qrcode.react'


type Props = {
  part: Part
}

export default function PartPage({ part }: Props) {

  return (
    <div className={styles.page}>
      <h1>{part.label}</h1>
      <h2>{part.index} of {part.numParts}</h2>

      <QRCode
        className={styles.qr}
        renderAs="svg"
        size={512}
        value={JSON.stringify(part)}
      />

      <p>
        If the QR code doesn't scan, you can type in the following:
      </p>
      <div>
        {part.hex}
      </div>
    </div>
  )
}
