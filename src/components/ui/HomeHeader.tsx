"use client";

import { motion } from "framer-motion";
import Image from "next/image";


export default function Header() {
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
      <rect width="40" height="40" fill="rgb(59, 130, 246)" opacity="0.2" rx="20" ry="20"/>
      <text x="50%" y="50%" font-family="Arial" font-size="12" fill="white" text-anchor="middle" dy=".3em">Logo</text>
    </svg>`;
    (
      e.target as HTMLImageElement
    ).src = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  };



  return (
    <header className="absolute top-0 w-full px-4 sm:px-6 py-4 z-50 flex flex-col sm:flex-row justify-between items-center">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="flex items-center space-x-2 mb-4 sm:mb-0"
      >
        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
          <Image
            src="/logouni.png"
            alt="Logo UniRelevé"
            width={40}
            height={40}
            className="object-contain"
            onError={handleImageError}
          />
        </div>
        <span className="text-xl font-bold">UniRelevé</span>
      </motion.div>
    </header>
  );
}
