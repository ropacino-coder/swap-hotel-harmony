import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Coins, ArrowLeftRight, Clock, ShieldCheck, AlertTriangle,
  TrendingUp, TrendingDown, Database, Wallet, Gift, UserPlus,
  Bell, CalendarClock, BarChart3, Layers, RefreshCw, Lock,
} from "lucide-react";

/* ─── SU Categories ─── */
const suCategories = [
  { category: "Select", stars: "2★", base: 70, range: "63 – 77" },
  { category: "Superior", stars: "3★", base: 120, range: "108 – 132" },
  { category: "Premier", stars: "4★", base: 170, range: "158 – 187" },
  { category: "Elite", stars: "5★", base: 230, range: "207 – 253" },
];

/* ─── SU States ─── */
const suStates = [
  { label: "Disponibles", desc: "Listas para usar en reservas o transferencias autorizadas", color: "bg-emerald-500", textColor: "text-emerald-500" },
  { label: "Retenidas", desc: "Bloqueadas temporalmente durante una reserva en curso", color: "bg-amber-500", textColor: "text-amber-500" },
  { label: "Vencidas", desc: "Expiradas tras 12 meses, vuelven al Pool común", color: "bg-red-500", textColor: "text-red-500" },
];

/* ─── How to earn SU ─── */
const earnMethods = [
  { icon: Gift, title: "Bienvenida Fundadores", desc: "14 noches base de tu hotel al registrarte como fundador" },
  { icon: UserPlus, title: "Bienvenida Privados", desc: "7 noches base de tu hotel al completar verificación" },
  { icon: ArrowLeftRight, title: "Recibir Huéspedes", desc: "Cada vez que recibís un huésped de la red, ganás SU" },
  { icon: ShieldCheck, title: "Completar Perfil", desc: "SU extra por documentación y ficha completa al 100%" },
  { icon: TrendingUp, title: "Recomendación", desc: "7 noches base del hotel recomendado para ambas partes" },
  { icon: RefreshCw, title: "Compensaciones", desc: "SU adicionales por cancelaciones críticas del hotel anfitrión" },
];

/* ─── Expiration alerts ─── */
const alertTimeline = [
  { days: 90, color: "border-emerald-500/40 bg-emerald-500/5", dot: "bg-emerald-500" },
  { days: 60, color: "border-amber-500/40 bg-amber-500/5", dot: "bg-amber-500" },
  { days: 30, color: "border-red-500/40 bg-red-500/5", dot: "bg-red-500" },
];

/* ─── Pool architecture ─── */
const poolSides = [
  {
    icon: Database,
    title: "Lado A: Reserva de Valor",
    subtitle: "El Inventario Físico",
    color: "border-primary/30 bg-primary/5",
    items: [
      "Contiene todas las noches de hotel aportadas al sistema (compromiso de 90 noches anuales)",
      "Sube cuando los hoteles cargan disponibilidad de temporada baja",
      "Baja cada vez que un hotelero ejecuta una reserva",
      "Mientras haya noches disponibles, las SU tienen poder adquisitivo real",
    ],
  },
  {
    icon: Wallet,
    title: "Lado B: Tesorería Central",
    subtitle: "El Flujo de Swap Units",
    color: "border-primary/30 bg-primary/5",
    items: [
      "Cuenta maestra administrada únicamente por Swap Hotels",
      "Emite SU para bonos de bienvenida y compensaciones",
      "El déficit inicial es normal: es el costo de adquisición para inyectar liquidez",
      "Se recupera con vencimientos (FIFO 12 meses) y no renovaciones de membresía",
    ],
  },
];

/* ─── Pool lifecycle ─── */
const lifecycle = [
  {
    step: "01",
    title: "El Estímulo",
    desc: "100 hoteles fundadores entran. Se emiten 1.000 SU por hotel. La Tesorería arranca en −100.000 SU, pero el sistema tiene 9.000 noches reales.",
    icon: TrendingUp,
    color: "text-emerald-500",
  },
  {
    step: "02",
    title: "El Ecosistema Vivo",
    desc: "Los hoteles viajan y se pasan SU entre sí. La Tesorería sigue en negativo, pero la empresa factura miles de dólares reales en tarifas de servicio.",
    icon: ArrowLeftRight,
    color: "text-primary",
  },
  {
    step: "03",
    title: "La Recaudación",
    desc: "SU no usadas vencen a los 12 meses y vuelven a la Tesorería. Con el tiempo, el déficit se licúa solo. El sistema se auto-equilibra.",
    icon: TrendingDown,
    color: "text-amber-500",
  },
];

const SwapUnitsPoolSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-12 sm:py-16 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6">
        {/* ═══ HEADER ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">
            Moneda del Sistema
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold mt-3 mb-4 text-balance">
            Swap Units & <span className="gold-text">Pool de Swaps</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
            Las Swap Units existen para facilitar intercambios, no para ser acumuladas ni comercializadas. Entendé cómo funcionan y por qué el sistema es inquebrantable.
          </p>
        </motion.div>

        {/* ═══ QUÉ SON LAS SU ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Coins className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold">¿Qué son las Swap Units?</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {[
              "No son dinero",
              "No representan valor monetario",
              "No se compran ni venden entre usuarios",
              "Solo existen dentro de Swap Hotels",
              "Representan capacidad de intercambio",
            ].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.5 }}
                className="glass-card p-4 text-center"
              >
                <Lock className="w-4 h-4 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">{item}</p>
              </motion.div>
            ))}
          </div>

          {/* Formula */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="max-w-2xl mx-auto p-6 rounded-2xl border border-primary/20 bg-primary/5 text-center"
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Fórmula base</p>
            <p className="font-display font-bold text-lg sm:text-xl">
              SU por noche = <span className="text-primary">Valor Base</span> × <span className="text-primary">Tipo Habitación</span> × <span className="text-primary">Ocupación</span>
            </p>
            <p className="text-xs text-muted-foreground mt-3 italic">
              "Dentro de cada categoría hay un rango de SU que refleja diferencias de ubicación, servicios y propuesta, no el precio de mercado."
            </p>
          </motion.div>
        </motion.div>

        {/* ═══ SU POR CATEGORÍA ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold">SU por Categoría</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {suCategories.map((cat, i) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                className="glass-card-hover p-6 text-center"
              >
                <span className="text-sm text-primary font-bold">{cat.stars}</span>
                <h4 className="font-display font-bold text-lg mt-1 mb-3">{cat.category}</h4>
                <div className="text-4xl font-display font-bold gold-text mb-1">{cat.base}</div>
                <p className="text-xs text-muted-foreground">SU base por noche</p>
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground">Banda ±10%: <span className="font-semibold text-foreground">{cat.range}</span></p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ═══ ESTADOS DE SU ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Layers className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold">Estados de las SU</h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {suStates.map((state, i) => (
              <motion.div
                key={state.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.25 + i * 0.1, duration: 0.6 }}
                className="glass-card p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className={`w-3 h-3 rounded-full ${state.color}`} />
                  <h4 className={`font-display font-bold text-lg ${state.textColor}`}>{state.label}</h4>
                </div>
                <p className="text-sm text-muted-foreground">{state.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ═══ CÓMO GANAR SU ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Gift className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold">¿Cómo se consiguen SU?</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {earnMethods.map((method, i) => {
              const Icon = method.icon;
              return (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
                  className="glass-card-hover p-5"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-display font-semibold text-base mb-2">{method.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{method.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ═══ VENCIMIENTO ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <CalendarClock className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold">Vencimiento: 12 Meses FIFO</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Cada Swap Unit tiene su propio plazo de 12 meses desde su acreditación. El vencimiento no depende de la actividad de la cuenta. Las SU vencidas vuelven automáticamente al Pool común.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Aplica a <strong>todas</strong> las SU: por intercambios, logros, bienvenida, compensaciones y recomendaciones. Sin excepción.
              </p>
              <p className="text-xs text-muted-foreground italic">
                "Las SU no se pierden, vuelven a la red para seguir generando intercambios."
              </p>
            </div>

            <div className="glass-card p-6">
              <h4 className="font-display font-semibold text-base mb-4 flex items-center gap-2">
                <Bell className="w-4 h-4 text-primary" />
                Sistema de Alertas
              </h4>
              <div className="space-y-3">
                {alertTimeline.map((alert) => (
                  <div key={alert.days} className={`rounded-xl border p-4 ${alert.color}`}>
                    <div className="flex items-center gap-3">
                      <span className={`w-3 h-3 rounded-full ${alert.dot}`} />
                      <span className="font-display font-bold text-sm">{alert.days} días antes</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 ml-6">
                      "Tenés SU que vencen en {alert.days} días"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ═══ POOL DE SWAPS ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">
              Arquitectura Económica
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mt-3 mb-4 text-balance">
              El Pool de Swaps
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-balance">
              El corazón económico del ecosistema. Un sistema de doble respaldo: Noches reales vs. Swap Units.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {poolSides.map((side, i) => {
              const Icon = side.icon;
              return (
                <motion.div
                  key={side.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.15, duration: 0.6 }}
                  className={`rounded-2xl border p-6 sm:p-8 ${side.color}`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg">{side.title}</h3>
                      <p className="text-xs text-muted-foreground">{side.subtitle}</p>
                    </div>
                  </div>
                  <ul className="space-y-3 mt-5">
                    {side.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                        <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          {/* Lifecycle */}
          <h3 className="font-display font-bold text-lg mb-5 text-center">Cómo respira el Pool</h3>
          <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto mb-10">
            {lifecycle.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.12, duration: 0.6 }}
                  className="glass-card-hover p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold text-primary">PASO {step.step}</span>
                    <Icon className={`w-5 h-5 ${step.color}`} />
                  </div>
                  <h4 className="font-display font-bold text-base mb-2">{step.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Why it's unbreakable */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="max-w-3xl mx-auto p-6 sm:p-8 rounded-2xl border border-primary/20 bg-primary/5"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-bold text-lg">¿Por qué este modelo es inquebrantable?</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              A diferencia de un esquema especulativo, Swap Hotels nunca corre riesgo de quiebra por emitir SU. Cuando un hotelero gasta sus SU de regalo, el que "paga" el costo de esa habitación es otro hotelero con su cama vacía (costo hundido), no la plataforma con dólares.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Swap Hotels solo pone la tecnología y cobra la tarifa de servicio. El sistema se auto-sustenta porque el inventario real (noches de hotel) siempre respalda las unidades en circulación.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SwapUnitsPoolSection;
