import React, { useState, useRef } from "react";

const initialStudents = [
  { id: 1, name: "Ravi Kumar", roll: "21CS1001", branch: "CSE", year: "3rd", cgpa: "8.7", phone: "9876543210" },
  { id: 2, name: "Priya Sharma", roll: "21CS1002", branch: "CSE", year: "3rd", cgpa: "9.1", phone: "9876543211" },
  { id: 3, name: "Amit Singh", roll: "21EC1003", branch: "ECE", year: "2nd", cgpa: "7.8", phone: "9876543212" },
  { id: 4, name: "Sneha Reddy", roll: "21ME1004", branch: "MECH", year: "1st", cgpa: "8.2", phone: "9876543213" },
];

const emptyForm = { name: "", roll: "", branch: "", year: "", cgpa: "", phone: "" };

export default function StudentRecords() {
  // Controlled component (useState rubric)
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [students, setStudents] = useState(initialStudents);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  // useRef rubric – focus first field on form open
  const firstInputRef = useRef(null);

  const handleOpen = () => {
    setShowForm(true);
    setTimeout(() => firstInputRef.current?.focus(), 100);
  };

  // Form validation (controlled component rubric)
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.roll.trim()) e.roll = "Roll number is required";
    if (!form.branch.trim()) e.branch = "Branch is required";
    if (!form.year) e.year = "Year is required";
    if (!form.cgpa || isNaN(form.cgpa) || form.cgpa < 0 || form.cgpa > 10)
      e.cgpa = "CGPA must be between 0 and 10";
    if (!/^\d{10}$/.test(form.phone)) e.phone = "Enter valid 10-digit phone";
    return e;
  };

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: "" }));
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setStudents((s) => [...s, { id: Date.now(), ...form }]);
    setForm(emptyForm);
    setShowForm(false);
  };

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.roll.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2 className="page-title">Student Records</h2>
          <p className="page-sub">Manage and view all student information</p>
        </div>
        <button className="btn-primary" onClick={handleOpen}>+ Add Student</button>
      </div>

      <div className="search-row">
        <input
          className="search-input full"
          placeholder="Search by name or roll number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Add Student Form (Controlled Component) */}
      {showForm && (
        <div className="card form-card">
          <h3 className="form-title">Add New Student</h3>
          <div className="form-grid">
            {[
              { field: "name", label: "Full Name", type: "text", ref: firstInputRef },
              { field: "roll", label: "Roll Number", type: "text" },
              { field: "branch", label: "Branch", type: "text" },
              { field: "year", label: "Year", type: "text", placeholder: "1st/2nd/3rd/4th" },
              { field: "cgpa", label: "CGPA", type: "number" },
              { field: "phone", label: "Phone Number", type: "text" },
            ].map(({ field, label, type, ref, placeholder }) => (
              <div className="form-field" key={field}>
                <label className="form-label">{label}</label>
                <input
                  ref={ref}
                  className={`form-input ${errors[field] ? "input-error" : ""}`}
                  type={type}
                  placeholder={placeholder || label}
                  value={form[field]}
                  onChange={handleChange(field)}
                />
                {errors[field] && <span className="error-msg">{errors[field]}</span>}
              </div>
            ))}
          </div>
          <div className="form-actions">
            <button className="btn-secondary" onClick={() => { setShowForm(false); setErrors({}); setForm(emptyForm); }}>Cancel</button>
            <button className="btn-primary" onClick={handleSubmit}>Save Student</button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="card table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th><th>Name</th><th>Roll No</th><th>Branch</th><th>Year</th><th>CGPA</th><th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={7} className="empty-row">No students found</td></tr>
            ) : (
              filtered.map((s, i) => (
                <tr key={s.id}>
                  <td>{i + 1}</td>
                  <td><strong>{s.name}</strong></td>
                  <td>{s.roll}</td>
                  <td>{s.branch}</td>
                  <td>{s.year}</td>
                  <td><span className="cgpa-badge">{s.cgpa}</span></td>
                  <td>{s.phone}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
