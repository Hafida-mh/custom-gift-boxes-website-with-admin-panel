import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Product from './Product';
import ReactPaginate from 'react-paginate'
import Alert from 'react-bootstrap/Alert';
import "../product/Allproduct.css"
export default function Allproduct(props) {
  const [lengthinput, setLengthinput] = useState();
  const [nameproduct, setNameproduct] = useState("");
  const [data, setData] = useState([props.products]);
  const [products, setPorudcts] = useState([props.products])
  const [element, setElement] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => { setShow(false) };
  const [name, setName] = useState();
  const [category, setCategory] = useState("enfant");
  const [capacity, setCapacity] = useState();
  const [price, setPrice] = useState();
  const [text, setText] = useState();
  const [disponibility, setDisponibility] = useState("Disponible");
  const [size, setSize] = useState();
  const [weight, setWeight] = useState();
  const [color, setColor] = useState();
  const [id, setId] = useState();
  const [qte, setQte] = useState();
  const [alert, setAlert] = useState(false);
  const [msg, setMsg] = useState("");
  const [file, setFile] = useState();
  const [del, setDel] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;

  const pgeCnt = () => {
    if (props.products) {
      const pageCount = Math.ceil(((props.products).length) / usersPerPage);
      return pageCount
    }
  }

  const autocomplete = (nameproduct) => {
    if (nameproduct) {
      const result = data.filter((elm) => elm.name.toLowerCase().includes(nameproduct.toLowerCase()))
      setPorudcts(result)
    }
    else {
      setPorudcts(data)
    }
  }

  const updateProduct = (data) => {
    axios.post(`${process.env.REACT_APP_LINK}/product/update`, JSON.stringify(data), {
      headers: {
        'Content-Type': "application/json"
      }
    }).then((res) => {
      if (res.data.message === "Contenu mis à jour avec succés !") {
        handleClose();
        setMsg(res.data.message);
      }
      else {
        console.log("erreur")
      }
    })
    setAlert(true)
    setTimeout(() => {
      setAlert(false)
    }, 3000)
  }

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  }

  const handleShow = (elm) => {
    setShow(true);
    setName(elm.name);
    setCategory(elm.category);
    setCapacity(elm.capacity);
    setPrice(elm.price);
    setText(elm.description);
    setDisponibility(elm.availability);
    setSize(elm.length);
    setWeight(elm.weight);
    setColor(elm.color);
    setQte(elm.quantity);
    setFile(elm.img)
    console.log(elm)
  };

  const validate = () => {
    element.id = id;
    element.name = name;
    element.category = category;
    element.price = price;
    element.description = text;
    element.availability = disponibility;
    element.length = size;
    element.capacity = capacity;
    element.weight = weight;
    element.color = color;
    element.quantity = qte;
    element.img = file;
    updateProduct(element);
  }

  const getSelectValue = () => {
    var select = document.getElementById('select');
    setCategory(select.options[select.selectedIndex].text);
  }

  const uploadImgProduct = (file) => {
    const formdata = new FormData();
    formdata.append('image', file);
    axios.post(`${process.env.REACT_APP_LINK}/product/uploadimgProduct`, formdata, {}).then((res) => console.log(res));
  }

  const deleteProduct = (product_id) => {
    // const data = JSON.stringify(img_to_delete);
    axios.post(`${process.env.REACT_APP_LINK}/product/delete`, {id: product_id}
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

  const deleteProductFromScreen = (id) => {
    var position = props.products.findIndex((elm) => elm.id === id);
    if (position != -1) {
      props.products.splice(position, 1);
    }
    return data
  }

  const deleteproduct = (param) => {
    deleteProductFromScreen(param);
    deleteProduct(param);
    setDel(!del);
  }

  useEffect(() => {
    props.function()
  }, [alert])

  useEffect(() => {
    props.function()
  }, [del])

  useEffect(() => {
    autocomplete(nameproduct);
  }, [nameproduct])

  useEffect(() => {
    pgeCnt();
    setData(props.products);
    setPorudcts(props.products)
  }, [])

  return (
    <div className='allproduct-container'>
      {alert && <div> {msg} </div>}
      {alert && <Alert className='alert-message' variant="success"> {msg} </Alert>}
      <div>
        <form enctype="multipart/form-data" method="post" onSubmit={(e) => e.preventDefault()} className='form-search'>
          <input className='serach-field' placeholder='entrer le nom du produit' type="text" id="input-field" value={nameproduct} onChange={(e) => { setNameproduct(e.target.value);}} />
        </form>
      </div>
      <div className='table-allproduct'>
        <Table bordered hover className='table-show-allproduct'>
          <thead>
            <tr>
              <th className='table-header'> Nom produit </th>
              <th className='table-header'> Catégorie </th>
              <th className='table-header'> Prix produit </th>
              <th className='table-header'> Quantité </th>
              <th className='table-header'> Action </th>
            </tr>
          </thead>
          <tbody>
            {products && products.slice(pagesVisited, pagesVisited + usersPerPage).map((elm) => {
              return (
                <tr>
                  <td> {elm.name} </td>
                  <td> {elm.category} </td>
                  <td> {elm.price} </td>
                  <td> {elm.quantity} </td>
                  <td>
                    <button className="action-buttons" onClick={() => { handleShow(elm); setId(elm.id) }}> Modifier </button>
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
      {<div>
        {element && <Modal size="lg" show={show} onHide={handleClose} className='modalchangeproduct'>
          <Modal.Header closeButton>
            <Modal.Title> Modifier informations </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={(e) => e.preventDefault()} enctype="multipart/form-data">
              <div className='filds-form'>
                <label className='label'> Nom produit(*) </label>
                <input className='filds' onChange={(e) => { setName(e.target.value) }} value={name} />
              </div>
              {<div className='filds-form'>
                <label className='label'> Catégorie produit(*) </label>
                <select className='filds' name="select" id="select" onChange={() => getSelectValue()}>
                  <option value="">  Catégorie produit </option>
                  {props.allcategor.map((elm) => {
                    return (
                      <option value={elm.category}> {elm.category} </option>
                    )
                  })}
                </select>
              </div>}
              <div className='filds-form'>
                <label className='label'> Prix produit(*) </label>
                <input className='filds' onChange={(e) => { setPrice(e.target.value) }} value={price} />
              </div>
              <div className='filds-form'>
                <label className='label'> Description produit </label>
                <textarea value={text} className='filds paragraphe' rows="4" cols="5" onChange={(e) => {
                  setText(e.target.value);
                }}>
                </textarea>
              </div>
              <div className='filds-form'>
                <label className='label'> Disponibilité(*) </label>
                <div className='radio-buttons'>
                  <input name="1" type='radio' value="Disponible" onClick={(e) => { setDisponibility(e.target.value); }} />
                  <span> Disponible</span>
                </div>
                <div className='radio-buttons'>
                  <input name="1" type='radio' value="Non disponible" onClick={(e) => { setDisponibility(e.target.value); }} />
                  <span> Non disponible </span>
                </div>
                <div className='radio-buttons'>
                  <input name="1" type='radio' value="Bientôt" onClick={(e) => { setDisponibility(e.target.value); }} />
                  <span> Bientôt </span>
                </div>
              </div>
              <div className='filds-form'>
                <label className='label'> Taille disponible </label>
                <input className='filds' value={size} onChange={(e) => { setSize(e.target.value); }} />
              </div>
              <div className='filds-form'>
                <label className='label'> Dimensions </label>
                <input className='filds' value={capacity} onChange={(e) => { setCapacity(e.target.value); }} />
              </div>
              <div className='filds-form'>
                <label className='label'> Poids du produit </label>
                <input className='filds' value={weight} onChange={(e) => { setWeight(e.target.value); }} />
              </div>
              <div className='filds-form'>
                <label className='label'> Couleur produit </label>
                <input className='filds' value={color} onChange={(e) => { setColor(e.target.value); }} />
              </div>
              <div className='filds-form'>
                <label className='label'> Quantité(*) </label>
                <input className='filds' type='text' value={qte} onChange={(e) => setQte(e.target.value)} />
              </div>
              <div className='input-img-product'>
                <label for="inputfile" className='label-input-file'>
                  <div className='icon-download'> <i className='bx bx-cloud-download'></i> </div>
                  <div className='file-name'> {file && file}</div>
                  {!file && <div className='label-import-file-name'> Importer une image </div>}
                </label>
                <input
                  id="inputfile"
                  type="file"
                  name="image"
                  accept="image/png, image/gif, image/jpeg, image/webp"
                  onChange={(e) => {
                    setFile((e.target.files[0]).name);
                    uploadImgProduct(e.target.files[0])
                  }}
                  className='add-file-input'
                />
              </div>
              <button onClick={() => { validate(); }} className='submit-button-edit-product'> Enregister modifications </button>
            </form>
          </Modal.Body>
        </Modal>}
      </div>}
    </div>
  )
}
