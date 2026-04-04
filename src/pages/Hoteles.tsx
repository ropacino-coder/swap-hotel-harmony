import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowUpDown, X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hotels } from "@/data/hotels";
import { HotelCard } from "@/components/HotelCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const allCountries = [...new Set(hotels.map((h) => h.country))].sort();
const allCategories = [...new Set(hotels.map((h) => h.category))];
const allEnvironments = [...new Set(hotels.flatMap((h) => h.environment.split(" · ")))].sort();

type SortOption = "default" | "rating" | "su-asc" | "su-desc" | "stars";
const sortOptions: { value: SortOption; label: string }[] = [
  { value: "default", label: "Relevancia" },
  { value: "rating", label: "Mejor puntuación" },
  { value: "su-asc", label: "SU: menor a mayor" },
  { value: "su-desc", label: "SU: mayor a menor" },
  { value: "stars", label: "Más estrellas" },
];

const HotelesPage = () => {
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [country, setCountry] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [env, setEnv] = useState<string | null>(null);

  const hasActiveFilters = country || category || env || sortBy !== "default";

  const filtered = useMemo(() => {
    let list = [...hotels];
    if (country) list = list.filter((h) => h.country === country);
    if (category) list = list.filter((h) => h.category === category);
    if (env) list = list.filter((h) => h.environment.includes(env));
    return list;
  }, [country, category, env]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sortBy) {
      case "rating": return arr.sort((a, b) => b.rating - a.rating);
      case "su-asc": return arr.sort((a, b) => a.suPerNight - b.suPerNight);
      case "su-desc": return arr.sort((a, b) => b.suPerNight - a.suPerNight);
      case "stars": return arr.sort((a, b) => b.stars - a.stars);
      default: return arr;
    }
  }, [filtered, sortBy]);

  const clearFilters = () => {
    setCountry(null);
    setCategory(null);
    setEnv(null);
    setSortBy("default");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-20 sm:pt-28 pb-10 sm:pb-24">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
              Todos los <span className="text-primary">Hoteles</span>
            </h1>
            <p className="mt-1 sm:mt-2 max-w-xl mx-auto sm:mx-0 text-sm text-muted-foreground hidden sm:block">
              Explorá la red completa de establecimientos verificados en el Cono Sur.
            </p>
          </motion.div>

          {/* Filter bar */}
          <div className="mt-4 sm:mt-6 flex flex-nowrap sm:flex-wrap items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-hide pb-1">
            {/* Sort */}
            <div className="relative shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none rounded-lg border border-border bg-card px-2 py-1.5 pr-7 text-xs text-foreground cursor-pointer hover:border-primary/30 transition-colors focus:outline-none focus:ring-1 focus:ring-primary/30 whitespace-nowrap"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ArrowUpDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
            </div>

            {/* Country */}
            <div className="relative shrink-0">
              <select
                value={country || ""}
                onChange={(e) => setCountry(e.target.value || null)}
                className="appearance-none rounded-lg border border-border bg-card px-3 py-1.5 pr-8 text-xs text-foreground cursor-pointer hover:border-primary/30 transition-colors focus:outline-none focus:ring-1 focus:ring-primary/30 whitespace-nowrap"
              >
                <option value="">Todos los países</option>
                {allCountries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <MapPin className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
            </div>

            {/* Category */}
            <div className="relative shrink-0">
              <select
                value={category || ""}
                onChange={(e) => setCategory(e.target.value || null)}
                className="appearance-none rounded-lg border border-border bg-card px-3 py-1.5 pr-8 text-xs text-foreground cursor-pointer hover:border-primary/30 transition-colors focus:outline-none focus:ring-1 focus:ring-primary/30 whitespace-nowrap"
              >
                <option value="">Todas las categorías</option>
                {allCategories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <Filter className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
            </div>

            {/* Environment */}
            <div className="relative shrink-0">
              <select
                value={env || ""}
                onChange={(e) => setEnv(e.target.value || null)}
                className="appearance-none rounded-lg border border-border bg-card px-3 py-1.5 pr-8 text-xs text-foreground cursor-pointer hover:border-primary/30 transition-colors focus:outline-none focus:ring-1 focus:ring-primary/30 whitespace-nowrap"
              >
                <option value="">Todos los entornos</option>
                {allEnvironments.map((e) => (
                  <option key={e} value={e}>{e}</option>
                ))}
              </select>
            </div>

            {/* Clear */}
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="rounded-lg gap-1.5 text-xs text-muted-foreground hover:text-destructive shrink-0">
                <X className="h-3 w-3" /> Limpiar
              </Button>
            )}

            {/* Count */}
            <span className="ml-auto text-xs text-muted-foreground hidden sm:inline shrink-0">
              {sorted.length} {sorted.length === 1 ? "hotel" : "hoteles"}
            </span>
          </div>

          {/* Active filter tags */}
          {(country || category || env) && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {country && (
                <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary">
                  <MapPin className="h-2.5 w-2.5" /> {country}
                  <button onClick={() => setCountry(null)} className="ml-0.5 hover:text-destructive"><X className="h-2.5 w-2.5" /></button>
                </span>
              )}
              {category && (
                <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary">
                  {category}
                  <button onClick={() => setCategory(null)} className="ml-0.5 hover:text-destructive"><X className="h-2.5 w-2.5" /></button>
                </span>
              )}
              {env && (
                <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary">
                  {env}
                  <button onClick={() => setEnv(null)} className="ml-0.5 hover:text-destructive"><X className="h-2.5 w-2.5" /></button>
                </span>
              )}
            </div>
          )}

          {/* Grid */}
          <div className="mt-4 sm:mt-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-6">
            <AnimatePresence mode="popLayout">
              {sorted.map((hotel, i) => (
                <HotelCard key={hotel.id} hotel={hotel} index={i} />
              ))}
            </AnimatePresence>
          </div>

          {sorted.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No se encontraron hoteles con esos filtros.</p>
              <Button variant="outline" size="sm" onClick={clearFilters} className="mt-3 rounded-lg text-xs">
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HotelesPage;
