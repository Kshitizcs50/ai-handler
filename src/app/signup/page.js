"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

// ✅ Custom Typewriter hook
function useTypewriter(text, speed = 100) {
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

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const title = useTypewriter("⚡ Become a Hero – Signup Now! ⚡", 70);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Signup failed");

      router.push("/login");
    } catch (err) {
      alert("Signup failed. Try again!");
    }
  };

  return (
    <main className="relative flex items-center justify-center h-screen overflow-hidden">
      {/* Cosmic Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-black to-red-900 animate-pulse opacity-80"></div>

      {/* Floating stars */}
      <div className="absolute w-full h-full">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + "px",
              height: Math.random() * 3 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Signup Container */}
      <motion.div
        initial={{ x: "100vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 60, damping: 20 }}
        className="relative z-10 bg-black/70 p-10 rounded-2xl shadow-2xl border border-red-500 w-[90%] max-w-md"
      >
        {/* Typewriter Heading */}
        <h1 className="text-2xl font-extrabold text-red-400 mb-6 text-center drop-shadow-md">
          {title}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-2 rounded bg-gray-900/80 text-white border-2 border-red-500 focus:ring-2 focus:ring-red-400 outline-none transition"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            className="w-full px-4 py-2 rounded bg-gray-900/80 text-white border-2 border-purple-500 focus:ring-2 focus:ring-purple-400 outline-none transition"
          />
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-red-600 to-purple-700 rounded text-white font-bold tracking-wide shadow-lg hover:scale-105 transform transition"
          >
            SIGNUP
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-6 text-center">
          Already a hero?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-red-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </motion.div>
    </main>
  );
}
