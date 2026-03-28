import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Handshake, BedDouble, Globe, BadgeCheck } from "lucide-react";

const highlights = [
  {
    icon: Handshake,
    title: "Hotelería Colaborativa",
    text: "Contribuimos con el turismo desde un modelo de intercambio entre pares, sin intermediación agresiva.",
  },
  {
    icon: BedDouble,
    title: "Alojamiento Gratuito",
    text: "Sumá tu hotel, intercambiá noches y viajá sin costo de alojamiento para vos y los tuyos.",
  },
  {
    icon: Globe,
    title: "Red Regional",
    text: "Hoteles habilitados de Argentina, Uruguay, Chile y Paraguay conectados en una sola plataforma.",
  },
  {
    icon: BadgeCheck,
    title: "Solo Profesionales",
    text: "Exclusivo para propietarios, inquilinos o gerenciadores de hoteles habilitados. Sin alquileres temporarios.",
  },
];

const DescriptionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const textX = useTransform(scrollYProgress, [0, 0.5], ["-20px", "0px"]);
  const cardsX = useTransform(scrollYProgress, [0, 0.5], ["20px", "0px"]);

  return (
    <section id="about" className="py-14 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
          {/* Left — narrative with parallax */}
          <motion.div style={{ x: textX }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <span className="text-sm font-semibold text-primary uppercase tracking-widest">
                Nuestra misión
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold mt-3 mb-6 text-balance">
                El valor de una noche vacía puede ser{" "}
                <span className="gold-text">tu próximo viaje</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  Swap Hotels nace de una idea simple: los hoteles tienen habitaciones 
                  disponibles en temporada media y baja que nadie aprovecha. Nosotros 
                  las transformamos en oportunidades de intercambio entre hoteleros.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.35, duration: 0.6 }}
                >
                  Cada propietario —o persona autorizada por él— puede consultar los 
                  hoteles adheridos y reservar alojamiento a cambio de sus{" "}
                  <span className="text-primary font-semibold">Swap Units</span>. 
                  Sin dinero de por medio. Solo hotelería colaborativa.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  Nuestra misión es ofrecer intercambios simples. Cobramos únicamente 
                  una tarifa de servicio para garantizar transparencia, continuidad y 
                  mejoras constantes.
                </motion.p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — cards with parallax */}
          <motion.div className="grid sm:grid-cols-2 gap-4" style={{ x: cardsX }}>
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  delay: 0.2 + i * 0.12,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -5, boxShadow: "var(--shadow-card-hover)" }}
                className="glass-card p-6 group transition-shadow"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.12, type: "spring", stiffness: 250 }}
                  className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors"
                >
                  <h.icon className="w-5 h-5 text-primary" />
                </motion.div>
                <h3 className="font-display font-semibold text-sm mb-1.5">
                  {h.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {h.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DescriptionSection;
