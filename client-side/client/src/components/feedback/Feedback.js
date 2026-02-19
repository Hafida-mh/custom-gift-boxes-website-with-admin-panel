import React from 'react'
import '../feedback/Feedback.css'
import Carousel from 'react-bootstrap/Carousel';
import { useState, useEffect, useCallback } from 'react'
import axios from 'axios';
import Imgmotif from '../../images/mabox-motif.png'
import Logosonatrach from '../../images/logo-sonatrach.png'
export default function Feedback() {
  const [item, setItem] = useState([]);
  const [show, setShow] = useState(false);

  const getFeedback = () => {
    axios.get('http://localhost:2000/feedback/get').then(res => {
      console.log(res)
      setShow(true)
      for (let i = 0; i <= ((res.data.data).length) - 1; i++) {
        item.push((res.data.data)[i]);
        console.log(item)
      }
    })
  }
  getFeedback()

  useEffect(() => { if (show) { getFeedback() } }, []);

  return (
    <div className='feedback-container'>
        <img src={Imgmotif}
          className="motif-logo-mabox"
          alt="logo motif ma box algerie"
        />
         <img src={Imgmotif}
          className="motif-logo-mabox left-side"
          alt="logo motif ma box algerie"
        />
      <h1> Ils parlent de nous </h1>
      <Carousel className='caroussel-feedback'>
      
        <Carousel.Item className='caroussel-item-feedback'>
          <Carousel.Caption className='caroussel-caption-feedback-slide'>
            <div className='inner-slide-feedback-container'>

              <div className='naming-feedback-person'>
                <div className='logo-feedback-corporate'> 
                <img src={Logosonatrach} className="logo-feedback" alt="logo Sonatrach"/>
                </div>
                <div className='name-position-feedback-person'>
                  <h4 className='name-person'> Mme Hafida Mechkour</h4>
                  <h4 className='name-person'> <b>  Directrice marketing </b> </h4>
                </div>
              </div>

              <div className='feedback-text'>
                <p>
                  Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical  Latin literature from 45 BC, making it over 2000 years old. Latin literature from 45 BC, making it over 2000 years old.
                </p>

              </div>
            </div>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item className='caroussel-item-feedback'>
          <Carousel.Caption className='caroussel-caption-feedback-slide'>
            <div className='inner-slide-feedback-container'>

              <div className='naming-feedback-person'>
                <div className='logo-feedback-corporate'>
                <img src={Logosonatrach} className="logo-feedback" alt="logo Sonatrach"/>
                </div>
                <div className='name-position-feedback-person'>
                  <h4 className='name-person'> Mme Hafida Mechkour</h4>
                  <h4 className='name-person'> <b>  Directrice marketing </b> </h4>
                </div>
              </div>

              <div className='feedback-text'>
                <p>
                  Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical  Latin literature from 45 BC, making it over 2000 years old. Latin literature from 45 BC, making it over 2000 years old.
                </p>

              </div>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        
      </Carousel>

    </div>
  )
}
