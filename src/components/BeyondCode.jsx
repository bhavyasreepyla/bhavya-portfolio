
"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function BeyondCode() {
  const containerRef = useRef(null);
  const [particles, setParticles] = useState([]);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Generate particles on client only (fixes hydration)
  useEffect(() => {
    setParticles(
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 1,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 3,
      }))
    );
  }, []);

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.7]);

  return (
    <section 
      id="BeyondCode"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center items-center px-6 md:px-16 py-32 overflow-hidden"
      style={{ background: '#000000' }}
    >
      {/* CINEMATIC BACKGROUND - Optimized */}
      
      {/* Layer 1: Gradient nebula */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 20% 30%, rgba(139, 92, 246, 0.12) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
          y: y1,
        }}
      />

      {/* Layer 2: Flowing aurora */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          y: y2,
        }}
      >
        <svg width="100%" height="100%" style={{ position: 'absolute' }}>
          <defs>
            <linearGradient id="aurora1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.15 }}>
                <animate attributeName="stop-color" values="#8b5cf6; #ec4899; #3b82f6; #8b5cf6" dur="15s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 0 }}>
                <animate attributeName="stop-color" values="#ec4899; #3b82f6; #8b5cf6; #ec4899" dur="15s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
          </defs>
          
          <motion.path
            d="M-100,300 Q200,200 400,300 T900,300 T1400,300"
            stroke="url(#aurora1)"
            strokeWidth="80"
            fill="none"
            filter="blur(30px)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>

      {/* Layer 3: Particle constellation (reduced count) */}
      {particles.length > 0 && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <svg width="100%" height="100%" style={{ position: 'absolute' }}>
            {particles.map((particle) => (
              <motion.circle
                key={particle.id}
                cx={`${particle.x}%`}
                cy={`${particle.y}%`}
                r={particle.size}
                fill="rgba(139, 92, 246, 0.5)"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 0.7, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: "easeInOut"
                }}
              />
            ))}
          </svg>
        </div>
      )}

      {/* Layer 4: Floating orbs (reduced) */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: '250px',
            height: '250px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${['rgba(139, 92, 246, 0.12)', 'rgba(236, 72, 153, 0.1)', 'rgba(59, 130, 246, 0.08)'][i]}, transparent)`,
            filter: 'blur(50px)',
            left: `${20 + i * 30}%`,
            top: `${30 + i * 15}%`,
          }}
          animate={{
            x: [0, 80, -40, 0],
            y: [0, -60, 40, 0],
            scale: [1, 1.15, 0.85, 1],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5,
          }}
        />
      ))}

      {/* Content */}
      <motion.div 
        className="relative z-10 max-w-4xl mx-auto w-full"
        style={{ opacity }}
      >
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
          className="text-center mb-32"
        >
          <motion.h2 
            className="font-black"
            style={{
              fontSize: 'clamp(4rem, 10vw, 8rem)',
              color: '#8b5cf6',
              lineHeight: 1,
              textShadow: '0 0 60px rgba(139, 92, 246, 0.4)'
            }}
          >
            Beyond Code
          </motion.h2>
        </motion.div>

        <div className="space-y-20 text-center">
          
          <HandwrittenText delay={0.2}>
            Tanzania is my home. Not just where I lived, it's <span style={{ color: '#ec4899', fontWeight: 600 }}>home</span>. Growing up there shaped everything about how I see the world. It gave me a global perspective, taught me adaptability, and showed me that there are so many different ways of life— all of them valid, all of them valuable.
          </HandwrittenText>

          <HandwrittenText delay={0.4}>
            I've been doing Bharatanatyam since I was four years old. It's been my shelter for the past 12+ years, a way to connect with my inner self and express things. Dance taught me discipline, patience, and precision. The same iteration and refinement I practice in Bharatanatyam? That's exactly how I approach engineering and research. This art form reminds me that AI, like dance, needs <span style={{ color: '#8b5cf6', fontWeight: 600 }}>creativity, nuance, and a willingness to interpret the world in new ways</span>.
          </HandwrittenText>

          <HandwrittenText delay={0.6}>
            I'm optimistic by default. Not in a superficial way, but in the sense that I believe most problems can be worked through with enough curiosity and effort. I'm motivated by growth and progress, not comparison. I value ownership and accountability. I gravitate toward people who take responsibility for their path and want to build something meaningful, even when it's hard.
          </HandwrittenText>

          <HandwrittenText delay={0.8}>
            <span style={{ fontStyle: 'italic' }}>I think technology fails most often not because it's too complex, but because it forgets who it's for. I'm intentional about not making that mistake.</span>
          </HandwrittenText>

        </div>

      </motion.div>
    </section>
  );
}

function HandwrittenText({ children, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.p
        initial={{ 
          backgroundSize: '0% 100%',
          backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.9) 100%)',
          backgroundRepeat: 'no-repeat',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}
        whileInView={{ 
          backgroundSize: '100% 100%',
        }}
        transition={{ 
          duration: 2.5,
          delay: delay + 0.2,
          ease: "easeInOut"
        }}
        viewport={{ once: true, margin: "-100px" }}
        style={{
          color: 'transparent',
          backgroundImage: 'linear-gradient(90deg, #e5e7eb 0%, #e5e7eb 100%)',
          fontSize: '1.2rem',
          lineHeight: '1.8',
          maxWidth: '100%'
        }}
      >
        {children}
      </motion.p>
    </motion.div>
  );
}