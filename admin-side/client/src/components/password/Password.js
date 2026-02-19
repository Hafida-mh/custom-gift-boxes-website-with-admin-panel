import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import Home from '../home/Home';
import Navalert from '../navalert/Navalert';
import '../password/Password.css'
export default function Password() {
    const [data, setData] = useState({ email: "mechkour.hafida16@gmail.com" });
    const [password, setPassword] = useState();
    const [showalert, setShowalert] = useState(false);
    const [showalerterror, setShowalerterror] = useState(false);
    const [alerte, setAlerte] = useState("");

    const updatePassword = () => {
        if(password) {
        axios.put(`${process.env.REACT_APP_LINK}/auth/update`, JSON.stringify({ password: password }), {
            headers: {
                'Content-Type': "application/json",
                'x-access-token': Cookies.get("refreshtoken")
            }
        }).then((res)=> {
            setAlerte(res.data.message); 
            disapearAlert(res.data.message);
        })
    }
    else{
        setAlerte("Veuillez insérer le nouveau mot de passe");
        setShowalerterror(true)
        setTimeout(() => {
            setShowalerterror(false)
        }, 2300)
    }
    }

    const disapearAlert = (msg) => {
        if(msg === "Mot de passe mis à jour avec succés !") {
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
        <div className='password-container'>
           <div className='navigation-bar'>
                <Home />
            </div>
            <div className='password-form-content'>
            <div> <Navalert /> </div>
                <h1 className='main-title'> <i className='bx bx-fingerprint' id="icon-dashbord"></i>  Mise à jour du mot de passe </h1>
                <form onSubmit={(e) => { e.preventDefault() }} className='formpassword'>
                    <div className='filds-form password-form'>
                        <label className='fild-item label'> Entrer nouveau mot de passe</label>
                        <input className='fild-item password' placeholder="Insérer mot de passe" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        <button className='fild-item submit-button pawssword' onClick={() => updatePassword()}> Confirmer </button>
                    </div>
                </form>
                {showalert && <div className='alert-container'> <i class="fa-regular fa-circle-check"></i>  {alerte} </div>}
                        {showalerterror && <div className='alert-container error'> <i class="fa-regular fa-circle-xmark"></i>  {alerte} </div>}
            </div>
        </div>
    )
}
