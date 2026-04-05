import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Loader2, Plus, Play } from 'lucide-react';

const services = [
  { 
    id: 'photography', 
    title: 'Photography', 
    path: 'M 125 0 L 125 80 L 500 150 L 500 200', 
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=500&auto=format&fit=crop'
  },
  { 
    id: 'video', 
    title: 'Video Editing', 
    path: 'M 375 0 L 375 80 L 500 150 L 500 200', 
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=500&auto=format&fit=crop'
  },
  { 
    id: 'retouching', 
    title: 'Photo Retouching', 
    path: 'M 625 0 L 625 80 L 500 150 L 500 200', 
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=500&auto=format&fit=crop'
  },
  { 
    id: 'creative', 
    title: 'Creative Direction', 
    path: 'M 875 0 L 875 80 L 500 150 L 500 200', 
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=500&auto=format&fit=crop'
  },
];

export const ServicesDiagram = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState<'idle' | 'loading' | 'done'>('idle');

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (progress === 'idle') {
      timeout = setTimeout(() => setProgress('loading'), 500);
    } else if (progress === 'loading') {
      timeout = setTimeout(() => setProgress('done'), 1000);
    } else if (progress === 'done') {
      timeout = setTimeout(() => {
        setProgress('idle');
        setActiveIndex((prev) => (prev + 1) % services.length);
      }, 2000); // Wait for the beam animation to finish
    }

    return () => clearTimeout(timeout);
  }, [activeIndex, progress]);

  return (
    <section className="w-full py-32 bg-transparent relative flex flex-col items-center justify-center overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/70 text-xs font-semibold tracking-widest uppercase mb-6">
          <span className="w-2 h-2 rounded-full bg-white/50" />
          Our Services
        </div>
        
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">
          Your Creative Powerhouse
        </h2>
        
        <p className="text-gray-400 text-lg max-w-2xl mb-10">
          Providing end-to-end visual solutions to elevate your brand and capture your most important moments.
        </p>

        <a 
          href="tel:+917078939475"
          className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full p-[1px] bg-white/20 focus:outline-none"
        >
          <span className="absolute inset-[-1000%] animate-spin bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_80%,white_100%)]" style={{ animationDuration: '3s' }} />
          <span className="relative inline-flex h-full w-full items-center justify-center rounded-full bg-[#0a0a0a] pl-6 pr-2 gap-3 transition-colors group-hover:bg-[#111]">
            <span className="text-base font-medium text-white transition-transform duration-300 group-hover:-translate-x-1">Book a call</span>
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-white">
              <Play className="w-4 h-4 text-white transition-colors duration-300 group-hover:text-black ml-0.5" fill="currentColor" />
            </div>
          </span>
        </a>
      </div>

      {/* Glass Box Container */}
      <div className="mt-20 relative w-full max-w-6xl mx-auto px-6">
        {/* Light splash behind the entire glass box */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/10 rounded-[100%] blur-[120px] pointer-events-none"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="w-full rounded-[2rem] border border-white/10 bg-[#050505]/80 backdrop-blur-xl p-10 md:p-20 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          
          {/* Futuristic Background Lines */}
          <div className="absolute inset-0 pointer-events-none">
            <svg className="absolute w-full h-full opacity-40" viewBox="0 0 1000 400" preserveAspectRatio="none">
              <path d="M 0 50 L 200 50 L 300 150 L 500 150" stroke="rgba(255,255,255,0.2)" fill="none" strokeWidth="1" />
              <path d="M 0 350 L 200 350 L 300 250 L 500 250" stroke="rgba(255,255,255,0.2)" fill="none" strokeWidth="1" />
              <path d="M 1000 50 L 800 50 L 700 150 L 500 150" stroke="rgba(255,255,255,0.2)" fill="none" strokeWidth="1" />
              <path d="M 1000 350 L 800 350 L 700 250 L 500 250" stroke="rgba(255,255,255,0.2)" fill="none" strokeWidth="1" />
              
              <path d="M 0 150 L 100 150 L 150 200 L 500 200" stroke="rgba(255,255,255,0.1)" fill="none" strokeWidth="1" />
              <path d="M 1000 150 L 900 150 L 850 200 L 500 200" stroke="rgba(255,255,255,0.1)" fill="none" strokeWidth="1" />

              <circle cx="200" cy="50" r="2" fill="rgba(255,255,255,0.3)" />
              <circle cx="300" cy="150" r="2" fill="rgba(255,255,255,0.3)" />
              <circle cx="800" cy="50" r="2" fill="rgba(255,255,255,0.3)" />
              <circle cx="700" cy="150" r="2" fill="rgba(255,255,255,0.3)" />
              <circle cx="200" cy="350" r="2" fill="rgba(255,255,255,0.3)" />
              <circle cx="300" cy="250" r="2" fill="rgba(255,255,255,0.3)" />
              <circle cx="800" cy="350" r="2" fill="rgba(255,255,255,0.3)" />
              <circle cx="700" cy="250" r="2" fill="rgba(255,255,255,0.3)" />
              <circle cx="100" cy="150" r="2" fill="rgba(255,255,255,0.2)" />
              <circle cx="150" cy="200" r="2" fill="rgba(255,255,255,0.2)" />
              <circle cx="900" cy="150" r="2" fill="rgba(255,255,255,0.2)" />
              <circle cx="850" cy="200" r="2" fill="rgba(255,255,255,0.2)" />
            </svg>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-white/[0.03] rounded-[100%] blur-3xl" />
          </div>
          
          <div className="relative w-full h-[400px] flex justify-center">
            {/* Light splash behind all cards */}
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[60%] bg-white/5 rounded-full blur-[80px] pointer-events-none z-0"
              animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* SVG Paths */}
            <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="absolute top-[120px] left-0 w-full h-[200px] overflow-visible pointer-events-none" style={{ zIndex: 0 }}>
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.4)" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Base Lines */}
              {services.map((service) => (
                <path key={`base-${service.id}`} d={service.path} fill="none" stroke="url(#lineGradient)" strokeWidth="2" strokeLinejoin="round" />
              ))}

              {/* Animated Light Beam */}
              <AnimatePresence mode="wait">
                {progress === 'done' && (
                  <motion.path
                    key={`beam-${services[activeIndex].id}`}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 1.5, ease: "easeInOut", times: [0, 0.2, 0.8, 1] }}
                    d={services[activeIndex].path}
                    fill="none"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#glow)"
                  />
                )}
              </AnimatePresence>
            </svg>

            {/* Service Cards */}
            <div className="absolute top-0 left-0 w-full h-full grid grid-cols-4 justify-items-center pointer-events-none z-10">
              {services.map((service, index) => {
                const isActive = index === activeIndex;
                
                return (
                  <div key={service.id} className="relative w-32 h-40 md:w-40 md:h-48 pointer-events-auto transition-transform duration-500"
                       style={{ 
                         transform: isActive && progress === 'done' ? 'translateY(-5px)' : 'translateY(0)'
                       }}
                  >
                    {/* Card Shape */}
                    <div className="absolute inset-0 bg-[#0a0a0a] border border-white/10 transition-all duration-500 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                         style={{ 
                           clipPath: 'polygon(0 0, 70% 0, 100% 20%, 100% 100%, 0 100%)',
                           borderRadius: '12px',
                           borderColor: isActive && progress === 'done' ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)',
                           boxShadow: isActive && progress === 'done' ? '0 0 20px rgba(255,255,255,0.1)' : 'none'
                         }}
                    >
                        {/* Background Image */}
                        <img 
                          src={service.image} 
                          alt={service.title} 
                          className="w-full h-full object-cover transition-opacity duration-500"
                          style={{ opacity: isActive ? 0.8 : 0.3 }}
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/50 to-black/90" />
                        
                        {/* Inner Glow */}
                        <div className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 transition-opacity duration-500 ${isActive && progress === 'done' ? 'opacity-100' : 'opacity-0'}`} />
                      </div>

                      {/* Status Icon */}
                      <div className="absolute top-4 left-4 w-6 h-6 flex items-center justify-center z-10">
                        {isActive && progress === 'loading' && (
                          <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                        )}
                        {isActive && progress === 'done' && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center"
                          >
                            <Check className="w-3 h-3 text-black" strokeWidth={3} />
                          </motion.div>
                        )}
                        {(!isActive || progress === 'idle') && (
                          <div className="w-5 h-5 rounded-full border border-white/20 bg-black/50 backdrop-blur-sm" />
                        )}
                      </div>

                      {/* Label */}
                      <div className="absolute bottom-6 left-4 right-4 z-10">
                        <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-md px-3 py-2 text-xs md:text-sm text-white font-medium shadow-lg">
                          {service.title}
                        </div>
                      </div>
                    </div>
                );
              })}
            </div>

            {/* Central Pill */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20">
              <motion.button 
                className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full p-[1px] focus:outline-none"
                initial={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                animate={{
                  backgroundColor: progress === 'done' ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)',
                  boxShadow: progress === 'done' 
                    ? '0 0 30px rgba(255,255,255,0.2)' 
                    : '0 0 0px rgba(255,255,255,0)',
                }}
                transition={{ duration: 0.5, delay: 0.5 }} // Delay glow until beam hits
              >
                <span className="absolute inset-[-1000%] animate-spin bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_80%,white_100%)]" style={{ animationDuration: '3s' }} />
                <span className="relative inline-flex h-full w-full items-center justify-center rounded-full bg-[#0a0a0a] pl-6 pr-2 gap-3 transition-colors group-hover:bg-[#111]">
                  <span className="text-base font-medium text-white transition-transform duration-300 group-hover:-translate-x-1">Your Business</span>
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-white">
                    <Play className="w-4 h-4 text-white transition-colors duration-300 group-hover:text-black ml-0.5" fill="currentColor" />
                  </div>
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
