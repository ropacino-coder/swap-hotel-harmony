import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { hotels } = await req.json();

    if (!hotels || !Array.isArray(hotels) || hotels.length < 2) {
      return new Response(
        JSON.stringify({ error: "Se necesitan al menos 2 hoteles para comparar" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const hotelDescriptions = hotels
      .map(
        (h: any) =>
          `- ${h.name} (${h.location}): ${h.stars}★ ${h.category}, ${h.suPerNight} SU/noche, rating ${h.rating}/5, entorno: ${h.environment}, amenities: ${h.amenities?.join(", ") || "N/A"}, temporadas: ${h.seasons?.join(", ") || "N/A"}`
      )
      .join("\n");

    const prompt = `Sos un analista experto en hotelería del Cono Sur. Compará estos hoteles de la red Swap Hotels y respondé SOLO con un JSON válido (sin markdown, sin backticks):

${hotelDescriptions}

Formato exacto:
{
  "summary": "Resumen breve de la comparación en 2-3 oraciones",
  "winner": "ID del hotel ganador",
  "analysis": [
    {
      "hotelId": "id",
      "strengths": ["fortaleza 1", "fortaleza 2", "fortaleza 3"],
      "weaknesses": ["debilidad 1", "debilidad 2"],
      "rating": 8.5
    }
  ],
  "recommendation": "Recomendación final para el hotelero que quiere hacer un swap"
}

Evaluá: relación SU/calidad, ubicación, amenities, versatilidad de temporadas, rating. Usá español rioplatense.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "Respondé SOLO con JSON válido. Sin texto extra, sin backticks, sin markdown." },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "Error del servicio de IA" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiData = await response.json();
    const content = aiData.choices?.[0]?.message?.content || "";

    // Parse JSON from response (handle possible markdown wrapping)
    let parsed;
    try {
      const clean = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      parsed = JSON.parse(clean);
    } catch {
      console.error("Failed to parse AI response:", content);
      return new Response(
        JSON.stringify({ error: "No se pudo procesar la respuesta del análisis" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("hotel-compare error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Error desconocido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
