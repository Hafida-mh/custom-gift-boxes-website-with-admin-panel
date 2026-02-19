import React from 'react'
import Home from '../home/Home'
import Navalert from '../navalert/Navalert'
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Dropdown from 'react-bootstrap/Dropdown';
import Allboxes from './Allboxes';
import '../box/Addbox.css'
export default function Addbox() {
    const [idbox, setIdbox] = useState();
    const [file, setFile] = useState("");
    const [boxname, setBoxname] = useState();
    const [allboxes, setAllboxes] = useState();
    const [boxcolor, setBoxcolor] = useState([]);
    const [boxmaxnumber, setBoxmaxnumber] = useState();
    const [pricebox, setPricebox] = useState();
    const [colorvalue, setColorvalue] = useState();
    const [del, setDelete] = useState(false);
    const [allcolorsbox, setAllcolorsbox] = useState("");
    const [showallboxes, setShowallboxes] = useState(false);
    const [title_page, setTitlePage] = useState("Ajouter une box")
    const [show, setShow] = useState(false);
    const [showalert, setShowalert] = useState(false);
    const [showalerterror, setShowalerterror] = useState(false);
    const [alerte, setAlerte] = useState("");

    // FUNCTION DELETE COLOR BOX
    const deleteColorbox = (colorname) => {
        var position = boxcolor.findIndex((elm) => elm === colorname);
        if (position != -1) {
            boxcolor.splice(position, 1);
        }
    }

    // FUNCTION ADD BOX
    const addbox = () => {
        console.log("hii")
        uploadImgbox();
        if (boxname && boxmaxnumber && pricebox && file) {
            try {
                axios.post(`${process.env.REACT_APP_LINK}/box/addbox`, JSON.stringify({
                    id: uuidv4(),
                    name: boxname,
                    color: JSON.stringify(boxcolor),
                    price: pricebox,
                    photo: file.name,
                    maxnumber: boxmaxnumber
                }), {
                    headers: {
                        'Content-Type': "application/json",
                        'x-access-token': Cookies.get("refreshtoken")
                    }
                }).then(res => {
                    setAlerte(res.data.message);
                    disapearAlert(res.data.message);
                })
            } catch (error) {
                console.log(error)
            }
        }
        else {
            setAlerte("Un des champ obligatoire est vide !");
            setShowalerterror(true)
            setTimeout(() => {
                setShowalerterror(false)
            }, 2300)
        }
    }

    const uploadImgbox = () => {
        const formdata = new FormData();
        formdata.append('image', file);
        axios.post(`${process.env.REACT_APP_LINK}/box/uploadimgBox`, formdata, {}).then((res) => console.log(res));
    }

    const disapearAlert = (msg) => {
        if (msg === "Box ajoutée avec succés !") {
            setShowalert(true)
            setAlerte(msg)
            setTimeout(() => {
                setShowalert(false);
                window.location.reload();
            }, 2100)
        }
        else {
            setShowalerterror(true)
            setTimeout(() => {
                setShowalerterror(false)
            }, 2300)
        }
    }


    useEffect(() => {
        setAllcolorsbox(boxcolor);
    }, [del]);
    return (
        <div className='box-conntainer'>
            <div className='navigation-bar'>
                <Home />
            </div>
            <div className='addbox-conntainner'>
                <Navalert />
            </div>
            <h1 className='main-title'> <i className='bx bx-box' id="icon-dashbord"></i> {title_page} </h1>

            <div className='dropdown-button'>
                <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                        <i className="fa-solid fa-bars"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => { setShowallboxes(false); setTitlePage("Ajouter une nouvelle box") }}> Ajouter box </Dropdown.Item>
                        <Dropdown.Item onClick={() => { setShowallboxes(true); setTitlePage("Modifier informations box") }}> Modifier box </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            {!showallboxes && <form onSubmit={(e) => e.preventDefault()} className='form-product'>
                <input className='filds product firstinput' onChange={(e) => setBoxname(e.target.value)} value={boxname} placeholder="Nom de la box" />
                <input className='filds product' onChange={(e) => setBoxmaxnumber(e.target.value)} value={boxmaxnumber} placeholder="Nombre max de produit par boxt" />
                <input className='filds product pricebox' onChange={(e) => setPricebox(e.target.value)} value={pricebox} placeholder="Prix box" />

                <div className='filds-form'>
                    <input className='filds product color' onChange={(e) => setColorvalue(e.target.value)} value={colorvalue} placeholder="colours(s) box" />
                    <button className='add-button-box' onClick={() => {
                        if (colorvalue) { boxcolor.push(colorvalue); setColorvalue("") }
                    }}> <i className='bx bx-plus-circle'></i>
                    </button>
                </div>
                {allcolorsbox && allcolorsbox.map((elm) => {
                    return (
                        <div className='list-color-container add-box'>
                            <div className='color-badge' style={{ "background": `${elm}` }}> 
                            <button
                                className='cancel-color-button'
                                onClick={() => { deleteColorbox(elm); setDelete(!del) }}>
                                <i class='bx bx-x'></i>
                            </button>
                            </div>
                        </div>
                    )
                })}
                <div className='input-img-product'>
                    <label htmlFor="inputfile" className='label-input-file'>
                        <div className='icon-download'> <i className='bx bx-cloud-download'></i> </div>
                        <div className='file-name'> {file && file.name}</div>
                        {!file && <div className='label-import-file-name'> Importer une image (H : 520px  W : 330px) </div>}
                    </label>
                    <input
                        id="inputfile"
                        type="file"
                        name="image"
                        accept="image/png, image/gif, image/jpeg, image/webp"
                        onChange={(e) => {
                            setFile(e.target.files[0]);
                        }}
                        className='add-file-input'
                    />
                </div>
                {showalert && <div className='alert-container'> <i className="fa-regular fa-circle-check"></i>  {alerte} </div>}
                {showalerterror && <div className='alert-container error'> <i className="fa-regular fa-circle-xmark"></i>  {alerte} </div>}
                <button onClick={() => addbox()} className='submit-button product'> Ajouter </button>
            </form>}

            {showallboxes && <div>
                <Allboxes boxes={allboxes} />
            </div>}
        </div>
    )
}
