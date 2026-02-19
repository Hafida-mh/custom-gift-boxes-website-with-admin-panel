import React from 'react'
import '../tickets/Tickets.css'
import Barcode from 'react-barcode';
import { useState, useEffect } from 'react'
import jsPDF from "jspdf";

import Modal from 'react-bootstrap/Modal';

export default function Tickets(props) {
    const [val, setVal] = useState();
    const idStart = "b";
    const [show, setShow] = useState(false);
    console.log(JSON.parse(props.ticket[0].list))
    const hideSection = (id) => {
        const elm = document.querySelector(`#${id}`)
        elm.style.display = "none";
    }

    const hideInputBarCode = () => {
        const elm = document.querySelector('.input-barcode');
        elm.style.display = "none";
    }
    /*
    const creatCodebar = (codebar) => {
        const t = document.querySelector(`#${id}`);
        t.value = val;
        handleClose();
    }*/

    const handleGeneratePdf = () => {
		const cn = document.querySelector('.tickets-content');
		// window.print()

		const doc = new jsPDF({
			format: [2000, 1000],
			unit: 'px',
		});
		// Adding the fonts.
		doc.setFont('Inter-Regular', 'normal');
		doc.html(cn, {
			async callback(doc) {
				//doc.save('document');
				doc.output('dataurlnewwindow');
			},
		});
	};
    return (
        <div className='Ticket'>
            <div className='print-button-container'>
              <button className="print-buttton" onClick={()=> {handleGeneratePdf()}}> Imprimer</button>
              </div>
            {props.ticket && props.ticket.map((elm) => {
                return (
                    <div className='tickets-content'>
                      
                        <div className='corporateInfo'>
                            <div className='logo-tikcet'> Logo </div>
                        </div>
                        <div className='clientInfo'>
                            <div> <b> Recepteur : </b> </div>
                            <div> Nom : {elm.email} </div>
                            <div> Telephone : 0{elm.telephone} </div>
                            <div> Total : {elm.total} DZD </div>
                        </div>

                        <div className='clientInfo commande'>
                            <div> <b> Commande </b> </div>
                            {JSON.parse(elm.list).map((elemt)=> {
                                return(
                                    <div> {elemt.name} </div>
                                )
                            })}
                        </div>

                        {!elm.codebar && <div id={`${idStart + elm.id}`}>
                            <button className="disable-codebar-button" onClick={() => hideSection((idStart + elm.id))}> X </button>
                            <h5> Génerer code bare </h5>
                            <div className='input-barcode'>
                                <input className='input-codebar' onChange={(e) => setVal(e.target.value)} />
                                <button className='button-validate-codebar' onClick={() => { elm.codebar = val; setVal(""); setShow(false) }}> Valider </button>
                            </div>
                        </div>}
                        <div> {elm.codebar && <Barcode id={`${idStart + elm.id}`} value={elm.codebar || val} className="code" />}</div>
                        { }
                    </div>
                )
            })}
        </div>
    )
}
