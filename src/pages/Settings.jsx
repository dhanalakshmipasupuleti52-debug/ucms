import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";

export default function Settings() {
  const { theme, toggleTheme, student } = useApp();

  // Controlled form for profile edit
  const [profile, setProfile] = useState({
    name: student.name,
    email: "john.doe@university.edu",
    phone: "9876543210",
  });
  const [saved, setSaved] = useState(false);

  // Persist profile to localStorage
  useEffect(() => {
    const stored = localStorage.getItem("ucms_profile");
    if (stored) setProfile(JSON.parse(stored));
  }, []);

  const handleSave = () => {
    localStorage.setItem("ucms_profile", JSON.stringify(profile));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2 className="page-title">Settings</h2>
          <p className="page-sub">Manage your account preferences</p>
        </div>
      </div>

      {/* Profile */}
      <div className="card settings-card">
        <h3 className="settings-section-title">Profile Information</h3>
        <div className="form-grid">
          {[
            { field: "name", label: "Full Name" },
            { field: "email", label: "Email", type: "email" },
            { field: "phone", label: "Phone" },
          ].map(({ field, label, type = "text" }) => (
            <div className="form-field" key={field}>
              <label className="form-label">{label}</label>
              <input
                className="form-input"
                type={type}
                value={profile[field]}
                onChange={(e) => setProfile((p) => ({ ...p, [field]: e.target.value }))}
              />
            </div>
          ))}
        </div>
        <div className="form-actions">
          <button className="btn-primary" onClick={handleSave}>
            {saved ? "✅ Saved!" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Appearance */}
      <div className="card settings-card">
        <h3 className="settings-section-title">Appearance</h3>
        <div className="setting-row">
          <div>
            <div className="setting-label">Theme</div>
            <div className="setting-sub">Currently: {theme === "dark" ? "Dark Mode" : "Light Mode"}</div>
          </div>
          <button className="btn-outline" onClick={toggleTheme}>
            {theme === "dark" ? "☀️ Switch to Light" : "🌙 Switch to Dark"}
          </button>
        </div>
      </div>

      {/* Storage info */}
      <div className="card settings-card">
        <h3 className="settings-section-title">Storage</h3>
        <div className="setting-row">
          <div>
            <div className="setting-label">Clear Attendance Data</div>
            <div className="setting-sub">Removes locally stored attendance records</div>
          </div>
          <button className="btn-secondary" onClick={() => { localStorage.removeItem("ucms_attendance"); alert("Cleared!"); }}>
            Clear
          </button>
        </div>
        <div className="setting-row">
          <div>
            <div className="setting-label">Clear All Local Data</div>
            <div className="setting-sub">Resets all localStorage entries for this app</div>
          </div>
          <button className="btn-secondary" onClick={() => { localStorage.clear(); alert("All data cleared!"); }}>
            Reset All
          </button>
        </div>
      </div>
    </div>
  );
}
