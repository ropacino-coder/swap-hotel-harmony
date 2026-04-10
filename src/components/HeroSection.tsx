import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import heroBg from "@/assets/hero-light.jpg";

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative min-h-[60vh] flex items-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div className="absolute inset-0" style={{ y: bgY, scale }}>
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-card/80 via-card/60 to-card/80" />
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/20"
            style={{
              left: `${15 + i * 18}%`,
              top: `${20 + i * 12}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      {/* Content with parallax */}
      <motion.div
        className="relative z-10 container mx-auto px-4 sm:px-6 pt-20 sm:pt-28 pb-10 sm:pb-16"
        style={{ y: textY, opacity }}
      >
        <motion.div className="max-w-2xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-primary/30 bg-primary/5 mb-5 sm:mb-8"
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-medium text-primary">
              Hotelería Colaborativa
            </span>
          </motion.div>

          {/* Heading with stagger */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-800 leading-[1.08] mb-4 sm:mb-6 text-balance"
          >
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, y: 40, rotateX: -40 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              Intercambiá noches.{" "}
            </motion.span>
            <motion.span
              className="gold-text inline-block"
              initial={{ opacity: 0, y: 40, rotateX: -40 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.7, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              Multiplicá destinos.
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto mb-8 sm:mb-10 text-balance"
          >
            La primera plataforma donde hoteleros de Argentina, Uruguay,
            Chile y Paraguay intercambian alojamiento en temporada media y baja
            a través de{" "}
            <span className="text-primary font-semibold">Swap Units (SU)</span>.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              href="/register"
              whileHover={{ scale: 1.04, boxShadow: "0 8px 30px hsla(35, 75%, 42%, 0.3)" }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-primary text-primary-foreground font-semibold text-base sm:text-lg transition-all duration-300 gold-glow"
            >
              Sumá tu hotel
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href="#hotels"
              whileHover={{ scale: 1.03, borderColor: "hsl(35, 75%, 42%)" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-full border border-border text-foreground font-medium text-base sm:text-lg hover:text-primary transition-all duration-300"
            >
              Explorar hoteles
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Floating stats with stagger */}
        <div className="mt-10 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto">
          {[
            { value: "12", unit: "meses", label: "Vigencia SU (FIFO)" },
            { value: "4", unit: "países", label: "ARG · URU · CHI · PAR" },
            { value: "24/7", unit: "", label: "Pool activo" },
            { value: "0%", unit: "", label: "Comisiones ocultas" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 1.4 + i * 0.12,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4, boxShadow: "var(--shadow-card-hover)" }}
              className="glass-card p-4 text-center transition-shadow"
            >
              <div className="text-2xl font-display font-bold text-primary">
                {stat.value}
                <span className="text-sm font-normal text-muted-foreground ml-1">
                  {stat.unit}
                </span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
