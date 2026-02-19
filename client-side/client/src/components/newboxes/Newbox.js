import React from 'react'
import Stylenewbox from '../newboxes/Newbox.css'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Newicon from '../../images/new-mabox-newbox-icon.png'
import AOS from 'aos';
export default function Newbox() {
    AOS.init();

    const [show, setShow] = useState(false);
    const [x, setX] = useState(0)
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const titleref = useRef(null);
    const titleref_1 = useRef(null);
    const cards_body = useRef(null);
    const paragraph_bestproduct = useRef(null);
    const [value, setValue] = useState();
    const getImgProduct = () => {
        axios.get(`${process.env.REACT_APP_LINK}/product/get`).then((res) => {
            console.log(res)
            setShow(true);
            setData((res.data.data).filter((elm) => elm.bestseller === "1"))
        })
    }

    useEffect(() => {
        getImgProduct();
    }, [])
  return (
    <div className='Newboxs'>
  <div className='newboxs-container'>
                <div className='newboxs-text'>
                    <img 
                    src={Newicon} 
                    alt="new product icon" 
                    className='icon-new-product'/>
                    <h1 className='title-firstpart'
                        data-aos="fade-left">
                        Meilleures ventes boxs
                    </h1>
                </div>
                <div className='card-content-containner'>
                    <div className='cards_container'>
                        <div Style={{ "textAlign": "right" }}>
                            <i class='bx bx-right-arrow-alt'></i>
                        </div>
                        <div className='product_card_container'>
                            {data && data.sort().reverse().slice(-4).map((elm) => {
                                return (
                                    <div className='cards' onClick={() => { navigate(`/product/${elm.id}`) }}
                                        data-aos="flip-left"
                                        data-aos-delay="400"
                                        data-aos-duration="700">
                                        {/* <img src={Imgbgcard} className='img-bg-card'/>*/}
                                        <div className='img_cards'>
                                            <img src={elm.img && `${process.env.REACT_APP_LINK}/productsimg/${elm.img}` || elm.urlimg} />
                                        </div>
                                        <div className='details_card'>
                                            <h4> {elm.name} </h4>
                                            <div className='price'> {elm.price} Da </div>
                                        </div>
                                        <div className='cta-buy-button'>
                                            <button> Acheter </button>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}
