"use client";
import React, { useState } from "react";
import RenderModel from "@/components/RenderModel";
import { Typewriter } from "react-simple-typewriter";
import { Strange } from "../models/Strange";

function Photo5() {
  const [showDetails, setShowDetails] = useState(false);

  // Left Panel: Abilities
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

  // Right Panel: Magical Artifacts
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
    <div className="w-[1200px] h-[900px] flex flex-col items-center relative space-y-20">
      {/* 3D Model */}
      <RenderModel>
        <Strange />
      </RenderModel>

      {/* Hero Name */}
      <h1 className="absolute bottom-44 right-9 text-5xl font-extrabold text-purple-400 drop-shadow-[0_0_30px_rgba(200,0,255,0.9)] tracking-widest">
        DOCTOR STRANGE
      </h1>

      {/* Toggle Button */}
      <div className="absolute right-12 bottom-32 z-10">
        {!showDetails ? (
          <button
            className="px-8 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white font-bold rounded-full shadow-2xl hover:scale-110 hover:shadow-fuchsia-400/50 transition-all duration-300"
            onClick={() => setShowDetails(true)}
          >
            Reveal Secrets ✨
          </button>
        ) : (
          <button
            className="px-8 py-3 bg-gradient-to-r from-red-700 via-orange-600 to-yellow-500 text-white font-bold rounded-full shadow-2xl hover:scale-110 hover:shadow-yellow-400/50 transition-all duration-300"
            onClick={() => setShowDetails(false)}
          >
            Hide Magic 🔮
          </button>
        )}
      </div>

      {/* Panels */}
      {showDetails && (
        <>
          {/* Left Panel: Abilities */}
          <div className="absolute left-14 top-[40%] -translate-y-1/2 bg-gradient-to-b from-purple-900/80 to-black/70 backdrop-blur-xl p-6 rounded-2xl shadow-[0_0_40px_rgba(180,0,255,0.6)] w-80 border border-purple-400/50 z-10">
            <h2 className="font-bold text-2xl mb-6 text-fuchsia-300 tracking-wider">
              Mystic Arts
            </h2>
            {detailsLeft.map((d, idx) => (
              <div key={idx} className="mb-6">
                <h3 className="font-semibold text-lg text-yellow-300">
                  {d.name}
                </h3>
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
          <div className="absolute right-10 top-[40%] -translate-y-1/2 bg-gradient-to-b from-indigo-900/80 to-black/70 backdrop-blur-xl p-6 rounded-2xl shadow-[0_0_40px_rgba(100,0,255,0.6)] w-80 border border-indigo-400/50 z-10">
            <h2 className="font-bold text-2xl mb-6 text-indigo-300 tracking-wider">
              Artifacts
            </h2>
            {detailsRight.map((d, idx) => (
              <div key={idx} className="mb-6">
                <h3 className="font-semibold text-lg text-yellow-300">
                  {d.name}
                </h3>
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

export default Photo5;
