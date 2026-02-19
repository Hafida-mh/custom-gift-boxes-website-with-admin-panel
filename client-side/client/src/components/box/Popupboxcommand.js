import React from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import Stylepopup from '../box/Popupboxcommand.css'
import Motifpopup from '../../images/motif-popup-box.png'
import Giftimg from '../../images/img-gift-box.png'

export default function Popupboxcommand(props) {
    const reducesizepopup = ()=> {
        const popup = document.querySelector(".Popupboxcommand");
        const button = document.querySelector(".reduce-pop-up");
        popup && popup.classList.replace("Popupboxcommand", "popupreduced");
        button.style.display = "none"
    }

    const revealpopup = () => {
        const popup = document.querySelector(".popupreduced");
        const button = document.querySelector(".reduce-pop-up");

        popup && popup.classList.replace("popupreduced", "Popupboxcommand");
        button.style.display = "block"

    }

    return (
        <div className='Popupboxcommand'>
            <div className='photo-gift-container' onClick={()=> revealpopup()}>
                <img src={Giftimg} classNam="img-gift" alt="img gift box" />
            </div>
            <button className='reduce-pop-up' onClick={()=> {reducesizepopup()}}> - </button>
            <h3 className='title-pop-up'>  BRAVO Excellent choix ! </h3>
            <p className='text-popup'> {props.message} </p>
      <div className='price-allboxes'> Total : {props.price} Da</div>
      <img src={Motifpopup} className="motif-pop-up-bottom" alt="motif popup" />
        </div>
    )
}
