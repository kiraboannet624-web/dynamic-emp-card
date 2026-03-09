function EmployeeCard({ employee }) {
  const { id, name, email, phone, website, company } = employee;

  return (
    <div>
      <h3>{name}</h3>
      <p>ID: {id}</p>
      <p>Email: {email}</p>
      <p>Phone: {phone}</p>
      <p>Website: {website}</p>
      <p>Company: {company?.name}</p>
    </div>
  );
}

export default EmployeeCard;