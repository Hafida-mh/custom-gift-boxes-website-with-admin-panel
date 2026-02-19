import React from 'react'
import '../cart/Cart.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import Table from 'react-bootstrap/Table';
import Cookies from 'js-cookie';
import Navalert from '../navalert/Navalert'
import Home from '../home/Home'
export default function Cart(props) {
    const [data, setData] = useState([]);
    const [cart, setCart] = useState([]);
    const [datacat, setDataCat] = useState([]);
    const [categories, setCategories] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [deleted, setDeleted] = useState(false);
    const usersPerPage = 4;
    const pagesVisited = pageNumber * usersPerPage;
    const pgeCnt = () => {
        if (cart) {
            const pageCount = Math.ceil(((cart).length) / usersPerPage);
            return pageCount
        }
    }
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }
    // DELETE COMMAND FROM DATABASE
    const deletecart = (param) => {
        deleteCartFromScreen(param);
        deleteCart(param);
    }

    const deleteCart = (id) => {
        setDeleted(!deleted)
        axios.post(`${process.env.REACT_APP_LINK}/cart/delete`, JSON.stringify({
            id: id
        }), {
            headers: {
                'Content-Type': "application/json"
            }
        })
    }

    // DELETE COMMAND FROM DATABASE
    const deleteCartFromScreen = (id) => {
        console.log(id)
        var position = cart.findIndex((elm) => elm.id === id);
        if (position != -1) {
            cart.splice(position, 1);
        }
    }

    const getAllCart = () => {
        setData([]);
        axios.get(`${process.env.REACT_APP_LINK}/cart/get`, {
            headers: {
                'x-access-token': Cookies.get("refreshtoken"),
            }
        }).then((res) => {
            for (let i = 0; i <= ((res.data.data).length) - 1; i++) {
                const element = (res.data).data[i];
                data.push(element);
            }
            setCart(data);
        })
    }

    const getAllCategories = () => {
        setDataCat([])
        axios.get(`${process.env.REACT_APP_LINK}/category/get`).then((res) => {
            setCategories([]);
            for (let i = 0; i <= ((res.data.data).length) - 1; i++) {
                const element = (res.data).data[i];
                datacat.push(element);
            }
            setCategories(datacat)
        })
    }

    useEffect(() => {
        getAllCart();
        getAllCategories()
        pgeCnt();
    }, []);

    return (
        <div className='cart-container'>
             <div className='navigation-bar'>
                <Home />
            </div>
            <div className='cart-content'>
            <div> <Navalert /> </div>
            <div>
                <h2 className='title-cart-container'> Tous les paniers </h2>
            </div>
            <div className='table-commands'>
                <Table bordered hover className='table-cart'>
                    <thead>
                        <tr>
                            <th className='table-header'> Date </th>
                            <th className='table-header'> Email </th>
                            <th className='table-header'> Téléphone </th>
                            <th className='table-header'> liste </th>
                            <th className='table-header'> Action </th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart && cart.slice(pagesVisited, pagesVisited + usersPerPage).map((elm) => {
                            return (
                                <tr>
                                    <td className='date-td'> {elm.date} </td>
                                    <td> {elm.email} </td>
                                    <td> 0{elm.tel} </td>
                                    <td>
                                        {
                                            elm.cart && JSON.parse(elm.cart).map((list) => {
                                                return (
                                                    <button className='cart-list-item'> {list} </button>
                                                )
                                            })
                                        }
                                    </td>
                                    <td>
                                        <button onClick={() => { deletecart(elm.id) }} className='trush-button'>
                                            <i class="fa-regular fa-trash-can"></i>
                                        </button>
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
            </div>
        </div>
    )
}
