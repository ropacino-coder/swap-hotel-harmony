import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { DollarSign } from "lucide-react";

const fees = [
  { category: "Select", stars: "2★", price: "12", color: "from-muted to-secondary" },
  { category: "Superior", stars: "3★", price: "17", color: "from-muted to-secondary" },
  { category: "Premier", stars: "4★", price: "22", color: "from-secondary to-primary/20" },
  { category: "Elite", stars: "5★", price: "28", color: "from-primary/20 to-primary/30" },
];

const multipliers = [
  { pax: 2, mult: "1.0x" },
  { pax: 3, mult: "1.4x" },
  { pax: 4, mult: "1.8x" },
  { pax: 6, mult: "2.5x" },
  { pax: 8, mult: "3.2x" },
  { pax: 10, mult: "3.8x" },
  { pax: 12, mult: "4.4x" },
];

const roomTypes = [
  { type: "Estándar", mult: "1.0x" },
  { type: "Superior", mult: "1.2x" },
  { type: "Deluxe", mult: "1.4x" },
  { type: "Suite", mult: "1.6x" },
];

const PricingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 bg-muted/30" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">
            Tarifas y Valores
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-3 mb-4 text-balance">
            Transparencia en cada{" "}
            <span className="gold-text">número</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-balance">
            Fórmula: SU = Valor Base Hotel × Tipo Habitación × Ocupación × Noches
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Fee Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg">
                Tarifa de Servicio
              </h3>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Fee por noche en USD (+ impuestos)
            </p>
            <div className="space-y-3">
              {fees.map((fee) => (
                <div
                  key={fee.category}
                  className="flex items-center justify-between p-3 rounded-xl bg-secondary/50"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-primary text-sm">{fee.stars}</span>
                    <span className="font-medium text-sm">{fee.category}</span>
                  </div>
                  <span className="font-display font-bold text-primary">
                    u$s {fee.price}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Room Type Multipliers */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="glass-card p-6"
          >
            <h3 className="font-display font-semibold text-lg mb-2">
              Tipo de Habitación
            </h3>
            <p className="text-xs text-muted-foreground mb-6">
              Multiplicador sobre el valor base
            </p>
            <div className="space-y-3 mb-8">
              {roomTypes.map((room) => (
                <div
                  key={room.type}
                  className="flex items-center justify-between p-3 rounded-xl bg-secondary/50"
                >
                  <span className="font-medium text-sm">{room.type}</span>
                  <span className="font-display font-bold text-primary">
                    {room.mult}
                  </span>
                </div>
              ))}
            </div>

            {/* Formula example */}
            <div className="p-4 rounded-xl border border-primary/20 bg-primary/5">
              <p className="text-xs text-muted-foreground mb-2">Ejemplo:</p>
              <p className="text-sm font-medium">
                Hotel 3★ · Superior · 4 pax · 3 noches
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                120 × 1.2 × 1.8 × 3 ={" "}
                <span className="text-primary font-bold">777.6 SU</span>
              </p>
            </div>
          </motion.div>

          {/* Occupancy Multipliers */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="glass-card p-6"
          >
            <h3 className="font-display font-semibold text-lg mb-2">
              Multiplicador Ocupación
            </h3>
            <p className="text-xs text-muted-foreground mb-6">
              Progresión equilibrada por capacidad
            </p>
            <div className="space-y-2">
              {multipliers.map((m) => {
                const width = (parseFloat(m.mult) / 4.4) * 100;
                return (
                  <div key={m.pax}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-muted-foreground">
                        {m.pax} pax
                      </span>
                      <span className="font-display font-bold text-sm text-primary">
                        {m.mult}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${width}%` } : {}}
                        transition={{ delay: 0.6 + multipliers.indexOf(m) * 0.08, duration: 0.8 }}
                        className="h-full rounded-full bg-gradient-to-r from-gold-dark to-primary"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground mt-4 italic">
              "Viajar con más gente cuesta más… pero sigue siendo razonable."
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
