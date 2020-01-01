import React from 'react'
import { Secret } from './types'
import { useLocation, useHistory, Link } from "react-router-dom";

export function useSecretFromLocation(): Secret | null {
  const location = useLocation()

  if (!location.state) {
    return null
  }

  return {
    label: location.state.label || "",
    secret: location.state.secret || "",
    parts: location.state.parts || 0,
    subset: location.state.subset || 0,
  }
}

export default function PrintSecret() {
  const history = useHistory()
  const secret = useSecretFromLocation()

  React.useEffect(() => {
    if (
      secret == null
      || !secret.label
      || !secret.secret
      || !secret.parts
      || !secret.subset
    ) {
      history.push('/new', secret)
    }
  }, [history, secret])


  return (
    <React.Fragment>
      <h1>Secret</h1>

      <pre>{JSON.stringify(secret, null, 2)}</pre>
      <Link to={{ pathname: '/new', state: secret }}>
        Edit
      </Link>


    </React.Fragment>
  )
}
