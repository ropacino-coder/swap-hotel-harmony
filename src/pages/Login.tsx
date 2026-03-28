import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { lovable } from "@/integrations/lovable/index";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Mail, Lock, Fingerprint } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if WebAuthn (biometric) is available
    if (window.PublicKeyCredential) {
      PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable?.()
        .then((available) => setBiometricAvailable(available))
        .catch(() => setBiometricAvailable(false));
    }
  }, []);

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

  const handleOAuth = async (provider: "google" | "apple") => {
    setOauthLoading(provider);
    try {
      const { error } = await lovable.auth.signInWithOAuth(provider, {
        redirect_uri: window.location.origin,
      });
      if (error) {
        toast.error(`Error al iniciar sesión con ${provider === "google" ? "Google" : "Apple"}`);
      }
    } catch (err) {
      toast.error("Error de conexión. Intentá de nuevo.");
    }
    setOauthLoading(null);
  };

  const handleBiometric = async () => {
    try {
      // Request biometric authentication using WebAuthn
      const credential = await navigator.credentials.get({
        publicKey: {
          challenge: crypto.getRandomValues(new Uint8Array(32)),
          timeout: 60000,
          userVerification: "required",
          rpId: window.location.hostname,
        },
      });

      if (credential) {
        toast.info("Reconocimiento biométrico verificado. Ingresá tu email para continuar.");
      }
    } catch (err) {
      toast.error("No se pudo completar la autenticación biométrica.");
    }
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
              Iniciar <span className="text-primary">Sesión</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Accedé a tu panel de hotel
            </p>
          </div>

          <div className="glass-card p-5 sm:p-8 space-y-5">
            {/* OAuth buttons */}
            <div className="space-y-2.5">
              <button
                onClick={() => handleOAuth("google")}
                disabled={!!oauthLoading}
                className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-border bg-card hover:bg-accent/50 transition-colors font-medium text-sm disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                {oauthLoading === "google" ? "Conectando..." : "Continuar con Google"}
              </button>

              <button
                onClick={() => handleOAuth("apple")}
                disabled={!!oauthLoading}
                className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-border bg-foreground text-background hover:opacity-90 transition-opacity font-medium text-sm disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                {oauthLoading === "apple" ? "Conectando..." : "Continuar con Apple"}
              </button>

              {/* Biometric button - only shown when available */}
              {biometricAvailable && (
                <button
                  onClick={handleBiometric}
                  className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors font-medium text-sm text-primary"
                >
                  <Fingerprint className="w-5 h-5" />
                  Usar reconocimiento facial / biometría
                </button>
              )}
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-3 text-muted-foreground">o con email</span>
              </div>
            </div>

            {/* Email form */}
            <form onSubmit={handleSubmit} className="space-y-4">
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
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "Ingresando..." : "Ingresar"}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

            <div className="text-center">
              <a href="/forgot-password" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>

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
