"use client";
import React, { useState } from "react";
import RenderModel from "@/components/RenderModel";
import { Typewriter } from "react-simple-typewriter";
import { Thor } from "../models/Thor";

function Photo6() {
  const [showDetails, setShowDetails] = useState(false);

  const thorAbilities = [
    { name: "God of Thunder", description: "Channels immense lightning strikes and storm power." },
    { name: "Superhuman Strength", description: "Possesses unmatched Asgardian strength in battle." },
    { name: "Immortality", description: "As a god, Thor has an extended lifespan and durability." },
  ];

  const thorWeapons = [
    { name: "Mjolnir", description: "A magical hammer granting flight, lightning control, and immense power." },
    { name: "Stormbreaker", description: "A battle axe capable of summoning the Bifrost and devastating foes." },
    { name: "Asgardian Armor", description: "Armor forged in Asgard that protects against mystical and physical attacks." },
  ];

  return (
    <div className="flex flex-col items-center relative w-full min-h-screen p-4 space-y-12">
      {/* Lightning Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,255,0.15),transparent)] animate-pulse"></div>
      <div className="absolute inset-0 lightning-flicker"></div>

      {/* 3D Model */}
      <div className="w-full max-w-4xl h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
        <RenderModel>
          <Thor />
        </RenderModel>
      </div>

      {/* Hero Name */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-blue-400 drop-shadow-[0_0_35px_rgba(0,150,255,0.9)] tracking-widest text-center">
        THOR ⚡
      </h1>

      {/* Toggle Button */}
      <div className="z-10">
        {!showDetails ? (
          <button
            className="px-6 sm:px-10 py-2 sm:py-3 bg-gradient-to-r from-blue-700 via-cyan-500 to-indigo-600 text-white font-bold rounded-full shadow-2xl hover:scale-105 hover:shadow-cyan-400/60 transition-all duration-300"
            onClick={() => setShowDetails(true)}
          >
            Summon Lightning ⚡
          </button>
        ) : (
          <button
            className="px-6 sm:px-10 py-2 sm:py-3 bg-gradient-to-r from-yellow-600 via-orange-500 to-red-600 text-white font-bold rounded-full shadow-2xl hover:scale-105 hover:shadow-yellow-500/70 transition-all duration-300"
            onClick={() => setShowDetails(false)}
          >
            Hide Power 🌩️
          </button>
        )}
      </div>

      {/* Panels */}
      {showDetails && (
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-6xl px-2">
          {/* Abilities Panel */}
          <div className="bg-gradient-to-b from-blue-900/80 to-black/70 backdrop-blur-xl p-4 sm:p-6 rounded-2xl shadow-[0_0_45px_rgba(0,150,255,0.7)] w-full md:w-80 border border-cyan-400/50">
            <h2 className="font-bold text-xl sm:text-2xl mb-4 text-cyan-300 text-center md:text-left tracking-wider">
              Abilities
            </h2>
            {thorAbilities.map((d, idx) => (
              <div key={idx} className="mb-4 sm:mb-6">
                <h3 className="font-semibold text-lg text-yellow-300">{d.name}</h3>
                <p className="text-gray-200 text-sm">
                  <Typewriter
                    words={[d.description]}
                    loop={1}
                    cursor
                    cursorStyle="_"
                    typeSpeed={40}
                    deleteSpeed={30}
                    delaySpeed={1000}
                  />
                </p>
              </div>
            ))}
          </div>

          {/* Weapons Panel */}
          <div className="bg-gradient-to-b from-indigo-900/80 to-black/70 backdrop-blur-xl p-4 sm:p-6 rounded-2xl shadow-[0_0_45px_rgba(0,100,255,0.8)] w-full md:w-80 border border-blue-400/50">
            <h2 className="font-bold text-xl sm:text-2xl mb-4 text-indigo-300 text-center md:text-left tracking-wider">
              Weapons
            </h2>
            {thorWeapons.map((d, idx) => (
              <div key={idx} className="mb-4 sm:mb-6">
                <h3 className="font-semibold text-lg text-yellow-300">{d.name}</h3>
                <p className="text-gray-200 text-sm">
                  <Typewriter
                    words={[d.description]}
                    loop={1}
                    cursor
                    cursorStyle="_"
                    typeSpeed={40}
                    deleteSpeed={30}
                    delaySpeed={1000}
                  />
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lightning Flicker Animation */}
      <style jsx>{`
        @keyframes flicker {
          0% { opacity: 1; }
          20% { opacity: 0.3; }
          40% { opacity: 0.8; }
          60% { opacity: 0.2; }
          80% { opacity: 1; }
          100% { opacity: 0.5; }
        }
        .lightning-flicker {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, rgba(0,150,255,0.15) 20%, transparent 80%);
          mix-blend-mode: screen;
          animation: flicker 1.5s infinite;
        }
      `}</style>
    </div>
  );
}

export default Photo6;
