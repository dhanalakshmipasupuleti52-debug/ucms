import React from "react";
import { NavLink } from "react-router-dom";

// ── PRESENTER: pure UI, no logic ────────────────────────────────────────────
export function SidebarPresenter({ student, isOpen, onToggle }) {
  const navItems = [
    { to: "/", icon: "⊞", label: "Dashboard" },
    { to: "/students", icon: "👤", label: "Student Records" },
    { to: "/attendance", icon: "📅", label: "Attendance" },
    { to: "/timetable", icon: "🕐", label: "Timetable" },
    { to: "/exams", icon: "📝", label: "Examination Portal" },
    { to: "/results", icon: "📊", label: "Results Dashboard" },
    { to: "/messages", icon: "✉️", label: "Messages" },
    { to: "/notices", icon: "🔔", label: "Notices" },
    { to: "/settings", icon: "⚙️", label: "Settings" },
  ];

  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon">🏛️</div>
        {isOpen && (
          <div className="logo-text">
            <span className="logo-title">UCMS</span>
            <span className="logo-sub">University Campus<br />Management System</span>
          </div>
        )}
        <button className="toggle-btn" onClick={onToggle} aria-label="Toggle sidebar">
          {isOpen ? "◀" : "▶"}
        </button>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            <span className="nav-icon">{item.icon}</span>
            {isOpen && <span className="nav-label">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Profile */}
      {isOpen && (
        <div className="sidebar-profile">
          <div className="profile-avatar">{student.avatar}</div>
          <div className="profile-info">
            <div className="profile-name">{student.name}</div>
            <div className="profile-branch">{student.branch}</div>
            <div className="profile-roll">{student.rollNo}</div>
          </div>
        </div>
      )}
    </aside>
  );
}
