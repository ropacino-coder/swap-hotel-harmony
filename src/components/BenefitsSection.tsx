import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Users, Wallet, ShieldCheck, Award, Globe } from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "Optimización de Inventario",
    description:
      "Transforma el costo fijo de habitaciones vacías en viajes reales para tu equipo.",
  },
  {
    icon: Users,
    title: "Red B2B de Confianza",
    description:
      "Intercambio exclusivo entre profesionales que entienden y cuidan las instalaciones.",
  },
  {
    icon: Wallet,
    title: "Ahorro Directo",
    description:
      "Elimina el gasto de alojamiento en viajes personales o corporativos del sector.",
  },
  {
    icon: ShieldCheck,
    title: "Auditoría Permanente",
    description:
      "Historial inalterable. Cada evento operativo queda registrado en el sistema.",
  },
  {
    icon: Award,
    title: "Ranking y Reputación",
    description:
      "Los hoteles con mejor servicio ganan visibilidad. El sistema premia la calidad.",
  },
  {
    icon: Globe,
    title: "Tú Decidís Quién Viaja",
    description:
      "Empleados, familiares, colaboradores — el hotel autoriza y gestiona todo.",
  },
];

const BenefitsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="benefits" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">
            Beneficios
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-3 mb-4 text-balance">
            ¿Por qué{" "}
            <span className="gold-text">Swap Hotels</span>?
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              className="glass-card-hover p-7 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <b.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">
                {b.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {b.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
