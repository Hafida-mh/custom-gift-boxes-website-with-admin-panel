import React from 'react'
import Stylereference from '../reference-client/Referenceclient.css'
import Cevitallogo from "../../images/logo-client/cevital-logo.png"
import Sontarachlogo from "../../images/logo-client/sonatrach-logo.png"
import Bnalogo from "../../images/logo-client/bna-logo.png"
import Axalogo from '../../images/logo-client/axa-logo.png'
import Logobayer from "../../images/logo-client/logo-bayer.png"
import Logobdl from "../../images/logo-client/logo-bdl.png"
export default function Referenceclient() {
  return (
    <div className='reference-client'>
      <h1> Ils nous ont fait confiance </h1>
      <div className='img-logo-client-container'>
        <div className='img-logo-client'>
          <img
            src={Cevitallogo}
            className="logo-client-maboxalgerie" />
        </div>
        <div className='img-logo-client'>
          <img
            src={Sontarachlogo}
            className="logo-client-maboxalgerie sonatrach" />
        </div>
        <div className='img-logo-client'> 
        <img
            src={Bnalogo}
            className="logo-client-maboxalgerie bna" />
        </div>
        <div className='img-logo-client'>
        <img
            src={Logobayer}
            className="logo-client-maboxalgerie bayer" />
        </div>
      </div>
    </div>

  )
}
