import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { HeaderPresenter } from "../presenters/HeaderPresenter";

// ── CONTAINER: owns search state locally; reads global via context ──────────
export function HeaderContainer() {
  const { student, theme, toggleTheme } = useApp();
  const [searchVal, setSearchVal] = useState("");

  return (
    <HeaderPresenter
      student={student}
      searchVal={searchVal}
      onSearchChange={setSearchVal}
      theme={theme}
      onToggleTheme={toggleTheme}
    />
  );
}
