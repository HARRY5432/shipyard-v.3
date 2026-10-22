import { Upload, Search, Handshake } from "lucide-react";
import { BlurFade } from "@/shared/components/magicui/blur-fade";
import SectionEyebrow from "@/shared/components/atoms/SectionEyebrow/SectionEyebrow";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Dock your builds",
    description:
      "Connect your deployed AI products — live links, stack, and proof of traction. Your profile becomes the record of what you have actually shipped.",
  },
  {
    icon: Search,
    step: "02",
    title: "Get discovered",
    description:
      "Founders search by skill, stack, and shipped work. Real products speak louder than any resume — and our matching surfaces the right ones.",
  },
  {
    icon: Handshake,
    step: "03",
    title: "Get hired & paid",
    description:
      "Connect directly with founders who need exactly what you have built. Direct contracts, milestone-based payment, no middlemen.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-28 px-6 relative">
      <div className="container max-w-6xl mx-auto">
        {/* Header */}
        <BlurFade delay={0.1} direction="up">
          <div className="text-center mb-16">
            <SectionEyebrow centered>How Shipyards works</SectionEyebrow>
            <h2 className="font-display text-h1 text-foreground">
              Three steps from shipped code
              <br />
              <span className="text-content-tertiary">to funded contract.</span>
            </h2>
          </div>
        </BlurFade>

        {/* Steps */}
        <BlurFade delay={0.2} direction="up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="group relative flex h-full flex-col rounded-2xl border border-border-subtle bg-card p-8 transition-all duration-300 ease-standard hover:-translate-y-1 hover:border-border-strong hover:shadow-elev-md"
                >
                  <div className="mb-8 flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl border border-border bg-surface-active flex items-center justify-center transition-colors duration-300 group-hover:border-primary/30">
                      <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                    </div>
                    <span className="font-display text-4xl font-light text-content-tertiary/40 tabular-nums">
                      {step.step}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-medium text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </BlurFade>
      </div>
    </section>
  );
};

export default HowItWorks;
