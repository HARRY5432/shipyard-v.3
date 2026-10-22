import { Star, Code2, ShieldCheck, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import TechBadge from "@/shared/components/atoms/TechBadge/TechBadge";

export interface Builder {
  id: number;
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  stack: string[];
  projects: number;
  stars: number;
  badge: string;
  badgeColor: "cyan" | "purple" | "green";
}

const badgeStyles = {
  cyan: "bg-primary/10 text-primary border-primary/20",
  purple: "bg-secondary/10 text-secondary-bright border-secondary/20",
  green: "bg-accent/10 text-accent border-accent/20",
};

const BuilderCard = ({ builder }: { builder: Builder }) => {
  const badgeClass = badgeStyles[builder.badgeColor];

  return (
    <div className="relative flex h-full flex-col rounded-2xl border border-border-subtle bg-card p-6 transition-all duration-300 ease-standard hover:-translate-y-1 hover:border-border-strong hover:shadow-elev-md">
      {/* Header Info */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <img
            loading="lazy"
            src={builder.avatar}
            alt={builder.name}
            className="w-12 h-12 shrink-0 rounded-xl border border-border object-cover bg-muted"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <Link
                to={`/builder/${builder.handle.replace("@", "")}`}
                className="truncate text-sm font-medium text-foreground leading-none hover:text-primary transition-colors"
              >
                {builder.name}
              </Link>
              <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-primary" aria-hidden="true" />
            </div>
            <Link
              to={`/builder/${builder.handle.replace("@", "")}`}
              className="mt-1 block truncate text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              {builder.handle}
            </Link>
          </div>
        </div>

        <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider ${badgeClass}`}>
          {builder.badge}
        </span>
      </div>

      {/* Bio */}
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">
        {builder.bio}
      </p>

      {/* Tech Stack */}
      <div className="mb-6 flex flex-wrap gap-1.5">
        {builder.stack.map((tech) => (
          <TechBadge key={tech} name={tech} size="sm" />
        ))}
      </div>

      {/* Metrics & Profile Link */}
      <div className="mt-auto flex items-center justify-between border-t border-border-subtle pt-4">
        <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground tabular-nums">
          <span className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
            {builder.stars.toLocaleString()}
          </span>
          <span className="flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
            {builder.projects} shipped
          </span>
        </div>
        <Link
          to={`/builder/${builder.handle.replace("@", "")}`}
          className="flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-foreground"
        >
          View profile
          <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
};

export default BuilderCard;
