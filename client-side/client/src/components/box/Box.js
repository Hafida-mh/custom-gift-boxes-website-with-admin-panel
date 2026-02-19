import React, { useEffect, useState } from 'react'
import Boxstyle from '../box/Box.css'
import Navbar from '../nav/Navbar'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { v4 as uuidv4 } from 'uuid'
import Boxspecial from '../../images/box-special-img.png'
import Boxpersonnalise from '../../images/box-personnalise.png'
import Footer from '../footer/Footer'
import Motifboxpage from '../../images/motif-workshop.png'
import axios from 'axios'
export default function Box() {
    const navigate = useNavigate()
  const [boxspecial, setBoxspecial] = useState([])
    const getBoxspeciale = () => {
        axios.get(`${process.env.REACT_APP_LINK}/product/get`).then((res) => {
            setBoxspecial([res.data.data.reverse().filter((product)=> product.category === "Box speciale")]);
      console.log([res.data.data.reverse().filter((product)=> product.category === "Box speciale")])
        })
    }

 useEffect(()=> {
    getBoxspeciale();
 },[])

    return (
        <div className='Box'>
            <div> <Navbar /> </div>
            <img src={Motifboxpage} 
            alt="box page motif" 
            className='motif-box-page'/>
            <h1 className='box-title'> Box </h1>
            <p className='text-box-page'> Plusieurs box aux choix pour faire plaisir à ceux que vous aimez ! </p>
            <div className='choice-box-conatainer'>

   {    boxspecial && boxspecial.map((elm)=> {
    return (
<div className='box-type-container'>
                    <div className='image-sectionn-box-type'>
                        <img src={Boxspecial} alt="box special" className='special-box-img' />
                    </div>
                    <h3 className='title-box-choice'> <b> {elm[0].name}  </b></h3>
                    <button className='discover-box-button' onClick={()=> {navigate(`/product/${elm[0].id}`)}}> Découvrir </button>
                </div>
    )
   })         }

                <div className='box-type-container'>
                    <div className='image-sectionn-box-type'>
                        <img src={Boxpersonnalise} alt="box special" className='special-box-img' />
                    </div>
                    <h3 className='title-box-choice'> <b> Box personnalisée  </b></h3>
                    <button className='discover-box-button' onClick={() => {
                navigate(`/box-personnalise/${uuidv4()}`);
                Cookies.set('boxcommand', JSON.stringify([]));
                Cookies.set('informationclient', JSON.stringify([]));
                Cookies.set('allcommandbox', JSON.stringify([]));
            }}> Je personnalise ma box </button>
                </div>
            </div>
       <div>
        <Footer />
       </div>
        </div>
    )
}
