import React, { useEffect } from 'react'
import axios from 'axios'
import { useState} from 'react'
export default function Formrequest(props) {
    const [file, setFile] = useState();

    const sendimg = (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('image', file);
        axios.post(`${process.env.REACT_APP_LINK}/upload/up`, formdata, {}).then(res => console.log(res));
    }
  return (
    <div>
        <form onSubmit={(e) => sendimg(e)}>
            <input type='file' name='image' onChange={(e) => setFile(e.target.files[0])}/>
            <button type='submit'> valider </button>
        </form>
        <div> {props.ss}</div>
    </div>
  )
}
