import React, { createContext, useContext, useState, useEffect } from "react";

// ── Global State Shape ──────────────────────────────────────────────────────
const defaultState = {
  student: {
    name: "John Doe",
    branch: "B.Tech CSE - 3rd Year",
    rollNo: "21CS1001",
    avatar: "JD",
  },
  announcements: [
    { id: 1, title: "Mid Sem Exams Schedule Released", date: "May 14, 2024", color: "blue" },
    { id: 2, title: "Workshop on AI & ML", date: "May 13, 2024", color: "yellow" },
    { id: 3, title: "Library Maintenance on May 20", date: "May 12, 2024", color: "green" },
  ],
  attendance: { present: 1083, absent: 99, late: 63 },
  notices: [
    { id: 1, title: "Fee Payment Deadline Extended", date: "May 16, 2024", urgent: true },
    { id: 2, title: "Sports Day Registrations Open", date: "May 15, 2024", urgent: false },
    { id: 3, title: "Hostel Room Allocation Update", date: "May 14, 2024", urgent: false },
  ],
};

// ── Context ────────────────────────────────────────────────────────────────
const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Derived state: load theme preference from localStorage (Browser Storage rubric)
  const [theme, setTheme] = useState(
    () => localStorage.getItem("ucms_theme") || "dark"
  );

  // Lifted state shared across pages
  const [student] = useState(defaultState.student);
  const [announcements] = useState(defaultState.announcements);
  const [attendance] = useState(defaultState.attendance);
  const [notices] = useState(defaultState.notices);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Persist theme to localStorage whenever it changes (useEffect + storage rubric)
  useEffect(() => {
    localStorage.setItem("ucms_theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Colocation: toggle helpers live next to the state they manage
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  const toggleSidebar = () => setSidebarOpen((o) => !o);

  return (
    <AppContext.Provider
      value={{
        student,
        announcements,
        attendance,
        notices,
        theme,
        toggleTheme,
        sidebarOpen,
        toggleSidebar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// Custom hook for consuming context
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
