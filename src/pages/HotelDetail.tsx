import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star, MapPin, Users, Clock, ChevronLeft, ChevronRight, ArrowLeft,
  Check, X, Share2, Heart,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HotelMapSection from "@/components/HotelMapSection";
import HotelTourismAI from "@/components/HotelTourismAI";
import { hotels, amenityIcons, categoryColors } from "@/data/hotels";

const HotelDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const hotel = hotels.find((h) => h.id === id);

  const [currentImage, setCurrentImage] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!hotel) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 sm:px-6 pt-24 pb-20 text-center">
          <h1 className="text-2xl font-display font-bold mb-4">Hotel no encontrado</h1>
          <button onClick={() => navigate("/")} className="text-primary hover:underline">
            Volver al inicio
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const nextImg = () => setCurrentImage((p) => (p + 1) % hotel.gallery.length);
  const prevImg = () => setCurrentImage((p) => (p - 1 + hotel.gallery.length) % hotel.gallery.length);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-10">
        {/* Title row — Airbnb style */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <h1 className="text-xl sm:text-2xl font-display font-bold mb-1">{hotel.name}</h1>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1 font-medium text-foreground">
                <Star className="w-4 h-4 fill-primary text-primary" />
                {hotel.rating}
              </span>
              <span className="text-muted-foreground">·</span>
              <span className="underline cursor-pointer">{hotel.reviews} reseñas</span>
              <span className="text-muted-foreground">·</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${categoryColors[hotel.category]}`}>
                {hotel.category} {"★".repeat(hotel.stars)}
              </span>
              <span className="text-muted-foreground">·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {hotel.location}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors">
                <Share2 className="w-4 h-4" /> Compartir
              </button>
              <button
                onClick={() => setSaved(!saved)}
                className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                <Heart className={`w-4 h-4 ${saved ? "fill-primary text-primary" : ""}`} /> Guardar
              </button>
            </div>
          </div>
        </motion.div>

        {/* Gallery — Airbnb grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative rounded-2xl overflow-hidden mb-8 cursor-pointer group"
          onClick={() => setLightbox(true)}
        >
          <div className="aspect-[16/7] sm:aspect-[16/6]">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImage}
                src={hotel.gallery[currentImage]}
                alt={`${hotel.name} - foto ${currentImage + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); prevImg(); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextImg(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {hotel.gallery.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrentImage(i); }}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentImage ? "bg-background w-5" : "bg-background/50"
                }`}
              />
            ))}
          </div>
          <div className="absolute bottom-3 right-3 hidden sm:flex gap-2">
            {hotel.gallery.map((img, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrentImage(i); }}
                className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all ${
                  i === currentImage ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: info — 2/3 */}
          <div className="lg:col-span-2 space-y-6">
            {/* Host-style header */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="pb-6 border-b border-border"
            >
              <h2 className="text-lg sm:text-xl font-display font-semibold mb-1">
                {hotel.environment} en {hotel.location.split(",")[0]}
              </h2>
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span>{hotel.capacity}</span>
                <span>·</span>
                <span>Check-in {hotel.checkIn}</span>
                <span>·</span>
                <span>Check-out {hotel.checkOut}</span>
              </div>
            </motion.div>

            {/* Highlights — Airbnb style with icons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="pb-6 border-b border-border space-y-4"
            >
              {hotel.highlights.slice(0, 3).map((h) => (
                <div key={h} className="flex items-start gap-4">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{h}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="pb-6 border-b border-border"
            >
              <p className="text-sm text-muted-foreground leading-relaxed">{hotel.description}</p>
            </motion.div>

            {/* Amenities — Airbnb grid */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="pb-6 border-b border-border"
            >
              <h2 className="text-lg font-display font-semibold mb-4">Lo que este lugar ofrece</h2>
              <div className="grid grid-cols-2 gap-3">
                {hotel.amenities.map((a) => {
                  const Icon = amenityIcons[a] || Check;
                  return (
                    <div key={a} className="flex items-center gap-3 py-2">
                      <Icon className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm text-foreground">{a}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Room types */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="pb-6 border-b border-border"
            >
              <h2 className="text-lg font-display font-semibold mb-4">Tipos de habitación</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {hotel.roomTypes.map((r) => (
                  <div
                    key={r.name}
                    className="p-4 rounded-xl border border-border hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{r.name}</span>
                      <span className="text-sm font-semibold text-primary">
                        {Math.round(hotel.suPerNight * r.mult)} SU
                        <span className="font-normal text-muted-foreground text-xs"> /noche</span>
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{r.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Seasons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="pb-6 border-b border-border"
            >
              <h2 className="text-lg font-display font-semibold mb-3">Temporadas disponibles</h2>
              <div className="flex gap-2">
                {hotel.seasons.map((s) => (
                  <span key={s} className="px-4 py-2 rounded-full bg-secondary text-sm font-medium text-foreground">
                    Temporada {s}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Map */}
            <div className="pb-6 border-b border-border">
              <h2 className="text-lg font-display font-semibold mb-4">Dónde vas a estar</h2>
              <HotelMapSection
                name={hotel.name}
                location={hotel.location}
                lat={hotel.lat}
                lng={hotel.lng}
              />
            </div>

            {/* AI Tourism */}
            <HotelTourismAI
              hotelName={hotel.name}
              location={hotel.location}
              environment={hotel.environment}
              country={hotel.country}
            />
          </div>

          {/* Right: Booking card — Airbnb style sticky */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-xl border border-border shadow-lg p-6 lg:sticky lg:top-24 bg-card"
            >
              {/* Price */}
              <div className="flex items-baseline gap-1 mb-5">
                <span className="text-2xl font-display font-bold gold-text">{hotel.suPerNight} SU</span>
                <span className="text-sm text-muted-foreground">/ noche</span>
              </div>

              {/* Rating row */}
              <div className="flex items-center gap-1 mb-5">
                <Star className="w-4 h-4 fill-primary text-primary" />
                <span className="text-sm font-semibold">{hotel.rating}</span>
                <span className="text-sm text-muted-foreground">· {hotel.reviews} reseñas</span>
              </div>

              {/* Info rows */}
              <div className="border border-border rounded-xl overflow-hidden mb-4">
                <div className="grid grid-cols-2 divide-x divide-border">
                  <div className="p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Check-in</p>
                    <p className="text-sm font-medium mt-0.5">{hotel.checkIn}</p>
                  </div>
                  <div className="p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Check-out</p>
                    <p className="text-sm font-medium mt-0.5">{hotel.checkOut}</p>
                  </div>
                </div>
                <div className="border-t border-border p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Capacidad</p>
                  <p className="text-sm font-medium mt-0.5">{hotel.capacity}</p>
                </div>
              </div>

              {/* Room types quick view */}
              <div className="space-y-2 mb-5">
                {hotel.roomTypes.map((r) => (
                  <div key={r.name} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{r.name}</span>
                    <span className="font-medium">{Math.round(hotel.suPerNight * r.mult)} SU/noche</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a
                href="/register"
                className="block w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-center text-sm hover:opacity-90 transition-opacity gold-glow"
              >
                Solicitar intercambio
              </a>

              <p className="text-xs text-muted-foreground text-center mt-3">
                No se cobra dinero. Usás tus Swap Units.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-foreground/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightbox(false)}
          >
            <button
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card/20 flex items-center justify-center text-primary-foreground hover:bg-card/40 transition-colors"
              onClick={() => setLightbox(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prevImg(); }}
              className="absolute left-4 w-10 h-10 rounded-full bg-card/20 flex items-center justify-center text-primary-foreground hover:bg-card/40 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <motion.img
              key={currentImage}
              src={hotel.gallery[currentImage]}
              alt={hotel.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-full max-h-[85vh] rounded-xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={(e) => { e.stopPropagation(); nextImg(); }}
              className="absolute right-4 w-10 h-10 rounded-full bg-card/20 flex items-center justify-center text-primary-foreground hover:bg-card/40 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default HotelDetail;
