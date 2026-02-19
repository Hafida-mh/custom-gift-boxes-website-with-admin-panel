import React from 'react'
import axios from 'axios'
import DeleteSlide from './DeleteSlide';
import '../slide/Slide.css'
import Alert from 'react-bootstrap/Alert';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import PresentationHome from '../Presentation/PresentationHome';
import Dropdown from 'react-bootstrap/Dropdown';
import Feedback from '../feedback/Feedback';
import Home from '../home/Home';
import Navalert from '../navalert/Navalert';
import Newsletter from '../newsletter/Newsletter';
import Formrequest from './Formrequest';
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
export default function Slide() {
  const [file, setFile] = useState("");
  let [text_slide, setText] = useState("");
  const [title_slide, setTitle] = useState("Ajouter un slide");
  const [titleslide, setTitleslide] = useState("");
  const [show_button, setShowbutton] = useState(false);
  const [show, setShow] = useState(false);
  const [showfeedback, setShowfeedback] = useState(false);
  const [shownnewsletter, setShowNewsletter] = useState(false);
  const [show_slide, setShowSlide] = useState(true);
  const [show_presentation, setShowPresentation] = useState(false);
  const [show_delete_slide, setDeleteSlide] = useState(false);
  const [alerte, setAlerte] = useState("");
  const [linkButton, setLinkbutton] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [showalert, setShowalert] = useState(false);
  const [showalerterror, setShowalerterror] = useState(false);
  const [slides, setSlides] = useState();
  const [allData, setAlldata] = useState({
    id: uuidv4(),
    file: "",
    text: "",
    title: "",
    showbutton: show_button,
    linkButton: ""
  });

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Le texte à insérer doit avoir 155 caractéres !
    </Tooltip>
  );

  const renderTooltipImg = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      La hauteur de l'image du slide doit être de 672 px
    </Tooltip>
  );

  const saveSlide = (e) => {
    e.preventDefault();
    if (file) {
      uploadImg()
      axios.post(`${process.env.REACT_APP_LINK}/upload/uploadSlidePhoto`, JSON.stringify(allData), {
        headers: {
          'Content-Type': "application/json"
        }
      }).then((res) => {
        setAlerte(res.data.message);
        disapearAlert(res.data.message);
        setFile("");
        setText("");
        setTitleslide("");
      });
    }
    else {
      setAlerte("Veuillez insérer une image au slide");
      setShowalerterror(true)
      setTimeout(() => {
        setShowalerterror(false)
      }, 2300)
    }
  }

  const getImg = (e) => {
    axios.get(`${process.env.REACT_APP_LINK}/upload/getSlide`).then((res) => {
      if ((res.data.data).length === 0) {
        setError(true);
      }
      else {
        for (let i = 0; i <= ((res.data.data).length) - 1; i++) {
          const element = (res.data).data[i];
          data.push(element);

        }
        setSlides(data);
        setShow(true);
      }
    })
  }

  const uploadImg = () => {
    const formdata = new FormData();
    formdata.append('image', file);
    axios.post(`${process.env.REACT_APP_LINK}/upload/uploadimg`, formdata, {}).then((res) => console.log(res));
  }

  const disapearAlert = (msg) => {
    if (msg === "Slide ajouté avec succés !") {
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
  useEffect(() => {
    setAlldata({
      id: uuidv4(),
      file: file.name,
      text: text_slide,
      title: titleslide,
      showbutton: show_button,
      linkButton: linkButton
    })
  }, [file, text_slide, titleslide, show_button, linkButton]);

  return (
    <div className='slide'>
      <div className='navigation-bar'>
        <Home />
      </div>
      <div className='slide-container'>
        <div> <Navalert /> </div>
        <h1 className='title-slide-comp'>
          <i className='bx bx-sidebar' id="icon-dashbord"></i>
          {title_slide}
        </h1>
        <div className='dropdown-button'>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
              <i className="fa-solid fa-bars"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1" onClick={() => { setTitle("Ajouter un slide"); setShowPresentation(false); setDeleteSlide(false); setShowSlide(true); setShowfeedback(false); setShowNewsletter(false) }}> Ajouter un slide </Dropdown.Item>
              <Dropdown.Item onClick={() => { setTitle("Supprimer des slides"); setShowPresentation(false); setDeleteSlide(true); setShowSlide(false); getImg(); setShowfeedback(false); setShowNewsletter(false) }}> Supprimer des slides </Dropdown.Item>
              <Dropdown.Item onClick={() => { setTitle(" Modifier la présenation"); setShowPresentation(true); setDeleteSlide(false); setShowSlide(false); setShowfeedback(false); setShowNewsletter(false) }}> Gérer la présenation </Dropdown.Item>
              <Dropdown.Item onClick={() => { setTitle("Email abonnés"); setShowPresentation(false); setDeleteSlide(false); setShowSlide(false); setShowfeedback(false); setShowNewsletter(true) }}> Newsletter </Dropdown.Item>

            </Dropdown.Menu>
          </Dropdown>
        </div>
        {show_slide && <div>
          <div>
            {show && <Alert className='alert-message' variant="success"> {alerte} </Alert>}
          </div>
          <form className='form-slide' encType="multipart/form-data" onSubmit={(e) => saveSlide(e)}>
            <div className='filds-form'>
              <input placeholder='Titre slide (taille maximale' maxLength="38" className='filds slide' rows="4" cols="50" onChange={(e) => { setTitleslide(e.target.value) }} />
            </div>

            <div className='filds-form text-slide'>
              <textarea placeholder='Texte slide (Taille maximale 100 caractéres)' maxLength="100" className='filds paragraphe' rows="4" cols="5" onChange={(e) => {
                setText(e.target.value);
              }}>
              </textarea>
            </div>

            <div className='filds-form'>
              <input placeholder='Insérer lien bouton' className='filds slide' name="link" onChange={(e) => setLinkbutton(e.target.value)} />
            </div>
            <div className='filds-form'>
              <div className='filedownload-section'>
                <label htmlFor="inputfile" className='label-input-file slide'>
                  <div className='icon-download'>
                    <i className='bx bx-cloud-download'></i>
                  </div>
                  <div> {file && file.name}</div>
                  {!file && <div className='title-label'> Importer une image (H : 650px, W : 1920px) </div>}
                </label>
                <input
                  id="inputfile"
                  type="file"
                  name="image"
                  accept="image/png, image/gif, image/jpeg, image/webp"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                    console.log(e.target.files[0].name)
                    setAlldata({
                      file: e.target.files[0].name
                    })
                  }}
                />
              </div>
            </div>
            <div>
              {showalert && <div className='alert-container'> <i className="fa-regular fa-circle-check"></i>  {alerte} </div>}
              {showalerterror && <div className='alert-container error'> <i className="fa-regular fa-circle-xmark"></i>  {alerte} </div>}
              <button className='submit-button' type='submit' /*</form>onClick={()=> saveImg()}*/> Enregistrer </button>
            </div>
          </form>
        </div>}

        {show_presentation &&
          <div>
            <PresentationHome />
          </div>
        }

        {
          show_delete_slide &&
          <div>
            <DeleteSlide />
          </div>
        }

{ shownnewsletter && <div> 
  <Newsletter />
  </div>}
      </div>
    </div>
  )
}
