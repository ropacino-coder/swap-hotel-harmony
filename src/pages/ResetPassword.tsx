import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Lock, CheckCircle } from "lucide-react";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setIsRecovery(true);
      }
    });

    // Check URL hash for recovery token
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) {
      setIsRecovery(true);
    }

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    if (password.length < 8) {
      toast.error("La contraseña debe tener al menos 8 caracteres");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      toast.error("Error al actualizar la contraseña. Intentá de nuevo.");
    } else {
      setSuccess(true);
      toast.success("¡Contraseña actualizada correctamente!");
      setTimeout(() => navigate("/login"), 3000);
    }
    setLoading(false);
  };

  const inputClass =
    "w-full px-4 py-3 pl-11 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 pt-20 sm:pt-28 pb-12 sm:pb-20 flex items-center justify-center min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold mb-2">
              Nueva <span className="text-primary">Contraseña</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Ingresá tu nueva contraseña
            </p>
          </div>

          <div className="glass-card p-5 sm:p-8 space-y-5">
            {success ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <p className="text-foreground font-medium">¡Contraseña actualizada!</p>
                <p className="text-sm text-muted-foreground">
                  Redirigiendo al login...
                </p>
              </div>
            ) : !isRecovery ? (
              <div className="text-center space-y-4">
                <p className="text-muted-foreground text-sm">
                  Este link no es válido o ya expiró. Solicitá uno nuevo desde el login.
                </p>
                <a
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline font-medium"
                >
                  Solicitar nuevo link
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-muted-foreground" />
                  <input
                    type="password"
                    required
                    placeholder="Nueva contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClass}
                    minLength={8}
                    maxLength={128}
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-muted-foreground" />
                  <input
                    type="password"
                    required
                    placeholder="Confirmar contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={inputClass}
                    minLength={8}
                    maxLength={128}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? "Actualizando..." : "Actualizar contraseña"}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword;
