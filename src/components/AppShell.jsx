import {
  Activity,
  Bell,
  ChevronDown,
  FolderKanban,
  LayoutDashboard,
  Menu,
  Monitor,
  Moon,
  Search,
  Settings2,
  Sun,
  Users,
  X
} from "lucide-react";

function ThemeSwitcher({ theme, onChange }) {
  const options = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor }
  ];

  const current =
    options.find((item) => item.value === theme) || options[1];

  const Icon = current.icon;

  return (
    <div className="flex items-center gap-2 rounded-xl border border-sg-border bg-sg-surface px-2.5 py-2">
      <Icon size={15} className="text-sg-muted" />

      <label className="sr-only" htmlFor="theme-select">
        Theme
      </label>

      <select
        id="theme-select"
        value={theme}
        onChange={(e) => onChange(e.target.value)}
        className="sg-focus cursor-pointer rounded-md bg-sg-surface pr-1 text-xs text-sg-text outline-none"
        aria-label="Theme"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-sg-surface text-sg-text"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function AppShell({
  active,
  onNavigate,
  sidebarOpen,
  setSidebarOpen,
  theme,
  onThemeChange,
  children
}) {
  const nav = [
    { label: "Overview", icon: LayoutDashboard },
    { label: "Projects", icon: FolderKanban },
    { label: "Activity", icon: Activity },
    { label: "Team", icon: Users }
  ];

  return (
    <div className="min-h-screen bg-sg-bg text-sg-text">

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <button
          aria-label="Close sidebar"
          className="fixed inset-0 z-30 bg-sg-bg/70 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          "fixed inset-y-0 left-0 z-40 flex w-[248px] flex-col border-r border-sg-border bg-sg-surface/95 backdrop-blur-xl transition-transform duration-200",
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        ].join(" ")}
      >

        {/* Brand */}
        <div className="flex h-16 items-center justify-between border-b border-sg-border px-4">
          <div className="flex items-center gap-2.5">

            <div className="grid h-8 w-8 place-items-center rounded-lg border border-sg-primary/25 bg-sg-primary/10 text-sm font-bold text-sg-primary">
              S
            </div>

            <div>
              <div className="text-sm font-semibold tracking-tight">
                SaaviGen
              </div>

              <div className="font-mono text-[10px] uppercase tracking-[.18em] text-sg-muted">
                Workspace
              </div>
            </div>

          </div>

          <button
            className="sg-focus rounded-lg p-1.5 text-sg-muted hover:bg-sg-elevated lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={17} />
          </button>
        </div>

        {/* Workspace selector */}
        <div className="border-b border-sg-border p-3">
          <button className="sg-focus flex w-full items-center justify-between rounded-xl border border-sg-border bg-sg-elevated/70 px-3 py-2.5 text-left hover:border-sg-primary/25">

            <div>
              <div className="text-xs font-medium">
                SaaviGen
              </div>

              <div className="mt-0.5 font-mono text-[10px] text-sg-muted">
                PRODUCT / MAIN
              </div>
            </div>

            <ChevronDown
              size={15}
              className="text-sg-muted"
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-3">

          <div className="mb-2 px-2 font-mono text-[10px] uppercase tracking-[.18em] text-sg-muted">
            Workspace
          </div>

          {nav.map(({ label, icon: Icon }) => {
            const selected = active === label;

            return (
              <button
                key={label}
                onClick={() => {
                  onNavigate(label);
                  setSidebarOpen(false);
                }}
                className={[
                  "sg-focus flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",

                  selected
                    ? "border border-sg-primary/20 bg-sg-primary/10 text-sg-text"
                    : "border border-transparent text-sg-muted hover:bg-sg-elevated hover:text-sg-text"
                ].join(" ")}
              >

                <Icon
                  size={17}
                  className={
                    selected
                      ? "text-sg-primary"
                      : "text-sg-muted"
                  }
                />

                <span>{label}</span>

                {label === "Projects" && (
                  <span className="ml-auto font-mono text-[10px] text-sg-muted">
                    06
                  </span>
                )}

              </button>
            );
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="border-t border-sg-border p-3">

          <button className="sg-focus flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-sg-muted hover:bg-sg-elevated hover:text-sg-text">
            <Settings2 size={17} />
            Settings
          </button>

          <div className="mt-3 flex items-center gap-3 rounded-xl border border-sg-border bg-sg-elevated/40 p-2.5">

            <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-sg-primary/30 to-sg-accent/30 font-mono text-[10px] font-semibold">
              DG
            </div>

            <div className="min-w-0">
              <div className="truncate text-xs font-medium">
                Workspace Admin
              </div>

              <div className="font-mono text-[10px] text-sg-muted">
                ADMIN
              </div>
            </div>

          </div>
        </div>
      </aside>

      {/* Main area */}
      <div className="lg:pl-[248px]">

        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-sg-border bg-sg-bg/80 px-4 backdrop-blur-xl md:px-6">

          <button
            className="sg-focus rounded-lg p-2 text-sg-muted hover:bg-sg-elevated lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={19} />
          </button>

          <div className="hidden text-sm font-medium sm:block">
            {active}
          </div>

          <div className="ml-auto flex items-center gap-2">

            {/* Desktop theme */}
            <div className="hidden lg:block">
              <ThemeSwitcher
                theme={theme}
                onChange={onThemeChange}
              />
            </div>

            {/* Search */}
            <div className="hidden items-center gap-2 rounded-xl border border-sg-border bg-sg-surface px-3 py-2 md:flex">

              <Search
                size={15}
                className="text-sg-muted"
              />

              <span className="font-mono text-[11px] text-sg-muted">
                Search workspace
              </span>

              <kbd className="ml-5 rounded border border-sg-border px-1.5 py-0.5 font-mono text-[9px] text-sg-muted">
                ⌘ K
              </kbd>

            </div>

            {/* Mobile theme */}
            <div className="lg:hidden">
              <ThemeSwitcher
                theme={theme}
                onChange={onThemeChange}
              />
            </div>

            {/* Notifications */}
            <button className="sg-focus relative rounded-xl border border-sg-border bg-sg-surface p-2.5 text-sg-muted hover:text-sg-text">

              <Bell size={16} />

              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-sg-primary" />

            </button>

            {/* Avatar */}
            <div className="hidden h-9 w-9 place-items-center rounded-full border border-sg-border bg-sg-elevated text-xs font-semibold sm:grid">
              DG
            </div>

          </div>
        </header>

        <main>
          {children}
        </main>

      </div>
    </div>
  );
}