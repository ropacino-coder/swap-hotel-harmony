import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Eye, ShieldCheck, Zap, HeartHandshake } from "lucide-react";

const values = [
  {
    icon: Eye,
    title: "Transparencia",
    description: "Reglas claras y trazabilidad completa en cada operación.",
  },
  {
    icon: ShieldCheck,
    title: "Confianza",
    description: "Hoteles habilitados y verificados. Sin excepciones.",
  },
  {
    icon: Zap,
    title: "Simplicidad",
    description: "Flujo corto, claro y sin burocracia innecesaria.",
  },
  {
    icon: HeartHandshake,
    title: "Responsabilidad",
    description: "Asistencia razonable y estructurada ante incidentes.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9, rotateX: -10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      delay: 0.15 * i,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

const ValuesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-8 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">
            Nuestros valores
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-3 text-balance">
            Lo que nos <span className="gold-text">define</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto" style={{ perspective: "1000px" }}>
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={{ y: -6, boxShadow: "var(--shadow-card-hover)", rotateY: 3 }}
              className="glass-card-hover p-7 text-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{ delay: 0.2 + 0.15 * i, type: "spring", stiffness: 200 }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center mx-auto mb-5"
              >
                <v.icon className="w-7 h-7 text-primary" />
              </motion.div>
              <h3 className="font-display font-semibold text-lg mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {v.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
