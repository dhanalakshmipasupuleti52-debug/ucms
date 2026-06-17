// Unit tests & 1 integration test (Vitest + React Testing Library)
// Run: npx vitest run   or   npm test

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import { AppProvider } from "../context/AppContext";
import { ErrorBoundary } from "../components/ErrorBoundary";
import StudentRecords from "../pages/StudentRecords";
import Dashboard from "../pages/Dashboard";

// Helper: wrap with router + context
function Wrapper({ children }) {
  return (
    <MemoryRouter>
      <AppProvider>{children}</AppProvider>
    </MemoryRouter>
  );
}

// ── UNIT TEST 1: ErrorBoundary shows fallback on error ─────────────────────
describe("ErrorBoundary", () => {
  it("renders fallback UI when a child throws", () => {
    // Suppress console.error noise
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    function Bomb() {
      throw new Error("Test explosion");
    }

    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    );

    expect(screen.getByText("Something went wrong")).toBeTruthy();
    expect(screen.getByText(/Test explosion/i)).toBeTruthy();
    spy.mockRestore();
  });

  it("renders children when no error occurs", () => {
    render(
      <ErrorBoundary>
        <span>All good</span>
      </ErrorBoundary>
    );
    expect(screen.getByText("All good")).toBeTruthy();
  });
});

// ── UNIT TEST 2: StudentRecords form validation ────────────────────────────
describe("StudentRecords – controlled form validation", () => {
  beforeEach(() => {
    // localStorage stub
    vi.stubGlobal("localStorage", {
      getItem: vi.fn(() => null),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    });
  });

  it("shows validation errors when submitted empty", () => {
    render(
      <Wrapper>
        <StudentRecords />
      </Wrapper>
    );

    // Open form
    fireEvent.click(screen.getByText("+ Add Student"));

    // Try to save without filling anything
    fireEvent.click(screen.getByText("Save Student"));

    expect(screen.getByText("Name is required")).toBeTruthy();
    expect(screen.getByText("Roll number is required")).toBeTruthy();
    expect(screen.getByText("Branch is required")).toBeTruthy();
  });

  it("adds a student on valid form submission", () => {
    render(
      <Wrapper>
        <StudentRecords />
      </Wrapper>
    );

    fireEvent.click(screen.getByText("+ Add Student"));

    const inputs = screen.getAllByRole("textbox");
    // name, roll, branch, year, phone (cgpa is number input)
    fireEvent.change(inputs[0], { target: { value: "Test User" } });
    fireEvent.change(inputs[1], { target: { value: "21CS9999" } });
    fireEvent.change(inputs[2], { target: { value: "CSE" } });
    fireEvent.change(inputs[3], { target: { value: "3rd" } });
    fireEvent.change(inputs[4], { target: { value: "9876543210" } });

    // CGPA number input
    const numberInput = screen.getByDisplayValue("") ?? document.querySelector('input[type="number"]');
    const cgpaInput = document.querySelector('input[type="number"]');
    if (cgpaInput) fireEvent.change(cgpaInput, { target: { value: "8.5" } });

    fireEvent.click(screen.getByText("Save Student"));

    // Form should close and student appear in table
    expect(screen.getByText("Test User")).toBeTruthy();
  });
});

// ── INTEGRATION TEST: Dashboard renders key sections ──────────────────────
describe("Dashboard – integration", () => {
  beforeEach(() => {
    vi.stubGlobal("localStorage", {
      getItem: vi.fn((key) => (key === "ucms_theme" ? "dark" : null)),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    });
  });

  it("renders stat cards, timetable, and recent results together", () => {
    render(
      <Wrapper>
        <Dashboard />
      </Wrapper>
    );

    // Stat cards
    expect(screen.getByText("1,245")).toBeTruthy();
    expect(screen.getByText("Total Students")).toBeTruthy();
    expect(screen.getByText("12")).toBeTruthy();
    expect(screen.getByText("Exams Scheduled")).toBeTruthy();

    // Timetable
    expect(screen.getByText("Today's Timetable")).toBeTruthy();
    expect(screen.getByText("Data Structures")).toBeTruthy();

    // Recent results
    expect(screen.getByText("Recent Results")).toBeTruthy();
    expect(screen.getByText("Web Development")).toBeTruthy();

    // Quick Access links exist
    expect(screen.getByText("Quick Access")).toBeTruthy();
  });
});
