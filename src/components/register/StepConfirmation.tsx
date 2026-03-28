import { motion } from "framer-motion";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import type { RegistrationData } from "@/pages/Register";

interface Props {
  data: RegistrationData;
  onPrev: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const StepConfirmation = ({ data, onPrev, onSubmit, isSubmitting }: Props) => {
  const rows = [
    { label: "Email", value: data.email },
    { label: "Nombre", value: `${data.firstName} ${data.lastName}` },
    { label: "Documento", value: `${data.documentType} ${data.documentNumber}` },
    { label: "ID Fiscal", value: data.fiscalId },
    { label: "Teléfono", value: data.phone },
    { label: "Email hotel", value: data.hotelEmail || "—" },
    { label: "Figura jurídica", value: data.legalRole.charAt(0).toUpperCase() + data.legalRole.slice(1) },
    { label: "Tipo hotel", value: data.hotelType.charAt(0).toUpperCase() + data.hotelType.slice(1) },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h3 className="font-display font-semibold text-lg mb-1">
          Confirma tus datos
        </h3>
        <p className="text-xs text-muted-foreground">
          Revisá que todo esté correcto antes de crear tu cuenta.
        </p>
      </div>

      <div className="space-y-2">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-secondary/50"
          >
            <span className="text-sm text-muted-foreground">{row.label}</span>
            <span className="text-sm font-medium">{row.value}</span>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-xl border border-primary/20 bg-primary/5">
        <p className="text-xs text-muted-foreground leading-relaxed">
          El registro <strong className="text-foreground">no habilita</strong> la
          operación. Podrás avanzar con la carga del hotel, pero no publicar ni
          recibir solicitudes hasta completar la{" "}
          <strong className="text-foreground">verificación documental</strong>.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onPrev}
          disabled={isSubmitting}
          className="flex items-center gap-2 px-5 py-3.5 rounded-xl border border-border text-foreground font-medium hover:border-primary/50 transition-all disabled:opacity-40"
        >
          <ArrowLeft className="w-4 h-4" />
          Atrás
        </button>
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-gold-light transition-all duration-300 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Creando cuenta...
            </>
          ) : (
            <>
              <Check className="w-4 h-4" />
              Crear cuenta
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default StepConfirmation;
