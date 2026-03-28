import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  UserCheck, FileSearch, Building2, PenLine, BarChart3,
} from "lucide-react";

const steps = [
  {
    icon: UserCheck,
    title: "Registro",
    description:
      "Solo titulares, locatarios o gerenciadores con poder de decisión. Datos personales, fiscales y de contacto.",
    detail: "Sin acceso exploratorio",
  },
  {
    icon: FileSearch,
    title: "Verificación",
    description:
      "Auditoría documental: identidad, habilitación municipal, constancia fiscal, propiedad o contrato. Filtro de reputación.",
    detail: "72 hs desde carga completa",
  },
  {
    icon: Building2,
    title: "Alta / Adhesión",
    description:
      "Perfil público del hotel: categoría, ubicación, habitaciones, calendario de disponibilidad, fotos reales y servicios.",
    detail: "Mín. 90 noches/año en temporada media y baja",
  },
  {
    icon: PenLine,
    title: "Firma Digital",
    description:
      "Aceptación vinculante de T&C, políticas de SU/SC/Pool, sistema de sanciones, ranking y alcance del soporte.",
    detail: "Sin firma, el hotel no se activa",
  },
  {
    icon: BarChart3,
    title: "Estimación de SU",
    description:
      "Rango estimativo basado en categoría y servicios. Valor definitivo post-verificación, revisable periódicamente.",
    detail: "Ej: 80-95 SU/noche",
  },
];

const OnboardingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="onboarding" className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 bg-muted/30" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">
            Onboarding
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-3 mb-4 text-balance">
            5 pasos para{" "}
            <span className="gold-text">activar tu hotel</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-balance">
            Un proceso de auditoría que garantiza la calidad de toda la red.
            Solo hoteles verificados participan.
          </p>
        </motion.div>

        {/* Steps as horizontal scroll on mobile, grid on desktop */}
        <div className="flex gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-5 md:overflow-visible max-w-6xl mx-auto scrollbar-hide">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 * i, duration: 0.6 }}
              className="glass-card-hover p-6 min-w-[260px] md:min-w-0 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <step.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-bold text-primary">
                  PASO {i + 1}
                </span>
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {step.description}
              </p>
              <div className="mt-4 pt-3 border-t border-border">
                <span className="text-xs text-primary font-medium">
                  {step.detail}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OnboardingSection;
