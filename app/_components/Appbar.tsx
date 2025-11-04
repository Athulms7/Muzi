'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Container } from './container';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const session = useSession();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'backdrop-blur-md bg-black/30 border-b border-white/10 shadow-sm' // translucent when scrolled
          : 'bg-transparent' // fully transparent initially
      }`}
    >
      <Container>
        <div className="flex items-center justify-between py-4">
          {/* Logo + Brand */}
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 10 }}
              className="w-10 h-10 bg-linear-to-r from-green-500 to-green rounded-xl flex items-center justify-center shadow-md"
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <span
              className="text-2xl font-bold tracking-tight bg-linear-to-r from-green-400 to-green-800 bg-clip-text text-transparent"
            >
              MUZI
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!session.data?.user && (
              <button
                className="bg-gray-300/20 backdrop-blur-sm text-white rounded-xl px-4 py-2 text-sm font-semibold hover:bg-gray-300/30 transition"
                onClick={() => signIn()}
              >
                Sign In
              </button>
            )}
            {session.data?.user && (
              <button
                className="bg-gray-300/20 backdrop-blur-sm text-white rounded-xl px-4 py-2 text-sm font-semibold hover:bg-gray-300/30 transition"
                onClick={() => signOut()}
              >
                Sign Out
              </button>
            )}
            <button className="bg-primary hover:bg-emerald-400 text-white text-sm font-bold rounded-lg px-4 py-2 transition">
              Get Started
            </button>
          </div>
        </div>
      </Container>
    </motion.header>
  );
}
