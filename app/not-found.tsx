"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-linear-to-b from-gray-900 to-black text-white">
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-6xl font-bold mb-4"
      >
        404
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg text-gray-300 mb-8"
      >
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </motion.p>
      <Link
        href="/"
        className="flex items-center gap-2 bg-white text-black px-5 py-2 rounded-full hover:bg-gray-200 transition"
      >
        <Home size={18} />
        Back to Home
      </Link>
    </div>
  );
}
