import { useState } from "react";
import { Brain, Loader2, X, Plus, BarChart3, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { hotels } from "@/data/hotels";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface CompareAnalysis {
  summary: string;
  winner: string;
  analysis: { hotelId: string; strengths: string[]; weaknesses: string[]; rating: number }[];
  recommendation: string;
}

export const HotelComparator = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CompareAnalysis | null>(null);
  const [open, setOpen] = useState(false);

  const toggleHotel = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 4 ? [...prev, id] : prev
    );
    setResult(null);
  };

  const compare = async () => {
    if (selectedIds.length < 2) {
      toast.error("Seleccioná al menos 2 hoteles");
      return;
    }
    setLoading(true);
    try {
      const selected = hotels.filter((h) => selectedIds.includes(h.id));
      const { data, error } = await supabase.functions.invoke("hotel-compare", {
        body: {
          hotels: selected.map((h) => ({
            id: h.id,
            name: h.name,
            location: h.location,
            stars: h.stars,
            category: h.category,
            suPerNight: h.suPerNight,
            rating: h.rating,
            environment: h.environment,
            amenities: h.amenities,
            seasons: h.seasons,
            description: h.description,
          })),
        },
      });
      if (error) throw error;
      if (data?.error) {
        toast.error(data.error);
        return;
      }
      setResult(data);
    } catch {
      toast.error("No se pudo comparar. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-xs font-semibold text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all"
      >
        <BarChart3 className="h-4 w-4 text-primary" />
        Comparar hoteles
      </button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-primary/15 bg-card p-4 sm:p-5 space-y-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          <h3 className="text-sm font-bold text-foreground">Comparador de hoteles</h3>
        </div>
        <button
          onClick={() => {
            setOpen(false);
            setResult(null);
            setSelectedIds([]);
          }}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Seleccioná 2 a 4 hoteles para comparar con IA
      </p>

      {/* Hotel pills */}
      <div className="flex flex-wrap justify-center gap-2">
        {hotels.map((h) => {
          const selected = selectedIds.includes(h.id);
          return (
            <button
              key={h.id}
              onClick={() => toggleHotel(h.id)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-[11px] font-medium transition-all ${
                selected
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-background text-foreground hover:border-primary/30"
              }`}
            >
              {selected ? <X className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
              {h.name}
            </button>
          );
        })}
      </div>

      {/* Compare button */}
      {selectedIds.length >= 2 && !result && (
        <div className="text-center">
          <Button onClick={compare} disabled={loading} className="gap-2 rounded-xl text-xs" size="sm">
            {loading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Brain className="h-3.5 w-3.5" />
            )}
            {loading ? "Comparando..." : `Comparar ${selectedIds.length} hoteles`}
          </Button>
        </div>
      )}

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4 pt-3 border-t border-border"
          >
            <p className="text-sm text-foreground leading-relaxed text-center">{result.summary}</p>

            <div className="space-y-3">
              {result.analysis?.map((a) => {
                const h = hotels.find((x) => x.id === a.hotelId);
                const isWinner = a.hotelId === result.winner;
                return (
                  <div
                    key={a.hotelId}
                    className={`rounded-xl border p-4 text-center ${
                      isWinner ? "border-primary/30 bg-primary/5" : "border-border"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {isWinner && <Trophy className="h-4 w-4 text-primary" />}
                      <span className="text-sm font-bold text-foreground">
                        {h?.name || a.hotelId}
                      </span>
                      <span className="text-xs font-bold text-primary">{a.rating}/10</span>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 text-xs text-left">
                      <div>
                        <p className="font-semibold text-emerald-600 mb-1 text-center sm:text-left">
                          Fortalezas
                        </p>
                        {a.strengths?.map((s, i) => (
                          <p key={i} className="text-muted-foreground">
                            • {s}
                          </p>
                        ))}
                      </div>
                      <div>
                        <p className="font-semibold text-destructive mb-1 text-center sm:text-left">
                          Debilidades
                        </p>
                        {a.weaknesses?.map((w, i) => (
                          <p key={i} className="text-muted-foreground">
                            • {w}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="rounded-xl bg-secondary/60 p-4 text-center">
              <p className="text-xs font-bold text-foreground mb-1">Recomendación</p>
              <p className="text-sm text-muted-foreground">{result.recommendation}</p>
            </div>

            <p className="text-[10px] text-muted-foreground/60 text-center">
              Análisis generado por IA. No constituye asesoramiento.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
