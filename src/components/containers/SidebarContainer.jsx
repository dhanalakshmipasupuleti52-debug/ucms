import React from "react";
import { useApp } from "../../context/AppContext";
import { SidebarPresenter } from "../presenters/SidebarPresenter";

// ── CONTAINER: reads context/state, passes data to presenter ───────────────
export function SidebarContainer() {
  const { student, sidebarOpen, toggleSidebar } = useApp();

  return (
    <SidebarPresenter
      student={student}
      isOpen={sidebarOpen}
      onToggle={toggleSidebar}
    />
  );
}
