import React from 'react'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
import '../bestseller/BestSeller.css'
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate'

export default function BestSeller() {
    const [file, setFile] = useState("");
    const [allcategories, setAllcategories] = useState([]);
    const [categorybestsell, setAllcategorybestsell] = useState("");
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [show, setShow] = useState(false);
    const [showalert, setShowalert] = useState(false);
    const [showalerterror, setShowalerterror] = useState(false);
    const [alerte, setAlerte] = useState("");
    const [products, setProducts] = useState([]);
    const [data, setData] = useState([])
    const [msg, setMsg] = useState("");
    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 3;
    const pagesVisited = pageNumber * usersPerPage;

    const pgeCnt = () => {
        if (products) {
            const pageCount = Math.ceil(((products).length) / usersPerPage);
            return pageCount
        }
    }

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }

    const getAllproductts = () => {
        axios.get(`${process.env.REACT_APP_LINK}/product/get`).then((res) => {
            setProducts(res.data.data)
        })
    }

    const updatebestsellerstatus = (id, statut) => {
        axios.post(`${process.env.REACT_APP_LINK}/product/addtobestseller`, JSON.stringify({ id: id, statut: statut }), {
            headers: {
                'Content-Type': "application/json"
            }
        }).then((res) => {
            setShowalert(true);
            if (statut === 1) {
                setAlerte("Ajoué aux meuilleures ventes avec succés !");
                getAllproductts();
                setTimeout(() => {
                    setShowalert(false);
                }, 2300);
            }
            else {
                setShowalerterror(true);
                getAllproductts();
                setAlerte("Retiré des meuilleures ventes avec succés !");
                setTimeout(() => {
                    setShowalert(false);
                }, 2300);
            }
        })
    }

    useEffect(() => {
        // getAllcategories();
        getAllproductts();
        pgeCnt();
    }, [])

    return (
        <div className='best-seller'>

            {showalert && <div className='alert-container'> <i className="fa-regular fa-circle-check"></i>  {alerte} </div>}

            <div className='table-allproduct'>

                <Table bordered hover className='table-show-allproduct'>
                    <thead>
                        <tr>
                            <th className='table-header'> Nom produit </th>
                            <th className='table-header'> Action </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.slice(pagesVisited, pagesVisited + usersPerPage).map((elm) => {
                            return (
                                <tr>
                                    <td> {elm.name} {Boolean(parseInt(elm.bestseller)) && <i className='bx bxs-star'></i>}</td>
                                    <td>
                                        <button className="action-buttons" onClick={() => { updatebestsellerstatus(elm.id, 1) }}> Ajouter </button>
                                        <button className="action-buttons" onClick={() => { updatebestsellerstatus(elm.id, 0) }}> Retirer </button>
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
            <div className='check-allbest-sellers'>
                <h2> Meuilleures ventes du moment ! </h2>
                {products.filter((elm) => elm.bestseller === "1").map((elmt) => {
                    return (
                        <div className='cards-bestseller'>
                            <img src={`${process.env.REACT_APP_LINK}/productsimg/${elmt.img}`} />
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}
