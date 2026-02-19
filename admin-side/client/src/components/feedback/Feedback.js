import React from 'react'
import '../feedback/Feedback.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
export default function Feedback() {
    const [name_client, setNameClient] = useState();
    const [opinion, setOpinion] = useState();

    const postFeedback = () => {
        axios.post(`${process.env.REACT_APP_LINK}/feedback/post`, JSON.stringify({ 
            id :  uuidv4(),
            name : name_client,
            opinion : opinion
        }), {
            headers: {
                'Content-Type': "application/json"
            }
        })
    }

  return (
    <div>
        <form onSubmit={(e) => e.preventDefault()}>
            <label> Entrer nom client </label>
            <input value={name_client} onChange={(e) =>  setNameClient(e.target.value)}/>
            <label> Entrer témoignage </label>
            <input value={opinion} onChange={(e) => setOpinion(e.target.value)}/>
            <button onClick={() =>  postFeedback()}> Valider </button>
        </form>
    </div>
  )
}
