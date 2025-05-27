"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

export default function FloatingElements() {
  const elements = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        sizeClass: i % 3 === 0 ? "w-12 h-12" : "w-8 h-8",
        color:
          i % 2 === 0 ? "rgba(59, 130, 246, 0.6)" : "rgba(139, 92, 246, 0.6)",
        position: {
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
        },
        animation: {
          x: [0, `${Math.random() * 100 - 50}%`, 0],
          y: [0, `${Math.random() * 100 - 50}%`, 0],
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7],
        },
        transition: {
          duration: 5 + i * 2,
          repeat: Infinity,
          repeatType: "loop" as const,
          ease: "easeInOut",
        },
      })),
    []
  );

  return (
    <div className="absolute w-full h-full z-10 pointer-events-none">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className={`absolute ${el.sizeClass} rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]`}
          style={{
            backgroundColor: el.color,
            top: el.position.top,
            left: el.position.left,
          }}
          animate={el.animation}
          transition={el.transition}
        />
      ))}
    </div>
  );
}
