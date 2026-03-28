import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star, MapPin, Users, Wifi, Car, UtensilsCrossed, Waves, Heart } from "lucide-react";

import hotel1 from "@/assets/hotel-1.jpg";
import hotel2 from "@/assets/hotel-2.jpg";
import hotel3 from "@/assets/hotel-3.jpg";
import hotel4 from "@/assets/hotel-4.jpg";
import hotel5 from "@/assets/hotel-5.jpg";
import hotelLuxury from "@/assets/hotel-luxury.jpg";

const hotels = [
  {
    image: hotel1,
    name: "Hotel Bahía Dorada",
    location: "Mar del Plata, Argentina",
    category: "Premier",
    stars: 4,
    rating: 4.8,
    reviews: 124,
    suPerNight: 170,
    environment: "Playa",
    amenities: ["Wi-Fi", "Piscina", "Desayuno", "Estacionamiento"],
    capacity: "2-6 pax",
    seasons: ["Media", "Baja"],
  },
  {
    image: hotel2,
    name: "Lodge Andino Cielos",
    location: "Bariloche, Argentina",
    category: "Elite",
    stars: 5,
    rating: 4.9,
    reviews: 87,
    suPerNight: 240,
    environment: "Montaña · Nieve",
    amenities: ["Wi-Fi", "Spa", "Restaurante", "Calefacción"],
    capacity: "2-4 pax",
    seasons: ["Media", "Baja"],
  },
  {
    image: hotel3,
    name: "Resort Punta del Este",
    location: "Punta del Este, Uruguay",
    category: "Elite",
    stars: 5,
    rating: 4.7,
    reviews: 203,
    suPerNight: 240,
    environment: "Playa",
    amenities: ["Wi-Fi", "Piscina", "Spa", "Restaurante"],
    capacity: "2-8 pax",
    seasons: ["Media", "Baja"],
  },
  {
    image: hotel4,
    name: "Posada Viñas del Sol",
    location: "Mendoza, Argentina",
    category: "Superior",
    stars: 3,
    rating: 4.6,
    reviews: 56,
    suPerNight: 120,
    environment: "Viñedo · Campo",
    amenities: ["Wi-Fi", "Desayuno", "Estacionamiento"],
    capacity: "2-4 pax",
    seasons: ["Media", "Baja"],
  },
  {
    image: hotel5,
    name: "Refugio Lago Escondido",
    location: "Ushuaia, Argentina",
    category: "Premier",
    stars: 4,
    rating: 4.9,
    reviews: 42,
    suPerNight: 170,
    environment: "Lago · Montaña",
    amenities: ["Wi-Fi", "Calefacción", "Restaurante", "Desayuno"],
    capacity: "2-6 pax",
    seasons: ["Media", "Baja"],
  },
  {
    image: hotelLuxury,
    name: "Hotel Costa Brava",
    location: "Viña del Mar, Chile",
    category: "Premier",
    stars: 4,
    rating: 4.5,
    reviews: 98,
    suPerNight: 170,
    environment: "Playa",
    amenities: ["Wi-Fi", "Piscina", "Desayuno", "Estacionamiento"],
    capacity: "2-8 pax",
    seasons: ["Media", "Baja"],
  },
];

const amenityIcons: Record<string, typeof Wifi> = {
  "Wi-Fi": Wifi,
  "Estacionamiento": Car,
  "Desayuno": UtensilsCrossed,
  "Restaurante": UtensilsCrossed,
  "Piscina": Waves,
  "Spa": Heart,
};

const categoryColors: Record<string, string> = {
  Select: "bg-muted text-muted-foreground",
  Superior: "bg-accent text-accent-foreground",
  Premier: "bg-primary/10 text-primary",
  Elite: "bg-primary text-primary-foreground",
};

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
    <section id="hotels" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">
            Explorá la red
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-3 mb-4 text-balance">
            Hoteles <span className="gold-text">disponibles</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-balance">
            Descubrí establecimientos verificados en Argentina, Uruguay, Chile y Paraguay.
          </p>
        </motion.div>

        {/* Hotel grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {hotels.map((hotel, i) => (
            <motion.div
              key={hotel.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              className="glass-card-hover overflow-hidden group"
            >
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
                {/* Overlay badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${categoryColors[hotel.category]}`}>
                    {hotel.category} {"★".repeat(hotel.stars)}
                  </span>
                </div>
                <button
                  onClick={() => toggleLike(i)}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      liked.has(i) ? "fill-destructive text-destructive" : "text-muted-foreground"
                    }`}
                  />
                </button>
                {/* Season tags */}
                <div className="absolute bottom-3 left-3 flex gap-1.5">
                  {hotel.seasons.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-card/80 backdrop-blur-sm text-foreground"
                    >
                      T. {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-display font-semibold text-lg leading-tight">
                      {hotel.name}
                    </h3>
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
                    <span className="text-xs text-muted-foreground">
                      ({hotel.reviews})
                    </span>
                  </div>
                </div>

                {/* Environment */}
                <p className="text-xs text-muted-foreground mb-3">
                  {hotel.environment}
                </p>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {hotel.amenities.slice(0, 4).map((a) => {
                    const Icon = amenityIcons[a] || Wifi;
                    return (
                      <span
                        key={a}
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full"
                      >
                        <Icon className="w-3 h-3" />
                        {a}
                      </span>
                    );
                  })}
                </div>

                {/* Footer: capacity + SU */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{hotel.capacity}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-display font-bold text-primary">
                      {hotel.suPerNight}
                    </span>
                    <span className="text-xs text-muted-foreground ml-1">
                      SU/noche
                    </span>
                  </div>
                </div>
              </div>
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
