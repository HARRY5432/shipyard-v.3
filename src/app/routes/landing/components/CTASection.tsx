import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { BlurFade } from "@/shared/components/magicui/blur-fade";
import SectionEyebrow from "@/shared/components/atoms/SectionEyebrow/SectionEyebrow";

const CTASection = () => {
  return (
    <section id="hire" className="py-20 md:py-28 px-6 relative">
      <div className="container max-w-5xl mx-auto">
        {/* Header */}
        <BlurFade delay={0.1} direction="up">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <SectionEyebrow centered>Get started</SectionEyebrow>
            <h2 className="font-display text-h1 text-foreground mb-4">
              Ready to be known for
              <br />
              <span className="text-content-tertiary">what you have actually built?</span>
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Whether you ship agentic architectures or fund the teams that build them,
              Shipyards gives both sides a common ground: verified work.
            </p>
          </div>
        </BlurFade>

        {/* Dual Cards */}
        <BlurFade delay={0.2} direction="up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Card 1: For Builders */}
            <div className="flex flex-col rounded-2xl border border-border-subtle bg-surface p-8 md:p-10 transition-all duration-300 hover:border-border-strong hover:shadow-elev-md">
              <div className="flex h-full flex-col">
                <span className="mb-6 inline-block w-fit rounded-full border border-border-subtle bg-surface-elevated px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  For AI builders
                </span>

                <h3 className="font-display text-2xl md:text-3xl font-medium tracking-[-0.01em] text-foreground mb-4">
                  Dock your builds.
                  <br />
                  <span className="text-content-tertiary">Get found for them.</span>
                </h3>

                <p className="mb-7 text-sm leading-relaxed text-muted-foreground">
                  Join thousands of builders showcasing live code, integrations, and
                  deployed agents. Get discovered by founders who hire on speed and quality.
                </p>

                <ul className="mb-8 space-y-3 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2.5">
                    <span className="h-1 w-4 rounded-full bg-primary" aria-hidden="true" />
                    No resumes — only live URLs and verified metrics
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="h-1 w-4 rounded-full bg-primary" aria-hidden="true" />
                    Semantic indexing of the code you have shipped
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="h-1 w-4 rounded-full bg-primary" aria-hidden="true" />
                    Keep every dollar of contract value — 0% commission
                  </li>
                </ul>

                <Link
                  to="/sign-up"
                  className="group mt-auto inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-elev-sm transition-all hover:opacity-90 active:scale-[0.98]"
                >
                  Join as a builder
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            {/* Card 2: For Founders */}
            <div className="flex flex-col rounded-2xl border border-border-subtle bg-surface p-8 md:p-10 transition-all duration-300 hover:border-border-strong hover:shadow-elev-md">
              <div className="flex h-full flex-col">
                <span className="mb-6 inline-block w-fit rounded-full border border-secondary/25 bg-secondary/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-secondary">
                  For founders
                </span>

                <h3 className="font-display text-2xl md:text-3xl font-medium tracking-[-0.01em] text-foreground mb-4">
                  Hire on code proof.
                  <br />
                  <span className="text-content-tertiary">Not portfolio claims.</span>
                </h3>

                <p className="mb-7 text-sm leading-relaxed text-muted-foreground">
                  Search builders by the exact APIs and patterns you need. Review the
                  products they have deployed — not a slide deck about them.
                </p>

                <ul className="mb-8 space-y-3 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2.5">
                    <span className="h-1 w-4 rounded-full bg-secondary" aria-hidden="true" />
                    Search by exact stack and shipped work
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="h-1 w-4 rounded-full bg-secondary" aria-hidden="true" />
                    Escrow-protected, milestone-based contracts
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="h-1 w-4 rounded-full bg-secondary" aria-hidden="true" />
                    Verified deployments and benchmarks on every profile
                  </li>
                </ul>

                <Link
                  to="/projects"
                  className="group mt-auto inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border-strong bg-surface-elevated px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  Browse shipped projects
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
};

export default CTASection;
