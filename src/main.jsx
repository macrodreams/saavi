import { useState } from "react";
import AppShell from "./components/AppShell";
import Overview from "./pages/Overview";
import Projects from "./pages/Projects";
import "./index.css";

function ComingSoon({ name }) {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-[900px] items-center justify-center p-6">
      <div className="w-full rounded-sg-xl border border-sg-border bg-sg-surface p-8 text-center">
        <div className="font-mono text-[10px] uppercase tracking-[.18em] text-sg-primary">Module / {name}</div>
        <h1 className="mt-2 text-2xl font-semibold">Coming next</h1>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-sg-muted">The shell is ready. This workspace can be added without changing the design-system foundation or navigation model.</p>
      </div>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState("Projects");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  let page;
  if (active === "Overview") page = <Overview onProjects={() => setActive("Projects")} />;
  else if (active === "Projects") page = <Projects />;
  else page = <ComingSoon name={active} />;

  return (
    <AppShell
      active={active}
      onNavigate={setActive}
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
    >
      {page}
    </AppShell>
  );
}
