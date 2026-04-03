import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import AIChatWidget from "@/components/AIChatWidget";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHome from "@/pages/dashboard/DashboardHome";
import DashboardMint from "@/pages/dashboard/DashboardMint";
import DashboardPool from "@/pages/dashboard/DashboardPool";
import DashboardTransactions from "@/pages/dashboard/DashboardTransactions";
import DashboardNotifications from "@/pages/dashboard/DashboardNotifications";
import DashboardSettings from "@/pages/dashboard/DashboardSettings";
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
import ComoFunciona from "./pages/ComoFunciona.tsx";
import Cancelaciones from "./pages/Cancelaciones.tsx";
import SwapUnitsPage from "./pages/SwapUnits.tsx";
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
            <Route path="/como-funciona" element={<ComoFunciona />} />
            <Route path="/cancelaciones" element={<Cancelaciones />} />
            <Route path="/swap-units" element={<SwapUnitsPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="mis-noches" element={<DashboardMint />} />
              <Route path="pool" element={<DashboardPool />} />
              <Route path="transacciones" element={<DashboardTransactions />} />
              <Route path="notificaciones" element={<DashboardNotifications />} />
              <Route path="configuracion" element={<DashboardSettings />} />
            </Route>
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
