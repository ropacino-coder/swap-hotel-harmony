import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Building, Users, Globe } from "lucide-react";

const countries = [
  {
    id: "AR",
    name: "Argentina",
    flag: "🇦🇷",
    cities: "Buenos Aires · Bariloche · Mendoza · Ushuaia · Mar del Plata",
    stat: "Mayor red de intercambio",
    color: "hsl(var(--primary))",
  },
  {
    id: "UY",
    name: "Uruguay",
    flag: "🇺🇾",
    cities: "Montevideo · Punta del Este · Colonia",
    stat: "Destinos premium de playa",
    color: "hsl(var(--gold-light))",
  },
  {
    id: "CL",
    name: "Chile",
    flag: "🇨🇱",
    cities: "Santiago · Viña del Mar · Valparaíso · Patagonia",
    stat: "Costa y montaña",
    color: "hsl(var(--gold-dark))",
  },
  {
    id: "PY",
    name: "Paraguay",
    flag: "🇵🇾",
    cities: "Asunción · Encarnación · Ciudad del Este",
    stat: "Nuevo destino emergente",
    color: "hsl(var(--primary))",
  },
];

const SouthAmericaMap = ({ activeCountry, onHover }: { activeCountry: string | null; onHover: (id: string | null) => void }) => {
  const getFill = (id: string) => {
    if (activeCountry === id) return "hsl(var(--primary))";
    if (["AR", "UY", "CL", "PY"].includes(id)) return "hsl(var(--primary) / 0.25)";
    return "hsl(var(--muted))";
  };

  const getStroke = (id: string) => {
    if (activeCountry === id) return "hsl(var(--primary-foreground))";
    if (["AR", "UY", "CL", "PY"].includes(id)) return "hsl(var(--primary) / 0.5)";
    return "hsl(var(--border))";
  };

  return (
    <svg viewBox="0 0 400 550" className="w-full h-full max-w-[320px] mx-auto" xmlns="http://www.w3.org/2000/svg">
      {/* Colombia */}
      <path d="M120,30 L160,20 L190,35 L200,60 L185,80 L160,90 L140,85 L115,70 L105,50 Z"
        fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1" />
      {/* Venezuela */}
      <path d="M160,20 L200,10 L240,15 L250,40 L230,55 L200,60 L190,35 Z"
        fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1" />
      {/* Guyana/Suriname/French Guiana */}
      <path d="M240,15 L280,20 L290,45 L270,55 L250,40 Z"
        fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1" />
      {/* Ecuador */}
      <path d="M105,50 L115,70 L130,90 L115,100 L90,90 L85,65 Z"
        fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1" />
      {/* Peru */}
      <path d="M85,65 L90,90 L115,100 L130,90 L140,120 L130,160 L110,180 L80,170 L65,130 L70,90 Z"
        fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1" />
      {/* Brazil */}
      <path d="M185,80 L200,60 L230,55 L270,55 L290,45 L310,70 L320,110 L310,160 L290,200 L270,240 L250,270 L230,280 L210,260 L200,230 L190,200 L170,180 L150,170 L130,160 L140,120 L130,90 L140,85 L160,90 Z"
        fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1" />
      {/* Bolivia */}
      <path d="M130,160 L150,170 L170,180 L175,210 L160,230 L130,230 L110,210 L110,180 Z"
        fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1" />

      {/* Paraguay */}
      <motion.path
        d="M175,210 L190,200 L210,220 L210,250 L195,260 L170,255 L160,240 L160,230 Z"
        fill={getFill("PY")}
        stroke={getStroke("PY")}
        strokeWidth={activeCountry === "PY" ? 2 : 1}
        onMouseEnter={() => onHover("PY")}
        onMouseLeave={() => onHover(null)}
        className="cursor-pointer transition-colors duration-300"
        whileHover={{ scale: 1.02 }}
      />

      {/* Uruguay */}
      <motion.path
        d="M230,280 L245,275 L250,290 L240,305 L225,305 L218,290 Z"
        fill={getFill("UY")}
        stroke={getStroke("UY")}
        strokeWidth={activeCountry === "UY" ? 2 : 1}
        onMouseEnter={() => onHover("UY")}
        onMouseLeave={() => onHover(null)}
        className="cursor-pointer transition-colors duration-300"
        whileHover={{ scale: 1.03 }}
      />

      {/* Chile */}
      <motion.path
        d="M80,170 L110,180 L110,210 L100,230 L95,260 L90,290 L85,320 L80,350 L75,380 L70,410 L68,440 L72,470 L78,490 L70,500 L60,490 L55,460 L52,430 L55,400 L58,370 L60,340 L62,310 L65,280 L68,250 L70,220 L72,200 Z"
        fill={getFill("CL")}
        stroke={getStroke("CL")}
        strokeWidth={activeCountry === "CL" ? 2 : 1}
        onMouseEnter={() => onHover("CL")}
        onMouseLeave={() => onHover(null)}
        className="cursor-pointer transition-colors duration-300"
        whileHover={{ scale: 1.02 }}
      />

      {/* Argentina */}
      <motion.path
        d="M110,210 L130,230 L160,230 L160,240 L170,255 L195,260 L210,250 L210,260 L230,280 L225,305 L218,290 L210,310 L200,340 L190,370 L180,390 L170,410 L155,430 L140,445 L125,455 L110,465 L100,470 L90,475 L78,490 L72,470 L68,440 L70,410 L75,380 L80,350 L85,320 L90,290 L95,260 L100,230 Z"
        fill={getFill("AR")}
        stroke={getStroke("AR")}
        strokeWidth={activeCountry === "AR" ? 2 : 1}
        onMouseEnter={() => onHover("AR")}
        onMouseLeave={() => onHover(null)}
        className="cursor-pointer transition-colors duration-300"
        whileHover={{ scale: 1.01 }}
      />

      {/* Country labels */}
      {[
        { id: "AR", x: 140, y: 360, label: "ARG" },
        { id: "UY", x: 237, y: 295, label: "URU" },
        { id: "CL", x: 58, y: 340, label: "CHI" },
        { id: "PY", x: 183, y: 240, label: "PAR" },
      ].map((c) => (
        <g key={c.id}>
          <motion.circle
            cx={c.x}
            cy={c.y}
            r={activeCountry === c.id ? 6 : 4}
            fill={activeCountry === c.id ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.6)"}
            className="transition-all duration-300"
          />
          {activeCountry === c.id && (
            <motion.circle
              cx={c.x}
              cy={c.y}
              r={12}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth={1.5}
              initial={{ r: 6, opacity: 1 }}
              animate={{ r: 18, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
          <text
            x={c.x}
            y={c.y - 12}
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill={activeCountry === c.id ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
            className="font-display transition-colors duration-300"
          >
            {c.label}
          </text>
        </g>
      ))}
    </svg>
  );
};

const CoverageMapSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCountry, setActiveCountry] = useState<string | null>(null);

  const activeData = countries.find((c) => c.id === activeCountry);

  return (
    <section className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 bg-muted/20" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">
            Cobertura
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-3 mb-4 text-balance">
            Presentes en <span className="gold-text">4 países</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-balance">
            Swap Hotels conecta hoteleros del Cono Sur en una red de intercambio única.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative"
          >
            <SouthAmericaMap activeCountry={activeCountry} onHover={setActiveCountry} />

            {/* Tooltip */}
            {activeData && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 glass-card p-4 min-w-[240px] text-center"
              >
                <p className="text-2xl mb-1">{activeData.flag}</p>
                <h4 className="font-display font-bold text-base">{activeData.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{activeData.cities}</p>
                <p className="text-xs text-primary font-semibold mt-1">{activeData.stat}</p>
              </motion.div>
            )}
          </motion.div>

          {/* Country cards */}
          <div className="grid grid-cols-2 gap-4">
            {countries.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                onMouseEnter={() => setActiveCountry(c.id)}
                onMouseLeave={() => setActiveCountry(null)}
                className={`glass-card p-5 cursor-pointer transition-all duration-300 ${
                  activeCountry === c.id
                    ? "shadow-[var(--shadow-card-hover)] border-primary/30"
                    : ""
                }`}
              >
                <div className="text-3xl mb-3">{c.flag}</div>
                <h3 className="font-display font-semibold text-base mb-1">{c.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                  {c.cities}
                </p>
                <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  {c.stat}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto"
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
