import React from 'react'
import Stylealert from '../alertworkshop/Alertworkshop.css'
import { useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

export default function Alertworkshop() {
  const [allWorkshop, setAllworkshop] = useState()
const navigate = useNavigate()

  const getAllWorkshop = () => {
    axios.get(`${process.env.REACT_APP_LINK}/workshop/getworkshop`).then(res => {
        setAllworkshop(res.data.data.reverse())
        console.log(res.data.data[0])
    })
};

useEffect(()=> {
  getAllWorkshop()
}, [])
  return (
    <div className='Alertworkshop'>
{allWorkshop && 
<div className='alertworkshop-container'> 
 <h6> 
    "{allWorkshop[0].title}" ! {allWorkshop[0].date}. 
    <a href='#' alt="link workshop" onClick={()=> {navigate("/workshop")}}> En savoir plus</a>
     </h6>
     
     </div>
 }
     
    </div>
  )
}
