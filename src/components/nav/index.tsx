import React from 'react'
import { Tabs, Tab } from '@material-ui/core'
import { Routes } from '../../constants'
import { useHistory, useLocation } from 'react-router-dom'
import styles from './styles.module.css'

console.log('nav', styles)

export default function Nav() {
  const location = useLocation()
  const history = useHistory()

  const handleChange = (event: any, pathname: string) => {
    history.push(pathname)
  }

  return (
    <nav className={styles.nav}>
      <Tabs
        value={location.pathname}
        onChange={handleChange}
      >
        <Tab value={Routes.Edit} label="New Secret" />
        <Tab value={Routes.Assemble} label="Assemble Secret" />
      </Tabs>
    </nav >
  )
}
