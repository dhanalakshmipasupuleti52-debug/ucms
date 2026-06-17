import React, { useState } from "react";

const results = [
  { subject: "Data Structures", credits: 4, grade: "A", points: 10, score: 92 },
  { subject: "Web Development", credits: 3, grade: "B+", points: 9, score: 86 },
  { subject: "Database Systems", credits: 4, grade: "A-", points: 9, score: 88 },
  { subject: "Operating Systems", credits: 3, grade: "B", points: 8, score: 82 },
  { subject: "Mathematics III", credits: 4, grade: "A+", points: 10, score: 96 },
];

const gradeColor = { "A+": "green", A: "green", "A-": "teal", "B+": "blue", B: "blue", "B-": "yellow", C: "orange" };

export default function ResultsDashboard() {
  const [semester, setSemester] = useState("Semester 2 – 2024");
  const totalCredits = results.reduce((a, r) => a + r.credits, 0);
  const sgpa = (results.reduce((a, r) => a + r.credits * r.points, 0) / totalCredits).toFixed(2);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2 className="page-title">Results Dashboard</h2>
          <p className="page-sub">View your academic performance</p>
        </div>
        <select className="form-input" style={{ width: "auto" }} value={semester} onChange={(e) => setSemester(e.target.value)}>
          <option>Semester 2 – 2024</option>
          <option>Semester 1 – 2023</option>
        </select>
      </div>

      {/* SGPA banner */}
      <div className="sgpa-banner">
        <div className="sgpa-main">
          <span className="sgpa-label">SGPA</span>
          <span className="sgpa-value">{sgpa}</span>
        </div>
        <div className="sgpa-sub">Semester: {semester}</div>
        <div className="sgpa-sub">Total Credits: {totalCredits}</div>
      </div>

      <div className="card table-card">
        <table className="data-table">
          <thead>
            <tr><th>Subject</th><th>Credits</th><th>Score</th><th>Grade</th><th>Grade Points</th></tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={i}>
                <td><strong>{r.subject}</strong></td>
                <td>{r.credits}</td>
                <td>
                  <div className="score-bar-wrap">
                    <div className="score-bar-bg">
                      <div className="score-bar-fill" style={{ width: `${r.score}%` }} />
                    </div>
                    <span>{r.score}/100</span>
                  </div>
                </td>
                <td><span className={`grade-badge grade-${gradeColor[r.grade] || "blue"}`}>{r.grade}</span></td>
                <td>{r.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
