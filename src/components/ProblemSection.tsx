import { motion, useInView, useScroll, useTransform } from "framer-motion";
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.5]);

  return (
    <section className="py-8 relative" ref={ref}>
      <motion.div className="absolute inset-0 bg-muted/40" style={{ opacity: bgOpacity }} />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div className="max-w-4xl mx-auto">
          <div className="text-center mb-5">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-sm font-semibold text-primary uppercase tracking-widest inline-block"
            >
              El Problema
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-5xl font-display font-bold mt-3 mb-4 text-balance"
            >
              La hotelería tiene un problema{" "}
              <span className="gold-text">estructural</span>
            </motion.h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {problems.map((p, i) => (
              <motion.div
                key={p.text}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  delay: 0.15 * i,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -3, boxShadow: "var(--shadow-card-hover)" }}
                className="glass-card p-6 flex flex-col items-center text-center gap-3 transition-shadow"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -90 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ delay: 0.2 + 0.15 * i, duration: 0.5, type: "spring" }}
                  className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0"
                >
                  <p.icon className="w-5 h-5 text-destructive" />
                </motion.div>
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
