import React from 'react'
import Styleboxquestion from '../box/Boxquestion.css'
import Navbar from '../nav/Navbar'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import Deleteicon from '../../images/delete-icon.png'
import Footer from '../footer/Footer'
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Motifboxpage from '../../images/motif-workshop.png'
import { v4 as uuidv4 } from 'uuid';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";

export default function Boxquestion() {
    const { id } = useParams();
    const [allboxes, setAllboxes] = useState();
    const [qte, setQte] = useState("1")
    const [boxcommand, setBoxcommand] = useState([]);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [classe, setClasse] = useState();
    const [showalert, setShowalert] = useState(false);
    let [sum, setSum] = useState(0)
    const getAllboxes = () => {
        axios.get(`${process.env.REACT_APP_LINK}/box/getallboxes`).then((res) => { setAllboxes(res.data.data); })
    }

    const calculsumtotalbox = (elm_price, elm_qte) => {
        console.log(sum)
        console.log(boxcommand)
        boxcommand.map((elm)=> {
            sum = sum + (Number(elm.price) * Number(elm.qte));
            setSum(sum)
            console.log(sum)
        })
        Cookies.set('totalbox', JSON.stringify(sum))
    }

    const updateboxcommand = (elm_id, elm_name, elm_price, elm_qte, elm_max) => {
        const card = document.getElementById(`${elm_id}`);
        const deletebutton = document.getElementById(`${'button' + elm_id}`);

        if (boxcommand.length === 0 || boxcommand.find((elmt) => elmt.id === elm_id) === undefined) {
            boxcommand.push({ id: elm_id, boxname: elm_name, qte: elm_qte, price: elm_price, max: elm_max });
            Cookies.set("boxcommand", JSON.stringify(boxcommand));
            setData(boxcommand)
            card.classList.replace("boxe-card", "boxe-card-selected");
            deletebutton.classList.replace("button-nnon-selected", "button-selected");
        }
        else {
            card.classList.replace("boxe-card", "boxe-card-selected");
        }
        Cookies.set("boxcommand", JSON.stringify(boxcommand));
        console.log(boxcommand)
    }

    const deleteboxcommannd = (elm_id, elm_name, elm_price) => {
        const card = document.getElementById(`${elm_id}`);
        const deletebutton = document.getElementById(`${'button' + elm_id}`);
        setBoxcommand(boxcommand.filter((elm) =>
            elm.id != elm_id
        ))
        Cookies.set("boxcommand", JSON.stringify(boxcommand));
        deletebutton.classList.replace("button-selected", "button-nnon-selected");
        card.classList.replace("boxe-card-selected", "boxe-card-deleted");
    }

    const updateqte = (elm_id, elm_name, elm_price, new_qte) => {
        boxcommand.map((elm) => {
            if (elm.id === elm_id) {
                elm.qte = new_qte
            }
        })
        Cookies.set("boxcommand", JSON.stringify(boxcommand));
    }

    useEffect(() => {
        getAllboxes();
    }, [])

    useEffect(() => {
        Cookies.set("boxcommand", JSON.stringify(boxcommand));
    }, [boxcommand])

    return (
        <div className='Boxquestions'>
            <div> <Navbar /> </div>
            <img src={Motifboxpage} 
            alt="box page motif" 
            className='motif-box-page'/>
            <h1 className='personnalise-box-title title-box'> Box  </h1>
            <h1 className='personnalise-box-title'> <b> 1. Choix box </b> </h1>
            <div className='allboxes-container'>
                {allboxes && allboxes.map((elm) => {
                    return (
                        <div className='boxe-card' id={elm.id}
                            onClick={() => { updateboxcommand(elm.id, elm.boxname, elm.boxprice, qte, elm.boxproductnumber) }}
                        >
                            <div className='img-box'>
                                <img
                                    src={`${process.env.REACT_APP_LINK}/boximages/${elm.boxphoto}`}
                                    alt="image box" />
                            </div>
                            <h3 className="box-name"> <b> {elm.boxname} </b></h3>
                            <h2 className='price-box'> {elm.boxprice} Da </h2>
                            <div className='form-box-container'>
                                <form onSubmit={(e) => e.preventDefault()} className="form-qte-box">
                                    <label> <b> Qte </b> : </label>
                                    <input
                                        onChange={(e) => {
                                            setQte(e.target.value); updateqte(elm.id, elm.boxname, elm.boxprice, e.target.value)
                                        }}
                                        placeholder={elm.qte}
                                    />
                                </form>
                            </div>
                            <button onClick={() => deleteboxcommannd(elm.id, elm.boxname, elm.boxprice)}
                                id={`${'button' + elm.id}`} className='button-nnon-selected'>
                                <img src={Deleteicon} /> </button>
                        </div>
                    )
                })
                }


            </div>
            <div className='alert-container-choixe-box'>
                {showalert && <Alert key="warning" variant="warning" className='alert-choice-box'> Veuillez sélectionner des produits ! </Alert>}
            </div>
            <div className='buttons-follow-questions'>
                <button className='action-button' onClick={() => {
                    if (boxcommand.length === 0) {
                        setShowalert(true);
                        setTimeout(() => {
                            setShowalert(false);
                        }, "1400");
                    }
                    else {
                        navigate(`/box-choix-produit/:${uuidv4()}`)
                        calculsumtotalbox()
                    }
                }
                }> Suivant </button>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}
