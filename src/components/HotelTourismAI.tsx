import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, MapPin, Compass, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { streamChat } from "@/lib/chat-stream";

interface HotelTourismAIProps {
  hotelName: string;
  location: string;
  environment: string;
  country: string;
}

const HotelTourismAI = ({ hotelName, location, environment, country }: HotelTourismAIProps) => {
  const [tourismInfo, setTourismInfo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const loadTourismInfo = () => {
    if (isLoading || hasLoaded) return;
    setIsLoading(true);
    setTourismInfo("");

    const prompt = `Dame información turística completa y útil sobre la zona de ${location}, ${country}, donde se encuentra el hotel "${hotelName}" (entorno: ${environment}). Incluí:

1. 🏛️ **Atracciones principales** (las 5 más importantes con distancia aproximada al hotel)
2. 🍽️ **Gastronomía local** (platos típicos y restaurantes recomendados de la zona)
3. 🎭 **Actividades y experiencias** (qué hacer según la temporada)
4. 🚗 **Cómo llegar** (aeropuerto más cercano, rutas principales)
5. 🌤️ **Mejor época para visitar**
6. 💡 **Tip del experto** (un consejo insider para disfrutar al máximo)

Sé conciso pero útil. Formato con emojis y markdown.`;

    streamChat({
      messages: [{ role: "user", content: prompt }],
      context: { page: "/hotel-detail" },
      onDelta: (delta) => {
        setTourismInfo((prev) => prev + delta);
      },
      onDone: () => {
        setIsLoading(false);
        setHasLoaded(true);
      },
      onError: (error) => {
        setTourismInfo("No pudimos cargar la información turística. Intentá de nuevo más tarde.");
        setIsLoading(false);
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass-card p-5 sm:p-6"
    >
      <div className="flex items-center gap-2 mb-3">
        <Compass className="w-5 h-5 text-primary" />
        <h2 className="font-display font-semibold text-lg">Turismo en la zona</h2>
        <span className="ml-auto flex items-center gap-1 text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
          <Sparkles className="w-3 h-3" /> IA
        </span>
      </div>

      {!hasLoaded && !isLoading && (
        <div className="text-center py-6">
          <MapPin className="w-10 h-10 text-primary/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground mb-4">
            Descubrí todo lo que podés hacer en {location}
          </p>
          <button
            onClick={loadTourismInfo}
            className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-gold-light transition-all duration-300 gold-glow flex items-center gap-2 mx-auto"
          >
            <Sparkles className="w-4 h-4" />
            Explorar la zona con IA
          </button>
        </div>
      )}

      {isLoading && !tourismInfo && (
        <div className="flex items-center justify-center py-8 gap-2 text-sm text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          Analizando la zona...
        </div>
      )}

      {tourismInfo && (
        <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground">
          <ReactMarkdown>{tourismInfo}</ReactMarkdown>
        </div>
      )}
    </motion.div>
  );
};

export default HotelTourismAI;
