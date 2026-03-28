import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star, MapPin, Users, Wifi, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { hotels, amenityIcons, categoryColors } from "@/data/hotels";

const HotelListingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [liked, setLiked] = useState<Set<number>>(new Set());

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {hotels.map((hotel, i) => (
            <motion.div
              key={hotel.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
            >
              <Link to={`/hotel/${hotel.id}`} className="block glass-card-hover overflow-hidden group">
                {/* Image */}
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

                {/* Info */}
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
        </div>

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
