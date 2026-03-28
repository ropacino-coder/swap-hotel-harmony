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

import HospitalityCodeSection from "@/components/HospitalityCodeSection";

import TechnologySection from "@/components/TechnologySection";
import EconomySection from "@/components/EconomySection";
import BenefitsSection from "@/components/BenefitsSection";

import FAQSection from "@/components/FAQSection";
import JoinSection from "@/components/JoinSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <IdeaSection />
      <DescriptionSection />
      <CoverageMapSection />
      <HotelListingSection />
      <PoolSection />
      <OnboardingSection />
      <ExchangeFlowSection />
      <PricingSection />
      
      <HospitalityCodeSection />
      
      <TechnologySection />
      <EconomySection />
      <BenefitsSection />
      
      <JoinSection />
      <Footer />
    </div>
  );
};

export default Index;
