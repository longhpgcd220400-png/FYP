"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const topics = [
  {
    id: 1,
    title: "Short Stories",
    levels: "A1–C1",
    lessons: 289,
    image: "/topics/stories.jpg",
  },
  {
    id: 2,
    title: "Conversations",
    levels: "A1–B1",
    lessons: 100,
    image: "/topics/conversations.jpg",
  },
  {
    id: 3,
    title: "Stories for Kids",
    levels: "A2–B2",
    lessons: 13,
    image: "/topics/kids.jpg",
    isVideo: true,
  },
  {
    id: 4,
    title: "TOEIC Listening",
    levels: "A2–C1",
    lessons: 600,
    image: "/topics/toeic.jpg",
  },
  {
    id: 5,
    title: "IELTS Listening",
    levels: "B1–C1",
    lessons: 344,
    image: "/topics/ielts.jpg",
  },
  {
    id: 6,
    title: "Random Videos",
    levels: "B1–C2",
    lessons: 181,
    image: "/topics/random.jpg",
    isVideo: true,
  },
];

export default function LessonsPage() {
  return (
    <div className="min-h-screen  text-white pt-32 pb-20">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-12 text-center bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg">
          All Topics
        </h1>

        <div className="grid gap-10 md:grid-cols-3 xl:grid-cols-3">
          {topics.map((topic) => (
            <motion.div
              key={topic.id}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 25px rgba(255, 105, 180, 0.4)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-black/40 border border-pink-500/40 rounded-2xl overflow-hidden shadow-lg hover:shadow-pink-500/40 transition-all duration-300 backdrop-blur-md"
            >
              <Link href={`/lessons/${topic.id}`}>
                <div className="relative">
                  <Image
                    src={topic.image}
                    alt={topic.title}
                    width={500}
                    height={400}
                    className="w-full h-56 object-cover"
                  />
                  {topic.isVideo && (
                    <span className="absolute top-3 right-3 bg-yellow-400 text-black font-semibold px-3 py-1 rounded-full shadow-md">
                      Video
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-pink-300 mb-2">
                    {topic.title}
                  </h2>
                  <p className="text-gray-300 mb-2">
                    Levels:{" "}
                    <span className="text-yellow-400 font-semibold">
                      {topic.levels}
                    </span>
                  </p>
                  <p className="text-gray-400 text-sm">
                    {topic.lessons} lessons
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
