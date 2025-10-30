"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaLinkedinIn,
  FaVk,
  FaWeibo,
  FaInfo,
} from "react-icons/fa";

export default function InfoMenu() {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const icons = [
    {
      name: "Facebook",
      icon: <FaFacebookF />,
      link: "https://facebook.com",
      color: "bg-blue-500",
      textColor: "text-blue-400",
    },
    {
      name: "Twitter",
      icon: <FaTwitter />,
      link: "https://twitter.com",
      color: "bg-black",
      textColor: "text-gray-300",
    },
    {
      name: "Pinterest",
      icon: <FaPinterestP />,
      link: "https://pinterest.com",
      color: "bg-red-600",
      textColor: "text-red-400",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn />,
      link: "https://linkedin.com",
      color: "bg-blue-700",
      textColor: "text-blue-400",
    },
    {
      name: "VK",
      icon: <FaVk />,
      link: "https://vk.com",
      color: "bg-blue-400",
      textColor: "text-blue-300",
    },
    
  ];

  return (
    <div
      className="fixed top-[120%] right-6 flex flex-col items-center gap-2 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoveredIcon(null);
      }}
    >
      {/* Nút chính */}
      <motion.div
        whileHover={{ rotate: 90 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="p-3 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 text-white shadow-lg cursor-pointer hover:scale-110 transition"
      >
        <FaInfo size={15} />
      </motion.div>

      {/* Các icon */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-end gap-3 mt-2"
          >
            {icons.map((item, i) => (
              <motion.a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onMouseEnter={() => setHoveredIcon(item.name)}
                onMouseLeave={() => setHoveredIcon(null)}
                className={`group relative flex items-center gap-2 p-3 rounded-full text-white shadow-md hover:scale-110 backdrop-blur-md border border-pink-400/30 transition ${item.color}`}
              >
                {/* Tooltip chữ */}
                <AnimatePresence>
                  {hoveredIcon === item.name && (
                    <motion.span
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.25 }}
                      className={`absolute right-14 font-medium ${item.textColor} bg-black/70 px-3 py-1 rounded-md shadow-lg whitespace-nowrap`}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>

                {item.icon}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
