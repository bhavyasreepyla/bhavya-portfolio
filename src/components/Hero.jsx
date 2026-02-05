"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Hero() {
  const [showName, setShowName] = useState(true);
  const [showHero, setShowHero] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowName(false);
      setTimeout(() => setShowHero(true), 1000);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToSection = (id) => {
    setMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  const name = "BHAVYA";
  const letters = name.split("");

  return (
    <>
    <AnimatePresence>
  {showName && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000000'
      }}
    >
      <div style={{ display: 'flex', gap: '0.2rem' }}>
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ 
              scaleY: 0,
              opacity: 0,
            }}
            transition={{
              initial: { duration: 0.5, delay: i * 0.15 },
              exit: { duration: 0.4, delay: i * 0.05 }
            }}
            className="font-black"
            style={{
              fontSize: 'clamp(6rem, 20vw, 24rem)',
              background: 'linear-gradient(to right, #1e3a8a, #1e40af, #1e3a8a)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
              transformOrigin: 'center',
              lineHeight: 1
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )}
</AnimatePresence>

      {showHero && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{ position: 'fixed', top: '2rem', left: '2rem', zIndex: 40 }}
            className="text-gray-500 text-xs tracking-wider"
          >
            Building intelligent systems, one line at a time
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ 
              position: 'fixed', 
              top: '2rem', 
              right: '2rem', 
              zIndex: 50,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              width: '40px',
              height: '40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span style={{
              display: 'block',
              width: '28px',
              height: '2.5px',
              backgroundColor: '#d1d5db',
              transition: 'all 0.3s ease',
              transform: menuOpen ? 'rotate(45deg) translateY(8.5px)' : 'none',
              transformOrigin: 'center'
            }}></span>
            <span style={{
              display: 'block',
              width: '28px',
              height: '2.5px',
              backgroundColor: '#d1d5db',
              transition: 'all 0.3s ease',
              opacity: menuOpen ? 0 : 1
            }}></span>
            <span style={{
              display: 'block',
              width: '28px',
              height: '2.5px',
              backgroundColor: '#d1d5db',
              transition: 'all 0.3s ease',
              transform: menuOpen ? 'rotate(-45deg) translateY(-8.5px)' : 'none',
              transformOrigin: 'center'
            }}></span>
          </motion.button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25 }}
                style={{
                  position: 'fixed',
                  right: 0,
                  top: 0,
                  height: '100vh',
                  width: '384px',
                  backgroundColor: 'rgba(0, 0, 0, 0.98)',
                  backdropFilter: 'blur(20px)',
                  zIndex: 40,
                  padding: '4rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  borderLeft: '1px solid rgba(59, 130, 246, 0.1)'
                }}
              >
                <div style={{ marginBottom: '4rem' }}>
                  <p style={{ color: '#6b7280', fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: '2rem', fontWeight: 500 }}>NAVIGATION</p>
                  <button onClick={() => scrollToSection('Hero')} style={{ display: 'block', fontSize: '1.875rem', fontWeight: 'bold', color: 'white', marginBottom: '1.5rem', background: 'none', border: 'none', padding: 0, textAlign: 'left', cursor: 'pointer', transition: 'color 0.3s', width: '100%' }} onMouseEnter={(e) => e.target.style.color = '#60a5fa'} onMouseLeave={(e) => e.target.style.color = 'white'}>Home</button>
                  <button onClick={() => scrollToSection('HowIThink')} style={{ display: 'block', fontSize: '1.875rem', fontWeight: 'bold', color: 'white', marginBottom: '1.5rem', background: 'none', border: 'none', padding: 0, textAlign: 'left', cursor: 'pointer', transition: 'color 0.3s', width: '100%' }} onMouseEnter={(e) => e.target.style.color = '#60a5fa'} onMouseLeave={(e) => e.target.style.color = 'white'}>How I Think</button>
                  <button onClick={() => scrollToSection('WhatIBuild')} style={{ display: 'block', fontSize: '1.875rem', fontWeight: 'bold', color: 'white', marginBottom: '1.5rem', background: 'none', border: 'none', padding: 0, textAlign: 'left', cursor: 'pointer', transition: 'color 0.3s', width: '100%' }} onMouseEnter={(e) => e.target.style.color = '#60a5fa'} onMouseLeave={(e) => e.target.style.color = 'white'}>What I Build</button>
                  <button onClick={() => scrollToSection('BeyondCode')} style={{ display: 'block', fontSize: '1.875rem', fontWeight: 'bold', color: 'white', marginBottom: '1.5rem', background: 'none', border: 'none', padding: 0, textAlign: 'left', cursor: 'pointer', transition: 'color 0.3s', width: '100%' }} onMouseEnter={(e) => e.target.style.color = '#60a5fa'} onMouseLeave={(e) => e.target.style.color = 'white'}>Beyond Code</button>
                  <button onClick={() => scrollToSection('Contact')} style={{ display: 'block', fontSize: '1.875rem', fontWeight: 'bold', color: 'white', background: 'none', border: 'none', padding: 0, textAlign: 'left', cursor: 'pointer', transition: 'color 0.3s', width: '100%' }} onMouseEnter={(e) => e.target.style.color = '#60a5fa'} onMouseLeave={(e) => e.target.style.color = 'white'}>Contact</button>
                </div>
                <div>
                  <p style={{ color: '#6b7280', fontSize: '0.75rem', letterSpacing: '0.1em', marginBottom: '1.5rem', fontWeight: 500 }}>CONNECT</p>
                  <a href="https://github.com/bhavyasreepyla" target="_blank" rel="noopener noreferrer" style={{ display: 'block', fontSize: '1.125rem', color: '#9ca3af', marginBottom: '0.75rem', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#60a5fa'} onMouseLeave={(e) => e.target.style.color = '#9ca3af'}>GitHub →</a>
                  <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" style={{ display: 'block', fontSize: '1.125rem', color: '#9ca3af', marginBottom: '0.75rem', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#60a5fa'} onMouseLeave={(e) => e.target.style.color = '#9ca3af'}>LinkedIn →</a>
                  <a href="mailto:pylabhavyasree1@gmail.com" style={{ display: 'block', fontSize: '1.125rem', color: '#9ca3af', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#60a5fa'} onMouseLeave={(e) => e.target.style.color = '#9ca3af'}>Email →</a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      <motion.section 
        id="Hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: showHero ? 1 : 0 }}
        transition={{ duration: 1 }}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6" 
        style={{ 
          background: 'linear-gradient(to bottom right, rgba(9, 15, 98, 0.2), #0000002e, #00000072)',
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          transition: 'transform 0.5s ease-out'
        }}
      >
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
        
        <div className="relative z-10 text-center max-w-6xl">
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }} 
            className="font-medium mb-4 tracking-widest uppercase text-sm"
            style={{ color: '#60a5fa' }}
          >
            AI ENGINEER · BUILDER · DANCER
          </motion.p>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.4 }} 
            className="font-black mb-6 leading-tight"
            style={{ 
              fontSize: 'clamp(4rem, 10vw, 12rem)',
              background: 'linear-gradient(to right, #ffffff, #d1d5db, #ffffff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Bhavya Sree Pyla
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.6 }} 
            className="text-xl md:text-3xl text-gray-400 mb-8 max-w-4xl mx-auto font-light leading-relaxed"
          >
            I build AI systems that actually work for humans-
            <span 
              className="font-medium"
              style={{ 
                background: 'linear-gradient(to right, #3b82f6, #60a5fa, #3b82f6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {" "}where logic meets intuition
            </span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg md:text-xl text-gray-500 mb-12 max-w-2xl mx-auto"
          >
            When I'm in my element coding, solving, building nothing else exists.<br className="hidden md:block" />That rush? That's where I live.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 1 }} 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <button 
              onClick={() => scrollToSection('HowIThink')}
              className="group relative px-10 py-5 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:scale-105 overflow-hidden"
              style={{ 
                background: 'linear-gradient(to right, #3b82f6, #2563eb)',
                boxShadow: '0 10px 40px rgba(59, 130, 246, 0.4)', 
                border: 'none', 
                cursor: 'pointer' 
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                See how I think
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </span>
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, #2563eb, #1d4ed8)',
                opacity: 0,
                transition: 'opacity 0.3s'
              }} className="group-hover:opacity-100"></div>
            </button>
            
            <button 
              onClick={() => scrollToSection('Contact')}
              className="group px-10 py-5 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:scale-105 relative overflow-hidden"
              style={{ 
                border: '2px solid rgba(59, 130, 246, 0.4)',
                background: 'rgba(59, 130, 246, 0.05)',
                cursor: 'pointer'
              }}
            >
              <span className="relative z-10">Let's talk</span>
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.2))',
                opacity: 0,
                transition: 'opacity 0.3s'
              }} className="group-hover:opacity-100"></div>
            </button>
          </motion.div>

        </div>

      </motion.section>

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
    </>
  );
}