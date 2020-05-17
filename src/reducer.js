import { SAVE_BREED,GET_RANDOM_SUCCESS,
   GET_BREED_SUCCESS,  GET_BREED_FAILED,
   IS_LOADING, ADD_DOG,
   CLEAR_DOGS, UPDATE_COLLECTION,
   RESET_ERROR,
 } from "./types";


const initState  = {
 collection:[],
 breed:null,
 selected:null,
 dogs:null,
 error:null,
 loading:false
}


export const reducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_DOG:
       return {
         ...state,
         collection: [action.payload, ...state.collection]
       }
    case CLEAR_DOGS:
       return {
         ...state,
         dogs: []
       }
    case SAVE_BREED:
       return {
         ...state,
         breed: action.payload
       }
    case GET_RANDOM_SUCCESS:
       return {
         ...state,
         dogs: action.payload
       }
    case GET_BREED_SUCCESS:
      return {
        ...state,
        dogs: action.payload
      }
    case GET_BREED_FAILED:
      return {
        ...state,
        error: action.payload
      }
    case IS_LOADING :
      return {
        ...state,
        loading: action.payload
      }
    case RESET_ERROR :
      return {
        ...state,
        error: null
      }
    case UPDATE_COLLECTION :
      return {
        ...state,
        collection: state.collection.filter(e => action.payload !== e)
      }
    default:
     return {
       ...state
     }
  }
}
