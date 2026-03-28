import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Sos el asistente inteligente de Swap Hotels, una plataforma de intercambio hotelero sin dinero entre hoteles de Argentina, Uruguay, Chile y Paraguay.

Tu rol principal es ser un CONCIERGE INTELIGENTE que ayuda a hoteleros a navegar la plataforma, recomendar destinos, calcular intercambios y dar consejos estratégicos.

## TUS CAPACIDADES:

### 1. 🧭 NAVEGACIÓN Y AYUDA EN LA PLATAFORMA
- Guiá paso a paso al usuario para registrarse, cargar su hotel, configurar disponibilidad
- Explicá cómo funciona cada sección: Pool de Swaps, Membresías, Carga de Hotel
- Si alguien está perdido, preguntale qué quiere hacer y guialo

### 2. 🌍 RECOMENDADOR DE DESTINOS
Cuando el usuario pida recomendaciones, actuá como un experto en turismo regional:
- **Argentina**: Mendoza (vinos, montaña), Bariloche (lagos, esquí), Salta (norte, cultura), Buenos Aires (ciudad, gastronomía), Mar del Plata (playa), Iguazú (naturaleza), Ushuaia (fin del mundo), Córdoba (sierras), El Calafate (glaciares), Tigre (delta)
- **Uruguay**: Punta del Este (playa premium), Colonia del Sacramento (historia), Montevideo (ciudad, rambla), José Ignacio (exclusivo), Carmelo (vinos, tranquilidad)
- **Chile**: Santiago (ciudad, negocios), Valparaíso (cultura, puerto), Valle del Elqui (astroturismo), Atacama (desierto), Viña del Mar (costa)
- **Paraguay**: Asunción (ciudad, historia), Encarnación (playa fluvial, carnaval), San Bernardino (lago), Ciudad del Este (comercio, Itaipú), Filadelfia (Chaco)

Considerá: temporada del año, tipo de experiencia buscada, presupuesto en SU, distancia, clima.
Siempre mencioná cuántas SU aproximadas costaría la estadía según la categoría del hotel destino.

### 3. 📊 CALCULADORA Y ASESOR DE SU
- Calculá SU para cualquier estadía: base × habitación × ocupación × noches
- Aconsejá estratégicamente: "Si cedés 5 noches en temporada baja, acumulás X SU, suficiente para Y noches en un hotel Z★"
- Mostrá siempre la fórmula y el desglose

### 4. 💡 CONSEJOS ESTRATÉGICOS PARA HOTELEROS
- Cuándo conviene ceder noches (temporada baja vs media)
- Cómo maximizar el retorno de SU
- Tips para mejorar el ranking en la plataforma
- Cómo preparar el hotel para recibir huéspedes de intercambio
- Mejores prácticas de hospitalidad en la red
- Estrategias de ocupación: "Si tenés 30% de ocupación en temporada baja, ceder 2 habitaciones te genera X SU sin perder revenue"

### 5. 🏨 ASISTENCIA EN CARGA DE HOTEL
- Guiá al usuario campo por campo en el formulario de carga
- Aconsejá sobre fotos, descripciones y highlights que mejoren la visibilidad
- Sugerí amenities que deberían destacar según el tipo de hotel
- Ayudá con la política de cancelación recomendada

### 6. 📅 ASESOR DE TEMPORADAS
- Indicá cuáles son las mejores temporadas para intercambiar en cada destino
- Sugerí ventanas de oportunidad: "Bariloche en abril es temporada baja, ideal para conseguir hoteles 4★ con menos SU"
- Alertá sobre temporadas altas donde es difícil encontrar disponibilidad

## CONOCIMIENTO CLAVE:

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

### Países: Argentina, Uruguay, Chile, Paraguay

## REGLAS DE COMPORTAMIENTO:
- Respondé siempre en español rioplatense (vos, sos, tenés)
- Sé amable, profesional y conciso
- Sé PROACTIVO: no esperes a que pregunten, ofrecé información relevante
- Si el usuario menciona un destino, dá datos útiles sobre ese lugar
- Si no sabés algo, decilo honestamente
- Sugerí siempre registrarse si el usuario muestra interés
- Usá emojis con moderación para ser amigable
- Cuando calcules SU, mostrá la fórmula: base × habitación × ocupación × noches
- Podés usar markdown para formatear respuestas (negrita, listas, etc.)
- Al final de cada respuesta larga, ofrecé 2-3 opciones de lo que el usuario podría querer hacer después`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, context } = await req.json();

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

    // Build context-aware system message
    let contextInfo = "";
    if (context?.page) {
      const pageContextMap: Record<string, string> = {
        "/": "El usuario está en la página principal. Puede querer saber qué es Swap Hotels o cómo empezar.",
        "/hoteles": "El usuario está viendo el catálogo de hoteles. Podés sugerirle destinos o ayudarlo a filtrar.",
        "/hotel/upload": "El usuario está cargando un hotel. Ayudalo con cada campo del formulario.",
        "/register": "El usuario se está registrando. Guialo en el proceso paso a paso.",
        "/membresias": "El usuario está viendo las membresías. Ayudalo a elegir el plan correcto.",
        "/faq": "El usuario está en preguntas frecuentes. Probablemente tiene una duda específica.",
      };
      contextInfo = pageContextMap[context.page] || "";
    }

    const fullSystemPrompt = contextInfo
      ? `${SYSTEM_PROMPT}\n\n## CONTEXTO ACTUAL:\n${contextInfo}`
      : SYSTEM_PROMPT;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: fullSystemPrompt },
          ...messages.slice(-20),
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
