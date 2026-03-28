import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Building2,
  MapPin,
  BedDouble,
  Camera,
  FileText,
  ChevronLeft,
  ChevronRight,
  Save,
  Plus,
  X,
  Star,
  Clock,
  Phone,
  Mail,
  Globe,
  Users,
  Trees,
  ShieldCheck,
  Loader2,
} from "lucide-react";

/* ─── Constants ─── */
const COUNTRIES = ["Argentina", "Uruguay", "Chile", "Paraguay"];
const CATEGORIES = [
  { value: "Select", label: "Select (2★)", stars: 2 },
  { value: "Superior", label: "Superior (3★)", stars: 3 },
  { value: "Premier", label: "Premier (4★)", stars: 4 },
  { value: "Elite", label: "Elite (5★)", stars: 5 },
];
const ENVIRONMENTS = ["Playa", "Montaña", "Ciudad", "Campo", "Lago", "Nieve", "Viñedo", "Selva", "Termas"];
const ALL_AMENITIES = [
  "Wi-Fi", "Estacionamiento", "Desayuno", "Restaurante", "Piscina",
  "Spa", "Calefacción", "Gimnasio", "Vista montaña", "Seguridad 24hs",
  "Aire acondicionado", "Room Service", "Lavandería", "Bar", "Salón de eventos",
  "Transfer aeropuerto", "Business center", "Accesibilidad",
];
const ROOM_TYPE_OPTIONS = ["Estándar", "Superior", "Deluxe", "Suite", "Cabaña", "Bungalow"];
const ROOM_MULTIPLIERS: Record<string, number> = {
  "Estándar": 1.0, "Superior": 1.2, "Deluxe": 1.4, "Suite": 1.6, "Cabaña": 1.0, "Bungalow": 1.2,
};
const SEASONS = ["Alta", "Media", "Baja"];
const SU_BASE: Record<string, number> = { Select: 80, Superior: 120, Premier: 170, Elite: 240 };

/* ─── Types ─── */
interface RoomType {
  name: string;
  mult: number;
  description: string;
  quantity: number;
}

interface HotelFormData {
  // Basic
  name: string;
  description: string;
  category: string;
  stars: number;
  // Location
  address: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
  environment: string;
  // Capacity
  totalRooms: number;
  roomsForSwap: number;
  maxPaxPerRoom: number;
  roomTypes: RoomType[];
  // Services
  amenities: string[];
  checkInTime: string;
  checkOutTime: string;
  availableSeasons: string[];
  highlights: string[];
  // Contact
  contactPhone: string;
  contactEmail: string;
  website: string;
  // Legal
  legalName: string;
  taxId: string;
  hotelRegistrationNumber: string;
  // Policies
  cancellationPolicy: string;
  petPolicy: string;
  childrenPolicy: string;
}

const initialData: HotelFormData = {
  name: "",
  description: "",
  category: "Select",
  stars: 2,
  address: "",
  city: "",
  province: "",
  country: "Argentina",
  postalCode: "",
  environment: "Playa",
  totalRooms: 1,
  roomsForSwap: 1,
  maxPaxPerRoom: 2,
  roomTypes: [{ name: "Estándar", mult: 1.0, description: "", quantity: 1 }],
  amenities: [],
  checkInTime: "14:00",
  checkOutTime: "10:00",
  availableSeasons: ["Media", "Baja"],
  highlights: [],
  contactPhone: "",
  contactEmail: "",
  website: "",
  legalName: "",
  taxId: "",
  hotelRegistrationNumber: "",
  cancellationPolicy: "",
  petPolicy: "No se admiten mascotas",
  childrenPolicy: "Se admiten niños",
};

const STEPS = [
  { label: "Datos Básicos", icon: Building2 },
  { label: "Ubicación", icon: MapPin },
  { label: "Habitaciones", icon: BedDouble },
  { label: "Servicios", icon: Star },
  { label: "Contacto y Legal", icon: FileText },
  { label: "Políticas y Fotos", icon: Camera },
];

/* ─── Input components ─── */
const inputClass =
  "w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm";
const labelClass = "block text-sm font-medium text-muted-foreground mb-1.5";
const selectClass = inputClass + " appearance-none cursor-pointer";

const Field = ({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) => (
  <div>
    <label className={labelClass}>
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    {children}
  </div>
);

/* ─── Component ─── */
const HotelUpload = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<HotelFormData>(initialData);
  const [highlightInput, setHighlightInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const update = <K extends keyof HotelFormData>(key: K, value: HotelFormData[K]) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const suPerNight = SU_BASE[data.category] || 80;

  const toggleArrayItem = (key: "amenities" | "availableSeasons", item: string) => {
    setData((prev) => ({
      ...prev,
      [key]: prev[key].includes(item) ? prev[key].filter((i) => i !== item) : [...prev[key], item],
    }));
  };

  const addRoomType = () => {
    if (data.roomTypes.length >= 6) return;
    setData((prev) => ({
      ...prev,
      roomTypes: [...prev.roomTypes, { name: "Superior", mult: 1.2, description: "", quantity: 1 }],
    }));
  };

  const removeRoomType = (idx: number) => {
    setData((prev) => ({
      ...prev,
      roomTypes: prev.roomTypes.filter((_, i) => i !== idx),
    }));
  };

  const updateRoomType = (idx: number, field: keyof RoomType, value: string | number) => {
    setData((prev) => {
      const updated = [...prev.roomTypes];
      if (field === "name") {
        updated[idx] = { ...updated[idx], name: value as string, mult: ROOM_MULTIPLIERS[value as string] || 1.0 };
      } else {
        updated[idx] = { ...updated[idx], [field]: value };
      }
      return { ...prev, roomTypes: updated };
    });
  };

  const addHighlight = () => {
    const trimmed = highlightInput.trim();
    if (!trimmed || data.highlights.length >= 8) return;
    update("highlights", [...data.highlights, trimmed]);
    setHighlightInput("");
  };

  const removeHighlight = (idx: number) => {
    update("highlights", data.highlights.filter((_, i) => i !== idx));
  };

  const canGoNext = (): boolean => {
    switch (step) {
      case 0: return !!data.name.trim() && !!data.description.trim();
      case 1: return !!data.address.trim() && !!data.city.trim() && !!data.province.trim();
      case 2: return data.roomTypes.length > 0 && data.totalRooms > 0;
      case 3: return data.amenities.length > 0 && data.availableSeasons.length > 0;
      case 4: return !!data.contactPhone.trim() && !!data.contactEmail.trim() && !!data.legalName.trim() && !!data.taxId.trim();
      default: return true;
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Debés iniciar sesión para cargar un hotel.");
      navigate("/login");
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("hotels").insert({
        user_id: user.id,
        name: data.name.trim(),
        description: data.description.trim(),
        category: data.category,
        stars: data.stars,
        address: data.address.trim(),
        city: data.city.trim(),
        province: data.province.trim(),
        country: data.country,
        postal_code: data.postalCode.trim(),
        environment: data.environment,
        total_rooms: data.totalRooms,
        rooms_for_swap: data.roomsForSwap,
        max_pax_per_room: data.maxPaxPerRoom,
        room_types: data.roomTypes as any,
        amenities: data.amenities,
        check_in_time: data.checkInTime,
        check_out_time: data.checkOutTime,
        available_seasons: data.availableSeasons,
        su_per_night: suPerNight,
        contact_phone: data.contactPhone.trim(),
        contact_email: data.contactEmail.trim(),
        website: data.website.trim() || null,
        legal_name: data.legalName.trim(),
        tax_id: data.taxId.trim(),
        hotel_registration_number: data.hotelRegistrationNumber.trim() || null,
        highlights: data.highlights,
        cancellation_policy: data.cancellationPolicy.trim(),
        pet_policy: data.petPolicy,
        children_policy: data.childrenPolicy,
        status: "draft",
      });

      if (error) {
        toast.error("Error al guardar: " + error.message);
      } else {
        toast.success("¡Hotel cargado exitosamente! Será revisado por nuestro equipo.");
        navigate("/");
      }
    } catch {
      toast.error("Error inesperado. Intentá de nuevo.");
    }
    setIsSubmitting(false);
  };

  /* ─── Step renderers ─── */
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-5 h-5 text-primary" />
              <h3 className="font-display font-semibold text-lg">Datos Básicos del Hotel</h3>
            </div>

            <Field label="Nombre del hotel" required>
              <input
                value={data.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Ej: Hotel Bahía Dorada"
                className={inputClass}
                maxLength={100}
              />
            </Field>

            <Field label="Descripción" required>
              <textarea
                value={data.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="Describí tu hotel: ubicación, estilo, qué lo hace especial..."
                className={inputClass + " min-h-[120px] resize-y"}
                maxLength={1000}
              />
              <p className="text-[11px] text-muted-foreground mt-1">{data.description.length}/1000 caracteres</p>
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Categoría" required>
                <select
                  value={data.category}
                  onChange={(e) => {
                    const cat = CATEGORIES.find((c) => c.value === e.target.value);
                    update("category", e.target.value);
                    if (cat) update("stars", cat.stars);
                  }}
                  className={selectClass}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </Field>

              <Field label="Valor SU/noche (automático)">
                <div className="px-4 py-3 rounded-xl bg-primary/10 border border-primary/20 text-primary font-display font-bold text-lg text-center">
                  {suPerNight} SU
                </div>
              </Field>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5 text-primary" />
              <h3 className="font-display font-semibold text-lg">Ubicación</h3>
            </div>

            <Field label="Dirección" required>
              <input value={data.address} onChange={(e) => update("address", e.target.value)} placeholder="Av. Costanera 1234" className={inputClass} maxLength={200} />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Ciudad" required>
                <input value={data.city} onChange={(e) => update("city", e.target.value)} placeholder="Mar del Plata" className={inputClass} maxLength={100} />
              </Field>
              <Field label="Provincia / Departamento" required>
                <input value={data.province} onChange={(e) => update("province", e.target.value)} placeholder="Buenos Aires" className={inputClass} maxLength={100} />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="País" required>
                <select value={data.country} onChange={(e) => update("country", e.target.value)} className={selectClass}>
                  {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Código Postal">
                <input value={data.postalCode} onChange={(e) => update("postalCode", e.target.value)} placeholder="7600" className={inputClass} maxLength={10} />
              </Field>
            </div>

            <Field label="Entorno" required>
              <div className="flex flex-wrap gap-2">
                {ENVIRONMENTS.map((env) => (
                  <button
                    key={env}
                    type="button"
                    onClick={() => update("environment", env)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      data.environment === env
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {env}
                  </button>
                ))}
              </div>
            </Field>
          </div>
        );

      case 2:
        return (
          <div className="space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <BedDouble className="w-5 h-5 text-primary" />
              <h3 className="font-display font-semibold text-lg">Habitaciones y Capacidad</h3>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Field label="Total habitaciones" required>
                <input type="number" min={1} max={500} value={data.totalRooms} onChange={(e) => update("totalRooms", parseInt(e.target.value) || 1)} className={inputClass} />
              </Field>
              <Field label="Habitaciones para Swap" required>
                <input type="number" min={1} max={data.totalRooms} value={data.roomsForSwap} onChange={(e) => update("roomsForSwap", Math.min(parseInt(e.target.value) || 1, data.totalRooms))} className={inputClass} />
              </Field>
              <Field label="Pax máx. por hab.">
                <input type="number" min={1} max={12} value={data.maxPaxPerRoom} onChange={(e) => update("maxPaxPerRoom", parseInt(e.target.value) || 2)} className={inputClass} />
              </Field>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className={labelClass + " mb-0"}>Tipos de habitación <span className="text-red-400">*</span></label>
                {data.roomTypes.length < 6 && (
                  <button type="button" onClick={addRoomType} className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors">
                    <Plus className="w-3.5 h-3.5" /> Agregar tipo
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {data.roomTypes.map((rt, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-secondary/50 border border-border space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground">Tipo {idx + 1}</span>
                      {data.roomTypes.length > 1 && (
                        <button type="button" onClick={() => removeRoomType(idx)} className="text-red-400 hover:text-red-300">
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <select value={rt.name} onChange={(e) => updateRoomType(idx, "name", e.target.value)} className={selectClass}>
                        {ROOM_TYPE_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <div className="px-3 py-3 rounded-xl bg-primary/10 text-primary font-bold text-center text-sm">
                        ×{rt.mult}
                      </div>
                      <input type="number" min={1} max={100} value={rt.quantity} onChange={(e) => updateRoomType(idx, "quantity", parseInt(e.target.value) || 1)} placeholder="Cant." className={inputClass} />
                    </div>
                    <input
                      value={rt.description}
                      onChange={(e) => updateRoomType(idx, "description", e.target.value)}
                      placeholder="Descripción breve (ej: Vista al mar con balcón)"
                      className={inputClass}
                      maxLength={150}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-primary" />
              <h3 className="font-display font-semibold text-lg">Servicios y Temporadas</h3>
            </div>

            <Field label="Amenities" required>
              <div className="flex flex-wrap gap-2">
                {ALL_AMENITIES.map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => toggleArrayItem("amenities", a)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                      data.amenities.includes(a)
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Check-in" required>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <input type="time" value={data.checkInTime} onChange={(e) => update("checkInTime", e.target.value)} className={inputClass} />
                </div>
              </Field>
              <Field label="Check-out" required>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <input type="time" value={data.checkOutTime} onChange={(e) => update("checkOutTime", e.target.value)} className={inputClass} />
                </div>
              </Field>
            </div>

            <Field label="Temporadas disponibles para Swap" required>
              <div className="flex gap-3">
                {SEASONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleArrayItem("availableSeasons", s)}
                    className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all border ${
                      data.availableSeasons.includes(s)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-secondary text-muted-foreground border-border hover:bg-secondary/80"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Destacados del hotel (máx. 8)">
              <div className="flex gap-2 mb-2">
                <input
                  value={highlightInput}
                  onChange={(e) => setHighlightInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addHighlight())}
                  placeholder="Ej: Vista directa al mar"
                  className={inputClass + " flex-1"}
                  maxLength={80}
                />
                <button type="button" onClick={addHighlight} className="px-4 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.highlights.map((h, i) => (
                  <span key={i} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                    {h}
                    <button type="button" onClick={() => removeHighlight(i)}><X className="w-3 h-3" /></button>
                  </span>
                ))}
              </div>
            </Field>
          </div>
        );

      case 4:
        return (
          <div className="space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-primary" />
              <h3 className="font-display font-semibold text-lg">Contacto y Datos Legales</h3>
            </div>

            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 mb-2">
              <p className="text-xs text-muted-foreground">
                <ShieldCheck className="w-3.5 h-3.5 inline mr-1 text-primary" />
                Estos datos son necesarios para la verificación y facturación. No se comparten públicamente.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Teléfono de contacto" required>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                  <input value={data.contactPhone} onChange={(e) => update("contactPhone", e.target.value)} placeholder="+54 11 1234-5678" className={inputClass} maxLength={30} />
                </div>
              </Field>
              <Field label="Email de contacto" required>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                  <input type="email" value={data.contactEmail} onChange={(e) => update("contactEmail", e.target.value)} placeholder="reservas@hotel.com" className={inputClass} maxLength={100} />
                </div>
              </Field>
            </div>

            <Field label="Sitio web">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-muted-foreground shrink-0" />
                <input value={data.website} onChange={(e) => update("website", e.target.value)} placeholder="https://www.hotel.com" className={inputClass} maxLength={200} />
              </div>
            </Field>

            <div className="border-t border-border pt-4">
              <h4 className="font-medium text-sm mb-3">Datos Fiscales / Legales</h4>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Razón social" required>
                  <input value={data.legalName} onChange={(e) => update("legalName", e.target.value)} placeholder="Hotel Bahía Dorada S.A." className={inputClass} maxLength={200} />
                </Field>
                <Field label="CUIT / RUT / RUC" required>
                  <input value={data.taxId} onChange={(e) => update("taxId", e.target.value)} placeholder="30-12345678-9" className={inputClass} maxLength={30} />
                </Field>
              </div>
              <div className="mt-4">
                <Field label="Nro. de Habilitación Hotelera">
                  <input value={data.hotelRegistrationNumber} onChange={(e) => update("hotelRegistrationNumber", e.target.value)} placeholder="Opcional" className={inputClass} maxLength={50} />
                </Field>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <Camera className="w-5 h-5 text-primary" />
              <h3 className="font-display font-semibold text-lg">Políticas y Fotos</h3>
            </div>

            <Field label="Política de cancelación">
              <textarea
                value={data.cancellationPolicy}
                onChange={(e) => update("cancellationPolicy", e.target.value)}
                placeholder="Describí tu política de cancelación (ej: Cancelación gratuita hasta 48hs antes del check-in...)"
                className={inputClass + " min-h-[80px] resize-y"}
                maxLength={500}
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Política de mascotas">
                <select value={data.petPolicy} onChange={(e) => update("petPolicy", e.target.value)} className={selectClass}>
                  <option>No se admiten mascotas</option>
                  <option>Se admiten mascotas pequeñas</option>
                  <option>Se admiten mascotas (todas)</option>
                  <option>Consultar</option>
                </select>
              </Field>
              <Field label="Política de niños">
                <select value={data.childrenPolicy} onChange={(e) => update("childrenPolicy", e.target.value)} className={selectClass}>
                  <option>Se admiten niños</option>
                  <option>Solo adultos</option>
                  <option>Niños mayores de 6 años</option>
                  <option>Consultar</option>
                </select>
              </Field>
            </div>

            <div className="p-5 rounded-xl border-2 border-dashed border-border bg-secondary/30 text-center">
              <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-1">Fotos del hotel</p>
              <p className="text-xs text-muted-foreground">
                Las fotos se solicitarán durante el proceso de verificación. Nuestro equipo te contactará para coordinar la carga de imágenes profesionales.
              </p>
            </div>

            {/* Summary */}
            <div className="p-5 rounded-xl bg-primary/5 border border-primary/20">
              <h4 className="font-display font-semibold mb-3">Resumen de tu hotel</h4>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                <p><span className="text-muted-foreground">Hotel:</span> {data.name || "—"}</p>
                <p><span className="text-muted-foreground">Categoría:</span> {data.category} ({data.stars}★)</p>
                <p><span className="text-muted-foreground">Ubicación:</span> {data.city}, {data.country}</p>
                <p><span className="text-muted-foreground">Entorno:</span> {data.environment}</p>
                <p><span className="text-muted-foreground">Hab. para Swap:</span> {data.roomsForSwap} de {data.totalRooms}</p>
                <p><span className="text-muted-foreground">SU/noche:</span> <span className="text-primary font-bold">{suPerNight}</span></p>
                <p><span className="text-muted-foreground">Amenities:</span> {data.amenities.length} seleccionados</p>
                <p><span className="text-muted-foreground">Tipos hab.:</span> {data.roomTypes.length}</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 pt-20 sm:pt-28 pb-12 sm:pb-20">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-2">
              Cargá tu <span className="gold-text">Hotel</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Completá todos los datos para que tu hotel entre al proceso de verificación y se publique en la red.
            </p>
          </motion.div>

          {/* Step indicator */}
          <div className="flex items-center justify-between mb-6 sm:mb-8 overflow-x-auto gap-1">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="flex items-center">
                  <button
                    type="button"
                    onClick={() => i < step && setStep(i)}
                    className="flex flex-col items-center"
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                        i <= step ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] text-muted-foreground mt-1 hidden sm:block whitespace-nowrap">{s.label}</span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <div className={`w-4 sm:w-8 h-px mx-0.5 transition-colors duration-300 ${i < step ? "bg-primary" : "bg-border"}`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Form card */}
          <div className="glass-card p-6 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-5 border-t border-border">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" /> Anterior
              </button>

              {step < STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => s + 1)}
                  disabled={!canGoNext()}
                  className="flex items-center gap-1 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Siguiente <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {isSubmitting ? "Guardando..." : "Enviar para Verificación"}
                </button>
              )}
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-5">
            Una vez enviado, nuestro equipo revisará los datos y te contactará para completar la verificación.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HotelUpload;
