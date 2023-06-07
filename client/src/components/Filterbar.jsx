
import { useDispatch, useSelector } from 'react-redux'
import styles from '../styles/Filterbar.module.css'
import Searchbar from './Searchbar'
import {filterDogsByOrigin, filterDogsByTemperament, orderByRaza, orderByWeight} from '../redux/actions.js'

function Filterbar() {

  const dispatch = useDispatch()
  const allDogs = useSelector((state) => state.allDogs)
  const dogs = useSelector((state) => state.dogs)
  const temperaments = useSelector((state) => state.temperaments)



  const handlefilterByOrigin = (e) => {
    
    const dataOptions = ['all', 'db', 'api']

    const dataFilter = e.target.value
    if(dataFilter === dataOptions[1]) {
      const dogsDB = dogs.filter(dog => typeof(dog.id) !== 'number')
      dispatch(filterDogsByOrigin(dogsDB))
    }else if(dataFilter === dataOptions[2]){
      const dogsApi = dogs.filter(dog => typeof(dog.id) === 'number' )
      dispatch(filterDogsByOrigin(dogsApi))
    }else if(dataFilter === dataOptions[0]){
      dispatch(filterDogsByOrigin(allDogs))
    }else{
      dispatch(filterDogsByOrigin([]))
    }
  }

  const handleFilterByTemperament = (e) => {

    if(e.target.value !== "all"){
      const tempFilter = e.target.value;
      const filteredDogs = allDogs.filter((dog) => dog.temperament?.includes(tempFilter) ? dog : '')
      dispatch(filterDogsByTemperament(filteredDogs))
    }else{
      dispatch(filterDogsByTemperament(allDogs))
    }

    }


  
  const handleOrderByRaza = (e) => {
    const orderData = e.target.value;

    if(orderData === "a") {
      const asendentOrder = dogs.sort(
        (a, b) => {
          if(a.name.toLowerCase() > (b.name.toLowerCase())) return 1
          if(a.name.toLowerCase() < (b.name.toLowerCase())) return -1
          return 0
        }) 
        dispatch(orderByRaza(asendentOrder))
    }
    if(orderData === "z") {
      const desendentOrder = dogs.sort(
        (a, b) => {
          if(a.name.toLowerCase() < (b.name.toLowerCase())) return 1
          if(a.name.toLowerCase() > (b.name.toLowerCase())) return -1
          return 0
        }) 
        dispatch(orderByRaza(desendentOrder))
    }

  }

   const handleOrderByWeight = (e) => {
    const orderData = e.target.value;

    if(orderData === "light") {
      const asendentOrder = dogs.sort(
        (a, b) => {
          if(!a.weight[0]) {a.weight[0] = a.weight[1]}
          if(a.weight[0] > b.weight[0]) return 1
          if(a.weight[0] < b.weight[0]) return -1
          return 0
        }) 
        dispatch(orderByWeight(asendentOrder))
    }
    if(orderData === "heavy") {
      const desendentOrder = dogs.sort(
        (a, b) => {
          if(!a.weight[0]) {a.weight[0] = a.weight[1]}
          if(a.weight[0] < b.weight[0]) return 1
          if(a.weight[0] > b.weight[0]) return -1
          return 0
        }) 
        dispatch(orderByWeight(desendentOrder))
    }
    
  }

  return (
    <div className={styles.filterContainer}>
        <div className={styles.search}>
         <Searchbar/>
        </div>
        <div className={styles.filters}>
          <div className={styles.sectionContainer}>
              <p>Temperaments</p>
              <section className={styles.section}>
                {/* <h4>Temeperaments</h4> */}
                <select className={styles.select} onChange={(e) => handleFilterByTemperament(e)}>
                  <optgroup label='Select Temperament' >
                    <option value="all">Temperaments</option>
                  {temperaments?.map((temp) => (<option value={temp.name} key={temp.id}>{temp.name}</option>))}
                  </optgroup>
                </select> 
              </section>
          </div>
          <div className={styles.sectionContainer}>
            <p>Origin</p>
            <section className={styles.section}>
              <select className={styles.select} onChange={(e) => handlefilterByOrigin(e)}>
                <optgroup rating='origin' label='Origin'>
                  <option value='all'>All</option>
                  <option value="db">Data Base</option>
                  <option value="api">API</option>
                </optgroup>
              </select>
            </section>
          </div>
          <div className={styles.sectionContainer}>
            <p>Name</p>
            <section className={styles.section}>
              <select className={styles.select}  onChange={(e) => handleOrderByRaza(e)}>
                <optgroup rating='Name' label='Name Order'>
                  <option value='a'>A - Z</option>
                  <option value="z">Z - A</option>
                </optgroup>
              </select>
            </section>
          </div>
          <div className={styles.sectionContainer}>
            <p>Heigth</p>
            <section className={styles.section} >
              <select className={styles.select} onChange={(e) => handleOrderByWeight(e)}>
                <optgroup rating='origin' label='Weight'>
                  <option value='light'>Light</option>
                  <option value="heavy">heavy</option>
                </optgroup>
              </select>
            </section>
          </div>
        </div>
    </div>
  )
}

export default Filterbar