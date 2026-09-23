import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Clock3,
  Code2,
  Database,
  Gauge,
  Globe2,
  LockKeyhole,
  Search,
  ShieldCheck,
  Sparkles,
  Terminal,
  TriangleAlert,
  Zap
} from "lucide-react";

import { useEffect, useState } from "react";

const threatData = [
  { label: "00", events: 32, blocked: 12 },
  { label: "02", events: 46, blocked: 18 },
  { label: "04", events: 39, blocked: 14 },
  { label: "06", events: 58, blocked: 23 },
  { label: "08", events: 72, blocked: 31 },
  { label: "10", events: 66, blocked: 27 },
  { label: "12", events: 84, blocked: 38 },
  { label: "14", events: 76, blocked: 34 },
  { label: "16", events: 91, blocked: 43 },
  { label: "18", events: 79, blocked: 36 },
  { label: "20", events: 96, blocked: 49 },
  { label: "22", events: 88, blocked: 41 }
];

const liveEvents = [
  {
    time: "20:42:18",
    icon: ShieldCheck,
    title: "Prompt injection blocked",
    source: "agent-research-01",
    severity: "High"
  },
  {
    time: "20:41:52",
    icon: Search,
    title: "External tool invocation",
    source: "saavi-search",
    severity: "Info"
  },
  {
    time: "20:40:31",
    icon: TriangleAlert,
    title: "Sensitive output detected",
    source: "customer-agent",
    severity: "Medium"
  },
  {
    time: "20:39:07",
    icon: LockKeyhole,
    title: "Policy rule triggered",
    source: "finance-assistant",
    severity: "High"
  },
  {
    time: "20:37:44",
    icon: CheckCircle2,
    title: "Guardrail evaluation passed",
    source: "content-agent",
    severity: "Info"
  }
];

const incidents = [
  {
    id: "SEC-1042",
    title: "Repeated prompt injection attempts",
    severity: "Critical",
    age: "18m"
  },
  {
    id: "SEC-1041",
    title: "Unusual tool-call frequency",
    severity: "High",
    age: "42m"
  },
  {
    id: "SEC-1039",
    title: "PII detection spike",
    severity: "Medium",
    age: "1h"
  }
];

const riskRanking = [
  {
    name: "customer-agent",
    type: "Agent",
    score: 82
  },
  {
    name: "research-agent",
    type: "Agent",
    score: 67
  },
  {
    name: "finance-gpt",
    type: "Model",
    score: 54
  },
  {
    name: "content-agent",
    type: "Agent",
    score: 31
  }
];

const toolMix = [
  { name: "Search", value: 38, icon: Search },
  { name: "Code", value: 27, icon: Code2 },
  { name: "Database", value: 19, icon: Database },
  { name: "API", value: 16, icon: Globe2 }
];

function Card({ children, className = "" }) {
  return (
    <section
      className={[
        "rounded-sg-lg border border-sg-border bg-sg-surface",
        className
      ].join(" ")}
    >
      {children}
    </section>
  );
}

function SectionHeader({ eyebrow, title, action }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        {eyebrow && (
          <div className="font-mono text-[9px] uppercase tracking-[.18em] text-sg-muted">
            {eyebrow}
          </div>
        )}

        <h2 className="mt-1 text-sm font-semibold text-sg-text">
          {title}
        </h2>
      </div>

      {action}
    </div>
  );
}

function SeverityBadge({ severity }) {
  const styles = {
    Critical: {
      color: "var(--sg-danger)",
      borderColor:
        "color-mix(in srgb, var(--sg-danger) 32%, transparent)",
      backgroundColor:
        "color-mix(in srgb, var(--sg-danger) 9%, transparent)"
    },

    High: {
      color: "var(--sg-warning)",
      borderColor:
        "color-mix(in srgb, var(--sg-warning) 32%, transparent)",
      backgroundColor:
        "color-mix(in srgb, var(--sg-warning) 9%, transparent)"
    },

    Medium: {
      color: "var(--sg-primary)",
      borderColor:
        "color-mix(in srgb, var(--sg-primary) 32%, transparent)",
      backgroundColor:
        "color-mix(in srgb, var(--sg-primary) 9%, transparent)"
    },

    Info: {
      color: "var(--sg-muted)",
      borderColor:
        "color-mix(in srgb, var(--sg-border) 85%, transparent)",
      backgroundColor:
        "color-mix(in srgb, var(--sg-elevated) 70%, transparent)"
    }
  };

  const style = styles[severity] || styles.Info;

  return (
    <span
      className="rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[.08em]"
      style={style}
    >
      {severity}
    </span>
  );
}
function KpiCard({
  label,
  value,
  change,
  changeType = "positive",
  icon: Icon,
  note
}) {
  const positive = changeType === "positive";

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div className="font-mono text-[9px] uppercase tracking-[.16em] text-sg-muted">
          {label}
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-sg-border bg-sg-elevated text-sg-primary">
          <Icon size={15} />
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-3">
        <div>
          <div className="text-2xl font-semibold tracking-tight text-sg-text">
            {value}
          </div>

          {note && (
            <div className="mt-1 text-[11px] text-sg-muted">
              {note}
            </div>
          )}
        </div>

        {change && (
          <div
            className={[
              "flex items-center gap-1 font-mono text-[10px]",
              positive ? "text-sg-success" : "text-sg-danger"
            ].join(" ")}
          >
            {positive ? (
              <ArrowUpRight size={12} />
            ) : (
              <ArrowDownRight size={12} />
            )}
            {change}
          </div>
        )}
      </div>
    </Card>
  );
}

function ThreatChart() {
  const width = 760;
  const height = 230;
  const paddingX = 12;
  const paddingY = 18;
  const max = 110;

  const getX = (index) =>
    paddingX +
    (index * (width - paddingX * 2)) / (threatData.length - 1);

  const getY = (value) =>
    height -
    paddingY -
    (value / max) * (height - paddingY * 2);

  const makePath = (key) =>
    threatData
      .map(
        (item, index) =>
          `${index === 0 ? "M" : "L"} ${getX(index)} ${getY(item[key])}`
      )
      .join(" ");

  const eventsPath = makePath("events");
  const blockedPath = makePath("blocked");

  return (
    <div className="mt-5">
      <div className="relative h-[250px] w-full overflow-hidden rounded-lg border border-sg-border bg-sg-elevated">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
          className="absolute inset-x-0 top-3 h-[205px] w-full"
        >
          {[20, 40, 60, 80, 100].map((value) => (
            <line
              key={value}
              x1="0"
              x2={width}
              y1={getY(value)}
              y2={getY(value)}
              stroke="var(--sg-border)"
              strokeWidth="1"
              strokeDasharray="3 5"
            />
          ))}

          <path
            d={eventsPath}
            fill="none"
            stroke="var(--sg-primary)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />

          <path
            d={blockedPath}
            fill="none"
            stroke="var(--sg-accent)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="absolute bottom-2 left-3 right-3 flex justify-between font-mono text-[8px] text-sg-muted">
          {threatData.map((item) => (
            <span key={item.label}>{item.label}:00</span>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-5 font-mono text-[9px] uppercase tracking-[.1em] text-sg-muted">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-sg-primary" />
          Total Events
        </span>

        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-sg-accent" />
          Blocked
        </span>

        <span className="ml-auto">
          Last 24 hours
        </span>
      </div>
    </div>
  );
}
const LIVE_EVENT_TEMPLATES = [
  {
    title: "Prompt injection blocked",
    source: "agent-research-01",
    severity: "High",
    icon: ShieldCheck
  },
  {
    title: "External tool invocation",
    source: "saavi-search",
    severity: "Info",
    icon: Search
  },
  {
    title: "Sensitive output detected",
    source: "customer-agent",
    severity: "Medium",
    icon: TriangleAlert
  },
  {
    title: "Policy rule triggered",
    source: "finance-assistant",
    severity: "High",
    icon: LockKeyhole
  },
  {
    title: "Guardrail evaluation passed",
    source: "content-agent",
    severity: "Info",
    icon: CheckCircle2
  },
  {
    title: "Model request completed",
    source: "saavi-core",
    severity: "Info",
    icon: Bot
  },
  {
    title: "Unusual tool pattern detected",
    source: "research-agent",
    severity: "Medium",
    icon: AlertTriangle
  }
];

function createLiveEvent() {
  const template =
    LIVE_EVENT_TEMPLATES[
      Math.floor(Math.random() * LIVE_EVENT_TEMPLATES.length)
    ];

  return {
    ...template,
    time: new Date().toLocaleTimeString("en-GB", {
      hour12: false
    })
  };
}

function LiveStream() {
  const [events, setEvents] = useState(liveEvents);

  useEffect(() => {
    const timer = setInterval(() => {
      setEvents((current) => [
        createLiveEvent(),
        ...current.slice(0, 4)
      ]);
    }, 1800);

    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="p-5">
      <SectionHeader
        eyebrow="Telemetry"
        title="Live Stream"
        action={
          <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[.12em] text-sg-success">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sg-success" />
            Live
          </span>
        }
      />

      <div className="mt-5 space-y-1">
        {events.map((event, index) => {
          const Icon = event.icon;

          return (
            <div
              key={`${event.time}-${event.title}-${index}`}
              className={[
                "flex items-center gap-3 rounded-lg border border-transparent px-2 py-3 transition-all duration-500",
                index === 0
                  ? "bg-sg-elevated"
                  : "hover:border-sg-border hover:bg-sg-elevated"
              ].join(" ")}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-sg-border bg-sg-elevated text-sg-muted">
                <Icon size={14} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="truncate text-[11px] font-medium text-sg-text">
                  {event.title}
                </div>

                <div className="mt-0.5 truncate font-mono text-[9px] text-sg-muted">
                  {event.source}
                </div>
              </div>

              <div className="hidden shrink-0 sm:block">
                <SeverityBadge severity={event.severity} />
              </div>

              <div className="shrink-0 font-mono text-[8px] text-sg-muted">
                {event.time}
              </div>
            </div>
          );
        })}
      </div>

      <button className="mt-4 w-full rounded-lg border border-sg-border px-3 py-2 font-mono text-[9px] uppercase tracking-[.12em] text-sg-muted transition hover:bg-sg-elevated hover:text-sg-text">
        View telemetry
      </button>
    </Card>
  );
}

function OpenIncidents() {
  const incidents = [
    {
      id: "THR-20481",
      title: "Indirect prompt injection via ticket comment",
      type: "Prompt injection",
      severity: "Critical",
      actor: "j.doe_dev",
      status: "Investigating"
    },
    {
      id: "THR-20474",
      title: "Exfil attempt through MCP filesystem",
      type: "Data exfiltration",
      severity: "Critical",
      actor: "dataguard.bot",
      status: "Contained"
    },
    {
      id: "THR-20466",
      title: "Shadow model call outside registry",
      type: "Shadow LLM",
      severity: "High",
      actor: "m.ross_ml",
      status: "Open"
    },
    {
      id: "THR-20451",
      title: "Unsanitized code execution in eval harness",
      type: "Code execution",
      severity: "High",
      actor: "threathunter",
      status: "Investigating"
    },
    {
      id: "THR-20439",
      title: "PII in completion streamed to log drain",
      type: "PII leak",
      severity: "Medium",
      actor: "a.smith",
      status: "Resolved"
    }
  ];

  const severityStyles = {
    Critical: {
      color: "var(--sg-danger)",
      backgroundColor:
        "color-mix(in srgb, var(--sg-danger) 12%, transparent)"
    },
    High: {
      color: "var(--sg-warning)",
      backgroundColor:
        "color-mix(in srgb, var(--sg-warning) 12%, transparent)"
    },
    Medium: {
      color: "var(--sg-info)",
      backgroundColor:
        "color-mix(in srgb, var(--sg-info) 12%, transparent)"
    }
  };

  const statusStyles = {
    Investigating: {
      color: "var(--sg-warning)",
      backgroundColor:
        "color-mix(in srgb, var(--sg-warning) 12%, transparent)"
    },
    Contained: {
      color: "var(--sg-success)",
      backgroundColor:
        "color-mix(in srgb, var(--sg-success) 12%, transparent)"
    },
    Open: {
      color: "var(--sg-danger)",
      backgroundColor:
        "color-mix(in srgb, var(--sg-danger) 12%, transparent)"
    },
    Resolved: {
      color: "var(--sg-success)",
      backgroundColor:
        "color-mix(in srgb, var(--sg-success) 12%, transparent)"
    }
  };

  return (
    <Card className="h-full overflow-hidden">
      <div className="flex items-center justify-between border-b border-sg-border px-4 py-4">
        <h3 className="text-sm font-semibold text-sg-text">
          Open incidents
        </h3>

        <button
          type="button"
          className="sg-focus text-[11px] text-sg-muted transition hover:text-sg-text"
        >
          All threats
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse">
          <thead>
            <tr className="border-b border-sg-border">
              <th className="px-4 py-2.5 text-left font-mono text-[9px] font-normal uppercase tracking-[.1em] text-sg-muted">
                ID
              </th>

              <th className="px-4 py-2.5 text-left font-mono text-[9px] font-normal uppercase tracking-[.1em] text-sg-muted">
                Incident
              </th>

              <th className="px-4 py-2.5 text-left font-mono text-[9px] font-normal uppercase tracking-[.1em] text-sg-muted">
                Severity
              </th>

              <th className="px-4 py-2.5 text-left font-mono text-[9px] font-normal uppercase tracking-[.1em] text-sg-muted">
                Actor
              </th>

              <th className="px-4 py-2.5 text-left font-mono text-[9px] font-normal uppercase tracking-[.1em] text-sg-muted">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {incidents.map((incident) => (
              <tr
                key={incident.id}
                className="border-b border-sg-border last:border-b-0 transition hover:bg-sg-elevated"
              >
                {/* ID */}
                <td className="whitespace-nowrap px-4 py-3.5 align-middle">
                  <span className="font-mono text-[10px] text-sg-muted">
                    {incident.id}
                  </span>
                </td>

                {/* Incident */}
                <td className="px-4 py-3.5 align-middle">
                  <div className="min-w-[250px]">
                    <div className="text-[11px] font-semibold text-sg-text">
                      {incident.title}
                    </div>

                    <div className="mt-0.5 font-mono text-[9px] text-sg-muted">
                      {incident.type}
                    </div>
                  </div>
                </td>

                {/* Severity */}
                <td className="whitespace-nowrap px-4 py-3.5 align-middle">
                  <span
                    className="inline-flex rounded-full px-2 py-0.5 text-[9px] font-medium"
                    style={severityStyles[incident.severity]}
                  >
                    {incident.severity}
                  </span>
                </td>

                {/* Actor */}
                <td className="whitespace-nowrap px-4 py-3.5 align-middle">
                  <span className="text-[11px] text-sg-muted">
                    {incident.actor}
                  </span>
                </td>

                {/* Status */}
                <td className="whitespace-nowrap px-4 py-3.5 align-middle">
                  <span
                    className="inline-flex rounded-full px-2 py-0.5 text-[9px] font-medium"
                    style={statusStyles[incident.status]}
                  >
                    {incident.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function RiskRanking() {
  return (
    <Card className="p-5 h-full ">
      <SectionHeader
        eyebrow="Risk Engine"
        title="Risk Ranking"
        action={
          <Gauge size={16} className="text-sg-primary" />
        }
      />

      <div className="mt-5 space-y-4">
        {riskRanking.map((item) => (
          <div key={item.name}>
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="truncate text-[11px] font-medium text-sg-text">
                  {item.name}
                </div>

                <div className="mt-0.5 font-mono text-[8px] uppercase tracking-[.08em] text-sg-muted">
                  {item.type}
                </div>
              </div>

              <div className="font-mono text-[10px] text-sg-text">
                {item.score}
              </div>
            </div>

            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sg-elevated">
              <div
                className={[
                  "h-full rounded-full",
                  item.score >= 75
                    ? "bg-sg-danger"
                    : item.score >= 50
                      ? "bg-sg-warning"
                      : "bg-sg-primary"
                ].join(" ")}
                style={{ width: `${item.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function UsageTokens() {
  return (
    <Card className="p-5">
      <SectionHeader
        eyebrow="Consumption"
        title="Usage Tokens"
        action={<Zap size={15} className="text-sg-primary" />}
      />

      <div className="mt-5 flex items-end justify-between">
        <div>
          <div className="text-2xl font-semibold text-sg-text">
            18.4M
          </div>

          <div className="mt-1 font-mono text-[9px] uppercase tracking-[.1em] text-sg-muted">
            Tokens / month
          </div>
        </div>

        <div className="text-right">
          <div className="font-mono text-[10px] text-sg-primary">
            72%
          </div>

          <div className="mt-1 font-mono text-[8px] text-sg-muted">
            of allocation
          </div>
        </div>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-sg-elevated">
        <div
          className="h-full rounded-full bg-sg-primary"
          style={{ width: "72%" }}
        />
      </div>

      <div className="mt-3 flex justify-between font-mono text-[8px] text-sg-muted">
        <span>18.4M used</span>
        <span>25M limit</span>
      </div>
    </Card>
  );
}

function ToolMix() {
  return (
    <Card className="p-5">
      <SectionHeader
        eyebrow="Operations"
        title="Tool Mix"
      />

      <div className="mt-5 space-y-3">
        {toolMix.map((tool) => {
          const Icon = tool.icon;

          return (
            <div key={tool.name} className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-md border border-sg-border bg-sg-elevated text-sg-muted">
                <Icon size={13} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex justify-between">
                  <span className="text-[10px] text-sg-text">
                    {tool.name}
                  </span>

                  <span className="font-mono text-[9px] text-sg-muted">
                    {tool.value}%
                  </span>
                </div>

                <div className="mt-1 h-1 overflow-hidden rounded-full bg-sg-elevated">
                  <div
                    className="h-full rounded-full bg-sg-primary"
                    style={{ width: `${tool.value}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function SessionDuration() {
  return (
    <Card className="p-5">
      <SectionHeader
        eyebrow="Runtime"
        title="Session Duration"
        action={<Clock3 size={15} className="text-sg-primary" />}
      />

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-sg-border bg-sg-elevated p-3">
          <div className="font-mono text-[8px] uppercase tracking-[.1em] text-sg-muted">
            Median
          </div>

          <div className="mt-2 text-xl font-semibold text-sg-text">
            11m 42s
          </div>
        </div>

        <div className="rounded-lg border border-sg-border bg-sg-elevated p-3">
          <div className="font-mono text-[8px] uppercase tracking-[.1em] text-sg-muted">
            P95
          </div>

          <div className="mt-2 text-xl font-semibold text-sg-text">
            38m
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-[10px] text-sg-success">
        <Activity size={12} />
        <span>Within expected operating range</span>
      </div>
    </Card>
  );
}

export default function ControlRoom() {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-sg-bg">
      <div className="mx-auto max-w-[1500px] p-4 sm:p-6 lg:p-8">
        {/* Page Header */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[.2em] text-sg-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-sg-primary" />
              SaaviGen / Control Room
            </div>

            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-sg-text sm:text-3xl">
              AI Security Control Room
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-sg-muted">
              Live posture across models, agents, tools and guardrails.
            </p>
          </div>

          <div className="flex items-center gap-1 rounded-lg border border-sg-border bg-sg-surface p-1">
            {["24h", "7d", "30d"].map((range, index) => (
              <button
                key={range}
                className={[
                  "rounded-md px-3 py-1.5 font-mono text-[9px] uppercase tracking-[.1em] transition",
                  index === 0
                    ? "bg-sg-elevated text-sg-text"
                    : "text-sg-muted hover:text-sg-text"
                ].join(" ")}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* KPI Row */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            label="Events"
            value="2.45M"
            change="+12.4%"
            icon={Activity}
            note="processed today"
          />

          <KpiCard
            label="Critical Alerts"
            value="12"
            change="-18%"
            changeType="positive"
            icon={AlertTriangle}
            note="vs previous period"
          />

          <KpiCard
            label="Guard Posture"
            value="98.4%"
            icon={ShieldCheck}
            note="healthy enforcement"
          />

          <KpiCard
            label="Active Models"
            value="07"
            icon={Bot}
            note="6 healthy · 1 paused"
          />
        </div>

        {/* Main Grid */}
        <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(340px,.85fr)]">
          <Card className="p-5">
            <SectionHeader
              eyebrow="Threat Detection"
              title="Threat Activity"
              action={
                <div className="flex items-center gap-2 rounded-md border border-sg-border bg-sg-elevated px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[.1em] text-sg-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-sg-primary" />
                  Streaming
                </div>
              }
            />

            <ThreatChart />
          </Card>

          <LiveStream />
        </div>
<div className="mt-4 grid gap-4 lg:grid-cols-3">

        {/* Security Row */}
         <div className="lg:col-span-2">
          <OpenIncidents />
        </div>

        <div className="lg:col-span-1">
    <RiskRanking />
  </div>

  </div>

        {/* Operations Row */}
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <UsageTokens />
          <ToolMix />
          <SessionDuration />
        </div>

        {/* Footer status */}
        <div className="mt-5 flex flex-col gap-2 border-t border-sg-border pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[.12em] text-sg-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-sg-success" />
            All core systems operational
          </div>

          <div className="flex items-center gap-4 font-mono text-[8px] uppercase tracking-[.12em] text-sg-muted">
            <span className="flex items-center gap-1.5">
              <Terminal size={10} />
              Runtime 4.8.2
            </span>

            <span className="flex items-center gap-1.5">
              <Sparkles size={10} />
              SaaviGen AI
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}