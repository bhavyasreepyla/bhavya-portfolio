"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function HowIThink() {
  const [isOpen, setIsOpen] = useState(false);

  const principles = [
    { title: "User experience over metrics", angle: -60 },
    { title: "Simplicity over complexity", angle: -20 },
    { title: "AI amplifies, not replaces", angle: 20 },
    { title: "Endurance over excuses", angle: 60 }
  ];

  return (
    <section 
      id="HowIThink"
      className="relative min-h-screen flex items-center px-6 md:px-16 py-20 overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #000000, #050505)' }}
    >
      {/* SPACE TRAVEL STARS */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[0,8,16,24,32,40,48,56,64,72,80,88].map((left) => (
          <div
            key={left}
            style={{
              position: 'absolute',
              left: `${left}%`,
              top: '-50px',
              width: '3px',
              height: '3px',
              background: 'linear-gradient(to bottom, transparent, white, transparent)',
              animation: 'startravel 4s linear infinite',
              animationDelay: `${left * 0.1}s`,
              boxShadow: '0 0 6px rgba(255,255,255,0.8)',
              opacity: 0.7
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-7xl">
        
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
          style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          {/* Main Title - DOUBLE SIZE, LEFT ALIGNED, CLICKABLE */}
          <motion.h2
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.02 }}
            className="font-black cursor-pointer select-none"
            style={{
              fontSize: 'clamp(8rem, 2vw, 100rem)',
              background: 'linear-gradient(to right, #3b82f6, #60a5fa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 0.9
            }}
          >
            How I Think
          </motion.h2>

          {/* "click me" hint - BELOW title */}
          {!isOpen && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-lg mt-4"
style={{ marginTop: '-100px', color: 'rgba(255, 255, 255, 0.4)' }}
            >
              click me
            </motion.p>
          )}

          {/* Thought Bubbles in Semi-Circle - CLOSER */}
          <AnimatePresence>
            {isOpen && (
              <>
                {principles.map((principle, i) => {
                  const radius = 220;
                  const angleRad = (principle.angle * Math.PI) / 180;
                  const x = Math.cos(angleRad) * radius;
                  const y = Math.sin(angleRad) * radius;

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                      animate={{ opacity: 1, scale: 1, x: x, y: y }}
                      exit={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: i * 0.1,
                        type: "spring",
                        stiffness: 200
                      }}
                      whileHover={{ scale: 1.1 }}
                      style={{
                        position: 'absolute',
                        left: '30%',
                        top: '40%',
                        transform: `translate(-50%, -50%)`,
                        zIndex: 10
                      }}
                    >
                      <div
                        style={{
                          background: 'rgba(0, 0, 0, 0.9)',
                          border: '2px solid rgba(59, 130, 246, 0.5)',
                          borderRadius: '16px',
                          padding: '1.5rem 2rem',
                          minWidth: '250px',
                          maxWidth: '300px',
                          boxShadow: '0 10px 40px rgba(59, 130, 246, 0.3)',
                          backdropFilter: 'blur(10px)'
                        }}
                      >
                        <div className="flex items-start gap-2 mb-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                          <p className="text-white font-bold text-lg leading-tight">
                            {principle.title}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </>
            )}
          </AnimatePresence>

        </motion.div>

      </div>

      <style jsx>{`
        @keyframes startravel {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(calc(100vh + 50px));
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}