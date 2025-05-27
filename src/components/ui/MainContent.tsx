"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface MainContentProps {
  showText: boolean;
  showDescription: boolean;
  showButtons: boolean;
}

export default function MainContent({
  showText,
  showDescription,
  showButtons,
}: MainContentProps) {
  const router = useRouter();

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="700" height="700" viewBox="0 0 700 700">
      <rect width="700" height="700" fill="rgb(59, 130, 246)" opacity="0.2" rx="350" ry="350"/>
      <text x="50%" y="50%" font-family="Arial" font-size="80" fill="white" text-anchor="middle" dy=".3em">Image</text>
    </svg>`;
    (
      e.target as HTMLImageElement
    ).src = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  };

  const playSound = () => {
    const audio = new Audio("/199.mp3");
    audio.play().catch((e) => console.log("Playback prevented:", e));
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="container mx-auto px-4 sm:px-8 h-full flex flex-col justify-center pt-16 pb-20 sm:pt-0 sm:pb-0">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 h-full">
        {/* Left content */}
        <div className="lg:w-1/2 space-y-6 sm:space-y-8 order-2 lg:order-1">
          <div className="overflow-hidden">
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 100 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"
            >
              Bienvenue sur{" "}
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                UniRelevé
              </span>
              ,
              <br />
              votre portail{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                académique
              </span>
              <br />
              intelligent
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: showDescription ? 1 : 0,
              y: showDescription ? 0 : 20,
            }}
            transition={{ duration: 1 }}
            className="text-sm sm:text-base md:text-lg text-gray-300 max-w-lg"
          >
            UniRelevé est une plateforme simple et intuitive qui vous permet de
            demander votre diplôme en quelques clics. Facile à utiliser, rapide
            et efficace pour tous vos besoins académiques.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showButtons ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            className="flex gap-4 sm:gap-6 mt-6 sm:mt-8 flex-wrap"
          >
            <motion.button
              onClick={handleLogin}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg text-white shadow-lg hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm sm:text-base"
              aria-label="S'inscrire"
            >
              Connexion
            </motion.button>
          </motion.div>
        </div>

        {/* Right content with image */}
        <div className="lg:w-1/2 relative order-1 lg:order-2 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[700px] flex items-center justify-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.7 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="absolute w-full h-full max-w-[500px] max-h-[500px] lg:max-w-[800px] lg:max-h-[800px] bg-gradient-to-br from-blue-500 to-purple-600 rounded-full filter blur-xl z-0"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="relative z-20 w-full h-full"
          >
            <div
              className="w-full h-full relative cursor-pointer hover:scale-105 transition-transform duration-300 max-w-[500px] mx-auto"
              onClick={playSound}
            >
              <Image
                src="/pic.png"
                alt="Étudiant avec ordinateur"
                fill
                className="object-contain drop-shadow-2xl"
                priority
                onError={handleImageError}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
