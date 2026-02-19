import React from 'react'
import { useEffect, useState } from 'react'
import '../stock-management/Stock.css'
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import ReactPaginate from 'react-paginate'
import Cookies from 'js-cookie';
import Home from '../home/Home.js'
import Navalert from '../navalert/Navalert';
export default function Stock(props) {
    const [nameproduct, setNameproduct] = useState("");
    const [selected_product, setSelectedProduct] = useState("")
    const [show, setShow] = useState(true);
    const [show_detail, setShowDetails] = useState(false);
    const [products, setProducts] = useState([]);
    const [data, setData] = useState([])
    const [dataa, setDataa] = useState([])
    const [new_qte, setNewQte] = useState()
    const [pageNumber, setPageNumber] = useState(0);
    const [showalert, setShowalert] = useState(false);
    const [showalerterror, setShowalerterror] = useState(false);
    const [alerte, setAlerte] = useState("");
    const stock_minimum = 20;
    const [product_to_update, setProductToUpdate] = useState([]);
    const usersPerPage = 5;
    const pagesVisited = pageNumber * usersPerPage;

    const handleClose = () => {
        setShowDetails(false)
        getAllProduct()
    }

    const handleShow = () => setShowDetails(true)

    const autocomplete = (e) => {
        const inputFiled = document.querySelector("#input-field");
        const list_field = document.querySelector("#suggestion");
        if (nameproduct) {
            // setShow(true)
            const result = products.filter((elm) => elm.name.toLowerCase().includes(nameproduct.toLowerCase()));
            setProducts(result)
            //  if (result) { setData(result) }
            //  else { setShow(false) }
        }
        else {
            setProducts(dataa)
            //setShow(props.allproducts)
        }
    }

    const upDateQte = (actual_qte, id) => {
        if (new_qte) {
            const total_qte = Number(actual_qte) + Number(new_qte);
            const id_product = id;
            axios.post(`${process.env.REACT_APP_LINK}/product/updateQte`, JSON.stringify({
                qte: total_qte,
                id: id_product
            }), {
                headers: {
                    'Content-Type': "application/json",
                    'x-access-token': Cookies.get("refreshtoken"),
                }
            }).then((res) => {
                setAlerte(res.data.message);
                disapearAlert(res.data.message);
            })
        }
        else {
            setAlerte("Veuillez insérer la nouvelle quantité");
            setShowalerterror(true)
            setTimeout(() => {
                setShowalerterror(false)
            }, 2300)
        }
    }

    const disapearAlert = (msg) => {
        if (msg === "Quantité mise à jour avec succés !") {
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

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }

    const pgeCnt = () => {
        if (products) {
            const pageCount = Math.ceil(((products).length) / usersPerPage);
            return pageCount
        }
    }

    const getAllProduct = (e) => {
        setData([])
        axios.get(`${process.env.REACT_APP_LINK}/product/get`).then(res => {
            // console.log(data)
            setProducts(res.data.data)
            setDataa(res.data.data)
        })
    };

    useEffect(() => {
        getAllProduct()
    }, [])

    useEffect(() => {
        autocomplete();
    }, [nameproduct])

    return (
        <div className='stock-container'>
            <div className='navigation-bar'>
                <Home />
            </div>
            <div className='stock-management-content'>
                <div> <Navalert /> </div>
                <h1 className='main-title stock'> <i className='bx bx-list-ol' id="icon-dashbord"></i>  Gérer votre stock </h1>
                <div className='search-bar-container'>
                    <form onSubmit={(e) => e.preventDefault()} className='form-search'>
                        <input className='serach-field' placeholder='entrer le nom du produit' type="text" id="input-field" value={nameproduct} onChange={(e) => { setNameproduct(e.target.value); }} />
                    </form>
                    {show_detail && products.map((elm) => {
                        return (
                            <div key={elm.id} className='result-search'>
                                <ul>
                                    <li  key={elm.name} className='list-item' onClick={() => { setSelectedProduct(elm); console.log(elm); handleShow() }}> {elm.name} </li>
                                </ul>
                            </div>
                        )
                    })
                    }
                    <div className='table-produit stock'>
                        <Table bordered hover className='stock-table'>
                            <thead>
                                <tr>
                                    <th className='table-header'> Produit </th>
                                    <th className='table-header'> Quantité </th>
                                </tr>
                            </thead>
                            <tbody>
                                {products && products.slice(pagesVisited, pagesVisited + usersPerPage).map((elm) => {
                                    return (
                                        <tr key={elm.id} onClick={() => { setSelectedProduct(elm); console.log(elm); handleShow() }}>
                                            <td> {elm.name} </td>
                                            <td> {Number(elm.quantity)} </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </div>
                    <div className='pagination-container'>
                        <ReactPaginate
                            className='pagination'
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            pageCount={pgeCnt()}
                            onPageChange={changePage}
                            containerClassName={"paginationBtns"}
                            previousLinkClassName={"prevButton"}
                            nextLinkClassName={"nxtButton"}
                        />
                    </div>
                    <div className='modal-stock'>
                        <Modal size="lg" show={show_detail} onHide={handleClose} className='modal-popup'>
                            <Modal.Header closeButton>
                                <Modal.Title className='title-updatestock'>
                                    <i className='bx bx-pencil' id="icon-dashbord"></i>
                                    Modifier quantité
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selected_product && <div>  Produit : <span className='product-name'> <b> {selected_product.name} </b> </span> </div>}
                                <div>
                                    <form onSubmit={(e) => e.preventDefault()} className='form-email-delivery'>
                                        <label> Insérer la nouvelle quantité </label>
                                        <input className='filds' type='text' value={new_qte} onChange={(e) => setNewQte(e.target.value)} />
                                        {showalert && <div className='alert-container'> <i className="fa-regular fa-circle-check"></i>  {alerte} </div>}
                                        {showalerterror && <div className='alert-container error'> <i className="fa-regular fa-circle-xmark"></i>  {alerte} </div>}
                                        <button className='update-stock-button' onClick={() => upDateQte(selected_product.quantity, selected_product.id)}> Mettre à jour </button>
                                    </form>
                                </div>
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    )
}
