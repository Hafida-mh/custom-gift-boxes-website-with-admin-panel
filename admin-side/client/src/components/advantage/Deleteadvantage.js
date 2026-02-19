import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './Deleteadvantage.css'
export default function Deleteadvantage() {
  const [item, setItem] = useState([]);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [del, setDel] = useState(false);

  const getFeedback = () => {
    axios.get(`${process.env.REACT_APP_LINK}/advantage/get`).then(res => {
      setShow(true)
      for (let i = 0; i <= ((res.data.data).length)-1; i++) {
        item.push((res.data.data)[i]);
    }
    })
    setData(item);
    const containe = document.querySelector('.delete-advantage');
    containe.style.backgroundColor = "rgb(176, 176, 226)";
    containe.style.color= "white";
    const hidebutton = document.querySelector('.display-button');
    hidebutton.style.display = "none"
}

const deleteAdvantages = (id) => {
    axios.post(`${process.env.REACT_APP_LINK}/advantage/deletead`, JSON.stringify({id : id}),{ headers: {
            'Content-Type': "application/json" }
    });
}

const deleteAdvFromScreen = (id) => {
    var position = item.findIndex((elm) => elm.id === id );
    if(position !== -1) {
       item.splice(position,1); 
    }
   return item
}

const deleteads = (param) => {
    console.log("hii")
    deleteAdvFromScreen(param);
    deleteAdvantages(param);
    setDel(!del)
}

useEffect(()=> { setItem(item)},[del]);
  return (
    <div className='delete-advantage'>
      <div className='button-container'> 
        <button className='display-button' onClick={() => getFeedback()}> Afficher tous les avantages </button>
      </div>
      <div className='feedback-cards'>
        {item && item.map((elm) => {
            return (
                <div className='cards'>
                    <h4> {elm.title} </h4>
                    <div className='icon-section'> 
                    <div>
                      <img
                        className="icon-img"
                        src={`${process.env.REACT_APP_LINK}/uploads/${elm.icon}`}
                        alt="First slide"/>  
                      </div>
                      </div>
                    <div className='para-descriptif'> {elm.descriptif} </div> 
                    <div className='deleteadvantage'> <button className='deletebutton' onClick={() => deleteads(elm.id)}> Supprimer </button> </div>
                </div>
            )
        }) }
      </div>
    </div>
  )
}
