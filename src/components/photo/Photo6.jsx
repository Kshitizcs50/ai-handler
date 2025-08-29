"use client";
import React, { useState } from "react";
import RenderModel from "@/components/RenderModel";
import { Typewriter } from "react-simple-typewriter";
import { Thor } from "../models/Thor";

function Photo6() {
  const [showDetails, setShowDetails] = useState(false);

  // Thor Abilities
  const thorAbilities = [
    { name: "God of Thunder", description: "Channels immense lightning strikes and storm power." },
    { name: "Superhuman Strength", description: "Possesses unmatched Asgardian strength in battle." },
    { name: "Immortality", description: "As a god, Thor has an extended lifespan and durability." },
  ];

  // Thor Weapons
  const thorWeapons = [
    { name: "Mjolnir", description: "A magical hammer granting flight, lightning control, and immense power." },
    { name: "Stormbreaker", description: "A battle axe capable of summoning the Bifrost and devastating foes." },
    { name: "Asgardian Armor", description: "Armor forged in Asgard that protects against mystical and physical attacks." },
  ];

  return (
    <div className="w-[1200px] h-[900px] flex flex-col items-center relative space-y-20">
      {/* Lightning Background Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,255,0.15),transparent)] animate-pulse"></div>
      <div className="absolute inset-0 lightning-flicker"></div>

      {/* 3D Model */}
      
        
        <RenderModel>
          <Thor />
        </RenderModel>
     

      {/* Hero Name */}
      <h1 className="absolute bottom-44 right-9 text-6xl font-extrabold text-blue-400 drop-shadow-[0_0_35px_rgba(0,150,255,0.9)] tracking-widest">
        THOR ⚡
      </h1>

      {/* Toggle Button */}
      <div className="absolute right-12 bottom-32 z-10">
        {!showDetails ? (
          <button
            className="px-10 py-3 bg-gradient-to-r from-blue-700 via-cyan-500 to-indigo-600 text-white font-bold rounded-full shadow-2xl hover:scale-110 hover:shadow-cyan-400/60 transition-all duration-300"
            onClick={() => setShowDetails(true)}
          >
            Summon Lightning ⚡
          </button>
        ) : (
          <button
            className="px-10 py-3 bg-gradient-to-r from-yellow-600 via-orange-500 to-red-600 text-white font-bold rounded-full shadow-2xl hover:scale-110 hover:shadow-yellow-500/70 transition-all duration-300"
            onClick={() => setShowDetails(false)}
          >
            Hide Power 🌩️
          </button>
        )}
      </div>

      {/* Panels */}
      {showDetails && (
        <>
          {/* Left Panel: Abilities */}
          <div className="absolute left-14 top-[40%] -translate-y-1/2 bg-gradient-to-b from-blue-900/80 to-black/70 backdrop-blur-xl p-6 rounded-2xl shadow-[0_0_45px_rgba(0,150,255,0.7)] w-80 border border-cyan-400/50 z-10">
            <h2 className="font-bold text-2xl mb-6 text-cyan-300 tracking-wider">
              Abilities
            </h2>
            {thorAbilities.map((d, idx) => (
              <div key={idx} className="mb-6">
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

          {/* Right Panel: Weapons */}
          <div className="absolute right-10 top-[40%] -translate-y-1/2 bg-gradient-to-b from-indigo-900/80 to-black/70 backdrop-blur-xl p-6 rounded-2xl shadow-[0_0_45px_rgba(0,100,255,0.8)] w-80 border border-blue-400/50 z-10">
            <h2 className="font-bold text-2xl mb-6 text-indigo-300 tracking-wider">
              Weapons
            </h2>
            {thorWeapons.map((d, idx) => (
              <div key={idx} className="mb-6">
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
        </>
      )}

      {/* Custom Lightning Flicker Animation */}
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
