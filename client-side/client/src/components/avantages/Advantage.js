import React from 'react'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import './Advantage.css'
export default function Advantage() {
    const [title, setTitle] = useState("Title");
    const advantage_container = useRef(null);
 
    const [item, setItem] = useState([]);
    const [show, setShow] = useState(false);

    const getalladvantages = () => {
        axios.get(`${process.env.REACT_APP_LINK}/advantage/get`).then(res => {
            console.log(res)
            setShow(true)
            setItem(res.data.data)
        })
    }

    useEffect(() => { getalladvantages() }, []);

    return (
        <div
            className='advantages'>
            <div className='card-container'>
                <div className='card-container-box'>
                    {item && item.map((elm) => {
                        return (
                            <div className='card-content'>
                                <div className='card-img'>
                                    <div className='card-img-content'>
                                        <img src={`${process.env.REACT_APP_LINK}/uploads/${elm.icon}`}
                                            alt={elm.icon}
                                        />
                                    </div>
                                </div>
                                <div className='card-title'>
                                    <h4 className='title-advantage'> {elm.title} </h4>
                                </div>
                                <div className='descriptif'>
                                    <p> {elm.descriptif} </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
