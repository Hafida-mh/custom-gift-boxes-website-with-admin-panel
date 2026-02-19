import React from 'react'
import Styleworkshop from '../workshop/Workshop.css'
import Navbar from '../nav/Navbar'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Footer from '../footer/Footer'
import Modal from 'react-bootstrap/Modal';
import Motifworkshop from '../../images/motif-workshop.png'
import { v4 as uuidv4 } from 'uuid';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

export default function Workshop() {
    const [data, setData] = useState([])
    const [showworshop, setShowworkshop] = useState(false)
    const [workshoptitle, setWorkshoptitle] = useState("")
    const [showspinner, setShowspinner] = useState(true)
    const [showalert, setShowalert] = useState(false)
    const [messagealert, setMessagealert] = useState("")
    const [typealert, setTypealert] = useState("warning")


    const [candidate, setCandidate] = useState([{
        id : uuidv4(),
        name : "",
        workshop : "",
        email : "",
        phone : ""
    }])

    const getAllWorkshop = (e) => {
        setData([])
        axios.get(`${process.env.REACT_APP_LINK}/workshop/getworkshop`).then(res => {
            setData(res.data.data)
            setShowspinner(false)
        })
    };

    const handleClose = () => {
        setShowworkshop(false) 
    }

    const handleOpen = (title_workshop) => {
        candidate.workshop = title_workshop
        setShowworkshop(true);
    }

    const register = () => {
        if(candidate.name && candidate.workshop && candidate.phone && candidate.email) {
            axios.post(`${process.env.REACT_APP_LINK}/workshop/register`, JSON.stringify({
                id :  uuidv4(),
                name : candidate.name,
                workshop : candidate.workshop,
                phone : candidate.phone,
                email : candidate.email
            }), {
                headers: {
                  'Content-Type': "application/json",
                }}).then((res)=> {
                setShowalert(true) 
                setTypealert("success")
                setMessagealert("Inscription effectuée avec succée !")
                setTimeout(() => {
                    setShowalert(false);
                    handleClose()
                }, "1400")
            })
        }
    else {
        setShowalert(true) 
        setMessagealert("Veuillez remplir tous les champs")
        setTypealert("warning")
        setTimeout(() => {
            setShowalert(false);
            handleClose()
        }, "1400")
    }
    }

    useEffect(() => {
        getAllWorkshop();
    }, [])

    return (
        <div className='Workshop'>
            <div> <Navbar /> </div>
            <img src={Motifworkshop}
                alt="motif workshop"
                className='motif-workshop'
            />
            <h1 className='workshop-title'> Workshop </h1>

            <div className='workshop-container'>
            {showspinner && <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>}
                    
                {data && data.map((elm) => {
                    return (
                        <div className='card-workshop'>
                            <div className='img-card-workshop'>
                                <img src={`${process.env.REACT_APP_LINK}/uploads/${elm.photo}`} />
                            </div>
                            <div className='card-workshop-information'>
                                <h2>  {elm.title}  </h2>
                                <h4> <u> <b> Date </b> </u> : {elm.date} </h4>
                                <h4> <u> <b> Heure </b>   </u> : {elm.hour}  </h4>
                                <h4> <u> <b> Nombre de place </b> </u> :  {elm.place} </h4>
                                <h4> <u> <b> Description  </b> </u></h4>
                                <p className='text-description-workshop'> {elm.description} </p>
                                <button className='discover-button' onClick={()=> {handleOpen(elm.title) }}> S'inscrire </button>
                            </div>
                        </div>
                    )
                })
                }

{ showworshop && 
      <Modal show={showworshop} onHide={handleClose} className="modal-workshop">
        <Modal.Header closeButton>
          <Modal.Title> Inscription Workshop </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalworkshopbody">
            <div className='form-workshop-container'> 
            <form onSubmit={(e)=> e.preventDefault()}> 
            <div className='div-input-information'> <input placeholder='Nom et prénom' 
            value={candidate.name} onChange={(e) => {
                candidate.name = e.target.value;
                    }} /> </div>
            <div className='div-input-information'> <input placeholder='Téléphonne' value={candidate.phone} onChange={(e) => {candidate.phone = e.target.value }} /> </div>
                    <div className='div-input-information'> <input placeholder='Email' value={candidate.email} onChange={(e) => {candidate.email = e.target.value }} /> </div>
                    {showalert && <div className='alert-container-choixe-box'>
            <Alert key={`${typealert}`} variant={`${typealert}`}> {messagealert} </Alert>
            </div>}
                    <button className='submit-workshop-registration' onClick={()=> register()}> S'inscrire </button>
            </form>
            </div>
<img src={Motifworkshop} alt="motif img workshop modal" className='motif-modal'/>
            </Modal.Body>
      
      </Modal>}
            </div>
            <div className='footer-shop'>
                <Footer />
            </div>
        </div>
    )
}
