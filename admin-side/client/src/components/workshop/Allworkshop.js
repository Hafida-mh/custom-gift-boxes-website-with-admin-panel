import React from 'react'
import Styleallworkshop from '../workshop/Allworkshop.css'
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import ReactPaginate from 'react-paginate'
import Alert from 'react-bootstrap/Alert';
import { useState, useEffect } from 'react'
import axios from 'axios';
export default function Allworkshop() {
    const [alert, setAlert] = useState(false);
    const [msg, setMsg] = useState("");
    const [data, setData] = useState([]);
    const [allworkshop, setAllworkshop] = useState([]);
    const [showmodal, setShowmodal] = useState(false);
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [hour, setHour] = useState("");
    const [place, setPlace] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState("");
    const [id, setId] = useState("");
    const [element, setElement] = useState({});
    const [del, setDel] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 5;
    const pagesVisited = pageNumber * usersPerPage;

    /*
    const pgeCnt = () => {
      if (props.products) {
        const pageCount = Math.ceil(((props.products).length) / usersPerPage);
        return pageCount
      }
    }
*/

    const getAllWorkshop = (e) => {
        setData([])
        axios.get(`${process.env.REACT_APP_LINK}/workshop/getworkshop`).then(res => {
            setData(res.data.data)
            setAllworkshop(res.data.data)
        })
    };

    const handleShow = (elm) => {
        setShowmodal(true);
        setTitle(elm.title);
        setDate(elm.date);
        setHour(elm.hour);
        setPlace(elm.place);
        setDescription(elm.description);
        setFile(elm.photo)
    };

    const handleClose = () => {
        setShowmodal(false);
    }

    const uploadImgworkshop = (file) => {
        const formdata = new FormData();
        formdata.append('image', file);
        axios.post(`${process.env.REACT_APP_LINK}/workshop/uploadimgworkshop`, formdata, {}).then((res) => console.log(res));
    }

    const updateWorkshop = (data) => {
        axios.post(`${process.env.REACT_APP_LINK}/workshop/updateworkshop`, JSON.stringify(data), {
          headers: {
            'Content-Type': "application/json"
          }
        }).then((res) => {
          if (res.data.message === "Contenu mis à jour avec succés !") {
            handleClose();
            setMsg(res.data.message);
            getAllWorkshop();
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

    const validate = () => {
        element.id = id;
        element.title = title;
        element.date = date;
        element.hour = hour;
        element.description = description;
        element.place = place;
        element.img = file;
        updateWorkshop(element);
      }

      const deleteWorkshopcommand = (workshop_id) => {
        // const data = JSON.stringify(img_to_delete);
        axios.post(`${process.env.REACT_APP_LINK}/workshop/deleteworkshop`, {id: workshop_id}
          , {
            headers: {
              'Content-Type': "application/json"
            }
          }).then((res) => {
            setMsg(res.data.message);
            setTimeout(() => {
              setAlert("");
            }, 1300)
          });
      }
    
      const deleteWorkshopFromScreen = (id) => {
        var position = data.findIndex((elm) => elm.id === id);
        if (position != -1) {
          data.splice(position, 1);
        }
        return data
      }
    
      const deleteWorkshop = (param) => {
        deleteWorkshopFromScreen (param);
        deleteWorkshopcommand(param);
        setDel(!del);
      }
    useEffect(() => {
        getAllWorkshop();
    }, [])

    useEffect(() => {
        setAllworkshop(data)
      }, [data])
    
    return (
        <div className='Allworkshop'>
            {alert && <div> {msg} </div>}
            {alert && <Alert className='alert-message' variant="success"> {msg} </Alert>}
            <div className='table-allproduct'>
                <Table bordered hover className='table-show-allproduct'>
                    <thead>
                        <tr>
                            <th className='table-header'> Workshop</th>
                            <th className='table-header'> Date </th>
                            <th className='table-header'> Action </th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            allworkshop && allworkshop.map((elm) => {
                                return (
                                    <tr>
                                        <td> {elm.title} </td>
                                        <td> {elm.date} </td>
                                        <td>
                                            <button className="action-buttons" onClick={() => { handleShow(elm); setId(elm.id) }}> Modifier </button>
                                            <button className="action-buttons" onClick={() => deleteWorkshop(elm.id)}> Supprimer </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>

            {showmodal && <Modal size="lg" show={showmodal} onHide={handleClose} className='modalchangeproduct'>
                <Modal.Header closeButton>
                    <Modal.Title> Modifier informations </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={(e) => e.preventDefault()} enctype="multipart/form-data">
                        <div className='filds-form'>
                            <label className='label'> Titre Workshop </label>
                            <input className='filds' onChange={(e) => { setTitle(e.target.value) }} value={title} />
                        </div>
                        <div className='filds-form'>
                            <label className='label'> Description workshop </label>
                            <textarea value={description} className='filds paragraphe' rows="4" cols="5" onChange={(e) => {
                                setDescription(e.target.value);
                            }}>
                            </textarea>
                        </div>

                        <div className='filds-form'>
                            <label className='label'> Date workshop</label>
                            <input className='filds' value={date} onChange={(e) => { setDate(e.target.value); }} />
                        </div>
                        <div className='filds-form'>
                            <label className='label'> Heure workshop </label>
                            <input className='filds' value={hour} onChange={(e) => { setHour(e.target.value); }} />
                        </div>
                        <div className='filds-form'>
                            <label className='label'> Place workshop </label>
                            <input className='filds' value={place} onChange={(e) => { setPlace(e.target.value); }} />
                        </div>
                        <div className='input-img-product'>
                            <label for="inputfile" className='label-input-file'>
                                <div className='icon-download'> <i className='bx bx-cloud-download'></i> </div>
                                <div className='file-name'> {file && file}</div>
                                {!file && <div className='label-import-file-name'> Importer une image </div>}
                            </label>
                            <input
                                id="inputfile"
                                type="file"
                                name="image"
                                accept="image/png, image/gif, image/jpeg, image/webp"
                                onChange={(e) => {
                                    setFile((e.target.files[0]).name);
                                    uploadImgworkshop(e.target.files[0])
                                }}
                                className='add-file-input'
                            />
                        </div>
                        <button onClick={() => { validate()}} className='submit-button-edit-product'> Enregister modifications </button>
                    </form>
                </Modal.Body>
            </Modal>}
        </div>
    )
}
