"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import components with SSR disabled
const FloatingElements = dynamic(
  () => import("@/components/ui/FloatingElements"),
  {
    ssr: false,
    loading: () => (
      <div className="absolute w-full h-full z-10 pointer-events-none" />
    ),
  }
);

const BackgroundElements = dynamic(
  () => import("@/components/ui/BackgroundElements"),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" />
    ),
  }
);

const MainContent = dynamic(
  () => import("@/components/ui/MainContent"),
  { ssr: true } // Keep SSR for main content
);

const Header = dynamic(() => import("@/components/ui/HomeHeader"), { ssr: true });

const Footer = dynamic(() => import("@/components/ui/HomeFooter"), { ssr: true });

export default function Home() {
  const [showBackground, setShowBackground] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowBackground(true), 200);
    const timer2 = setTimeout(() => setShowText(true), 800);
    const timer3 = setTimeout(() => setShowDescription(true), 2000);
    const timer4 = setTimeout(() => setShowButtons(true), 3000);

    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => Math.min(prev + 10, 100));
    }, 300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <main className="h-screen bg-gradient-to-br from-[#0b0c2a] to-[#151642] text-white font-sans relative overflow-hidden">
      {/* Loading progress */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${loadingProgress}%` }}
        className="fixed top-0 left-0 h-1 bg-blue-500 z-50"
      />

      {/* Animated background elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showBackground ? 0.15 : 0 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <BackgroundElements />
      </motion.div>

      <Header />

      <MainContent
        showText={showText}
        showDescription={showDescription}
        showButtons={showButtons}
      />

      <FloatingElements />

      <Footer />
    </main>
  );
}
