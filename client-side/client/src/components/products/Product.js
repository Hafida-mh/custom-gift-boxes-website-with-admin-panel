import React from 'react'
import '../products/Product.css'
import axios from 'axios';
import Navbar from '../nav/Navbar';
import { useState, useEffect } from 'react'
import Footer from '../footer/Footer';
import Spinner from 'react-bootstrap/Spinner';
import Cart from '../cart/Cart';
import { useNavigate } from 'react-router-dom';
import Onattureicon from '../../images/onature-icone.png'
import Hypoallergenqueicon from '../../images/hypoallergenique-icone.png'
import Natuelicon from '../../images/icon-nnaturel.png'
import { v4 as uuidv4 } from 'uuid';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import Modal from 'react-bootstrap/Modal';

import Cookies from 'js-cookie';
export default function Product({ contenuHTML }) {
  const navigate = useNavigate();
  const [showspinner, setShowspinner] = useState(true)
  const [show, setShow] = useState(false)
  const { id } = useParams()
  const [product, setProduct] = useState()
  const [show_mdal, setShowmodal] = useState(false)
  const [allcartitem, setCartitem] = useState([])

  const getProductDetails = async () => {
    await axios.post(`${process.env.REACT_APP_LINK}/product/getinfo`, JSON.stringify({
      id: id
    }), {
      headers: {
        'Content-Type': "application/json"
      }
    }).then((res) => {
      setShowspinner(false)
      setProduct(res.data.data)
    })
  }

  const handleCartItem = (name, id, price, stock) => {
    if (!allcartitem.find((elm) => elm.id === id)) {
      allcartitem.push({ name: name, id: id, qte: 1, price: price, totalstock: stock });
      Cookies.set('cards', JSON.stringify(allcartitem))
    }
    else {
      allcartitem.push({ name: name, id: id, qte: 1, price: price })
    }
  }

  useEffect(() => {
    getProductDetails();
    if (Cookies.get('cards') !== undefined) {
      setCartitem(JSON.parse(Cookies.get('cards')))
    }
    else {
      setCartitem([])
    }
  }, [])

  return (
    <div className='product-container'>
      <div> <Navbar /> </div>
      <div> {show && <Cart state={show} handleClose={() => setShow(!show)} />}</div>
      {!showspinner && product && product.map((elm) => {
        return (
          <div className='product-detail-container'>
            <div className='product-img-container'>
              <img src={elm.img && `${process.env.REACT_APP_LINK}/productsimg/${elm.img}` || elm.urlimg} />
            </div>
            <div className='product-details'>
              <div className='category-box'>
                <img
                  src={Onattureicon}
                  className='img-icon-onature'
                />
                {elm.category}
              </div>
              <h1> {elm.name} </h1>
              <h2> {elm.price} Da </h2>
              <p className='description-product-paragraph'  dangerouslySetInnerHTML={{ __html:  elm.description }}/> 
              <div className='guaranty-section'> Garantie : 
                <img 
              src={Natuelicon}
              alt="hypoallergenique icone"
              className='hypollaergenique-img' /> 
                <img 
              src={Hypoallergenqueicon}
              alt="hypoallergenique icone"
              className='hypollaergenique-img' /> 
              </div>
              {elm.weight &&<div className='capacity-detail'> Poids : {elm.weight}g</div>}
              {elm.color &&<div className='capacity-detail'> Couleur : {elm.color} </div>}
              {elm.length &&<div className='capacity-detail'> Taille : {elm.length} </div>}
              <div className='all-buttons'>
                <button className='add-to-cart-button' onClick={() => {
                  handleCartItem(elm.name, elm.id, elm.price, elm.quantity); navigate(`/validatecommand/${uuidv4()}`); Cookies.set('total', elm.price);
                }}> Commander directement </button>
                <button className='add-to-cart-button' onClick={() => { setShow(true); handleCartItem(elm.name, elm.id, elm.price, elm.quantity) }}> Ajouter au panier</button>
                <button className='add-to-cart-button consulting' onClick={() => setShowmodal(true)}> Se renseigner </button>
              </div>
              <div className='politics-product'>
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header> Politique de paiement</Accordion.Header>
                    <Accordion.Body>
                      Le paiement se fait main à main lors de la livraison.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Politique de retour</Accordion.Header>
                    <Accordion.Body>
                      Si la commande reçue présente des défauts, vous pouvez la faire retourner au magasin en vous munissant du bon de commande
                      ou déposer le colis directement au niveau de Yalidine.
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>
            <div>
              <Modal
                show={show_mdal}
                onHide={() => setShowmodal(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">
                    Service client
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>
                    Pour vous renseigner sur cet aticle, vous pouvez contacter nos conseillés
                    en composant le numéro suivant : 0555 555 555
                  </p>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        )
      })}
      <div className='footer-product'> <Footer /></div>

    </div>
  )
}
