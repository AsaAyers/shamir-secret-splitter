import React from 'react'
import { Routes } from '../../constants'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'

console.log('nav', styles)

export default function Nav() {

  return (
    <nav className={styles.nav}>
      <ul>
        <li><Link to={Routes.Edit}>New Secret</Link></li>
        <li><Link to={Routes.Assemble}>Assemble Secret</Link></li>
      </ul>
    </nav>
  )

}
