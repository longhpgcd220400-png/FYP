"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Facebook, Instagram, Youtube, Mail, Github } from "lucide-react";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="mt-20 relative overflow-hidden bg-black/70 backdrop-blur-md border-t border-pink-500/40 text-pink-200 shadow-[0_0_25px_#ff80bf40]"
    >
      {/* 🔮 Hiệu ứng glow động quanh viền */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-yellow-400/10 to-pink-500/20 blur-2xl opacity-60 animate-pulse pointer-events-none" />

      <div className="relative container mx-auto px-6 py-10">
        {/* --- Top Section --- */}
        <div className="grid md:grid-cols-3 gap-10 text-center md:text-left">
          {/* Logo & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_#ff80bf90]">
              Daily HearWrite
            </h2>
            <p className="mt-3 text-sm text-pink-300">
              Improve your English every day through listening, writing, and AI-based learning tools.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "Lessons", "Progress", "About"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="hover:text-yellow-400 hover:drop-shadow-[0_0_5px_#facc15] transition"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-lg font-semibold text-white mb-3">Connect with us</h3>
            <div className="flex justify-center md:justify-start gap-4">
              <Link href="https://facebook.com" target="_blank" className="hover:text-yellow-400 transition">
                <Facebook size={22} />
              </Link>
              <Link href="https://instagram.com" target="_blank" className="hover:text-yellow-400 transition">
                <Instagram size={22} />
              </Link>
              <Link href="https://youtube.com" target="_blank" className="hover:text-yellow-400 transition">
                <Youtube size={22} />
              </Link>
              <Link href="mailto:contact@dailyhearwrite.com" className="hover:text-yellow-400 transition">
                <Mail size={22} />
              </Link>
              <Link href="https://github.com" target="_blank" className="hover:text-yellow-400 transition">
                <Github size={22} />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="my-8 border-t border-pink-500/30 shadow-[0_0_10px_#ff80bf40]"
        />

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-sm text-pink-400"
        >
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-white">Daily HearWrite</span>. All rights reserved.
        </motion.p>
      </div>
    </motion.footer>
  );
}
