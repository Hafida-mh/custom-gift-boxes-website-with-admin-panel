import React from 'react'
import '../workshop/Registration.js'
import { useState, useEffect } from 'react'
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate'

export default function Registration() {
    const [allcandidats, setAllcanndidats] = useState([])
    const [pageNumber, setPageNumber] = useState(0)
    const [msg, setMsg] = useState("")
    const [alert, setAlert] = useState(false)

    const usersPerPage = 5;
    const pagesVisited = pageNumber * usersPerPage;
  
    const changePage = ({ selected }) => {
        setPageNumber(selected);
      }

    const pgeCnt = () => {
      if (allcandidats) {
        const pageCount = Math.ceil(((allcandidats).length) / usersPerPage);
        return pageCount
      }
    }
    const getAllregistration = () => {
        axios.get(`${process.env.REACT_APP_LINK}/workshop/getregistration`).then((res)=> {
            setAllcanndidats(res.data.data)
            console.log(res)
        })
    }

    const deleteCandidat = (candidate_id) => {
        // const data = JSON.stringify(img_to_delete);
        axios.post(`${process.env.REACT_APP_LINK}/workshop/deleteregistration`, {id: candidate_id}
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

      const deleteCandidatFromScreen = (id) => {
        var position = allcandidats.findIndex((elm) => elm.id === id);
        if (position != -1) {
            allcandidats.splice(position, 1);
        }
        return allcandidats
      }
    
      const deleteproduct = (param) => {
        deleteCandidatFromScreen(param);
        deleteCandidat(param);
        
      }

    useEffect(()=> {
        getAllregistration();
       
    }, [])

  return (
    <div>
          <div className='table-allproduct'>
        <Table bordered hover className='table-show-allproduct'>
          <thead>
            <tr>
              <th className='table-header'> Nom complet </th>
              <th className='table-header'> Email inscrit  </th>
              <th className='table-header'> Téléphone inscrit </th>
              <th className='table-header'> Workshop </th>
              <th className='table-header'> Action </th>
            </tr>
          </thead>
          <tbody>
            {allcandidats && allcandidats.slice(pagesVisited, pagesVisited + usersPerPage).map((elm) => {
              return (
                <tr>
                  <td> {elm.name} </td>
                  <td> {elm.email} </td>
                  <td> {elm.phone} </td>
                  <td> {elm.workshop} </td>
                  <td>
                    <button className="action-buttons" onClick={() => deleteproduct(elm.id)}> Supprimer </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
      <div className='pagination-container'>
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
        </div>
  )
}
