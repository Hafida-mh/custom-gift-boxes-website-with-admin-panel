import React from 'react'
import '../commandebox/Commandebox.css'
import Home from '../home/Home'
import Navalert from '../navalert/Navalert'
import axios from 'axios'
import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import Table from 'react-bootstrap/Table';
import Facture from '../command/Facture'
import Modal from 'react-bootstrap/Modal';

export default function Commandbox() {
  const [commands, setCommands] = useState([])
  const [data, setData] = useState([])
  const [del, setDel] = useState(false)
  const [ticketArray, setTicketArray] = useState([])
  const [nameclient, setNameclient] = useState();
  const [pageNumber, setPageNumber] = useState(0)
  const idStart = "p"
  const usersPerPage = 3
    const pagesVisited = pageNumber * usersPerPage
    const pgeCnt = () => {
      if (commands) {
          const pageCount = Math.ceil(((commands).length) / usersPerPage);
          return pageCount
      }
  }
  const changePage = ({ selected }) => {
    setPageNumber(selected);
}

  const getallboxcommand = () => {
axios.get(`${process.env.REACT_APP_LINK}/command/getboxcommand`).then((res) => {
  setCommands(res.data.data)
  setData(res.data.data)
  console.log(res.data.data)
})
   }


   const deleteCommandebox = (id) => {
    setDel(!del)
    axios.post(`${process.env.REACT_APP_LINK}/command/deleteboxcommand`, JSON.stringify({
        id: id
    }), {
        headers: {
            'Content-Type': "application/json"
        }
    })
}
   
// DELETE COMMAND FROM DATABASE
const deleteCommandeFromScreen = (id) => {
  var position = commands.findIndex((elm) => elm.id === id);
  if (position != -1) {
      commands.splice(position, 1);
  }
}

const deleteCommand = (param) => {
  deleteCommandeFromScreen(param);
  deleteCommandebox(param);
  setDel(!del);
}

const autocomplete = (nameclient) => {
  if (nameclient) {
  // console.log(commands)

   const result = data.filter((elm) => JSON.parse(elm.client)[0].email.toLowerCase().includes(nameclient.toLowerCase()))
   setCommands(result)
  }
  else {
    setCommands(data)
  }
} 
   useEffect(()=> {
    getallboxcommand()
    pgeCnt();
   }, [])


useEffect(() => {
  setCommands(data)
}, [del])

useEffect(() => {
  autocomplete(nameclient);
}, [nameclient])

  return (
    <div className='Command-box'> 
     <div className='navigation-bar'>
                <Home />
            </div>

            <div className='command-content'>
                <div> <Navalert /> </div>
                <h1 className='command-title'>  <i class='bx bx-spreadsheet' id="icon-dashbord"></i>  Toutes les commandes box </h1>
                <div>
        <form enctype="multipart/form-data" method="post" onSubmit={(e) => e.preventDefault()} className='form-search'>
          <input className='serach-field' placeholder='Recherche par email' type="text" id="input-field" value={nameclient} onChange={(e) => { setNameclient(e.target.value);}} />
        </form>
      </div>
              
                <div className='table-commands'>
                    <Table bordered hover className='table-allcommands'>
                        <thead>
                            <tr>
                                <th key="th-1" className='table-header'> Date </th>
                                <th key="th-2" className='table-header'> Box </th>
                                <th key="th-3" className='table-header'> Message </th>
                                <th key="th-4" className='table-header'> Client</th>
                                <th key="th-7" className='table-header'> Total </th>
                                <th key="th-10" className='table-header'> Supprimer </th>
                            </tr>
                        </thead>
                        <tbody>
                            {commands && commands.reverse().slice(pagesVisited, pagesVisited + usersPerPage).map((elm, index) => {
                                return (
                                    <tr key={index} id={`${idStart + elm.id}`}
                                        className={Boolean(Number(elm.confirmed)) ? 'class' : (Boolean(Number(elm.canceled)) ? 'canceled' : '')}>
                                        <td key={elm.id+"a"}> {elm.date}</td>
                                        <td key={elm.id+"b"}> 
                                        {JSON.parse(elm.box).map((box)=> {
                                          return (
                                            <div className='section-td-table-commande-box'>
                                              <section className='section-td-table-commande-box box-title'> {box.boxname} / {box.qtebox} </section>
                                              <section className='section-td-table-commande-box'> 
                                              <ul className='section-td-table-commande-box'> {(box.products).map((productbox)=> {
                                                return (
                                                  <li className='section-td-table-commande-box'> {productbox} </li>
                                                )
                                              })}  </ul> 
                                              </section>
                                            </div>
                                          )
                                        })} 
                                        </td>
                                        <td > {JSON.parse(elm.box).map((element)=> {
                                          return (
                                            <span className='section-td-table-commande-box'> 
                                            <div key={"rtg"+elm.id+"c"} className='section-td-table-commande-box'> 
                                            <section key={"rt6g"+elm.id+"c6"} className='section-td-table-commande-box box-title'> {element.boxname}  </section> 
                                           <section key={"rt4g"+elm.id+"c78"} className='section-td-table-commande-box'> {element.message}  </section>
                                            </div>
                                            </span>
                                          )
                                        })} </td>
                                        <td key={elm.id+"d"}> {JSON.parse(elm.client).map((client)=> {
                                          return (
                                            <div className='section-td-table-commande-box'> 
                                              <section key={"rtg"+elm.id+"tc"}  className='section-td-table-commande-box'> <u className='section-td-table-commande-box'> <b className='section-td-table-commande-box'> Nom </b> </u>: {client.name} </section>
                                              <section key={"rt3g"+elm.id+"ttc"}  className='section-td-table-commande-box'> <u className='section-td-table-commande-box'> <b className='section-td-table-commande-box'> Téléphone </b> </u>: {client.phone} </section>
                                              <section key={"rt7g"+elm.id+"ttc"}  className='section-td-table-commande-box'> <u className='section-td-table-commande-box'> <b className='section-td-table-commande-box'> Email </b></u> : {client.email} </section>
                                              <section key={"rtgY"+elm.id+"ttc3c"}  className='section-td-table-commande-box'> <u className='section-td-table-commande-box'> <b className='section-td-table-commande-box'> Wilaya </b> </u>: {client.wilaya} </section>
                                              <section  key={"rt5g"+elm.id+"t56tc"} className='section-td-table-commande-box'> <u className='section-td-table-commande-box'> <b className='section-td-table-commande-box'> Adresse </b></u> : {client.address} </section>
                                              <section  key={"rtTg"+elm.id+"t66tc"} className='section-td-table-commande-box'> <u className='section-td-table-commande-box'> <b className='section-td-table-commande-box'> Délai </b></u> : {client.delivery} </section>
                                            </div>
                                          )
                                        })} </td>
                                        <td key={elm.id+"g"}> {elm.total} Da </td>
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
            </div>
     </div>
  )
}
