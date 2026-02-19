import React from 'react'
import 'boxicons';
import Table from 'react-bootstrap/Table';
import '../landing-page/Landingpage.css'
import Navalert from '../navalert/Navalert';
import { useEffect, useState } from 'react';
import Home from '../home/Home';
import Cookies from 'js-cookie';
import ReactPaginate from 'react-paginate'
import axios from 'axios';
import ReactGA from 'react-ga';
import Alert from 'react-bootstrap/Alert';
ReactGA.initialize('G-S5KXHT0WMH');
export default function Landingpage() {
    const [allCommands, setAllcommands] = useState();
    const [allProducts, setAllproducts] = useState([]);
    const [productstopurchase, setProductsToPurchase] = useState([]);
    const [canceledCommand, setCanceledCommand] = useState();
    const [confirmedCommand, setConfirmedCommand] = useState();
    const [InholdCommand, setInholdCommand] = useState();
    const [totalCost, setTotalCost] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 3;
    const pagesVisited = pageNumber * usersPerPage;
    const pgeCnt = () => {
        if (productstopurchase) {
            const pageCount = Math.ceil(((productstopurchase).length) / usersPerPage);
            return pageCount
        }
    }

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }
    const [data, setData] = useState([]);
    let s = 0;
    const min_quantity = 20;

    const handleCommands = () => {
        axios.get(`${process.env.REACT_APP_LINK}/command/get-commend`, {
            headers: {
                'x-access-token': Cookies.get("refreshtoken"),
            }
        }).then((res) => {
            setData([])
            setAllcommands((res.data.data).length);
            setCanceledCommand(((res.data.data).filter((elm) => elm.canceled == 1 && elm.confirmed == 0)).length)
            setConfirmedCommand(((res.data.data).filter((elm) => elm.canceled == 0 && elm.confirmed == 1)).length)
            setInholdCommand(((res.data.data).filter((elm) => elm.canceled == 0 && elm.confirmed == 0)).length)
            res.data.data.map((elm) => {
                s = s + elm.total
            })
            setTotalCost(s)
        })
    }

    const handleProducts = () => {
        setData([])
        axios.get(`${process.env.REACT_APP_LINK}/product/get`).then(res => {

            // console.log(data)
            setProductsToPurchase(res.data.data.filter((elm) => elm.quantity <= min_quantity))
            setAllproducts(res.data.data.length)
        })
    }

    useEffect(() => {
        handleCommands();
        handleProducts();
        pgeCnt();
    }, [])

    //G-S5KXHT0WMH
    return (
        <div className='landing-page-container'>
            <div className='navigation-bar'>
                <Home />
            </div>
            <div className='landing-page-content'>
                <div> <Navalert /> </div>
                <div className='landing-page-title-container'>
                    <Alert className='alert-message' variant="info">
                        Remarque : Utilisez votre pc pour mieux exploiter votre espace admin.
                    </Alert>
                    <h2> Tableau de bord <span className='emoji-cup'> ☕ </span></h2>
                </div>

                <div className='global-statistiques-container'>
                    <div className='global-statistiques'>
                        <div className='box-stat total-products'>
                            <h3 className='stat-title'> Total produits </h3>
                            <p className='stat-number'> {allProducts} </p>
                        </div>
                        <div className='box-stat total-products'>
                            <h3 className='stat-title'> Total commandes </h3>
                            <p className='stat-number'> {allCommands} </p>
                        </div>
                        <div className='box-stat total-products'>
                            <h3 className='stat-title'> Total visites </h3>
                            <p className='stat-number'> 20</p>
                        </div>

                    </div>
                </div>

                <div className='performance'>
                    <div className='performance-container'>
                        <h4> <i className='bx bxs-hot' id="icon-dashbord"></i> Votre performance </h4>
                        <div className='stat-performance'>
                            <div className='box-stat cancel-order'>
                                <h3 className='stat-title'> Commandes annulées </h3>
                                <p className='stat-number'> {canceledCommand} </p>
                            </div>
                            <div className='box-stat validate-order'>
                                <h3 className='stat-title'> Commandes validées </h3>
                                <p className='stat-number'> {confirmedCommand} </p>
                            </div>
                            <div className='box-stat  new-order'>
                                <h3 className='stat-title'> Nouvelles commandes </h3>
                                <p className='stat-number'> {InholdCommand} </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='stockstatut-container'>

                    <div className='stockstatut-content'>
                        <div className='table-state-product'>
                            <h4> <i className='bx bx-task-x' id="icon-dashbord"></i> Bientôt en rupture</h4>
                            <Table hover className='table'>
                                <thead >
                                    <tr className='line-table' style={{ "width": "100px" }} >
                                        <th className='th-left' style={{ "width": "100px", "background": "#dee6f6" }}>Produits </th>
                                        <th className='th-right' style={{ "background": "#dee6f6" }}> Quantité </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productstopurchase && productstopurchase.slice(pagesVisited, pagesVisited + usersPerPage).map((elm) => {
                                        return (
                                            <tr key={elm.name}>
                                                <td className='td-left'> {elm.name}</td>
                                                <td className='td-right qte-left'> {elm.quantity} </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
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
                        </div>
                        <div className='box-stat income'>
                            <h3 className='stat-title'> Chiffre d'affaire </h3>
                            <p className='stat-number'> {totalCost} Da</p>
                        </div>
                    </div>
                </div>
                <div>
                </div>
                { /*<div> <Footer /> </div>*/}
            </div>
        </div>
    )
}
