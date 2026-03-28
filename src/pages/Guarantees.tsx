import Navbar from "@/components/Navbar";
import GuaranteesSection from "@/components/GuaranteesSection";
import Footer from "@/components/Footer";

const Guarantees = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-24 pb-12">
      <GuaranteesSection />
    </div>
    <Footer />
  </div>
);

export default Guarantees;
