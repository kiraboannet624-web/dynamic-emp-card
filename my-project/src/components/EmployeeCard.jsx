 
import html2canvas from "html2canvas";
import { useRef } from "react";
import cmr from "../assets/crm.jpg";

function EmployeeCard({ employee }) {
  const { name, email, phone, website, company, id } = employee;

  const cardRef = useRef();

  const downloadCard = async () => {
    const canvas = await html2canvas(cardRef.current);
    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = image;
    link.download = `${name}-employee-card.png`;
    link.click();
  };

  return (
    <div className="card" ref={cardRef}>
      <h2>{name}</h2>
      <p><strong>ID:</strong> {id}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Phone:</strong> {phone}</p>
      <p><strong>Website:</strong> {website}</p>
      <p><strong>Company:</strong> {company.name}</p>

      <button onClick={downloadCard}>Download Card</button>
    </div>
  );
}

export default EmployeeCard;