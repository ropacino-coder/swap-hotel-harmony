import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import hotelImg from "@/assets/hotel-luxury.jpg";

const steps = [
  {
    number: "01",
    title: "Sube tus noches",
    description:
      "Publica las noches disponibles de tu hotel en temporada media o baja al Pool de Swaps.",
  },
  {
    number: "02",
    title: "Recibe Swap Units",
    description:
      "Por cada noche depositada, recibes SU proporcionales a la categoría y temporada de tu hotel.",
  },
  {
    number: "03",
    title: "Intercambia",
    description:
      "Usa tus SU para reservar noches en cualquier hotel de la red. La blockchain valida todo.",
  },
  {
    number: "04",
    title: "Disfruta",
    description:
      "Viaja, aloja huéspedes o gestiona tus unidades. Las SU vencen a los 12 meses (FIFO).",
  },
];

const HowItWorksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden gold-glow">
              <img
                src={hotelImg}
                alt="Hotel de lujo"
                className="w-full h-[500px] object-cover"
                loading="lazy"
                width={800}
                height={600}
              />
            </div>
            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute -bottom-6 -right-4 md:right-6 glass-card p-5 animate-float"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">SU</span>
                </div>
                <div>
                  <div className="text-sm font-semibold">+24 Swap Units</div>
                  <div className="text-xs text-muted-foreground">
                    Depositadas al Pool
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Steps side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">
              Cómo Funciona
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-3 mb-10 text-balance">
              De tu hotel al mundo en{" "}
              <span className="gold-text">4 pasos</span>
            </h2>

            <div className="space-y-8">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
                  className="flex gap-5 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <span className="text-sm font-bold text-primary">
                      {step.number}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
