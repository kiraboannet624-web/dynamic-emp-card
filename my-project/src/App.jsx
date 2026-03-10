import React from "react";
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
      } catch {
        setError("Error fetching employees");
      } finally {
        setLoading(false);
      }
    };
    getEmployees();
  }, []);

  // Loading state — spinning circle
  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        {/* Spinner: a circle with only one colored border side, animated to rotate */}
        <div className="w-12 h-12 border-4 border-slate-200 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-500 font-medium">Loading employees…</p>
      </div>
    </div>
  );

  // Error state
  if (error) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="bg-red-50 border border-red-200 rounded-xl px-8 py-6 text-red-700 font-medium">
        ⚠️ {error}
      </div>
    </div>
  );

  // Filter employees based on search
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    // Full page wrapper — light gray background
    <div className="min-h-screen bg-slate-50">

      {/* ── Header ── */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          
          {/* Title */}
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              👥 Employee Directory
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Showing <span className="font-semibold text-indigo-600">{filteredEmployees.length}</span> of{" "}
              <span className="font-semibold">{employees.length}</span> employees
            </p>
          </div>

          {/* Print All button */}
          <button
            onClick={() => window.print()}
            className="self-start sm:self-auto px-5 py-2.5 rounded-xl border-2 border-slate-200 text-slate-600 text-sm font-semibold hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
          >
            🖨 Print All Cards
          </button>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Search bar */}
        <div className="relative mb-8 max-w-md">
          {/* Search icon inside the input */}
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base">🔍</span>
          <input
            type="text"
            placeholder="Search by name or email…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-slate-200 bg-white text-slate-800 placeholder-slate-400 text-sm font-medium focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all shadow-sm"
          />
        </div>

        {/* Empty search result */}
        {filteredEmployees.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg font-semibold">No employees found</p>
            <p className="text-sm mt-1">Try searching with a different name or email</p>
          </div>
        )}

        {/* 
          Card grid:
          - 1 column on mobile
          - 2 columns on medium screens  
          - 3 columns on large screens
          gap-6 = space between cards
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEmployees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;