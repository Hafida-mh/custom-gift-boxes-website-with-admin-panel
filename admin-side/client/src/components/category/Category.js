import React from 'react'
import '../category/Category.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';

export default function Category(props) {
    const [category, setCategory] = useState();
    const [file, setFile] = useState("");
    const [id, setId] = useState(uuidv4())
    const [del, setDel] = useState(false);
    const [alert, setAlert] = useState(false);
    const [categories, setAllCategories] = useState(props.categories);
    const [c, setC] = useState()
    // ADD CATEGORY 
    const addCategory = () => {
        setAlert(true);
        axios.post(`${process.env.REACT_APP_LINK}/category/add`, JSON.stringify({
            category: category,
            id: id,
            icon: file.name
        }), {
            headers: {
                'Content-Type': "application/json"
            }
        }).then((res) => setCategory(""))

    }

    //  DELETE CATEGORY 
    const deleteCategories = (id) => {
        // const data = JSON.stringify(img_to_delete);
        axios.post(`${process.env.REACT_APP_LINK}/category/delete`, { id: id }
            , {
                headers: {
                    'Content-Type': "application/json"
                }
            })
    }

    const deleteCategoriesFromScreen = (id) => {
        var position = props.categories.findIndex((elm) => elm.id === id);
        if (position != -1) {
            props.categories.splice(position, 1);
        }
        //console.log(data)
    }

    const deleteCategory = (param) => {
        setAlert(false)
        deleteCategoriesFromScreen(param);
        deleteCategories(param);
        setDel(!del);
    }

    const uploadImgProduct = (file) => {
        const formdata = new FormData();
        formdata.append('image', file);
        axios.post(`${process.env.REACT_APP_LINK}/category/uploadimgcategory`, formdata, {}).then((res) => console.log(res));
      }

    // DELETE CATEGORIES 
    useEffect(() => {
        setAllCategories(props.categories);
    }, [del])


    useEffect(() => {
        if (alert) {
            props.categories.push({ category: category, id: id });
            setAllCategories(props.categories)
        }
    }, [alert])

    return (
        <div className='Catégory'>
            <form onSubmit={(e) => e.preventDefault()} className='form-category'>
                <div className='filds-form category-filds'>
                    <label className='label categorie'> Ajouter une nouvelle catégorie </label>
                    <input className='filds input-category' type="text" placeholder='Taper le nom de la catégorie' value={category} onChange={(e) => { setCategory(e.target.value); setAlert(false) }} />
                    <button className='submit-button category' onClick={() => { addCategory(); setId(uuidv4()); setAlert(true) }}> Valider </button>
                </div>
                <div className='input-img-product img-file'>
                    <label htmlFor="inputfile" className='label-input-file'>
                        <div className='icon-download'> <i className='bx bx-cloud-download'></i> </div>
                        <div className='file-name'> {file && file.name}</div>
                        {!file && <div className='label-import-file-name'> Importer une image (H : 30px  W : 30px) </div>}
                    </label>
                    <input
                        id="inputfile"
                        type="file"
                        accept="image/png, image/gif, image/jpeg, image/webp"
                        name="image"
                        onChange={(e) => {
                            setFile(e.target.files[0]);
                            uploadImgProduct(e.target.files[0])
                        }}
                        className='add-file-input'
                    />
                </div>
            </form>
            <h1 className='main-title'> Toutes les catégories </h1>
            {c}
            <div className='all-buttons'>
                {
                    props.categories && props.categories.map((elm) => {
                        return (
                            <button className='all-categories-buttons'>
                                <img
                                    src={`${process.env.REACT_APP_LINK}/uploads/${elm.photo}`}
                                    alt="icone category"
                                    className='icon-category' />
                                {elm.category}
                                <span onClick={() => { deleteCategory(elm.id); setAlert(false); console.log(elm.id) }}> x </span>
                            </button>

                        )
                    })
                }

            </div>
        </div>
    )
}
