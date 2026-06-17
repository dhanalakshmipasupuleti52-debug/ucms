import React from "react";

// ── Error Boundary (class component – required for componentDidCatch) ───────
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} onReset={() => this.setState({ hasError: false, error: null })} />;
    }
    return this.props.children;
  }
}

// ── Fallback UI ────────────────────────────────────────────────────────────
function ErrorFallback({ error, onReset }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", minHeight: "60vh", gap: "1rem",
      color: "var(--text-primary)", textAlign: "center", padding: "2rem",
    }}>
      <div style={{ fontSize: "3rem" }}>⚠️</div>
      <h2 style={{ color: "var(--accent-red)", margin: 0 }}>Something went wrong</h2>
      <p style={{ color: "var(--text-muted)", maxWidth: "400px" }}>
        {error?.message || "An unexpected error occurred. Please try again."}
      </p>
      <button
        onClick={onReset}
        style={{
          padding: "0.6rem 1.5rem", background: "var(--accent-blue)",
          color: "#fff", border: "none", borderRadius: "8px",
          cursor: "pointer", fontWeight: 600, fontSize: "0.9rem",
        }}
      >
        Try Again
      </button>
    </div>
  );
}
