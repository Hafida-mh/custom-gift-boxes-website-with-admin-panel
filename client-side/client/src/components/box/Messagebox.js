import React from 'react'
import Navbar from '../nav/Navbar'
import Stylemessagebox from '../box/Messagebox.css'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Cookies from 'js-cookie'
import Footer from '../footer/Footer'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Popupboxcommand from './Popupboxcommand'
import axios from 'axios'
import Motifboxpage from '../../images/motif-workshop.png'
import Modal from 'react-bootstrap/Modal';

import { v4 as uuidv4 } from 'uuid';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
export default function Messagebox() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [allcommands, setAllCommand] = useState([]);
    const [totalpricebox, setTotalpricebox] = useState(0);
   
    const savemessageperbox = (box_name, message) => {
        allcommands.map((elm) => {
            if (elm.boxname === box_name) {
                elm['message'] = message
            }
        })
    }


    useEffect(() => {
        setAllCommand((JSON.parse(Cookies.get("allcommandbox"))))
        setTotalpricebox(JSON.parse(Cookies.get('totalbuy')))
    }, [])

    return (
        <div className='Messagebox'>
            <div>
                <Navbar />
            </div>
            <img src={Motifboxpage} 
            alt="box page motif" 
            className='motif-box-page' />
            <h1 className='main-title-box-product-choice title-box'>
                 Box
            </h1>
            <h2 className='main-title-box-product-choice small-step-title'>
                <b> 3. Carte cadeau
                </b>
            </h2>

            <div className='tabs-container-messaging-box'>
                <Tabs
                    defaultActiveKey={(JSON.parse(Cookies.get("allcommandbox")))[0].boxname}
                    id="uncontrolled-tab-example"
                    className="tabs-container"
                >


                    {allcommands && allcommands.map((elm) => {
                        return (
                            <Tab eventKey={elm.boxname}
                                title={elm.boxname}
                                className="allproduct-container"
                                onClick={()=> {console.log(elm)}}
                            >
                                <form
                                    className='form-message'
                                    onSubmit={(e) => e.preventDefault()}>
                                    <h5> Accompagnez votre cadeau avec un petit mot attentionné </h5>
                                    <textarea
                                        className='text-area-input'
                                        placeholder='Ecrivez votre message ici'
                                        onChange={(e) => { savemessageperbox(elm.boxname, e.target.value);}}
                                    >

                                    </textarea>
                                </form>

                            </Tab>
                        )
                    })}

                </Tabs>

                <div className='buttons-follow-questions'>
                    <button className='action-button previous' onClick={()=> navigate(`/box-choix-produit/${uuidv4()}`)}> Précédent </button>
                    <button className='action-button'
                       onClick={()=> { 
                        Cookies.set("allcommandbox", JSON.stringify(allcommands));
                        navigate(`/information-commande/${uuidv4()}`)
                    }}
                       > Suivant </button>
                </div>
            </div>
            <div className='pop-up-price'>
                <Popupboxcommand price={totalpricebox} message="Il ne vous reste plus qu'un petit message et votre box est prête 😁"/>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}
