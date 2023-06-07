import React from 'react'
import Button from '../components/Button'
import Navbar from '../components/Navbar'
import {NavLink} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {resetDog} from '../redux/actions.js'
import Loader from '../components/Loader'

//--- Styles ---//

import styles from '../styles/Detail.module.css'


function Detail() {

  const dispatch = useDispatch()
  const {name, image, weight, temperament, life_span, height} = useSelector((state) => state.dog)
  
  const funcResetDog = () => {
    dispatch(resetDog())
  }

  return (
    <div className={styles.detailConteiner}>
        <Navbar/>
        <div className={styles.cardDetailConteiner}>
          {
            !name 
            ?
            <Loader/> 
            : 
            <div className={styles.cardContainer}>
              <img src={image} alt="" />
              <div className={styles.dataContainer}>
                  <div>
                    <h2>{name}</h2>
                    <div>
                      <h4>Weight:</h4>
                      <p>{weight} Kg</p>
                    </div>
                    <div>
                      <h4>Height:</h4>
                      <p>{height} Cm</p>
                    </div>
                    <div>
                      <h4>Temperaments</h4>
                      <p>{temperament}</p>
                    </div>
                    <div>
                      <h4>Life Span:</h4>
                      <p>{life_span}</p>
                    </div>
                  </div>
              </div>
            </div>
          }
        <NavLink className={styles.button} to='/home'>
            <Button textButton = "Home" onClick={()=> funcResetDog()}/>
        </NavLink>
        
        </div>
        


         
    </div>
  )
}

export default Detail