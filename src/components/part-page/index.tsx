import React from 'react'
import { Paper } from '@material-ui/core'
import { Part } from '../../types'
import PartInput from '../part-input'
import styles from './styles.module.css'
import { useHistory } from 'react-router-dom'
import { Routes } from '../../constants'


type Props = {
  part: Part
  children: React.ReactNode
}

export default function PartPage({ part, children }: Props) {
  const history = useHistory()

  const href = window.location.protocol + '//' + window.location.host
    + history.createHref({ pathname: Routes.Assemble })
  return (
    <Paper className={styles.page}>
      <h1>{part.label}</h1>
      <h2>{part.index} of {part.numParts}</h2>

      {children}

      <strong>{href}</strong>
      <p>
        If the QR code doesn't scan, you can go to the URL above and type in the
        following into the textbox for <strong>Part {part.index}</strong>:
      </p>
      <PartInput part={part} index={part.index}
      />
    </Paper>
  )
}
