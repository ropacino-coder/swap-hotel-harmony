import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Star, Calendar, ArrowLeftRight } from "lucide-react";
import { toast } from "sonner";

const poolListings = [
  { id: 1, hotel: "Hotel Patagonia Lodge", city: "El Calafate", category: "Premier", stars: 4, su: 180, nights: 3, season: "Alta", photo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80", amenities: ["Spa", "Restaurant", "Lago"] },
  { id: 2, hotel: "Hotel Mendoza Suites", city: "Mendoza", category: "Superior", su: 120, stars: 4, nights: 5, season: "Media", photo: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&q=80", amenities: ["Viñedos", "Pool", "Gym"] },
  { id: 3, hotel: "Hotel Salta Colonial", city: "Salta", category: "Select", su: 70, stars: 3, nights: 2, season: "Baja", photo: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80", amenities: ["Centro", "Desayuno"] },
  { id: 4, hotel: "Hotel Bariloche Resort", city: "Bariloche", category: "Elite", su: 230, stars: 5, nights: 4, season: "Alta", photo: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&q=80", amenities: ["Ski", "Spa", "Lago", "Restaurant"] },
  { id: 5, hotel: "Hotel Buenos Aires Central", city: "CABA", category: "Superior", su: 120, stars: 4, nights: 7, season: "Media", photo: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&q=80", amenities: ["Business", "Rooftop", "Gym"] },
  { id: 6, hotel: "Hotel Iguazú Falls", city: "Puerto Iguazú", category: "Premier", su: 180, stars: 4, nights: 2, season: "Alta", photo: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&q=80", amenities: ["Selva", "Pool", "Cataratas"] },
];

const destinations = ["Todos", "El Calafate", "Mendoza", "Salta", "Bariloche", "CABA", "Puerto Iguazú"];
const categoriesFilter = ["Todas", "Select", "Superior", "Premier", "Elite"];

const DashboardPool = () => {
  const [search, setSearch] = useState("");
  const [destination, setDestination] = useState("Todos");
  const [categoryFilter, setCategoryFilter] = useState("Todas");
  const [bookingId, setBookingId] = useState<number | null>(null);

  const filtered = poolListings.filter((l) => {
    if (destination !== "Todos" && l.city !== destination) return false;
    if (categoryFilter !== "Todas" && l.category !== categoryFilter) return false;
    if (search && !l.hotel.toLowerCase().includes(search.toLowerCase()) && !l.city.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleBook = async (listing: typeof poolListings[0]) => {
    setBookingId(listing.id);
    // Mock escrow transaction
    await new Promise((r) => setTimeout(r, 2000));
    toast.success(`Reserva confirmada. ${listing.su * listing.nights} SU en escrow hasta check-in.`);
    setBookingId(null);
  };

  const selectClass =
    "px-3 py-2 rounded-lg bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50";

  return (
    <div className="p-6 lg:p-8 max-w-[1200px]">
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground">Pool de Swaps</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Explorá las noches disponibles de otros hoteles en la red
        </p>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-xl border border-border p-4 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar hotel o destino..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <select value={destination} onChange={(e) => setDestination(e.target.value)} className={selectClass}>
            {destinations.map((d) => (
              <option key={d} value={d}>{d === "Todos" ? "📍 Todos los destinos" : d}</option>
            ))}
          </select>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className={selectClass}>
            {categoriesFilter.map((c) => (
              <option key={c} value={c}>{c === "Todas" ? "⭐ Todas las categorías" : c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-muted-foreground mb-4">{filtered.length} noches disponibles</p>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((listing, i) => (
          <motion.div
            key={listing.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow group"
          >
            <div className="relative h-40 overflow-hidden">
              <img
                src={listing.photo}
                alt={listing.hotel}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold">
                {listing.category}
              </div>
              <div className="absolute top-3 right-3 bg-primary/90 text-primary-foreground px-2.5 py-1 rounded-full text-xs font-bold">
                {listing.su} SU/noche
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-sm text-foreground">{listing.hotel}</h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                    <MapPin className="w-3 h-3" />
                    {listing.city}
                    <span className="mx-1">·</span>
                    {Array.from({ length: listing.stars }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {listing.amenities.map((a) => (
                  <span key={a} className="text-[10px] bg-accent text-accent-foreground px-2 py-0.5 rounded-full">
                    {a}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {listing.nights} noches · {listing.season}
                </span>
                <span className="font-semibold text-foreground">
                  Total: {listing.su * listing.nights} SU
                </span>
              </div>

              <button
                onClick={() => handleBook(listing)}
                disabled={bookingId === listing.id}
                className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {bookingId === listing.id ? (
                  "Procesando escrow..."
                ) : (
                  <>
                    <ArrowLeftRight className="w-3.5 h-3.5" />
                    Reservar con Swap Units
                  </>
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <ArrowLeftRight className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No se encontraron noches con esos filtros</p>
        </div>
      )}
    </div>
  );
};

export default DashboardPool;
