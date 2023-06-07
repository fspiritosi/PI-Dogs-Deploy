import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'



import styles from '../styles/Navbar.module.css'




function Navbar() {
  const [clicked, setClicked] = useState(false)

  const hancleClicked = () => {
    setClicked(!clicked)
  }

  return (
    <div className={styles.header}>
        <NavLink className={styles.logo}to='/home'>
          <div></div>
        </NavLink>
        <ul className={clicked ? styles.nav : styles.navActive}>
            <li><NavLink to='/form'>Create Dog</NavLink></li>
        </ul>
        <div className={styles.menuToggle} onClick={hancleClicked}>
         <i className={clicked ? 'fa-solid fa-circle-xmark' : "fa-solid fa-bars"}></i>
         
        </div>
    </div>
  )
}

export default Navbar