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
    <section className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left — what we stop */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">
              El giro colaborativo
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-3 mb-8 text-balance">
              Swap Hotels propone algo{" "}
              <span className="gold-text">distinto</span>
            </h2>

            <div className="space-y-4">
              {stops.map((s, i) => (
                <motion.div
                  key={s}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                    <Ban className="w-4 h-4 text-destructive" />
                  </div>
                  <span className="font-medium text-foreground">{s}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — what we propose */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="glass-card p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/60 via-gold-light to-primary/20" />
            <Sparkles className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-display font-bold text-xl mb-3">
              Convertir noches vacías en oportunidades
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Viaje, formación y conexión entre hoteles. Sin intermediarios.
              Sin competencia. Solo colaboración entre profesionales que 
              entienden la industria.
            </p>
            <a
              href="/register"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              Empezá ahora <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IdeaSection;
