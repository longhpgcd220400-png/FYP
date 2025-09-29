"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="relative w-16 h-8 rounded-full overflow-hidden shadow-md transition-all duration-500"
    >
      {/* Background */}
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          dark
            ? "bg-gradient-to-r from-gray-800 to-gray-900" // Night
            : "bg-gradient-to-r from-sky-300 to-sky-500" // Day
        }`}
      >
        {/* Stars */}
        {dark && (
          <>
            <div className="absolute top-1 left-2 text-white text-[8px] animate-pulse">✦</div>
            <div className="absolute top-2 left-6 text-white text-[6px] animate-ping">✧</div>
            <div className="absolute bottom-1 right-3 text-white text-[7px] animate-pulse">✦</div>
          </>
        )}

        {/* Clouds */}
        {!dark && (
          <>
            <div className="absolute bottom-0 left-0 w-6 h-3 bg-white rounded-full opacity-90 animate-[cloudMove_6s_linear_infinite]"></div>
            <div className="absolute bottom-0 left-4 w-8 h-4 bg-white rounded-full opacity-90 animate-[cloudMove_10s_linear_infinite]"></div>
            <div className="absolute bottom-0 right-0 w-6 h-3 bg-white rounded-full opacity-90 animate-[cloudMove_8s_linear_infinite]"></div>
          </>
        )}
      </div>

      {/* Toggle circle (Sun / Moon) */}
      <div
        className={`absolute top-0.5 w-7 h-7 rounded-full shadow-md transition-all duration-500 flex items-center justify-center ${
          dark
            ? "translate-x-8 bg-gray-300 drop-shadow-[0_0_12px_rgba(200,200,255,0.9)] animate-pulse"
            : "translate-x-0.5 bg-yellow-400 drop-shadow-[0_0_15px_rgba(255,200,0,1)] animate-pulse"
        }`}
      >
        {/* Halo Glow */}
        <div
          className={`absolute w-12 h-12 rounded-full animate-ping ${
            dark
              ? "bg-[radial-gradient(circle,rgba(200,200,255,0.5)_0%,transparent_70%)]"
              : "bg-[radial-gradient(circle,rgba(255,220,100,0.6)_0%,transparent_70%)]"
          }`}
        ></div>

        {dark ? (
          // 🌙 Moon
          <div className="relative w-full h-full rounded-full bg-gray-200">
            <div className="absolute top-1 left-1 w-1 h-1 bg-gray-400 rounded-full opacity-70"></div>
            <div className="absolute bottom-1 right-1 w-1 h-1 bg-gray-400 rounded-full opacity-60"></div>
          </div>
        ) : (
          // ☀️ Sun
          <div className="relative w-full h-full rounded-full bg-yellow-400">
            <div className="absolute top-1 left-1 w-1 h-1 bg-yellow-600 rounded-full opacity-50"></div>
            <div className="absolute bottom-1 right-2 w-1 h-1 bg-yellow-600 rounded-full opacity-40"></div>
          </div>
        )}
      </div>
    </button>
  );
}
