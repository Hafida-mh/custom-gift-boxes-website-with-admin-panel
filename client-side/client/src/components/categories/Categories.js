import React from 'react'
import Stylee from '../categories/Categories.css'
import Visageimg from '../../images/visage.png'
import Shampoing from '../../images/shampooing1.png'
import Savon from '../../images/savon.png'
import Soinnanturel from '../../images/soin-naturel.png'
import AOS from 'aos';
import { useNavigate } from 'react-router-dom';
export default function Categories() {
    AOS.init();
    const navigate = useNavigate();
    return (
        <div className='categories-container'>
            <div className='categories-contennt'>
                <div data-aos="zoom-in" className='treatment-section'>
                    <h2> SOINS NATURELS </h2>
                    <button onClick={() => { navigate('/shop') }}> Découvrir </button>
                    <img src={Soinnanturel}
                            alt="soin visage"
                            className='visage-img soin'
                        />
                    <span className='signature-card-categories'> Source de la nature </span>
                </div>
                <div className='skin-hair-section'>
                    <div data-aos="zoom-in"  className='card-care-treatment'>
                        <h2> SKIN CARE </h2>
                        <button onClick={() => {navigate('/shop')}}> Découvrir </button>
                        <img src={Visageimg}
                            alt="soin visage"
                            className='visage-img'
                        />
                        <span className='signature-card-categories'> Source de la nature </span>
                    </div>
                    <div data-aos="zoom-in" className='card-care-treatment'>
                        <h2> HYGIÉNE </h2>
                        <button onClick={() => { navigate('/shop')}}> Découvrir </button>
                        <img src={Savon}
                            alt="soin visage"
                            className='visage-img shampoing'
                        />
                        <span className='signature-card-categories'> Source de la nature </span>
                    </div>
                    <div data-aos="zoom-in" className='card-care-treatment'>
                        <h2> CAPILAIRE </h2>
                        <button onClick={() => { navigate('/shop') }}> Découvrir </button>
                        <img src={Shampoing}
                            alt="soin visage"
                            className='visage-img shampoing'
                        />
                        <span className='signature-card-categories'> Source de la nature </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
