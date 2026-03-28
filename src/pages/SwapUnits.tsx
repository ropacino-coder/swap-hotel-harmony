import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import SwapUnitsPoolSection from "@/components/SwapUnitsPoolSection";
import Footer from "@/components/Footer";

const SwapUnits = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12">
        <SwapUnitsPoolSection />
      </div>
      <Footer />
    </div>
  );
};

export default SwapUnits;
