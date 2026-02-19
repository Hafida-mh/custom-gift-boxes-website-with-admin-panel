import React from 'react'
import '../contact-component/Contactpage.css'
import Navbar from '../nav/Navbar'
import Footer from '../footer/Footer';
import { useState, useEffect, useRef } from 'react'
import Imagecontact from '../../images/onature-contact-page.jpg'
import Alert from 'react-bootstrap/Alert';
import Motifboxpage from '../../images/motif-workshop.png'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

export default function Contactpage() {
    const navigate = useNavigate();
    const titlecontact = useRef(null)
    const [showalert, setShowalert] = useState(false)
    const [messagealert, setMessagealert] = useState("")
    const [typealert, setTypealert] = useState("warning")
    const [devisinformaion, setDevisinformationn] = useState([{
        id : "",
        corporate : "",
        name : "",
        email : "",
        phone : "",
        description : ""

    }])

    const senddevis = () => {
if(devisinformaion.corporate && devisinformaion.name &&  devisinformaion.phone && devisinformaion.email && devisinformaion.description)
    
        {   axios.post(`${process.env.REACT_APP_LINK}/devis/senddevis`, JSON.stringify({
            id :  uuidv4(),
            corporate : devisinformaion.corporate,
            namesender : devisinformaion.name,
            phonesender : devisinformaion.phone,
            emailsender : devisinformaion.email,
            description : devisinformaion.description
        }), {
            headers: {
              'Content-Type': "application/json",
            }}).then((res)=> {
            setShowalert(true) 
            setMessagealert("Demande de devis envoyée avec succée !")
            setTypealert("success")
            setTimeout(() => {
                navigate('/')
            }, "1400")
        })}
        else {
            setShowalert(true) 
            setTypealert("warning")
            setMessagealert("Veuillez remplir tous les champs !")
            setTimeout(() => {
                setShowalert(false);
            }, "1400")

            
        }
    }

    return (
        <div className='contactpage'>
            <div className='contact-navbar-container'> <Navbar /></div>
            <img src={Motifboxpage} 
            alt="box page motif" 
            className='motif-box-page'/>
            <div className='contact-container-content'>
            <h1 className='personnalise-box-title'> Corporate Gifts  </h1>
            <h3> <b> Demander un devis gratuitement </b> </h3>
              <div className='devis-container'>

<p> Si vous avez une idée de cadeau particulière n’hésitez
     pas à demander gratuitement votre devis en 
    remplissant le formulaire ci-dessous :  </p>

    <form onSubmit={(e)=> e.preventDefault()}> 
            <div className='div-input-information'> <input placeholder="Nom de l'entreprise" 
           value={devisinformaion.name} onChange={(e) => {
            devisinformaion.corporate = e.target.value;
                    }}/> </div>
                       <div className='div-input-information'> <input placeholder="Nom de l'interlocuteur" 
           value={devisinformaion.name} onChange={(e) => {
            devisinformaion.name = e.target.value;
                    }} /> </div>

            <div className='div-input-information'> <input placeholder="Téléphone de l'interlocuteur" value={devisinformaion.phone} onChange={(e) => {devisinformaion.phone = e.target.value }} /> </div>
                    <div className='div-input-information'> <input placeholder="Email de l'interlocuteur"  value={devisinformaion.email} onChange={(e) => {devisinformaion.email = e.target.value }} /> </div>
                    <div className='div-input-information'> 
                    <textarea
                                        className='text-area-input'
                                        placeholder='Ecrivez votre message ici'
                                       onChange={(e) => { devisinformaion.description = e.target.value }}>
</textarea>
                                    </div>

                    {showalert && <div className='alert-container-choixe-box'>
            <Alert key={`${typealert}`} variant={`${typealert}`}> {messagealert} </Alert>
            </div>}
                    <button className='submit-contact'  onClick={()=> senddevis()}> Envoyer </button>
            </form>
              </div>
            </div>
            <div className='contact-footer-container'> <Footer /> </div>
        </div>
    )
}
