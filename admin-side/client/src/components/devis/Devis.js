import React from 'react'
import Devisstyle from "./Devis.css"
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react'
import Home from '../home/Home.js';
import Navalert from '../navalert/Navalert.js';
import axios from 'axios';
export default function Devis() {
    const [alldevis, setAlldevis] = useState([]);
    const [data, setData] = useState([]);
    const [del, setDel] = useState(false);

    const getalldevis = () => {
      axios.get(`${process.env.REACT_APP_LINK}/devis/getedevis`).then((res)=> {
      setAlldevis(res.data.data)
      setData(res.data.data)
})
    }


    const deleteDevis= (devis_id) => {
        // const data = JSON.stringify(img_to_delete);
        axios.post(`${process.env.REACT_APP_LINK}/devis/deletedevis`, JSON.stringify({id: devis_id})
          , {
            headers: {
              'Content-Type': "application/json"
            }
          })
      }
    
      const deleteDevisFromScreen = (id) => {
        var position = data.findIndex((elm) => elm.id === id);
        if (position != -1) {
          data.splice(position, 1);
        }
        return data
      }
    
      const deletedemandedevis = (param) => {
        deleteDevisFromScreen (param);
        deleteDevis(param);
        setDel(!del);
      }

    useEffect(()=> {
        getalldevis()
    }, [])

    useEffect(() => {
        setAlldevis(data)
      }, [data])
    
  return (
    <div className='Devis'>
  <div className='navigation-bar'>
                <Home />
            </div>
            <div className='command-content'>
            <div> <Navalert /> </div>
            <h1 className='main-title'>  <i className='bx bx-purchase-tag-alt' id="icon-dashbord"></i> Demande de devis </h1>

        <div className='table-allproduct'>
                <Table bordered hover className='table-show-allproduct'>
                    <thead>
                        <tr>
                            <th className='table-header'> Entreprise </th>
                            <th className='table-header'> Nom interlocuteur </th>
                            <th className='table-header'> Email interlocuteur </th>
                            <th className='table-header'> Téléphone interlocuteur </th>
                            <th className='table-header'> Détail demande </th>
                            <th className='table-header'> Action </th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            alldevis && alldevis.map((elm) => {
                                return (
                                    <tr>
                                        <td> {elm.corporate} </td>
                                        <td> {elm.namesender} </td>
                                        <td> {elm.emailsender} </td>
                                        <td> {elm.phonesender} </td>
                                        <td> {elm.detaildevis} </td>
                                        <td>
                                            <button className="action-buttons"  onClick={() => deletedemandedevis(elm.id)}> Supprimer </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
            </div>
    </div>
  )
}
