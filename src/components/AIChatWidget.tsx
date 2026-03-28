import { useState, useRef, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle, X, Send, Sparkles, Bot, User, Loader2,
  MapPin, Calculator, HelpCircle, Hotel, TrendingUp, Calendar,
  Compass, Lightbulb
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { streamChat } from "@/lib/chat-stream";

type Msg = { role: "user" | "assistant"; content: string };

type QuickAction = {
  icon: React.ElementType;
  label: string;
  message: string;
  color: string;
};

const getPageSuggestions = (pathname: string): string[] => {
  switch (pathname) {
    case "/":
      return [
        "¿Cómo funciona Swap Hotels?",
        "Recomendame destinos para verano",
        "¿Cuántas SU necesito para 3 noches?",
        "¿Cómo registro mi hotel?",
      ];
    case "/hoteles":
      return [
        "¿Qué destinos recomendás en Argentina?",
        "Quiero un hotel de playa en Uruguay",
        "¿Cuáles son los hoteles mejor rankeados?",
        "Comparame hoteles 3★ vs 4★",
      ];
    case "/hotel/upload":
      return [
        "Ayudame a cargar mi hotel paso a paso",
        "¿Qué fotos conviene subir?",
        "¿Qué amenities debería destacar?",
        "¿Cuál es la mejor política de cancelación?",
      ];
    case "/register":
      return [
        "¿Qué documentos necesito para registrarme?",
        "¿Cuánto tarda la verificación?",
        "¿Puedo registrar más de un hotel?",
        "¿Qué beneficios tengo como fundador?",
      ];
    case "/membresias":
      return [
        "¿Qué plan me conviene?",
        "¿Cuánto ahorro con el plan anual?",
        "¿Qué incluye la membresía Diamond?",
        "¿Qué pasa si mi membresía vence?",
      ];
    default:
      return [
        "¿Cómo funciona el intercambio?",
        "Recomendame un destino",
        "Calculame las SU para un viaje",
        "¿Cuáles son los planes de membresía?",
      ];
  }
};

const QUICK_ACTIONS: QuickAction[] = [
  {
    icon: Compass,
    label: "Destinos",
    message: "Recomendame los mejores destinos para viajar este mes considerando temporada y disponibilidad",
    color: "text-blue-500 bg-blue-500/10",
  },
  {
    icon: Calculator,
    label: "Calcular SU",
    message: "Necesito calcular cuántas Swap Units necesito. Preguntame los detalles.",
    color: "text-emerald-500 bg-emerald-500/10",
  },
  {
    icon: TrendingUp,
    label: "Estrategia",
    message: "Dame consejos estratégicos para maximizar mis Swap Units y aprovechar mejor la plataforma",
    color: "text-amber-500 bg-amber-500/10",
  },
  {
    icon: Hotel,
    label: "Cargar Hotel",
    message: "Quiero cargar mi hotel en la plataforma, guiame paso a paso",
    color: "text-purple-500 bg-purple-500/10",
  },
  {
    icon: Calendar,
    label: "Temporadas",
    message: "¿Cuáles son las mejores temporadas para intercambiar en cada destino?",
    color: "text-rose-500 bg-rose-500/10",
  },
  {
    icon: Lightbulb,
    label: "Tips",
    message: "Dame tips para mejorar la visibilidad y el ranking de mi hotel en la plataforma",
    color: "text-orange-500 bg-orange-500/10",
  },
];

const AIChatWidget = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const [activeTab, setActiveTab] = useState<"chat" | "actions">("chat");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = getPageSuggestions(location.pathname);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) setShowPulse(false);
  }, [isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    setActiveTab("chat");
    const userMsg: Msg = { role: "user", content: text.trim() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";

    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
          );
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    await streamChat({
      messages: updatedMessages,
      context: { page: location.pathname },
      onDelta: upsertAssistant,
      onDone: () => setIsLoading(false),
      onError: (err) => {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: `⚠️ ${err}` },
        ]);
        setIsLoading(false);
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
          >
            <Sparkles className="w-6 h-6" />
            {showPulse && (
              <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-5 right-5 z-50 w-[380px] sm:w-[420px] max-h-[min(650px,85vh)] flex flex-col rounded-2xl border border-border bg-card overflow-hidden"
            style={{ boxShadow: "0 12px 48px hsla(220,25%,14%,0.18)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-sm">Concierge IA</h3>
                  <p className="text-[10px] opacity-80">Tu asistente inteligente 24/7</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Tab bar */}
            <div className="flex border-b border-border bg-card">
              <button
                onClick={() => setActiveTab("chat")}
                className={`flex-1 py-2 text-xs font-medium transition-colors ${
                  activeTab === "chat"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5 inline mr-1" />
                Chat
              </button>
              <button
                onClick={() => setActiveTab("actions")}
                className={`flex-1 py-2 text-xs font-medium transition-colors ${
                  activeTab === "actions"
                    ? "text-primary border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 inline mr-1" />
                Acciones IA
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto min-h-[200px] max-h-[420px]">
              {activeTab === "actions" ? (
                /* Quick Actions Grid */
                <div className="p-4 space-y-3">
                  <p className="text-xs text-muted-foreground text-center mb-2">
                    Seleccioná una acción para que la IA te ayude
                  </p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {QUICK_ACTIONS.map((action) => (
                      <motion.button
                        key={action.label}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => sendMessage(action.message)}
                        className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-accent/50 transition-all text-center group"
                      >
                        <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <action.icon className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-medium text-foreground">{action.label}</span>
                      </motion.button>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-border mt-3">
                    <p className="text-[10px] text-muted-foreground text-center">
                      💡 También podés escribir cualquier pregunta en el chat
                    </p>
                  </div>
                </div>
              ) : (
                /* Chat Messages */
                <div className="px-4 py-3 space-y-3">
                  {messages.length === 0 && (
                    <div className="text-center py-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                        <Sparkles className="w-6 h-6 text-primary" />
                      </div>
                      <p className="text-sm font-medium text-foreground mb-1">
                        ¡Hola! Soy tu Concierge IA 🏨
                      </p>
                      <p className="text-xs text-muted-foreground mb-4">
                        Te ayudo a navegar la plataforma, recomendarte destinos, calcular SU y más.
                      </p>
                      <div className="flex flex-wrap gap-1.5 justify-center">
                        {suggestions.map((s) => (
                          <button
                            key={s}
                            onClick={() => sendMessage(s)}
                            className="text-[11px] px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.role === "assistant" && (
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                          <Bot className="w-3 h-3 text-primary" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                          msg.role === "user"
                            ? "bg-primary text-primary-foreground rounded-br-sm"
                            : "bg-secondary text-foreground rounded-bl-sm"
                        }`}
                      >
                        {msg.role === "assistant" ? (
                          <div className="prose prose-sm max-w-none [&_p]:m-0 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0 [&_strong]:text-foreground [&_h1]:text-base [&_h2]:text-sm [&_h3]:text-sm">
                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                          </div>
                        ) : (
                          msg.content
                        )}
                      </div>
                      {msg.role === "user" && (
                        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-1">
                          <User className="w-3 h-3 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  ))}

                  {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
                    <div className="flex gap-2 items-start">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-3 h-3 text-primary" />
                      </div>
                      <div className="bg-secondary rounded-2xl rounded-bl-sm px-4 py-3">
                        <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="px-3 py-2.5 border-t border-border flex gap-2 items-center bg-card"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Preguntá lo que necesites..."
                disabled={isLoading}
                className="flex-1 px-3 py-2 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatWidget;
