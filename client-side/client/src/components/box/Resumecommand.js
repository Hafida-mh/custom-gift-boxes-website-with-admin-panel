import React from 'react'
import Styleresumeinfo from '../box/Resumecommand.css'
import Navbar from '../nav/Navbar'
import Footer from '../footer/Footer'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Motifboxpage from '../../images/motif-workshop.png'
import axios from 'axios'
import Alert from 'react-bootstrap/Alert'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
export default function Resumecommand() {
    const navigate = useNavigate()
    const { id } = useParams();
    const [allcommand, setAllcommand] = useState([])
    const [allinformation, setAllinformations] = useState([])
    const [detailbox, setDetailbox] = useState([])
    const [totalcommand, setTotalcommand] = useState(0)
    const [showalert, setShowalert] = useState(false)
    const [commandtosend, setCommandtosend] = useState({
boxinfo : {},
clientinfo : {},
total : ""
    })

    const postcommand = () => {
    axios.post (`${process.env.REACT_APP_LINK}/command/postboxcommand`, JSON.stringify({
    id : uuidv4(),
    boxinfo : JSON.stringify(detailbox),
    clientinfo : JSON.stringify(allinformation),
    total : totalcommand
}),{
    headers: {
      'Content-Type': "application/json",
    }}).then((res)=> {
        setShowalert(true)
        setTimeout(() => {
            navigate('/box')
        }, 2300)
    })
    }

    useEffect(() => {
        setAllcommand(JSON.parse(Cookies.get("boxcommand")))
       console.log(JSON.parse(Cookies.get("boxcommand")))
        setAllinformations(JSON.parse(Cookies.get("informationclient")))
        setDetailbox(JSON.parse(Cookies.get("allcommandbox")));
        setTotalcommand(Number(Cookies.get('totalbuy')))
    }, [])

    return (
        <div className='Resumecommand'>
            <div>
                <Navbar />
            </div>
            <img src={Motifboxpage}
                alt="box page motif"
                className='motif-box-page' />
            <h1 className='main-title-box-product-choice title-box'>
                Box </h1>
            <h2 className='main-title-box-product-choice small-step-title'> 5. Apperçu de votre commande </h2>
            <div className='resumecommand-container'>
                <div className='command-allinformation'>
                    {
                        allinformation && allinformation.map((elm) => {
                            return (
                                <div className='informationn-cliennt-section section-info'>
                                    <div> <b> Nom et prénom : </b> {elm.name} </div>
                                    <div> <b> Téléphone: </b> {elm.phone} </div>
                                    <div> <b> Email : </b> {elm.email} </div>
                                    <div> <b> Adresse de livraison : </b> {elm.address} </div>
                                    <div> <b> Wilaya: </b> {elm.wilaya} </div>
                                    <div> <b> Délai de livraison : </b> {elm.delivery} </div>
                                </div>
                            )
                        })
                    }

                    <div className='section-info detailbox'>
                        <div> <b> Nombre de box : </b> {allcommand.length} </div>
                        <div> <b>Type de box : </b>
                            {allcommand.map((elm) => {
                                return (
                                    <span> {elm.boxname} - </span>
                                )
                            })} </div>
                        <div> <b> Quantité box : </b> {allcommand.map((elm) => {
                            return (
                                <section className='product-per-box'> {elm.boxname}
                                    <span className='qte-number'> {elm.qte}  </span>  </section>
                            )
                        })}
                        </div>
                        <div> <b> Produits par box : </b> {detailbox.map((elm) => {
                            return (
                                <section className='product-per-box'> <u> {elm.boxname} </u>
                                    {elm.products.map((product) => {
                                        return (
                                            <li> {product} </li>
                                        )
                                    })}
                                </section>
                            )
                        })}
                        </div>
                        <div> <b> Message carte cadeau : </b>  {detailbox.map((elm) => {
                            return (
                                <section className='product-per-box'>
                                    <u> {elm.boxname} </u>
                                    <section> <b> Message : </b> {elm.message} </section>
                                </section>
                            )
                        })}
                        </div>
                        <div className='total-command'>  Total : {totalcommand}  </div>
                    </div>
                </div>
            </div>
            {showalert &&  <div className='alert-container-choixe-box'>
            <Alert key="success" variant="success"> Votre commande a été envoyée avec succés ! </Alert>
            </div>}
            <div className='buttons-follow-questions'>
                <button className='action-button previous' onClick={() => navigate(`/information-commande/${uuidv4()}`)}> Précédent </button>
                <button className='action-button'
                    onClick={() => {
                       postcommand()
                    }}
                > Valider la commande </button>
            </div>


            <div>
                <Footer />
            </div>
        </div>
    )
}
