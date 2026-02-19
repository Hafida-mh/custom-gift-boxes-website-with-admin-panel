import React from 'react'
import Productchoicestyle from '../box/Boxchoiceproduct.css'
import { useNavigate} from 'react-router-dom';
import Navbar from '../nav/Navbar';
import axios, { all } from 'axios'
import { useState, useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Cookies from 'js-cookie';
import Deleteicon from '../../images/delete-icon.png'
import Alert from 'react-bootstrap/Alert';
import Footer from '../footer/Footer'
import Popupboxcommand from './Popupboxcommand';
import { v4 as uuidv4 } from 'uuid';
import Motifboxpage from '../../images/motif-workshop.png'

export default function Boxchoiceproduct() {
    const navigate = useNavigate();

    const [key, SetKey] = useState("")
    const [productbox, setProductbox] = useState([]);
    const [allselectedboxs, setAllselectedboxs] = useState([]);
    let [allproducts, setAllproducts] = useState([]);
    const [allcommandboxes, setAllcommandboxes] = useState([]);
    const [total_products, setTotalproducts] = useState(0);
    const [showalert, setShowalert] = useState(false);
    const [totalpricebox, setTotalpricebox] = useState(0);
    const [showpop, setShowpopup] = useState(false);
    let [sum, setSum] = useState(0)

    const calcultotalsumproduct = (elm_price) => {
       sum = sum + Number(elm_price)
       setSum(sum)
        Cookies.set('totalbuy', JSON.stringify(sum))
        console.log(sum)
    }

    const calcultotalminusproduct = (elm_price) => {
        sum = sum - Number(elm_price)
        setSum(sum)
         Cookies.set('totalbuy', JSON.stringify(sum))
         console.log(sum)
     }

    const getAllproducts = () => {
        axios.get(`${process.env.REACT_APP_LINK}/product/get`).then((res) => {
            setProductbox(res.data.data);
        })
    }

    const selectproductperbox = (elm_id, product_name, max_length, box_name, price_product, qte_box) => {
        //update allproducts

        if (allcommandboxes.length != 0 && allproducts.length === 0) {
            allcommandboxes.map((elm) => {
                if (elm.boxname === box_name) {
                    allproducts = elm.products
                }
            })
        }
       
        const card = document.getElementById(`${box_name + elm_id}`);
        const deletebutton = document.getElementById(`${'button' + box_name + elm_id}`);
        const checkbutton = document.getElementById(`${"check" + elm_id + box_name}`)

        if (allproducts.length === undefined || allproducts.length < max_length || allproducts.filter((elm) => elm === product_name) === undefined) {
            allproducts.push(product_name);
            calcultotalsumproduct(price_product)
            updateproductbox(box_name, allproducts, price_product, qte_box);
            // calcultotal()
            card.classList.replace("card-product-information", "boxe-card-selected");
            deletebutton.classList.replace("button-nnon-selected", "button-selected");
            checkbutton.classList.replace("check-icon", "check-icon-selected-button");
        }
    }

    const updateproductbox = (box_name, products, price_product, qte_box) => {
        const t = JSON.parse(Cookies.get("totalproducts")) + Number(price_product)
        Cookies.set("totalproducts", JSON.stringify(t))

        //   console.log(allcommandboxes.filter((elm) => elm.boxname === box_name))
        if (allcommandboxes.length === 0 || (allcommandboxes.filter((elm) => elm.boxname === box_name)).length === 0) {
            allcommandboxes.push({ boxname: box_name, products: products, total: t, qtebox: qte_box })
        }
        else {
            allcommandboxes.map((elm) => {
                if (elm.boxname === box_name) {
                    elm.products = products
                    elm.total = t
                }
            })
        }
    }

    const deleteproductfrombox = (elm_id, box_name, product_name, product_price) => {
        const card = document.getElementById(`${box_name + elm_id}`);
        const deletebutton = document.getElementById(`${'button' + box_name + elm_id}`);
        const checkbutton = document.getElementById(`${"check" + elm_id + box_name}`)
        allcommandboxes.map((elm) => {
            if (elm.boxname === box_name) {
                elm.products = elm.products.filter((product) => product != product_name)
                setAllproducts(allproducts.filter((name) => name != product_name))
            }
            calcultotalminusproduct(product_price)
            card.classList.replace("boxe-card-selected", "card-product-information");
            deletebutton.classList.replace("button-selected", "button-nnon-selected");
            checkbutton.classList.replace("check-icon-selected-button", "check-icon");
        })
    }

    const updateprice = (price_product) => {
        setSum(0)
        setTotalproducts(totalpricebox + Number(price_product))
    }

    useEffect(() => {
        getAllproducts()
      //  calcultotal()
        setAllselectedboxs(JSON.parse(Cookies.get("boxcommand")))
        Cookies.set("totalproducts", JSON.stringify(0))
        setSum(Number(Cookies.get('totalbox')))
    }, [])

    useEffect(() => {
        setTotalpricebox(sum)
    }, [sum])

    return (
        <div className='Box-choice-product'>
            <div>
                <Navbar />
            </div>
            <img src={Motifboxpage} 
            alt="box page motif" 
            className='motif-box-page'/>
            <h1 className='main-title-box-product-choice title-box'>
                 Box
            </h1>
            <h2 className='main-title-box-product-choice small-step-title'>
                <b> 2. Choix des produits
                </b>
            </h2>
            <div className='tabs-container'>
                <div className='tab-content'>

                    <Tabs
                        defaultActiveKey={ (allselectedboxs  && JSON.parse(Cookies.get("boxcommand")))[0].boxname}
                        id="uncontrolled-tab-example"
                        //   activeKey={(JSON.parse(Cookies.get("boxcommand")))[0].boxname}
                        className="tabs-container"
                        onClick={() => {
                            //  saveselectedproducts()
                            setAllproducts([]);
                            Cookies.set("totalproducts", JSON.stringify(0))
                        }}
                    >

                        {allselectedboxs && allselectedboxs.map((elm) => {
                            return (
                                <Tab eventKey={elm.boxname}
                                    title={elm.boxname}
                                    className="allproduct-container"
                                >
                                    <div className='alert-notification'> Nombre maximal de produits pour cette box est : {elm.max}</div>

                                    {productbox && productbox.map((product) => {
                                        return (
                                            <div className='card-product-information disabled' id={elm.boxname + product.id}
                                            /*onClick={() => { selectproductperbox(product.id, product.name, elm.max, elm.boxname, product.price); }}*/>
                                                <button className="check-icon" id={`${"check" + product.id + elm.boxname}`}
                                                    onClick={() => { selectproductperbox(product.id, product.name, elm.max, elm.boxname, product.price, elm.qte);}}>
                                                </button>
                                                <div className='img-box-product'>
                                                    <img
                                                        src={product.img && `${process.env.REACT_APP_LINK}/productsimg/${product.img}`}
                                                        alt="image product" />
                                                </div>
                                                <h4 className='name-product-box'> <b>  {product.name} </b> </h4>
                                                <h4 className='price-product-box'> {product.price} Da </h4>
                                                <button
                                                    id={`${'button' + elm.boxname + product.id}`} className='button-nnon-selected'
                                                    onClick={() => {
                                                        deleteproductfrombox(product.id, elm.boxname, product.name, product.price);
                                                    }}>
                                                    <img src={Deleteicon} /> </button>
                                            </div>
                                        )
                                    })}

                                </Tab>
                            )
                        })}
                    </Tabs>
                </div>
                {showalert && <Alert key="warning" variant="warning"> Veuillez sélectionner des produits ! </Alert>}
                <div className='buttons-follow-questions'>
                    <button className='action-button previous' onClick={()=> navigate(`/box-personnalise/${uuidv4()}`)}> Précédent </button>
                    <button className='action-button'
                        onClick={() => {
                            if (allcommandboxes.length === 0) {
                                setShowalert(true);
                                setTimeout(() => {
                                    setShowalert(false);
                                }, "1400");
                            }
                            else {
                                Cookies.set("allcommandbox", JSON.stringify(allcommandboxes))
                                navigate(`/messagebox/${uuidv4()}`)
                            }
                        }}> Suivant </button>
                </div>
            </div>
            <div className='pop-up-price'>
                <Popupboxcommand price={totalpricebox} message="Il n'y a rien de mieux que des produits naturels pour faire plaisir à ceux que vous aimez ❤"/>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}
