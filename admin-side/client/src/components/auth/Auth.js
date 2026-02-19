import React, { useState, useEffect } from 'react'
import '../auth/Auth.css'
import axios from 'axios'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Imgfront from '../../images/admin-illustration.png'
import Logoimg from '../../images/logo-etadjir-adminside.png'
export default function Auth() {
  const [pw, setPw] = useState()
  const [email, setEmail] = useState()
  const [secret_key, setSecretKey] = useState()
  const [show, setShow] = useState(false)
  const [showalert, setShowalert] = useState(false)
  const [showalerterror, setShowalerterror] = useState(false)
  const [alerte, setAlerte] = useState("")
  const navigate = useNavigate()
  const [data, setData] = useState({
    password: pw,
    email: email
  });
  const ckeckConnexion = async () => {
    const date = new Date();
    date.setTime(date.getTime() + (60 * 1000));
    await axios.post(`${process.env.REACT_APP_LINK}/auth/login`, JSON.stringify({
      password: pw,
      email: email
    }), {
      headers: {
        'Content-Type': "application/json"
      }
    }).then((res) => {
      if (res.data.message !== "Connexion réussie") {
        setAlerte("Mot de passe ou adresse mail incorrecte !")
        setShowalerterror(true)
        setTimeout(() => {
          setShowalerterror(false)
        }, 2300)
        // disapearAlert()
      }
      else {
        Cookies.set('token', res.data.token);
        Cookies.set('refreshtoken', res.data.refreshToken);
        setAlerte("Connexion réussie !")
        setShowalert(true)
        setTimeout(() => {
          setShowalert(false)
          navigate("/landing")
        }, 2300)
      }
    })
  }

  const forgotPassword = async () => {
    await axios.post(`${process.env.REACT_APP_LINK}/auth/getpassword`, JSON.stringify({
      secretKey: secret_key
    }), {
      headers: {
        'Content-Type': "application/json"
      }
    })
  }

  useEffect(() => {
    Cookies.set('token', "");
    Cookies.set('refreshtoken', "");
  }, [])

  return (
    <div className='authentification'>

      <div className='authentification-container'>
        <div className='title-mobile-version'>
          <h3 className='title-container'> Bienvenus à votre espace admin</h3>
        </div>
        <div className='form-container'>
          {showalert && <div className='alert-container'> <i class="fa-regular fa-circle-check"></i>  {alerte} </div>}
          {showalerterror && <div className='alert-container error'> <i class="fa-regular fa-circle-xmark"></i>  {alerte} </div>}
          {!show && <form onSubmit={(e) => e.preventDefault()} className='form-content'>
            <div className='form-cntainer-title'>
              <h3> Hello there 👋  </h3>
              <div> Connectez-vous à votre espace admin </div>
            </div>
            <div>
              <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} className='input-form' placeholder='Entrer email' />
            </div>
            <div>
              <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} className='input-form' placeholder='Entrer mot de passe' />
            </div>
            <div className='login-button-container'>
              <button onClick={() => ckeckConnexion()}> Connexion </button>
            </div>
            <div onClick={() => { setShow(true) }} className='forget-pw'> Mot de passe oublié ?</div>
          </form>}

          {show && <form onSubmit={(e) => e.preventDefault()} className='form-content key'>
            <h3> Réinitialiser mot de passe </h3>
            <div>
              <input placeholder='Insérer la clé' onChange={(e) => setSecretKey(e.target.value)} className='input-form' />
            </div>
            <div className='login-button-container'>
              <button onClick={() => forgotPassword()}> Confirmer </button>
            </div>
          </form>}
        </div>
      </div>
    </div>
  )
}
