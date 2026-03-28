import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqCategories = [
  {
    category: "Sobre Swap Hotels",
    questions: [
      {
        q: "¿Qué problema real resuelve Swap Hotels?",
        a: "Transforma disponibilidad hotelera en temporada media y baja en oportunidades de intercambio entre hoteles. Permite que hoteleros y sus equipos viajen sin costo de alojamiento, activa ocupación en momentos de baja demanda y fomenta un turismo colaborativo que impulsa economías regionales.",
      },
      {
        q: "¿Swap Hotels vende alojamiento?",
        a: "No. Swap Hotels no vende noches ni fija precios. Facilita intercambios a través de unidades internas (Swap Units) y cobra únicamente una tarifa de servicio por la gestión, verificación y soporte.",
      },
      {
        q: "¿A quién está dirigida la plataforma?",
        a: "Exclusivamente a hoteles habilitados y a sus responsables (propietarios, inquilinos o gerenciadores). No es una plataforma para público general.",
      },
    ],
  },
  {
    category: "Registro y cuenta",
    questions: [
      {
        q: "¿Qué necesito para registrarme?",
        a: "Ser titular, inquilino o gerenciador de un hotel habilitado oficialmente. Quien se registra debe tener poder de decisión para aceptar huéspedes y comprometer disponibilidad.",
      },
      {
        q: "¿Tengo que ofrecer mi hotel todo el año?",
        a: "No. Controlás tu calendario. El mínimo obligatorio es 90 días al año en temporada media y/o baja.",
      },
      {
        q: "¿Puedo vincular más de un hotel a mi cuenta?",
        a: "Sí. Podés administrar varios hoteles desde una misma cuenta, siempre que seas propietario, inquilino o gerenciador autorizado de cada uno.",
      },
    ],
  },
  {
    category: "Swap Units (SU)",
    questions: [
      {
        q: "¿Qué son las Swap Units?",
        a: "Son unidades internas de intercambio que se acreditan cuando recibís huéspedes o cumplís objetivos dentro de la plataforma. No son dinero, no se convierten a dinero y solo se utilizan dentro de Swap Hotels.",
      },
      {
        q: "¿Tienen vencimiento las SU?",
        a: "Sí. Las SU vencen a los 12 meses desde la acreditación. El sistema avisa con 90, 60 y 30 días de anticipación. Las SU vencidas vuelven al pool común de la red.",
      },
      {
        q: "¿Puedo comprar Swap Units?",
        a: "No. No hay posibilidad de comprar unidades de intercambio. Va en contra de los ideales colaborativos de la plataforma.",
      },
      {
        q: "¿Cómo se consiguen?",
        a: "Recibiendo huéspedes de la red, completando el registro y verificación, cumpliendo hitos de actividad, recomendando hoteles que se verifiquen o a través de programas especiales.",
      },
    ],
  },
  {
    category: "Reservas y cancelaciones",
    questions: [
      {
        q: "¿Cómo funciona una reserva?",
        a: "Siempre con aprobación del hotel. Se envía la solicitud, el hotel revisa y confirma operativamente, y recién después se paga la tarifa y se retienen las SU.",
      },
      {
        q: "¿Cuándo se paga la tarifa de servicio?",
        a: "Después de la confirmación operativa del hotel. Nunca antes.",
      },
      {
        q: "¿Qué pasa si cancelo yo?",
        a: "Depende del plazo: con suficiente anticipación, las SU retenidas vuelven a tu cuenta. En cancelaciones tardías o críticas, podés perder total o parcialmente las SU según la política vigente.",
      },
      {
        q: "¿Qué pasa si cancela el hotel?",
        a: "Se devuelven las SU retenidas y la tarifa de servicio en todos los casos. En cancelaciones críticas se acredita compensación adicional y se activa asistencia de reubicación.",
      },
      {
        q: "¿Puede alojarse un familiar o empleado?",
        a: "Sí. Al momento de la reserva se indica quién va a alojarse. Puede ser cualquier persona que el titular autorice para esa estadía.",
      },
    ],
  },
];

const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="faq" className="py-8 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">
            FAQ
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-3 mb-4 text-balance">
            Preguntas <span className="gold-text">frecuentes</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-balance">
            Todo lo que necesitás saber antes de sumar tu hotel a la red.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-8">
          {faqCategories.map((cat, ci) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 * ci, duration: 0.5 }}
            >
              <h3 className="font-display font-semibold text-lg mb-3 text-primary">
                {cat.category}
              </h3>
              <div className="glass-card overflow-hidden">
                <Accordion type="single" collapsible>
                  {cat.questions.map((faq, qi) => (
                    <AccordionItem
                      key={qi}
                      value={`${ci}-${qi}`}
                      className="border-b border-border last:border-0"
                    >
                      <AccordionTrigger className="px-6 text-left text-sm font-medium hover:no-underline hover:text-primary transition-colors">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="px-6 text-sm text-muted-foreground leading-relaxed">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center mt-8"
        >
          <p className="text-muted-foreground text-sm">
            ¿Tenés otra consulta?{" "}
            <a href="mailto:dudas@swaphotels.com" className="text-primary font-semibold hover:underline">
              dudas@swaphotels.com
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
