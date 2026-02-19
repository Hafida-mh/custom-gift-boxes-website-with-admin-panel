import React from 'react'
import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import '../presentation/Presentation.css'
import { useNavigate } from 'react-router-dom';
import Imgpresentation from '../../images/image-presentation-maboxalgerie.png'
import AOS from 'aos';
export default function Presentation() {
  AOS.init();
  const [slogan, setSlogan] = useState("");
  const navigate = useNavigate();
  const [text, setText] = useState("")

  const getAllInfo = () => {
    axios.get(`${process.env.REACT_APP_LINK}/addtext/getInfo`).then((res) => {
      setSlogan(res.data.data[0].slogan);
      setText(res.data.data[0].texte);
    })
  }

  useEffect(() => {
    getAllInfo();

  }, []);

  return (
    <div className='presentation'>
      <div className='presentation-container'>
        <div className='paragraph-container' data-aos="fade-left">
          <div>
          <h5 className='presentation-smalltitle'> Bienvenue Chez Ma Box Algérie </h5>
            {slogan && <h1 className='presentation-title'> {slogan} </h1>}
            {text && <p> {text} </p>}
            <button className='checkstore-button' onClick={() => { navigate('/shop') }}> Notre boutique </button>
          </div>
        </div>
      </div>
      <div className='presentation-image-container'>
<img src={Imgpresentation} alt="image presentation" className='img-presentation' />
      </div>
    </div>
  )
}
/*presentation-img-etadjir */