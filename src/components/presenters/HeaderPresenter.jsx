import React from "react";

export function HeaderPresenter({ student, searchVal, onSearchChange, theme, onToggleTheme }) {
  return (
    <header className="topbar">
      <h1 className="topbar-title">University Campus Management System</h1>

      <div className="topbar-right">
        {/* Search – uncontrolled feel but bound via props (controlled) */}
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search anything..."
            value={searchVal}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
        </div>

        <button className="theme-toggle" onClick={onToggleTheme} title="Toggle theme">
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        <div className="notif-btn">🔔 <span className="badge">3</span></div>

        <div className="user-chip">
          <div className="user-avatar">{student.avatar}</div>
          <span>{student.name}</span>
        </div>
      </div>
    </header>
  );
}
