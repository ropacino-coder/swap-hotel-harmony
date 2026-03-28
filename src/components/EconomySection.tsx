import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Map, Building2, Activity, Briefcase } from "lucide-react";

const impacts = [
  { icon: TrendingUp, text: "Activa consumo en temporada media y baja" },
  { icon: Map, text: "Distribuye flujo turístico entre regiones" },
  { icon: Building2, text: "Fortalece hoteles independientes" },
  { icon: Activity, text: "Genera movimiento donde hoy hay quietud" },
  { icon: Briefcase, text: "Profesionaliza el intercambio, sin informalidad" },
];

const EconomySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-8 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-5 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">
              Impacto económico
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-3 mb-4 text-balance">
              Cómo ayuda Swap Hotels a la{" "}
              <span className="gold-text">economía</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              No creamos turismo artificial.{" "}
              <span className="text-primary font-semibold">Reactivamos el existente.</span>
            </p>
          </motion.div>

          {/* Right — list */}
          <div className="space-y-4">
            {impacts.map((item, i) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.5 }}
                className="flex items-center gap-4 glass-card p-4"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EconomySection;
