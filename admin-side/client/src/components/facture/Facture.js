import React from 'react'
import jsPDF from "jspdf";
import { useRef } from 'react';
export default function Facture() {
    const pdfRef = useRef(null);
    const generatePdf = () => {
        var doc = new jsPDF('p', 'pt');
        const content = pdfRef.current;
        doc.html(content, {
            callback: function (doc) {
                doc.save('sample.pdf');
            }
        });
    }
  return (
    <div>
        <div ref={pdfRef}>
            helloooo Facture
        </div>
        <button onClick={() => generatePdf()}> Download PDF </button>
    </div>
  )
}
