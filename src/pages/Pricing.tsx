import Navbar from "@/components/Navbar";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

const Pricing = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-24 pb-12">
      <PricingSection />
    </div>
    <Footer />
  </div>
);

export default Pricing;
