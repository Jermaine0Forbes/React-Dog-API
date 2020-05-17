import { SAVE_BREED,GET_RANDOM_SUCCESS,
   GET_BREED_SUCCESS,  GET_BREED_FAILED,
   IS_LOADING, ADD_DOG,
   CLEAR_DOGS, UPDATE_COLLECTION,
   RESET_ERROR,
 } from "./types";



// an action used to reset the error state
export const resetError = () => {
  return {
    type: RESET_ERROR
  }
}

// an action to remove a dog from the collection list
export const updateCollection = (data) =>{
  return {
    type: UPDATE_COLLECTION,
    payload:data
  }
}


// an action for clearing the results of previous API calls
export const clearDogs = () => {
  return{
    type: CLEAR_DOGS
  }
}


//an action used to one dog to the collection list
export const addDog = (data) => {

    return {
      type:ADD_DOG,
      payload: data
    }

}


// an action to change when loading  component should be shown
export const isLoading = (state) =>{
  return {
    type:IS_LOADING,
    payload:state
  }
}

// an action to save the breed name that was in the searchbar
export const saveBreed  = (breed) => {
  return{
    type: SAVE_BREED,
    payload:breed
  }
}

// an action for a successful breed API call
export const getBreedSuccess = (data) => {
  return {
    type: GET_BREED_SUCCESS,
    payload:data
  }
}

// an action for a failure in retrieving data or error message for already having a similar breed
export const getBreedFailed = (data) => {
  return {
    type: GET_BREED_FAILED,
    payload:data
  }
}

// an action for a successful random API call
export const getRandomSuccess = (data) => {
  return {
    type: GET_RANDOM_SUCCESS,
    payload:data
  }
}


// creates an API call to get a random set of dog breeds
export const getRandom = (url) => {

  return dispatch => {
    fetch(url)
      .then(res => res.json())
      .then(res => {
        let data = res.message, status = res.status;
        console.log(status)
        if(status === "success"){
          dispatch(getRandomSuccess(data))
        }else{
          dispatch(getBreedFailed(data))
          dispatch(isLoading(false))
        }
      })
      .catch(err => console.log(err))
  }

}

// creates an API call to get a specific breed that you typed into the searchbar
export const getBreed = (url,breed) => {

  return dispatch => {

    fetch(url)
      .then (res => res.json())
      .then(res => {
        let data = res.message, status = res.status;
        if(status === "success"){
          dispatch(getBreedSuccess(data))

        }else{
          dispatch(getBreedFailed(data))
          dispatch(isLoading(false))
        }

        console.log(res)
      })
      .catch(err => {
        dispatch(getBreedFailed(err))
      } )
  }
}
