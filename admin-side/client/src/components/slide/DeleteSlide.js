import React from 'react'
import axios from 'axios'
import Style from '../slide/DeleteSlide.css'
import Formrequest from './Formrequest'
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import { useState, useEffect} from 'react'
export default function DeleteSlide(props) {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(true)
  const [error, setError] = useState(false);
  const [alert, setAlert] = useState("");
  const [slides, setSlides] = useState(props.data);
  const [del, setDel] = useState(false);

  const deleteImgDB = (img_id) => {
    axios.post(`${process.env.REACT_APP_LINK}/upload/deleteSlide`, { id: img_id }
      , {
        headers: {
          'Content-Type': "application/json"
        }
      })
  }

  const deleteSlideFromScreen = (id) => {
    var position = data.findIndex((elm) => elm.id === id);
    if (position != -1) {
      data.splice(position, 1);
    }
    return data
  }

  const deleteSlide = (param) => {
    deleteSlideFromScreen(param);
    deleteImgDB(param);
    setDel(!del);
  }

  const getImg = (e) => {
    axios.get(`${process.env.REACT_APP_LINK}/upload/getSlide`).then((res) => {
      if ((res.data.data).length === 0) {
        setError(true);
      }
      else {
        setSlides(res.data.data);
        setData(res.data.data)
      }
    })
  }

  useEffect(() => {
    setSlides(data);
  }, [data]);

  useEffect(() => {
    getImg();
  }, [])

  return (
    <div className='delete-slide'>

      <div className='table-allproduct'>
                <Table bordered hover className='table-show-allproduct'>
                    <thead>
                        <tr>
                            <th className='table-header'> Slide </th>
                            <th className='table-header'> Action </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            slides && slides.map((elm) => {
                                return (
                                    <tr>
                                        <td> {elm.title} </td>
                                        <td>
                                            <button className="action-buttons" onClick={() => deleteSlide(elm.id)}> Supprimer </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
    </div>
  )
}
