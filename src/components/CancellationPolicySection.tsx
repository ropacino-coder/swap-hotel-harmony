import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Clock, AlertTriangle, ShieldAlert, Ban, UserX, Building2,
  CheckCircle, XCircle, AlertCircle, FileText, Eye, BarChart3,
} from "lucide-react";

/* ─── Guest cancellation tiers ─── */
const guestTiers = [
  {
    label: "A",
    window: "+14 días",
    color: "border-emerald-500/40 bg-emerald-500/5",
    dot: "bg-emerald-500",
    icon: CheckCircle,
    iconColor: "text-emerald-500",
    suReturn: "100%",
    suLoss: "0%",
    penalty: "Sin penalización",
    penaltyLevel: "none",
  },
  {
    label: "B",
    window: "14 a 7 días",
    color: "border-amber-500/40 bg-amber-500/5",
    dot: "bg-amber-500",
    icon: AlertCircle,
    iconColor: "text-amber-500",
    suReturn: "100%",
    suLoss: "0%",
    penalty: "Registro interno + impacto leve en ranking",
    penaltyLevel: "low",
  },
  {
    label: "C",
    window: "7 días a 24 hs",
    color: "border-orange-500/40 bg-orange-500/5",
    dot: "bg-orange-500",
    icon: AlertTriangle,
    iconColor: "text-orange-500",
    suReturn: "70%",
    suLoss: "30%",
    penalty: "Registro interno + impacto medio en ranking. 30% de SU se acreditan al hotel",
    penaltyLevel: "medium",
  },
  {
    label: "D",
    window: "−24 hs / No-show",
    color: "border-red-500/40 bg-red-500/5",
    dot: "bg-red-500",
    icon: XCircle,
    iconColor: "text-red-500",
    suReturn: "0%",
    suLoss: "100%",
    penalty: "Registro interno + impacto significativo en ranking. 100% de SU al hotel",
    penaltyLevel: "critical",
  },
];

/* ─── Hotel cancellation tiers ─── */
const hotelTiers = [
  {
    label: "A",
    window: "+14 días",
    color: "border-emerald-500/40 bg-emerald-500/5",
    dot: "bg-emerald-500",
    penalty: "Sin penalización",
    consequence: "SU y tarifa devueltas al huésped",
  },
  {
    label: "B",
    window: "14 a 7 días",
    color: "border-amber-500/40 bg-amber-500/5",
    dot: "bg-amber-500",
    penalty: "Registro interno + impacto leve en ranking",
    consequence: "SU y tarifa devueltas al huésped",
  },
  {
    label: "C",
    window: "7 días a 48 hs",
    color: "border-orange-500/40 bg-orange-500/5",
    dot: "bg-orange-500",
    penalty: "Registro + impacto medio + advertencia de bloqueo",
    consequence: "SU y tarifa devueltas. 2° incumplimiento: bloqueo de cuenta",
  },
  {
    label: "D",
    window: "−48 hs / mismo día",
    color: "border-red-500/40 bg-red-500/5",
    dot: "bg-red-500",
    penalty: "Registro + multa de 30% SU al hotel (tope 2 noches) + baja fuerte de ranking",
    consequence: "SU y tarifa devueltas + compensación 30% al huésped. 2° incumplimiento: bloqueo",
  },
];

/* ─── Sanctions ─── */
const sanctions = [
  {
    level: "1er Incumplimiento",
    emoji: "🟡",
    color: "border-amber-500/30 bg-amber-500/5",
    items: [
      "Registro interno",
      "Aviso formal por email + panel",
      "Aclaración de consecuencias futuras",
    ],
  },
  {
    level: "2do Incumplimiento",
    emoji: "🔴",
    color: "border-red-500/30 bg-red-500/5",
    items: [
      "Inhabilitación temporal de cuenta",
      "Tarifa administrativa de USD 50 para reactivar",
      "No puede reservar ni recibir huéspedes",
    ],
  },
  {
    level: "Reincidencia (3° en 12 meses)",
    emoji: "⛔",
    color: "border-red-700/30 bg-red-700/5",
    items: [
      "Nueva tarifa administrativa",
      "Restricción temporal de visibilidad",
      "Posible suspensión definitiva",
    ],
  },
];

/* ─── What gets logged ─── */
const logItems = [
  { icon: FileText, text: "Logs de aprobación / rechazo" },
  { icon: CheckCircle, text: "Confirmación operativa (usuario, hora, IP)" },
  { icon: Ban, text: "Cancelaciones e incidentes críticos" },
  { icon: ShieldAlert, text: "Sanciones y reclamos con evidencias" },
  { icon: Eye, text: "Historial de comportamiento" },
];

const logPurposes = [
  "Trazabilidad completa",
  "Evitar arbitrariedad",
  "Respaldo legal",
  "Criterio consistente",
];

const CancellationPolicySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-12 sm:py-16 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6">
        {/* ═══ Header ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">
            Política Oficial
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold mt-3 mb-4 text-balance">
            Cancelaciones &{" "}
            <span className="gold-text">Sanciones</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
            Reglas claras, predecibles y defendibles. Cada parte sabe qué pasa si cancela y cuándo.
          </p>
        </motion.div>

        {/* ═══ GUEST CANCELLATIONS ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <UserX className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold">Cancela el Huésped</h3>
          </div>

          <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
            La tarifa de servicio no se devuelve (salvo error de plataforma o causa excepcional).
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {guestTiers.map((tier, i) => {
              const Icon = tier.icon;
              return (
                <motion.div
                  key={tier.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.6 }}
                  className={`rounded-2xl border p-5 ${tier.color} flex flex-col`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${tier.dot}`} />
                      <span className="font-display font-bold text-lg">Tramo {tier.label}</span>
                    </div>
                    <Icon className={`w-5 h-5 ${tier.iconColor}`} />
                  </div>

                  <div className="glass-card p-3 rounded-xl mb-3">
                    <p className="text-xs text-muted-foreground mb-1">Antelación</p>
                    <p className="font-display font-bold text-sm">{tier.window}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-background/50 rounded-xl p-3 text-center">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Recuperás</p>
                      <p className="font-display font-bold text-lg text-emerald-500">{tier.suReturn}</p>
                    </div>
                    <div className="bg-background/50 rounded-xl p-3 text-center">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Perdés</p>
                      <p className="font-display font-bold text-lg text-red-500">{tier.suLoss}</p>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed mt-auto">
                    {tier.penalty}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ═══ HOTEL CANCELLATIONS ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold">Cancela el Hotel</h3>
          </div>

          <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
            Las SU retenidas vuelven al huésped en todos los casos. La tarifa de servicio se devuelve siempre.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {hotelTiers.map((tier, i) => (
              <motion.div
                key={tier.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.25 + i * 0.1, duration: 0.6 }}
                className={`rounded-2xl border p-5 ${tier.color} flex flex-col`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className={`w-3 h-3 rounded-full ${tier.dot}`} />
                  <span className="font-display font-bold text-lg">Tramo {tier.label}</span>
                </div>

                <div className="glass-card p-3 rounded-xl mb-3">
                  <p className="text-xs text-muted-foreground mb-1">Antelación</p>
                  <p className="font-display font-bold text-sm">{tier.window}</p>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed mb-3 flex-1">
                  {tier.penalty}
                </p>

                <div className="bg-background/50 rounded-xl p-3">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Consecuencia</p>
                  <p className="text-xs font-medium leading-relaxed">{tier.consequence}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ═══ SANCTIONS ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold">Sistema de Sanciones</h3>
          </div>

          <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
            Simple. Predecible. Defendible. Cada incumplimiento queda registrado y tiene consecuencias progresivas.
          </p>

          <div className="grid sm:grid-cols-3 gap-5 max-w-4xl">
            {sanctions.map((s, i) => (
              <motion.div
                key={s.level}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.35 + i * 0.1, duration: 0.6 }}
                className={`rounded-2xl border p-6 ${s.color}`}
              >
                <div className="text-2xl mb-3">{s.emoji}</div>
                <h4 className="font-display font-bold text-base mb-4">{s.level}</h4>
                <ul className="space-y-2">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ═══ INTERNAL LOG + REPUTATION ═══ */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-display font-bold text-lg">Registro Interno</h4>
            </div>

            <div className="space-y-3 mb-5">
              {logItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.text} className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm text-muted-foreground">{item.text}</span>
                  </div>
                );
              })}
            </div>

            <div className="rounded-xl bg-secondary/50 p-4">
              <p className="text-xs font-semibold mb-2">Objetivo:</p>
              <div className="flex flex-wrap gap-2">
                {logPurposes.map((p) => (
                  <span key={p} className="text-[11px] px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-primary" />
              </div>
              <h4 className="font-display font-bold text-lg">Reputación Interna</h4>
            </div>

            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              El sistema de reputación es interno y se basa en datos objetivos. No hay rating público inicial.
            </p>

            <div className="space-y-3">
              {[
                "Cumplimiento de reservas",
                "Historial de cancelaciones",
                "Tiempos de respuesta",
                "Incidentes críticos",
                "Comportamiento de huéspedes y hoteles",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                  <Clock className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ═══ Bottom banner ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 max-w-3xl mx-auto p-6 rounded-2xl border border-primary/20 bg-primary/5 text-center"
        >
          <p className="text-sm text-muted-foreground italic leading-relaxed">
            "Tu reserva fue cancelada por el hotel. Ya devolvimos tus Swap Units y te acreditamos un 30% adicional en concepto de compensación. La devolución de la tarifa de servicio ya se encuentra en proceso. Podés reservar otro hotel disponible ahora mismo."
          </p>
          <p className="text-xs text-muted-foreground mt-3">— Mensaje automático de la plataforma ante cancelación crítica del hotel</p>
        </motion.div>
      </div>
    </section>
  );
};

export default CancellationPolicySection;
