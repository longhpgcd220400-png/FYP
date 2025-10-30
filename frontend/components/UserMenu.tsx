"use client";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { FaUserCircle } from "react-icons/fa";

export default function UserMenu() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  if (!session?.user) return null;

  return (
    <div className="relative">
      {/* Nút user */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg 
                   bg-gradient-to-r from-pink-600 to-yellow-400
                   text-white font-semibold hover:shadow-lg transition"
      >
        <FaUserCircle className="text-xl" />
        <span>{session.user.name || "User"}</span>
        <svg
          className={`w-4 h-4 transform transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg bg-gray-900 border border-gray-700 shadow-xl z-50">
          <ul className="text-gray-200">
            <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">Public profile</li>
            <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">Account information</li>
            <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">Upgrade</li>
            <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">Notifications</li>
            <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">Comments</li>
            <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">Favorite lessons</li>
            <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">Change password</li>
            <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">Change email</li>
            <li
              className="px-4 py-2 text-red-400 hover:bg-gray-800 cursor-pointer border-t border-gray-700"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
