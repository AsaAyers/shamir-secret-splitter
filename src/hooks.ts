import React from 'react'

export function useHtmlId() {
  const id = React.useMemo(() => Math.random().toString(16).substr(2), [])

  return (name: string) => name + '-' + id
}
