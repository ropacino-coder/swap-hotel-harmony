import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownLeft, Lock } from "lucide-react";
import { useState } from "react";

const allTransactions = [
  { id: 1, type: "received", amount: 140, counterpart: "Hotel Patagonia Lodge", date: "2026-03-28", hash: "0x1a2b...3c4d" },
  { id: 2, type: "sent", amount: 200, counterpart: "Hotel Mendoza Suites", date: "2026-03-25", hash: "0x5e6f...7g8h" },
  { id: 3, type: "escrow", amount: 150, counterpart: "Hotel Bariloche Resort", date: "2026-03-22", hash: "0x9i0j...1k2l" },
  { id: 4, type: "minted", amount: 280, counterpart: "Minting — 4 noches T. Baja", date: "2026-03-20", hash: "0x3m4n...5o6p" },
  { id: 5, type: "received", amount: 70, counterpart: "Hotel Salta Colonial", date: "2026-03-18", hash: "0x7q8r...9s0t" },
  { id: 6, type: "sent", amount: 120, counterpart: "Hotel Iguazú Falls", date: "2026-03-15", hash: "0xu1v2...w3x4" },
  { id: 7, type: "escrow", amount: 180, counterpart: "Hotel Buenos Aires Central", date: "2026-03-12", hash: "0xy5z6...a7b8" },
  { id: 8, type: "minted", amount: 350, counterpart: "Minting — 5 noches T. Media", date: "2026-03-10", hash: "0xc9d0...e1f2" },
];

const typeLabels: Record<string, string> = { received: "Recibido", sent: "Enviado", escrow: "Escrow", minted: "Minting" };
const typeFilters = ["all", "received", "sent", "escrow", "minted"];

const DashboardTransactions = () => {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? allTransactions : allTransactions.filter((t) => t.type === filter);

  const icon = (type: string) => {
    switch (type) {
      case "received": case "minted": return <ArrowDownLeft className="w-3.5 h-3.5" />;
      case "escrow": return <Lock className="w-3.5 h-3.5" />;
      default: return <ArrowUpRight className="w-3.5 h-3.5" />;
    }
  };

  const color = (type: string) => {
    switch (type) {
      case "received": case "minted": return "bg-emerald-500/10 text-emerald-600";
      case "escrow": return "bg-amber-500/10 text-amber-600";
      default: return "bg-primary/10 text-primary";
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-[900px]">
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground">Transacciones</h1>
        <p className="text-sm text-muted-foreground mt-1">Historial completo de movimientos on-chain</p>
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {typeFilters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filter === f
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:bg-accent"
            }`}
          >
            {f === "all" ? "Todas" : typeLabels[f]}
          </button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-card rounded-xl border border-border divide-y divide-border"
      >
        {filtered.map((tx) => (
          <div key={tx.id} className="px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center ${color(tx.type)}`}>
                {icon(tx.type)}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{tx.counterpart}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-muted-foreground">{tx.date}</span>
                  <span className="text-[10px] text-muted-foreground/60 font-mono">{tx.hash}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className={`text-sm font-bold ${
                tx.type === "received" || tx.type === "minted" ? "text-emerald-600" : "text-foreground"
              }`}>
                {tx.type === "received" || tx.type === "minted" ? "+" : "-"}{tx.amount} SU
              </span>
              <p className="text-[10px] text-muted-foreground mt-0.5">{typeLabels[tx.type]}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default DashboardTransactions;
