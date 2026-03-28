import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import AIChatWidget from "@/components/AIChatWidget";
import Index from "./pages/Index.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import HotelDetail from "./pages/HotelDetail.tsx";
import HotelUpload from "./pages/HotelUpload.tsx";
import Hoteles from "./pages/Hoteles.tsx";
import FAQ from "./pages/FAQ.tsx";
import Tips from "./pages/Tips.tsx";
import Guarantees from "./pages/Guarantees.tsx";
import Values from "./pages/Values.tsx";
import Pricing from "./pages/Pricing.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/register" element={<Register />} />
            <Route path="/hoteles" element={<Hoteles />} />
            <Route path="/hotel/:id" element={<HotelDetail />} />
            <Route path="/hotel/upload" element={<HotelUpload />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/consejos" element={<Tips />} />
            <Route path="/garantias" element={<Guarantees />} />
            <Route path="/valores" element={<Values />} />
            <Route path="/membresias" element={<Pricing />} />
            <Route path="/login" element={<Login />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
        <AIChatWidget />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
