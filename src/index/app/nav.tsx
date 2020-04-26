import React from 'react'
import { Tabs, Tab } from '@material-ui/core'
import { Routes } from '../shared/constants'
import { useHistory, useLocation } from 'react-router-dom'
import styles from './nav/styles.module.css'

export default function Nav() {
  const location = useLocation()
  const history = useHistory()

  const handleChange = (event: any, pathname: string) => {
    history.push(pathname)
  }
  let tabValue = Routes.Edit
  switch (location.pathname) {
    case Routes.Assemble:
      tabValue = Routes.Assemble
      break;
    case Routes.Edit:
    case Routes.Print:
    default:
      tabValue = Routes.Edit
  }


  return (
    <nav className={styles.nav}>
      <Tabs value={tabValue} onChange={handleChange} >
        <Tab value={Routes.Edit} label="New Secret" />
        <Tab value={Routes.Assemble} label="Assemble Secret" />
      </Tabs>
    </nav >
  )
}
