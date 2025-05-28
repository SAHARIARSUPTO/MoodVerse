"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function WelcomePage() {
  const [isClient, setIsClient] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false); // Start hidden now
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const startMoodDetection = async () => {
    setIsDetecting(true);
    router.push("/mood-detection");

    try {
      await fetch("http://localhost:5000/start-mood-detection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Mood detection failed:", error);
    }
  };

  if (!isClient) return null;

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-[#1a0f23] via-[#2f0e3e] to-[#550f55] overflow-hidden px-6 py-16 text-white select-none">
      {/* Logo Top Left - as text */}
      <div className="absolute top-6 left-6 flex items-center space-x-2 cursor-default select-none">
        <span className="text-4xl md:text-5xl font-extrabold text-[#f72585] drop-shadow-[0_0_10px_rgba(247,37,133,0.7)] tracking-tight">
          MoodVerse
        </span>
      </div>

      {/* Confetti/Sparkles */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {[...Array(40)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute bg-pink-400 rounded-full"
            style={{
              width: 4,
              height: 4,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: "drop-shadow(0 0 6px #f72585)",
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1.2, 0.5],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "mirror",
              delay: Math.random() * 3,
            }}
          />
        ))}
      </motion.div>

      {/* Main Title */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="text-5xl md:text-7xl font-extrabold text-center tracking-tight"
      >
        Welcome to{" "}
        <motion.span
          animate={{ rotate: [0, 10, -10, 10, 0] }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
          }}
          className="inline-block text-[#f72585] drop-shadow-[0_0_10px_rgba(247,37,133,0.7)]"
        >
          MoodVerse
          <span
            aria-label="waving hand"
            role="img"
            className="inline-block ml-2 animate-wave"
            style={{ display: "inline-block", transformOrigin: "70% 70%" }}
          >
            👋
          </span>
        </motion.span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 1 }}
        className="mt-6 text-center text-2xl md:text-4xl font-semibold tracking-wide"
      >
        <span className="bg-gradient-to-r from-[#f72585] to-[#720026] bg-clip-text text-transparent px-4 py-1 rounded-lg shadow-lg inline-block">
          Your Mood
        </span>{" "}
        <span className="text-[#ff6584]">Our Vibe</span>
      </motion.p>

      {/* Start Button */}
      <motion.button
        whileHover={{ scale: 1.1, boxShadow: "0 0 15px #f72585" }}
        whileTap={{ scale: 0.95 }}
        onClick={startMoodDetection}
        disabled={isDetecting || showPrivacy}
        className={`mt-12 px-14 py-4 rounded-full font-bold text-lg md:text-2xl tracking-wide shadow-lg hover:brightness-110 transition
          ${
            isDetecting || showPrivacy
              ? "bg-gray-700 cursor-not-allowed"
              : "bg-[#f72585]"
          }`}
      >
        {isDetecting ? "Scanning Mood..." : "Let’s Start 🚀"}
      </motion.button>

      {/* Floating emojis */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, -20, 0] }}
        transition={{
          repeat: Infinity,
          duration: 6,
          delay: 1,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-10 text-4xl select-none pointer-events-none"
      >
        😄
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 20, 0] }}
        transition={{
          repeat: Infinity,
          duration: 7,
          delay: 1.5,
          ease: "easeInOut",
        }}
        className="absolute bottom-24 right-16 text-5xl select-none pointer-events-none"
      >
        🤖
      </motion.div>

      {/* Privacy Policy Toggle Button */}
      <button
        onClick={() => setShowPrivacy(!showPrivacy)}
        className="fixed bottom-6 right-6 z-50 bg-[#f72585] hover:bg-[#d11149] transition-colors duration-300 px-5 py-2 rounded-full font-semibold text-white shadow-lg focus:outline-none"
      >
        Privacy Policy
      </button>

      {/* Privacy Policy Popup */}
      <AnimatePresence>
        {showPrivacy && (
          <motion.div
            className="fixed top-1/2 left-1/2 max-w-md w-11/12 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-gradient-to-br from-[#31032b] to-[#6a074e] p-8 z-50 shadow-lg text-center"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-[#f72585]">
              Privacy Notice
            </h3>
            <p className="mb-6 text-white/90 text-lg leading-relaxed">
              This app will use your <strong>camera</strong> to scan your face
              and detect your mood. Your privacy is super important — no video
              or images will be stored or shared.
            </p>
            <button
              onClick={() => setShowPrivacy(false)}
              className="mt-2 inline-block bg-[#f72585] hover:bg-[#d11149] transition-colors duration-300 px-6 py-3 rounded-full font-semibold text-white shadow-lg focus:outline-none"
            >
              I Understand & Accept
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
