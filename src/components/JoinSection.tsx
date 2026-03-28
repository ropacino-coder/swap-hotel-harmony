import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";

const benefits = [
  "Acceso al Pool de Swaps global",
  "Panel de control con tus SU en tiempo real",
  "Trazabilidad total de cada transacción",
  "Sin comisiones ocultas ni intermediarios",
];

const JoinSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section id="join" className="py-8 relative" ref={ref}>
      <div className="absolute inset-0 bg-muted/30" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card p-8 md:p-12 max-w-3xl mx-auto text-center relative overflow-hidden"
        >
          {/* Animated glow */}
          <motion.div
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-60 h-60 bg-primary/10 rounded-full blur-[80px]"
            animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-3xl md:text-4xl font-display font-bold mb-4 text-balance"
            >
              Sé parte del futuro del{" "}
              <span className="gold-text">intercambio hotelero</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="text-muted-foreground mb-8 max-w-md mx-auto text-balance"
            >
              Únete a la lista de espera y sé de los primeros en acceder a la
              plataforma.
            </motion.p>

            <ul className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 mb-6">
              {benefits.map((b, i) => (
                <motion.li
                  key={b}
                  initial={{ opacity: 0, x: -15 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-2 text-sm text-secondary-foreground"
                >
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  {b}
                </motion.li>
              ))}
            </ul>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="py-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                  className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4"
                >
                  <Check className="w-8 h-8 text-primary" />
                </motion.div>
                <p className="font-display font-semibold text-lg">
                  ¡Estás en la lista!
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Te contactaremos pronto.
                </p>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  placeholder="tu@hotel.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-5 py-3.5 rounded-full bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.04, boxShadow: "0 6px 24px hsla(35, 75%, 42%, 0.25)" }}
                  whileTap={{ scale: 0.96 }}
                  className="group flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold transition-all duration-300"
                >
                  Unirme
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JoinSection;
