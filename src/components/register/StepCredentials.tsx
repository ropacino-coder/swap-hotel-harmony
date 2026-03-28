import { motion } from "framer-motion";
import { Mail, Lock, Info } from "lucide-react";
import type { RegistrationData } from "@/pages/Register";

interface Props {
  data: RegistrationData;
  updateData: (d: Partial<RegistrationData>) => void;
  onNext: () => void;
}

const inputClass =
  "w-full px-4 py-3 pl-11 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all";

const StepCredentials = ({ data, updateData, onNext }: Props) => {
  const canProceed = data.email.includes("@") && data.password.length >= 8;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canProceed) onNext();
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-2">
          Email principal
        </label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-muted-foreground" />
          <input
            type="email"
            required
            placeholder="tu@hotel.com"
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
            className={inputClass}
            maxLength={255}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
          <Info className="w-3 h-3" />
          Recomendamos el email del dominio del hotel
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-2">
          Contraseña
        </label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-muted-foreground" />
          <input
            type="password"
            required
            placeholder="Mínimo 8 caracteres"
            value={data.password}
            onChange={(e) => updateData({ password: e.target.value })}
            className={inputClass}
            minLength={8}
            maxLength={128}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!canProceed}
        className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-gold-light transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Siguiente
      </button>
    </motion.form>
  );
};

export default StepCredentials;
