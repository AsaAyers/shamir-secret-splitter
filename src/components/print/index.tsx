import React from 'react'
import { useLocation, useHistory, Link } from "react-router-dom";
import PartPage from './part-page'
import { Secret } from '../../types'
import { Routes } from '../../constants';
import { split } from '../../wrapper'

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
      <h1>Secret</h1>

      <pre>{JSON.stringify(secret, null, 2)}</pre>
      <Link to={{ pathname: Routes.Edit, state: secret }}>
        Edit
      </Link>

      {parts.map((part) => (
        <PartPage part={part} key={part.index} />
      ))}

    </React.Fragment>
  )
}
