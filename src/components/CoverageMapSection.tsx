import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Building, Globe } from "lucide-react";

const countries = [
  {
    id: "AR",
    name: "Argentina",
    flag: "🇦🇷",
    cities: "Buenos Aires · Bariloche · Mendoza · Ushuaia · Mar del Plata",
    stat: "Mayor red de intercambio",
  },
  {
    id: "UY",
    name: "Uruguay",
    flag: "🇺🇾",
    cities: "Montevideo · Punta del Este · Colonia",
    stat: "Destinos premium de playa",
  },
  {
    id: "CL",
    name: "Chile",
    flag: "🇨🇱",
    cities: "Santiago · Viña del Mar · Valparaíso · Patagonia",
    stat: "Costa y montaña",
  },
  {
    id: "PY",
    name: "Paraguay",
    flag: "🇵🇾",
    cities: "Asunción · Encarnación · Ciudad del Este",
    stat: "Nuevo destino emergente",
  },
];

const CoverageMapSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-8 relative" ref={ref}>
      <div className="absolute inset-0 bg-muted/20" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-5"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">
            Cobertura
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold mt-3 mb-4 text-balance">
            Presentes en <span className="gold-text">4 países</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-balance">
            Swap Hotels conecta hoteleros del Cono Sur en una red de intercambio única.
          </p>
        </motion.div>

        {/* Country cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 max-w-4xl mx-auto">
          {countries.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              className="glass-card-hover p-4 sm:p-5 text-center"
            >
              <div className="text-4xl mb-3">{c.flag}</div>
              <h3 className="font-display font-semibold text-base mb-1">{c.name}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                {c.cities}
              </p>
              <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                {c.stat}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-6 grid grid-cols-3 gap-4 max-w-lg mx-auto"
        >
          {[
            { icon: Globe, value: "4", label: "Países" },
            { icon: MapPin, value: "+15", label: "Destinos" },
            { icon: Building, value: "24/7", label: "Pool activo" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <s.icon className="w-5 h-5 text-primary mx-auto mb-2" />
              <div className="text-xl font-display font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CoverageMapSection;
