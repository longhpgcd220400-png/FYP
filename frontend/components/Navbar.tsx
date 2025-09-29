"use client";

import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import InfoMenu from "./InforMenu";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState<{ id: string; email: string; username?: string } | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <nav
      className="sticky top-0 z-50 transition-colors duration-300 
                 bg-gray-900 dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700"
    >
      <div className="container mx-auto flex justify-between items-center py-5">
        {/* Logo + tên thương hiệu */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Daily HearWrite Logo"
            width={80}
            height={80}
            className="rounded-md"
            priority
          />
          <span
            className="text-3xl font-extrabold 
                       bg-gradient-to-r from-[#30cfd0] to-[#330867] 
                       bg-clip-text text-transparent 
                       drop-shadow-[0_0_8px_#30cfd0] 
                       hover:drop-shadow-[0_0_12px_#330867] 
                       transition-all duration-500"
          >
            Daily HearWrite
          </span>
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-4">
          {[
            { href: "/lessons", label: "Lessons" },
            { href: "/progress", label: "Progress" },
            { href: "/about", label: "About" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 rounded-lg 
                         border border-[#30cfd0] 
                         text-[#30cfd0] 
                         hover:bg-gradient-to-r hover:from-[#30cfd0] hover:to-[#330867] 
                         hover:text-white 
                         transition-all duration-300"
            >
              {item.label}
            </Link>
          ))}

          {/* Nút Info và Dark Mode */}
          <InfoMenu />
          <ThemeToggle />

          {/* Login / Logout */}
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-[#30cfd0] font-semibold">
                {user.username || user.email}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg 
                           bg-gradient-to-r from-red-500 to-red-700 
                           text-white font-semibold 
                           hover:opacity-90 transition-all duration-300 shadow-md"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/auth"
              className="px-6 py-2 rounded-lg 
                         border border-[#30cfd0] 
                         text-[#30cfd0] 
                         hover:bg-gradient-to-r hover:from-[#30cfd0] hover:to-[#330867] 
                         hover:text-white 
                         transition-all duration-300 font-semibold shadow-md"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
