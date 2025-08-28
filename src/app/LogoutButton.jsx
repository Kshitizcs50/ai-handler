"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token"); // clear JWT
    router.push("/auth"); // redirect to Auth
  };

  return (
    <div className="fixed top-6 left-6 z-50">
      <motion.button
        onClick={handleLogout}
        whileHover={{ scale: 1.15, boxShadow: "0px 0px 30px rgba(0,255,255,0.3)" }}
        whileTap={{ scale: 0.9, rotate: -4 }}
        className="relative px-6 py-3 rounded-lg font-extrabold text-gray-200 tracking-wider
                   bg-gradient-to-r from-gray-900 via-gray-800 to-black
                   border border-cyan-900 shadow-[0_0_15px_rgba(0,255,255,0.1)]
                   overflow-hidden group"
      >
        {/* Dark Aura */}
        <span className="absolute inset-0 bg-gradient-to-r from-cyan-900 to-gray-900 opacity-20 blur-2xl group-hover:opacity-40 transition"></span>

        {/* Text */}
        <span className="relative z-10 flex items-center gap-2">
          🌓 Logout
        </span>

        {/* Subtle Energy Lines */}
        <motion.span
          className="absolute top-0 left-0 w-full h-[2px] bg-cyan-700 opacity-30"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity }}
        ></motion.span>
        <motion.span
          className="absolute bottom-0 left-0 w-full h-[2px] bg-purple-800 opacity-30"
          animate={{ x: ["100%", "-100%"] }}
          transition={{ duration: 3, repeat: Infinity }}
        ></motion.span>
      </motion.button>
    </div>
  );
}
