import { motion } from "framer-motion";
import { User, CreditCard, Phone, Mail, ArrowLeft } from "lucide-react";
import type { RegistrationData } from "@/pages/Register";

interface Props {
  data: RegistrationData;
  updateData: (d: Partial<RegistrationData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const inputClass =
  "w-full px-4 py-3 pl-11 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all";
const selectClass =
  "w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer";

const StepPersonal = ({ data, updateData, onNext, onPrev }: Props) => {
  const canProceed =
    data.firstName.trim() &&
    data.lastName.trim() &&
    data.documentNumber.trim() &&
    data.fiscalId.trim() &&
    data.phone.trim();

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
      className="space-y-4"
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Nombre
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-3.5 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              required
              placeholder="Nombre"
              value={data.firstName}
              onChange={(e) => updateData({ firstName: e.target.value })}
              className={inputClass}
              maxLength={100}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Apellido
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-3.5 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              required
              placeholder="Apellido"
              value={data.lastName}
              onChange={(e) => updateData({ lastName: e.target.value })}
              className={inputClass}
              maxLength={100}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Tipo Doc.
          </label>
          <select
            value={data.documentType}
            onChange={(e) =>
              updateData({ documentType: e.target.value as RegistrationData["documentType"] })
            }
            className={selectClass}
          >
            <option value="DNI">DNI (ARG/PAR)</option>
            <option value="CI">CI (URU/CHI)</option>
            <option value="Pasaporte">Pasaporte</option>
          </select>
        </div>
        <div className="col-span-3">
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Número de Documento
          </label>
          <div className="relative">
            <CreditCard className="absolute left-3.5 top-3.5 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              required
              placeholder="12345678"
              value={data.documentNumber}
              onChange={(e) => updateData({ documentNumber: e.target.value })}
              className={inputClass}
              maxLength={20}
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-2">
          CUIT / RUT / RUC / ID Fiscal
        </label>
        <div className="relative">
          <CreditCard className="absolute left-3.5 top-3.5 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            required
            placeholder="20-12345678-9"
            value={data.fiscalId}
            onChange={(e) => updateData({ fiscalId: e.target.value })}
            className={inputClass}
            maxLength={30}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-2">
          Teléfono móvil
        </label>
        <div className="relative">
          <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-muted-foreground" />
          <input
            type="tel"
            required
            placeholder="+54 11 1234-5678"
            value={data.phone}
            onChange={(e) => updateData({ phone: e.target.value })}
            className={inputClass}
            maxLength={20}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-2">
          Email del hotel (opcional, respaldo)
        </label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-muted-foreground" />
          <input
            type="email"
            placeholder="recepcion@mihotel.com"
            value={data.hotelEmail}
            onChange={(e) => updateData({ hotelEmail: e.target.value })}
            className={inputClass}
            maxLength={255}
          />
        </div>
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
          disabled={!canProceed}
          className="flex-1 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-gold-light transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Siguiente
        </button>
      </div>
    </motion.form>
  );
};

export default StepPersonal;
