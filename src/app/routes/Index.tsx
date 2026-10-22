import { useEffect } from "react";
import Navbar from "@/shared/components/organisms/Navbar/Navbar";
import HeroSection from "@/app/routes/landing/components/HeroSection";
import LiveActivityStrip from "@/app/routes/landing/components/LiveActivityStrip";
import MarqueeSection from "@/app/routes/landing/components/MarqueeSection";
import FeaturedBuilders from "@/domains/profiles/components/FeaturedBuilders";
import FeaturedProjects from "@/domains/projects/components/FeaturedProjects";
import HowItWorks from "@/app/routes/landing/components/HowItWorks";
import CTASection from "@/app/routes/landing/components/CTASection";
import SiteFooter from "@/shared/components/organisms/Footer/SiteFooter";

const Index = () => {
  useEffect(() => {
    document.title = "Shipyards — The professional identity platform for AI builders";
  }, []);

  return (
    <div className="min-h-screen text-foreground flex flex-col selection:bg-primary/20 selection:text-primary relative">
      {/* Skip to main content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-card focus:text-foreground focus:border focus:border-border focus:rounded-md text-sm font-semibold"
      >
        Skip to main content
      </a>

      {/* Floating Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 relative z-10">
        {/* Hero with Interactive Terminal & Stats */}
        <HeroSection />

        {/* Real-time Activity Telemetry Strip */}
        <LiveActivityStrip />

        {/* Tech Stack Marquee */}
        <MarqueeSection />

        {/* Featured Builders Grid */}
        <FeaturedBuilders />

        {/* Featured Live Projects */}
        <FeaturedProjects />

        {/* How It Works Pipeline */}
        <HowItWorks />

        {/* Conversion CTA Section */}
        <CTASection />
      </main>

      {/* Site Footer */}
      <SiteFooter />
    </div>
  );
};

export default Index;

