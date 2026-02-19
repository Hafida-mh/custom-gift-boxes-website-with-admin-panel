import React from 'react'
import '../command/Facture.css'
import jsPDF from 'jspdf';
import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import Logo from '../../images/logo-mabox.jpg'
export default function Facture(props) {
	// const cn =  document.querySelector('.Facture');
	const [id_facture, setIdfacture] = useState(uuidv4());
	const [qute, setQute] = useState(1);
	const [totalnet, setTotalNet] = useState();

	const invoiceNumber = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1) + min)
	}

	const printBill = () => {
		window.print();
	}

	const handleGeneratePdf = () => {
		const cn = document.querySelector('.facture-container');
		// window.print()
		const doc = new jsPDF({
			format: [1010, 792],
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

	const totalNet = (a, b) => {
		const sum = 0;
		sum = sum + a * b;
		setTotalNet(sum)
		return sum
	}

	return (
		<div className='Facture'>
			<div className='action-section'>
				<button className="print-buttton" onClick={handleGeneratePdf}> Imprimer </button>
			</div>
			<div className='facture-container'>
				<div className='first-section'>
					<div className='logo-facture'> 
					<img src={Logo} />
					</div>
					<div className='infos-container'>
						<div className='info-client'>
							<div> <h4> Coordonnées client </h4></div>
							<div> <b> Nom : </b> {props.name} </div>
							<div> <b> Adresse : </b>  {props.address} </div>
							<div> <b> Email :  </b>{props.email} </div>
							<div> <b> Téléphone : </b> {props.tel} </div>
							<div> <b> Wilaya: </b> {props.wilaya} </div>
						</div>
						<div className='info-company'>
							<div> <h4> Coordonnées entreprise </h4></div>
							<div> <b> Nom : </b> Ma Box Algérie </div>
							<div> <b> Téléphone : </b>  0770 42 27 01 </div>
						</div>
					</div>
				</div>

				<div className='Ttile-facture'> <h2> Facture N°{invoiceNumber(1, 10000)} </h2> </div>
				<div className='table-billing'>
					<Table bordered hover>
						<thead>
							<tr>
								<th> Articles </th>
								<th> Quantité </th>
								<th> Prix </th>
							</tr>
						</thead>
						<tbody>
							{props.list && props.list.map((elm) => {
								return (
									<tr key={elm.id}>
										<td>{elm.name}</td>
										<td>{elm.qte}</td>
										<td>{props.total}</td>
									</tr>
								)
							})}
							<tr>
								<td></td>
								<td> Total Net(Da)</td>
								<td> {props.total} </td>
							</tr>
							<tr>
								<td></td>
								<td> TVA (19%) </td>
								<td> {props.totaltva} </td>
							</tr>
							<tr>
								<td></td>
								<td> TTC (Da)</td>
								<td> {props.ttc} </td>
							</tr>
						</tbody>
					</Table>
				</div>
				<div className='billing-text'>
					Le paiement peut sefaire en espece ou par chèque.
				</div>
			</div>
		</div>
	)
}

