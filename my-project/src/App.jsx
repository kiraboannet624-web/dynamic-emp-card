import { useState, useEffect } from "react";
import EmployeeCard from "./components/EmployeeCard";
import { fetchEmployees } from "./components/api";

function App() {
  const [employees, setEmployees] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const getEmployees = async () => {
      try {
        const data = await fetchEmployees();
        setEmployees(data);
      } catch  {
        setError("Error fetching employees");
      } finally {
        setLoading(false);
      }
    };

    getEmployees();
  }, []);

  if (loading) return <p>Loading employees...</p>;
  if (error) return <p>{error}</p>;
const filteredEmployees = employees.filter((employee) =>
  employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  employee.email.toLowerCase().includes(searchTerm.toLowerCase())
);
  

  return (
    <div>
      <h1>Employee Directory</h1>

      {
      filteredEmployees.map((employee) => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))}
      <input
  type="text"
  placeholder="Search by name or email..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
    </div>
    
  );
}

export default App;