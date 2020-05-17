import React, { useEffect, useState } from 'react';
import {useDispatch,useSelector} from "react-redux";
import {updateCollection} from "./action";
const Item = ({img,breed}) => {

   const collection = useSelector(state => state.collection);
   const dispatch = useDispatch();

  // removes one dog from the collection list
  const removeDog = (e) => {
     let coll = collection ;
    const i = coll.findIndex((e) => breed === e.breed)
    const update =coll.splice(i,1)[0].breed;
    dispatch(updateCollection(update))
  }

  return (
    <React.Fragment>
      <li id={breed} className="list-group-item d-flex justify-content-between align-items-center">
        <img src={img} className="rounded-circle" style={{height:"80px", width:"80px"}} alt=""/>
        <h4>{breed}</h4>
        <button className="btn close-btn" onClick={removeDog}><i className="fas fa-times-circle"></i></button>
      </li>
    </React.Fragment>
  )
}

export default function Collection () {

  const collection = useSelector(state => state.collection)
  const [list, setList] = useState(null);

  //whne the collections list updates it will re-render the items in the collection list
  useEffect(() => {
    if(collection){
      const items = collection.map((e,i) => {
        return <Item key={i} img={e.img} breed={e.breed}/>
       })
      setList(items);
    }
  },[collection])


  return (
    <ul className="list-group">
      {
        collection ? list : null
      }
    </ul>

  )
}
