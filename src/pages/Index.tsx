import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import DescriptionSection from "@/components/DescriptionSection";
import CoverageMapSection from "@/components/CoverageMapSection";
import HotelListingSection from "@/components/HotelListingSection";

import OnboardingSection from "@/components/OnboardingSection";


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
      <DescriptionSection />
      <CoverageMapSection />
      <HotelListingSection />
      
      <OnboardingSection />
      
      
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
