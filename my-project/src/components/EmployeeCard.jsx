function EmployeeCard({ employee }) {
  const { id, name, email, phone, website, company } = employee;

  return (
    <div className="card">
      <h3>{name}</h3>
      <p><strong>ID:</strong> {id}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Phone:</strong> {phone}</p>
      <p><strong>Website:</strong> {website}</p>
      <p><strong>Company:</strong> {company.name}</p>
    </div>
  );
}

export default EmployeeCard;