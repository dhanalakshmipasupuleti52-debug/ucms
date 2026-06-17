import React, { useState } from "react";

const msgs = [
  { id: 1, from: "Dr. Smith", subject: "Assignment 3 Deadline Extended", time: "10:30 AM", unread: true, body: "Dear students, the deadline for Assignment 3 has been extended to May 20th." },
  { id: 2, from: "Prof. Johnson", subject: "Lab Session Rescheduled", time: "Yesterday", unread: true, body: "The Web Development lab session on Friday is rescheduled to Saturday 10 AM." },
  { id: 3, from: "Admin Office", subject: "Fee Payment Reminder", time: "May 13", unread: false, body: "This is a reminder that the last date for fee payment is May 25, 2024." },
  { id: 4, from: "Dr. Williams", subject: "Mid Sem Marks Released", time: "May 12", unread: false, body: "Mid semester marks for Database Systems have been released. Check the portal." },
];

export function Messages() {
  const [selected, setSelected] = useState(null);
  return (
    <div className="page">
      <div className="page-header">
        <div><h2 className="page-title">Messages</h2><p className="page-sub">Your inbox</p></div>
      </div>
      <div className="msg-layout">
        <div className="card msg-list">
          {msgs.map((m) => (
            <div key={m.id} className={`msg-item ${selected?.id === m.id ? "selected" : ""} ${m.unread ? "unread" : ""}`}
              onClick={() => setSelected(m)}>
              <div className="msg-from">{m.from} {m.unread && <span className="unread-dot" />}</div>
              <div className="msg-subject">{m.subject}</div>
              <div className="msg-time">{m.time}</div>
            </div>
          ))}
        </div>
        <div className="card msg-body">
          {selected ? (
            <>
              <div className="msg-body-from">From: <strong>{selected.from}</strong></div>
              <div className="msg-body-subject">{selected.subject}</div>
              <div className="msg-body-time">{selected.time}</div>
              <hr className="msg-divider" />
              <p className="msg-body-text">{selected.body}</p>
            </>
          ) : (
            <div className="msg-empty">Select a message to read</div>
          )}
        </div>
      </div>
    </div>
  );
}
