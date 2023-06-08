import {
  GET_DOGS,
  GET_TEMPERAMENTS,
  GET_DOGS_BY_NAME,
  FILTER_BY_ORIGIN,
  FILTER_BY_TEMPERAMENT,
  ORDER_BY_RAZA,
  ORDER_BY_WEIGHT,
  GET_DOG,
  RESET_DOG
} from "./types.js";

import axios from 'axios'

export const getAllDogs = () => async (dispatch) => {
    const resp = await axios.get('/dogs')
    
    dispatch({
        type: GET_DOGS,
        payload: resp.data
    })
}

export const getTemperaments = () => async (dispatch) => {
    const resp = await axios.get('/temperaments')
    dispatch({
        type: GET_TEMPERAMENTS,
        payload: resp.data
        })
}

export const getDogsByName = (name) => async (dispatch) => {
    const resp = await axios.get(`/dogs?name=${name}`);
    dispatch({
      type: GET_DOGS_BY_NAME,
      payload: resp.data
    });
}

export const getDogById = (id) => async(dispatch) => {
    const resp = await axios.get(`/dogs/${id}`);
    dispatch({
        type: GET_DOG,
        payload: resp.data
    })
}

export const filterDogsByOrigin = (data) => {
    return {
        type: FILTER_BY_ORIGIN,
        payload: data
    }
}

export const filterDogsByTemperament = (data) =>  {
    return {
        type: FILTER_BY_TEMPERAMENT,
        payload: data
    }
}

export const orderByRaza = (data) => {
    return {
        type: ORDER_BY_RAZA,
        payload: data
    }
}

export const orderByWeight = (data) => {
  return {
    type: ORDER_BY_WEIGHT,
    payload: data,
  };
};

export const resetDog = () => {
    return {
        type: RESET_DOG,
        payload: []
    }
}