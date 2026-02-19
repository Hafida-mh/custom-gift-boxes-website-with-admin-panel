import React from 'react'
import '../box/Allboxes.css'
import axios from 'axios';
import Cookies from 'js-cookie';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import ReactPaginate from 'react-paginate'

export default function Allboxes(props) {
    const [pageNumber, setPageNumber] = useState(0);
    const [boxdetail, setBoxdetail] = useState();
    const [file, setFile] = useState("");
    const usersPerPage = 5;
    const pagesVisited = pageNumber * usersPerPage;
    const [show, setShow] = useState(false);
    const [boxname, setBoxname] = useState("");
    const [allboxes, setAllboxes] = useState("");
    const [boxcolor, setBoxcolor] = useState([]);
    const [boxmaxnumber, setBoxmaxnumber] = useState("");
    const [pricebox, setPricebox] = useState("");
    const [idbox, setIdbox] = useState("");
    const [newcolor, setNewcolor] = useState("");
    const [alert, setAlert] = useState(false);
    const [msg, setMsg] = useState("");
    let [allnewcolor, setAllnewcolor] = useState("");
    const handleClose = () => { setShow(false) };
    const [data, setData] = useState([]);
    const [searchnamebox, setSeartchnamebox] = useState("");
    const [deletebox, setDeletebox] = useState(false);


    const pgeCnt = () => {
        if (allboxes) {
            const pageCount = Math.ceil(((allboxes).length) / usersPerPage);
            return pageCount
        }
    }

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }

    //FUNCTION GET ALL BOXES
    const getAllboxes = () => {
        axios.get(`${process.env.REACT_APP_LINK}/box/getallboxes`).then((res) => { setAllboxes(res.data.data); setData(res.data.data) })
    }

    // FUNCTION DELETE BOX
    const deleteBox = (box_id) => {
        deleteBoxFromScreen(box_id)
        // const data = JSON.stringify(img_to_delete);
        axios.post(`${process.env.REACT_APP_LINK}/box/deletebox`, JSON.stringify({ id: box_id })
            , {
                headers: {
                    'Content-Type': "application/json"
                }
            }).then((res) => {
                console.log("produit supprimé")
            });
    }

    const deleteBoxFromScreen = (id) => {
        setDeletebox(!deletebox)
        var position = data.findIndex((elm) => elm.id === id);
        if (position != -1) {
            data.splice(position, 1);
            setAllboxes(data)
        }
        return allboxes
    }

    const handleshow = (detail) => {
        setShow(true)
        setIdbox(detail.id)
        setBoxname(detail.boxname)
        setBoxcolor(JSON.parse(detail.boxcolor));
        setPricebox(detail.boxprice)
        setBoxdetail(detail)
        setBoxmaxnumber(detail.boxproductnumber)
        setFile(detail.boxphoto)
        setAllnewcolor(JSON.parse(detail.boxcolor))
    }

    const uploadImgProduct = (file) => {
        const formdata = new FormData();
        formdata.append('image', file);
        axios.post(`${process.env.REACT_APP_LINK}/box/uploadimgBox`, formdata, {}).then((res) => console.log(res));
    }

    //FUNCTION UPDATE BOX INFORMATION
    const updateBoxinformation = (data) => {
        axios.post(`${process.env.REACT_APP_LINK}/box/updateboxinfo`, JSON.stringify(data), {
            headers: {
                'Content-Type': "application/json"
            }
        }).then((res) => {
            if (res.data.message === "Contenu mis à jour avec succés !") {
                handleClose();
                setMsg(res.data.message);
            }
            else {
                console.log("erreur")
            }
        })
        setAlert(true)
        setTimeout(() => {
            setAlert(false)
        }, 3000)
    }

    // Autocomplete function
    const autocomplete = (nameproduct) => {
        if (searchnamebox) {
            const result = data.filter((elm) => elm.boxname.toLowerCase().includes(nameproduct.toLowerCase()))
           console.log(result)
            setAllboxes(result)
        }
        else {
            setAllboxes(data)
        }
    }

    useEffect(() => {
        getAllboxes();
    }, [])

    useEffect(() => {
        if (boxcolor) setAllnewcolor([...boxcolor])
    }, [boxcolor])

    useEffect(() => {
        getAllboxes();
    }, [deletebox])

    useEffect(() => {
        autocomplete(searchnamebox);
    }, [searchnamebox])

    return (
        <div className='allboxes-container'>
            {alert && <div> {msg} </div>}
            {alert && <Alert className='alert-message' variant="success"> {msg} </Alert>}
            <div>
                <form enctype="multipart/form-data" method="post" onSubmit={(e) => e.preventDefault()} className='form-search'>
                    <input className='serach-field' placeholder='entrer le nom de la box' type="text" id="input-field" value={searchnamebox} onChange={(e) => { setSeartchnamebox(e.target.value); }} />
                </form>
            </div>
            <div className='table-allproduct'>
                <Table bordered hover className='table-show-allproduct'>
                    <thead>
                        <tr>
                            <th className='table-header'> Nom Box </th>
                            <th className='table-header'> Prix (Da) </th>
                            <th className='table-header'> Couleur(s) </th>
                            <th className='table-header'> Nombre max de produit </th>
                            <th className='table-header'> Action </th>
                        </tr>
                    </thead>
                    <tbody>
                        {allboxes && allboxes.slice(pagesVisited, pagesVisited + usersPerPage).map((elm) => {
                            return (
                                <tr>
                                    <td> {elm.boxname} </td>
                                    <td> {elm.boxprice} </td>
                                    <td className='row-color'>
                                        {elm.boxcolor && JSON.parse(elm.boxcolor).map((elmt) => {
                                            return (
                                                <div className='color-badge' style={{ "background": `${elmt}` }}>
                                                </div>
                                            )
                                        })}
                                    </td>
                                    <td> {elm.boxproductnumber} </td>
                                    <td>
                                        <button className="action-buttons" onClick={() => { handleshow(elm) }}> Modifier </button>
                                        <button className="action-buttons" onClick={() => deleteBox(elm.id)}> Supprimer </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
            <div className="pagination-container">
                <ReactPaginate
                    className='pagination allproduct'
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pgeCnt()}
                    onPageChange={changePage}
                    containerClassName={"paginationBtns"}
                    previousLinkClassName={"prevButton"}
                    nextLinkClassName={"nxtButton"}
                    siblingCount={1}
                />
            </div>
            {boxdetail && <Modal size="lg" show={show} onHide={handleClose} className='modalchangeproduct'>
                <Modal.Header closeButton>
                    <Modal.Title> Modifier informations </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={(e) => e.preventDefault()} enctype="multipart/form-data">
                        <div className='filds-form'>
                            <label className='label'> Nom box(*) </label>
                            <input className='filds' onChange={(e) => { setBoxname(e.target.value) }} value={boxname} />
                        </div>

                        <div className='filds-form'>
                            <label className='label'> Prix box </label>
                            <input className='filds' onChange={(e) => { setPricebox(e.target.value) }} value={pricebox} />
                        </div>
                        <div className='filds-form'>
                            <label className='label'> Nombre max de produit </label>
                            <input className='filds' onChange={(e) => {setBoxmaxnumber(e.target.value)}} value={boxmaxnumber} />
                        </div>
                        <div className='filds-form'>
                            <label className='label'> Couleur produit </label>
                            <input className='filds' value={newcolor} onChange={(e) => { setNewcolor(e.target.value) }} placeholder="Ajouter une nouvelle couleur" />
                            <button className='add-button-box' onClick={() => { setBoxcolor([...boxcolor, newcolor]) }}>
                                <i className='bx bx-plus-circle'></i>
                            </button>
                        </div>
                        <div className='list-color-container'>
                            {allnewcolor && allnewcolor.map((elmt) => {
                                return (
                                    <div className='color-badge' style={{ "background": `${elmt}` }}>
                                        <button
                                            className='cancel-color-button'
                                            onClick={() => { setBoxcolor([...boxcolor.filter(elm => elm != elmt)]) }}>
                                            <i class='bx bx-x'></i>
                                        </button>
                                    </div>
                                )
                            })}
                        </div>

                        <div className='input-img-product'>
                            <label for="inputfile" className='label-input-file'>
                                <div className='icon-download'> <i className='bx bx-cloud-download'></i> </div>
                                <div className='file-name'> {file && file} </div>
                                {!file && <div className='label-import-file-name'> Importer une image </div>}
                            </label>
                            <input
                                id="inputfile"
                                type="file"
                                accept="image/png, image/gif, image/jpeg, image/webp"
                                name="image"
                                onChange={(e) => {
                                    setFile((e.target.files[0]).name);
                                    uploadImgProduct(e.target.files[0])
                                }}
                                className='add-file-input'
                            />
                        </div>
                        <button onClick={() => {
                            updateBoxinformation({
                                id: idbox,
                                namebox: boxname,
                                color: JSON.stringify(boxcolor),
                                price: pricebox,
                                photo: file,
                                maxnumber: boxmaxnumber,
                            });
                        }} className='submit-button-edit-product boxmodification'> Enregister modifications </button>
                    </form>
                </Modal.Body>
            </Modal>}
        </div>
    )
}
