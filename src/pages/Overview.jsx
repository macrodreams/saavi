import { ArrowUpRight, CheckCircle2, Clock3, Layers3, Sparkles, TriangleAlert } from "lucide-react";

function Stat({ label, value, meta, icon: Icon }) {
  return (
    <div className="sg-panel rounded-sg-lg p-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[.16em] text-sg-muted">{label}</span>
        <Icon size={15} className="text-sg-muted" />
      </div>
      <div className="mt-3 text-2xl font-semibold tracking-tight">{value}</div>
      <div className="mt-1 text-xs text-sg-muted">{meta}</div>
    </div>
  );
}

export default function Overview({ onProjects }) {
  return (
    <div className="mx-auto max-w-[1440px] p-4 md:p-6 lg:p-8">
      <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[.18em] text-sg-primary">Workspace overview</div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Good evening, Deepak.</h1>
          <p className="mt-2 max-w-2xl text-sm text-sg-muted">A focused view of what is moving, what needs attention, and where the system is heading next.</p>
        </div>
        <button onClick={onProjects} className="sg-focus inline-flex items-center justify-center gap-2 rounded-xl border border-sg-primary/30 bg-sg-primary/10 px-4 py-2.5 text-sm font-medium text-sg-primary hover:bg-sg-primary/15">
          Open Projects <ArrowUpRight size={16} />
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Active projects" value="03" meta="+1 this week" icon={Layers3} />
        <Stat label="System coverage" value="86%" meta="Across 42 components" icon={Sparkles} />
        <Stat label="Needs attention" value="02" meta="1 blocking issue" icon={TriangleAlert} />
        <Stat label="Last activity" value="12m" meta="Projects workspace" icon={Clock3} />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.45fr_.85fr]">
        <section className="sg-panel rounded-sg-lg p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[.16em] text-sg-muted">Work in motion</div>
              <h2 className="mt-1 text-base font-semibold">Project health</h2>
            </div>
            <span className="rounded-full border border-sg-success/20 bg-sg-success/10 px-2.5 py-1 font-mono text-[10px] text-sg-success">LIVE</span>
          </div>
          <div className="mt-5 space-y-4">
            {[
              ["SaaviGen Dashboard", 78, "On track"],
              ["AI Content Studio", 67, "On track"],
              ["Client Portal", 54, "Needs attention"]
            ].map(([name, progress, health]) => (
              <div key={name}>
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span>{name}</span>
                  <span className="font-mono text-[10px] text-sg-muted">{progress}% · {health}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-sg-elevated">
                  <div className="h-full rounded-full bg-gradient-to-r from-sg-primary to-sg-accent" style={{ width: `${progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="sg-panel rounded-sg-lg p-5">
          <div className="font-mono text-[10px] uppercase tracking-[.16em] text-sg-muted">System intelligence</div>
          <h2 className="mt-1 text-base font-semibold">Foundation status</h2>
          <div className="mt-5 space-y-3">
            {[
              ["Token coverage", "94%", true],
              ["Components", "42", true],
              ["Conflicts", "03", false],
              ["Accessibility", "86", true]
            ].map(([label, value, good]) => (
              <div key={label} className="flex items-center justify-between border-b border-sg-border pb-3 last:border-0 last:pb-0">
                <span className="text-xs text-sg-muted">{label}</span>
                <span className={good ? "font-mono text-xs text-sg-primary" : "font-mono text-xs text-sg-warning"}>{value}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-5 sg-panel rounded-sg-lg p-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[.16em] text-sg-muted">Recent activity</div>
            <h2 className="mt-1 text-base font-semibold">Workspace pulse</h2>
          </div>
          <CheckCircle2 size={17} className="text-sg-success" />
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {[
            ["Projects workspace", "Search + filters + project detail", "12 min ago"],
            ["Design system", "Canonical token mapping", "1 hr ago"],
            ["Dashboard shell", "Responsive navigation", "Yesterday"]
          ].map(([title, desc, time]) => (
            <div key={title} className="rounded-xl border border-sg-border bg-sg-elevated/35 p-4">
              <div className="text-sm font-medium">{title}</div>
              <div className="mt-1 text-xs leading-5 text-sg-muted">{desc}</div>
              <div className="mt-3 font-mono text-[10px] text-sg-muted">{time}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
