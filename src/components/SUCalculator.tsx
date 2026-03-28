import { motion, useInView } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { Calculator } from "lucide-react";

const categories = [
  { label: "Select (2★)", base: 80 },
  { label: "Superior (3★)", base: 120 },
  { label: "Premier (4★)", base: 170 },
  { label: "Elite (5★)", base: 240 },
];

const roomTypes = [
  { label: "Estándar", mult: 1.0 },
  { label: "Superior", mult: 1.2 },
  { label: "Deluxe", mult: 1.4 },
  { label: "Suite", mult: 1.6 },
];

const occupancies = [
  { pax: 2, mult: 1.0 },
  { pax: 3, mult: 1.4 },
  { pax: 4, mult: 1.8 },
  { pax: 6, mult: 2.5 },
  { pax: 8, mult: 3.2 },
  { pax: 10, mult: 3.8 },
  { pax: 12, mult: 4.4 },
];

const SUCalculator = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [catIdx, setCatIdx] = useState(1);
  const [roomIdx, setRoomIdx] = useState(0);
  const [occIdx, setOccIdx] = useState(0);
  const [nights, setNights] = useState(3);

  const result = useMemo(() => {
    const base = categories[catIdx].base;
    const room = roomTypes[roomIdx].mult;
    const occ = occupancies[occIdx].mult;
    return Math.round(base * room * occ * nights * 10) / 10;
  }, [catIdx, roomIdx, occIdx, nights]);

  const selectClass =
    "w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer";

  return (
    <section id="calculator" className="py-8 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-6"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">
            Simulador
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-3 mb-4 text-balance">
            Calculadora de{" "}
            <span className="gold-text">Swap Units</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-balance">
            Calculá cuántas SU necesitás para tu próximo intercambio. Sin compromiso.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="glass-card p-8 md:p-10 max-w-2xl mx-auto"
        >
          <div className="grid sm:grid-cols-2 gap-5 mb-5">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Categoría del hotel destino
              </label>
              <select
                value={catIdx}
                onChange={(e) => setCatIdx(Number(e.target.value))}
                className={selectClass}
              >
                {categories.map((c, i) => (
                  <option key={c.label} value={i}>
                    {c.label} — {c.base} SU base
                  </option>
                ))}
              </select>
            </div>

            {/* Room Type */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Tipo de habitación
              </label>
              <select
                value={roomIdx}
                onChange={(e) => setRoomIdx(Number(e.target.value))}
                className={selectClass}
              >
                {roomTypes.map((r, i) => (
                  <option key={r.label} value={i}>
                    {r.label} — {r.mult}x
                  </option>
                ))}
              </select>
            </div>

            {/* Occupancy */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Ocupación
              </label>
              <select
                value={occIdx}
                onChange={(e) => setOccIdx(Number(e.target.value))}
                className={selectClass}
              >
                {occupancies.map((o, i) => (
                  <option key={o.pax} value={i}>
                    {o.pax} personas — {o.mult}x
                  </option>
                ))}
              </select>
            </div>

            {/* Nights */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Noches
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setNights(Math.max(1, nights - 1))}
                  className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-lg font-bold text-foreground hover:bg-primary/20 transition-colors"
                >
                  −
                </button>
                <span className="flex-1 text-center text-2xl font-display font-bold">
                  {nights}
                </span>
                <button
                  onClick={() => setNights(Math.min(30, nights + 1))}
                  className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-lg font-bold text-foreground hover:bg-primary/20 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="p-6 rounded-2xl border border-primary/30 bg-primary/5 text-center">
            <p className="text-sm text-muted-foreground mb-1">
              Swap Units necesarias
            </p>
            <motion.div
              key={result}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, type: "spring" }}
              className="text-5xl md:text-6xl font-display font-bold gold-text"
            >
              {result.toLocaleString("es-AR")}
            </motion.div>
            <p className="text-xs text-muted-foreground mt-2">
              {categories[catIdx].base} base × {roomTypes[roomIdx].mult}x hab ×{" "}
              {occupancies[occIdx].mult}x occ × {nights} noches
            </p>
          </div>

          <div className="flex items-center gap-2 mt-5 justify-center">
            <Calculator className="w-4 h-4 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">
              Valor estimativo. El valor final se confirma post-verificación del hotel.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SUCalculator;
