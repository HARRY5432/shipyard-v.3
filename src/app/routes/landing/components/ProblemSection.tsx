import { useRef } from "react";
import { CheckCircle2, XCircle, FolderGit2, Star, Trophy, ArrowRight, Lock, Zap, ExternalLink } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMotionPreference } from "@/shared/components/providers/MotionProvider";

export const ProblemSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { reduced } = useMotionPreference();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 0.2"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [10, 0]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [-5, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.93, 1.0]);
  const translateY = useTransform(scrollYProgress, [0, 1], [35, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [0.4, 0.9, 1]);

  return (
    <section ref={sectionRef} className="relative py-20 border-b border-border overflow-hidden" id="problem">
      {/* Background canvas dots */}
      <div className="absolute inset-0 pointer-events-none bg-canvas-dots opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Problem Copy */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px 250px 0px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="lg:col-span-5 space-y-8 relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/5 border border-destructive/20 backdrop-blur-md text-[11px] font-semibold uppercase tracking-[0.15em] text-destructive shadow-[0_0_20px_rgba(239,68,68,0.05)]">
              <XCircle className="w-3.5 h-3.5 opacity-80" />
              <span>The Fragmented Identity Problem</span>
            </div>

            <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground tracking-tight leading-[1.05]">
              Your work is everywhere.<br />
              <span className="text-muted-foreground/60 font-light">Your reputation is nowhere.</span>
            </h2>

            <div className="space-y-6 text-muted-foreground/80 text-lg leading-[1.7] font-medium max-w-[480px]">
              <p>
                As an AI builder, your best work lives across GitHub repositories, Hugging Face spaces, Vercel demo URLs, X build logs, and Discord threads.
              </p>
              
              <p>
                Traditional resumes can't represent fine-tuned LLM performance, agent architecture, or live latency benchmarks. <span className="text-foreground/90 font-semibold">Founders hiring AI talent are tired of guessing.</span>
              </p>
            </div>

            <div className="pt-4 flex items-center gap-3 text-sm font-semibold text-primary group cursor-pointer w-fit">
              <span className="group-hover:text-primary/80 transition-colors">Shipyards unifies all your live proof into one verified identity.</span>
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Real Product Visual App Preview with 3D Perspective Scroll */}
          <div className="lg:col-span-7 [perspective:1200px] mt-8 lg:mt-0">
            <motion.div
              style={
                reduced
                  ? {}
                  : {
                      rotateX,
                      rotateY,
                      scale,
                      translateY,
                      opacity,
                      transformStyle: "preserve-3d",
                    }
              }
              className="rounded-xl border border-white/10 bg-[#0A0A0A] shadow-[0_0_80px_-20px_rgba(0,0,0,0.5)] overflow-hidden ring-1 ring-white/5 transition-transform duration-200"
            >
              
              {/* Browser Header Bar */}
              <div className="bg-[#111111] px-4 py-3 border-b border-white/5 flex items-center justify-between">
                {/* Traffic Lights */}
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                  <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
                </div>

                {/* Mock Address Bar */}
                <div className="px-6 py-1.5 rounded-md bg-[#0D1117] border border-white/5 text-[11px] font-mono text-[#8B949E] flex items-center justify-center gap-2 max-w-[280px] w-full truncate shadow-inner">
                  <Lock className="w-3 h-3 text-[#27C93F] shrink-0" />
                  <span>shipyards.dev/@alex-rivera</span>
                </div>

                {/* Top-right Status */}
                <div className="flex items-center justify-end gap-2 text-[10px] text-[#27C93F] font-bold uppercase tracking-widest min-w-[80px] select-none">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#27C93F] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#27C93F]"></span>
                  </span>
                  <span className="hidden sm:inline">Verified</span>
                </div>
              </div>

              {/* Browser Body / Real Product Preview */}
              <div className="p-4 sm:p-6 bg-[#0D1117] space-y-4 text-left">
                
                {/* 1. Mini Builder Profile Header */}
                <div className="p-5 rounded-lg bg-[#161B22] border border-white/5 shadow-sm space-y-5">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    
                    {/* 96px Avatar */}
                    <div className="w-20 h-20 sm:w-20 sm:h-20 rounded-xl border border-white/10 overflow-hidden shrink-0 flex items-center justify-center shadow-lg relative group">
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#3FB950]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=alex-rivera&backgroundColor=0D1117"
                        alt="Alex Rivera"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover scale-[1.1] transition-transform duration-500 group-hover:scale-[1.15]"
                      />
                    </div>

                    {/* Builder Info */}
                    <div className="space-y-2 flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-display font-bold text-xl text-[#E6EDF3] tracking-tight truncate">
                          Alex Rivera
                        </h3>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#238636]/10 border border-[#238636]/30 text-[10px] font-mono font-bold text-[#3FB950]">
                          <CheckCircle2 className="w-3 h-3" />
                          Verified Builder
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#D2A8FF]/10 border border-[#D2A8FF]/20 text-[10px] font-mono font-semibold text-[#D2A8FF]">
                          <Trophy className="w-3 h-3" />
                          Top 1% Agent Architect
                        </span>
                      </div>
                      <p className="font-mono text-xs text-[#8B949E] leading-relaxed">
                        @alex-rivera · Autonomous AI Systems • LangGraph • vLLM • Fine-Tuning
                      </p>
                    </div>
                  </div>

                  {/* Stat Cells */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 border-t border-white/5">
                    <div className="p-3 rounded-lg bg-[#0D1117] border border-white/5 text-center group hover:bg-white/[0.02] transition-colors">
                      <div className="flex items-center justify-center gap-1.5 text-sm font-mono font-bold text-[#E6EDF3]">
                        <Trophy className="w-4 h-4 text-[#D2A8FF]" />
                        <span>2,480</span>
                      </div>
                      <p className="text-[10px] font-mono text-[#8B949E] uppercase tracking-wider mt-1.5 group-hover:text-[#E6EDF3] transition-colors">Reputation</p>
                    </div>
                    <div className="p-3 rounded-lg bg-[#0D1117] border border-white/5 text-center group hover:bg-white/[0.02] transition-colors">
                      <div className="flex items-center justify-center gap-1.5 text-sm font-mono font-bold text-[#E6EDF3]">
                        <FolderGit2 className="w-4 h-4 text-[#3FB950]" />
                        <span>34</span>
                      </div>
                      <p className="text-[10px] font-mono text-[#8B949E] uppercase tracking-wider mt-1.5 group-hover:text-[#E6EDF3] transition-colors">Docks</p>
                    </div>
                    <div className="p-3 rounded-lg bg-[#0D1117] border border-white/5 text-center group hover:bg-white/[0.02] transition-colors">
                      <div className="flex items-center justify-center gap-1.5 text-sm font-mono font-bold text-[#E6EDF3]">
                        <Star className="w-4 h-4 text-[#FFBD2E]" />
                        <span>2.8k</span>
                      </div>
                      <p className="text-[10px] font-mono text-[#8B949E] uppercase tracking-wider mt-1.5 group-hover:text-[#E6EDF3] transition-colors">Stars</p>
                    </div>
                    <div className="p-3 rounded-lg bg-[#0D1117] border border-white/5 text-center group hover:bg-white/[0.02] transition-colors">
                      <div className="flex items-center justify-center gap-1.5 text-sm font-mono font-bold text-[#E6EDF3]">
                        <Zap className="w-4 h-4 text-[#58A6FF]" />
                        <span>98.6%</span>
                      </div>
                      <p className="text-[10px] font-mono text-[#8B949E] uppercase tracking-wider mt-1.5 group-hover:text-[#E6EDF3] transition-colors">Eval Score</p>
                    </div>
                  </div>
                </div>

                {/* 2. Featured Projects */}
                <div className="space-y-3">
                  <div className="p-4 rounded-lg bg-[#161B22] border border-white/5 space-y-3 hover:border-white/10 transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1.5 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#3FB950]/10 text-[#3FB950] border border-[#3FB950]/20">
                            Live API
                          </span>
                          <span className="text-[10px] font-mono text-[#8B949E] font-medium bg-[#0D1117] px-2 py-0.5 rounded border border-white/5">
                            TypeScript
                          </span>
                        </div>
                        <h4 className="font-display font-bold text-[15px] text-[#E6EDF3] tracking-tight truncate">
                          vLLM-Function-Caller
                        </h4>
                      </div>
                      <span className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md bg-[#21262D] border border-white/5 text-[11px] font-mono text-[#E6EDF3] hover:bg-[#30363D] transition-colors cursor-pointer shrink-0">
                        <ExternalLink className="w-3.5 h-3.5" />
                        Demo
   Demo
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Sub-50ms latency function call router tuned on Qwen2.5-72B for parallel agentic workflows.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-card border border-border-subtle space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-primary/10 text-primary border border-primary/20">
                            Open Source
                          </span>
                        </div>
                        <h4 className="font-display font-bold text-sm text-foreground truncate">
                          LangGraph-Coder-Agent
                        </h4>
                      </div>

                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded border border-border-subtle text-[10px] font-mono text-primary shrink-0">
                        <Star className="w-3 h-3 text-accent" />
                        1,420 Stars
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Multi-agent pair programmer with automatic lint error correction loops & human-in-the-loop gates.
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
