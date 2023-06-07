import React from 'react'
import {NavLink} from 'react-router-dom'
import styles from '../styles/NotFound.module.css'

function Notfound() {
  return (
    <div className={styles.container}>
       <div className={styles.dataContainer}>
            <h1>Error 404</h1>
            <h4>Page Not found</h4>
            <NavLink className={styles.btn} to="/home">Go Home</NavLink>
       </div>
    </div>
  )
}

export default Notfound