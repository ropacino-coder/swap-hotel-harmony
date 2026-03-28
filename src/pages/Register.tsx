import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StepCredentials from "@/components/register/StepCredentials";
import StepPersonal from "@/components/register/StepPersonal";
import StepHotelType from "@/components/register/StepHotelType";
import StepConfirmation from "@/components/register/StepConfirmation";

export interface RegistrationData {
  // Credentials
  email: string;
  password: string;
  // Personal
  firstName: string;
  lastName: string;
  documentType: "DNI" | "CI" | "Pasaporte";
  documentNumber: string;
  fiscalId: string;
  phone: string;
  hotelEmail: string;
  // Hotel
  legalRole: "propietario" | "inquilino" | "gerenciador";
  hotelType: "privado" | "sindical";
}

const initialData: RegistrationData = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  documentType: "DNI",
  documentNumber: "",
  fiscalId: "",
  phone: "",
  hotelEmail: "",
  legalRole: "propietario",
  hotelType: "privado",
};

const stepLabels = ["Credenciales", "Datos Personales", "Tipo de Hotel", "Confirmación"];

const Register = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<RegistrationData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const updateData = (partial: Partial<RegistrationData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  };

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const { error: authError } = await signUp(data.email, data.password);
      if (authError) {
        toast.error(authError.message);
        setIsSubmitting(false);
        return;
      }

      // Wait for session
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user?.id;
      if (!userId) {
        toast.success("Revisá tu email para confirmar tu cuenta y luego iniciá sesión.");
        navigate("/login");
        return;
      }

      const { error: profileError } = await supabase.from("profiles").insert({
        user_id: userId,
        first_name: data.firstName,
        last_name: data.lastName,
        document_type: data.documentType,
        document_number: data.documentNumber,
        fiscal_id: data.fiscalId,
        phone: data.phone,
        hotel_email: data.hotelEmail || null,
        legal_role: data.legalRole,
        hotel_type: data.hotelType,
      });

      if (profileError) {
        toast.error("Error creando perfil: " + profileError.message);
      } else {
        toast.success("¡Registro exitoso! Revisá tu email para confirmar tu cuenta.");
        navigate("/login");
      }
    } catch (e) {
      toast.error("Error inesperado. Intentá de nuevo.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-6 pt-28 pb-20">
        <div className="max-w-xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">
              Registrate en <span className="gold-text">Swap Hotels</span>
            </h1>
            <p className="text-muted-foreground text-sm">
              Solo titulares, locatarios o gerenciadores con poder de decisión.
            </p>
          </motion.div>

          {/* Step indicator */}
          <div className="flex items-center justify-between mb-10 max-w-md mx-auto">
            {stepLabels.map((label, i) => (
              <div key={label} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      i <= step
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-1 hidden sm:block">
                    {label}
                  </span>
                </div>
                {i < 3 && (
                  <div
                    className={`w-8 sm:w-12 h-px mx-1 transition-colors duration-300 ${
                      i < step ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Form card */}
          <div className="glass-card p-8">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <StepCredentials
                  key="cred"
                  data={data}
                  updateData={updateData}
                  onNext={next}
                />
              )}
              {step === 1 && (
                <StepPersonal
                  key="personal"
                  data={data}
                  updateData={updateData}
                  onNext={next}
                  onPrev={prev}
                />
              )}
              {step === 2 && (
                <StepHotelType
                  key="hotel"
                  data={data}
                  updateData={updateData}
                  onNext={next}
                  onPrev={prev}
                />
              )}
              {step === 3 && (
                <StepConfirmation
                  key="confirm"
                  data={data}
                  onPrev={prev}
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                />
              )}
            </AnimatePresence>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            ¿Ya tenés cuenta?{" "}
            <a href="/login" className="text-primary hover:underline font-medium">
              Iniciar sesión
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
