import React from 'react'
import '../shop/Shop.css'
import Navbar from '../nav/Navbar'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios'
import Modal from 'react-bootstrap/Modal';
import Cookies from 'js-cookie';
import ReactPaginate from 'react-paginate'
import Footer from "../footer/Footer"
import Dropdown from 'react-bootstrap/Dropdown';
import Motifshop from '../../images/motif-shop-maboxalgerie.png'
export default function Shop(props) {
    const [showspinner, setShowspinner] = useState(true);
    const [showcategorybar, setShowcategorybar] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 16;
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
    const navigate = useNavigate();
    const [products, setProducts] = useState();
    const [user, setUser] = useState({
        email: "mechkour.hafida16@gmail.com",
        tel: "0559567898"
    })
    const [items, setItems] = useState([]);
    const [data, setData] = useState([])
    const [allbestseller, setAllbestseller] = useState();
    const [alert, setAlert] = useState(false);
    const [allQte, setAllqte] = useState([])
    const [email, setEmail] = useState();
    const [tel, setTel] = useState();
    let [total, setTotal] = useState(0);
    let [cards, setCards] = useState([]);
    const [purchase, setPurchase] = useState([])
    const [show, setShow] = useState(false);
    const [show_form, setShowForm] = useState(false);
    const [total_items, setTotalItem] = useState(0);
    const [t, setT] = useState(false)
    let [showbestsell, setShowbestsell] = useState(false)
    const [datacat, setDataCat] = useState([]);
    const [categories, setAllCategories] = useState();

    const getAllproducts = () => {
        axios.get(`${process.env.REACT_APP_LINK}/product/get`).then((res) => {
            setShowspinner(false);
            setProducts(res.data.data.reverse().filter((product)=> product.category != "Box speciale"));
            setData(res.data.data);
        })
    }

    const getallbestseller = () => {
        axios.get(`${process.env.REACT_APP_LINK}/bestseller/getAllProuct`).then(res => {
            setAllbestseller(res.data.data)
        })
    }

    const handleClose = () => {
        setShow(false);
    }

    const getAllCategories = () => {
        setDataCat([])
        setAllCategories([]);
        axios.get(`${process.env.REACT_APP_LINK}/category/get`).then((res) => {

            for (let i = 0; i <= ((res.data.data).length) - 1; i++) {
                const element = (res.data).data[i];
                datacat.push(element);
                setAllCategories(res.data.data)
            }
        })
    }

    const calculateTotal = (card) => {
        if (card.length > 0) {
            let sum = 0;
            card.forEach((elm) => {
                sum = sum + elm.item.price * elm.qte;
                console.log(elm.qte)
                setTotal(sum)
            })
        }
        else {
            setTotal(0)
        }
    }

    const handleCart = (nameitem) => {
        items.push(nameitem);
        console.log(items)
        axios.post(`${process.env.REACT_APP_LINK}/cart/add`, JSON.stringify({
            id: uuidv4(),
            email: user.email,
            telephone: user.tel,
            cart: JSON.stringify(items)
        }), {
            headers: {
                'Content-Type': "application/json"
            }
        })
    }

    const handleQtePlus = (ide) => {
        const data = cards.map((elm) => {
            if (elm.item.id == ide) {
                return { ...elm, qte: elm.qte + 1 }
            }
            return elm
        })
        setCards(data)
        Cookies.set('cards', JSON.stringify(data));
    }

    const handlefilteringproducts = (category) => {
        setData(data.filter((elm) => elm.category == category));
    }

    useEffect(() => {
        getAllproducts();
        getAllCategories();
        pgeCnt();
        getallbestseller();

        if (window.innerWidth <= 992) {
            setShowcategorybar(true)
        }
    }, [])

    useEffect(() => {
        calculateTotal(cards);
    }, [cards, show])

    return (
        <div className='Shop-container'>
            <div> <Navbar items={total_items} /*action={showCart} */ /> </div>
            <img
                src={Motifshop}
                className="motif-shop"
                alt="motif shop page"
            />
            <div> <h1> Shop  </h1></div>
            <div className='filter-buttons-container'>
                <div className='filter-buttons'>
                    <div className='filter-buttons-innercontent'>

                        {!showcategorybar && categories && categories.filter((elm)=> elm.category != "Box speciale").map((elm) => {
                            return (
                                <button className='button-filter-category' onClick={() => { setShowbestsell(false); setProducts(data.filter((elmt) => elmt.category == elm.category)); }}>
                                    <img src={`${process.env.REACT_APP_LINK}/uploads/${elm.photo}`} alt="icon shop" className='iconshopcategory' />
                                    {elm.category}
                                </button>
                            )
                        })}

                        {
                            showcategorybar && <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic" className='dropdown-category-shop'>
                                Catégories
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {
                                        categories && categories.map((elm) => {
                                            return (
                                                <Dropdown.Item onClick={() => { setShowbestsell(false); setProducts(data.filter((elmt) => elmt.category == elm.category)); }}> {elm.category} </Dropdown.Item>
                                            )
                                        })}
                                </Dropdown.Menu>
                            </Dropdown>
                        }

                    </div>
                </div>
            </div>
            <div className='cards-container'>

                <div className='cards-wrap'>
                    {showspinner && <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>}
                    {!showspinner && !showbestsell && products && products.sort().reverse().filter((elm) => elm.availability == "Disponible" || elm.availability == "Bientôt").slice(pagesVisited, pagesVisited + usersPerPage).map((elm) => {
                        return (
                            <div className='cards'>
                                <div className='cards-img'>
                                    <img
                                        src={elm.img && `${process.env.REACT_APP_LINK}/productsimg/${elm.img}` || elm.urlimg}
                                        alt={elm.img} />
                                </div>
                                <div className='availability-product'> {elm.availability} </div>
                                <h5 className='product-name-shop-card'> {elm.name} </h5>
                                <div className='price-product'> {elm.price} DA</div>
                                <div className='size-product'> {elm.capacity}</div>
                                <div> <button className="order-button" onClick={() => { navigate(`/product/${elm.id}`) }}> Commander </button> </div>
                            </div>
                        )
                    })}
                    {showbestsell && allbestseller && allbestseller.slice(pagesVisited, pagesVisited + usersPerPage).map((elm) => {
                        return (
                            <div className='cards'>
                                <div className='cards-img'>
                                    <img
                                        src={elm.filename && `${process.env.REACT_APP_LINK}/productsimg/${elm.filename}` || elm.urlimg}
                                        alt={elm.filename} />
                                </div>
                                <div className='price-product'> {elm.productprice} DA</div>

                                <div> <button className="order-button" onClick={() => { navigate(`/product/${elm.id}`) }}> Commander </button> </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='pagination-container'>
                <ReactPaginate
                    className='pagination'
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pgeCnt()}
                    onPageChange={changePage}
                    containerClassName={"paginationBtns"}
                    previousLinkClassName={"precedent"}
                    nextLinkClassName={"suivant"}
                />
            </div>
            <div className='footer-shop'>
                <Footer />
            </div>
        </div>
    )
} 
