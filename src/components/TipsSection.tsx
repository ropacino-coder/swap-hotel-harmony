import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Lightbulb, User, Building } from "lucide-react";

const TipsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-12 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-6"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">
            Consejos
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mt-3 text-balance">
            Para una mejor <span className="gold-text">experiencia</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Huéspedes */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="glass-card p-5 sm:p-7"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg">Para huéspedes</h3>
            </div>
            <ul className="space-y-3">
              {[
                "No compres pasajes no reembolsables hasta tener la confirmación final.",
                "Revisá bien los datos de huéspedes autorizados antes de confirmar.",
                "Si viajás con mascotas o hay necesidades especiales, consultá antes.",
              ].map((tip) => (
                <li key={tip} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <Lightbulb className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Hoteles */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="glass-card p-5 sm:p-7"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Building className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg">Para hoteles</h3>
            </div>
            <ul className="space-y-3">
              {[
                "Responder rápido aumenta la confianza y mejora tu ranking.",
                "Evitar cancelaciones es clave: se penaliza con ranking y Swap Units.",
                "Mantené tu calendario actualizado para evitar conflictos de disponibilidad.",
              ].map((tip) => (
                <li key={tip} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <Lightbulb className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TipsSection;
