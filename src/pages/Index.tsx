import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import IdeaSection from "@/components/IdeaSection";
import DescriptionSection from "@/components/DescriptionSection";
import CoverageMapSection from "@/components/CoverageMapSection";
import HotelListingSection from "@/components/HotelListingSection";
import PoolSection from "@/components/PoolSection";
import OnboardingSection from "@/components/OnboardingSection";
import ExchangeFlowSection from "@/components/ExchangeFlowSection";
import PricingSection from "@/components/PricingSection";
import SUCalculator from "@/components/SUCalculator";
import ValuesSection from "@/components/ValuesSection";
import HospitalityCodeSection from "@/components/HospitalityCodeSection";
import GuaranteesSection from "@/components/GuaranteesSection";
import TechnologySection from "@/components/TechnologySection";
import EconomySection from "@/components/EconomySection";
import BenefitsSection from "@/components/BenefitsSection";
import TipsSection from "@/components/TipsSection";
import FAQSection from "@/components/FAQSection";
import JoinSection from "@/components/JoinSection";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      {/* 1. Problema → 2. Idea → 3. Descripción */}
      <ProblemSection />
      <SectionDivider variant="dots" />
      <IdeaSection />
      <SectionDivider variant="wave" />
      <DescriptionSection />
      <SectionDivider variant="line" />
      <CoverageMapSection />
      {/* 4. Hoteles → 5. Pool → Cómo funciona */}
      <SectionDivider variant="dots" />
      <HotelListingSection />
      <SectionDivider variant="wave" />
      <PoolSection />
      <SectionDivider variant="line" />
      <OnboardingSection />
      <SectionDivider variant="dots" />
      <ExchangeFlowSection />
      <SectionDivider variant="wave" />
      <PricingSection />
      <SUCalculator />
      {/* 6. Valores y confianza */}
      <SectionDivider variant="dots" />
      <ValuesSection />
      <SectionDivider variant="wave" />
      <HospitalityCodeSection />
      <SectionDivider variant="line" />
      <GuaranteesSection />
      <SectionDivider variant="dots" />
      <TechnologySection />
      <SectionDivider variant="wave" />
      <EconomySection />
      <SectionDivider variant="line" />
      <BenefitsSection />
      <SectionDivider variant="dots" />
      <TipsSection />
      {/* 7. FAQ → CTA */}
      <SectionDivider variant="wave" />
      <FAQSection />
      <JoinSection />
      <Footer />
    </div>
  );
};

export default Index;
