import { Wifi, Car, UtensilsCrossed, Waves, Heart, Flame, Dumbbell, Mountain, Coffee, ShieldCheck, Snowflake } from "lucide-react";

import hotel1 from "@/assets/hotel-1.jpg";
import hotel2 from "@/assets/hotel-2.jpg";
import hotel3 from "@/assets/hotel-3.jpg";
import hotel4 from "@/assets/hotel-4.jpg";
import hotel5 from "@/assets/hotel-5.jpg";
import hotelLuxury from "@/assets/hotel-luxury.jpg";

export interface Hotel {
  id: string;
  image: string;
  gallery: string[];
  name: string;
  location: string;
  country: string;
  category: string;
  stars: number;
  rating: number;
  reviews: number;
  suPerNight: number;
  environment: string;
  amenities: string[];
  capacity: string;
  seasons: string[];
  description: string;
  highlights: string[];
  checkIn: string;
  checkOut: string;
  roomTypes: { name: string; mult: number; description: string }[];
}

export const amenityIcons: Record<string, typeof Wifi> = {
  "Wi-Fi": Wifi,
  "Estacionamiento": Car,
  "Desayuno": Coffee,
  "Restaurante": UtensilsCrossed,
  "Piscina": Waves,
  "Spa": Heart,
  "Calefacción": Flame,
  "Gimnasio": Dumbbell,
  "Vista montaña": Mountain,
  "Seguridad 24hs": ShieldCheck,
  "Aire acondicionado": Snowflake,
};

export const categoryColors: Record<string, string> = {
  Select: "bg-muted text-muted-foreground",
  Superior: "bg-accent text-accent-foreground",
  Premier: "bg-primary/10 text-primary",
  Elite: "bg-primary text-primary-foreground",
};

export const hotels: Hotel[] = [
  {
    id: "hotel-bahia-dorada",
    image: hotel1,
    gallery: [hotel1, hotel2, hotelLuxury],
    name: "Hotel Bahía Dorada",
    location: "Mar del Plata, Argentina",
    country: "Argentina",
    category: "Premier",
    stars: 4,
    rating: 4.8,
    reviews: 124,
    suPerNight: 170,
    environment: "Playa",
    amenities: ["Wi-Fi", "Piscina", "Desayuno", "Estacionamiento", "Aire acondicionado", "Seguridad 24hs"],
    capacity: "2-6 pax",
    seasons: ["Media", "Baja"],
    description: "Ubicado frente a las mejores playas de Mar del Plata, Hotel Bahía Dorada combina la elegancia costera con el confort moderno. Sus amplias habitaciones con vista al mar y su gastronomía de primer nivel lo convierten en el destino ideal para familias y parejas.",
    highlights: ["Vista directa al mar", "A 200m de la playa principal", "Gastronomía gourmet", "Pileta climatizada"],
    checkIn: "14:00",
    checkOut: "10:00",
    roomTypes: [
      { name: "Estándar", mult: 1.0, description: "Habitación cómoda con cama doble" },
      { name: "Superior", mult: 1.2, description: "Mayor espacio con vista parcial al mar" },
      { name: "Suite", mult: 1.6, description: "Suite premium con balcón y vista panorámica" },
    ],
  },
  {
    id: "lodge-andino-cielos",
    image: hotel2,
    gallery: [hotel2, hotel5, hotel3],
    name: "Lodge Andino Cielos",
    location: "Bariloche, Argentina",
    country: "Argentina",
    category: "Elite",
    stars: 5,
    rating: 4.9,
    reviews: 87,
    suPerNight: 240,
    environment: "Montaña · Nieve",
    amenities: ["Wi-Fi", "Spa", "Restaurante", "Calefacción", "Gimnasio", "Vista montaña"],
    capacity: "2-4 pax",
    seasons: ["Media", "Baja"],
    description: "En el corazón de la Patagonia, Lodge Andino Cielos ofrece una experiencia exclusiva rodeada de bosques milenarios y lagos cristalinos. Su spa de montaña y restaurante con cocina de autor completan una estadía inolvidable.",
    highlights: ["Spa de montaña", "Cocina de autor patagónica", "Excursiones guiadas", "Ski-in / Ski-out en temporada"],
    checkIn: "15:00",
    checkOut: "11:00",
    roomTypes: [
      { name: "Estándar", mult: 1.0, description: "Cabaña acogedora con chimenea" },
      { name: "Deluxe", mult: 1.4, description: "Cabaña premium con jacuzzi privado" },
      { name: "Suite", mult: 1.6, description: "Suite con vista panorámica al lago" },
    ],
  },
  {
    id: "resort-punta-del-este",
    image: hotel3,
    gallery: [hotel3, hotelLuxury, hotel1],
    name: "Resort Punta del Este",
    location: "Punta del Este, Uruguay",
    country: "Uruguay",
    category: "Elite",
    stars: 5,
    rating: 4.7,
    reviews: 203,
    suPerNight: 240,
    environment: "Playa",
    amenities: ["Wi-Fi", "Piscina", "Spa", "Restaurante", "Gimnasio", "Seguridad 24hs"],
    capacity: "2-8 pax",
    seasons: ["Media", "Baja"],
    description: "El resort más exclusivo de Punta del Este, donde el lujo se encuentra con la naturaleza. Piscinas infinitas con vista al océano, spa de clase mundial y suites que redefinen el confort.",
    highlights: ["Piscina infinita", "Beach club privado", "Spa con tratamientos premium", "Concierge personalizado"],
    checkIn: "15:00",
    checkOut: "11:00",
    roomTypes: [
      { name: "Estándar", mult: 1.0, description: "Habitación con terraza" },
      { name: "Superior", mult: 1.2, description: "Vista al mar con amenities premium" },
      { name: "Deluxe", mult: 1.4, description: "Suite junior con living" },
      { name: "Suite", mult: 1.6, description: "Penthouse con terraza privada" },
    ],
  },
  {
    id: "posada-vinas-del-sol",
    image: hotel4,
    gallery: [hotel4, hotel1, hotel5],
    name: "Posada Viñas del Sol",
    location: "Mendoza, Argentina",
    country: "Argentina",
    category: "Superior",
    stars: 3,
    rating: 4.6,
    reviews: 56,
    suPerNight: 120,
    environment: "Viñedo · Campo",
    amenities: ["Wi-Fi", "Desayuno", "Estacionamiento", "Restaurante"],
    capacity: "2-4 pax",
    seasons: ["Media", "Baja"],
    description: "Rodeada de viñedos centenarios con la Cordillera de los Andes como telón de fondo. Posada Viñas del Sol ofrece degustaciones exclusivas, paseos entre viñas y la mejor gastronomía regional.",
    highlights: ["Degustación de vinos incluida", "Cabalgatas por viñedos", "Cocina regional de autor", "Atardeceres únicos"],
    checkIn: "14:00",
    checkOut: "10:00",
    roomTypes: [
      { name: "Estándar", mult: 1.0, description: "Habitación con vista al viñedo" },
      { name: "Superior", mult: 1.2, description: "Habitación con terraza privada" },
    ],
  },
  {
    id: "refugio-lago-escondido",
    image: hotel5,
    gallery: [hotel5, hotel2, hotel4],
    name: "Refugio Lago Escondido",
    location: "Ushuaia, Argentina",
    country: "Argentina",
    category: "Premier",
    stars: 4,
    rating: 4.9,
    reviews: 42,
    suPerNight: 170,
    environment: "Lago · Montaña",
    amenities: ["Wi-Fi", "Calefacción", "Restaurante", "Desayuno", "Vista montaña"],
    capacity: "2-6 pax",
    seasons: ["Media", "Baja"],
    description: "En el fin del mundo, un refugio de ensueño a orillas de un lago escondido. Naturaleza pura, silencio absoluto y la hospitalidad más cálida del sur argentino.",
    highlights: ["A orillas del lago", "Trekking guiado", "Navegación por el canal Beagle", "Aurora austral (temporada)"],
    checkIn: "14:00",
    checkOut: "10:00",
    roomTypes: [
      { name: "Estándar", mult: 1.0, description: "Cabaña con vista al lago" },
      { name: "Superior", mult: 1.2, description: "Cabaña con deck privado" },
      { name: "Suite", mult: 1.6, description: "Suite panorámica con jacuzzi" },
    ],
  },
  {
    id: "hotel-costa-brava",
    image: hotelLuxury,
    gallery: [hotelLuxury, hotel3, hotel1],
    name: "Hotel Costa Brava",
    location: "Viña del Mar, Chile",
    country: "Chile",
    category: "Premier",
    stars: 4,
    rating: 4.5,
    reviews: 98,
    suPerNight: 170,
    environment: "Playa",
    amenities: ["Wi-Fi", "Piscina", "Desayuno", "Estacionamiento", "Aire acondicionado"],
    capacity: "2-8 pax",
    seasons: ["Media", "Baja"],
    description: "Sobre la costa del Pacífico, Hotel Costa Brava ofrece la mejor combinación de playa, cultura y gastronomía chilena. A minutos del centro de Viña del Mar y sus atracciones principales.",
    highlights: ["Frente al Pacífico", "Casino a 5 min", "Excursiones a Valparaíso", "Cocina chilena de autor"],
    checkIn: "14:00",
    checkOut: "10:00",
    roomTypes: [
      { name: "Estándar", mult: 1.0, description: "Habitación con vista ciudad" },
      { name: "Superior", mult: 1.2, description: "Vista al mar con balcón" },
      { name: "Deluxe", mult: 1.4, description: "Suite con terraza oceánica" },
    ],
  },
];
