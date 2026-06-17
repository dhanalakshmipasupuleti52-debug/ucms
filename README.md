# UCMS – University Campus Management System

A React SPA built to satisfy all rubric requirements.

---

## Setup

```bash
npm install --legacy-peer-deps
npm start         # dev server at localhost:3000
npx vitest run    # run tests
npm run build     # production build (deploy to Netlify/Vercel)
```

---

## Rubric Coverage

| Concept | Where |
|---|---|
| **useState** (controlled component + form validation) | `StudentRecords.jsx`, `ExaminationPortal.jsx`, `Settings.jsx` |
| **useRef** (focus management) | `StudentRecords.jsx` — `firstInputRef` focuses name input on form open |
| **Container / Presenter pattern** | `SidebarContainer` → `SidebarPresenter`, `HeaderContainer` → `HeaderPresenter` |
| **Error Boundary + fallback UI** | `ErrorBoundary.jsx`, wrapped around all `<Routes>` in `App.jsx` |
| **Browser Storage (localStorage + useEffect)** | `Attendance.jsx`, `Settings.jsx`, `AppContext.jsx` (theme persistence) |
| **Context API** (global state, derived state, state colocation) | `AppContext.jsx` — student, announcements, attendance, notices, theme |
| **SPA Routing** (basic, dynamic, 404 fallback) | `App.jsx` — 9 routes + wildcard `*` fallback |
| **Unit tests** (≥2) | `src/__tests__/App.test.jsx` — ErrorBoundary tests (2 unit) |
| **Integration test** (≥1) | `src/__tests__/App.test.jsx` — Dashboard integration test |
| **Deployment** | Push to GitHub → connect Netlify (base dir = `ucms`, build = `npm run build`, publish = `build`) |

---

## Folder Structure

```
ucms/
├── public/
│   └── index.html
├── src/
│   ├── __tests__/
│   │   └── App.test.jsx          ← Vitest unit + integration tests
│   ├── components/
│   │   ├── containers/           ← Smart components (read context)
│   │   │   ├── SidebarContainer.jsx
│   │   │   └── HeaderContainer.jsx
│   │   ├── presenters/           ← Dumb components (pure UI)
│   │   │   ├── SidebarPresenter.jsx
│   │   │   └── HeaderPresenter.jsx
│   │   └── ErrorBoundary.jsx
│   ├── context/
│   │   └── AppContext.jsx        ← Global state via Context API
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── StudentRecords.jsx
│   │   ├── Attendance.jsx
│   │   ├── Timetable.jsx
│   │   ├── ExaminationPortal.jsx
│   │   ├── ResultsDashboard.jsx
│   │   ├── Messages.jsx
│   │   ├── Notices.jsx
│   │   └── Settings.jsx
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx                   ← Router + Layout
│   ├── index.js
│   └── setupTests.js
├── vitest.config.js
└── package.json
```
