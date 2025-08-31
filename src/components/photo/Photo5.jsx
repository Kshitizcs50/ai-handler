"use client";
import React, { useState } from "react";
import RenderModel from "@/components/RenderModel";
import { Typewriter } from "react-simple-typewriter";
import { Strange } from "../models/Strange";

function Photo5() {
  const [showDetails, setShowDetails] = useState(false);

  const detailsLeft = [
    {
      name: "Master of the Mystic Arts",
      description:
        "Harnesses spells, enchantments, and protective wards to manipulate mystical forces.",
    },
    {
      name: "Astral Projection",
      description:
        "Separates spirit from body, allowing exploration of astral planes and unseen realms.",
    },
    {
      name: "Time Manipulation",
      description:
        "Uses the Eye of Agamotto to bend, rewind, or loop time during battle.",
    },
  ];

  const detailsRight = [
    {
      name: "Eye of Agamotto",
      description:
        "A relic containing the Time Stone, enabling mastery over temporal dimensions.",
    },
    {
      name: "Cloak of Levitation",
      description:
        "Sentient cloak that grants flight, agility, and assists in combat defense.",
    },
    {
      name: "Book of Vishanti",
      description:
        "A mystical grimoire containing the most powerful protective spells in existence.",
    },
  ];

  return (
    <div className="flex flex-col items-center relative w-full min-h-screen p-4 space-y-12">
      {/* 3D Model */}
      <div className="w-full max-w-4xl h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
        <RenderModel>
          <Strange />
        </RenderModel>
      </div>

      {/* Hero Name */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-purple-400 drop-shadow-[0_0_30px_rgba(200,0,255,0.9)] tracking-widest text-center">
        DOCTOR STRANGE
      </h1>

      {/* Toggle Button */}
      <div className="z-10">
        {!showDetails ? (
          <button
            className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white font-bold rounded-full shadow-2xl hover:scale-105 hover:shadow-fuchsia-400/50 transition-all duration-300"
            onClick={() => setShowDetails(true)}
          >
            Reveal Secrets ✨
          </button>
        ) : (
          <button
            className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-red-700 via-orange-600 to-yellow-500 text-white font-bold rounded-full shadow-2xl hover:scale-105 hover:shadow-yellow-400/50 transition-all duration-300"
            onClick={() => setShowDetails(false)}
          >
            Hide Magic 🔮
          </button>
        )}
      </div>

      {/* Panels */}
      {showDetails && (
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-6xl px-2">
          {/* Left Panel: Mystic Arts */}
          <div className="bg-gradient-to-b from-purple-900/80 to-black/70 backdrop-blur-xl p-4 sm:p-6 rounded-2xl shadow-[0_0_40px_rgba(180,0,255,0.6)] w-full md:w-80 border border-purple-400/50">
            <h2 className="font-bold text-xl sm:text-2xl mb-4 text-fuchsia-300 text-center md:text-left tracking-wider">
              Mystic Arts
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

          {/* Right Panel: Artifacts */}
          <div className="bg-gradient-to-b from-indigo-900/80 to-black/70 backdrop-blur-xl p-4 sm:p-6 rounded-2xl shadow-[0_0_40px_rgba(100,0,255,0.6)] w-full md:w-80 border border-indigo-400/50">
            <h2 className="font-bold text-xl sm:text-2xl mb-4 text-indigo-300 text-center md:text-left tracking-wider">
              Artifacts
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

export default Photo5;
