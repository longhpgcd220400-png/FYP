"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import InfoMenu from "./InforMenu";
import { usePathname } from "next/navigation";
import { toast } from "react-hot-toast";

// ✅ Mở rộng kiểu user để tránh lỗi TypeScript
interface ExtendedUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  provider?: string | null;
  username?: string;
}

export default function Navbar() {
  const { data: session } = useSession();
  const [openMenu, setOpenMenu] = useState(false);
  const [localUser, setLocalUser] = useState<ExtendedUser | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const pathname = usePathname();

  // ✅ Lấy user từ localStorage nếu không có session (tài khoản web)
  useEffect(() => {
    if (!session) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setLocalUser(JSON.parse(storedUser));
    }
  }, [session]);

  // ✅ Logout cho cả Google & local
  const handleLogout = async () => {
    if (session) {
      await signOut({ callbackUrl: "/" });
      toast.success("👋 Logged out successfully", {
        style: {
          background: "#dcfce7",
          color: "#166534",
          border: "1px solid #86efac",
        },
      });
    } else {
      localStorage.removeItem("user");
      toast.success("👋 Logged out successfully", {
        style: {
          background: "#dcfce7",
          color: "#166534",
          border: "1px solid #86efac",
        },
      });
      setTimeout(() => (window.location.href = "/"), 800);
    }
  };

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/lessons", label: "Lessons" },
    { href: "/progress", label: "Progress" },
    { href: "/about", label: "About" },
  ];

  const activeItem = hovered || pathname;

  // ✅ Kiểm tra nếu là user đăng nhập bằng mạng xã hội
  const user = session?.user as ExtendedUser;
  const isSocialLogin =
    user?.provider === "google" || user?.provider === "facebook";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-md border-b border-pink-500/40 shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* ✅ Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Daily HearWrite Logo"
            width={60}
            height={60}
            className="rounded-md"
          />
          <span className="text-2xl font-extrabold bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-md">
            Daily HearWrite
          </span>
        </Link>

        {/* ✅ Menu chính */}
        <div className="flex items-center gap-8 relative">
          {menuItems.map((item) => (
            <div
              key={item.href}
              onMouseEnter={() => setHovered(item.href)}
              onMouseLeave={() => setHovered(null)}
              className="relative"
            >
              <Link
                href={item.href}
                className={`text-pink-300 font-semibold text-lg transition-all duration-300 ${
                  pathname === item.href ? "text-white" : "hover:text-pink-400"
                }`}
              >
                {item.label}
              </Link>
              {activeItem === item.href && (
                <motion.div
                  layoutId="lightning-bar"
                  className="absolute left-0 right-0 -bottom-1 h-[3px] bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full shadow-[0_0_8px_#ff0080]"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </div>
          ))}
        </div>

        {/* ✅ User menu */}
        <div className="flex items-center gap-4">
          {user || localUser ? (
            <div className="relative">
              <button
                onClick={() => setOpenMenu(!openMenu)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-pink-400 text-pink-300 hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-400 hover:text-white transition-all duration-300"
              >
                <span>
                  {user?.name || user?.email || localUser?.username}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    openMenu ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-black/80 border border-pink-500/40 rounded-lg shadow-lg backdrop-blur-md overflow-hidden z-50">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-pink-300 hover:bg-pink-500/30 hover:text-white transition"
                  >
                    Public profile
                  </Link>

                  <Link
                    href="/profile/account"
                    className="block px-4 py-2 text-pink-300 hover:bg-pink-500/30 hover:text-white transition"
                  >
                    Account information
                  </Link>

                  <Link
                    href="/profile/notes"
                    className="block px-4 py-2 text-pink-300 hover:bg-pink-500/30 hover:text-white transition"
                  >
                    Notes
                  </Link>

                  {/* ✅ Chỉ hiển thị Change Password nếu user đăng nhập bằng tài khoản web */}
                  {!isSocialLogin && !user?.provider && (
                    <Link
                      href="/profile/change-password"
                      className="block px-4 py-2 text-pink-300 hover:bg-pink-500/30 hover:text-white transition"
                    >
                      Change password
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-500/30 hover:text-white transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/auth"
              className="px-6 py-2 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-semibold shadow-lg hover:opacity-90 transition"
            >
              Login
            </Link>
          )}
          <InfoMenu />
        </div>
      </div>
    </nav>
  );
}
