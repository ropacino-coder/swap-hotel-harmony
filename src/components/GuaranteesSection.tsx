import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, FileSignature, CalendarCheck, BarChart3, Award, RotateCcw, HeadsetIcon } from "lucide-react";

const guarantees = [
  {
    icon: Shield,
    number: "01",
    title: "Blindaje Legal y Operativo",
    description: "Cada miembro atraviesa un riguroso proceso de verificación: identidad, habilitaciones vigentes y cumplimiento fiscal.",
  },
  {
    icon: FileSignature,
    number: "02",
    title: "Contratos con Firma Digital",
    description: "Aceptación vinculante de términos, políticas de cancelación y validez legal de cada reserva generada.",
  },
  {
    icon: CalendarCheck,
    number: "03",
    title: "Continuidad de Reservas",
    description: "Si un hotel se da de baja, está obligado por contrato a honrar todas las reservas confirmadas.",
  },
  {
    icon: BarChart3,
    number: "04",
    title: "Pool Transparente",
    description: "Las unidades se asignan bajo criterios técnicos de equidad. Sin discrecionalidad.",
  },
  {
    icon: Award,
    number: "05",
    title: "Marca Registrada",
    description: "Registro de marca ante el INPI. Visión de largo plazo y compromiso institucional.",
  },
  {
    icon: RotateCcw,
    number: "06",
    title: "Devoluciones Claras",
    description: "Dependen de quién cancela y cuándo. Reglas transparentes y publicadas.",
  },
  {
    icon: HeadsetIcon,
    number: "07",
    title: "Asistencia en Incidentes",
    description: "Asistencia razonable y estructurada. Devolución, compensación y alternativas ante situaciones críticas.",
  },
];

const GuaranteesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="guarantees" className="py-8 relative" ref={ref}>
      <div className="absolute inset-0 bg-muted/30" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-5"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">
            Nuestras garantías
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold mt-3 mb-4 text-balance">
            Seguridad como <span className="gold-text">pilar</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-balance">
            Un ecosistema blindado para que tu única preocupación sea disfrutar de tu próxima estancia.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {guarantees.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              className="glass-card-hover p-7 group relative overflow-hidden"
            >
              <span className="absolute top-4 right-5 text-4xl font-display font-bold text-border/60 group-hover:text-primary/15 transition-colors">
                {g.number}
              </span>
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <g.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-base mb-2">
                {g.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {g.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuaranteesSection;
