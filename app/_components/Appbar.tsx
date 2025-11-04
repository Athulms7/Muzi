'use client';
import {signIn,signOut,useSession} from "next-auth/react";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Buttons } from "./button";
import { Container } from './container';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
    const session=useSession();
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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'backdrop-blur-lg bg-white/70 shadow-md border-b border-gray-200'
          : 'bg-transparent'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between py-4">
          {/* Logo + Brand */}
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 10 }}
              className="w-10 h-10 bg-linear-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-md"
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <span
              className={`text-2xl font-bold tracking-tight ${
                isScrolled
                  ? 'bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent'
                  : 'text-gray-900'
              }`}
            >
              MUZI
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!session.data?.user &&<button className='bg-gray-300 text-black rounded-xl p-2 text-sm font-bold  ' onClick={()=>signIn()}>
            
              Sign In
            </button>}
            {session.data?.user && <button className='bg-gray-300 text-black rounded-xl p-2 text-sm font-bold  ' onClick={()=>signOut()}>
            
              Sign Out
            </button>}
            <Buttons size="sm">Get Started</Buttons>
          </div>
        </div>
      </Container>
    </motion.header>
  );
};
