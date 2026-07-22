import { LandingNavbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero";
import { LogosSection } from "@/components/landing/logos";
import { FeaturesSection } from "@/components/landing/features";
import { ShowcaseSection } from "@/components/landing/showcase";
import { BenefitsSection } from "@/components/landing/benefits";
import { StatsSection } from "@/components/landing/stats";
import { TestimonialsSection } from "@/components/landing/testimonials";
import { FAQSection } from "@/components/landing/faq";
import { CTASection } from "@/components/landing/cta";
import { LandingFooter } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingNavbar />
      <main className="flex-1">
        <HeroSection />
        <LogosSection />
        <FeaturesSection />
        <ShowcaseSection />
        <StatsSection />
        <BenefitsSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <LandingFooter />
    </div>
  );
}
