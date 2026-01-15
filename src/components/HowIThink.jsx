"use client";

import { motion } from "framer-motion";

export default function HowIThink() {
  const thinkingPatterns = [
    {
      title: "Problem-first, not model-first",
      description: "I start by deeply understanding the problem before choosing algorithms or architectures."
    },
    {
      title: "Edge cases matter more than averages",
      description: "The interesting insights come from understanding when and why systems fail."
    },
    {
      title: "Question the metrics",
      description: "High accuracy doesn't mean much if the model fails where it matters most."
    },
    {
      title: "Build for real humans",
      description: "Good AI should feel invisible — solving problems without adding complexity."
    }
  ];

  return (
    <section
      id="HowIThink"
      className="min-h-screen flex flex-col items-center justify-center px-6 md:px-16 py-20"
    >
      {/* Section Header */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-bold mb-12 text-center"
      >
        How I Think
      </motion.h2>

      {/* Thinking Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        {thinkingPatterns.map((pattern, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
            className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-3">{pattern.title}</h3>
            <p className="text-gray-600 leading-relaxed">{pattern.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}