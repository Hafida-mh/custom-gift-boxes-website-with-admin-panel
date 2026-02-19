import React from 'react'
import '../home/Home.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';
import Product from '../product/Product';
import Slide from '../slide/Slide'
import { useEffect, useState } from 'react'
import 'boxicons'
import Accordion from 'react-bootstrap/Accordion';
import DeleteSlide from '../slide/DeleteSlide';
import BestSeller from '../bestseller/BestSeller';
import Command from '../command/Command';
import PresentationHome from '../Presentation/PresentationHome';
import Advantage from '../advantage/Advantage';
import Category from '../category/Category';
import Cart from '../cart/Cart';
import axios from 'axios';
import Allproduct from '../product/Allproduct';
import Emailing from '../emailing/Emailing';
import Stock from '../stock-management/Stock';
import Bestsell from '../charts/Bestsell';
import Shipping from '../shipping/Shipping';
import Auth from '../auth/Auth';
import Cookies from 'js-cookie';
import Password from '../password/Password';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Home() {

    const navigate = useNavigate()
    let date = new Date();
    let hours = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    let fulldate = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
    const [component, setComponent] = useState("start");
    const [data, setData] = useState([]);
    const [datacat, setDataCat] = useState([]);
    const [slides, setSlides] = useState([]);
    const [commands, setCommands] = useState([]);
    const [trigger, setTrigger] = useState(true);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const t = Cookies.get("token")

    const checkAcessibility = () => {
        axios.get(`${process.env.REACT_APP_LINK}/auth/checkroute`, {
            headers: {
                'x-access-token': Cookies.get("refreshtoken"),
            }
        }).then((res) => {
            if (res.data.message !== "Connected") {
                navigate("/")
            }
        })
    }

    const controllAdminMenu = () => {
        const navcontainer = document.querySelector('.Home');
        const container = document.querySelector('.nav-admin');
        const items = document.querySelectorAll('.item');
        const navtitle = document.querySelector('.title-nav-admin');

        if (window.innerWidth >= 652) {
            container.classList.toggle('bg-red');
            items.forEach((item) => item.classList.toggle('display-item'))
            navcontainer.classList.toggle('navlargevr');
            navtitle.classList.toggle('navtitle-largesc');
        }
        else {
            container.classList.toggle('bg-red-smallscreen');
            items.forEach((item) => item.classList.toggle('display-item-smallscreen'))
            navcontainer.classList.toggle('navevr-smallscreen');
            navtitle.classList.toggle('navtitle-smallesc');
        }
    }

    useEffect(() => {
        checkAcessibility()
    }, [])
    return (
        <div className='Home'>
            <div className='nav-admin'>
                <div className='title-nav-admin'>
                    <div className='icon-grid-container'>
                        <i onClick={() => { controllAdminMenu() }} id="arrow-icon" className='bx bx-bar-chart bx-rotate-270'></i>
                    </div>
                </div>
                <div className='item-list'>
                    <div className='abonnes item'>
                        <Link className='link-item' to="/landing">
                            <i className='bx bx-chalkboard' id="icon-dashbord"></i>
                            Tableau de bord
                        </Link>
                    </div>
                    <div className='item'>
                        <Link className='link-item' to="/products">
                            <i className='bx bx-purchase-tag-alt' id="icon-dashbord"></i>
                            Produits
                        </Link>
                    </div>
                    <div className='item'>
                        <Link className='link-item' to="/box">
                            <i className='bx bx-box' id="icon-dashbord"></i> Box  </Link>
                    </div>
                    <div className='item'>
                        <Link className='link-item' to="/command">
                        <i class='bx bx-spreadsheet' id="icon-dashbord"></i> Commandes produit </Link>
                    </div>
                    <div className='item'>
                        <Link className='link-item' to="/commande-box">
                        <i class='bx bx-gift'  id="icon-dashbord"></i> Commandes Box  </Link>
                    </div>
                    <div className='item'>
                        <Link className='link-item' to="/home/slide">
                            <i className='bx bx-home-alt-2' id="icon-dashbord"></i> Page accueil
                        </Link>
                    </div>
                    <div className='item'>
                        <Link className='link-item' to="/workshop">
                            <i className='bx bx-home-alt-2' id="icon-dashbord"></i> Workshop
                        </Link>
                    </div>
                    <div className='item'>
                        <Link className='link-item' to="/setting/login"> <i className='bx bx-fingerprint' id="icon-dashbord"></i>
                            Authentification
                        </Link>
                    </div>
                    <div className='item'>
                        <Link className='link-item' to="/stock/management">
                            <i className='bx bx-list-ol' id="icon-dashbord"></i>
                            Gestion de stock
                        </Link>
                    </div>
                    <div className='item'>
                        <Link className='link-item' to="/devis">
                            <i className='bx bx-message-alt-dots' id="icon-dashbord"></i>
                            Demande de devis
                        </Link>
                    </div> 
                    <div className='item'> <Link className='link-item' to="/statistique"> <i className='bx bx-bar-chart-alt-2' id="icon-dashbord"></i>
                        Statistiques
                    </Link>
                    </div>
                    <div className='item'>
                        <Link className='link-item' to="/search/delivery">
                            <i className='bx bx-car' id="icon-dashbord"></i>
                            Livraison
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
