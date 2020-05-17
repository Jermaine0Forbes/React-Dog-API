import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector} from "react-redux";
import $ from "jquery";
import { getBreedFailed, isLoading,addDog,clearDogs} from "./action";




const Breed = ({breed,src}) => {
  const dispatch = useDispatch();
  const collection = useSelector(state => state.collection)
  const breedExists = collection.some((e) => e.breed.includes(breed.substring(0,3)) === true)


  // adds a dog to the collection list as long as the breed doesn't match
  const addBreed = () =>{
    const dog = {
      img:src,
      breed:breed
    }
    console.log("breed exists:"+breedExists)
    if(!breedExists){
      dispatch(addDog(dog))
    }else{
      dispatch(getBreedFailed('Breed alreadys exists in the collection'))
    }
    $("#select-dogs").slideUp(300);
    dispatch(clearDogs())
  }
  return (
    <div className="col-md-4 text-center">
       <img src={src} style={{maxWidth:"200px"}} alt={breed}/>
      <p className="">{breed}</p>
      <button className="btn btn-primary text-capitalize" onClick={addBreed}>add breed</button>
    </div>
  )
}


export default function  BreedList () {
   const dogs = useSelector(state => state.dogs) ;
   const dispatch = useDispatch();
   const [imgs,setImgs] = useState(null);

   // if the 'dogs' state updates it will extract the breed name from the image path
   // and rerender the Breed Component
    useEffect(() => {
      if(dogs){
         const breeds = dogs.map((e,i) =>{
           var url = e;
              var path = url.split( '/' );
              var breed;
              for (let i = 0; i < path.length-1; i++ ) {
                  if(path[i] === "breeds"){
                    breed = path[i+1];
                    break;
                  }
              }
            return  <Breed key={i} breed={breed} src={url} />;

         })
         setImgs(breeds);
         dispatch(isLoading(false));
         $("#select-dogs").slideDown(700);
      }

    },[dogs]);

  return (
    <div id="select-dogs" className="row">
      {imgs}
    </div>
  )
}
