import React from 'react'
import {
  useLocation, useHistory, Link
} from "react-router-dom";
import QRCode from 'qrcode.react'
import { Routes } from '../../constants'
import PartPage from '../part-page'
import { Secret } from '../../types'
import { split } from '../../wrapper'
import styles from './styles.module.css'

export function useSecretFromLocation(): Secret | null {
  const location = useLocation()

  return React.useMemo(() => {
    if (!location.state) {
      return null
    }
    const numParts = Number(location.state.numParts || 0)
    const quorum = Number(location.state.quorum || 0)

    if (!numParts || !quorum || quorum >= numParts) {
      return null
    }

    return {
      label: location.state.label || "",
      text: location.state.text || "",
      numParts,
      quorum,
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
      || !secret.numParts
      || !secret.quorum
    ) {
      history.push(Routes.Edit, secret)
    }
  }, [history, parts, secret])

  if (parts == null) return null

  return (
    <React.Fragment>
      <div className={styles.noPrint}>
        <h1>Secret</h1>

        <pre>{JSON.stringify(secret, null, 2)}</pre>
        <Link to={{ pathname: Routes.Edit, state: secret }}>
          Edit
      </Link>

      </div>
      {parts.map((part) => {

        const search = new URLSearchParams()
        search.set('index', String(part.index))
        search.set('hex', part.hex)
        search.set('numParts', String(part.numParts))
        search.set('quorum', String(part.quorum))
        search.set('label', String(part.label))


        // const label = query.get('label')

        console.log('search', search.toString())

        const destination: any = {
          pathname: Routes.Assemble,
          search: search.toString(),
        }

        const href = window.location.protocol + '//' + window.location.host
          + history.createHref(destination)


        return (
          <PartPage part={part} key={part.index} >
            <Link to={destination}>
              <QRCode
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
