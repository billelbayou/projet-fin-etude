"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Footer() {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowFooter(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: showFooter ? 1 : 0 }}
      transition={{ duration: 1 }}
      className="absolute bottom-0 w-full py-4 text-center text-gray-400 text-xs sm:text-sm"
    >
      © {new Date().getFullYear()} UniRelevé - Tous droits réservés
    </motion.footer>
  );
}
