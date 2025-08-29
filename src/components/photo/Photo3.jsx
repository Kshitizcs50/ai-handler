"use client";
import React, { useState } from "react";
import RenderModel from "@/components/RenderModel";
import { Typewriter } from "react-simple-typewriter";
import { Thanos } from "../models/Thanos";

function Photo3() {
  const [showDetails, setShowDetails] = useState(false);

  // Left Panel: Abilities
  const detailsLeft = [
    { name: "Superhuman Strength", description: "Thanos possesses immense physical power, capable of overpowering gods and titans." },
    { name: "Cosmic Energy Manipulation", description: "Harnesses vast cosmic energy for devastating attacks and defenses." },
    { name: "Genius-Level Intellect", description: "A master strategist, tactician, and scientist with deep knowledge of the universe." },
  ];

  // Right Panel: Gadgets / Weapons
  const detailsRight = [
    { name: "Infinity Gauntlet", description: "Wielding all six Infinity Stones grants control over time, space, reality, power, mind, and soul." },
    { name: "Double-Edged Sword", description: "An indestructible weapon capable of cutting through vibranium and magical barriers." },
    { name: "Sanctuary II", description: "A massive warship carrying armies, used to dominate entire planets." },
  ];

  return (
    <div className="w-[1200px] h-[900px] flex flex-col items-center relative space-y-20">
      {/* 3D Model */}
      <RenderModel>
        <Thanos />
      </RenderModel>

      {/* Big Name Under Model */}
       <h1 className="absolute bottom-44 right-9 text-4xl font-extrabold text-purple-400 drop-shadow-lg tracking-wide">
        THANOS
      </h1>

      {/* Toggle button */}
      <div className="absolute right-12 bottom-32 z-10">
        {!showDetails ? (
          <button
            className="px-7 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full shadow-2xl hover:scale-110 hover:shadow-purple-500/50 transition-all duration-300"
            onClick={() => setShowDetails(true)}
          >
            Show Details
          </button>
        ) : (
          <button
            className="px-8 py-3 bg-gradient-to-r from-red-600 to-yellow-600 text-white font-bold rounded-full shadow-2xl hover:scale-110 hover:shadow-yellow-500/50 transition-all duration-300"
            onClick={() => setShowDetails(false)}
          >
            Revoke
          </button>
        )}
      </div>

      {/* Left and Right Panels */}
      {showDetails && (
        <>
          {/* Left Panel: Abilities */}
          <div className="absolute left-14 top-[40%] -translate-y-1/2 bg-gradient-to-b from-purple-900/70 to-black/60 backdrop-blur-xl p-6 rounded-2xl shadow-2xl w-80 border border-purple-400/40 z-10">
            <h2 className="font-bold text-2xl mb-6 text-purple-300 tracking-wide">Abilities</h2>
            {detailsLeft.map((d, idx) => (
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
          <div className="absolute right-10 top-[40%] -translate-y-1/2 bg-gradient-to-b from-purple-900/70 to-black/60 backdrop-blur-xl p-6 rounded-2xl shadow-2xl w-80 border border-pink-400/40 z-10">
            <h2 className="font-bold text-2xl mb-6 text-pink-300 tracking-wide">Weapons</h2>
            {detailsRight.map((d, idx) => (
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
    </div>
  );
}

export default Photo3;
