import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import AppShell from "./components/AppShell";
import Overview from "./pages/Overview";
import Projects from "./pages/Projects";
import "./index.css";

const THEME_KEY = "saavigen-theme";

function ComingSoon({ name }) {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-[900px] items-center justify-center p-6">
      <div className="w-full rounded-sg-xl border border-sg-border bg-sg-surface p-8 text-center">
        <div className="font-mono text-[10px] uppercase tracking-[.18em] text-sg-primary">
          Module / {name}
        </div>

        <h1 className="mt-2 text-2xl font-semibold">
          Coming next
        </h1>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-sg-muted">
          The shell is ready. This workspace can be added without changing
          the design-system foundation or navigation model.
        </p>
      </div>
    </div>
  );
}

function getInitialTheme() {
  const saved = localStorage.getItem(THEME_KEY);

  if (saved === "dark" || saved === "light" || saved === "system") {
    return saved;
  }

  return "system";
}

function applyTheme(theme) {
  const resolved =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  document.documentElement.setAttribute("data-theme", resolved);
  document.documentElement.style.colorScheme = resolved;
}

function App() {
  const [active, setActive] = useState("Projects");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const handleChange = () => {
      applyTheme("system");
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [theme]);

  let page;

  if (active === "Overview") {
    page = <Overview onProjects={() => setActive("Projects")} />;
  } else if (active === "Projects") {
    page = <Projects />;
  } else {
    page = <ComingSoon name={active} />;
  }

  return (
    <AppShell
      active={active}
      onNavigate={setActive}
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      theme={theme}
      onThemeChange={setTheme}
    >
      {page}
    </AppShell>
  );
}

createRoot(document.getElementById("root")).render(<App />);