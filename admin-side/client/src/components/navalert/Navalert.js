import React from 'react'
import '../navalert/Navalert.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import axios from 'axios'
export default function Navalert() {
  
  const [notifications, setNotification] = useState();
  const navigate = useNavigate();
  const logout = () => {
    Cookies.remove("refreshtoken")
    navigate("/")
  }
  const handleNotification = () => {
    axios.get(`${process.env.REACT_APP_LINK}/command/get-commend`, {
      headers: {
        'x-access-token': Cookies.get("refreshtoken"),
      }
    }).then((res) => {
      setNotification((res.data.data).filter((elm) => elm.canceled == 0 && elm.confirmed == 0))
    
     if ((res.data.data).filter((elm) => elm.canceled == "0" && elm.confirmed == "0").length != 0) {
        document.querySelector('.bxs-circle').style.color = "red";
      } else {
        document.querySelector('.bxs-circle').style.display = "none";
      }
    })
  }

  const desactivateNotification = ()=> {
    document.querySelector('.bxs-circle').style.color = "blue";
    navigate("/command")
    setNotification([])
  }

  const full_date =  new Date();
  const date = `${full_date.getDate()} / ${full_date.getMonth()+1} / ${full_date.getFullYear()}`; 
  useEffect(() => {
    handleNotification()
  }, [])
  return (
    <div className='nav-alert'>
      <div className='nav-alert-container'>
        <div className='navalert-date'>
        {date}
        </div>
        <div className='calltoaction-buttons'>
          <div className='notification-button'>
            <Dropdown className='dropdown-notification-button'>
              <Dropdown.Toggle>
                <i className='bx bxs-bell'></i>
               <i className='bx bxs-circle'></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>

                {notifications && notifications.map((elm) => {
                  return (
                    <div key={elm.id} className='notif-container'>
                    <Dropdown.Item  className='dropdownn-item' href="#/action-1" onClick={()=> desactivateNotification()}>
                 
                      <div className='notification-box'>
                        <div className='notification-items'>
                          <div className='notification-ref'>
                            <div className='circle-number'> #{notifications.indexOf(elm)+1}
                            </div>
                          </div>
                          <div className='command-info'>
                            <div className='email-client'> {elm.email} </div>
                            <div className='total-command-client'> Total : {elm.total} Da </div>
                          </div>
                        </div>
                        <div className='date-command'> {elm.date} </div>
                      </div>
                    </Dropdown.Item>
                    </div>
                  )
                })}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className='logout-button'>
            <button onClick={() => { logout() }}> Déconnexion</button>
          </div>
        </div>
      </div>
    </div>
  )
}
