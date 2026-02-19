import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import '../slides/Slides.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Slides() {
  const navigate = useNavigate();
  const [item, setItem] = useState([]);
  const [show, setShow] = useState(false);
  const getSlide = () => {
    axios.get(`${process.env.REACT_APP_LINK}/upload/getSlide`).then(res => {
      console.log(res)
      setShow(true)
      setItem(res.data.data)
    })
    console.log(show)
  }

  useEffect(() => { getSlide() }, []);
  return (
    <div className='Slides'  data-aos="zoom-out">
      {/* <div className="promotion-display">
        <div className='container'>
          <marquee> Flash Promo Promotion ** Chaussure à 4000 Da SEULEMENT !!  </marquee>
        </div>
  </div>*/}
        <Carousel className='caroussel' >
        {item && item.map((elm) => {
          return (
            <Carousel.Item className='caroussel-item'>
              <img
                className="slide-img"
                src={`${process.env.REACT_APP_LINK}/uploads/${elm.filename}`}
                alt="First slide" />
              <Carousel.Caption className='caroussel-caption'>
                <h1 > {elm.title}</h1>
                <p> {elm.paragraph} </p>
                <button className='slide-button' onClick={()=> {navigate('/shop')}}>   Découvrir </button>
              </Carousel.Caption>
            </Carousel.Item>)
        })}
      </Carousel>
    </div>
  )
}
