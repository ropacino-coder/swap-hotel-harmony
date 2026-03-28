import { motion } from "framer-motion";
import { ArrowLeft, Building2 } from "lucide-react";
import type { RegistrationData } from "@/pages/Register";

interface Props {
  data: RegistrationData;
  updateData: (d: Partial<RegistrationData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const roles = [
  {
    value: "propietario" as const,
    label: "Propietario",
    desc: "Titular del inmueble hotelero",
  },
  {
    value: "inquilino" as const,
    label: "Inquilino",
    desc: "Locatario con contrato vigente",
  },
  {
    value: "gerenciador" as const,
    label: "Gerenciador",
    desc: "Gestión operativa con contrato",
  },
];

const hotelTypes = [
  { value: "privado" as const, label: "Privado" },
  { value: "sindical" as const, label: "Sindical" },
];

const StepHotelType = ({ data, updateData, onNext, onPrev }: Props) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Legal Role */}
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-3">
          Figura jurídica declarada
        </label>
        <div className="space-y-3">
          {roles.map((role) => (
            <label
              key={role.value}
              className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                data.legalRole === role.value
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/30"
              }`}
            >
              <input
                type="radio"
                name="legalRole"
                value={role.value}
                checked={data.legalRole === role.value}
                onChange={() => updateData({ legalRole: role.value })}
                className="sr-only"
              />
              <div
                className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                  data.legalRole === role.value
                    ? "border-primary"
                    : "border-muted-foreground"
                }`}
              >
                {data.legalRole === role.value && (
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                )}
              </div>
              <div>
                <span className="font-medium text-sm">{role.label}</span>
                <p className="text-xs text-muted-foreground mt-0.5">{role.desc}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Hotel Type */}
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-3">
          Tipo de hotel
        </label>
        <div className="grid grid-cols-2 gap-3">
          {hotelTypes.map((type) => (
            <label
              key={type.value}
              className={`flex items-center justify-center gap-2 p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                data.hotelType === type.value
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/30"
              }`}
            >
              <input
                type="radio"
                name="hotelType"
                value={type.value}
                checked={data.hotelType === type.value}
                onChange={() => updateData({ hotelType: type.value })}
                className="sr-only"
              />
              <Building2
                className={`w-5 h-5 ${
                  data.hotelType === type.value
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              />
              <span className="font-medium text-sm">{type.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="p-4 rounded-xl border border-primary/20 bg-primary/5">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Nota:</strong> Esta declaración se
          cruza con la documentación de verificación posterior. Solo pueden
          registrarse personas con poder de decisión sobre el establecimiento.
        </p>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onPrev}
          className="flex items-center gap-2 px-5 py-3.5 rounded-xl border border-border text-foreground font-medium hover:border-primary/50 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Atrás
        </button>
        <button
          type="submit"
          className="flex-1 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-gold-light transition-all duration-300"
        >
          Siguiente
        </button>
      </div>
    </motion.form>
  );
};

export default StepHotelType;
