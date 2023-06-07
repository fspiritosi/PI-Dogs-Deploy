import React from 'react'
import {NavLink} from 'react-router-dom'
import  styles from '../styles/LandingPage.module.css'



function LandingPage() {

  
  return (
    <div className={styles.container}>
      
      <div className={styles.box}>
        <h3>Wellcome to de Dog word!!</h3>
        <NavLink to='/home'>
          <button>Ingresar</button>
        </NavLink>
      </div>
    </div>
  )
}

export default LandingPage