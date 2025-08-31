"use client";
import React, { useState } from "react";
import RenderModel from "@/components/RenderModel";
import { Typewriter } from "react-simple-typewriter";
import { Spiderman } from "../models/spiderman";

function Photo2() {
  const [showDetails, setShowDetails] = useState(false);

  const detailsLeft = [
    { name: "Wall-Crawling", description: "Can cling to walls and ceilings effortlessly." },
    { name: "Spider-Sense", description: "Danger detection that gives him quick reflexes." },
    { name: "Super Strength", description: "Capable of lifting cars and overpowering enemies." },
  ];

  const detailsRight = [
    { name: "Web Shooters", description: "Custom-built devices for web-slinging & trapping foes." },
    { name: "Spider Tracers", description: "Miniature tracking devices connected to spider-sense." },
    { name: "Stealth Suit", description: "Advanced suit with cloaking and enhanced mobility." },
  ];

  return (
    <div className="flex flex-col items-center relative w-full min-h-screen p-4 space-y-8">
      {/* 3D Model */}
      <div className="w-full max-w-4xl h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
        <RenderModel>
          <Spiderman />
        </RenderModel>
      </div>

      {/* Hero Name */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-red-500 drop-shadow-[0_0_20px_rgba(255,0,0,0.7)] tracking-wider text-center">
        SPIDER-MAN
      </h1>

      {/* Toggle Button */}
      <div className="z-10">
        {!showDetails ? (
          <button
            className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-red-600 to-blue-600 text-white font-bold rounded-full shadow-2xl hover:scale-105 hover:shadow-red-500/50 transition-all duration-300"
            onClick={() => setShowDetails(true)}
          >
            Show Details
          </button>
        ) : (
          <button
            className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-full shadow-2xl hover:scale-105 hover:shadow-blue-500/50 transition-all duration-300"
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
          <div className="bg-gradient-to-br from-red-700/40 to-blue-700/40 backdrop-blur-xl p-4 sm:p-6 rounded-2xl shadow-2xl w-full md:w-80 border border-red-400/40">
            <h2 className="font-bold text-xl mb-4 text-red-300 text-center md:text-left">Abilities</h2>
            {detailsLeft.map((d, idx) => (
              <div key={idx} className="mb-4 sm:mb-6">
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
          <div className="bg-gradient-to-br from-blue-700/40 to-red-700/40 backdrop-blur-xl p-4 sm:p-6 rounded-2xl shadow-2xl w-full md:w-80 border border-blue-400/40">
            <h2 className="font-bold text-xl mb-4 text-blue-300 text-center md:text-left">Gadgets</h2>
            {detailsRight.map((d, idx) => (
              <div key={idx} className="mb-4 sm:mb-6">
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
        </div>
      )}
    </div>
  );
}

export default Photo2;
