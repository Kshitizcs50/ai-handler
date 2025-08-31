"use client";
import React, { useState } from "react";
import RenderModel from "@/components/RenderModel";
import { Typewriter } from "react-simple-typewriter";
import { Iron } from "../models/iron";

function Photo4() {
  const [showDetails, setShowDetails] = useState(false);

  const detailsLeft = [
    {
      name: "Powered Armor Suit",
      description:
        "Provides superhuman strength, durability, flight, and advanced weaponry.",
    },
    {
      name: "Genius-Level Intellect",
      description:
        "Master engineer, inventor, and strategist with cutting-edge tech knowledge.",
    },
    {
      name: "AI Assistance",
      description:
        "Integrated AI (like J.A.R.V.I.S & F.R.I.D.A.Y.) enhances combat and strategy.",
    },
  ];

  const detailsRight = [
    {
      name: "Repulsor Blasts",
      description:
        "Energy beams fired from his palms, capable of devastating precision attacks.",
    },
    {
      name: "Unibeam",
      description:
        "Chest-mounted energy cannon that delivers a concentrated energy blast.",
    },
    {
      name: "Nanotech Armor",
      description:
        "Bleeding Edge suit with instant deployment, adaptability, and regeneration.",
    },
  ];

  return (
    <div className="flex flex-col items-center relative w-full min-h-screen p-4 space-y-12">
      {/* 3D Model */}
      <div className="w-full max-w-4xl h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
        <RenderModel>
          <Iron />
        </RenderModel>
      </div>

      {/* Hero Name */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-400 drop-shadow-[0_0_25px_rgba(0,200,255,0.9)] tracking-widest text-center">
        IRON MAN
      </h1>

      {/* Toggle Button */}
      <div className="z-10">
        {!showDetails ? (
          <button
            className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-full shadow-2xl hover:scale-105 hover:shadow-cyan-400/50 transition-all duration-300"
            onClick={() => setShowDetails(true)}
          >
            Show Details
          </button>
        ) : (
          <button
            className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-red-600 to-yellow-500 text-white font-bold rounded-full shadow-2xl hover:scale-105 hover:shadow-yellow-400/50 transition-all duration-300"
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
          <div className="bg-gradient-to-b from-blue-900/80 to-black/70 backdrop-blur-xl p-4 sm:p-6 rounded-2xl shadow-2xl w-full md:w-80 border border-cyan-400/40">
            <h2 className="font-bold text-xl sm:text-2xl mb-4 text-cyan-300 text-center md:text-left tracking-wide">
              Abilities
            </h2>
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
          <div className="bg-gradient-to-b from-blue-900/80 to-black/70 backdrop-blur-xl p-4 sm:p-6 rounded-2xl shadow-2xl w-full md:w-80 border border-blue-400/40">
            <h2 className="font-bold text-xl sm:text-2xl mb-4 text-blue-300 text-center md:text-left tracking-wide">
              Weapons
            </h2>
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

export default Photo4;
