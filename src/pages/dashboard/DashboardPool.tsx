import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Star, Calendar, ArrowLeftRight, ArrowUpDown, X, Filter } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const poolListings = [
  { id: 1, hotel: "Hotel Patagonia Lodge", city: "El Calafate", category: "Premier", stars: 4, su: 180, nights: 3, season: "Alta", photo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80", amenities: ["Spa", "Restaurant", "Lago"] },
  { id: 2, hotel: "Hotel Mendoza Suites", city: "Mendoza", category: "Superior", su: 120, stars: 4, nights: 5, season: "Media", photo: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&q=80", amenities: ["Viñedos", "Pool", "Gym"] },
  { id: 3, hotel: "Hotel Salta Colonial", city: "Salta", category: "Select", su: 70, stars: 3, nights: 2, season: "Baja", photo: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80", amenities: ["Centro", "Desayuno"] },
  { id: 4, hotel: "Hotel Bariloche Resort", city: "Bariloche", category: "Elite", su: 230, stars: 5, nights: 4, season: "Alta", photo: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&q=80", amenities: ["Ski", "Spa", "Lago", "Restaurant"] },
  { id: 5, hotel: "Hotel Buenos Aires Central", city: "CABA", category: "Superior", su: 120, stars: 4, nights: 7, season: "Media", photo: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&q=80", amenities: ["Business", "Rooftop", "Gym"] },
  { id: 6, hotel: "Hotel Iguazú Falls", city: "Puerto Iguazú", category: "Premier", su: 180, stars: 4, nights: 2, season: "Alta", photo: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&q=80", amenities: ["Selva", "Pool", "Cataratas"] },
];

const destinations = [...new Set(poolListings.map((l) => l.city))].sort();
const categories = [...new Set(poolListings.map((l) => l.category))];

type SortOption = "default" | "su-asc" | "su-desc" | "nights" | "stars";
const sortOptions: { value: SortOption; label: string }[] = [
  { value: "default", label: "Relevancia" },
  { value: "su-asc", label: "SU: menor a mayor" },
  { value: "su-desc", label: "SU: mayor a menor" },
  { value: "nights", label: "Más noches" },
  { value: "stars", label: "Más estrellas" },
];

const DashboardPool = () => {
  const [search, setSearch] = useState("");
  const [destination, setDestination] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [bookingId, setBookingId] = useState<number | null>(null);

  const hasActiveFilters = destination || categoryFilter || sortBy !== "default" || search;

  const filtered = useMemo(() => {
    let list = [...poolListings];
    if (destination) list = list.filter((l) => l.city === destination);
    if (categoryFilter) list = list.filter((l) => l.category === categoryFilter);
    if (search) list = list.filter((l) => l.hotel.toLowerCase().includes(search.toLowerCase()) || l.city.toLowerCase().includes(search.toLowerCase()));
    return list;
  }, [destination, categoryFilter, search]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    switch (sortBy) {
      case "su-asc": return arr.sort((a, b) => a.su - b.su);
      case "su-desc": return arr.sort((a, b) => b.su - a.su);
      case "nights": return arr.sort((a, b) => b.nights - a.nights);
      case "stars": return arr.sort((a, b) => b.stars - a.stars);
      default: return arr;
    }
  }, [filtered, sortBy]);

  const clearFilters = () => {
    setDestination(null);
    setCategoryFilter(null);
    setSortBy("default");
    setSearch("");
  };

  const handleBook = async (listing: typeof poolListings[0]) => {
    setBookingId(listing.id);
    await new Promise((r) => setTimeout(r, 2000));
    toast.success(`Reserva confirmada. ${listing.su * listing.nights} SU en escrow hasta check-in.`);
    setBookingId(null);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1200px]">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-display font-bold text-foreground">Pool de Swaps</h1>
        <p className="text-sm text-muted-foreground mt-1 hidden sm:block">
          Explorá las noches disponibles de otros hoteles en la red
        </p>
      </div>

      {/* Filter bar — TokenHotel style */}
      <div className="flex flex-nowrap sm:flex-wrap items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-hide pb-1 mb-4">
        {/* Search */}
        <div className="relative shrink-0 min-w-[160px] sm:min-w-[200px]">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar hotel o destino..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-7 pr-2 py-1.5 rounded-lg border border-border bg-card text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary/30 hover:border-primary/30 transition-colors"
          />
        </div>

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

        {/* Destination */}
        <div className="relative shrink-0">
          <select
            value={destination || ""}
            onChange={(e) => setDestination(e.target.value || null)}
            className="appearance-none rounded-lg border border-border bg-card px-3 py-1.5 pr-8 text-xs text-foreground cursor-pointer hover:border-primary/30 transition-colors focus:outline-none focus:ring-1 focus:ring-primary/30 whitespace-nowrap"
          >
            <option value="">Todos los destinos</option>
            {destinations.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <MapPin className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
        </div>

        {/* Category */}
        <div className="relative shrink-0">
          <select
            value={categoryFilter || ""}
            onChange={(e) => setCategoryFilter(e.target.value || null)}
            className="appearance-none rounded-lg border border-border bg-card px-3 py-1.5 pr-8 text-xs text-foreground cursor-pointer hover:border-primary/30 transition-colors focus:outline-none focus:ring-1 focus:ring-primary/30 whitespace-nowrap"
          >
            <option value="">Todas las categorías</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <Filter className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
        </div>

        {/* Clear */}
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="rounded-lg gap-1.5 text-xs text-muted-foreground hover:text-destructive shrink-0">
            <X className="h-3 w-3" /> Limpiar
          </Button>
        )}

        {/* Count */}
        <span className="ml-auto text-xs text-muted-foreground hidden sm:inline shrink-0">
          {sorted.length} {sorted.length === 1 ? "noche disponible" : "noches disponibles"}
        </span>
      </div>

      {/* Active filter tags */}
      {(destination || categoryFilter) && (
        <div className="mb-4 flex flex-wrap gap-1.5">
          {destination && (
            <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary">
              <MapPin className="h-2.5 w-2.5" /> {destination}
              <button onClick={() => setDestination(null)} className="ml-0.5 hover:text-destructive"><X className="h-2.5 w-2.5" /></button>
            </span>
          )}
          {categoryFilter && (
            <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-[10px] font-medium text-primary">
              {categoryFilter}
              <button onClick={() => setCategoryFilter(null)} className="ml-0.5 hover:text-destructive"><X className="h-2.5 w-2.5" /></button>
            </span>
          )}
        </div>
      )}

      {/* Grid — card style inspired by TokenHotel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-5">
        {sorted.map((listing, i) => (
          <motion.div
            key={listing.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            className="overflow-hidden rounded-xl sm:rounded-2xl border border-border bg-card hover:shadow-lg transition-all duration-300 group"
          >
            {/* Image */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={listing.photo}
                alt={listing.hotel}
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />

              {/* Category badge */}
              <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex items-center gap-1.5 rounded-lg bg-card/95 backdrop-blur-sm px-2 py-1 sm:px-2.5 sm:py-1.5 shadow-sm">
                <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-primary" />
                <span className="text-[10px] sm:text-[11px] font-semibold text-foreground">{listing.category}</span>
              </div>

              {/* SU badge */}
              <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 rounded-lg bg-primary px-2 py-1 sm:px-2.5 sm:py-1.5 text-[10px] sm:text-[11px] font-bold text-primary-foreground shadow-sm">
                {listing.su} SU/noche
              </div>

              {/* Title overlay */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3">
                <p className="flex items-center justify-center gap-1 text-[10px] sm:text-[11px] text-card/80">
                  <MapPin className="h-3 w-3 shrink-0" /> {listing.city}
                </p>
                <h3 className="mt-0.5 text-center text-sm sm:text-base font-bold text-card leading-tight line-clamp-1">
                  {listing.hotel}
                </h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-3 sm:p-4">
              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-1 sm:gap-2 text-center mb-3">
                <div className="rounded-lg bg-secondary p-1.5 sm:p-2.5 overflow-hidden">
                  <span className="text-xs sm:text-base font-bold text-foreground">{listing.stars}</span>
                  <p className="text-[8px] sm:text-[10px] text-muted-foreground">Estrellas</p>
                </div>
                <div className="rounded-lg bg-secondary p-1.5 sm:p-2.5 overflow-hidden">
                  <span className="text-xs sm:text-base font-bold text-foreground">{listing.nights}</span>
                  <p className="text-[8px] sm:text-[10px] text-muted-foreground">Noches</p>
                </div>
                <div className="rounded-lg bg-secondary p-1.5 sm:p-2.5 overflow-hidden">
                  <span className="text-xs sm:text-base font-bold text-foreground">{listing.su * listing.nights}</span>
                  <p className="text-[8px] sm:text-[10px] text-muted-foreground">SU Total</p>
                </div>
              </div>

              {/* Amenities */}
              <div className="flex flex-wrap justify-center gap-1 sm:gap-1.5 mb-3">
                {listing.amenities.map((a) => (
                  <span key={a} className="text-[9px] sm:text-[10px] bg-secondary text-muted-foreground px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-full">
                    {a}
                  </span>
                ))}
              </div>

              {/* Season tag */}
              <div className="flex items-center justify-center mb-3">
                <span className="text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-primary/10 text-primary">
                  T. {listing.season}
                </span>
              </div>

              {/* Book button */}
              <button
                onClick={() => handleBook(listing)}
                disabled={bookingId === listing.id}
                className="w-full py-2 sm:py-2.5 rounded-lg bg-primary text-primary-foreground text-xs sm:text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {bookingId === listing.id ? (
                  "Procesando escrow..."
                ) : (
                  <>
                    <ArrowLeftRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    Reservar con Swap Units
                  </>
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {sorted.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No se encontraron noches con esos filtros.</p>
          <Button variant="outline" size="sm" onClick={clearFilters} className="mt-3 rounded-lg text-xs">
            Limpiar filtros
          </Button>
        </div>
      )}
    </div>
  );
};

export default DashboardPool;
