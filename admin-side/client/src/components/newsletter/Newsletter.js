import React from 'react'
import Stylenewsletter from '../newsletter/Newsletter.css'
import { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import ReactPaginate from 'react-paginate'


export default function Newsletter() {
    const [allnewsletter, setNewsletter] = useState([])
    const [pageNumber, setPageNumber] = useState(0);
    const [del, setDel] = useState(false)
    const usersPerPage = 3;
    const pagesVisited = pageNumber * usersPerPage;
   

    const [dataa, setDataa] = useState([])
    const getAllnewsletter= () => {
        setDataa([])
        axios.get(`${process.env.REACT_APP_LINK}/newsletter/getnewsletter`).then(res => {
            setDataa(res.data.data)
            setNewsletter(res.data.data)
        })
    };



    const deleteNewslettercommand= (newsletter_id) => {
        // const data = JSON.stringify(img_to_delete);
        axios.post(`${process.env.REACT_APP_LINK}/newsletter/deletenewsletter`, {id: newsletter_id}
          , {
            headers: {
              'Content-Type': "application/json"
            }
          })
      }
    
      const deleteNewsletterFromScreen = (id) => {
        var position = dataa.findIndex((elm) => elm.id === id);
        if (position != -1) {
          dataa.splice(position, 1);
        }
        return dataa
      }
    
      const deletenewsletter = (param) => {
        deleteNewsletterFromScreen(param);
        deleteNewslettercommand(param);
        setDel(!del);
      }

      const pgeCnt = () => {
        if (allnewsletter) {
            const pageCount = Math.ceil(((allnewsletter).length) / usersPerPage);
            return pageCount
        }
    }

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    }

    useEffect(()=> {
        getAllnewsletter()
        pgeCnt()
    }, [])

    useEffect(()=> {
        setNewsletter(dataa)
    }, [dataa])

      return (
    <div className='Newsletter'>
     <div className='table-allproduct'>
                <Table bordered hover className='table-show-allproduct'>
                    <thead>
                        <tr>
                            <th className='table-header'> Email </th>
                            <th className='table-header'> Action </th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            allnewsletter &&  allnewsletter.slice(pagesVisited, pagesVisited + usersPerPage).map((elm) => {
                                return (
                                    <tr>
                                        <td> {elm.email} </td>
                                        <td>
                                            <button className="action-buttons" onClick={() => deletenewsletter(elm.id)}> Supprimer </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
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
  )
}
