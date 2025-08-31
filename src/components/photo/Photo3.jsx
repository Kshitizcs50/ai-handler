"use client";
import React, { useState } from "react";
import RenderModel from "@/components/RenderModel";
import { Typewriter } from "react-simple-typewriter";
import { Thanos } from "../models/Thanos";

function Photo3() {
  const [showDetails, setShowDetails] = useState(false);

  const detailsLeft = [
    { name: "Superhuman Strength", description: "Thanos possesses immense physical power, capable of overpowering gods and titans." },
    { name: "Cosmic Energy Manipulation", description: "Harnesses vast cosmic energy for devastating attacks and defenses." },
    { name: "Genius-Level Intellect", description: "A master strategist, tactician, and scientist with deep knowledge of the universe." },
  ];

  const detailsRight = [
    { name: "Infinity Gauntlet", description: "Wielding all six Infinity Stones grants control over time, space, reality, power, mind, and soul." },
    { name: "Double-Edged Sword", description: "An indestructible weapon capable of cutting through vibranium and magical barriers." },
    { name: "Sanctuary II", description: "A massive warship carrying armies, used to dominate entire planets." },
  ];

  return (
    <div className="flex flex-col items-center relative w-full min-h-screen p-4 space-y-12">
      {/* 3D Model */}
      <div className="w-full max-w-4xl h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
        <RenderModel>
          <Thanos />
        </RenderModel>
      </div>

      {/* Hero Name */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-purple-400 drop-shadow-lg tracking-wide text-center">
        THANOS
      </h1>

      {/* Toggle Button */}
      <div className="z-10">
        {!showDetails ? (
          <button
            className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full shadow-2xl hover:scale-105 hover:shadow-purple-500/50 transition-all duration-300"
            onClick={() => setShowDetails(true)}
          >
            Show Details
          </button>
        ) : (
          <button
            className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-red-600 to-yellow-600 text-white font-bold rounded-full shadow-2xl hover:scale-105 hover:shadow-yellow-500/50 transition-all duration-300"
            onClick={() => setShowDetails(false)}
          >
            Revoke
          </button>
        )}
      </div>

      {/* Panels */}
      {showDetails && (
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-6xl px-2">
          {/* Left Panel: Abilities */}
          <div className="bg-gradient-to-b from-purple-900/70 to-black/60 backdrop-blur-xl p-4 sm:p-6 rounded-2xl shadow-2xl w-full md:w-80 border border-purple-400/40">
            <h2 className="font-bold text-xl sm:text-2xl mb-4 text-purple-300 text-center md:text-left tracking-wide">Abilities</h2>
            {detailsLeft.map((d, idx) => (
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

          {/* Right Panel: Weapons */}
          <div className="bg-gradient-to-b from-purple-900/70 to-black/60 backdrop-blur-xl p-4 sm:p-6 rounded-2xl shadow-2xl w-full md:w-80 border border-pink-400/40">
            <h2 className="font-bold text-xl sm:text-2xl mb-4 text-pink-300 text-center md:text-left tracking-wide">Weapons</h2>
            {detailsRight.map((d, idx) => (
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
    </div>
  );
}

export default Photo3;
