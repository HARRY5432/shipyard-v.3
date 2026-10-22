import { ShieldCheck, GitCommitHorizontal, Rocket, Lock } from "lucide-react";

const ITEMS = [
  {
    icon: GitCommitHorizontal,
    title: "Real commit history",
    description: "Repos are connected, not pasted.",
    accentClass: "text-primary border-primary/20",
    bgClass: "border-primary/20",
  },
  {
    icon: Rocket,
    title: "Live deployments",
    description: "Every dock links to a running product.",
    accentClass: "text-secondary border-secondary/20",
    bgClass: "border-secondary/20",
  },
  {
    icon: ShieldCheck,
    title: "Verified benchmarks",
    description: "Metrics carry timestamps and runs.",
    accentClass: "text-accent border-accent/20",
    bgClass: "border-accent/20",
  },
  {
    icon: Lock,
    title: "Escrow-backed contracts",
    description: "Payment releases on milestone proof.",
    accentClass: "text-primary border-primary/20",
    bgClass: "border-primary/20",
  },
];

/**
 * What Shipyards actually verifies. Static and honest — the platform's
 * credibility comes from the mechanism, not from fake live counters.
 */
const LiveActivityStrip = () => {
  return (
    <section aria-label="What Shipyards verifies" className="px-6">
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border-subtle rounded-2xl border border-border-subtle bg-card/60 shadow-elev-sm">
          {ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-start gap-3.5 px-6 py-5">
                <div className={`mt-0.5 w-8 h-8 shrink-0 rounded-lg border bg-surface-active flex items-center justify-center ${item.bgClass}`}>
                  <Icon className={`w-4 h-4 ${item.accentClass}`} aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-sm font-medium text-foreground">{item.title}</h2>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LiveActivityStrip;
