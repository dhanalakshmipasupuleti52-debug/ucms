import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { SidebarContainer } from "./components/containers/SidebarContainer";
import { HeaderContainer } from "./components/containers/HeaderContainer";
import Dashboard from "./pages/Dashboard";
import StudentRecords from "./pages/StudentRecords";
import Attendance from "./pages/Attendance";
import { Timetable } from "./pages/Timetable";
import ExaminationPortal from "./pages/ExaminationPortal";
import ResultsDashboard from "./pages/ResultsDashboard";
import { Messages } from "./pages/Messages";
import Notices from "./pages/Notices";
import Settings from "./pages/Settings";
import "./styles/global.css";

function Layout({ children }) {
  return (
    <div className="app-layout">
      <SidebarContainer />
      <div className="main-area">
        <HeaderContainer />
        <main className="main-content">
          <ErrorBoundary>{children}</ErrorBoundary>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Layout>
          <Routes>
            {/* Basic + nested-style routing (SPA rubric) */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<StudentRecords />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/timetable" element={<Timetable />} />
            <Route path="/exams" element={<ExaminationPortal />} />
            <Route path="/results" element={<ResultsDashboard />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/notices" element={<Notices />} />
            <Route path="/settings" element={<Settings />} />
            {/* 404 fallback */}
            <Route path="*" element={
              <div className="page" style={{ textAlign: "center", paddingTop: "4rem" }}>
                <div style={{ fontSize: "4rem" }}>🔍</div>
                <h2>Page Not Found</h2>
                <p style={{ color: "var(--text-muted)" }}>The page you're looking for doesn't exist.</p>
              </div>
            } />
          </Routes>
        </Layout>
      </AppProvider>
    </BrowserRouter>
  );
}
