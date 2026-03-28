import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Mail, Lock } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    const { error } = await signIn(email, password);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("¡Bienvenido de vuelta!");
      navigate("/");
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
              Iniciar <span className="gold-text">Sesión</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Accedé a tu panel de hotel
            </p>
          </div>

          <form onSubmit={handleSubmit} className="glass-card p-5 sm:p-8 space-y-5">
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                required
                placeholder="tu@hotel.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                maxLength={255}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-muted-foreground" />
              <input
                type="password"
                required
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                minLength={8}
                maxLength={128}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-gold-light transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Ingresando..." : "Ingresar"}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-6">
            ¿No tenés cuenta?{" "}
            <a href="/register" className="text-primary hover:underline font-medium">
              Registrate
            </a>
          </p>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
