import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Ban, Sparkles, ArrowRight } from "lucide-react";

const IdeaSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const stops = [
    "No más presión sobre el precio",
    "No más intermediación agresiva",
    "No más competencia destructiva",
  ];

  return (
    <section className="py-8 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-5 items-center">
          {/* Left — what we stop */}
          <motion.div
            initial={{ opacity: 0, x: -40, filter: "blur(6px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">
              El giro colaborativo
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-3 mb-5 text-balance">
              Swap Hotels propone algo{" "}
              <span className="gold-text">distinto</span>
            </h2>

            <div className="space-y-4">
              {stops.map((s, i) => (
                <motion.div
                  key={s}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    delay: 0.3 + i * 0.15,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex items-center gap-3"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.4 + i * 0.15, type: "spring", stiffness: 300 }}
                    className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0"
                  >
                    <Ban className="w-4 h-4 text-destructive" />
                  </motion.div>
                  <span className="font-medium text-foreground">{s}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — what we propose */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
            className="glass-card p-8 relative overflow-hidden"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/60 via-gold-light to-primary/20 origin-left"
            />
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={isInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            >
              <Sparkles className="w-8 h-8 text-primary mb-4" />
            </motion.div>
            <h3 className="font-display font-bold text-xl mb-3">
              Convertir noches vacías en oportunidades
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Viaje, formación y conexión entre hoteles. Sin intermediarios.
              Sin competencia. Solo colaboración entre profesionales que 
              entienden la industria.
            </p>
            <motion.a
              href="/register"
              whileHover={{ gap: "12px" }}
              className="inline-flex items-center gap-2 text-primary font-semibold transition-all"
            >
              Empezá ahora <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IdeaSection;
