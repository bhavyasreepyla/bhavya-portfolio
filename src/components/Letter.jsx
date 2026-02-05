"use client";
import { motion } from "framer-motion";

export default function Letter() {
  return (
    <section 
      id="Letter"
      className="relative min-h-screen flex items-center justify-center px-6 md:px-16 py-20 overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #000000, #0a0a0a)' }}
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

      <div className="relative z-10 max-w-3xl mx-auto w-full">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-black mb-4"
            style={{
              color: '#3b82f6',
            }}
          >
            If You're Reading This
          </motion.h2>
        </motion.div>

        {/* Letter content */}
        <div className="space-y-8">
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-gray-300 leading-relaxed text-center"
          >
            You're probably here because you're trying to understand who I am beyond bullet points and project descriptions.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-gray-300 leading-relaxed text-center"
          >
            I value clarity, honesty, and doing work that actually matters to people. I'm not interested in building things just because they're technically impressive — I care about <span className="text-blue-400 font-semibold">impact, thoughtfulness, and responsibility</span>.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-gray-300 leading-relaxed text-center"
          >
            I'm still learning, still growing, and still figuring out what kind of engineer and researcher I want to become. But I know I want to work on problems that require both technical depth and human understanding.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-blue-400 leading-relaxed text-center font-medium"
          >
            If that resonates with you, I'd love to talk.
          </motion.p>

        </div>

        {/* Subtle divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1 }}
          viewport={{ once: true }}
          style={{
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(59, 130, 246, 0.3), transparent)',
            marginTop: '4rem',
          }}
        />

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