import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { Star, MapPin, Users, Wifi, Heart, Filter, X } from "lucide-react";
import { Link } from "react-router-dom";
import { hotels, amenityIcons, categoryColors } from "@/data/hotels";

const countries = [...new Set(hotels.map((h) => h.country))];
const categories = [...new Set(hotels.map((h) => h.category))];
const environments = [...new Set(hotels.flatMap((h) => h.environment.split(" · ")))];

type ChipProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

const Chip = ({ label, active, onClick }: ChipProps) => (
  <button
    onClick={onClick}
    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
      active
        ? "bg-primary text-primary-foreground shadow-sm"
        : "bg-secondary text-muted-foreground hover:text-foreground hover:border-primary/30 border border-transparent"
    }`}
  >
    {label}
  </button>
);

const HotelListingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [countryFilter, setCountryFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [envFilter, setEnvFilter] = useState<string | null>(null);

  const hasFilters = countryFilter || categoryFilter || envFilter;

  const filtered = useMemo(() => {
    return hotels.filter((h) => {
      if (countryFilter && h.country !== countryFilter) return false;
      if (categoryFilter && h.category !== categoryFilter) return false;
      if (envFilter && !h.environment.includes(envFilter)) return false;
      return true;
    });
  }, [countryFilter, categoryFilter, envFilter]);

  const clearFilters = () => {
    setCountryFilter(null);
    setCategoryFilter(null);
    setEnvFilter(null);
  };

  const toggleLike = (i: number) => {
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  return (
    <section id="hotels" className="py-12 relative" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-6"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">
            Explorá la red
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold mt-3 mb-4 text-balance">
            Hoteles <span className="gold-text">disponibles</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-balance">
            Descubrí establecimientos verificados en Argentina, Uruguay, Chile y Paraguay.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-6xl mx-auto mb-6"
        >
          <div className="glass-card p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">Filtrar hoteles</span>
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="ml-auto flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  <X className="w-3 h-3" />
                  Limpiar
                </button>
              )}
            </div>

            <div className="space-y-3">
              {/* Country */}
              <div>
                <p className="text-[11px] font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">País</p>
                <div className="flex flex-wrap gap-1.5">
                  {countries.map((c) => (
                    <Chip
                      key={c}
                      label={c}
                      active={countryFilter === c}
                      onClick={() => setCountryFilter(countryFilter === c ? null : c)}
                    />
                  ))}
                </div>
              </div>

              {/* Category */}
              <div>
                <p className="text-[11px] font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Categoría</p>
                <div className="flex flex-wrap gap-1.5">
                  {categories.map((c) => (
                    <Chip
                      key={c}
                      label={c}
                      active={categoryFilter === c}
                      onClick={() => setCategoryFilter(categoryFilter === c ? null : c)}
                    />
                  ))}
                </div>
              </div>

              {/* Environment */}
              <div>
                <p className="text-[11px] font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Entorno</p>
                <div className="flex flex-wrap gap-1.5">
                  {environments.map((e) => (
                    <Chip
                      key={e}
                      label={e}
                      active={envFilter === e}
                      onClick={() => setEnvFilter(envFilter === e ? null : e)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results count */}
        {hasFilters && (
          <p className="text-sm text-muted-foreground max-w-6xl mx-auto mb-4">
            {filtered.length} {filtered.length === 1 ? "hotel encontrado" : "hoteles encontrados"}
          </p>
        )}

        {/* Hotel grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filtered.map((hotel, i) => (
              <motion.div
                key={hotel.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Link to={`/hotel/${hotel.id}`} className="block glass-card-hover overflow-hidden group">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      loading="lazy"
                      width={800}
                      height={600}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${categoryColors[hotel.category]}`}>
                        {hotel.category} {"★".repeat(hotel.stars)}
                      </span>
                    </div>
                    <button
                      onClick={(e) => { e.preventDefault(); toggleLike(i); }}
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          liked.has(i) ? "fill-destructive text-destructive" : "text-muted-foreground"
                        }`}
                      />
                    </button>
                    <div className="absolute bottom-3 left-3 flex gap-1.5">
                      {hotel.seasons.map((s) => (
                        <span key={s} className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-card/80 backdrop-blur-sm text-foreground">
                          T. {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-display font-semibold text-lg leading-tight">{hotel.name}</h3>
                        <div className="flex items-center gap-1 mt-1 text-muted-foreground">
                          <MapPin className="w-3.5 h-3.5" />
                          <span className="text-sm">{hotel.location}</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-primary text-primary" />
                          <span className="font-semibold text-sm">{hotel.rating}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">({hotel.reviews})</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{hotel.environment}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {hotel.amenities.slice(0, 4).map((a) => {
                        const Icon = amenityIcons[a] || Wifi;
                        return (
                          <span key={a} className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                            <Icon className="w-3 h-3" />
                            {a}
                          </span>
                        );
                      })}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{hotel.capacity}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-display font-bold text-primary">{hotel.suPerNight}</span>
                        <span className="text-xs text-muted-foreground ml-1">SU/noche</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-10 max-w-6xl mx-auto"
          >
            <p className="text-muted-foreground mb-2">No se encontraron hoteles con esos filtros.</p>
            <button onClick={clearFilters} className="text-primary text-sm font-medium hover:underline">
              Limpiar filtros
            </button>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-10"
        >
          <a
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Ver todos los hoteles
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HotelListingSection;
