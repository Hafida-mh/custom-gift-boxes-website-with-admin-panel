import React, { useState } from 'react'
import Styleworkshop from '../workshop/Workshop.css'
import Home from '../home/Home';
import Navalert from '../navalert/Navalert';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import axios from 'axios'
import Dropdown from 'react-bootstrap/Dropdown';
import Allworkshop from './Allworkshop';
import Registration from './Registration';
export default function Wrkshop() {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [hour, setHour] = useState("");
    const [place, setPlace] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState("");
    const [showalerterror, setShowalerterror] = useState(false);
    const [alerte, setAlerte] = useState("");
    const [showallworkshop, setShowallworkshop] = useState(true);
    const [showaddworkshop, setShowaddworkshop] = useState(false);
    const [showregistration, setRegistration] = useState(false);
    const [showalert, setShowalert] = useState(false);
    const [title_page, setTitlePage] = useState("Ajouter Workshop")

    const disapearAlert = (msg) => {
        if (msg === "Workshop ajouté avec succcés") {
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

    const postproduct = () => {
        uploadImgworkshop();
        const data = {
            id: uuidv4(),
            title: title,
            date: date,
            hour: hour,
            description: description,
            place: place,
            img: file.name
        }
        if (title && date && hour && place && description && file) {
            try {
                axios.post(`${process.env.REACT_APP_LINK}/workshop/addworkshop`, JSON.stringify(data), {
                    headers: {
                        'Content-Type': "application/json",
                        'x-access-token': Cookies.get("refreshtoken")
                    }
                }).then(res => {
                    setAlerte(res.data.message);
                    disapearAlert(res.data.message);
                    setTitle("");
                    setDate("");
                    setHour("");
                    setPlace("");
                    setDescription("");
                    setFile("");
                    window.location.reload();
                })
            } catch (error) {
                console.log(error)
            }
        }
        else {
            setAlerte("Un des champs obligatoires est vide");
            setShowalerterror(true)
            setTimeout(() => {
                setShowalerterror(false)
            }, 2300)
        }
    }

    const uploadImgworkshop = () => {
        const formdata = new FormData();
        formdata.append('image', file);
        axios.post(`${process.env.REACT_APP_LINK}/workshop/uploadimgworkshop`, formdata, {}).then((res) => console.log(res));
    }

    return (
        <div className='Workshop'>
            <div className='navigation-bar'>
                <Home />
            </div>
            <div className='workshop-container-content'>
                <div> <Navalert /> </div>
                <h1 className='main-title'>  <i className='bx bx-purchase-tag-alt' id="icon-dashbord"></i> {title_page} </h1>
                <div className='dropdown-button'>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic">
                            <i className="fa-solid fa-bars"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => { setShowallworkshop(false); setShowaddworkshop(true); setRegistration(false); setTitlePage("Modifier Workshop") }}> Tous les Workshops </Dropdown.Item>
                            <Dropdown.Item onClick={() => { setShowallworkshop(true); setShowaddworkshop(false); setRegistration(false); setTitlePage("Ajouter Workshop") }}> Ajouter Workshop </Dropdown.Item>
                            <Dropdown.Item onClick={() => { setShowallworkshop(false);  setShowaddworkshop(false); setRegistration(true); setTitlePage("Candidats workshop") }}> Inscription workshop </Dropdown.Item>

                           
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div>

                    {showallworkshop && <form encType="multipart/form-data" method="post" onSubmit={(e) => e.preventDefault()} className='form-product'>
                        <div className='filds-form'>
                            <input className='filds product title' onChange={(e) => setTitle(e.target.value)} value={title} placeholder='Titre/théme du Workshop' />
                        </div>
                        <div className='filds-form'>
                            <input className='filds product' value={date} onChange={(e) => setDate(e.target.value)} placeholder='Date du workshop' />
                            <input className='filds product' value={hour} onChange={(e) => setHour(e.target.value)} placeholder='Heures workshop' />
                        </div>
                        <div className='filds-form'>
                            <textarea placeholder='Description du workshop' value={description} className='filds paragraphe' rows="4" cols="5" onChange={(e) => {
                                setDescription(e.target.value);
                            }}>
                            </textarea>
                        </div>
                        <div className='filds-form'>
                            <input className='filds product title place' value={place} onChange={(e) => setPlace(e.target.value)} placeholder='Nombre de places disponibles' />
                        </div>
                        <div className='input-img-product img-file'>
                            <label htmlFor="inputfile" className='label-input-file'>
                                <div className='icon-download'> <i className='bx bx-cloud-download'></i> </div>
                                <div className='file-name'> {file && file.name}</div>
                                {!file && <div className='label-import-file-name'> Importer une image (H : 520px  W : 330px) </div>}
                            </label>
                            <input
                                id="inputfile"
                                type="file"
                                accept="image/png, image/gif, image/jpeg, image/webp"
                                name="image"
                                onChange={(e) => {
                                    setFile(e.target.files[0]);
                                }}
                                className='add-file-input'
                            />
                        </div>
                        {showalert && <div className='alert-container'> <i className="fa-regular fa-circle-check"></i>  {alerte} </div>}
                        {showalerterror && <div className='alert-container error'> <i className="fa-regular fa-circle-xmark"></i>  {alerte} </div>}
                        <button type='submit' className='submit-button product' onClick={() => postproduct()}> Valider </button>
                    </form>}
                    {showaddworkshop && <Allworkshop />}
                    {showregistration && <Registration />}
                </div>
            </div>
        </div>
    )
}
