import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
export default function DeleteBestProduct() {
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [del, setDel] = useState(false);
    const [products, setProducts] = useState([]);
    const getAllProuct = () => {
        const r = axios.get(`${process.env.REACT_APP_LINK}/bestseller/getAllProuct`).then((res) => {
            setShow(true)
         const obj = (res.data.data).length;
         for (let i = 0; i <= obj-1; i++) {
             data.push((res.data.data)[i]);
         }
     })}
     getAllProuct();

     const deleteProduct = (id) => {
        axios.post(`${process.env.REACT_APP_LINK}/bestseller/deleteProduct`, JSON.stringify({id: id}), {
            headers: {
                'Content-Type': "application/json"
            }
        });
     }

     const deleteProductFromScreen = (id) => {
        var position = data.findIndex((elm) => elm.id === id );
        if(position !== -1) {
           data.splice(position,1);
        }
    }

        const deleteProducts = (id) => {
            deleteProduct(id)
            deleteProductFromScreen(id);
            setDel(!del)
        }
        
     useEffect(()=> {
        setProducts(data)
     }, [del])

  return (
    <div>
        <h1> Delete Best Seller </h1>
        <button onClick={()=> getAllProuct()}> cl </button>
        { products && products.map((elm)=> { return(
        <div style={{"border":"1px solid red", "height":"200px", "width":"300px", "objectFit": "cover"}}>
            <img src={`${process.env.REACT_APP_LINK}/productsimg/${elm.filename}`}/>
            <button onClick={() => deleteProducts(elm.id)}> X </button>
        </div>

        )})}
    </div>
  )
}
