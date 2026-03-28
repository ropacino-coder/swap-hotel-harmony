import { motion, useInView } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import {
  DollarSign,
  Crown,
  Gem,
  Users,
  Star,
  ShieldCheck,
  Clock,
  AlertTriangle,
  Calculator,
  CreditCard,
  FileText,
  Scale,
} from "lucide-react";

/* ─── Membership Plans ─── */
const plans = [
  {
    name: "Gold",
    stars: "2★ / 3★",
    icon: Crown,
    color: "from-amber-500/20 to-amber-600/10",
    border: "border-amber-500/30",
    badge: "bg-amber-500/10 text-amber-600",
    monthly: 39,
    quarterly: 117,
    semiannual: 195,
    annual: 390,
    semiannualRef: 32.5,
    annualRef: 32.5,
    features: [
      "3 meses bonificados al inicio",
      "Acceso completo al Pool de Swaps",
      "Verificación bonificable",
      "Soporte por email y WhatsApp",
    ],
  },
  {
    name: "Diamond",
    stars: "4★ / 5★",
    icon: Gem,
    color: "from-sky-500/20 to-indigo-500/10",
    border: "border-sky-400/30",
    badge: "bg-sky-500/10 text-sky-600",
    monthly: 99,
    quarterly: 297,
    semiannual: 495,
    annual: 999,
    semiannualRef: 82.5,
    annualRef: 83.25,
    features: [
      "3 meses bonificados al inicio",
      "Acceso prioritario al Pool",
      "Verificación bonificable",
      "Soporte premium dedicado",
    ],
  },
  {
    name: "Sindical",
    stars: "Cadenas / Sindicatos",
    icon: Users,
    color: "from-emerald-500/20 to-teal-500/10",
    border: "border-emerald-400/30",
    badge: "bg-emerald-500/10 text-emerald-600",
    monthly: 40,
    quarterly: null,
    semiannual: null,
    annual: 400,
    semiannualRef: null,
    annualRef: null,
    features: [
      "3 meses bonificados reales",
      "50% de la tarifa de servicio",
      "Membresía por hotel",
      "Soporte corporativo",
    ],
  },
  {
    name: "Fundadores",
    stars: "Primeros 50 hoteles",
    icon: Star,
    color: "from-primary/20 to-primary/10",
    border: "border-primary/30",
    badge: "bg-primary/10 text-primary",
    monthly: 15,
    quarterly: null,
    semiannual: null,
    annual: 150,
    semiannualRef: null,
    annualRef: null,
    features: [
      "6 meses de membresía bonificada",
      "14 noches de SU de regalo",
      "Verificación bonificada",
      'Badge visible "Hotel Fundador"',
    ],
  },
];

/* ─── Tarifa de Servicio ─── */
const fees = [
  { category: "Select", stars: "2★", price: 12 },
  { category: "Superior", stars: "3★", price: 17 },
  { category: "Premier", stars: "4★", price: 22 },
  { category: "Elite", stars: "5★", price: 28 },
];

const feeIncludes = [
  "Validación y verificación del hotel",
  "Infraestructura tecnológica",
  "Gestión del intercambio",
  "Notificaciones y trazabilidad",
  "Soporte operativo",
  "Prevención de fraude",
  "Asistencia ante incidentes",
];

const feeExcludes = ["Alojamiento", "Pasajes", "Gastos externos", "Seguros del huésped"];

/* ─── Calculadora SU ─── */
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

/* ─── Membership Rules ─── */
const membershipRules = [
  {
    icon: ShieldCheck,
    title: "¿Para qué sirve la membresía?",
    items: [
      "Validación y Auditoría: cubre el costo de verificar que el hotel sea real y profesional.",
      "Mantenimiento del Ledger: gestión de Swap Units y sincronización iCal.",
      "Acceso al Swap Pool: si la membresía está al día, el hotel accede a las SU expiradas del fondo comunitario.",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Regla de Oro: Membresía + Vencimiento",
    items: [
      "Si la membresía cae (no se paga), la cuenta se congela.",
      "Si pasan 60 días sin pago, todas las SU acumuladas pasan automáticamente al Swap Pool.",
      "Nadie puede \"sentarse\" sobre puntos sin aportar a la comunidad.",
    ],
  },
];

const automationRules = [
  { event: "Pago Exitoso", action: "Extiende la validez 30 días", color: "text-emerald-500" },
  { event: "Fallo de Pago", action: "Reintento en 24hs, sin bloqueo", color: "text-amber-500" },
  { event: "Mora (7 días)", action: "Puede recibir pero NO viajar", color: "text-orange-500" },
  { event: "Abandono (60 días)", action: "SU se mueven al Pool Comunitario", color: "text-red-500" },
];

const PricingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Calculator state
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
    "w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all cursor-pointer text-sm";

  return (
    <section id="pricing" className="py-12 sm:py-16 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6">
        {/* ═══════════ HEADER ═══════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">
            Membresías & Tarifas
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold mt-3 mb-4 text-balance">
            Transparencia en cada{" "}
            <span className="gold-text">número</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
            Swap Hotels no monetiza el alojamiento. Monetiza la gestión del intercambio, la verificación de hoteles y la operación del sistema. Sin comisiones ocultas.
          </p>
        </motion.div>

        {/* ═══════════ MEMBERSHIP PLANS ═══════════ */}
        <div className="mb-14">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-xl sm:text-2xl font-display font-bold text-center mb-6"
          >
            <CreditCard className="inline w-5 h-5 mr-2 text-primary" />
            Planes de Membresía
          </motion.h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {plans.map((plan, i) => {
              const Icon = plan.icon;
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.6 }}
                  className={`glass-card p-5 border ${plan.border} flex flex-col`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-foreground" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-lg">{plan.name}</h4>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${plan.badge}`}>
                        {plan.stars}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-display font-bold gold-text">
                        u$s {plan.monthly}
                      </span>
                      <span className="text-sm text-muted-foreground">/ mes</span>
                    </div>
                    {plan.annual && (
                      <p className="text-xs text-muted-foreground mt-1">
                        o u$s {plan.annual}/año (ahorrás 2 meses)
                      </p>
                    )}
                  </div>

                  <ul className="space-y-2 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.quarterly && (
                    <div className="mt-4 pt-3 border-t border-border">
                      <p className="text-[11px] text-muted-foreground">
                        Trimestral: u$s {plan.quarterly} · Semestral: u$s {plan.semiannual} (u$s {plan.semiannualRef}/mes)
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ═══════════ TARIFA DE SERVICIO ═══════════ */}
        <div className="mb-14">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-xl sm:text-2xl font-display font-bold text-center mb-2"
          >
            <DollarSign className="inline w-5 h-5 mr-2 text-primary" />
            Tarifa de Servicio
          </motion.h3>
          <p className="text-center text-sm text-muted-foreground mb-6 max-w-xl mx-auto">
            Fija por categoría y por noche, independiente de ubicación, temporada o tipo de habitación. Siempre la paga el huésped.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {/* Fee table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="glass-card p-5"
            >
              <h4 className="font-display font-semibold mb-4">Valores por noche</h4>
              <div className="space-y-3">
                {fees.map((fee) => (
                  <div key={fee.category} className="flex items-center justify-between p-3 rounded-xl bg-secondary/50">
                    <div className="flex items-center gap-2">
                      <span className="text-primary text-sm">{fee.stars}</span>
                      <span className="font-medium text-sm">{fee.category}</span>
                    </div>
                    <span className="font-display font-bold text-primary">u$s {fee.price} + imp.</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Includes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="glass-card p-5"
            >
              <h4 className="font-display font-semibold mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> Qué incluye
              </h4>
              <ul className="space-y-2">
                {feeIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-emerald-500 mt-1">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <h4 className="font-display font-semibold mt-5 mb-3 flex items-center gap-2 text-red-400">
                ✕ No cubre
              </h4>
              <ul className="space-y-1.5">
                {feeExcludes.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-red-400 mt-1">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Penalidades */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="glass-card p-5"
            >
              <h4 className="font-display font-semibold mb-2 flex items-center gap-2">
                <Scale className="w-4 h-4 text-amber-500" /> Tarifa Administrativa
              </h4>
              <p className="text-xs text-muted-foreground mb-4">
                Solo ante incumplimientos verificados. No es recaudatoria, es correctiva.
              </p>
              <div className="p-4 rounded-xl bg-secondary/50 mb-4">
                <p className="text-2xl font-display font-bold gold-text text-center">u$s 50 + imp.</p>
                <p className="text-xs text-muted-foreground text-center mt-1">Cargo fijo, no reembolsable</p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Se aplica para reactivar la cuenta luego de un bloqueo por cancelaciones reiteradas o incumplimientos graves. No depende de la categoría ni de las SU.
              </p>

              <div className="mt-4 pt-3 border-t border-border">
                <h5 className="text-xs font-semibold mb-2 flex items-center gap-1">
                  <FileText className="w-3 h-3" /> Facturación
                </h5>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Factura A o B electrónica en ARS con conversión automática desde USD. Se requieren datos fiscales (CUIT/CUIL, condición IVA, domicilio fiscal).
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ═══════════ CALCULADORA SU ═══════════ */}
        <div className="mb-14">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-xl sm:text-2xl font-display font-bold text-center mb-2"
          >
            <Calculator className="inline w-5 h-5 mr-2 text-primary" />
            Calculadora de Swap Units
          </motion.h3>
          <p className="text-center text-sm text-muted-foreground mb-6 max-w-xl mx-auto">
            Fórmula: SU = Valor Base × Tipo Habitación × Ocupación × Noches
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="glass-card p-5 sm:p-8 max-w-2xl mx-auto"
          >
            <div className="grid sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Categoría del hotel</label>
                <select value={catIdx} onChange={(e) => setCatIdx(Number(e.target.value))} className={selectClass}>
                  {categories.map((c, i) => (
                    <option key={c.label} value={i}>{c.label} — {c.base} SU base</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Tipo de habitación</label>
                <select value={roomIdx} onChange={(e) => setRoomIdx(Number(e.target.value))} className={selectClass}>
                  {roomTypes.map((r, i) => (
                    <option key={r.label} value={i}>{r.label} — {r.mult}x</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Ocupación</label>
                <select value={occIdx} onChange={(e) => setOccIdx(Number(e.target.value))} className={selectClass}>
                  {occupancies.map((o, i) => (
                    <option key={o.pax} value={i}>{o.pax} personas — {o.mult}x</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">Noches</label>
                <div className="flex items-center gap-3">
                  <button onClick={() => setNights(Math.max(1, nights - 1))} className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-lg font-bold hover:bg-primary/20 transition-colors">−</button>
                  <span className="flex-1 text-center text-2xl font-display font-bold">{nights}</span>
                  <button onClick={() => setNights(Math.min(30, nights + 1))} className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-lg font-bold hover:bg-primary/20 transition-colors">+</button>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-primary/30 bg-primary/5 text-center">
              <p className="text-sm text-muted-foreground mb-1">Swap Units necesarias</p>
              <motion.div
                key={result}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, type: "spring" }}
                className="text-4xl sm:text-5xl font-display font-bold gold-text"
              >
                {result.toLocaleString("es-AR")}
              </motion.div>
              <p className="text-xs text-muted-foreground mt-2">
                {categories[catIdx].base} base × {roomTypes[roomIdx].mult}x hab × {occupancies[occIdx].mult}x occ × {nights} noches
              </p>
            </div>
          </motion.div>
        </div>

        {/* ═══════════ REGLAS DE MEMBRESÍA ═══════════ */}
        <div className="mb-10">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="text-xl sm:text-2xl font-display font-bold text-center mb-6"
          >
            <Clock className="inline w-5 h-5 mr-2 text-primary" />
            Reglas del Sistema
          </motion.h3>

          <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto mb-6">
            {membershipRules.map((rule, i) => {
              const Icon = rule.icon;
              return (
                <motion.div
                  key={rule.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
                  className="glass-card p-5"
                >
                  <h4 className="font-display font-semibold text-base mb-3 flex items-center gap-2">
                    <Icon className="w-4 h-4 text-primary" />
                    {rule.title}
                  </h4>
                  <ul className="space-y-2">
                    {rule.items.map((item) => (
                      <li key={item} className="text-sm text-muted-foreground leading-relaxed">• {item}</li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          {/* Automation triggers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="glass-card p-5 max-w-4xl mx-auto"
          >
            <h4 className="font-display font-semibold text-base mb-4">Automatización del Sistema</h4>
            <div className="grid sm:grid-cols-2 gap-3">
              {automationRules.map((rule) => (
                <div key={rule.event} className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50">
                  <span className={`text-lg ${rule.color}`}>●</span>
                  <div>
                    <p className="text-sm font-medium">{rule.event}</p>
                    <p className="text-xs text-muted-foreground">{rule.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ═══════════ MODELO ECONÓMICO ═══════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="max-w-3xl mx-auto p-6 rounded-2xl border border-primary/20 bg-primary/5 text-center"
        >
          <p className="text-sm text-muted-foreground italic leading-relaxed">
            "Swap Hotels no gana cuando alguien viaja más caro. Gana cuando la red funciona de manera sana, previsible y confiable. El modelo escala por volumen, no presiona a hoteles, no distorsiona el intercambio y permite sostener soporte y tecnología."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
