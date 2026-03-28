import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HotelListingSection from "@/components/HotelListingSection";
import PoolSection from "@/components/PoolSection";
import OnboardingSection from "@/components/OnboardingSection";
import ExchangeFlowSection from "@/components/ExchangeFlowSection";
import PricingSection from "@/components/PricingSection";
import SUCalculator from "@/components/SUCalculator";
import TechnologySection from "@/components/TechnologySection";
import BenefitsSection from "@/components/BenefitsSection";
import JoinSection from "@/components/JoinSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HotelListingSection />
      <PoolSection />
      <OnboardingSection />
      <ExchangeFlowSection />
      <PricingSection />
      <SUCalculator />
      <TechnologySection />
      <BenefitsSection />
      <JoinSection />
      <Footer />
    </div>
  );
};

export default Index;
