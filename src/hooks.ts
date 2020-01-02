import React from 'react'
import { useLocation } from 'react-router-dom'

export function useHtmlId() {
  const id = React.useMemo(() => Math.random().toString(16).substr(2), [])

  return (name: string) => name + '-' + id
}


export function useQuery() {
  return new URLSearchParams(useLocation().search);
}
