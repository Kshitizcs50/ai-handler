"use client";
import React, { useState } from "react";
import RenderModel from "@/components/RenderModel";
import { Model } from "../models/doom";
import { Typewriter } from "react-simple-typewriter";

function Photohub() {
  const [showDetails, setShowDetails] = useState(false);

  // Left Systems
  const detailsLeft = [
    { name: "Armor System", description: "High-tech armor with enhanced durability." },
    { name: "Energy Core", description: "Power source for all combat functions." },
  ];

  // Right Systems
  const detailsRight = [
    { name: "Weapon Module", description: "Equipped with plasma blasters and rockets." },
    { name: "Targeting System", description: "Advanced AI-assisted targeting sensors." },
  ];

  return (
    <div className="relative w-[1200px] h-[900px] flex flex-col items-center justify-center">
      {/* 3D Model */}
      <RenderModel>
        <Model />
      </RenderModel>

     {/* Toggle button (moved to top-right) */}
<div className="absolute right-16 top-10 z-10">
  {!showDetails ? (
    <button
      className="px-8 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-full shadow-2xl hover:scale-110 hover:shadow-red-500/50 transition-all duration-300"
      onClick={() => setShowDetails(true)}
    >
      Show Systems
    </button>
  ) : (
    <button
      className="px-8 py-3 bg-gradient-to-r from-gray-700 to-black text-white font-bold rounded-full shadow-2xl hover:scale-110 hover:shadow-gray-700/50 transition-all duration-300"
      onClick={() => setShowDetails(false)}
    >
      Revoke
    </button>
  )}
</div>

      {/* Left and Right Panels */}
      {showDetails && (
        <>
          {/* Left Panel */}
          <div className="absolute left-10 top-[40%] -translate-y-1/2 bg-gradient-to-b from-red-900/40 to-black/60 backdrop-blur-xl p-6 rounded-2xl shadow-2xl w-80 border border-red-500/30 z-10">
            <h2 className="font-bold text-xl mb-4 text-red-400">Armor Systems</h2>
            {detailsLeft.map((d, idx) => (
              <div key={idx} className="mb-6">
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
          <div className="absolute right-10 top-[40%] -translate-y-1/2 bg-gradient-to-b from-red-900/40 to-black/60 backdrop-blur-xl p-6 rounded-2xl shadow-2xl w-80 border border-red-500/30 z-10">
            <h2 className="font-bold text-xl mb-4 text-red-400">Weapon Systems</h2>
            {detailsRight.map((d, idx) => (
              <div key={idx} className="mb-6">
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
        </>
      )}
    </div>
  );
}

export default Photohub;
