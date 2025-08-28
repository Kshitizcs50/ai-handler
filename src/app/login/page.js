"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

// ✅ Custom Flicker Typewriter
function useTypewriter(text, speed = 80) {
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

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const title = useTypewriter("🌀 Enter the Multiverse – Login", 70);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();
      localStorage.setItem("token", data.token);
      router.push("/");
    } catch (err) {
      alert("Invalid login. Try again!");
    }
  };

  return (
    <main className="relative flex items-center justify-center h-screen overflow-hidden">
      {/* Swirling Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(60,0,120,0.9),rgba(0,0,0,1))] animate-pulse"></div>

      {/* Floating magical particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-purple-400 rounded-full"
          style={{
            width: Math.random() * 5 + "px",
            height: Math.random() * 5 + "px",
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
          }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Rotating Magical Circle */}
      <motion.div
        className="absolute border-2 border-purple-500 rounded-full w-[400px] h-[400px] opacity-30"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      ></motion.div>

      {/* Login Container */}
      <motion.div
        initial={{ y: "100vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 60, damping: 15 }}
        className="relative z-10 bg-black/70 p-10 rounded-2xl shadow-2xl border border-purple-500 w-[90%] max-w-md"
      >
        {/* Typewriter Title with Glow */}
        <h1 className="text-2xl font-extrabold text-purple-400 mb-6 text-center drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]">
          {title}
        </h1>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-2 rounded bg-gray-900/80 text-white border-2 border-purple-500 focus:ring-2 focus:ring-purple-400 outline-none transition"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            className="w-full px-4 py-2 rounded bg-gray-900/80 text-white border-2 border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none transition"
          />
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-purple-600 to-blue-700 rounded text-white font-bold tracking-wide shadow-lg hover:scale-105 transform transition hover:shadow-[0_0_25px_rgba(147,51,234,0.9)]"
          >
            LOGIN
          </button>
        </form>

        {/* Signup Redirect */}
        <p className="text-gray-400 text-sm mt-6 text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/signup")}
            className="text-purple-400 cursor-pointer hover:underline"
          >
            Signup
          </span>
        </p>
      </motion.div>
    </main>
  );
}
