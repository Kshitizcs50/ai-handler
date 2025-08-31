"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// ✅ Custom Typewriter
function useTypewriter(text, speed = 60) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return displayed;
}

export default function Auth() {
  const router = useRouter();
  const title = useTypewriter("⚡ Welcome to the Multiverse ⚡", 70);

  return (
    <main className="relative flex items-center justify-center h-screen overflow-hidden px-4 sm:px-6">
      {/* Background Nebula */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-black to-purple-900 animate-gradient-x"></div>

      {/* Parallax Stars */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            width: Math.random() * 3 + "px",
            height: Math.random() * 3 + "px",
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
          }}
          animate={{ y: [0, -15, 0], opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: Math.random() * 6 + 4,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Rotating Portal Ring */}
      <motion.div
        className="absolute border-4 border-pink-500 rounded-full w-[250px] sm:w-[400px] md:w-[600px] h-[250px] sm:h-[400px] md:h-[600px] opacity-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      ></motion.div>

      {/* Auth Container */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 12 }}
        className="relative z-10 bg-black/70 p-6 sm:p-8 md:p-12 rounded-3xl shadow-[0_0_35px_rgba(236,72,153,0.7)] border border-pink-400 w-full max-w-xl text-center"
      >
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-pink-400 mb-8 sm:mb-10 drop-shadow-[0_0_25px_rgba(236,72,153,0.9)]">
          {title}
        </h1>

        {/* Card Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Login Card */}
          <motion.div
            whileHover={{ scale: 1.05, rotateY: 5 }}
            className="cursor-pointer bg-gradient-to-r from-purple-600 to-blue-700 p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-[0_0_35px_rgba(147,51,234,0.9)]"
            onClick={() => router.push("/login")}
          >
            <h2 className="text-lg sm:text-xl font-bold text-white mb-2">🔑 Login</h2>
            <p className="text-gray-200 text-xs sm:text-sm">
              Enter your portal and continue your multiverse journey.
            </p>
          </motion.div>

          {/* Signup Card */}
          <motion.div
            whileHover={{ scale: 1.05, rotateY: -5 }}
            className="cursor-pointer bg-gradient-to-r from-pink-600 to-red-700 p-4 sm:p-6 rounded-2xl shadow-lg hover:shadow-[0_0_35px_rgba(236,72,153,0.9)]"
            onClick={() => router.push("/signup")}
          >
            <h2 className="text-lg sm:text-xl font-bold text-white mb-2">🌟 Signup</h2>
            <p className="text-gray-200 text-xs sm:text-sm">
              Create a new timeline and start your adventure today.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
