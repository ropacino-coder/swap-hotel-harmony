import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Lock, Eye, Zap, RefreshCw } from "lucide-react";

const pillars = [
  {
    icon: Lock,
    title: "Inmutable",
    description: "Cada intercambio queda registrado permanentemente en el sistema.",
  },
  {
    icon: Eye,
    title: "Transparente",
    description: "Auditá el Pool en tiempo real. Sin intermediarios opacos.",
  },
  {
    icon: Zap,
    title: "Instantáneo",
    description: "Intercambios procesados en segundos, no días.",
  },
  {
    icon: RefreshCw,
    title: "FIFO Automático",
    description: "El vencimiento a 12 meses se ejecuta automáticamente por el sistema.",
  },
];

const TechnologySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="technology" className="py-14 relative overflow-hidden" ref={ref}>
      {/* Animated background orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/3 blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">
            Tecnología
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-3 mb-4 text-balance">
            Tecnología como{" "}
            <span className="gold-text">garantía</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-balance">
            La confianza no se pide, se construye. Cada unidad de intercambio
            está respaldada por un sistema auditable e inalterable.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.6 }}
              className="glass-card-hover p-7 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 animate-glow">
                <pillar.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">
                {pillar.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Visual flow */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
          className="mt-10 max-w-3xl mx-auto"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="flex justify-between mt-4">
            {["Depositar", "Valorizar", "Intercambiar", "Verificar"].map(
              (step) => (
                <span
                  key={step}
                  className="text-xs text-muted-foreground font-medium"
                >
                  {step}
                </span>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologySection;
