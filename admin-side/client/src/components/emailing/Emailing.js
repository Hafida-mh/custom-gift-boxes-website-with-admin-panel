import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import '../emailing/Emailing.css'
import Home from '../home/Home';
import Navalert from '../navalert/Navalert';
export default function Emailing() {
  const [emails, setEmails] = useState([]);
  const [target, setTarget] = useState([]);
  const [msg, setMsg] = useState()
  const [subject, setSubject] = useState()
  const [showalert, setShowalert] = useState(false);
  const [showalerterror, setShowalerterror] = useState(false);
  const [alerte, setAlerte] = useState("");
  const handleNonBuyersEmail = () => {
    axios.get(`${process.env.REACT_APP_LINK}/command/getcommand`, {
      headers: {
        'x-access-token': Cookies.get("refreshtoken"),
      }
    }).then((res) => {
      res.data.data.map((elm) => {
        return (
          emails.push(elm.email)
        )
      })
    })
  }

  const getSelectValue = () => {
    var select = document.getElementById('select');
    setTarget(select.options[select.selectedIndex].text);
    if (select.options[select.selectedIndex].text === "Potentiels acheteurs") {
      handleNonBuyersEmail()
    }
  }

  const sendEmail = () => {
    if (msg && emails && subject) {
      axios.post(`${process.env.REACT_APP_LINK}/emailing/send`, JSON.stringify({
        message: msg,
        emails: emails,
        object: subject
      }), {
        headers: {
          'Content-Type': "application/json",
          'x-access-token': Cookies.get("refreshtoken")
        }
      }).then((res) => {
        setAlerte(res.data.message);
        disapearAlert(res.data.message);
      })
    }
    else {
      setAlerte("Un des champs obligatoires est vide");
      setShowalerterror(true)
      setTimeout(() => {
        setShowalerterror(false)
      }, 2300)
      // disapearAlert()
    }
  }

  const disapearAlert = (msg) => {
    if (msg === "Email envoyé avec succés !") {
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

  return (
    <div className='email-container'>
      <div className='navigation-bar'>
        <Home />
      </div>
      <div className='email-elements'>
        <div> <Navalert /> </div>
        <h2 className='title-email-container'> <i className='bx bx-message-alt-dots' id="icon-dashbord"></i> Envoyer des emails </h2>
        {showalert && <div className='alert-container'> <i class="fa-regular fa-circle-check"></i>  {alerte} </div>}
        {showalerterror && <div className='alert-container error'> <i className="fa-regular fa-circle-xmark"></i>  {alerte} </div>}
        <div className='form-email-container'>
          <form onSubmit={(e) => e.preventDefault()} className='form-email'>
            <div>
              <select className='filds email selector' name="select" id="select" onChange={() => getSelectValue()}>
                <option> Destinataire </option>
                <option> Potentiels acheteurs </option>
              </select>
            </div>
            <div>
              <input className='filds email' onChange={(e) => { setSubject(e.target.value) }} value={subject} placeholder='Objet de votre email' />
            </div>
            <div>
              <input className='filds email message' onChange={(e) => { setMsg(e.target.value) }} value={msg} placeholder='Entrer votre texte' />
            </div>
            <button onClick={() => sendEmail()} className='submit-button'> Envoyer  </button>
          </form>
        </div>
      </div>
    </div>
  )
}
