import { motion } from "framer-motion";
import { MapPin, Star, Users, Heart, Wifi } from "lucide-react";
import { Link } from "react-router-dom";
import { Hotel, amenityIcons, categoryColors } from "@/data/hotels";
import { useState } from "react";

export const HotelCard = ({ hotel, index }: { hotel: Hotel; index: number }) => {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
    >
      <Link to={`/hotel/${hotel.id}`} className="group block">
        <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-border bg-card hover:shadow-lg transition-all duration-300">
          {/* Image */}
          <div className="relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden">
            <img
              src={hotel.image}
              alt={hotel.name}
              loading="lazy"
              width={800}
              height={600}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />

            {/* Category badge */}
            <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3">
              <span className={`text-[10px] sm:text-xs font-bold px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg backdrop-blur-sm ${categoryColors[hotel.category]}`}>
                {hotel.category} {"★".repeat(hotel.stars)}
              </span>
            </div>

            {/* Like button */}
            <button
              onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
              className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
            >
              <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors ${liked ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
            </button>

            {/* Title overlay */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3">
              <p className="flex items-center justify-center gap-1 text-[10px] sm:text-[11px] text-card/80">
                <MapPin className="h-3 w-3 shrink-0" /> {hotel.location}
              </p>
              <h3 className="mt-0.5 text-center text-sm sm:text-lg font-bold text-card leading-tight line-clamp-1">
                {hotel.name}
              </h3>
            </div>
          </div>

          {/* Content */}
          <div className="p-3 sm:p-4 text-center">
            {/* Environment tag */}
            <div className="rounded-lg bg-primary/5 px-2.5 py-1.5 sm:px-3 sm:py-2 mb-2.5 sm:mb-3">
              <p className="text-[10px] sm:text-[11px] text-primary flex items-center justify-center gap-1.5 leading-snug">
                {hotel.environment}
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-1 sm:gap-2 text-center">
              <div className="rounded-lg bg-secondary p-1.5 sm:p-2.5 overflow-hidden">
                <span className="text-xs sm:text-base font-bold text-foreground">{hotel.suPerNight}</span>
                <p className="text-[8px] sm:text-[10px] text-muted-foreground">SU/noche</p>
              </div>
              <div className="rounded-lg bg-secondary p-1.5 sm:p-2.5 overflow-hidden">
                <div className="flex items-center justify-center gap-0.5">
                  <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-primary text-primary" />
                  <span className="text-xs sm:text-base font-bold text-foreground">{hotel.rating}</span>
                </div>
                <p className="text-[8px] sm:text-[10px] text-muted-foreground">({hotel.reviews})</p>
              </div>
              <div className="rounded-lg bg-secondary p-1.5 sm:p-2.5 overflow-hidden">
                <span className="text-xs sm:text-base font-bold text-foreground flex items-center justify-center gap-0.5">
                  <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </span>
                <p className="text-[8px] sm:text-[10px] text-muted-foreground">{hotel.capacity}</p>
              </div>
            </div>

            {/* Amenities */}
            <div className="mt-2.5 sm:mt-3 flex flex-wrap justify-center gap-1 sm:gap-1.5">
              {hotel.amenities.slice(0, 4).map((a) => {
                const Icon = amenityIcons[a] || Wifi;
                return (
                  <span key={a} className="inline-flex items-center gap-1 text-[9px] sm:text-xs text-muted-foreground bg-secondary px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full">
                    <Icon className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> <span className="hidden sm:inline">{a}</span>
                  </span>
                );
              })}
            </div>

            {/* Seasons */}
            <div className="mt-2.5 sm:mt-3 flex items-center justify-center gap-1.5">
              {hotel.seasons.map((s) => (
                <span key={s} className="text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-primary/10 text-primary">
                  T. {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
