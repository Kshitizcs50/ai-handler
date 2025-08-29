"use client";
import React, { useState } from "react";
import RenderModel from "@/components/RenderModel";
import { Typewriter } from "react-simple-typewriter";
import { Spiderman } from "../models/spiderman";

function Photo2() {
  const [showDetails, setShowDetails] = useState(false);

  // Left Panel: Abilities
  const detailsLeft = [
    { name: "Wall-Crawling", description: "Can cling to walls and ceilings effortlessly." },
    { name: "Spider-Sense", description: "Danger detection that gives him quick reflexes." },
    { name: "Super Strength", description: "Capable of lifting cars and overpowering enemies." },
  ];

  // Right Panel: Gadgets
  const detailsRight = [
    { name: "Web Shooters", description: "Custom-built devices for web-slinging & trapping foes." },
    { name: "Spider Tracers", description: "Miniature tracking devices connected to spider-sense." },
    { name: "Stealth Suit", description: "Advanced suit with cloaking and enhanced mobility." },
  ];

  return (
    <div className="w-[1200px] h-[800px] flex flex-col items-center relative space-y-16">
      {/* 3D Model */}
      <RenderModel>
        <Spiderman />
      </RenderModel>

      {/* Hero Name */}
      <h1 className="absolute bottom-36 text-4xl font-extrabold text-red-500 drop-shadow-[0_0_20px_rgba(255,0,0,0.7)] tracking-wider">
  SPIDER-MAN
</h1>


      {/* Toggle button */}
      <div className="absolute right-12 bottom-30 z-10">
        {!showDetails ? (
          <button
            className="px-8 py-3 bg-gradient-to-r from-red-600 to-blue-600 text-white font-bold rounded-full shadow-2xl hover:scale-110 hover:shadow-red-500/50 transition-all duration-300"
            onClick={() => setShowDetails(true)}
          >
            Show Details
          </button>
        ) : (
          <button
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-full shadow-2xl hover:scale-110 hover:shadow-blue-500/50 transition-all duration-300"
            onClick={() => setShowDetails(false)}
          >
            Revoke
          </button>
        )}
      </div>

      {/* Panels */}
      {showDetails && (
        <>
          {/* Left Panel: Abilities */}
          <div className="absolute left-10 top-[38%] -translate-y-1/2 bg-gradient-to-br from-red-700/40 to-blue-700/40 backdrop-blur-xl p-6 rounded-2xl shadow-2xl w-80 border border-red-400/40 z-10">
            <h2 className="font-bold text-xl mb-4 text-red-300">Abilities</h2>
            {detailsLeft.map((d, idx) => (
              <div key={idx} className="mb-6">
                <h3 className="font-semibold text-lg text-white">{d.name}</h3>
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

          {/* Right Panel: Gadgets */}
          <div className="absolute right-10 top-[45%] -translate-y-1/2 bg-gradient-to-br from-blue-700/40 to-red-700/40 backdrop-blur-xl p-6 rounded-2xl shadow-2xl w-80 border border-blue-400/40 z-10">
            <h2 className="font-bold text-xl mb-4 text-blue-300">Gadgets</h2>
            {detailsRight.map((d, idx) => (
              <div key={idx} className="mb-6">
                <h3 className="font-semibold text-lg text-white">{d.name}</h3>
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

export default Photo2;
