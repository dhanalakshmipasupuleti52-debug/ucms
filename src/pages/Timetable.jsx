// ── Timetable ──────────────────────────────────────────────────────────────
import React from "react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const schedule = {
  Monday:    ["Data Structures / Dr. Smith / Rm 101", "Web Development / Prof. Johnson / Lab 2", "—", "OS / Prof. Brown / Rm 105"],
  Tuesday:   ["DBMS / Dr. Williams / Rm 203", "—", "Mathematics / Prof. Rao / Rm 301", "Web Dev Lab / Prof. Johnson / Lab 2"],
  Wednesday: ["Data Structures / Dr. Smith / Rm 101", "DBMS / Dr. Williams / Rm 203", "OS / Prof. Brown / Rm 105", "—"],
  Thursday:  ["Mathematics / Prof. Rao / Rm 301", "Web Development / Prof. Johnson / Lab 2", "—", "Data Structures Lab / Dr. Smith / Lab 1"],
  Friday:    ["OS / Prof. Brown / Rm 105", "Mathematics / Prof. Rao / Rm 301", "DBMS / Dr. Williams / Rm 203", "—"],
};
const slots = ["09:00 – 10:00", "10:15 – 11:15", "11:30 – 12:30", "02:00 – 03:00"];

export function Timetable() {
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2 className="page-title">Timetable</h2>
          <p className="page-sub">Weekly class schedule</p>
        </div>
      </div>
      <div className="card table-card overflow-x">
        <table className="data-table tt-weekly">
          <thead>
            <tr>
              <th>Time</th>
              {days.map((d) => <th key={d}>{d}</th>)}
            </tr>
          </thead>
          <tbody>
            {slots.map((slot, si) => (
              <tr key={si}>
                <td className="slot-time">{slot}</td>
                {days.map((d) => {
                  const cell = schedule[d][si];
                  return (
                    <td key={d} className={cell === "—" ? "empty-cell" : "class-cell"}>
                      {cell !== "—" ? (
                        <>
                          <div className="class-name">{cell.split(" / ")[0]}</div>
                          <div className="class-meta">{cell.split(" / ").slice(1).join(" • ")}</div>
                        </>
                      ) : "—"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
