import { useMemo, useState } from "react";
import {
  Archive,
  ArrowUpRight,
  Check,
  ChevronRight,
  Clock3,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Sparkles,
  X
} from "lucide-react";
import { initialProjects } from "../data/projects";

const statusStyles = {
  Active: "border-sg-primary/20 bg-sg-primary/10 text-sg-primary",
  Review: "border-sg-info/20 bg-sg-info/10 text-sg-info",
  Draft: "border-sg-warning/20 bg-sg-warning/10 text-[#d67b3c]",
  Archived: "border-sg-border bg-white/[.03] text-sg-muted"
};

const healthStyles = {
  "On track": "text-sg-success",
  "Needs attention": "text-sg-warning",
  "At risk": "text-sg-danger",
  Complete: "text-sg-success"
};

function StatusBadge({ status }) {
  return <span className={`rounded-full border px-2 py-1 font-mono text-[10px] ${statusStyles[status]}`}>{status}</span>;
}

function ProjectCard({ project, onOpen }) {
  return (
    <article className="group sg-panel rounded-sg-lg p-4 transition hover:-translate-y-0.5 hover:border-sg-primary/25 hover:bg-sg-surface">
      <div className="flex items-start justify-between gap-3">
        <button onClick={() => onOpen(project)} className="sg-focus min-w-0 flex-1 text-left">
          <div className="mb-3 flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${project.status === "Active" ? "bg-sg-primary" : project.status === "Review" ? "bg-sg-info" : project.status === "Draft" ? "bg-[#d67b3c]" : "bg-sg-muted"}`} />
            <span className="font-mono text-[10px] uppercase tracking-[.14em] text-sg-muted">{project.area}</span>
          </div>
          <h3 className="truncate text-[15px] font-semibold tracking-tight group-hover:text-sg-primary">{project.name}</h3>
        </button>
        <button className="sg-focus rounded-lg p-1.5 text-sg-muted hover:bg-white/5 hover:text-sg-text" aria-label={`More options for ${project.name}`}>
          <MoreHorizontal size={17} />
        </button>
      </div>

      <p className="mt-3 min-h-[42px] text-xs leading-5 text-sg-muted">{project.description}</p>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[.12em] text-sg-muted">Progress</span>
          <span className="font-mono text-[10px] text-sg-text">{project.progress}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-sg-elevated">
          <div className="h-full rounded-full bg-gradient-to-r from-sg-primary to-sg-accent" style={{ width: `${project.progress}%` }} />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-sg-border pt-3">
        <div className="flex items-center gap-2">
          <StatusBadge status={project.status} />
          <span className={`font-mono text-[10px] ${healthStyles[project.health]}`}>{project.health}</span>
        </div>
        <div className="flex items-center gap-2 text-sg-muted">
          <div className="grid h-6 w-6 place-items-center rounded-full border border-sg-border bg-sg-elevated font-mono text-[8px]">{project.owner}</div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between font-mono text-[9px] uppercase tracking-[.08em] text-sg-muted">
        <span>Updated {project.updated}</span>
        <span className="inline-flex items-center gap-1 opacity-0 transition group-hover:opacity-100">Open <ArrowUpRight size={11} /></span>
      </div>
    </article>
  );
}

function DetailDrawer({ project, onClose }) {
  if (!project) return null;

  return (
    <>
      <button aria-label="Close project detail" onClick={onClose} className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px]" />
      <aside className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[470px] flex-col border-l border-sg-border bg-sg-surface shadow-2xl fade-in">
        <div className="flex items-center justify-between border-b border-sg-border px-5 py-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[.16em] text-sg-muted">Project detail</div>
            <div className="mt-1 text-sm font-semibold">{project.name}</div>
          </div>
          <button onClick={onClose} className="sg-focus rounded-lg p-2 text-sg-muted hover:bg-white/5 hover:text-sg-text">
            <X size={17} />
          </button>
        </div>

        <div className="scrollbar-thin flex-1 overflow-y-auto p-5">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={project.status} />
            <span className={`font-mono text-[10px] ${healthStyles[project.health]}`}>{project.health}</span>
          </div>

          <h2 className="mt-4 text-2xl font-semibold tracking-tight">{project.name}</h2>
          <p className="mt-2 text-sm leading-6 text-sg-muted">{project.description}</p>

          <div className="mt-6 rounded-sg-lg border border-sg-border bg-sg-elevated/40 p-4">
            <div className="flex items-end justify-between">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[.14em] text-sg-muted">Completion</div>
                <div className="mt-1 text-3xl font-semibold">{project.progress}%</div>
              </div>
              <Sparkles size={18} className="text-sg-primary" />
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-sg-bg">
              <div className="h-full rounded-full bg-gradient-to-r from-sg-primary to-sg-accent" style={{ width: `${project.progress}%` }} />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-sg-border bg-sg-elevated/30 p-3">
              <div className="font-mono text-[9px] uppercase tracking-[.12em] text-sg-muted">Owner</div>
              <div className="mt-2 text-sm">{project.ownerName}</div>
            </div>
            <div className="rounded-xl border border-sg-border bg-sg-elevated/30 p-3">
              <div className="font-mono text-[9px] uppercase tracking-[.12em] text-sg-muted">Updated</div>
              <div className="mt-2 flex items-center gap-1.5 text-sm"><Clock3 size={13} className="text-sg-muted" />{project.updated}</div>
            </div>
          </div>

          <div className="mt-7">
            <div className="font-mono text-[10px] uppercase tracking-[.16em] text-sg-muted">Latest activity</div>
            <div className="mt-3 space-y-2">
              {project.activity.map((item, index) => (
                <div key={item} className="flex gap-3 rounded-xl border border-sg-border bg-sg-elevated/25 p-3">
                  <div className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-sg-primary/20 bg-sg-primary/10">
                    {index === 0 ? <Check size={11} className="text-sg-primary" /> : <div className="h-1.5 w-1.5 rounded-full bg-sg-muted" />}
                  </div>
                  <span className="text-xs leading-5 text-sg-muted">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-sg-border p-4">
          <button className="sg-focus flex w-full items-center justify-center gap-2 rounded-xl border border-sg-primary/30 bg-sg-primary/10 px-4 py-3 text-sm font-medium text-sg-primary hover:bg-sg-primary/15">
            Open full project <ArrowUpRight size={15} />
          </button>
        </div>
      </aside>
    </>
  );
}

function NewProjectModal({ onClose, onCreate }) {
  const [name, setName] = useState("");
  const [area, setArea] = useState("Product UI");

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreate({
      id: `project-${Date.now()}`,
      name: name.trim(),
      area,
      description: "New workspace project ready for planning and delivery.",
      status: "Draft",
      health: "On track",
      progress: 0,
      owner: "DG",
      ownerName: "Workspace Admin",
      updated: "just now",
      accent: "primary",
      activity: ["Project created"]
    });
  };

  return (
    <>
      <button aria-label="Close new project dialog" onClick={onClose} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
      <div className="fixed left-1/2 top-1/2 z-[60] w-[calc(100%-2rem)] max-w-[460px] -translate-x-1/2 -translate-y-1/2 fade-in">
        <form onSubmit={submit} className="sg-panel rounded-sg-xl bg-sg-surface p-5 shadow-2xl">
          <div className="flex items-start justify-between">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[.16em] text-sg-primary">Create project</div>
              <h2 className="mt-1 text-lg font-semibold">Start something new</h2>
            </div>
            <button type="button" onClick={onClose} className="sg-focus rounded-lg p-2 text-sg-muted hover:bg-white/5"><X size={17} /></button>
          </div>

          <label className="mt-6 block">
            <span className="font-mono text-[10px] uppercase tracking-[.14em] text-sg-muted">Project name</span>
            <input autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Mobile App" className="sg-focus mt-2 w-full rounded-xl border border-sg-border bg-sg-bg px-3 py-3 text-sm placeholder:text-sg-muted/60" />
          </label>

          <label className="mt-4 block">
            <span className="font-mono text-[10px] uppercase tracking-[.14em] text-sg-muted">Area</span>
            <select value={area} onChange={(e) => setArea(e.target.value)} className="sg-focus mt-2 w-full rounded-xl border border-sg-border bg-sg-bg px-3 py-3 text-sm">
              <option>Product UI</option>
              <option>UX System</option>
              <option>Foundation</option>
              <option>Web Experience</option>
              <option>Brand</option>
            </select>
          </label>

          <button disabled={!name.trim()} className="sg-focus mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-sg-primary px-4 py-3 text-sm font-semibold text-sg-bg disabled:cursor-not-allowed disabled:opacity-40">
            <Plus size={16} /> Create project
          </button>
        </form>
      </div>
    </>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState(initialProjects);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("Recently updated");
  const [selected, setSelected] = useState(null);
  const [newOpen, setNewOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = projects.filter((project) => {
      const matchesQuery = !q || `${project.name} ${project.area} ${project.description}`.toLowerCase().includes(q);
      const matchesStatus = status === "All" || project.status === status;
      return matchesQuery && matchesStatus;
    });

    if (sort === "Progress") return [...list].sort((a, b) => b.progress - a.progress);
    if (sort === "Name") return [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [projects, query, status, sort]);

  const createProject = (project) => {
    setProjects((current) => [project, ...current]);
    setNewOpen(false);
    setSelected(project);
  };

  return (
    <div className="mx-auto max-w-[1440px] p-4 md:p-6 lg:p-8">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[.18em] text-sg-primary">Workspace / Projects</div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">Projects</h1>
          <p className="mt-2 max-w-2xl text-sm text-sg-muted">Everything moving through SaaviGen, with enough signal to know what needs your attention.</p>
        </div>
        <button onClick={() => setNewOpen(true)} className="sg-focus inline-flex items-center justify-center gap-2 rounded-xl bg-sg-primary px-4 py-2.5 text-sm font-semibold text-sg-bg hover:brightness-105">
          <Plus size={16} /> New project
        </button>
      </div>

      <div className="mt-7 flex flex-col gap-3 rounded-sg-lg border border-sg-border bg-sg-surface/70 p-3 lg:flex-row lg:items-center">
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-sg-border bg-sg-bg px-3 py-2.5">
          <Search size={16} className="shrink-0 text-sg-muted" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search projects..." className="sg-focus min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-sg-muted/60" />
          {query && <button onClick={() => setQuery("")} className="text-sg-muted hover:text-sg-text"><X size={14} /></button>}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto scrollbar-thin">
          <Filter size={15} className="ml-1 shrink-0 text-sg-muted" />
          {["All", "Active", "Review", "Draft", "Archived"].map((item) => (
            <button key={item} onClick={() => setStatus(item)} className={`whitespace-nowrap rounded-lg px-3 py-2 font-mono text-[10px] uppercase tracking-[.08em] transition ${status === item ? "bg-white/8 text-sg-text" : "text-sg-muted hover:bg-white/[.035] hover:text-sg-text"}`}>
              {item}
            </button>
          ))}
        </div>

        <select value={sort} onChange={(e) => setSort(e.target.value)} className="sg-focus rounded-xl border border-sg-border bg-sg-bg px-3 py-2.5 text-xs text-sg-muted lg:w-[155px]">
          <option>Recently updated</option>
          <option>Progress</option>
          <option>Name</option>
        </select>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div className="font-mono text-[10px] uppercase tracking-[.14em] text-sg-muted">{filtered.length.toString().padStart(2, "0")} projects</div>
        <div className="hidden items-center gap-2 text-[11px] text-sg-muted sm:flex">
          <Archive size={13} /> Local prototype data
        </div>
      </div>

      {filtered.length ? (
        <div className="mt-3 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((project) => <ProjectCard key={project.id} project={project} onOpen={setSelected} />)}
        </div>
      ) : (
        <div className="mt-3 rounded-sg-lg border border-dashed border-sg-border p-12 text-center">
          <div className="mx-auto grid h-10 w-10 place-items-center rounded-xl border border-sg-border bg-sg-surface"><Search size={17} className="text-sg-muted" /></div>
          <h3 className="mt-4 text-sm font-semibold">No projects found</h3>
          <p className="mt-1 text-xs text-sg-muted">Try a different search or status filter.</p>
        </div>
      )}

      <div className="mt-6 rounded-sg-lg border border-sg-primary/15 bg-sg-primary/[.035] p-4">
        <div className="flex gap-3">
          <Sparkles size={17} className="mt-0.5 shrink-0 text-sg-primary" />
          <div>
            <div className="text-sm font-medium">Designed for the next layer</div>
            <p className="mt-1 max-w-3xl text-xs leading-5 text-sg-muted">This workspace is intentionally local for now. The UI is structured so project records, owners, activity and permissions can later plug into real data without redesigning the surface.</p>
          </div>
        </div>
      </div>

      <DetailDrawer project={selected} onClose={() => setSelected(null)} />
      {newOpen && <NewProjectModal onClose={() => setNewOpen(false)} onCreate={createProject} />}
    </div>
  );
}
