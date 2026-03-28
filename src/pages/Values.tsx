import Navbar from "@/components/Navbar";
import ValuesSection from "@/components/ValuesSection";
import Footer from "@/components/Footer";

const Values = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-24 pb-12">
      <ValuesSection />
    </div>
    <Footer />
  </div>
);

export default Values;
