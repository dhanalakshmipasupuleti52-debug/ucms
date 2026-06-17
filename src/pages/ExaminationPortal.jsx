import React, { useState } from "react";

const exams = [
  { id: 1, subject: "Data Structures", date: "May 28, 2024", time: "10:00 AM – 01:00 PM", room: "Hall A", type: "End Sem", status: "upcoming" },
  { id: 2, subject: "Database Systems", date: "May 30, 2024", time: "10:00 AM – 01:00 PM", room: "Hall B", type: "End Sem", status: "upcoming" },
  { id: 3, subject: "Operating Systems", date: "June 03, 2024", time: "10:00 AM – 01:00 PM", room: "Hall A", type: "End Sem", status: "upcoming" },
  { id: 4, subject: "Web Development", date: "April 10, 2024", time: "10:00 AM – 01:00 PM", room: "Lab 2", type: "Mid Sem", status: "completed" },
  { id: 5, subject: "Mathematics", date: "April 12, 2024", time: "10:00 AM – 01:00 PM", room: "Hall C", type: "Mid Sem", status: "completed" },
];

export default function ExaminationPortal() {
  const [filter, setFilter] = useState("all");
  const filtered = exams.filter((e) => filter === "all" || e.status === filter);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2 className="page-title">Examination Portal</h2>
          <p className="page-sub">View your exam schedule and hall tickets</p>
        </div>
      </div>

      <div className="filter-row">
        {["all", "upcoming", "completed"].map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="exam-list-grid">
        {filtered.map((e) => (
          <div className="card exam-detail-card" key={e.id}>
            <div className="exam-top">
              <span className={`exam-status-badge ${e.status}`}>{e.status}</span>
              <span className="exam-type-badge">{e.type}</span>
            </div>
            <h3 className="exam-detail-subject">{e.subject}</h3>
            <div className="exam-detail-meta">
              <div>📅 {e.date}</div>
              <div>🕐 {e.time}</div>
              <div>📍 {e.room}</div>
            </div>
            {e.status === "upcoming" && (
              <button className="btn-outline small" style={{ marginTop: "0.75rem" }}>
                Download Hall Ticket
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
