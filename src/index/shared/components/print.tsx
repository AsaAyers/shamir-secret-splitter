import React from 'react'
import {
  useLocation, useHistory, Link
} from "react-router-dom";
import QRCode from 'qrcode.react'
import { Button, Card, CardContent, CardActions } from '@material-ui/core';
import { Routes } from '../constants'
import PartPage from '../../app/edit/print/part-page'
import { Secret } from '../../app/shared/types'
import { split } from '../../app/shared/wrapper'
import styles from '../../app/edit/print/styles.module.css'

export function useSecretFromLocation(): Secret | null {
  const location = useLocation<Secret>()

  return React.useMemo(() => {
    if (!location.state) {
      return null
    }
    const shares = Number(location.state.shares || 0)
    const threshold = Number(location.state.threshold || 0)

    if (!shares || !threshold || threshold >= shares) {
      return null
    }

    return {
      label: location.state.label || "",
      text: location.state.text || "",
      shares,
      threshold,
    }
  }, [location.state])
}


export function useShamir(secret: Secret | null) {
  return React.useMemo(() => {
    if (secret == null) {
      return
    }
    return split(secret)
  }, [secret])
}

export default function PrintSecret() {
  const history = useHistory()
  const secret = useSecretFromLocation()
  const parts = useShamir(secret)


  React.useEffect(() => {
    if (
      parts == null
      || secret == null
      || !secret.label
      || !secret.text
      || !secret.shares
      || !secret.threshold
    ) {
      history.push(Routes.Edit, secret)
    }
  }, [history, parts, secret])

  if (parts == null || secret == null) return null

  return (
    <React.Fragment>
      <Card className={styles.noPrint}>
        <CardContent>
          <p>
            Thew following pages contain your secret. Print them and distribute
            them to different locations. From the Assemble Secret page, if you
            scan any {secret.threshold} of these codes, it will display your
            secret.
          </p>
        </CardContent>
        <CardActions>
          <Link to={{ pathname: Routes.Edit, state: secret }}>
            <Button variant="outlined">
              Edit
            </Button>
          </Link>

          <Button onClick={() => window.print()} variant="outlined">
            Print
          </Button>
        </CardActions>
      </Card>
      {parts.map((part) => {

        const search = new URLSearchParams()
        search.set('index', String(part.index))
        search.set('hex', part.hex)
        search.set('shares', String(part.shares))
        search.set('threshold', String(part.threshold))
        search.set('label', String(part.label))

        const destination: any = {
          pathname: Routes.Assemble,
          hash: search.toString(),
        }

        const href = window.location.protocol + '//' + window.location.host
          + history.createHref(destination)


        return (
          <PartPage part={part} key={part.index} >
            <Link to={destination}>
              <QRCode
                className={styles.qr}
                renderAs="svg"
                size={512}
                value={href}
              />
            </Link>
          </PartPage>
        )
      }
      )}

    </React.Fragment>
  )
}
