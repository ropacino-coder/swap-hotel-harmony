import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Search, Calculator, Send, CheckCircle, CreditCard, LogOut,
} from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Selección y Configuración",
    description:
      "El huésped autorizado elige destino, hotel, fechas y tipo de habitación. De 2 a 12 personas por reserva.",
    status: "Sin compromiso",
  },
  {
    icon: Calculator,
    number: "02",
    title: "Cálculo y Proyección",
    description:
      "El motor aplica la fórmula: SU = Valor Base × Tipo Habitación × Ocupación × Noches. Visualizás SU necesarias vs. saldo disponible.",
    status: "Sin compromiso",
  },
  {
    icon: Send,
    number: "03",
    title: "Solicitud al Hotel",
    description:
      "Se envía la propuesta al hotel anfitrión. No se pagan fees ni se bloquean SU. El anfitrión tiene 24 horas para responder.",
    status: "Pendiente",
  },
  {
    icon: CheckCircle,
    number: "04",
    title: "Confirmación Operativa",
    description:
      "El anfitrión confirma haber cargado la reserva en su PMS y bloqueado la habitación. Garantiza la existencia del lugar.",
    status: "Confirmado",
  },
  {
    icon: CreditCard,
    number: "05",
    title: "Cierre de Reserva",
    description:
      "El huésped paga la Tarifa de Servicio (USD) por pasarela de pagos. Las SU pasan de 'Disponible' a 'Retenida'. Se emite el voucher.",
    status: "Pagado",
  },
  {
    icon: LogOut,
    number: "06",
    title: "Check-out y Acreditación",
    description:
      "Al finalizar la estadía, las SU retenidas se transfieren definitivamente al saldo del hotel anfitrión.",
    status: "Completado",
  },
];

const ExchangeFlowSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="flow" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">
            Flujo Completo
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-3 mb-4 text-balance">
            De la idea al{" "}
            <span className="gold-text">check-out</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
            6 pasos transparentes. Sin retención de SU hasta la confirmación operativa del anfitrión.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent hidden md:block" />

          <div className="space-y-8 md:space-y-12">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.15 * i, duration: 0.6 }}
                  className={`flex items-start gap-6 md:gap-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Card */}
                  <div className={`flex-1 glass-card-hover p-6 ${isLeft ? "md:mr-10" : "md:ml-10"}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <step.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <span className="text-xs text-primary font-bold">
                          PASO {step.number}
                        </span>
                        <h3 className="font-display font-semibold text-lg leading-tight">
                          {step.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                    <div className="mt-3">
                      <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">
                        {step.status}
                      </span>
                    </div>
                  </div>

                  {/* Center dot (desktop) */}
                  <div className="hidden md:flex items-center justify-center w-4 h-4 rounded-full bg-primary flex-shrink-0 mt-6 relative z-10 shadow-[0_0_12px_hsla(38,90%,55%,0.4)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExchangeFlowSection;
