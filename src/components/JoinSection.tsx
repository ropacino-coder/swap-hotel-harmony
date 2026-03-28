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
    <section id="join" className="py-14 relative" ref={ref}>
      <div className="absolute inset-0 bg-muted/30" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="glass-card p-10 md:p-16 max-w-3xl mx-auto text-center relative overflow-hidden"
        >
          {/* Glow effect */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-60 h-60 bg-primary/10 rounded-full blur-[80px]" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-balance">
              Sé parte del futuro del{" "}
              <span className="gold-text">intercambio hotelero</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto text-balance">
              Únete a la lista de espera y sé de los primeros en acceder a la
              plataforma.
            </p>

            <ul className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 mb-10">
              {benefits.map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-2 text-sm text-secondary-foreground"
                >
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-4"
              >
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <p className="font-display font-semibold text-lg">
                  ¡Estás en la lista!
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Te contactaremos pronto.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
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
                <button
                  type="submit"
                  className="group flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-gold-light transition-all duration-300"
                >
                  Unirme
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JoinSection;
