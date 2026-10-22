import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, GitBranch, Star, Zap, Cpu, Activity } from "lucide-react";

const stats = [
  { label: "AI builders", value: "2,400", suffix: "+" },
  { label: "Projects shipped", value: "8,900", suffix: "+" },
  { label: "Platform commission", value: "0", suffix: "%" },
];

const dockedProjects = [
  {
    icon: Cpu,
    title: "vLLM-Function-Caller",
    status: "Live API",
    statusClass: "bg-accent/10 text-accent border-accent/20",
    description: "Sub-50ms function-call router tuned for parallel agentic workflows.",
    meta: "Eval 98.6%",
  },
  {
    icon: GitBranch,
    title: "LangGraph-Coder-Agent",
    status: "Open Source",
    statusClass: "bg-secondary/10 text-secondary border-secondary/20",
    description: "Multi-agent pair programmer with human-in-the-loop gates.",
    meta: "1.4k stars",
  },
];

const HeroSection = () => {
  return (
    <section className="relative flex min-h-[min(100svh,920px)] items-center overflow-hidden px-6 pb-20 pt-36">
      {/* Quiet ambient light — no mesh, no image, no glows */}
      <div className="absolute inset-0 bg-gradient-hero pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-10 items-center">
          {/* Left — editorial type */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <div className="mb-8 inline-flex items-center gap-2.5">
              <span className="h-px w-8 bg-primary/60" aria-hidden="true" />
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-content-tertiary">
                Professional identity for AI builders
              </p>
            </div>

            <h1 className="font-display text-[2.75rem] leading-[1.04] sm:text-6xl lg:text-[4.25rem] tracking-[-0.02em] text-foreground mb-7">
              Proof of work,
              <br />
              <span className="italic text-primary">verified.</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-[540px] mb-10">
              Shipyards is where AI builders dock their deployed products — live code,
              benchmarks, and metrics — and get discovered by founders who hire on
              proof, not resumes.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-14">
              <Link
                to="/projects"
                className="group inline-flex items-center justify-center gap-2.5 rounded-lg bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-elev-sm transition-all hover:opacity-90 active:scale-[0.98]"
              >
                Browse projects
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/sign-up"
                className="inline-flex items-center justify-center gap-2.5 rounded-lg border border-border-strong bg-card px-7 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-active"
              >
                Join as a builder
              </Link>
            </div>

            <dl className="grid w-full grid-cols-3 gap-8 border-t border-border-subtle pt-8">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse">
                  <dt className="mt-2 text-[10px] font-medium uppercase tracking-[0.18em] text-content-tertiary">
                    {stat.label}
                  </dt>
                  <dd className="font-display text-3xl font-medium tracking-tight text-foreground tabular-nums">
                    {stat.value}
                    <span className="text-xl text-primary">{stat.suffix}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right — the product, quietly */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
              {/* Hairline frame offset for depth — no glow, no tilt */}
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-3xl border border-primary/10 translate-x-4 translate-y-4"
              />

              <div className="relative rounded-2xl border border-border bg-card shadow-elev-lg overflow-hidden">
                {/* Card header */}
                <div className="flex items-center gap-4 px-6 pt-6 pb-5">
                  <div className="relative shrink-0">
                    <div className="w-14 h-14 rounded-xl border border-border bg-surface-active flex items-center justify-center overflow-hidden">
                      <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=alex-rivera&backgroundColor=0D1117"
                        alt=""
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-accent border-[3px] border-card" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-lg font-medium text-foreground truncate">
                        Alex Rivera
                      </h3>
                      <span className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                        <ShieldCheck className="w-3 h-3" aria-hidden="true" />
                        Verified
                      </span>
                    </div>
                    <p className="mt-0.5 font-mono text-xs text-content-tertiary">
                      @alex-rivera · Autonomous AI systems
                    </p>
                  </div>
                </div>

                <div className="h-px bg-border-subtle mx-6" />

                {/* Docked projects */}
                <div className="px-6 py-5 space-y-3">
                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-content-tertiary">
                    Docked
                  </p>
                  {dockedProjects.map((project) => {
                    const Icon = project.icon;
                    return (
                      <div
                        key={project.title}
                        className="flex items-center gap-3.5 rounded-xl border border-border-subtle bg-surface/60 px-4 py-3.5 transition-colors hover:border-border-strong"
                      >
                        <div className="w-9 h-9 shrink-0 rounded-lg border border-border bg-surface-active flex items-center justify-center">
                          <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="truncate text-sm font-medium text-foreground">
                              {project.title}
                            </h4>
                            <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-medium ${project.statusClass}`}>
                              {project.status}
                            </span>
                          </div>
                          <p className="mt-0.5 truncate text-xs text-muted-foreground">
                            {project.description}
                          </p>
                        </div>
                        <span className="shrink-0 font-mono text-[10px] text-content-tertiary tabular-nums">
                          {project.meta}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="h-px bg-border-subtle mx-6" />

                {/* Footer metrics */}
                <div className="grid grid-cols-3 divide-x divide-border-subtle">
                  {[
                    { icon: Zap, value: "2,480", label: "Reputation" },
                    { icon: Activity, value: "34", label: "Docks" },
                    { icon: Star, value: "2.8k", label: "Stars" },
                  ].map((metric) => {
                    const Icon = metric.icon;
                    return (
                      <div key={metric.label} className="flex flex-col items-center gap-1 px-2 py-4">
                        <Icon className="w-3.5 h-3.5 text-content-tertiary" aria-hidden="true" />
                        <span className="font-mono text-sm font-medium text-foreground tabular-nums">
                          {metric.value}
                        </span>
                        <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-content-tertiary">
                          {metric.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent pointer-events-none" aria-hidden="true" />
    </section>
  );
};

export default HeroSection;
