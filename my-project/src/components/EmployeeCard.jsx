function EmployeeCard({ employee }) {
  const { name, email, phone, website, company, id } = employee;

  return (
    <div className="card">
      <h2>{name}</h2>
      <p><strong>ID:</strong> {id}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Phone:</strong> {phone}</p>
      <p><strong>Website:</strong> {website}</p>
      <p><strong>Company:</strong> {company.name}</p>
    </div>
  );
}

export default EmployeeCard;