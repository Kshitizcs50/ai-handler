"use client";
import React, { useState } from "react";
import RenderModel from "@/components/RenderModel";
import { Model } from "../models/doom";
import { Typewriter } from "react-simple-typewriter";

function Photohub() {
  const [showDetails, setShowDetails] = useState(false);

  const detailsLeft = [
    { name: "Armor System", description: "High-tech armor with enhanced durability." },
    { name: "Energy Core", description: "Power source for all combat functions." },
  ];

  const detailsRight = [
    { name: "Weapon Module", description: "Equipped with plasma blasters and rockets." },
    { name: "Targeting System", description: "Advanced AI-assisted targeting sensors." },
  ];

  return (
    <div className="flex flex-col items-center relative w-full min-h-screen p-4 space-y-12">
      {/* 3D Model */}
      <div className="w-full max-w-4xl h-[400px] sm:h-[500px] md:h-[600px]">
        <RenderModel>
          <Model />
        </RenderModel>
      </div>

      {/* Toggle Button */}
      <div className="w-full flex justify-end mb-4">
        {!showDetails ? (
          <button
            className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-full shadow-2xl hover:scale-105 hover:shadow-red-500/50 transition-all duration-300"
            onClick={() => setShowDetails(true)}
          >
            Show Systems
          </button>
        ) : (
          <button
            className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-gray-700 to-black text-white font-bold rounded-full shadow-2xl hover:scale-105 hover:shadow-gray-700/50 transition-all duration-300"
            onClick={() => setShowDetails(false)}
          >
            Revoke
          </button>
        )}
      </div>

      {/* Panels */}
      {showDetails && (
        <div className="flex flex-col md:flex-row items-start justify-center gap-6 w-full max-w-6xl px-2">
          {/* Left Panel */}
          <div className="bg-gradient-to-b from-red-900/40 to-black/60 backdrop-blur-xl p-4 sm:p-6 rounded-2xl shadow-2xl w-full md:w-80 border border-red-500/30">
            <h2 className="font-bold text-xl mb-4 text-red-400 text-center md:text-left">
              Armor Systems
            </h2>
            {detailsLeft.map((d, idx) => (
              <div key={idx} className="mb-4 sm:mb-6">
                <h3 className="font-semibold text-lg text-orange-300">{d.name}</h3>
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

          {/* Right Panel */}
          <div className="bg-gradient-to-b from-red-900/40 to-black/60 backdrop-blur-xl p-4 sm:p-6 rounded-2xl shadow-2xl w-full md:w-80 border border-red-500/30">
            <h2 className="font-bold text-xl mb-4 text-red-400 text-center md:text-left">
              Weapon Systems
            </h2>
            {detailsRight.map((d, idx) => (
              <div key={idx} className="mb-4 sm:mb-6">
                <h3 className="font-semibold text-lg text-orange-300">{d.name}</h3>
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

export default Photohub;
