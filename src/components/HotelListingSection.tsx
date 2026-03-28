import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Star, MapPin, Users, Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { hotels, categoryColors } from "@/data/hotels";

const VISIBLE = 4;
const INTERVAL = 5000;

const HotelListingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [startIdx, setStartIdx] = useState(0);
  const [liked, setLiked] = useState<Set<string>>(new Set());

  // Auto-rotate
  useEffect(() => {
    const timer = setInterval(() => {
      setStartIdx((prev) => (prev + 1) % hotels.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  // Get 4 hotels with wrap-around
  const visibleHotels = Array.from({ length: VISIBLE }, (_, i) => {
    const idx = (startIdx + i) % hotels.length;
    return { ...hotels[idx], _idx: idx };
  });

  const toggleLike = (id: string) => {
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
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
          className="text-center mb-8"
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

        {/* Rotating hotel cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          <AnimatePresence mode="popLayout">
            {visibleHotels.map((hotel) => (
              <motion.div
                key={hotel.id + "-" + hotel._idx}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
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
                    <div className="absolute top-3 left-3">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${categoryColors[hotel.category]}`}>
                        {hotel.category} {"★".repeat(hotel.stars)}
                      </span>
                    </div>
                    <button
                      onClick={(e) => { e.preventDefault(); toggleLike(hotel.id); }}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
                    >
                      <Heart className={`w-3.5 h-3.5 transition-colors ${liked.has(hotel.id) ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-semibold text-sm leading-tight mb-1">{hotel.name}</h3>
                    <div className="flex items-center gap-1 text-muted-foreground mb-2">
                      <MapPin className="w-3 h-3" />
                      <span className="text-xs">{hotel.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                        <span className="text-xs font-semibold">{hotel.rating}</span>
                      </div>
                      <div>
                        <span className="text-lg font-display font-bold text-primary">{hotel.suPerNight}</span>
                        <span className="text-[10px] text-muted-foreground ml-1">SU/noche</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-1.5 mt-6">
          {hotels.map((_, i) => (
            <button
              key={i}
              onClick={() => setStartIdx(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i >= startIdx && i < startIdx + VISIBLE
                  ? "bg-primary w-4"
                  : "bg-border hover:bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-8"
        >
          <Link
            to="/hoteles"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Ver todos los hoteles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HotelListingSection;
