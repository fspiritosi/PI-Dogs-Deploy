import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { getDogsByName } from '../redux/actions.js'
import styles from '../styles/Searchbar.module.css'

function Searchbar() {

  const dispatch = useDispatch()
 
  const [name, setName] = useState('')

  const handleInputChange = (e) => {
    e.preventDefault()
    setName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(getDogsByName(name))
    setName('')

  }

  return (
    
      <form onSubmit={(e) => handleSubmit(e)} className={styles.formContainer}>
        <input type="text" placeholder='Search...' value={name} onChange={(e) => handleInputChange(e)}/>
        <button>
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </form>
    
  )
}

export default Searchbar

