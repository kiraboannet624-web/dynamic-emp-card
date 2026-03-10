import React from "react";
import {toPng} from "html-to-image"
import { useRef } from "react";
//import Imagecmr from "../assets/Imagecrm.jpg";

function EmployeeCard({ employee }) {
  const { name, email, phone, website, company, id } = employee;

  const cardRef = useRef();

  const downloadCard = async () => {
    const dataUrl = await toPng(cardRef.current, { quality: 1.0 });

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${name}-employee-card.png`;
    link.click();
  };

  const printCard = () => {
    // Open a new window, write the card HTML into it, then print
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>${name} - Employee Card</title>
          <style>
            body { font-family: sans-serif; padding: 20px; }
            .card { border: 1px solid #ccc; border-radius: 12px; padding: 24px; max-width: 320px; }
            h2 { margin: 0 0 12px; }
            p { margin: 6px 0; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="card">
            <h2>${name}</h2>
            <p><strong>ID:</strong> ${id}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Website:</strong> ${website}</p>
            <p><strong>Company:</strong> ${company.name}</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="card" ref={cardRef}>

      <img
        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`}
        alt={name}
      />

      <h2>{name}</h2>
      <p><strong>ID:</strong> {id}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Phone:</strong> {phone}</p>
      <p><strong>Website:</strong> {website}</p>
      <p><strong>Company:</strong> {company.name}</p>

      <button onClick={downloadCard}>Download Card</button>
      <button onClick={printCard}>🖨 Print</button>

    </div>
  );
}

export default EmployeeCard;