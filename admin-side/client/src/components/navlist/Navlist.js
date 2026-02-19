import React from 'react'
import axios from 'axios'
import '../navlist/navlist.css'
import { useState, useEffect } from 'react'
export default function Navlist() {
    const [data, setData] = useState({ category : "shoes", 
    undercatecory : ['enfant',' homme', 'femme'] });
    const [arr, setArr] = useState();
    const [shop, setShop] = useState();
    
    const addcategory = () => {
        axios.post(`${process.env.REACT_APP_LINK}/shopnav/addcategory`, JSON.stringify(data), {
            headers: {
                'Content-Type': "application/json"
            }
        })
    }

    const getCategory = () => {
        axios.get(`${process.env.REACT_APP_LINK}/shopnav/getcategory`).then(res => {
            return (
                setArr(((res.data.data[0].sousCategorie).replace(/\[|\]/g,'').split(','))),
                console.log(arr[1]),
                console.log(((res.data.data[0].sousCategorie).replace(/\[|\]/g,'').split(',')))
            )
        }
        )
    }
    
    useEffect(() => {
        setShop(arr);
    }, [arr]);
  return (
    <div>
        <div> <button onClick={() => addcategory()}> Add categorie </button></div>
        <div> <button onClick={()=> getCategory()}> get all lists </button></div>
       { shop && (shop.map((elm) => {
        return (<div> {elm} </div>)
       }))}
    </div>
  )
}
