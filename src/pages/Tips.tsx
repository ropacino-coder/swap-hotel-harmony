import Navbar from "@/components/Navbar";
import TipsSection from "@/components/TipsSection";
import Footer from "@/components/Footer";

const Tips = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="pt-24 pb-12">
      <TipsSection />
    </div>
    <Footer />
  </div>
);

export default Tips;
