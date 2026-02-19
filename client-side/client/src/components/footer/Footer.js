import React from 'react'
import '../footer/Footer.css'
import { useState, useEffect, useCallback } from 'react'
import Logo from '../../images/logo-maboxalgerie.png'
import { Link } from "react-router-dom"
import Imgmotif from '../../images/mabox-motif.png'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import Alert from 'react-bootstrap/Alert'
import Pdfplotique from "../../document/politique-de-confidentialite.pdf"
export default function Footer() {
    const [newsletter, setNewsletter] = useState();
    const [showalert, setShowalert] = useState(false);
    const [showalerterror, setShowalerterror] = useState(false);
    const [allnewsletter, setAllnewsletter] = useState();

    const postnewsletteremail = () => {
        axios.get(`${process.env.REACT_APP_LINK}/newsletter/getnewsletter`).then(res => {
          
            if(newsletter) {
                if ((res.data.data.filter((elm)=> elm.email === newsletter)).length === 0) {
                    axios.post(`${process.env.REACT_APP_LINK}/newsletter/addnewsletter`, JSON.stringify({
                        id :  uuidv4(),
                        email : newsletter
                    }), {
                        headers: {
                          'Content-Type': "application/json",
                        }}).then(()=> {
                            setShowalert(true) 
                            setTimeout(() => {
                                setShowalert(false);
                            }, "1400")
                        })
                }
                else {
                    setShowalerterror(true) 
                    setTimeout(() => {
                        setShowalerterror(false);
                    }, "1400")
                }
    
            }
           
else {
    setShowalerterror(true) 
    setTimeout(() => {
        setShowalerterror(false);
    }, "1400")
}
        })
    }
    return (
        <div className='footer'>
            <img
                src={Imgmotif}
                alt="image motif footer"
                className='img-motif-footer'
            />
            <div className='footer-container'>
                <div className='footer-section logo-section'>
                    <div className='logo-footer-mabox'>
                        <img
                            src={Logo}
                            alt="logo mabox footer" />
                    </div>
                    <p className='paragraphe-presentation-footer'>
                        Contrary to popular belief, Lorem
                        Ipsum is not simply random text. It has roots
                        in a piece of classical  Latin literature from 45
                        BC.
                    </p>
                    <div className='socialmedia-icon-footer'>
                       <a href="https://web.facebook.com/maboxalger" alt="facebook mabox">  <i class='bx bxl-facebook-circle' ></i> </a>
                       <a href="https://www.instagram.com/ma_box_algerie/?hl=fr" alt="instagram mabox">  <i class='bx bxl-instagram'></i> </a>
                       <a href="https://www.linkedin.com/company/ma-box-algerie/" alt="linkedin mabox">  <i class='bx bxl-linkedin-square' ></i> </a>
                    </div>
                </div>

                <div className='footer-section link-section'>
                    <h6> Liens utiles </h6>
                    <div className='links-footer'>
                        <i class='bx bx-right-arrow-alt' ></i>
                        <div className='link-footer-items'>
                            <Link to="/" className='link-item'> Accueil </Link>
                        </div>
                    </div>

                    <div className='links-footer'>
                        <i class='bx bx-right-arrow-alt' ></i>
                        <div className='link-footer-items'>
                            <Link to="/shop" className='link-item'> Shop </Link>
                        </div>
                    </div>

                    <div className='links-footer'>
                        <i class='bx bx-right-arrow-alt' ></i>
                        <div className='link-footer-items'>
                            <Link to="/box" className='link-item'> Box </Link>
                        </div>
                    </div>
                    <div className='links-footer'>
                        <i class='bx bx-right-arrow-alt' ></i>
                        <div className='link-footer-items'>
                            <Link to="/workshop" className='link-item'> Workshop </Link>
                        </div>
                    </div>
                    <div className='links-footer'>
                        <i class='bx bx-right-arrow-alt' ></i>
                        <div className='link-footer-items'>
                            <Link to="/contact" className='link-item'>  Corporate Gifts </Link>
                        </div>
                    </div>
                    <div className='links-footer'>
                        <i class='bx bx-right-arrow-alt' ></i>
                        <div className='link-footer-items'>
                            <a href={Pdfplotique} alt="pdf politique de confidentialité" className='link-item special-link'>  Politique de confidentilité </a>
                        </div>
                    </div>
                </div>
                <div className='footer-section newsletter'>
                    <h6> Newsletter </h6>
                    <p className='subscribe-newsletter-paragraph'> Abonnez-vous à notre newsletter </p>
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="form-newsleter-footer"
                    >
                        <input
                            onChange={(e) => { setNewsletter(e.target.value)}}
                            placeholder="Entrer votre adresse email"
                        />
                      <button className='subscribe-button-footer' onClick={()=> {postnewsletteremail()}}> S'inscrire </button>
                        {showalert && <div className='alert-container-choixe-box'>
                       <Alert key="success" variant="success"> Email enregistré </Alert>
</div>}

{showalerterror && <div className='alert-container-choixe-box'>
                       <Alert key="warning" variant="warning"> Email non enregistré </Alert>
</div>}
                  </form>
                </div>
            </div>
            <div className='copyright-footer'> Copyright @ 2024. All right reserved. </div>
        </div>
    )
}
