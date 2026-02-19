import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import '../shipping/Shipping.css'
import Home from '../home/Home'
import Navalert from '../navalert/Navalert'
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate'
import Modal from 'react-bootstrap/Modal';

export default function Shipping() {
    const [message, setMessage] = useState("");
    const [subject, setSubject] = useState();
    const [newprice, setNewprice] = useState();
    const [selected_wilaya, setSelectedwialay] = useState({
        name: "",
        price: ""
    })
    const [wilayas, setWilayas] = useState([]);
    const [show_detail, setShowdetails] = useState(false);
    const [datas, setDatas] = useState([]);
    const [showalert, setShowalert] = useState(false);
    const [showalerterror, setShowalerterror] = useState(false);
    const [alerte, setAlerte] = useState("");
    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 3;
    const pagesVisited = pageNumber * usersPerPage;

    const pgeCnt = () => {
        if (wilayas) {
            const pageCount = Math.ceil(((wilayas).length) / usersPerPage);
            return pageCount
        }
    }

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }

    const handleClose = () => {
        setShowdetails(false);
        getallwilayas();
    }

    const getallwilayas = () => {
        axios.get(`${process.env.REACT_APP_LINK}/shipping/get`).then((res) => {
            setWilayas(res.data.data)
        })
    }

    const updateprice = (name, price) => {
        axios.post(`${process.env.REACT_APP_LINK}/shipping/updateprice`, JSON.stringify({
            price: price,
            name: name
        }), {
            headers: {
                'Content-Type': "application/json"
            }
        }).then((res) => 
        {
            if(res.data.message == "Prix mis à jour avec succés !"){
                setShowalert(true);
                setAlerte("Prix mis à jour avec succés !")
                setTimeout(()=> {
                    setShowalert(false);
                }, 1800)
            }
            else {
                setShowalerterror(true)
                setAlerte("Une erreur s'est produite lors de la mise à jour du prix !")
                setTimeout(()=> {
                    setShowalerterror(false);
                },1800)
            }
        })
    }

    useEffect(() => {
        getallwilayas();
        pgeCnt();
    }, [])

    return (
        <div className='shipping-container'>
            <div className='navigation-bar'>
                <Home />
            </div>
            <div className='shipping-content'>
                <div> <Navalert /> </div>
                <h2 className='shipping-title'> 
                <i className='bx bx-car' id="icon-dashbord"></i> 
                Tarifs de livraison 
                </h2>
                <div className='shipping-form-container'>
                    <Table bordered hover className='table-show-allproduct'>
                        <thead>
                            <tr className='shipping-header-table'>
                                <th className='table-header'> Nom wilaya </th>
                                <th className='table-header'> Tarif livraison (Da) </th>
                                <th className='table-header'> Action </th>
                            </tr>
                        </thead>
                        <tbody>
                            {wilayas && wilayas.slice(pagesVisited, pagesVisited + usersPerPage).map((elm) => {
                                return (
                                    <tr key={elm.id}>
                                        <td> {elm.name} </td>
                                        <td> {elm.price} </td>
                                        <td>
                                            <button className="action-buttons" onClick={() => {selected_wilaya.name = elm.name; selected_wilaya.price = elm.price; setNewprice(elm.price); setShowdetails(true) }}> Modifier </button>
                                        </td>
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
                <div className='modal-shipping'>
                    <Modal size="lg" show={show_detail} onHide={handleClose} className='modal-popup'>
                        <Modal.Header closeButton>
                            <Modal.Title> Modifier quantité </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        {showalert && <div className='alert-container'> <i className="fa-regular fa-circle-check"></i>  {alerte} </div>}
                        {showalerterror && <div className='alert-container error'> <i className="fa-regular fa-circle-xmark"></i>  {alerte} </div>}
                            {selected_wilaya && <div>  Wilaya : <span className='product-name'> <b> {selected_wilaya.name} </b> </span> </div>}
                            <div>
                                <form onSubmit={(e) => e.preventDefault()} className='form-email-delivery'>
                                    <label> Insérer la nouvelle quantité </label>
                                    <input className='filds' type='text' value={newprice} onChange={(e) => setNewprice(e.target.value)} />
                                    <button className='update-stock-button' onClick={() => updateprice(selected_wilaya.name, newprice)}> Mettre à jour </button>
                                </form>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </div>
    )
}
