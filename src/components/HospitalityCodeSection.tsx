import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const principles = [
  {
    number: "I",
    title: "La Cama Vacía es una Oportunidad Perdida",
    text: "Una habitación sin ocupar en temporada media o baja es un activo que se evapora. Transformamos ese silencio en la posibilidad de tu propio descanso.",
  },
  {
    number: "II",
    title: "Somos Colegas, no Turistas",
    text: "El Swapper no es un cliente convencional; es un par. Viajamos para aprender, inspirarnos y valorar el esfuerzo de quienes mantienen las luces encendidas los 365 días.",
  },
  {
    number: "III",
    title: "Las Unidades se Usan, no se Acumulan",
    text: "Tenés 12 meses para usarlas. Si no lo hacés, vuelven al Pool para oxigenar la red. El flujo es lo que nos mantiene activos.",
  },
  {
    number: "IV",
    title: "Reciprocidad Real",
    text: "Damos lo mejor cuando somos anfitriones para recibir lo mejor cuando somos viajeros. Sin productos, sin servicios externos, sin distracciones.",
  },
];

const HospitalityCodeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-8 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-muted/30" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-4"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">
            Nuestro código
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-3 mb-4 text-balance">
            El Código de la{" "}
            <span className="gold-text">Hospitalidad Pura</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center text-lg text-muted-foreground italic mb-8 max-w-xl mx-auto"
        >
          "En nuestra red, el valor no se mide en billetes, se mide en noches compartidas."
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
              className="glass-card p-8 relative group hover:shadow-[var(--shadow-card-hover)] transition-all duration-500"
            >
              <span className="absolute top-5 right-6 text-5xl font-display font-bold text-border/50 group-hover:text-primary/15 transition-colors">
                {p.number}
              </span>
              <h3 className="font-display font-semibold text-lg mb-3 pr-12">
                {p.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {p.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HospitalityCodeSection;
