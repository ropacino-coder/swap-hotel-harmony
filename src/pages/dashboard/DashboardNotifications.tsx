import { motion } from "framer-motion";
import { Bell, BookOpen, Lock, AlertTriangle, CheckCircle2 } from "lucide-react";

const notifications = [
  { id: 1, title: "Nueva reserva recibida", desc: "Hotel Costa Mar reservó 3 noches en tu hotel por 360 SU.", time: "Hace 2 horas", type: "booking", read: false },
  { id: 2, title: "Escrow liberado", desc: "150 SU fueron liberados tras el check-in confirmado en Hotel Mendoza Suites.", time: "Hace 1 día", type: "escrow", read: false },
  { id: 3, title: "SU por vencer", desc: "90 SU vencen en 30 días. Considerá usarlos o renovarlos.", time: "Hace 2 días", type: "warning", read: true },
  { id: 4, title: "Minting completado", desc: "280 SU fueron emitidos exitosamente por 4 noches en Temporada Baja.", time: "Hace 5 días", type: "success", read: true },
  { id: 5, title: "Verificación aprobada", desc: "Tu hotel fue verificado y ya puede operar en la red.", time: "Hace 1 semana", type: "success", read: true },
];

const iconMap: Record<string, any> = {
  booking: BookOpen,
  escrow: Lock,
  warning: AlertTriangle,
  success: CheckCircle2,
};

const colorMap: Record<string, string> = {
  booking: "bg-primary/10 text-primary",
  escrow: "bg-amber-500/10 text-amber-600",
  warning: "bg-destructive/10 text-destructive",
  success: "bg-emerald-500/10 text-emerald-600",
};

const DashboardNotifications = () => (
  <div className="p-6 lg:p-8 max-w-[800px]">
    <div className="mb-6">
      <h1 className="text-2xl font-display font-bold text-foreground">Notificaciones</h1>
      <p className="text-sm text-muted-foreground mt-1">Actividad y alertas de tu cuenta</p>
    </div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-card rounded-xl border border-border divide-y divide-border"
    >
      {notifications.map((n) => {
        const Icon = iconMap[n.type] || Bell;
        return (
          <div key={n.id} className={`px-5 py-4 flex items-start gap-4 ${!n.read ? "bg-primary/[0.02]" : ""}`}>
            <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${colorMap[n.type]}`}>
              <Icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-foreground">{n.title}</p>
                {!n.read && <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{n.desc}</p>
              <p className="text-[10px] text-muted-foreground/60 mt-1">{n.time}</p>
            </div>
          </div>
        );
      })}
    </motion.div>
  </div>
);

export default DashboardNotifications;
