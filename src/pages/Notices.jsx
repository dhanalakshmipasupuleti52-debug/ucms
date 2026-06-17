import React from "react";
import { useApp } from "../context/AppContext";

export default function Notices() {
  const { notices } = useApp();
  return (
    <div className="page">
      <div className="page-header">
        <div><h2 className="page-title">Notices</h2><p className="page-sub">Official college announcements</p></div>
      </div>
      <div className="notice-list">
        {notices.map((n) => (
          <div className={`card notice-card ${n.urgent ? "urgent" : ""}`} key={n.id}>
            <div className="notice-top">
              {n.urgent && <span className="urgent-badge">URGENT</span>}
              <span className="notice-date">{n.date}</span>
            </div>
            <div className="notice-title">{n.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
