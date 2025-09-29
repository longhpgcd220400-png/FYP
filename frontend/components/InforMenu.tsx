"use client";

import { useState } from "react";
import { Facebook, Instagram, Youtube, Info, X } from "lucide-react";
import Link from "next/link";

export default function InfoMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
  onClick={() => setOpen(!open)}
  className={`w-10 h-10 flex items-center justify-center rounded-full 
    border-1 transition-all duration-500 
    ${
      open
        ? "bg-gradient-to-r from-[#30cfd0] to-[#330867] border-transparent text-white rotate-180"
        : "border-[#30cfd0] text-[#30cfd0] hover:bg-gradient-to-r hover:from-[#30cfd0] hover:to-[#330867] hover:text-white"
    }
    ${
      open
        ? "dark:bg-gradient-to-r dark:from-[#30cfd0] dark:to-[#330867] dark:border-transparent dark:text-white"
        : "dark:border-[#30cfd0] dark:text-[#30cfd0] dark:hover:bg-gradient-to-r dark:hover:from-[#30cfd0] dark:hover:to-[#330867] dark:hover:text-white"
    }`}
>
      {open ? <X size={20} /> : <Info size={20} />}
    </button>


      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 mt-3 w-52 rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 origin-top 
          ${open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"} 
          bg-gray-900 dark:bg-gray-900`}
      >
        <div className="flex flex-col p-4 gap-3">
          <Link
            href="https://facebook.com"
            target="_blank"
            className="flex items-center gap-3 hover:translate-x-1 transition-transform"
          >
            <Facebook size={20} className="text-blue-600" />
            <span className="text-blue-600 font-medium">Facebook</span>
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            className="flex items-center gap-3 hover:translate-x-1 transition-transform"
          >
            <Instagram
              size={20}
              className="text-pink-500"
            />
            <span className="text-pink-500 font-medium">Instagram</span>
          </Link>
          <Link
            href="https://youtube.com"
            target="_blank"
            className="flex items-center gap-3 hover:translate-x-1 transition-transform"
          >
            <Youtube size={20} className="text-red-600" />
            <span className="text-red-600 font-medium">YouTube</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
