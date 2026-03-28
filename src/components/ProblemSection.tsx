import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BedDouble, Calendar, Plane, MapPin, BarChart3 } from "lucide-react";

const problems = [
  { icon: BedDouble, text: "Habitaciones vacías gran parte del año" },
  { icon: Calendar, text: "Temporada media y baja sin movimiento" },
  { icon: Plane, text: "Personal y propietarios con poco acceso a viajar" },
  { icon: MapPin, text: "Economías regionales subutilizadas" },
  { icon: BarChart3, text: "Turismo concentrado en pocos meses y pocos destinos" },
];

const ProblemSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-14 relative" ref={ref}>
      <div className="absolute inset-0 bg-muted/40" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">
              El Problema
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mt-3 mb-4 text-balance">
              La hotelería tiene un problema{" "}
              <span className="gold-text">estructural</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {problems.map((p, i) => (
              <motion.div
                key={p.text}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 * i, duration: 0.5 }}
                className="glass-card p-6 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0">
                  <p.icon className="w-5 h-5 text-destructive" />
                </div>
                <p className="text-sm font-medium text-foreground leading-snug">{p.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-6 text-center"
          >
            <p className="text-lg text-muted-foreground font-medium italic text-balance">
              "Hay infraestructura, hay gente, hay destinos…
              <span className="text-primary font-semibold not-italic"> pero el valor no circula.</span>"
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
