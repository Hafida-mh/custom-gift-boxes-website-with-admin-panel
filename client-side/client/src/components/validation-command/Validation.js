import React from 'react'
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import Cookies from 'js-cookie';
import Alert from 'react-bootstrap/Alert';
import '../validation-command/Validation.css'
import { useNavigate } from 'react-router-dom';
import Navbar from '../nav/Navbar';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
export default function Validation() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [allwilaya, setAllwilaya] = useState([])
    const [alert, setAlert] = useState(false)
    const [message, setMessage] = useState("")
    const [detail, setDetailproduct] = useState("")
    const [error, setError] = useState("")
    const [totaltodesiplay, setTotaltodisplay] = useState(Cookies.get("total"))
    const [total, setTotal] = useState(parseFloat(Cookies.get("total")))
    const [data, setData] = useState({
        id: uuidv4(),
        fullname: "",
        email: "",
        telephone: "",
        wilaya: "",
        adresse: "",
        detailproduct : "",
        list: Cookies.get("cards"),
        total: Cookies.get("total")
    })

    const getselectedWilaya = () => {
        const selection = document.getElementById(`selected-wilaya`)
        data.wilaya = selection.value
        const element = allwilaya.find((elm) => elm.code == selection.value)
        setTotaltodisplay(total + parseFloat(element.price))
        data.total = total + parseFloat(element.price)
    }

    /*
    const updatePrice = (deliveryprice) => {
        const initial_price = total;
        setTotal(initial_price + deliveryprice)
        data.total = JSON.stringify(total)
    }
*/

const sendEmail = (email) => {
      axios.post(`${process.env.REACT_APP_LINK}/emailing/sendconfirmationcommand`, JSON.stringify({
        email: email,
      }), {
        headers: {
          'Content-Type': "application/json",
          'x-access-token': Cookies.get("refreshtoken")
        }
      }).then((res) => {
       console.log("send")
      })
   
  }

    const validateCommand = () => {
        //   Cookies.set("total", JSON.stringify(data.price))
        axios.post(`${process.env.REACT_APP_LINK}/command/add`, JSON.stringify(data), {
            headers: {
                'Content-Type': "application/json"
            }
        }).then((res) => {
            console.log("finish")
                setAlert(true);
                setMessage("Commande enregistrée avec succés !")
                sendEmail(data.email)
                setTimeout(() => {
                    setAlert(false);
                    navigate('/shop')
                }, "1800")
                Cookies.set('cards', JSON.stringify([]))
        })
    }

    const getallwilayas = () => {
        axios.get(`${process.env.REACT_APP_LINK}/shipping/get`).then((res) => {
            setAllwilaya(res.data.data)
        })
    }

    useEffect(() => {
        getallwilayas()
    }, [])

    return (
        <div className='validation-command'>
            <div>
                <Navbar />
            </div>

            <div className='form-validation-command'>
                <div className='form-validation-container'>
                    <h1> Validation commande </h1>
                    <div>
                        {alert && <Alert variant="success">
                            {message}
                        </Alert>}
                    </div>
                    <form onSubmit={(e) => e.preventDefault()} className='form-command'>
                        <div className='inputs-container'>
                            <input name='name' placeholder='Entrer nom complet' type="text" onChange={(e) => { data.fullname = e.target.value }} />
                            <input name='phone' placeholder='Entrer numéro de telephone' type='number' onChange={(e) => { data.telephone = e.target.value }} />
                        </div>
                        <div className='inputs-container'>
                            <input name='address' placeholder='Entrer votre adresse' type='text' onChange={(e) => { data.adresse = e.target.value }} />
                            <input name="email" placeholder='Entrer email' onChange={(e) => { data.email = e.target.value }} />
                        </div>
                        <div className='inputs-container'>
                            <select id="selected-wilaya" onChange={() => getselectedWilaya()}>
                                <option selected="selected"> Selectionner une Wilaya </option>
                                {allwilaya && allwilaya.map((elm) => {
                                    return (
                                        <option value={elm.code}> {elm.name} </option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className='inputs-container'>
                            <textarea onChange={(e)=> {data.detailproduct = e.target.value}} placeholder='Précisez la taille/pointure/couoeur du ou des poduits commandés !'> 
                            </textarea>
                        </div>
                        <h3> Prix : {totaltodesiplay} Da</h3>
                        <div className='validation-command-button-container'>
                            <button className="validation-command-button" onClick={() => { validateCommand() }}> Valider </button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
