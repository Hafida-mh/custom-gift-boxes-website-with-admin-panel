import React from 'react'
import Styleinformation from '../box/Informationperso.css'
import { useNavigate } from 'react-router-dom';
import Navbar from '../nav/Navbar';
import Footer from '../footer/Footer';
import Alert from 'react-bootstrap/Alert';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Motifboxpage from '../../images/motif-workshop.png'
import { v4 as uuidv4 } from 'uuid';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";

export default function Informationperso() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showalert, setShowalert] = useState(false);
    const [information, setInformation] = useState([{
        name: "",
        phone: "",
        email: "",
        address: "",
        wilaya: "",
        delivery: ""
    }])

    const validateinformationclient = () => {
        if (information.name && information.phone && information.address && information.email && information.wilaya && information.delivery) {
            Cookies.set("informationclient", JSON.stringify([{
                name: information.name,
                phone: information.phone,
                email: information.email,
                address: information.address,
                wilaya: information.wilaya,
                delivery: information.delivery
            }]))
            navigate(`/resume-command/${uuidv4()}`)
        }
        else {
            setShowalert(true);
            setTimeout(() => {
                setShowalert(false);
            }, "1400");
        }
    }
    let v = []
    return (
        <div className='Informationperso'>
            <div>
                <Navbar />
            </div>
            <img src={Motifboxpage} 
            alt="box page motif" 
            className='motif-box-page' />
            <div className='form-information-container'>
                <h1 className='main-title-box-product-choice title-box'>
                    Box  </h1>
                <h2 className='main-title-box-product-choice'>
                    <b> 4. Information commande  </b>
                </h2>
                <form className='information-commande-form'>
                    <h5 className='text-form-information'>
                        Remplissez le formulaire suivant avec vos informations personnelles
                    </h5>
                    <div className='div-input-information'> <input placeholder='Nom et prénom' value={information.name} onChange={(e) => {
                        information.name = e.target.value;
                    }} /> </div>
                    <div className='div-input-information'> <input placeholder='Téléphonne' value={information.phone} onChange={(e) => { information.phone = e.target.value }} /> </div>
                    <div className='div-input-information'> <input placeholder='Email' value={information.email} onChange={(e) => { information.email = e.target.value }} /> </div>
                    <div className='div-input-information'>  <input placeholder='Adresse de livraison' value={information.address} onChange={(e) => { information.address = e.target.value }} /> </div>
                    <div className='div-input-information'> <input placeholder='Wilaya' value={information.wilaya} onChange={(e) => { information.wilaya = e.target.value }} /> </div>
                    <div className='div-input-information'> <input placeholder='Date de livraison souhaitée. Ex : 25/03/2024' value={information.delivery} onChange={(e) => { information.delivery = e.target.value }} /> </div>
                </form>
            </div>

            <div className='alert-container-choixe-box'>
                {showalert && <Alert key="warning" variant="warning"> Veuillez remplir tous les champs </Alert>}
            </div>
            <div className='buttons-follow-questions'>
                <button className='action-button previous' onClick={() => navigate(`/messagebox/${uuidv4()}`)}> Précédent </button>
                <button className='action-button'
                    onClick={() => { validateinformationclient() }}
                > Apperçu de la commande </button>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}
