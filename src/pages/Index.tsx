import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PoolSection from "@/components/PoolSection";
import OnboardingSection from "@/components/OnboardingSection";
import ExchangeFlowSection from "@/components/ExchangeFlowSection";
import PricingSection from "@/components/PricingSection";
import SUCalculator from "@/components/SUCalculator";
import BlockchainSection from "@/components/BlockchainSection";
import BenefitsSection from "@/components/BenefitsSection";
import JoinSection from "@/components/JoinSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <PoolSection />
      <OnboardingSection />
      <ExchangeFlowSection />
      <PricingSection />
      <SUCalculator />
      <BlockchainSection />
      <BenefitsSection />
      <JoinSection />
      <Footer />
    </div>
  );
};

export default Index;
