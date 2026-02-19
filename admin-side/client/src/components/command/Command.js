import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Facture from './Facture';
import Cookies from 'js-cookie';
import Navalert from '../navalert/Navalert';
import Tickets from '../tickets/Tickets';
import Home from '../home/Home';
import '../command/Command.css'
import { v4 as uuidv4 } from 'uuid';
export default function Command(props) {
    const [commands, setCommands] = useState([]);
    const [data, setData] = useState([]);
    const [dataa, setDataa] = useState();
    const [comment, setComment] = useState();
    const [wilaya, setWilaya] = useState();
    const [pageNumber, setPageNumber] = useState(0);
    const [deleted, setDeleted] = useState(false);
    const [color, setColor] = useState(false)
    const usersPerPage = 3;
    const pagesVisited = pageNumber * usersPerPage;
    const [show, setShow] = useState(false);
    const [showpopup, setShowpopup] = useState(false);
    const [ticket, setTicket] = useState(false);
    const [selection, setSelection] = useState(false)
    const idStart = "p"
    const [start, setStart] = useState(true)
    const [email, setEmail] = useState();
    const [full_name, setFullName] = useState();
    const [adresse, setAdresse] = useState();
    const [tel, setTel] = useState();
    const [list, setList] = useState();
    const [total, setTotal] = useState();
    const [totalTva, setTotalTva] = useState();
    const [totalTTC, setTotalTTC] = useState();
    const [ticketArray, setTicketArray] = useState([]);
    const [allwialayas, setAllwilayas] = useState([]);
    const [showalert, setShowalert] = useState(false);
    const [showalerterror, setShowalerterror] = useState(false);
    const [alerte, setAlerte] = useState("");
    const [id, setId] = useState()
    const [nameclient, setNameclient] = useState();

    const getallwilayas = () => {
        axios.get(`${process.env.REACT_APP_LINK}/shipping/get`).then((res) => {
            setAllwilayas(res.data.data)
        })
    }

    const generateTicket = () => {
        setTicket(true);
    }

    const closeModalTicket = () => {
        setShowpopup(false);
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const stringToarray = (array) => {
        const arr = array.replace(/'/g, '"');
        return setList(JSON.parse(arr))
    }

    const pgeCnt = () => {
        if (commands) {
            const pageCount = Math.ceil(((commands).length) / usersPerPage);
            return pageCount
        }
    }

    // Count Total TTC & TVA 
    const countTTC = (total) => {
        const tva = ((total * 19) / 100) + total;
        setTotalTva(tva)
        const invoice_total = total + tva;
        setTotalTTC(invoice_total);
    }

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }

    const sendConfirmedCommand = () => {
        const data = {
            number: 1,
            id: uuidv4(),
            email: 'mechkour@gmail.com',
            telephone: "0783143409",
            list: "[['shapoing', 1], ['lait pour corps', 1], ['crème', 2]]",
            total: 1000
        }
        try {
            axios.post(`${process.env.REACT_APP_LINK}/command/add`, JSON.stringify(data), {
                headers: {
                    'Content-Type': "application/json"
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    const confirmedCommand = (id, state) => {
        axios.post(`${process.env.REACT_APP_LINK}/command/update`, JSON.stringify({
            confirmed: !state,
            id: id
        }), {
            headers: {
                'Content-Type': "application/json"
            }
        });
        setColor(!color);
        ChangeColor(id);
    }

    const canceledCommand = (id) => {
        axios.post(`${process.env.REACT_APP_LINK}/command/cancel`, JSON.stringify({
            canceled: true,
            id: id
        }), {
            headers: {
                'Content-Type': "application/json"
            }
        });
        setColor(!color);
        ChangeColorCanceled(id)
    }

    const ChangeColor = (id) => {
        const rowTable = document.querySelector(`#${idStart + id}`);
        rowTable.style.background = "aqua";
        const btn = document.querySelector(`.${idStart + id}`);
    }

    const ChangeColorCanceled = (id) => {
        const rowTable = document.querySelector(`#${idStart + id}`);
        rowTable.style.background = "red";
        const btn = document.querySelector(`.${idStart + id}`);

    }
    // DELETE COMMAND FROM DATABASE
    const deleteCommand = (param) => {
        deleteCommandeFromScreen(param);
        deleteCommande(param);
    }

    const deleteCommande = (id) => {
        setDeleted(!deleted)
        axios.post(`${process.env.REACT_APP_LINK}/command/delete`, JSON.stringify({
            id: id
        }), {
            headers: {
                'Content-Type': "application/json"
            }
        }).then((res) => { window.location.reload(); })
    }

    // DELETE COMMAND FROM DATABASE
    const deleteCommandeFromScreen = (id) => {
        var position = commands.findIndex((elm) => elm.id === id);
        if (position != -1) {
            commands.splice(position, 1);
        }
    }

    const handlegeneratebilling = (element) => {
        if (window.innerWidth >= "992") {
            setEmail(element.email);
            setTel(element.telephone);
            setList(JSON.parse(element.list));
            setTotal(element.total);
            countTTC(element.total);
            handleShow();
            setAdresse(element.adresse);
            setFullName(element.fullname);
            setEmail(element.email)
            setWilaya(element.wilaya)
        }
        else {
            const buttongenerate = document.querySelector('#generate-button');
            buttongenerate.style.cursor = "not-allowed";
            buttongenerate.style.background = "rgb(180, 175, 175)";
        }
    }

    const getAllCommands = () => {
        axios.get(`${process.env.REACT_APP_LINK}/command/get-commend`, {
            headers: {
                'x-access-token': Cookies.get("refreshtoken"),
            }
        }).then((res) => {
            setData(res.data.data)
            setCommands([])
            for (let i = 0; i <= (((res.data.data).length) - 1) / 2; i++) {
                const element = (res.data).data[i];
                data.push(element);
            }
            setCommands((res.data.data));
        })
    }

    const updateComment = (id, comment) => {
        axios.post(`${process.env.REACT_APP_LINK}/command/updatecomment`, JSON.stringify({
            id: id,
            comment: comment
        }), {
            headers: {
                'Content-Type': "application/json"
            }
        }).then((res) => {
            if (res.data.message === "Contenu mis à jour avec succés !") {
                setShowalert(true)
                setAlerte("Contenu mis à jour avec succés !")
                setTimeout(() => {
                    setShowalert(false);
                    setShowpopup(false)
                }, 2300)
            }
            else {
                setShowalerterror(true)
                setAlerte("Une erreur s'est produite")
                setTimeout(() => {
                    setShowalerterror(false)
                }, 2300)
            }
        })
    }

    const autocomplete = (nameclient) => {
        if (nameclient) {
          const result = data.filter((elm) => elm.email.toLowerCase().includes(nameclient.toLowerCase()))
          setCommands(result)
        }
        else {
          setCommands(data)
        }
      } 

    useEffect(() => {
        getAllCommands()
        pgeCnt();
        getallwilayas()
        // setData(props.command);
    }, []);

    useEffect(() => {
        setData(props.command)
    }, [deleted])

    useEffect(() => {
        autocomplete(nameclient);
      }, [nameclient])

    return (
        <div className='command-container'>
            <div className='navigation-bar'>
                <Home />
            </div>
            <div className='command-content'>
                <div> <Navalert /> </div>
                <h1 className='command-title'>  <i class='bx bx-spreadsheet' id="icon-dashbord"></i>  Toutes les commandes </h1>
                {selection && <button className='generate-tikets-button' onClick={() => generateTicket()}> Afficher les tickets </button>}
                
                <div>
        <form enctype="multipart/form-data" method="post" onSubmit={(e) => e.preventDefault()} className='form-search'>
          <input className='serach-field' placeholder='Recherche par email' type="text" id="input-field" value={nameclient} onChange={(e) => { setNameclient(e.target.value);}} />
        </form>
      </div>
                <div className='filtre-buttons-container'>
                    <button key="cta-1" className='filter-button' onClick={() => { setCommands(data) }}> Tous </button>
                    <button key="cta-2" className='filter-button' onClick={() => setCommands(data.filter((elm) => elm.canceled == 0 && elm.confirmed == 0))}> En cours </button>
                    <button key="cta-3" className='filter-button' onClick={() => setCommands(data.filter((elm) => elm.confirmed == 1))}> Confirmée </button>
                    <button key="cta-4" className='filter-button' onClick={() => setCommands(data.filter((elm) => elm.canceled == 1))}> Annulée </button>
                </div>
                <div className='table-commands'>
                    <Table bordered hover className='table-allcommands'>
                        <thead>
                            <tr>
                                {selection && <th className='table-header'> Select </th>}
                                <th key="th-1" className='table-header'> Date </th>
                                <th key="th-2" className='table-header'> Email </th>
                                <th key="th-3" className='table-header'> Téléphone </th>
                                <th key="th-4" className='table-header'> Wilaya </th>
                                <th key="th-5" className='table-header'> Articles </th>
                                <th key="th-6" className='table-header'> Details </th>
                                <th key="th-7" className='table-header'> Total </th>
                                <th key="th-8" className='table-header'> Confirmer </th>
                                <th key="th-9" className='table-header'> Action </th>
                                <th key="th-10" className='table-header'> Supprimer </th>
                            </tr>
                        </thead>
                        <tbody>
                            {commands && commands.reverse().slice(pagesVisited, pagesVisited + usersPerPage).map((elm, index) => {
                                return (
                                    <tr key={index} id={`${idStart + elm.id}`}
                                        className={Boolean(Number(elm.confirmed)) ? 'class' : (Boolean(Number(elm.canceled)) ? 'canceled' : '')}>
                                        {selection && <td> <input type="radio" id="huey" name={elm.id} value="huey" onClick={() => { ticketArray.push(elm); }} /> </td>}
                                        <td key={elm.id+"a"}> {elm.date}</td>
                                        <td key={elm.id+"b"}> {elm.email} </td>
                                        <td key={elm.id+"c"}> 0{elm.telephone} </td>
                                        <td key={elm.id+"d"}> {elm.wilaya} </td>
                                        <td key={elm.id+"e"}>
                                            {elm.list && JSON.parse(elm.list).map((elmt, index) => {
                                                return (
                                                    <button key={index} className='commande-list-item'>
                                                        {elmt.name}
                                                        <span className='qte-section'> | Qte : {elmt.qte} </span>
                                                    </button>
                                                )
                                            })}
                                        </td>
                                        <td key={elm.id+"f"}> {elm.details} </td>
                                        <td key={elm.id+"g"}> {elm.total} Da </td>
                                        <td key={elm.id+"h"} className='confirm-buttons'>
                                            <button key={elm.id+"1"} id={idStart + elm.id}
                                                className={Boolean(Number(elm.confirmed)) ? '' : (Boolean(Number(elm.canceled)) ? 'disable-buttons' : '')}
                                                onClick={() => { confirmedCommand(elm.id, Boolean(Number(elm.confirmed))) }}
                                            >
                                                <i className="fa-regular fa-circle-check"></i>
                                            </button>
                                            <button key={elm.id+"2"} onClick={() => canceledCommand(elm.id)}
                                                className={Boolean(Number(elm.confirmed)) ? '' : (Boolean(Number(elm.canceled)) ? 'disable-buttons' : '')}>
                                                <i className={`fa-regular fa-circle-xmark`}></i>
                                            </button>
                                        </td>
                                        <td key={elm.id+"u"}>
                                            <button key={elm.id+"3"} id="generate-button" onClick={() => { handlegeneratebilling(elm) }}
                                                className={((!Boolean(Number(elm.confirmed)) && !Boolean(Number(elm.canceled)))) ? 'generate-tiket' : 'disable-action-button'}> Bon </button>
                                            <button key={elm.id} onClick={() => { setShowpopup(true); setComment(elm.details); setId(elm.id) }}
                                                className={((!Boolean(Number(elm.confirmed)) && !Boolean(Number(elm.canceled)))) ? 'generate-tiket' : 'disable-action-button'}> Note </button>
                                        </td>
                                        <td key={elm.id+"v"}>
                                            <button key={elm.id+"4"} onClick={() => { deleteCommand(elm.id) }} className='trush-button'
                                                id={(Boolean(Number(elm.confirmed)) || Boolean(Number(elm.canceled))) ? 'disable-trush-buttons' : ''}>
                                                <i className="fa-regular fa-trash-can"></i>
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
                        pageRangeDisplayed="3"
                    />
                </div>
                <div>
                    <Modal size="lg" show={show} onHide={handleClose} className='modal-facture'>
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body>
                            <Facture email={email} wilaya={wilaya} name={full_name} address={adresse} tel={`0${tel}`} list={list} total={total} totaltva={totalTva} ttc={totalTTC} />
                        </Modal.Body>
                    </Modal>
                </div>

                <div>
                    <Modal size="lg" show={showpopup} onHide={closeModalTicket} className='modal-popup'>
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body>
                            <h2> Modifier details / Ajouter note</h2>
                            {showalert && <div className='alert-container'>
                                <i className="fa-regular fa-circle-check"></i>  {alerte} </div>}
                            {showalerterror && <div className='alert-container error'> <i className="fa-regular fa-circle-xmark"></i>  {alerte} </div>}
                            <div>
                                <form onSubmit={(e) => e.preventDefault()}>
                                    <input className='filds' type='text' value={comment} onChange={(e) => { setComment(e.target.value) }} />
                                    <button className='submit-button' onClick={() => { updateComment(id, comment) }}> Mettre à jour </button>
                                </form>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </div>
    )
}
