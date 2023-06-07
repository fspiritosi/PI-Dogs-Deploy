//--- External Imports ---//
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

//--- Components Imports---//
import Navbar from '../components/Navbar.jsx'
import Cards from '../components/Cards.jsx'
import Filterbar from '../components/Filterbar.jsx'
import Loader from '../components/Loader.jsx';

//--- Styles Imports ---//
import styles from '../styles/Home.module.css'

//--- Complements Imports ---//

import { getAllDogs, getTemperaments } from '../redux/actions.js'


function Home() {

  const dispatch = useDispatch();

  const allDogs = useSelector((state) => state.dogs)


  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getTemperaments())
  }, [dispatch])

  return (
    <div className={styles.homeContainer}>
        <div className={styles.headerContainer}>
          <Navbar></Navbar>
          <Filterbar></Filterbar>
        </div>
        <div className={styles.cardContainer}>
          {allDogs.length < 1 ? <Loader/> : <Cards />}
        </div>
        
        
    </div>
  )
}

export default Home