import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

interface HotelMapSectionProps {
  name: string;
  location: string;
  lat: number;
  lng: number;
}

const HotelMapSection = ({ name, location, lat, lng }: HotelMapSectionProps) => {
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${lat},${lng}&zoom=14&maptype=roadmap`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45 }}
      className="glass-card p-5 sm:p-6"
    >
      <div className="flex items-center gap-2 mb-3">
        <MapPin className="w-5 h-5 text-primary" />
        <h2 className="font-display font-semibold text-lg">Ubicación</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-3">{location}</p>
      <div className="rounded-xl overflow-hidden border border-border">
        <iframe
          src={mapSrc}
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Mapa de ${name}`}
        />
      </div>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 mt-3 text-sm text-primary hover:underline"
      >
        <MapPin className="w-3.5 h-3.5" />
        Ver en Google Maps
      </a>
    </motion.div>
  );
};

export default HotelMapSection;
