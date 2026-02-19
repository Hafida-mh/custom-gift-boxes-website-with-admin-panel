import React from 'react'
import axios from 'axios'
import '../feedback/Deletefeedback.css'
import { useState, useEffect } from 'react'
export default function Deletefeedback() {
    const [item, setItem] = useState([]);
    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);
    const [del, setDel] = useState(false);

    const getFeedback = () => {
        axios.get(`${process.env.REACT_APP_LINK}/feedback/get`).then(res => {
          setShow(true)
          for (let i = 0; i <= ((res.data.data).length)-1; i++) {
            item.push((res.data.data)[i]);
        }
        })
        setData(item)
    }

    const deleteFeedback = (id) => {
        axios.post(`${process.env.REACT_APP_LINK}/feedback/delete`, JSON.stringify({id : id}),{ headers: {
                'Content-Type': "application/json" }
        });
    }
    
    const deleteFeedbackFromScreen = (id) => {
        var position = item.findIndex((elm) => elm.id === id );
        if(position !== -1) {
           item.splice(position,1); 
        }
       return item
    }

    const deletefeeds = (param) => {
        deleteFeedbackFromScreen (param);
        deleteFeedback(param);
        setDel(!del)
    }

    useEffect(()=> { setItem(item)},[del]);

  return (
    <div className='deletefeddback'>
        <button onClick={() => getFeedback()}> Afficher tous les feeds </button>
        {item && item.map((elm) => {
            return (
                <div>
                    <button onClick={() => deletefeeds(elm.id)}> X </button>
                    <div> {elm.name} </div>
                    <div> {elm.feedback} </div> 
                </div>
            )
        }) }
    </div>
  )
}
