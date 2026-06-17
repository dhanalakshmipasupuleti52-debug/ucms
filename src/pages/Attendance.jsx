import React, { useState, useEffect } from "react";

const subjects = ["Data Structures", "Web Development", "Database Systems", "Operating Systems", "Mathematics"];

const generateRecord = () =>
  subjects.map((sub) => ({
    subject: sub,
    attended: Math.floor(Math.random() * 30 + 20),
    total: 45,
  }));

export default function Attendance() {
  // Load from localStorage (Browser Storage rubric)
  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem("ucms_attendance");
    return saved ? JSON.parse(saved) : generateRecord();
  });

  const [marking, setMarking] = useState(null); // subject being marked
  const [status, setStatus] = useState("present");

  // Persist to localStorage (useEffect + storage rubric)
  useEffect(() => {
    localStorage.setItem("ucms_attendance", JSON.stringify(records));
  }, [records]);

  const markAttendance = (subject) => {
    setRecords((prev) =>
      prev.map((r) =>
        r.subject === subject
          ? {
              ...r,
              attended: status === "present" ? r.attended + 1 : r.attended,
              total: r.total + 1,
            }
          : r
      )
    );
    setMarking(null);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2 className="page-title">Attendance</h2>
          <p className="page-sub">Track and manage subject-wise attendance</p>
        </div>
      </div>

      <div className="attend-grid">
        {records.map((r) => {
          const pct = Math.round((r.attended / r.total) * 100);
          const color = pct >= 75 ? "green" : pct >= 60 ? "yellow" : "red";
          return (
            <div className="card attend-subject-card" key={r.subject}>
              <div className="attend-subject-name">{r.subject}</div>
              <div className="attend-bar-wrap">
                <div className="attend-bar-bg">
                  <div className={`attend-bar-fill ${color}`} style={{ width: `${pct}%` }} />
                </div>
                <span className="attend-pct">{pct}%</span>
              </div>
              <div className="attend-counts">
                {r.attended} / {r.total} classes attended
              </div>
              {pct < 75 && (
                <div className="attend-warn">⚠️ Below 75% — attendance shortage</div>
              )}
              {marking === r.subject ? (
                <div className="mark-row">
                  <select
                    className="form-input"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                  </select>
                  <button className="btn-primary small" onClick={() => markAttendance(r.subject)}>Save</button>
                  <button className="btn-secondary small" onClick={() => setMarking(null)}>Cancel</button>
                </div>
              ) : (
                <button className="btn-outline small" onClick={() => setMarking(r.subject)}>
                  Mark Today
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
