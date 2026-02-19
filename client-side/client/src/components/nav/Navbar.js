import React, { useState, useEffect } from 'react'
import Style from '../nav/Navbar.css'
import axios from 'axios'
import Accordion from 'react-bootstrap/Accordion'
import { Link } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Logo from "../../images/logo-maboxalgerie.png"
import Cart from '../cart/Cart';
import Cookies from 'js-cookie';
export default function Navbar(props) {
    const [size_cart, setSizecart] = useState(0)
    const [show, setShow] = useState(false);
    const [icon, setIcon] = useState(false);
    const [responsive, setResponsive] = useState(false);
    const [arr, setArr] = useState();
    const categorie_arr = [];
    const [categorie, setCategorie] = useState([]);
    const [shop, setShop] = useState();
    const [show_cart, setShowcart] = useState(false);

    const changeIcon = () => {
        setIcon(!icon);
    }

    const showResponsiveNav = () => {
        setResponsive(!responsive);
    }

    const shopHover = () => {
        const shop = document.querySelector('.shop');
        const list = document.querySelectorAll('.item');
        const shop_container = document.querySelector('.Navbar');
        const shopcontent = document.querySelector('.shop-content');
        //const shoplist = document.querySelector('.shop-container');
        shop.addEventListener('mouseenter', () => {
            setShow(true);
        });
        /*
                shop.addEventListener('mouseout', () => {
                    
                    shop_container.addEventListener('mouseenter', () => {
                        setShow(true);
                        shop_container.addEventListener('mouseout', () => {
                            setShow(false);
                        })
                    })
                });
          */


        /*
        list.forEach((elm)=> elm.addEventListener('mouseout', () => {
            setShow(false);
        }));
        */

    }

    const getCategory = () => {
        axios.get(`${process.env.REACT_APP_LINK}/shopnav/getcategory`).then(res => {
            return (
                setArr(((res.data.data[0].sousCategorie).replace(/\[|\]/g, '').split(','))),
                //  console.log("this is response" + res.data.data[0].categorie),
                // GET CATEGORY IF CATEGORIE SIZE EQUAL 1
                setCategorie(res.data.data[0].categorie)
                //   console.log(arr[1]),
                // console.log(((res.data.data[0].sousCategorie).replace(/\[|\]/g,'').split(',')))
            )
        })
    }

    useEffect(() => {
        getCategory()
        //  console.log(categorie)

        if(Cookies.get('cards') !== undefined) {
            setSizecart(JSON.parse(Cookies.get('cards')).length)
        }
        else {
            setSizecart(0)
        }
    }, []);

    useEffect(() => {
        setShop(arr);
        categorie_arr.push(categorie)
        // console.log( categorie_arr);
    }, [arr]);

 

    //console.log( categorie_arr);
    return (
        <div className='Navbar'>
            <div className='navbar-content'>
                <div className='logo'>
                    <div>
                        <img src={Logo}
                            className='logo-img'
                            alt='logo freemind'
                        />
                    </div>
                </div>
              
                <div className='nav-item'>
                    <Link to="/" className='link-item'> <div className='item'> Accueil </div> </Link>
                    <Link to="/shop" className='link-item'> <div className='item shop'> Shop </div>  </Link>
                   <Link to="/box" className='link-item'> <div className='item shop'> Box </div>  </Link>
                    <Link to="/workshop" className='link-item'> <div className='item'> Workshop </div>  </Link>
                    <Link to="/contact" className='link-item'>  <div className='item'> Contact </div> </Link>
                </div>
                <div className='buttons'>
                    <div className='cart-button'>
                        <div onClick={() => setShowcart(true)}> <i class='bx bx-cart' ></i>  <Badge bg="warning"> {size_cart} </Badge></div>
                    </div>
                </div>
                <div className='burger-button' onClick={() => { showResponsiveNav() }}> <i class='bx bx-menu'></i> </div>
            </div>

            {responsive && <div className='navResponsive'>
                <div className='nav-responnsive-item'>
                    <div>
                        <Link to="/" className='link-item'> <div className='item'> Accueil </div> </Link>
                    </div>
                    <div className='shop-cntainer'>
                        <Link to="/shop" className='link-item'> <div className='item shop'> Shop </div>  </Link>
                    </div>
                    <div>
                        <Link to="/box"  className='link-item'>  <div className='item'>  Box  </div>  </Link>
                    </div>
                    <div>
                        <Link to="/workshop" className='link-item'>  <div className='item'>  Workshop  </div>  </Link>
                    </div>
                    <div>
                        <Link to="/contact" className='link-item'>  <div className='item'>  Corporate Gifts  </div>  </Link>
                    </div>
                </div>
                <div className='buttons-responsive'>
                    <div className='allbuttons'>
                        <div  onClick={() => setShowcart(true)}> <i class='bx bx-cart' ></i> </div>
                    </div>
                </div>
            </div>}
            {show_cart && <Cart state={show_cart} handleClose={() => setShowcart(!show_cart)}/> }
        </div>
    )
}
