import React from 'react'
import styles from '../styles/Card.module.css'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getDogById } from '../redux/actions'

function Card(props) {

  const dispatch = useDispatch()
  const tempDog = props.temperament
  const id = props.id
  


  const handleClik = () => {
    dispatch(getDogById(id))
  }
  
  return (
    <NavLink to='/detail' onClick={handleClik}>
      <div className={styles.card_container} >
        <div className={styles.card_cont}>
            <img src={props.image} alt="not found" width='400px' height='auto'/>
            <div className={styles.card_data}>
              <h3 className={styles.card_title}>{props.name}</h3>
              <div>
                <h4 className={styles.weigthTitle}>Weigth:</h4>
                <h5 className={styles.card_weigth}>{props.weight[0]} to {props.weight[1]} Kg</h5>
              </div>
              <div className={styles.card_temperament}>
                <h6>Temperament:</h6> 
                <div className={styles.temperamentConteiner}>
                  {tempDog?.map(e => (<li key={e}>{e}</li>))}
                </div>
              </div>
            </div>
        </div>
    </div>
    </NavLink>

  )
}

export default Card