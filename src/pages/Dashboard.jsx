import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

const timetable = [
  { time: "09:00 AM – 10:00 AM", course: "Data Structures", faculty: "Dr. Smith", room: "Room 101" },
  { time: "10:15 AM – 11:15 AM", course: "Web Development", faculty: "Prof. Johnson", room: "Lab 2" },
  { time: "11:30 AM – 12:30 PM", course: "Database Systems", faculty: "Dr. Williams", room: "Room 203" },
  { time: "02:00 PM – 03:00 PM", course: "Operating Systems", faculty: "Prof. Brown", room: "Room 105" },
];

const recentResults = [
  { subject: "Data Structures", semester: "Semester 2 – 2024", grade: "A", score: "92/100" },
  { subject: "Web Development", semester: "Semester 2 – 2024", grade: "B+", score: "86/100" },
  { subject: "Database Systems", semester: "Semester 2 – 2024", grade: "A-", score: "88/100" },
  { subject: "Operating Systems", semester: "Semester 2 – 2024", grade: "B", score: "82/100" },
];

const upcomingExams = [
  { subject: "Data Structures", date: "May 28, 2024", time: "10:00 AM – 01:00 PM", days: 14 },
  { subject: "Database Systems", date: "May 30, 2024", time: "10:00 AM – 01:00 PM", days: 16 },
  { subject: "Operating Systems", date: "June 03, 2024", time: "10:00 AM – 01:00 PM", days: 20 },
];

const quickLinks = [
  { icon: "👤", label: "Student Records", sub: "View & manage profile", to: "/students" },
  { icon: "📅", label: "Attendance", sub: "Mark & view attendance", to: "/attendance" },
  { icon: "🕐", label: "Timetable", sub: "View class schedule", to: "/timetable" },
  { icon: "📝", label: "Examination Portal", sub: "View exams & marks", to: "/exams" },
  { icon: "📊", label: "Results Dashboard", sub: "View results & analytics", to: "/results" },
  { icon: "💳", label: "Fees & Payments", sub: "View fee details", to: "/settings" },
];

export default function Dashboard() {
  const { student, announcements, attendance } = useApp();
  const total = attendance.present + attendance.absent + attendance.late;
  const presentPct = Math.round((attendance.present / total) * 100);

  const greetingHour = new Date().getHours();
  const greeting = greetingHour < 12 ? "morning" : greetingHour < 17 ? "afternoon" : "evening";

  return (
    <div className="page dashboard">
      {/* Header row */}
      <div className="dash-hero">
        <div>
          <h2 className="dash-greeting">Good {greeting}, {student.name}! 👋</h2>
          <p className="dash-sub">Here's an overview of your campus activities.</p>
        </div>
        <div className="academic-badge">📅 Academic Year 2024-25 ▾</div>
      </div>

      {/* Stat cards */}
      <div className="stat-grid">
        <div className="stat-card blue">
          <span className="stat-icon">👥</span>
          <div>
            <div className="stat-value">1,245</div>
            <div className="stat-label">Total Students</div>
          </div>
          <Link to="/students" className="stat-link">View all students →</Link>
        </div>
        <div className="stat-card green">
          <span className="stat-icon">✅</span>
          <div>
            <div className="stat-value">{presentPct}%</div>
            <div className="stat-label">Attendance</div>
          </div>
          <Link to="/attendance" className="stat-link">View attendance →</Link>
        </div>
        <div className="stat-card purple">
          <span className="stat-icon">📚</span>
          <div>
            <div className="stat-value">12</div>
            <div className="stat-label">Exams Scheduled</div>
          </div>
          <Link to="/exams" className="stat-link">View exams →</Link>
        </div>
        <div className="stat-card orange">
          <span className="stat-icon">🏠</span>
          <div>
            <div className="stat-value">95</div>
            <div className="stat-label">Results Published</div>
          </div>
          <Link to="/results" className="stat-link">View results →</Link>
        </div>
      </div>

      <div className="dash-mid">
        {/* Today's Timetable */}
        <div className="card timetable-card">
          <div className="card-header">
            <span>🕐 Today's Timetable</span>
            <Link to="/timetable" className="card-link">View full timetable →</Link>
          </div>
          <table className="tt-table">
            <thead>
              <tr>
                <th>Time</th><th>Course</th><th>Faculty</th><th>Room</th>
              </tr>
            </thead>
            <tbody>
              {timetable.map((row, i) => (
                <tr key={i} className={i === 0 ? "tt-active" : ""}>
                  <td>{row.time}</td>
                  <td>{row.course}</td>
                  <td>{row.faculty}</td>
                  <td>{row.room}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Attendance donut */}
        <div className="card attendance-card">
          <div className="card-header"><span>Attendance Overview</span></div>
          <div className="donut-wrap">
            <svg viewBox="0 0 120 120" className="donut-svg">
              <circle cx="60" cy="60" r="50" fill="none" stroke="var(--bg-card-alt)" strokeWidth="14" />
              {/* Present */}
              <circle cx="60" cy="60" r="50" fill="none" stroke="#22c55e" strokeWidth="14"
                strokeDasharray={`${presentPct * 3.14} 314`} strokeDashoffset="78.5" strokeLinecap="round" />
              {/* Absent */}
              <circle cx="60" cy="60" r="50" fill="none" stroke="#f59e0b" strokeWidth="14"
                strokeDasharray={`${Math.round(attendance.absent / total * 100) * 3.14} 314`}
                strokeDashoffset={`${-(presentPct * 3.14 - 78.5)}`} strokeLinecap="round" />
              <text x="60" y="55" textAnchor="middle" fill="var(--text-primary)" fontSize="18" fontWeight="700">{presentPct}%</text>
              <text x="60" y="70" textAnchor="middle" fill="var(--text-muted)" fontSize="9">Overall</text>
            </svg>
            <div className="legend">
              <div className="legend-item"><span className="dot green"></span><span>Present {presentPct}% ({attendance.present})</span></div>
              <div className="legend-item"><span className="dot yellow"></span><span>Absent 8% ({attendance.absent})</span></div>
              <div className="legend-item"><span className="dot red"></span><span>Late 5% ({attendance.late})</span></div>
            </div>
          </div>
          <div className="attend-badge">✅ Great! Keep up your attendance.</div>
        </div>
      </div>

      <div className="dash-bot">
        {/* Quick Access */}
        <div className="card quick-card">
          <div className="card-header"><span>Quick Access</span></div>
          <div className="quick-grid">
            {quickLinks.map((q) => (
              <Link to={q.to} key={q.label} className="quick-item">
                <div className="quick-icon">{q.icon}</div>
                <div>
                  <div className="quick-label">{q.label}</div>
                  <div className="quick-sub">{q.sub}</div>
                </div>
                <span className="quick-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Results */}
        <div className="card results-card">
          <div className="card-header">
            <span>Recent Results</span>
            <Link to="/results" className="card-link">View all results →</Link>
          </div>
          <div className="result-list">
            {recentResults.map((r, i) => (
              <div key={i} className="result-item">
                <div>
                  <div className="result-subject">{r.subject}</div>
                  <div className="result-sem">{r.semester}</div>
                </div>
                <div className="result-right">
                  <span className={`grade-badge grade-${r.grade.replace("+","p").replace("-","m")}`}>{r.grade}</span>
                  <span className="result-score">{r.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dash-right-col">
        {/* Announcements */}
        <div className="card announce-card">
          <div className="card-header">
            <span>📢 Announcements</span>
            <a className="card-link">View all →</a>
          </div>
          {announcements.map((a) => (
            <div key={a.id} className="announce-item">
              <span className={`dot ${a.color}`}></span>
              <div>
                <div className="announce-title">{a.title}</div>
                <div className="announce-date">{a.date}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming Exams */}
        <div className="card exam-card">
          <div className="card-header">
            <span>Upcoming Exams</span>
            <a className="card-link">View all →</a>
          </div>
          {upcomingExams.map((e, i) => (
            <div key={i} className="exam-item">
              <div>
                <div className="exam-subject">{e.subject}</div>
                <div className="exam-date">{e.date} • {e.time}</div>
              </div>
              <span className="days-badge">{e.days} Days</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
