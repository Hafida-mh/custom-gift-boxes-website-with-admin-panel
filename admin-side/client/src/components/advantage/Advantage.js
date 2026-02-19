import React from 'react'
import { useEffect, useState } from 'react'
import Deleteadvantage from './Deleteadvantage';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import '../advantage/Advantage.css'
export default function Advantage() {
    const [title, setTitle] = useState();
    const [descriptif, setDescriptif] = useState();
    const [icon, setIcon] = useState();
    const [showalert, setShowalert] = useState(false);
    const [showalerterror, setShowalerterror] = useState(false);
    const [alerte, setAlerte] = useState("");
    const addAdvantage = (e) => {
        e.preventDefault()
        if(title && descriptif && icon) {
        saveIcon()
        axios.post(`${process.env.REACT_APP_LINK}/advantage/save`, JSON.stringify({
            id : uuidv4(),
            title : title,
            descriptif : descriptif,
            icon : icon.name
        }), {  headers: {
            'Content-Type': "application/json"
        }}).then((res)=> {
            setTitle("")
            setDescriptif("")
            setIcon("")
            setAlerte(res.data.message); 
            disapearAlert(res.data.message);
        })
    }
    else {
        setAlerte("Un des champs obligatoires est vide");
        setShowalerterror(true)
        setTimeout(() => {
            setShowalerterror(false)
        }, 2300)
    }
    }

    const saveIcon = () => {
        const data = new FormData();
        data.append('icon', icon);
        axios.post(`${process.env.REACT_APP_LINK}/advantage/saveIcon`, data, {}).then((res) => console.log(res));
    }

    const disapearAlert = (msg) => {
        if(msg === "Ajouté avec succés") {
            setShowalert(true)
            setAlerte(msg)
            setTimeout(() => {
                setShowalert(false);
            }, 2300)
        }
        else {
            setShowalerterror(true)
            setTimeout(() => {
                setShowalerterror(false)
            }, 2300)
        }
      
    }
  return (
    <div className='advantage'>
        <h1> Dites en quoi vous êtes spécial </h1>
        <div className='advantage-form'>
            <form encType="multipart/form-data" onSubmit={(e) => addAdvantage(e)}>
                <div className='filds-form advantages-fields'> 
                    <label  className='label'> Insérer un titre </label>
                    <input className='filds advantage-input' type='text' value={title} onChange={(e) => {setTitle(e.target.value)}} />
                </div>
                <div className='filds-form advantages-fields'>
                    <label className='label'> Décriver votre avantage </label>
                    <input className='filds advantage-input' type='text' maxlength="73" value={descriptif} onChange={(e) => {setDescriptif(e.target.value)}}/>
                </div>
                <div className='filds-form advantages-fields'>
                <div className='input-img-product'>
                            <label for="inputfile" className='label-input-file'>
                                <div className='icon-download'> <i className='bx bx-cloud-download'></i> </div>
                                <div className='file-name'> {icon && icon.name}</div>
                                {!icon && <div className='label-import-file-name'> Importer une image </div>}
                            </label>
                            <input
                                id="inputfile"
                                type="file"
                                name="image"
                                onChange={(e) => {
                                    setIcon(e.target.files[0]);
                                }}
                                className='add-file-input'
                            />
                        </div>
                </div>
                {showalert && <div className='alert-container'> <i className="fa-regular fa-circle-check"></i>  {alerte} </div>}
                        {showalerterror && <div className='alert-container error'> <i className="fa-regular fa-circle-xmark"></i>  {alerte} </div>}
                <button className='submit-button' onClick={() => addAdvantage()}> Enregistrer </button>
            </form>
        </div>
        <div>
            <Deleteadvantage />
        </div>
    </div>
  )
}
