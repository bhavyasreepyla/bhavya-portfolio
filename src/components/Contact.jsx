"use client";
import { motion } from "framer-motion";

export default function Contact() {
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/bhavyasreepyla",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/bhavyasreepyla",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    },
    {
      name: "Email",
      url: "mailto:pylabhavyasree1@gmail.com",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  return (
    <section 
      id="Contact"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 py-20 overflow-hidden"
      style={{ background: '#000000' }}
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

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        
        {/* Main CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring" }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="font-black mb-8"
            style={{
              fontSize: 'clamp(3rem, 10vw, 10rem)',
              background: 'linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1
            }}
          >
            Let's Build Something
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            Open to opportunities, collaborations, and conversations about AI, research, or interesting problems
          </motion.p>

          {/* Email CTA Button */}
          <motion.a
            href="mailto:pylabhavyasree1@gmail.com"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="inline-block px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xl rounded-full transition-all"
            style={{ boxShadow: '0 20px 60px rgba(59, 130, 246, 0.4)' }}
          >
            Get in Touch →
          </motion.a>
        </motion.div>

        {/* Social Links Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
          className="flex justify-center gap-8 mb-20"
        >
          {socialLinks.map((link, i) => (
            <motion.a
              key={i}
              href={link.url}
              target={link.name !== "Email" ? "_blank" : undefined}
              rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.1 }}
              className="group flex flex-col items-center gap-3"
            >
              <div 
                className="w-16 h-16 flex items-center justify-center rounded-full transition-all"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)';
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className="text-gray-400 group-hover:text-blue-400 transition-colors">
                  {link.icon}
                </div>
              </div>
              <span className="text-gray-500 group-hover:text-blue-400 transition-colors text-sm font-medium">
                {link.name}
              </span>
            </motion.a>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1 }}
          viewport={{ once: true }}
          style={{
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(59, 130, 246, 0.3), transparent)',
            marginBottom: '3rem',
          }}
        />

        {/* Footer Credits */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 text-sm"
        >
          <p>© 2026 Bhavya Sree Pyla</p>
          <p>Designed & Built with care</p>
          <p className="text-gray-700">Portland, Maine · MS in AI @ Northeastern</p>
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