import { useState } from "react";
import { motion } from "framer-motion";
import { Moon, Plus, Info } from "lucide-react";
import { toast } from "sonner";

const categories = [
  { value: "select", label: "Select", base: 70 },
  { value: "superior", label: "Superior", base: 120 },
  { value: "premier", label: "Premier", base: 180 },
  { value: "elite", label: "Elite", base: 230 },
];

const seasons = [
  { value: "baja", label: "Temporada Baja", modifier: 0.9 },
  { value: "media", label: "Temporada Media", modifier: 1.0 },
  { value: "alta", label: "Temporada Alta", modifier: 1.1 },
];

const mintedHistory = [
  { id: 1, nights: 10, category: "Superior", season: "Baja", su: 1080, date: "2026-03-20", status: "activo" },
  { id: 2, nights: 5, category: "Premier", season: "Media", su: 900, date: "2026-03-10", status: "activo" },
  { id: 3, nights: 3, category: "Select", season: "Alta", su: 231, date: "2026-02-28", status: "vencido" },
];

const DashboardMint = () => {
  const [nights, setNights] = useState(1);
  const [category, setCategory] = useState("select");
  const [season, setSeason] = useState("baja");
  const [submitting, setSubmitting] = useState(false);

  const selectedCategory = categories.find((c) => c.value === category)!;
  const selectedSeason = seasons.find((s) => s.value === season)!;
  const estimatedSU = Math.round(nights * selectedCategory.base * selectedSeason.modifier);

  const handleMint = async () => {
    setSubmitting(true);
    // Mock: simulates smart contract minting
    await new Promise((r) => setTimeout(r, 1500));
    toast.success(`¡${estimatedSU} SU emitidos exitosamente!`);
    setSubmitting(false);
    setNights(1);
  };

  const selectClass =
    "w-full px-3 py-2.5 rounded-lg bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50";

  return (
    <div className="p-6 lg:p-8 max-w-[1000px]">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-foreground">Mis Noches</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Cargá tu capacidad ociosa para emitir Swap Units
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-3 bg-card rounded-xl border border-border p-6"
        >
          <h2 className="font-semibold text-sm mb-5 flex items-center gap-2">
            <Plus className="w-4 h-4 text-primary" />
            Nueva Emisión
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                Categoría de Habitación
              </label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className={selectClass}>
                {categories.map((c) => (
                  <option key={c.value} value={c.value}>{c.label} — {c.base} SU base/noche</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                Temporada
              </label>
              <select value={season} onChange={(e) => setSeason(e.target.value)} className={selectClass}>
                {seasons.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label} ({s.modifier === 1 ? "×1.0" : s.modifier < 1 ? `×${s.modifier}` : `×${s.modifier}`})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                Cantidad de Noches
              </label>
              <input
                type="number"
                min={1}
                max={30}
                value={nights}
                onChange={(e) => setNights(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-2.5 rounded-lg bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Estimate */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Swap Units a emitir</p>
                <p className="text-2xl font-bold text-primary">{estimatedSU} SU</p>
              </div>
              <Moon className="w-8 h-8 text-primary/30" />
            </div>

            <button
              onClick={handleMint}
              disabled={submitting}
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {submitting ? "Emitiendo en blockchain..." : "Emitir Swap Units"}
            </button>

            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
              <p>Las SU emitidas tienen una vigencia de 12 meses. La transacción es gasless (sin costo de gas).</p>
            </div>
          </div>
        </motion.div>

        {/* Minting History */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="font-semibold text-sm">Historial de Emisiones</h2>
          </div>
          <div className="divide-y divide-border">
            {mintedHistory.map((item) => (
              <div key={item.id} className="px-5 py-3.5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{item.nights} noches {item.category}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    item.status === "activo"
                      ? "bg-emerald-500/10 text-emerald-600"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {item.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{item.season} · {item.date}</span>
                  <span className="text-sm font-semibold text-primary">+{item.su} SU</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMint;
