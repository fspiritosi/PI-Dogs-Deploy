import { GET_DOGS, GET_TEMPERAMENTS, GET_DOGS_BY_NAME, FILTER_BY_ORIGIN, FILTER_BY_TEMPERAMENT, ORDER_BY_RAZA, ORDER_BY_WEIGHT, GET_DOG, RESET_DOG} from './types.js'
const initialState = {
    dogs: [],
    allDogs: [],
    filterDogs: [],
    temperaments: [],
    dog:[]
}

function rootReducer(state = initialState, {type, payload}){
    switch (type) {
      case GET_DOGS:
        return {
          ...state,
          dogs: [...payload],
          allDogs: [...payload],
        };
      case GET_TEMPERAMENTS:
        return {
          ...state,
          temperaments: payload,
        };
      case GET_DOGS_BY_NAME:
        return {
          ...state,
          dogs: [...payload],
        };
      case GET_DOG:
        return {
          ...state,
          dog: payload
        }
      case FILTER_BY_ORIGIN:
        return {
          ...state,
          dogs: [...payload],
        };
      case FILTER_BY_TEMPERAMENT:
        return {
          ...state,
          dogs: [...payload],
        };
      case ORDER_BY_RAZA:
        return {
          ...state,
          dogs: [...payload],
        };
      case ORDER_BY_WEIGHT:
        return {
          ...state,
          dogs: [...payload],
        };
      case RESET_DOG:
        return {
          ...state,
          dog: payload
        }
      default:
        return state;
    }
}

export default rootReducer