import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowLeftRight, Clock, Shield, Layers } from "lucide-react";

const features = [
  {
    icon: ArrowLeftRight,
    title: "Intercambio Directo",
    description:
      "Deposita noches de hotel en el Pool y recibe Swap Units (SU) para canjear en cualquier hotel de la red.",
  },
  {
    icon: Clock,
    title: "FIFO a 12 Meses",
    description:
      "Tus SU vencen a los 12 meses bajo el sistema First In, First Out. Usa primero las más antiguas.",
  },
  {
    icon: Shield,
    title: "Trazabilidad Total",
    description:
      "Cada transacción queda registrada de forma inalterable. Transparencia total en el manejo del Pool de Swaps.",
  },
  {
    icon: Layers,
    title: "Temporada Media y Baja",
    description:
      "Maximiza la ocupación en las temporadas más difíciles intercambiando noches que de otro modo quedarían vacías.",
  },
];

const PoolSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pool" className="py-14 relative" ref={ref}>
      <div className="absolute inset-0 bg-muted/30" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">
            Pool de Swaps
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-3 mb-4 text-balance">
            El corazón de{" "}
            <span className="gold-text">Swap Hotels</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-balance">
            Un pool centralizado donde las noches de hotel se convierten en
            unidades de intercambio líquidas y verificables.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="glass-card-hover p-8"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PoolSection;
