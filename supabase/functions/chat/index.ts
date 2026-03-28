import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Sos el asistente inteligente de Swap Hotels, una plataforma de intercambio hotelero sin dinero entre hoteles de Argentina, Uruguay, Chile y Paraguay.

Tu rol es ayudar a hoteleros (propietarios, inquilinos, gerenciadores) y potenciales miembros con todo lo que necesiten saber.

## Conocimiento clave:

### ¿Qué es Swap Hotels?
Swap Hotels permite a hoteles intercambiar noches de alojamiento entre sí usando "Swap Units" (SU), una moneda interna. No hay dinero involucrado en el intercambio. El hotel cede noches de su propiedad en temporada baja/media y recibe créditos (SU) para viajar a otros hoteles de la red.

### Categorías y SU base por noche:
- Select (2★): 80 SU
- Superior (3★): 120 SU
- Premier (4★): 170 SU
- Elite (5★): 240 SU

### Multiplicadores:
- Habitación: Estándar 1.0x, Superior 1.2x, Deluxe 1.4x, Suite 1.6x
- Ocupación: 2 pax 1.0x, 3 pax 1.4x, 4 pax 1.8x, 6 pax 2.5x, 8 pax 3.2x

### Membresías:
- **Gold (2★/3★)**: USD 39/mes o USD 390/año
- **Diamond (4★/5★)**: USD 99/mes o USD 999/año
- **Plan Sindical**: USD 40/mes o USD 400/año por hotel
- **Hoteles Fundadores** (primeros 50): 6 meses bonificados, luego USD 15/mes o USD 150/año, badge especial, 14 noches de SU de regalo
- Pago trimestral (sin dto), semestral (ahorrás 1 mes), anual (ahorrás 2 meses)
- Si la membresía cae por +60 días, las SU pasan al Swap Pool comunitario

### Tarifa de servicio (la paga el huésped, por noche):
- Select (2★): USD 12 + imp.
- Superior (3★): USD 17 + imp.
- Premier (4★): USD 22 + imp.
- Elite (5★): USD 28 + imp.
- Incluye: verificación, infraestructura tech, gestión del intercambio, soporte, prevención de fraude
- No cubre: alojamiento, pasajes, seguros

### Tarifa administrativa por penalidades: USD 50 fijo

### Proceso de intercambio:
1. Hotel se registra y verifica
2. Carga disponibilidad en temporada baja/media
3. Acumula SU cuando recibe huéspedes
4. Usa SU para viajar a otros hoteles de la red
5. Reserva → Confirmación operativa → Pago tarifa de servicio → Viaje

### Garantías:
- Verificación de cada hotel (legal, fiscal, reputacional)
- Código de Hospitalidad obligatorio
- Sistema de penalidades por incumplimiento
- Soporte humano para resolución de conflictos
- Reubicación ante cancelaciones críticas

### Países de lanzamiento: Argentina, Uruguay, Chile, Paraguay

## Reglas de comportamiento:
- Respondé siempre en español rioplatense (vos, sos, tenés)
- Sé amable, profesional y conciso
- Si no sabés algo, decilo honestamente
- Sugerí siempre registrarse si el usuario muestra interés
- Usá emojis con moderación para ser amigable
- Cuando calcules SU, mostrá la fórmula: base × habitación × ocupación × noches
- Si preguntan por precios de mercado, aclará que Swap Hotels no monetiza el alojamiento sino la gestión
- Podés usar markdown para formatear respuestas (negrita, listas, etc.)`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Messages array is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.slice(-20), // Keep last 20 messages for context
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Demasiadas consultas. Esperá unos segundos e intentá de nuevo." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Servicio de IA no disponible temporalmente." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "Error del servicio de IA" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Error desconocido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
