import { motion } from "framer-motion";
import {
  Wallet,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  Lock,
} from "lucide-react";

// Mock data
const walletData = {
  available: 1240,
  escrowed: 350,
  expired: 80,
  total: 1670,
};

const recentTransactions = [
  { id: 1, type: "received", amount: 140, from: "Hotel Patagonia Lodge", date: "2026-03-28", status: "completed" },
  { id: 2, type: "sent", amount: 200, to: "Hotel Mendoza Suites", date: "2026-03-25", status: "completed" },
  { id: 3, type: "escrow", amount: 150, to: "Hotel Bariloche Resort", date: "2026-03-22", status: "pending" },
  { id: 4, type: "minted", amount: 280, from: "Minting - 4 noches T. Baja", date: "2026-03-20", status: "completed" },
  { id: 5, type: "received", amount: 70, from: "Hotel Salta Colonial", date: "2026-03-18", status: "completed" },
];

const notifications = [
  { id: 1, text: "Nueva reserva recibida de Hotel Costa Mar", time: "Hace 2 horas", type: "booking" },
  { id: 2, text: "Tus 150 SU en escrow fueron liberados", time: "Hace 1 día", type: "escrow" },
  { id: 3, text: "90 SU vencen en 30 días", time: "Hace 2 días", type: "warning" },
];

const StatCard = ({ icon: Icon, label, value, suffix = "SU", color }: {
  icon: any; label: string; value: number; suffix?: string; color: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-shadow"
  >
    <div className="flex items-center justify-between mb-3">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}>
        <Icon className="w-4 h-4" />
      </div>
    </div>
    <p className="text-2xl font-bold text-foreground">
      {value.toLocaleString()} <span className="text-sm font-medium text-muted-foreground">{suffix}</span>
    </p>
  </motion.div>
);

const DashboardHome = () => {
  return (
    <div className="p-6 lg:p-8 max-w-[1200px]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-foreground">Bienvenido de vuelta</h1>
        <p className="text-sm text-muted-foreground mt-1">Resumen de tu wallet y actividad reciente</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Wallet} label="Disponibles" value={walletData.available} color="bg-primary/10 text-primary" />
        <StatCard icon={Lock} label="En Escrow" value={walletData.escrowed} color="bg-amber-500/10 text-amber-600" />
        <StatCard icon={Clock} label="Por Vencer" value={walletData.expired} color="bg-destructive/10 text-destructive" />
        <StatCard icon={TrendingUp} label="Total Emitidos" value={walletData.total} color="bg-emerald-500/10 text-emerald-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transactions */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold text-sm">Últimas Transacciones</h2>
            <a href="/dashboard/transacciones" className="text-xs text-primary hover:underline">Ver todas</a>
          </div>
          <div className="divide-y divide-border">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="px-5 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    tx.type === "received" || tx.type === "minted"
                      ? "bg-emerald-500/10 text-emerald-600"
                      : tx.type === "escrow"
                      ? "bg-amber-500/10 text-amber-600"
                      : "bg-primary/10 text-primary"
                  }`}>
                    {tx.type === "received" || tx.type === "minted" ? (
                      <ArrowDownLeft className="w-3.5 h-3.5" />
                    ) : tx.type === "escrow" ? (
                      <Lock className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {tx.type === "received" ? `De ${tx.from}` :
                       tx.type === "minted" ? tx.from :
                       tx.type === "escrow" ? `Escrow → ${tx.to}` :
                       `A ${tx.to}`}
                    </p>
                    <p className="text-xs text-muted-foreground">{tx.date}</p>
                  </div>
                </div>
                <span className={`text-sm font-semibold ${
                  tx.type === "received" || tx.type === "minted" ? "text-emerald-600" : "text-foreground"
                }`}>
                  {tx.type === "received" || tx.type === "minted" ? "+" : "-"}{tx.amount} SU
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-card rounded-xl border border-border">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold text-sm">Notificaciones</h2>
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
              {notifications.length}
            </span>
          </div>
          <div className="divide-y divide-border">
            {notifications.map((n) => (
              <div key={n.id} className="px-5 py-3.5">
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                    n.type === "booking" ? "bg-primary" :
                    n.type === "escrow" ? "bg-emerald-500" : "bg-amber-500"
                  }`} />
                  <div>
                    <p className="text-sm text-foreground">{n.text}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
