import React from 'react'
import styles from '../styles/Button.module.css'

function Button({onClick, type, textButton}) {

  return (
    <>
        <button className={styles.btnSuccesses} onClick={onClick} type={type}>
            {textButton}
        </button>
    </>
  )
}

export default Button