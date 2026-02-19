import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import '../Presentation/PresentationHome.css'
export default function PresentationHome() {
    const [slogan, setSlogan] = useState("ho");
    const [text, setText] = useState("h");
    const [message, setMessage] = useState();
    const [show, setShow] = useState(false);
    const [showalert, setShowalert] = useState(false);
    const [showalerterror, setShowalerterror] = useState(false);
    const [alerte, setAlerte] = useState("");

    const renderTooltipPara = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Le paragraphe ne doit pas dépasser 237 caractéres.
        </Tooltip>
    );

    const addtext = () => {
        if (slogan && text) {
            axios.post(`${process.env.REACT_APP_LINK}/addtext/update`, JSON.stringify({
                slogan: slogan,
                text: text
            }), {
                headers: {
                    'Content-Type': "application/json"
                }
            }).then((res) => {
                setAlerte(res.data.message);
                disapearAlert(res.data.message);

            });
        }
        else {
            setAlerte("Un des champs obligatoires est vide");
            setShowalerterror(true)
            setTimeout(() => {
                setShowalerterror(false)
            }, 2300)
        }
    }

    const getAllInfo = () => {
        axios.get(`${process.env.REACT_APP_LINK}/addtext/getInfo`).then((res) => {
            setSlogan(res.data.data[0].slogan);
            setText(res.data.data[0].texte);
        })
    }

    const disapearAlert = (msg) => {
        if (msg === "Contenu mis à jour avec succés !") {
            setShowalert(true)
            setAlerte(msg)
            setTimeout(() => {
                setShowalert(false);
            }, 2300)
        }
        else {
            setShowalerterror(true)
            setTimeout(() => {
                setShowalerterror(false)
            }, 2300)
        }

    }
    
    useEffect(() => {
        getAllInfo();
        console.log(slogan)
    }, [])

    return (
        <div className='presentation-container'>
            <h1 className='title-presentation'> Modifier texte de presentation </h1>
            {show && <p> {message} </p>}
            <form onSubmit={(e) => e.preventDefault()} className='presentation-form'>
                <div className='filds-form presentation'>
                    <label className='label text'> Changer votre slogan </label>
                    <input className='filds title-presenntation' type="text" value={slogan} onChange={(e) => setSlogan(e.target.value)} />
                </div>
                <div className='filds-form presentation'>
                    <label className='label text'> Changer votre présentation </label>
                    <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltipPara}
                    >
                        <textarea maxlength="237" className='filds paragraphe' type="text" value={text} onChange={(e) => setText(e.target.value)}> </textarea>
                    </OverlayTrigger>
                </div>
                {showalert && <div className='alert-container'> <i className="fa-regular fa-circle-check"></i>  {alerte} </div>}
                {showalerterror && <div className='alert-container error'> <i className="fa-regular fa-circle-xmark"></i>  {alerte} </div>}
                <button className='submit-button' onClick={() => addtext()}> Valider </button>
            </form>
        </div>
    )
}
