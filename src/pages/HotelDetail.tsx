import { useParams, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star, MapPin, Users, Clock, ChevronLeft, ChevronRight, ArrowLeft,
  Calculator, Check, X,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HotelMapSection from "@/components/HotelMapSection";
import HotelTourismAI from "@/components/HotelTourismAI";
import { hotels, amenityIcons, categoryColors } from "@/data/hotels";

const occupancies = [
  { pax: 2, mult: 1.0 },
  { pax: 3, mult: 1.4 },
  { pax: 4, mult: 1.8 },
  { pax: 6, mult: 2.5 },
  { pax: 8, mult: 3.2 },
];

const HotelDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const hotel = hotels.find((h) => h.id === id);

  const [currentImage, setCurrentImage] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [roomIdx, setRoomIdx] = useState(0);
  const [occIdx, setOccIdx] = useState(0);
  const [nights, setNights] = useState(3);

  const result = useMemo(() => {
    if (!hotel) return 0;
    const room = hotel.roomTypes[roomIdx]?.mult ?? 1;
    const occ = occupancies[occIdx]?.mult ?? 1;
    return Math.round(hotel.suPerNight * room * occ * nights * 10) / 10;
  }, [hotel, roomIdx, occIdx, nights]);

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

      <div className="container mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-10">
        {/* Back */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </motion.button>

        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden mb-6 cursor-pointer group"
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
          {/* Nav arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImg(); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextImg(); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {hotel.gallery.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrentImage(i); }}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentImage ? "bg-primary-foreground w-5" : "bg-primary-foreground/50"
                }`}
              />
            ))}
          </div>
          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${categoryColors[hotel.category]}`}>
              {hotel.category} {"★".repeat(hotel.stars)}
            </span>
          </div>
          {/* Thumbnails on desktop */}
          <div className="absolute bottom-3 right-3 hidden sm:flex gap-2">
            {hotel.gallery.map((img, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrentImage(i); }}
                className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                  i === currentImage ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: info */}
          <div className="lg:col-span-2 space-y-5">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <h1 className="text-2xl sm:text-3xl font-display font-bold">{hotel.name}</h1>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Star className="w-5 h-5 fill-primary text-primary" />
                  <span className="font-bold text-lg">{hotel.rating}</span>
                  <span className="text-sm text-muted-foreground">({hotel.reviews})</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {hotel.location}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" /> {hotel.capacity}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> Check-in {hotel.checkIn} · Check-out {hotel.checkOut}
                </span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-5 sm:p-6"
            >
              <h2 className="font-display font-semibold text-lg mb-2">Sobre el hotel</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">{hotel.description}</p>
            </motion.div>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="glass-card p-5 sm:p-6"
            >
              <h2 className="font-display font-semibold text-lg mb-3">Lo destacado</h2>
              <div className="grid sm:grid-cols-2 gap-2">
                {hotel.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{h}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Amenities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-5 sm:p-6"
            >
              <h2 className="font-display font-semibold text-lg mb-3">Servicios</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {hotel.amenities.map((a) => {
                  const Icon = amenityIcons[a] || Check;
                  return (
                    <div key={a} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon className="w-4 h-4 text-primary" />
                      {a}
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Room types */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="glass-card p-5 sm:p-6"
            >
              <h2 className="font-display font-semibold text-lg mb-3">Habitaciones</h2>
              <div className="space-y-3">
                {hotel.roomTypes.map((r, i) => (
                  <div
                    key={r.name}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      roomIdx === i
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/30"
                    }`}
                    onClick={() => setRoomIdx(i)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-sm">{r.name}</span>
                        <p className="text-xs text-muted-foreground mt-0.5">{r.description}</p>
                      </div>
                      <span className="text-sm font-medium text-primary">
                        {Math.round(hotel.suPerNight * r.mult)} SU/noche
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Seasons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-5 sm:p-6"
            >
              <h2 className="font-display font-semibold text-lg mb-3">Temporadas disponibles</h2>
              <div className="flex gap-2">
                {hotel.seasons.map((s) => (
                  <span key={s} className="px-4 py-2 rounded-full bg-secondary text-sm font-medium text-foreground">
                    Temporada {s}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Map */}
            <HotelMapSection
              name={hotel.name}
              location={hotel.location}
              lat={hotel.lat}
              lng={hotel.lng}
            />

            {/* AI Tourism */}
            <HotelTourismAI
              hotelName={hotel.name}
              location={hotel.location}
              environment={hotel.environment}
              country={hotel.country}
            />
          </div>

          {/* Right: SU Calculator sticky */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-5 sm:p-6 lg:sticky lg:top-24"
            >
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="w-5 h-5 text-primary" />
                <h3 className="font-display font-semibold text-lg">Calculá tus SU</h3>
              </div>

              {/* Base price */}
              <div className="flex items-center justify-between mb-4 p-3 rounded-xl bg-primary/5 border border-primary/20">
                <span className="text-sm text-muted-foreground">Base por noche</span>
                <span className="font-bold text-primary text-lg">{hotel.suPerNight} SU</span>
              </div>

              <div className="space-y-4 mb-5">
                {/* Room type */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                    Habitación
                  </label>
                  <select
                    value={roomIdx}
                    onChange={(e) => setRoomIdx(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl bg-secondary border border-border text-foreground text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    {hotel.roomTypes.map((r, i) => (
                      <option key={r.name} value={i}>
                        {r.name} — {r.mult}x
                      </option>
                    ))}
                  </select>
                </div>

                {/* Occupancy */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                    Personas
                  </label>
                  <select
                    value={occIdx}
                    onChange={(e) => setOccIdx(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl bg-secondary border border-border text-foreground text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    {occupancies.map((o, i) => (
                      <option key={o.pax} value={i}>
                        {o.pax} personas — {o.mult}x
                      </option>
                    ))}
                  </select>
                </div>

                {/* Nights */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                    Noches
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setNights(Math.max(1, nights - 1))}
                      className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-lg font-bold hover:bg-primary/20 transition-colors"
                    >
                      −
                    </button>
                    <span className="flex-1 text-center text-xl font-display font-bold">{nights}</span>
                    <button
                      onClick={() => setNights(Math.min(30, nights + 1))}
                      className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-lg font-bold hover:bg-primary/20 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Result */}
              <div className="p-5 rounded-2xl border border-primary/30 bg-primary/5 text-center mb-4">
                <p className="text-xs text-muted-foreground mb-1">Swap Units necesarias</p>
                <motion.div
                  key={result}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, type: "spring" }}
                  className="text-3xl sm:text-4xl font-display font-bold gold-text"
                >
                  {result.toLocaleString("es-AR")}
                </motion.div>
                <p className="text-[10px] text-muted-foreground mt-1.5">
                  {hotel.suPerNight} × {hotel.roomTypes[roomIdx].mult}x × {occupancies[occIdx].mult}x × {nights} noches
                </p>
              </div>

              <a
                href="/register"
                className="block w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-center hover:bg-gold-light transition-all duration-300 gold-glow text-sm"
              >
                Solicitar intercambio
              </a>

              <p className="text-[10px] text-muted-foreground text-center mt-3">
                Valor estimativo. Se confirma post-verificación.
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
