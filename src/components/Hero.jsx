"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-16">
      
      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-bold mb-4"
      >
        I build AI systems that think carefully and impact the real world.
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-lg md:text-2xl text-gray-700 mb-8"
      >
        MS in AI @ Northeastern · AI Engineer · Problem-solver · Curious & reflective
      </motion.p>

      {/* Call-to-action */}
      <motion.a
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        href="#HowIThink"
        className="text-blue-600 font-medium hover:underline text-lg md:text-xl"
      >
        See how I think →
      </motion.a>

    </section>
  );
}