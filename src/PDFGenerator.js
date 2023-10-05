import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import printerIcon from './assets/printer.png'
import GraphComponent from './GraphComponent';

const PDFGenerator = () => {
  const handleGeneratePDF = () => {
    // const doc = new jsPDF();
    // const canvas = document.querySelector('canvas');

    // const imageData = canvas.toDataURL('image/png');
    // doc.addImage(imageData, 'PNG', 10, 10, 180, 100);
    // doc.save('graph.pdf');

    const divToPrint = document.getElementById('graph'); // Replace 'divId' with the ID of the div you want to print

    html2canvas(divToPrint)
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'px', 'a4'); // Set the document size to A4
            const pdfWidth = pdf.internal.pageSize.getWidth(); // Get the width of the PDF document
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width; // Calculate the proportional height

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight); // Set the width and height to match the PDF document
            pdf.save('output.pdf');
        })
        .catch((error) => {
        console.error('Error generating PDF:', error);
        });
  };

  return (
    <div className='h-[100vh] flex flex-col items-center justify-center'>
        <GraphComponent />
        <div className='px-4 py-2 cursor-pointer rounded-xl bg-[#090E24] flex items-center space-x-2' onClick={handleGeneratePDF}>
            <img alt='' src={printerIcon} />
            <span className='text-white'>Print</span>
        </div>
    </div>
  );
};

export default PDFGenerator;