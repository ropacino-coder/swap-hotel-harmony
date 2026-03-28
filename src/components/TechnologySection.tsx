import { motion, useInView, useScroll, useTransform } from "framer-motion";
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const orbScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.8]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.06, 0.06, 0]);

  return (
    <section id="technology" className="py-8 relative overflow-hidden" ref={ref}>
      {/* Animated parallax orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary blur-[120px]"
        style={{ scale: orbScale, opacity: orbOpacity }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-5"
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto" style={{ perspective: "1000px" }}>
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 40, rotateX: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{
                delay: 0.2 + i * 0.12,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -6, boxShadow: "var(--shadow-card-hover)", rotateY: 5 }}
              className="glass-card-hover p-7 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.12, type: "spring", stiffness: 200 }}
                className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 animate-glow"
              >
                <pillar.icon className="w-7 h-7 text-primary" />
              </motion.div>
              <h3 className="font-display font-semibold text-lg mb-2">
                {pillar.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Animated flow line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-6 max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 1, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent origin-left"
          />
          <div className="flex justify-between mt-4">
            {["Depositar", "Valorizar", "Intercambiar", "Verificar"].map(
              (step, i) => (
                <motion.span
                  key={step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.2 + i * 0.15, duration: 0.5 }}
                  className="text-xs text-muted-foreground font-medium"
                >
                  {step}
                </motion.span>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologySection;
