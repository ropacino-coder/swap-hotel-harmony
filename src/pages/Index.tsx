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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      {/* 1. Problema → 2. Idea → 3. Descripción */}
      <ProblemSection />
      <IdeaSection />
      <DescriptionSection />
      <CoverageMapSection />
      {/* 4. Hoteles → 5. Pool → Cómo funciona */}
      <HotelListingSection />
      <PoolSection />
      <OnboardingSection />
      <ExchangeFlowSection />
      <PricingSection />
      <SUCalculator />
      {/* 6. Valores y confianza */}
      <ValuesSection />
      <HospitalityCodeSection />
      <GuaranteesSection />
      <TechnologySection />
      <EconomySection />
      <BenefitsSection />
      <TipsSection />
      {/* 7. FAQ → CTA */}
      <FAQSection />
      <JoinSection />
      <Footer />
    </div>
  );
};

export default Index;
