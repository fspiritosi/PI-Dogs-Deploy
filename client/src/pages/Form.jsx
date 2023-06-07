import React, { useState, useEffect } from 'react'
import styles from '../styles/Form.module.css'
import Button from '../components/Button'
import NavBar from '../components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import validate from '../helpers/validateForm.js'
import axios from 'axios'
import {getAllDogs, getTemperaments} from '../redux/actions.js'



function Form() {

    const dispatch = useDispatch()

    const temperaments = useSelector((state) => state.temperaments)
    
    const [errors, setErrors] = useState({})
    const [inputs, setInputs] = useState({
        name: "",
        image: "",
        height: "",
        weight: [],
        life_span: "",
        temperament: []
    })


    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }

    const handleWeightChange = (e) => {
    
        if(inputs.weight.length === 0){
            setInputs({
                ...inputs,
                weight:[...e.target.value] 
            })
        }else if(e.target.id === "minW" && inputs.weight[1]){
            setInputs({
                ...inputs,
                weight: [...e.target.value, ...inputs.weight[1]]
            })
        }else if(e.target.id === "maxW" && inputs.weight[0]){
            setInputs({
                ...inputs,
                weight: [...inputs.weight[0], ...e.target.value]
            })
        }
    }

    const handleTemperamentChange = (e) => {   

        addOrDeleteTemperament(e)
        
        // if(inputs.temperament.length === 0){
        //     unCheck(e)
        // }

    }

    const addOrDeleteTemperament = (e) => {
        if(e.target.checked && inputs.temperament.length === 0 ){
            setInputs({
                ...inputs,
                temperament: [e.target.value]
            })
        }else if(e.target.checked){
            setInputs ({
                ...inputs,
                temperament: [...inputs.temperament , e.target.value]
            })
        }else if(!e.target.checked && inputs.temperament.length !== 0){
            const filterTemp = inputs.temperament.filter((ele) => ele !== e.target.value);
            setInputs({
                ...inputs,
                temperament: filterTemp
            })
        }
    }

    // const unCheck = (e) => {
    //     return e.target.checked=false
        
    // }
    // console.log(inputs)
   
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const verify = validate(inputs);
        if(Object.keys(verify).length === 0){

            axios.post('http://localhost:3001/dogs', inputs)
            alert(`${inputs.name} create successfully`)

            setInputs({
                name: "",
                image: "",
                height: "",
                weight: [],
                life_span: "",
                temperament: []
            })
            setErrors({})
            dispatch(getAllDogs())
            
    
        }else{
            setErrors({
                ...verify
            })
        }
    }
    
    const handleReset = (e) => {
        e.preventDefault(e);

        setInputs({
            name: "",
            image: "",
            height: "",
            weight: [],
            life_span: "",
            temperament: []
        });
        setErrors({})

        
    };

    useEffect(() => {dispatch(getTemperaments())}, [dispatch])

  return (
    <div>
        <NavBar/>
        <div className={styles.header}>
            <h2>Create your Dog</h2>
        </div>
        <form action="" onSubmit={(e) => handleSubmit(e)} className={styles.formBody}>
            <div>
                <div className={styles.formSection}>
                    <label > Name</label>
                    <input className={!errors.name ? '' : styles.inputsBad} type="text" name='name' onChange={(e) => handleChange(e)} value={inputs.name} />
                    <br />
                    <span>{errors.name}</span>
                </div>
                <div className={styles.formSection}>
                    <label>Image</label>
                    <input className={!errors.image ? '' : styles.inputsBad} type="text" name='image' onChange={(e) => handleChange(e)} value={inputs.image}/>
                    <br />
                    <span>{errors.image}</span>
                </div>
                <div className={styles.formSection}>
                    <label >Height</label>
                    <input className={!errors.height ? '' : styles.inputsBad} type="text" placeholder='minimum height - maximum height'  name="height" onChange={(e) => handleChange(e)} value={inputs.height}/>
                    <br />
                    <span>{errors.height}</span>
                </div>
                <div className={styles.formSection}>
                    <label >Min Weight</label>
                    <input className={!errors.weight ? '' : styles.inputsBad} type="number" id="minW" onChange={(e) => handleWeightChange(e)} value={inputs.weight[0]}/>
                    <br />
                    <span>{errors.weight}</span>    
                </div>
                <div className={styles.formSection}>
                    <label >Max Weight</label>
                    <input className={!errors.weight ? '' : styles.inputsBad} type="number" id="maxW" onChange={(e) => handleWeightChange(e)} value={inputs.weight[1] || ''}/>
                    <br />
                    <span>{errors.weight}</span>
                </div>
                <div className={styles.formSection}>
                    <label >Life_span</label>
                    <input className={!errors.life_span ? '' : styles.inputsBad} type="number" name='life_span' onChange={(e) => handleChange(e)} value={inputs.life_span} />
                    <br />
                    <span>{errors.life_span}</span>
                </div>
            </div>
            <div className={styles.formSection}>
                <h3>Temperaments</h3>
                <div className={styles.tempContainer}>
                    {temperaments?.map((temp) => (
                        <div className={styles.tempItem} key={temp.id}>
                            <input type='checkbox' value={temp.name} onChange={(e) => handleTemperamentChange(e)}/>
                            <label>{temp.name}</label>
                        </div>
                    ))}
                </div>
                <br />
                <span>{errors.temperament}</span>
            </div>
           
            <Button textButton = "Create" type="submit"/>
            <Button textButton = "Reset" onClick={(e) => handleReset(e)}></Button>

        </form>
        
    </div>
  )
}

export default Form