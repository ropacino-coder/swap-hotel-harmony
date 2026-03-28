import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PoolSection from "@/components/PoolSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import BlockchainSection from "@/components/BlockchainSection";
import JoinSection from "@/components/JoinSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <PoolSection />
      <HowItWorksSection />
      <BlockchainSection />
      <JoinSection />
      <Footer />
    </div>
  );
};

export default Index;
