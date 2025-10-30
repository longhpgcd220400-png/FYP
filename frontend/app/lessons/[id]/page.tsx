"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LessonsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // chỉ chạy khi đã load client
  }, []);

  const cards = [
    {
      title: "IELTS Listening Practice",
      desc: "Sharpen your IELTS listening skills with daily dictations.",
      img: "/ielts.png",
      href: "/lessons/ielts",
    },
    {
      title: "TOEIC Listening",
      desc: "Improve TOEIC Part 1-4 with authentic exercises.",
      img: "/toeic.png",
      href: "/lessons/toeic",
    },
    {
      title: "TOEFL Dictation",
      desc: "Boost your TOEFL skills by practicing listening & writing.",
      img: "/toefl.png",
      href: "/lessons/toefl",
    },
    {
      title: "YouTube English",
      desc: "Learn English naturally from real YouTube videos.",
      img: "/youtube.png",
      href: "/lessons/youtube",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white">
      {/* Background bubbles chỉ render khi client đã mount */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="bubble w-40 h-40 top-20 left-10"></div>
          <div className="bubble w-32 h-32 top-60 right-20"></div>
          <div className="bubble w-56 h-56 bottom-10 left-1/3"></div>
        </div>
      )}

      {/* LESSONS HEADER */}
      <section className="relative z-10 pt-32 pb-12 px-8 w-full text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl font-extrabold bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg mb-6"
        >
          Lessons
        </motion.h1>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg">
          Select your learning path and start practicing English dictation with
          Daily HearWrite. Choose from IELTS, TOEIC, TOEFL or YouTube-based
          lessons.
        </p>
      </section>

      {/* CARDS GRID */}
      <section className="relative z-10 pb-20 px-8 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="relative h-80 rounded-2xl overflow-hidden border border-pink-500/40 
                         hover:scale-105 hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] 
                         transition-transform duration-500 bg-black/40"
              style={{
                backgroundImage: `url(${card.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/50"></div>
              <div className="relative z-10 flex flex-col justify-end h-full p-6 text-center">
                <h3 className="text-2xl font-bold text-pink-300 drop-shadow-md">
                  {card.title}
                </h3>
                <p className="text-gray-300 mt-2 text-sm">{card.desc}</p>
                <Link
                  href={card.href}
                  className="mt-4 inline-block px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-semibold shadow hover:scale-105 transition"
                >
                  Start
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
