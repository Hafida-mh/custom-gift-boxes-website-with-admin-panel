import React from 'react'
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Style from '../cart/Cart.css'
export default function Cart(props) {
  const [allcommands, setCommand] = useState([]);
  const navigate = useNavigate();
  let [sum, setSum] = useState();
  let [itemdeleted, setItemdeleted] = useState(false);
  let [allitemdeleted, setallItemdeleted] = useState([]);

  useEffect(() => {
    //  console.log([...new Set(JSON.parse(Cookies.get("cards")))])
    if(Cookies.get("cards") !== undefined) {
      setCommand(JSON.parse(Cookies.get("cards")));
      sumPrice();
    }
  }, [])

  useEffect(() => {
    sumPrice();
  }, [allcommands])

  const handleQteitem = (name_product, value) => {
    allcommands.map((elm) => {
      if (elm.name == name_product) {
        allcommands[allcommands.indexOf(elm)].qte = value;
      }
    })
    Cookies.set('cards', JSON.stringify(allcommands));
    sumPrice();
  }

  const sumPrice = () => {
    let s = 0;
    if(allcommands.length === 0) {
      setSum(0);
      Cookies.set('total', JSON.stringify(s));
    }
    else {
      allcommands.map((elm) => {
        console.log(typeof parseFloat(elm.price))
        s = s + parseFloat((elm.price).split(" ").join("")) * parseInt(elm.qte);
  
        Cookies.set('total', JSON.stringify(s));
      })
      setSum(Cookies.get('total'))
    }
  }

  const deleteItemFromCart = (name) => {
    const position = allcommands.findIndex((elm) => elm.name === name);
    if (position != -1) {
      allcommands.splice(position, 1);
      Cookies.set("cards", JSON.stringify(allcommands))
      setItemdeleted(!itemdeleted)
    }
  }

  useEffect(()=> {
    if(Cookies.get("cards") !== undefined) {
      setCommand(JSON.parse(Cookies.get("cards")));
      sumPrice()
    }
   
  },[itemdeleted])
  return (
    <div>
      <Modal show={props.state} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Panier</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!allcommands && <div> Aucun article selectionné </div>}
          {
            allcommands && allcommands.map((elm) => {
              return (
                <div className='command-item'>
                  <div> {elm.name} </div>
                  <div>
                    <form onSubmit={(e) => e.preventDefault()}>
                      <input className='input-qte' onChange={(e) => { handleQteitem(elm.name, e.target.value) }} placeholder={elm.qte} />
                    </form>
                  </div>
                  <button className='delete-button-cart' onClick={() => { deleteItemFromCart(elm.name)}}> x </button>
                </div>
              )
            })
          }
      
          <div className='total-cart'> Total :  {sum} Da </div>
          <button className="validate-command-button" onClick={() => { navigate(`/validatecommand/${uuidv4()}`) }}> Valider commande </button>
        </Modal.Body>
      </Modal></div>
  )
}
