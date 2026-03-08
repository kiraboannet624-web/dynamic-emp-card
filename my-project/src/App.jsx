import { useState, useEffect } from "react";
import EmployeeCard from "./components/EmployeeCard";
import { fetchEmployees } from "./services/api";

function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const data = await fetchEmployees();
        setEmployees(data);
      } 
      catch  {
        setError("Error fetching employees");
      } finally {
        setLoading(false);
      }
    
    };
  
    getEmployees();
  }, []);

  if (loading) return <p>Loading employees...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Employee Directory</h1>

      {employees.map((employee) => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))}
    </div>
  );
}

export default App;