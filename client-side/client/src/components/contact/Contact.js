import React from 'react'
import Style from '../contact/Contact.css'
import { useState, useEffect, useRef } from 'react'
import Logo from "../../images/logo-maboxalgerie.png"
import Motifsav from '../../images/motif-sav-section.png'
import Greenleaf from '../../images/green-motif-sav.png'
import Smallleaf from '../../images/leaf-second-motif-sav.png'
import AOS from 'aos';
import { useNavigate } from 'react-router-dom';
export default function Contact() {
    const sav = useRef(null);
    AOS.init();
    const navigate = useNavigate();
  
    return (
        <div className='contact-container' data-aos="zoom-in">
            <img
                src={Motifsav}
                alt="image motif section SAV"
                className='leaf-motif-sav'
            />
            <img
                src={Greenleaf}
                alt="motif feuille service sav"
                className='green-leaf'
            />
            <img
                src={Smallleaf}
                alt="motif small leaf"
                className='small-leaf-sav-section'
            />
            <div className='contact-left-side'>
                <div className='logo-sav-container'>
                    <img src={Logo}
                        alt="logo onature"
                        className='logo-client-service'
                    />
                </div>
                <h1>  Service client 24h/24 & 7j/7 </h1>
                <div className='contact-paragraph'>
                    <p>
                        Si vous avez besoin de conseils ou en cas de problème,
                        notre équipe est à votre disposition 24H/24 et 7j/7.
                    </p>
                </div>

                <div className='contact-informations'>
                    <button onClick={() => { navigate('/contact') }} className='contact-button-sav'> Contactez-nous </button>
                    <span className='signature-contact-section-sav'> Source de la nature </span>
                </div>
            </div>
        </div>
    )
}
