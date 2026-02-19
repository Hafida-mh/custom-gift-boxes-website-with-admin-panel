import React from 'react'
import Navbar from '../nav/Navbar'
import Slides from '../slides/Slides'
import BestSeller from '../bestseller/BestSeller'
import Syle from '../home/Home.css'
import Presentation from '../presentation/Presentation'
import Advantage from '../avantages/Advantage'
import Alertworkshop from '../alertworkshop/Alertworkshop'
import Feedback from '../feedback/Feedback'
import Newbox from '../newboxes/Newbox'
import Footer from '../footer/Footer'
import Contact from '../contact/Contact'
import Referenceclient from '../reference-client/Referenceclient.js'
import { motion } from "framer-motion"
import Categories from '../categories/Categories'
import { useState, useEffect, useRef } from 'react'
export default function Home() {
  return (
    <motion.div 
    className='Home'>
        <div className='nav-container'> <Navbar /> </div>
        <div> <Alertworkshop /> </div>
        <div> <Slides /> </div>
        <div> <Presentation /> </div>
        <div> <BestSeller /> </div>
       <div> <Newbox /> </div>
       { /*<<div> <Feedback /> </div>*/}
      <div> <Referenceclient /> </div>
        <div> <Footer /> </div>
    
    </motion.div>
  )
}
