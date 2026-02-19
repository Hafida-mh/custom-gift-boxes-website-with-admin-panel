import React from 'react'
import axios from 'axios'
import '../product/Product.css'
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Papa from 'papaparse'
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Cookies from 'js-cookie';
import Dropdown from 'react-bootstrap/Dropdown';
import Allproduct from './Allproduct';
import Category from '../category/Category';
import BestSeller from '../bestseller/BestSeller';
import Home from '../home/Home';
import Overlay from 'react-bootstrap/Overlay';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Navalert from '../navalert/Navalert';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Spinner from 'react-bootstrap/Spinner';

export default function Product(props) {
    const [allProducts, setAllProducts] = useState();
    const [categories, setAllCategories] = useState();
    const [name, setName] = useState();
    const [category, setCategory] = useState();
    const [capacity, setCapacity] = useState();
    const [price, setPrice] = useState();
    const [text, setText] = useState();
    const [disponivility, setDisponibility] = useState("Disponible");
    const [size, setSize] = useState();
    const [dimension, setDimension] = useState();
    const [weight, setWeight] = useState();
    const [color, setColor] = useState();
    const [qte, setQte] = useState();
    const [msg, setMsg] = useState("");
    const [file, setFile] = useState("");
    const [csvfile, setCSVFile] = useState("");
    const [show_modification, setShowModification] = useState(false);
    const [show_category, setShowCategory] = useState(false);
    const [show_bestsellproduct, setShowBestsellproduct] = useState(false);
    const [show_produit, setShowProduct] = useState(true);
    const [title_page, setTitlePage] = useState("Ajouter Produit")
    const [jsonFile, setJsonfile] = useState()
    const [showalert, setShowalert] = useState(false);
    const [showalerterror, setShowalerterror] = useState(false);
    const [alerte, setAlerte] = useState("");
    var commonConfig = { delimiter: "," };
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [products, setProducts] = useState([]);
    const [data, setData] = useState([]);
    const [datacat, setDataCat] = useState([]);
const [showspinner, setShowspinner] = useState(false)
    const convertCsvFile = () => {
        const inputfile = document.querySelector('#productfile').files[0];
        Papa.parse(
            inputfile,
            {
                ...commonConfig,
                header: true,
                complete: (result) => { setJsonfile(result.data); console.log(result.data) }
            }
        )
    }

    const addMultipleproducts = async () => {
        //  convertCsvFile()
        await axios.post(`${process.env.REACT_APP_LINK}/product/addMultiple`, jsonFile, {
            headers: {
                'Content-Type': "application/json"
            }
        }).then((res) => console.log(res))
    }

    const postproduct = () => {
        uploadImgProduct();
        const data = {
            id: uuidv4(),
            name: name,
            category: category,
            capacity: size,
            weight: weight,
            price: price,
            length: dimension,
            color: color,
            quantity: qte,
            description: text,
            availability: disponivility,
            img: file.name
        }
        if (name && category && price && qte && category !== "Selectionnez une catégorie") {
            try {
                axios.post(`${process.env.REACT_APP_LINK}/product/addproduct`, JSON.stringify(data), {
                    headers: {
                        'Content-Type': "application/json",
                        'x-access-token': Cookies.get("refreshtoken")
                    }
                }).then(res => {
                    setAlerte(res.data.message);
                    disapearAlert(res.data.message);
                    setName("");
                    setSize("");
                    setWeight("");
                    setPrice("");
                    setDimension("");
                    setColor("");
                    setQte("");
                    setText("");
                    setCategory("");
                    setFile("");
                    setAlerte("Produit ajouté avec succés !");
                    setShowalert(true)
                    setTimeout(() => {
                        setShowalert(false)
                        window.location.reload();
                    }, 2300)
                   
                })
            } catch (error) {
                console.log(error)
            }
        }
        else {
            setAlerte("Un des champs obligatoires est vide");
            setShowalerterror(true)
            setTimeout(() => {
                setShowalerterror(false)
            }, 2300)
        }
    }

    const getSelectValue = () => {
        var select = document.getElementById('select');
        setCategory(select.options[select.selectedIndex].text);
    }

    const uploadImgProduct = () => {
        const formdata = new FormData();
        formdata.append('image', file);
        axios.post(`${process.env.REACT_APP_LINK}/product/uploadimgProduct`, formdata, {}).then((res) => console.log(res));
    }

    const getAllProduct = (e) => {
        setData([])
        axios.get(`${process.env.REACT_APP_LINK}/product/get`).then(res => {
            setData(res.data.data)
            setProducts(res.data.data)
        })
    };

    const getAllCategories = () => {
        setDataCat([])
        axios.get(`${process.env.REACT_APP_LINK}/category/get`).then((res) => {
            setAllCategories([]);
            for (let i = 0; i <= ((res.data.data).length) - 1; i++) {
                const element = (res.data).data[i];
                datacat.push(element);
                setAllCategories(res.data.data)
            }
        })
    }

    const disapearAlert = (msg) => {
        if (msg === "Produit ajouté avec succés !") {
            setShowalert(true)
            setAlerte(msg)
            setTimeout(() => {
                setShowalert(false);
            }, 2300)
        }
        else {
            setShowalerterror(true)
            setTimeout(() => {
                setShowalerterror(false)
            }, 2300)
        }
    }

    // AI generative
  

    const postrequser =  async () => {
        const message =   await axios.post('https://api.openai.com/v1/chat/completions', JSON.stringify({
           model: "gpt-3.5-turbo",
               messages : [{role: "user", content: `redige un texte descriptif de 200 mots qui decrit les avantage du produit ${name} et pas de phrase incompletes`}],
               max_tokens : 250,
           }), {
               headers: {
                   "Content-Type": "application/json",
                   "Authorization": `Bearer ${process.env.OPENAI_KEY}`
               }
           })
           setText(message.data.choices[0].message.content)
           
       }

    useEffect(() => {
        getAllProduct();
        getAllCategories();
    }, [])

    useEffect(() => {
        setShowspinner(false)
    }, [text])

    return (
        <div className='Product-container'>
            <div className='navigation-bar'>
                <Home />
            </div>
            <div className='Product-container-content'>
                <div> <Navalert /> </div>
                <div>
                    <h1 className='main-title'>  <i className='bx bx-purchase-tag-alt' id="icon-dashbord"></i> {title_page} </h1>
                    <div className='dropdown-button'>
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic">
                                <i className="fa-solid fa-bars"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => {setShowProduct(false); setShowModification(true); setShowCategory(false); setTitlePage("Modifier produit") }}> Tous les produits </Dropdown.Item>
                                <Dropdown.Item onClick={() => { setShowBestsellproduct(false); setShowProduct(true); setShowModification(false); setShowCategory(false); setTitlePage("Ajouter produit(s)") }}> Ajouter produit(s) </Dropdown.Item>
                                <Dropdown.Item onClick={() => { setShowBestsellproduct(false); setShowProduct(false); setShowModification(false); setShowCategory(true); setTitlePage("Gérer les catégories") }}> Catégories produits </Dropdown.Item>
                                <Dropdown.Item onClick={() => { setShowBestsellproduct(true); setShowProduct(false); setShowModification(false); setShowCategory(false); setTitlePage("Produits les plus vendus") }}> Meilleures ventes </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className='product-header'>
                        {show_produit && <button onClick={() => handleShow()} className='add-product-button'>
                            Ajouter plusieurs produits </button>}
                    </div>
                </div>
                {show_produit &&
                    <div>
                        {msg && <div> {msg} </div>}
                        <div>
                            <form encType="multipart/form-data" method="post" onSubmit={(e) => e.preventDefault()} className='form-product'>
                                <div className='filds-form'>
                                    <input className='filds product' onChange={(e) => setName(e.target.value)} value={name} placeholder='Nom produit*' />
                                    <input className='filds product' onChange={(e) => setPrice(e.target.value)} value={price} placeholder='Prix produit*' />
                                </div>
                                <div className='filds-form'>     
                                    <input className='filds product' value={size} onChange={(e) => setSize(e.target.value)} placeholder='Taille produit' />
                                    <input className='filds product' value={dimension} onChange={(e) => setDimension(e.target.value)} placeholder='Dimensions produit' />
                                </div>
                                <div className='filds-form'>
                                <ReactQuill theme="snow" value={text} onChange={setText} className="react-quill-editor"/>

                                {/*    <textarea placeholder='Description produit' value={text} className='filds paragraphe' rows="4" cols="5" onChange={(e) => {
                                        setText(e.target.value);
                                    }}>
                                    </textarea> */}
                                    {name && <button className='ai-text-generative-button' onClick={()=> {postrequser(); setShowspinner(true)}}> 
                                    Gènèrer du texte avec AI 
                                    { showspinner && <Spinner animation="border" role="status" className='spinner-ai-generator'>
                                  <span className="visually-hidden">Loading...</span>
                                </Spinner>}
                                    </button>}
                                  
                                </div>
                                <div className='filds-form select-availability'>
                                    <label className='label'> Disponibilité(*) </label>
                                    <div className='filds-form availability'>
                                        <input  key="r-1" id="radio-button" name="1" type="radio" value="Disponible" onClick={(e) => setDisponibility(e.target.value)} defaultChecked />
                                        <span> Disponible</span>
                                    </div>
                                    <div className='filds-form availability'>
                                        <input key="r-2" id="radio-button" name="1"type="radio" value="Non disponible" onClick={(e) => setDisponibility(e.target.value)} />
                                        <span> Non disponible </span>
                                    </div>
                                    <div className='filds-form availability'>
                                        <input  key="r-3" id="radio-button" name="1" type="radio" value="Bientôt" onClick={(e) => setDisponibility(e.target.value)} />
                                        <span> Bientôt </span>
                                    </div>
                                </div>
                                <div className='filds-form details-product'>
                                    <input className='filds product' value={color} onChange={(e) => setColor(e.target.value)} placeholder='Couleur Produit' />
                                    <input className='filds product' value={weight} onChange={(e) => setWeight(e.target.value)} placeholder='Poids produit' />
                                </div>
                                <div className='filds-form details-product'>
                                    <input className='filds product' onChange={(e) => setQte(e.target.value)} value={qte} placeholder='Quantité produit*' />
                                    <select className='filds select-product' name="select" id="select" onChange={() => getSelectValue()}>
                                        <option key="1" value="default"> Selectionnez une catégorie  </option>
                                        {categories && categories.map((elm) => {
                                            return (
                                                <option key={elm.category} value={elm.category} onClick={(e) => { setCategory(elm.capacity); console.log(category) }}> {elm.category} </option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className='input-img-product img-file'>
                                    <label htmlFor="inputfile" className='label-input-file'>
                                        <div className='icon-download'> <i className='bx bx-cloud-download'></i> </div>
                                        <div className='file-name'> {file && file.name}</div>
                                        {!file && <div className='label-import-file-name'> Importer une image (H : 520px  W : 330px) </div>}
                                    </label>
                                    <input
                                        id="inputfile"
                                        type="file"
                                        accept="image/png, image/gif, image/jpeg, image/webp"
                                        name="image"
                                        onChange={(e) => {
                                            setFile(e.target.files[0]);
                                        }}
                                        className='add-file-input'
                                    />
                                </div>
                                {showalert && <div className='alert-container'> <i className="fa-regular fa-circle-check"></i>  {alerte} </div>}
                                {showalerterror && <div className='alert-container error'> <i className="fa-regular fa-circle-xmark"></i>  {alerte} </div>}
                                <button type='submit' className='submit-button product' onClick={() => postproduct()}> Valider </button>

                            </form>
                        </div>

                        <div className='modal-add-products'>
                            <Modal backdrop="static" show={show} onHide={handleClose} className='modal-ticket product-file' Style={{ "background": "red" }}>
                                <Modal.Header closeButton>
                                </Modal.Header>
                                <Modal.Body>
                                    <h4> Ajouter plusieurs produits </h4>
                                    <form onSubmit={(e) => e.preventDefault()}>
                                        <label for="productfile" className='label-input-file product-img-input'>
                                            <div className='icon-download'> <i className='bx bx-cloud-download'></i> </div>
                                            <div className='file-name'> {csvfile}</div>
                                            {!csvfile && <div className='label-import-file-name'> Importer un fichier CSV </div>}
                                        </label>
                                        <input id="productfile" type='file' onChange={(e) => { convertCsvFile(); setCSVFile(e.target.files[0].name) }} />
                                        <div>
                                            <button onClick={() => addMultipleproducts()} className='button-add-products'> Ajouter </button>
                                        </div>
                                    </form>
                                </Modal.Body>
                            </Modal>
                        </div>
                    </div>}

                {show_modification &&
                    <div>
                        <Allproduct products={products} allcategor={categories} function={() => props.function} />
                    </div>
                }

                {
                    show_category &&
                    <div>
                        <Category categories={categories} />
                    </div>
                }

                {
                    show_bestsellproduct &&
                    <div>
                        <BestSeller />
                    </div>
                }

            </div>
        </div>
    )
}
