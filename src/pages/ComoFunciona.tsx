import Navbar from "@/components/Navbar";
import IdeaSection from "@/components/IdeaSection";
import ExchangeFlowSection from "@/components/ExchangeFlowSection";
import Footer from "@/components/Footer";

const ComoFunciona = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <IdeaSection />
        <ExchangeFlowSection />
      </div>
      <Footer />
    </div>
  );
};

export default ComoFunciona;
