"use client";
import { motion } from "framer-motion";

export default function WhatIBuild() {
  const skills = [
    "Python", "Java", "MATLAB", "SQL", "React", "Next.js",
    "TensorFlow", "PyTorch", "Keras", "scikit-learn", 
    "OpenCV", "YOLO", "NumPy", "Pandas", "NLTK", 
    "Pillow", "Matplotlib", "Streamlit", "AWS", "Git", "MySQL"
  ];

  const projects = [
    {
      title: "Vision-to-Speech System",
      tags: ["CNN  ", "LSTM  ", "NLP  ", "TTS"],
      highlight: "End-to-end multimodal AI for accessible image understanding",
      period: "July 2023",
      location: "National University of Singapore"
    },
    {
      title: "EV Charging Station Prediction",
      tags: ["CNN  ", "LSTM  ", "Time Series  ", "IoT  "],
      highlight: "Temporal & spatial pattern learning from sensor feeds",
      period: "July 2024",
      location: "Mahindra University"
    },
    {
      title: "Hybrid Recommender System",
      tags: ["Cold-Start  ", "Collaborative Filtering   ", "Optimization  "],
      highlight: "Wasserstein distance + similarity weights for sparse data",
      period: "Aug 2025",
      location: "Mahindra University"
    }
  ];

  return (
    <section 
      id="WhatIBuild"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 py-20 overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #050505, #000000)' }}
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

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 
            className="text-5xl md:text-7xl font-black mb-6"
            style={{
              background: 'linear-gradient(to right, #3b82f6, #60a5fa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            What I Build
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
            AI systems that solve real problems with imperfect data and careful thinking
          </p>
        </motion.div>

        {/* Skills Grid - FULL WIDTH */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-4 justify-items-center">
            {skills.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.15, 
                  y: -8
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  width: '100px',
                  height: '100px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className="text-3xl">
                  {skill === "Python" && "🐍"}
                  {skill === "Java" && "☕"}
                  {skill === "MATLAB" && "📐"}
                  {skill === "SQL" && "🗄️"}
                  {skill === "React" && "⚛️"}
                  {skill === "Next.js" && "▲"}
                  {skill === "TensorFlow" && "🧠"}
                  {skill === "PyTorch" && "🔥"}
                  {skill === "Keras" && "🤖"}
                  {skill === "scikit-learn" && "📈"}
                  {skill === "OpenCV" && "👁️"}
                  {skill === "YOLO" && "⚡"}
                  {skill === "NumPy" && "🔢"}
                  {skill === "Pandas" && "🐼"}
                  {skill === "NLTK" && "💬"}
                  {skill === "Pillow" && "🖼️"}
                  {skill === "Matplotlib" && "📊"}
                  {skill === "Streamlit" && "🎈"}
                  {skill === "AWS" && "☁️"}
                  {skill === "Git" && "🔀"}
                  {skill === "MySQL" && "🐬"}
                </div>
                <span className="text-white font-medium text-xs text-center">{skill}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Projects Section - KEYWORD FOCUSED */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-white mb-10 text-center">Key Projects</h3>
          <div className="flex flex-wrap mt-2" style={{ gap: '1rem' }}>
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  padding: '2rem',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(59, 130, 246, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                }}
              >
                <div>
                  <p className="text-blue-400 text-xs font-semibold mb-1 uppercase tracking-wider">{project.location}</p>
                  <p className="text-gray-600 text-xs mb-3">{project.period}</p>
                </div>
                
                <h4 className="text-xl font-bold text-white">
                  {project.title}
                </h4>
                
                <p className="text-gray-400 leading-relaxed flex-grow">
                  {project.highlight}
                </p>

                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="text-xs font-medium px-3 py-1 rounded-full"
                      style={{
                        background: 'rgba(59, 130, 246, 0.1)',
                        color: '#60a5fa',
                        border: '1px solid rgba(59, 130, 246, 0.3)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
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