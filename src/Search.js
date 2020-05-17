import React, { useEffect, useState} from 'react';
import $ from "jquery";
import Loader from  'react-loaders';
import {useDispatch, useSelector} from "react-redux";
import {getBreed, getBreedFailed, getRandom, isLoading, resetError,saveBreed} from "./action";

export default function Search () {
   const [option , setOption] = useState("Dropdown");
   const loading  = useSelector(state => state.loading);
   const error  = useSelector(state => state.error);
   const collection = useSelector(state => state.collection)
   const dispatch = useDispatch();

    // when clicking the go button it will either search for a breed that is in the search bar
    // or retreive random breeds which will depend on the option that the user chose
    const searchBreed = (e) => {
      dispatch(resetError())
      if(option === "Breed"){
        const searchBar = $("#search-bar");
        const breed = searchBar.val();
        const url = "https://dog.ceo/api/breed/"+breed+"/images/random/3";
        const breedExists = collection.some((e) => e.breed.includes(breed) === true)
        searchBar.val("")
        if(!breedExists){
          dispatch(isLoading(true));
          dispatch(saveBreed(breed))
          dispatch(getBreed(url,breed));
        }else{
          dispatch(getBreedFailed("Breed alreadys exists in the collection"))
          dispatch(isLoading(false))
        }

      }else if (option === "Random"){
        dispatch(isLoading(true));
       const url = "https://dog.ceo/api/breeds/image/random/3";
       dispatch(getRandom(url));
      }



    }

    // The sets option based on the dropdown-item you chose
    const selectOption = function (e){
    $(".dropdown-item").removeClass("active");
      $(this).addClass("active");
      const option = e.target.textContent;
      console.log(option)
      setOption(option);
    }

    // If you hit enter in the searchbar it will activate the searchBreed function
    const onEnter = (e) =>{
      if(e.keyCode === 13){
        searchBreed(e)
      }
    }


    // this will immediately search for random breeds when choosing the Random option
    // and disabling the the searchbar
    useEffect( () => {
      if(option === "Random"){
        $("#search-bar").attr("disabled", true);
          dispatch(resetError())
         dispatch(isLoading(true));
        const url = "https://dog.ceo/api/breeds/image/random/3";
        dispatch(getRandom(url));
      }else if (option === "Breed"){
        $("#search-bar").attr("disabled", false);

      }

    },[option])



  return (
    <React.Fragment>
        <section className="row px-3">
          <div className="input-group mb-3">
          <div className="input-group-prepend">
            <button id="drop-btn" className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{option}</button>
            <div className="dropdown-menu">
              <a className="dropdown-item" onClick={selectOption} href="#">Breed</a>
              <a className="dropdown-item" onClick={selectOption} href="#">Random</a>
            </div>
          </div>
          <input id="search-bar" onKeyUp={onEnter} type="text" className="form-control disabled" aria-label="Text input with dropdown button" />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" onClick={searchBreed} type="button">Go</button>
          </div>
        </div>

      </section>
      <section>
       { loading ? <Loader type="ball-pulse"/> : null}
       {error ? <div className="alert alert-danger text-align-center" role="alert">
{error}
</div> : null}
      </section>
    </React.Fragment>



  );

}
