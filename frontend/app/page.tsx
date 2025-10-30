"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const cards = [
    { title: "IELTS", img: "/ielts.png", desc: "Practice IELTS Listening & Writing" },
    { title: "TOEIC", img: "/toeic.png", desc: "Improve TOEIC skills with exercises" },
    { title: "TOEFL", img: "/toefl.png", desc: "Boost your TOEFL preparation" },
    { title: "YouTube", img: "/youtube.png", desc: "Learn English from real videos" },
  ];

  

  const steps = [
    {
      title: "1. Listen to the audio",
      desc: "Through the exercises, you will have to listen a lot; that's the key to improving your listening skills in any learning method.",
      img: "/Listen.png",
    },
    {
      title: "2. Type what you hear",
      desc: "Typing what you hear forces you to focus on every detail which helps you become better at pronunciation, spelling and writing.",
      img: "/type.png",
    },
    {
      title: "3. Check & correct",
      desc: "Error correction is important for your listening accuracy and reading comprehension, it's best to learn from mistakes.",
      img: "/icon.png",
    },
    {
      title: "4. Read it out loud",
      desc: "After completing a sentence, try to read it out loud, it will greatly improve your pronunciation & speaking skills!",
      img: "/speak.png",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Bubbles */}
      <div className="bubble w-32 h-32 top-20 left-10"></div>
      <div className="bubble w-20 h-20 top-60 left-1/3"></div>
      <div className="bubble w-40 h-40 top-40 right-20"></div>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen text-center relative z-10 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl font-extrabold bg-gradient-to-r from-pink-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg"
        >
          Welcome to Daily HearWrite
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-6 text-lg text-gray-300 max-w-3xl"
        >
          Improve your English listening and dictation skills with daily practice.
          Learn by listening and writing down what you hear.
        </motion.p>

        <div className="mt-8 flex gap-6">
          <Link
            href="/lessons"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow-lg hover:opacity-90 transition"
          >
            Start Lessons
          </Link>
          <Link
            href="/progress"
            className="px-6 py-3 rounded-full border border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white transition"
          >
            View Progress
          </Link>
        </div>
      </section>

      {/* Card Section */}
      <section className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent"
        >
          Choose Your Learning Path
        </motion.h2>

        {/* CARD GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="relative h-72 rounded-2xl overflow-hidden border border-pink-500/40 
                         hover:scale-105 hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] 
                         transition-transform duration-500"
              style={{
                backgroundImage: `url(${card.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50"></div>

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-end items-center text-center h-full p-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-md">
                  {card.title}
                </h3>
                <p className="text-gray-200 mt-2 text-sm">{card.desc}</p>
                <button className="mt-4 px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow hover:scale-105 transition">
                  Explore
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Dictation Practice Section */}
      <section className="relative py-20 px-6 max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-8 bg-gradient-to-r from-pink-500 to-yellow-400 bg-clip-text text-transparent"
        >
          How practicing dictation will improve your English skills?
        </motion.h2>

        <p className="text-gray-300 leading-relaxed max-w-3xl mx-auto mb-12">
          When practicing exercises at Daily HearWrite, you will go through 4 main steps,
          which help improve listening, writing, spelling, and grammar skills.
          This interactive process makes learning more effective and engaging.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto text-center">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group bg-black/20 p-6 rounded-2xl shadow-lg border border-transparent 
                         hover:border-pink-400/60 hover:shadow-[0_0_20px_rgba(236,72,153,0.6)] 
                         transition-all duration-300"
            >
              <img
                src={step.img}
                alt={step.title}
                className="mx-auto mb-4 w-48 h-48 rounded-2xl object-cover shadow-md group-hover:scale-110 transition-transform duration-300"
              />
              <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-yellow-400 bg-clip-text text-transparent">
                {step.title}
              </h3>
              <p className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
