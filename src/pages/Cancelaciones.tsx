import Navbar from "@/components/Navbar";
import CancellationPolicySection from "@/components/CancellationPolicySection";
import Footer from "@/components/Footer";

const Cancelaciones = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-24 pb-12">
      <CancellationPolicySection />
    </div>
    <Footer />
  </div>
);

export default Cancelaciones;
