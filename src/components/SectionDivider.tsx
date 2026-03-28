import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SectionDividerProps {
  variant?: "line" | "dots" | "wave";
}

const SectionDivider = ({ variant = "line" }: SectionDividerProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  if (variant === "dots") {
    return (
      <div ref={ref} className="flex justify-center gap-2 py-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: i * 0.1, duration: 0.4, ease: "backOut" }}
            className="w-1.5 h-1.5 rounded-full bg-primary/30"
          />
        ))}
      </div>
    );
  }

  if (variant === "wave") {
    return (
      <div ref={ref} className="py-4 overflow-hidden">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-px max-w-md mx-auto bg-gradient-to-r from-transparent via-primary/40 to-transparent origin-center"
        />
      </div>
    );
  }

  return (
    <div ref={ref} className="py-4 overflow-hidden">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="h-px max-w-xl mx-auto bg-gradient-to-r from-transparent via-border to-transparent origin-left"
      />
    </div>
  );
};

export default SectionDivider;
