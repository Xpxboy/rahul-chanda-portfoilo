import React, { useState, useRef, useEffect, useId } from 'react';
import { ArrowRight, ArrowUpRight, Move, Linkedin, Instagram, Facebook, Twitter, MapPin, Mail, X } from 'lucide-react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ServicesDiagram } from './components/ServicesDiagram';
import gsap from 'gsap';

const MouseGradient = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
      style={{
        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 80%)`
      }}
    />
  );
};

// Custom event for lightbox
export const openLightbox = (src: string, alt: string) => {
  window.dispatchEvent(new CustomEvent('open-lightbox', { detail: { src, alt } }));
};

function Lightbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState({ src: '', alt: '' });

  useEffect(() => {
    const handleOpen = (e: any) => {
      setImage(e.detail);
      setIsOpen(true);
    };
    window.addEventListener('open-lightbox', handleOpen);
    return () => window.removeEventListener('open-lightbox', handleOpen);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-12 cursor-zoom-out"
          onClick={() => setIsOpen(false)}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-black/50 p-2 rounded-full backdrop-blur-md border border-white/10 transition-colors z-[101]"
            onClick={() => setIsOpen(false)}
          >
            <X size={24} />
          </button>
          <motion.img 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            src={image.src} 
            alt={image.alt} 
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function LiquidImage({ src, alt, className, imgClassName, isHoveredOverride }: { src: string, alt: string, className?: string, imgClassName?: string, isHoveredOverride?: boolean }) {
  const id = useId().replace(/:/g, "");
  const [isHoveredLocal, setIsHoveredLocal] = useState(false);
  
  const isHovered = isHoveredOverride !== undefined ? isHoveredOverride : isHoveredLocal;

  return (
    <div 
      className={`relative overflow-hidden ${className || ''}`}
      onMouseEnter={() => setIsHoveredLocal(true)}
      onMouseLeave={() => setIsHoveredLocal(false)}
    >
      <svg className="absolute w-0 h-0 pointer-events-none">
        <filter id={`liquid-${id}`}>
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.015" 
            numOctaves="3" 
            result="noise" 
          />
          <motion.feDisplacementMap 
            in="SourceGraphic" 
            in2="noise" 
            xChannelSelector="R" 
            yChannelSelector="G" 
            initial={{ scale: 0 }}
            animate={{ scale: isHovered ? 25 : 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </filter>
      </svg>
      <motion.img 
        src={src} 
        alt={alt} 
        className={`w-full h-full object-cover ${imgClassName || ''}`}
        style={{ filter: `url(#liquid-${id})` }}
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
    </div>
  );
}

const IMAGES = [
  "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2000&auto=format&fit=crop"
];

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: "Food Photography",
    year: "2025",
    image: "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/43f6a167-ade0-4730-abff-63eda623409a_rw_3840.jpg?h=1f046738d7506a03676d7ae63c902902",
    link: "/portfolio/food-photography"
  },
  {
    id: 2,
    title: "Product Photoshot",
    year: "2025",
    image: "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/5099dd32-d0b6-4908-93dc-2524d685cbcb_rw_3840.jpg?h=3e757b7abb3eb6479521614860d5ef26",
    link: "/portfolio/product-photoshot"
  },
  {
    id: 3,
    title: "Instagram Design",
    year: "2025",
    image: "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/f9698532-0490-4b4d-b74e-093228366e4d_rw_3840.png?h=b378c10ddabe2b74ad8a668f72ff592c",
    link: "/portfolio/instagram-design"
  },
  {
    id: 4,
    title: "Video Editing",
    year: "2024",
    image: "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/c7db756c-0b20-48b3-8efb-d33dde7aed9d_rwc_314x0x960x720x960.png?h=c5d677b41397b7bd25c39c5f36edf4ae",
    link: "/portfolio/video-editing"
  },
  {
    id: 5,
    title: "Hype Instagram Design",
    year: "2025",
    image: "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/ff2aa30e-88f4-453a-a6d5-c2cc23b4d8e8_rw_1920.jpg?h=b8f344f9f9901f8ff46a5e9d2476d00b",
    link: "/portfolio/hype-instagram-design"
  },
  {
    id: 6,
    title: "New Collection",
    year: "2025",
    image: "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/83e879ce-baf2-424e-98f7-667d2bf2dfab_rw_1200.jpg?h=b906f7f3409a2f7bbe9614ee160e0d0e",
    link: "/portfolio/new-collection"
  }
];

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function Navbar() {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
      <nav className="flex items-center justify-between px-6 py-3 w-full max-w-5xl bg-[#111111]/70 backdrop-blur-xl border border-white/10 rounded-full pointer-events-auto shadow-2xl">
        <Link to="/" className="inline-block cursor-pointer text-xl font-black tracking-tighter text-white dw-link">
          <span>Rahul Chanda</span>
          <span>Rahul Chanda</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/80 font-medium">
          <Link to="/" className="hover:text-white transition-colors duration-300 dw-link">
            <span>Home</span>
            <span>Home</span>
          </Link>
          <Link to="/about" className="hover:text-white transition-colors duration-300 dw-link">
            <span>About</span>
            <span>About</span>
          </Link>
          <Link to="/portfolio" className="hover:text-white transition-colors duration-300 dw-link">
            <span>Works</span>
            <span>Works</span>
          </Link>
        </div>
        <Link to="/contact" className="bg-white/10 border border-white/5 text-white pl-5 pr-1.5 py-1.5 rounded-full text-sm font-medium dw-btn transition-colors duration-300 hover:bg-white/20 flex items-center gap-3">
          <div className="dw-btn-text-wrapper">
            <span>Get In Touch</span>
            <span>Get In Touch</span>
          </div>
          <span className="bg-white text-black p-1.5 rounded-full">
            <ArrowUpRight size={16} strokeWidth={2.5} />
          </span>
        </Link>
      </nav>
    </div>
  );
}


const DraggableCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const [isDragging, setIsDragging] = useState(false);

  const state = useRef({
    rotX: -15,
    rotY: 0,
    velX: 0,
    velY: 0,
    time: 0,
  });

  const dragState = useRef({
    lastX: 0,
    lastY: 0,
    isDragging: false
  });

  const images = [
    "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/c63185db-861c-478c-919d-058ab9c6a416_rw_1920.png?h=1d53c0c1cee1b248712bd2f2fcd78ca1",
    "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/851e51b6-4809-4f1e-8d8f-7bf220260eb6_rw_1200.png?h=1bd7595b23ae1f506545287fcd33cebf",
    "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/e5aa6e06-ed51-4bdb-8fc7-6e31be953d0d_rw_1200.jpg?h=89e751a9440465f52d19257ee5a4d947",
    "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/b1ccafe3-910f-4584-baa8-f5a7d1d9bb72_rw_1920.jpg?h=f378734ffbc2df5afbd008a3203bad9b",
    "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/eabe7afe-0de7-4e3e-844c-c053f63bc9c8_rw_1200.jpg?h=a4285092a813234c339394c25d20f33c",
    "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/726d3e31-631c-4e68-b421-6c23b15be594_rw_1920.jpg?h=65bc7eee19dae800f8df2f49f2ebfe9f",
    "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/5099dd32-d0b6-4908-93dc-2524d685cbcb_rw_1920.jpg?h=439a8719a39cbca7ea2e1a7673bd44cb",
    "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/c155fdf8-0608-4c45-b442-f66c10f96b39_rw_1920.jpg?h=8b8f41241d4164d0010215a6f5d7b927",
    "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/dd2d1db5-6f02-48ea-a82d-d87eefb522c5_rw_1200.png?h=cc393da777503075c0ee8efbfebb80ed",
    "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/f9698532-0490-4b4d-b74e-093228366e4d_rw_1920.png?h=dbada58a3e86b618b5991f5ad7d7c05b"
  ];

  const handlePointerDown = (e: React.PointerEvent) => {
    dragState.current.isDragging = true;
    setIsDragging(true);
    dragState.current.lastX = e.clientX;
    dragState.current.lastY = e.clientY;
    state.current.velX = 0;
    state.current.velY = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragState.current.isDragging) return;
    const deltaX = e.clientX - dragState.current.lastX;
    const deltaY = e.clientY - dragState.current.lastY;
    
    state.current.rotY += deltaX * 0.4;
    state.current.rotX -= deltaY * 0.4;
    
    state.current.velY = deltaX * 0.4;
    state.current.velX = -deltaY * 0.4;

    dragState.current.lastX = e.clientX;
    dragState.current.lastY = e.clientY;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    dragState.current.isDragging = false;
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  useEffect(() => {
    const animate = () => {
      state.current.time += 0.01;

      if (!dragState.current.isDragging) {
        // Auto rotate slowly
        state.current.velY += 0.02;
        
        // Return to resting X angle slowly if not dragging
        const targetRotX = -15;
        state.current.rotX += (targetRotX - state.current.rotX) * 0.01;
      }

      // Apply very light friction for zero-gravity feel
      state.current.velX *= 0.98;
      state.current.velY *= 0.98;

      if (!dragState.current.isDragging) {
        state.current.rotX += state.current.velX;
        state.current.rotY += state.current.velY;
      }

      // Clamp X rotation
      if (state.current.rotX < -45) {
        state.current.rotX = -45;
        state.current.velX *= -0.5;
      }
      if (state.current.rotX > 45) {
        state.current.rotX = 45;
        state.current.velX *= -0.5;
      }

      if (containerRef.current) {
        // Add a subtle floating effect to the entire container
        const floatY = Math.sin(state.current.time * 2) * 10;
        containerRef.current.style.transform = `translateY(${floatY}px) rotateX(${state.current.rotX}deg) rotateY(${state.current.rotY}deg)`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, []);

  return (
    <div 
      className="w-full h-full relative cursor-grab active:cursor-grabbing touch-none flex items-center justify-center"
      style={{ perspective: '1200px' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Light splash behind the discs */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] pointer-events-none"
        style={{
          background: 'conic-gradient(from 0deg, rgba(59,130,246,0.15), rgba(147,51,234,0.15), rgba(59,130,246,0.15))'
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          rotate: { duration: 15, repeat: Infinity, ease: "linear" },
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }}
      />

      <div 
        ref={containerRef} 
        className="w-full h-full absolute top-0 left-0" 
        style={{ transformStyle: 'preserve-3d', transformOrigin: 'center center' }}
      >
        {images.map((src, i) => {
          const angle = (i / images.length) * 360;
          const radius = 320;
          const thickness = 6; // Reduced thickness for a lighter feel
          
          // Create layers for 3D coin edge effect
          const layers = Array.from({ length: thickness }).map((_, j) => (
            <div
              key={j}
              className="absolute inset-0 rounded-2xl bg-[#222] border border-white/5"
              style={{
                transform: `translateZ(${j - thickness/2}px)`,
                backfaceVisibility: 'hidden'
              }}
            />
          ));

          return (
            <div 
              key={i}
              className="absolute top-1/2 left-1/2"
              style={{
                width: '180px',
                height: '240px',
                transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius}px)`,
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Back face (Black Glass with inverted image) */}
              <div 
                className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 bg-[#050505]"
                style={{ transform: `translateZ(${-thickness/2 - 1}px) rotateY(180deg)` }}
              >
                <img 
                  src={src} 
                  alt="Portfolio Work Back" 
                  className="w-full h-full object-cover opacity-30 scale-x-[-1]" 
                />
                {/* Glass Reflection / Lighting */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 pointer-events-none" />
              </div>
              
              {/* Edge layers */}
              {layers}

              {/* Front face with image */}
              <div 
                className="absolute inset-0 rounded-2xl overflow-hidden border border-white/20 bg-black"
                style={{ transform: `translateZ(${thickness/2 + 1}px)` }}
              >
                <img src={src} alt="Portfolio Work" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/70 text-xs font-bold uppercase tracking-widest pointer-events-none bg-black/50 px-5 py-2.5 rounded-full backdrop-blur-md border border-white/10">
        <Move size={14} strokeWidth={2.5} />
        Drag
      </div>
    </div>
  );
};

function FeaturedProjects() {
  return (
    <section className="w-full py-32 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/70 text-xs font-semibold tracking-widest uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-white/50" />
              Selected Work
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter w-fit">
              Featured Projects
            </h2>
          </div>
          <Link to="/portfolio" className="bg-white/10 border border-white/5 text-white pl-5 pr-1.5 py-1.5 rounded-full text-sm font-medium dw-btn transition-colors duration-300 hover:bg-white/20 flex items-center gap-3 mt-8 md:mt-0">
            <div className="dw-btn-text-wrapper">
              <span>View All</span>
              <span>View All</span>
            </div>
            <span className="bg-white text-black p-1.5 rounded-full">
              <ArrowRight size={16} strokeWidth={2.5} />
            </span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PORTFOLIO_ITEMS.slice(0, 3).map((item) => {
            const content = (
              <>
                <div className="aspect-[4/5] overflow-hidden">
                  <LiquidImage 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full"
                    imgClassName="transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-black uppercase tracking-tighter dw-link-group">
                    <span>{item.title}</span>
                    <span>{item.title}</span>
                  </h3>
                </div>
              </>
            );

            return item.link ? (
              <Link to={item.link} key={item.id} className="group relative overflow-hidden cursor-pointer rounded-sm block">
                {content}
              </Link>
            ) : (
              <div key={item.id} className="group relative overflow-hidden cursor-pointer rounded-sm">
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="w-full py-12 border-t border-white/10 bg-[#050505] relative z-20 mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
        <div className="text-2xl font-black tracking-tighter text-white mb-6 md:mb-0">
          Rahul Chanda
        </div>
        <div className="text-gray-400 text-sm font-medium mb-6 md:mb-0">
          &copy; {new Date().getFullYear()} Rahul Chanda. All rights reserved.
        </div>
        <div className="flex items-center gap-6 text-gray-400">
          <a href="#" className="hover:text-white transition-colors duration-300"><Linkedin size={20} /></a>
          <a href="#" className="hover:text-white transition-colors duration-300"><Instagram size={20} /></a>
          <a href="#" className="hover:text-white transition-colors duration-300"><Facebook size={20} /></a>
          <a href="#" className="hover:text-white transition-colors duration-300"><Twitter size={20} /></a>
        </div>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <div className="min-h-screen w-full bg-transparent overflow-hidden relative flex flex-col">
      <Navbar />
      
      

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between relative z-10 pt-32 md:pt-0">
        
        {/* Left Content */}
        <div className="w-full md:w-1/2 flex flex-col items-start">
          <p className="text-xl md:text-2xl text-white/90 font-medium mb-4">Hey, I'm a</p>
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] font-black tracking-tighter mb-6 cursor-default text-fade-right w-fit">
            Photographer<br/>& Editor
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-lg mb-10 font-medium leading-relaxed">
            From raw captures to final cuts, I build visual narratives that connect and captivate.
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/portfolio" className="bg-[#111111] border border-white/10 text-white pl-6 pr-2 py-2 rounded-full text-sm font-bold hover:bg-[#222222] transition-colors duration-300 inline-flex items-center gap-4 dw-btn">
              <div className="dw-btn-text-wrapper">
                <span>See Projects</span>
                <span>See Projects</span>
              </div>
              <span className="bg-white text-black p-2 rounded-full">
                <ArrowRight size={16} strokeWidth={2} className="-rotate-45" />
              </span>
            </Link>
            <Link to="/contact" className="bg-[#111111] border border-white/10 text-white pl-6 pr-2 py-2 rounded-full text-sm font-bold hover:bg-[#222222] transition-colors duration-300 inline-flex items-center gap-4 dw-btn">
              <div className="dw-btn-text-wrapper">
                <span>Get In Touch</span>
                <span>Get In Touch</span>
              </div>
              <span className="bg-white text-black p-2 rounded-full">
                <ArrowRight size={16} strokeWidth={2} className="-rotate-45" />
              </span>
            </Link>
          </div>
        </div>

        {/* Right Content - 3D Coins Animation */}
        <div className="w-full md:w-1/2 h-[500px] md:h-[700px] relative mt-12 md:mt-0">
           <DraggableCarousel />
        </div>

      </div>

      <ServicesDiagram />
      <FeaturedProjects />
    </div>
  );
}

function About() {
  return (
    <div className="min-h-screen w-full bg-transparent text-white font-sans selection:bg-[#ff4d29] selection:text-white flex flex-col relative">
      <Navbar />
      <div className="flex-1 px-6 md:px-12 pt-32 pb-20 z-20 flex flex-col md:flex-row gap-12 items-center max-w-7xl mx-auto">
        <div className="w-full md:w-1/2">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-8 cursor-default flex flex-col items-start"><span className="dw-link"><span>About Me</span><span>About Me</span></span></h1>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-6 font-medium hover:scale-105 transition-transform duration-300 cursor-default origin-left">
            Hi, I'm Rahul Chanda! A passionate Photographer and Editor based in Dehradun, India.
          </p>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8 hover:scale-105 transition-transform duration-300 cursor-default origin-left">
            I specialize in Products Photography, Video Editing, Photo Editing, Professional Retouching, Portrait and Wedding Photography Editing. Struggling with post-production, product visuals, or branding? I offer creative solutions for photographers, videographers, and businesses.
          </p>
          <div className="flex gap-4">
             <Link to="/contact" className="bg-[#111111] border border-white/10 text-white pl-6 pr-2 py-2 rounded-full text-sm font-bold hover:bg-[#222222] transition-colors duration-300 inline-flex items-center gap-4 dw-btn">
               <div className="dw-btn-text-wrapper">
                 <span>Let's Collaborate</span>
                 <span>Let's Collaborate</span>
               </div>
               <span className="bg-white text-black p-2 rounded-full">
                 <ArrowRight size={16} strokeWidth={2} className="-rotate-45" />
               </span>
             </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2 aspect-square md:aspect-[3/4] overflow-hidden rounded-sm">
           <LiquidImage src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000&auto=format&fit=crop" alt="Rahul Chanda" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}

function Portfolio() {
  return (
    <div className="min-h-screen w-full bg-transparent text-white font-sans selection:bg-[#ff4d29] selection:text-white flex flex-col relative">
      <Navbar />
      <div className="flex-1 px-6 md:px-12 pt-32 pb-20 z-20 max-w-7xl mx-auto w-full">
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-12 cursor-default flex flex-col items-start"><span className="dw-link"><span>Selected Work</span><span>Selected Work</span></span></h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PORTFOLIO_ITEMS.map((item) => {
            const content = (
              <>
                <div className="aspect-[4/5] overflow-hidden">
                  <LiquidImage 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full"
                    imgClassName="transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-black uppercase tracking-tighter dw-link-group">
                    <span>{item.title}</span>
                    <span>{item.title}</span>
                  </h3>
                </div>
              </>
            );

            return item.link ? (
              <Link to={item.link} key={item.id} className="group relative overflow-hidden cursor-pointer rounded-sm block">
                {content}
              </Link>
            ) : (
              <div key={item.id} className="group relative overflow-hidden cursor-pointer rounded-sm">
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div className="min-h-screen w-full bg-transparent text-white font-sans selection:bg-[#ff4d29] selection:text-white flex flex-col relative">
      <Navbar />
      <div className="flex-1 px-6 md:px-12 pt-32 pb-20 z-20 flex flex-col justify-center max-w-7xl mx-auto w-full">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-8 cursor-default flex flex-col items-start"><span className="dw-link"><span>Let's Work</span><span>Let's Work</span></span><span className="dw-link"><span>Together.</span><span>Together.</span></span></h1>
          <p className="text-gray-300 text-xl md:text-2xl leading-relaxed mb-12 font-medium max-w-2xl hover:scale-105 transition-transform duration-300 cursor-default origin-left">
            Let me know if this is something you'd be looking for YOUR BRAND. I'm currently available for freelance projects.
          </p>
          
          <div className="flex flex-col md:flex-row gap-12">
            <div className="hover:scale-105 transition-transform duration-300 origin-left">
              <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-2">Location</p>
              <p className="text-xl font-medium flex items-center gap-2"><MapPin size={20} className="text-[#ff4d29]"/> Dehradun, India</p>
            </div>
            <div className="hover:scale-105 transition-transform duration-300 origin-left">
              <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-2">Email</p>
              <a href="mailto:hello@rahulchanda.com" className="text-xl font-medium flex items-center gap-2 hover:text-[#ff4d29] transition-colors dw-link">
                <span><Mail size={20} className="text-[#ff4d29] inline mr-2"/>hello@rahulchanda.com</span>
                <span><Mail size={20} className="text-[#ff4d29] inline mr-2"/>hello@rahulchanda.com</span>
              </a>
            </div>
          </div>

          <div className="mt-16 flex gap-6 text-gray-400">
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:scale-125 transition-all duration-300"><Linkedin size={24} /></a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:scale-125 transition-all duration-300"><Instagram size={24} /></a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:scale-125 transition-all duration-300"><Facebook size={24} /></a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:scale-125 transition-all duration-300"><Twitter size={24} /></a>
          </div>
        </div>
      </div>
    </div>
  );
}

const FOOD_IMAGES = [
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/43f6a167-ade0-4730-abff-63eda623409a_rw_3840.jpg?h=1f046738d7506a03676d7ae63c902902",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/85353320-7ea0-4f86-93d6-594dca06c275_rw_3840.jpg?h=09a780bdda06722870faa29eaf738b36",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/d7bdb38b-1cdf-4191-a11c-b7d7f81c29a7_rw_3840.jpg?h=ad7de820237ca6f2b97e66e0c06b160d",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/c11beff6-678f-42e4-8719-25dd21e8c312_rw_3840.jpg?h=9cb7b39c0433f410b487493c54a40657",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/e96a1303-b49f-4356-af52-6664435de31e_rw_3840.jpg?h=34f06bf18dc05f3b250a19053d52b092",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/21a863bd-a17f-463a-a99a-4e901b50f3ef_rw_3840.jpg?h=327ed1c25f5174c7b8c42977bcabb123",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/1ab455e8-63f1-4e19-ad33-184ec2996325_rw_3840.jpg?h=302b15705f918862605f61b710e0970a",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/27cd065f-c2eb-4ad7-9434-ab883bdc0617_rw_3840.jpg?h=d6ae054438c7dd13eccc11bae0a08c65",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/33f8e75b-f12d-40e8-ab12-f6f3ade6d38e_rw_3840.jpg?h=f07a44deb2ecd7bd051bd8d08d91373a",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/e74f97c7-8f52-44ef-b55f-41314e20555e_rw_3840.jpg?h=ea21299af5ff3861dd108943644aafac",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/94a3d515-0456-4ce9-9582-32a724fcfa6e_rw_3840.jpg?h=225f5bc576d7ce2af135322a482348af",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/7ab2f8a4-f47c-49b9-8d64-fe083554d11f_rw_3840.jpg?h=2eb9ca9b4f7043d34cbf19787a37969d",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/03d5d46e-8088-433a-8519-13c90ac39957_rw_3840.jpg?h=fb17d2edf3859eca3b96d05fe3b99a28",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/b555e018-78e6-41b9-aea1-4c9e82a16916_rw_3840.jpg?h=8faa5b41c888be8e9d1c610e86f84664",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/f9df7fbc-f30e-4c13-9dee-63f5a79cb7b2_rw_3840.jpg?h=abcc421819e8c6ac56fecf11f7da2949",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/17324dea-0ce2-4d4a-a7bb-20932ddd3bb8_rw_3840.jpg?h=c32e3b805c3684c025e6228010124fc0",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/71db6970-e60b-4674-9a01-75f783f4c98d_rw_3840.jpg?h=36ef6d0d1e8b772a015fb3b821b632fc",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/45d44f05-5246-43f4-b6ee-3ad1a0621dd7_rw_3840.jpg?h=9ccefc0c09955ef7faf3f777ec465acd",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/75b0f703-1f39-462a-ad5d-cbff2dc1eaa2_rw_3840.jpg?h=2d9bdce9fe0694d61b1b902c016722b6",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/8c49f4db-4d08-44fc-a036-6a386c9315bc_rw_3840.jpg?h=21c56d3d1c2ba671eca7e83d48fd1644",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/2286e575-d0af-445e-86db-e2bfcb63d4df_rw_3840.jpg?h=df6ce18db9297a3b44b25b122db275fc",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/18296a06-8e5e-415e-97ce-fd533b457daf_rw_3840.jpg?h=a15410a5ecfbb88cdc172f29c26c5d28",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/d3c880bb-2e26-477e-9286-4bf8411696fc_rw_3840.jpg?h=d191c106c7ad3377e9e2d43e082625b0",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/4bd97835-7d5d-4f83-bf5c-fb1d4301602a_rw_3840.jpg?h=66db8aeba6abed5ec405c2c4283f2ff0",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/c1ebe6ae-9b4c-4d59-8fc4-191cd2475f45_rw_3840.jpg?h=50d86cbbe52d658e07894aec085ae747",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/918cffc7-4a81-4665-ba9d-4d7b195b165f_rw_3840.jpg?h=c423f07f886706acf9241587627fd6a6",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/97f0117e-4a01-4b66-9c8a-9cd5f70f0137_rw_3840.jpg?h=c9ff337a03aa1f2456fa653a01a5a79c",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/b83ef43b-42cb-4bbc-85c2-ff3f705a6338_rw_3840.jpg?h=a99524b62e8a7b12780b3fb891c7676a",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/c1a75ece-445d-403a-8250-7131ddd600fd_rw_3840.jpg?h=439cba92992426775785b877e65bf3d1",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/403e7ad6-ea9f-4092-87c5-020b9a300c6e_rw_3840.jpg?h=f9f296e77dbc3b581e42b232db3e0a33"
];

function FoodPhotography() {
  return (
    <div className="min-h-screen w-full bg-transparent text-white font-sans selection:bg-[#ff4d29] selection:text-white flex flex-col relative">
      <Navbar />
      <div className="flex-1 px-6 md:px-12 pt-32 pb-20 z-20 max-w-7xl mx-auto w-full">
        <div className="mb-12">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 text-sm font-bold uppercase tracking-widest dw-link"><span><ArrowRight size={16} className="rotate-180 inline mr-2" />Back to Portfolio</span><span><ArrowRight size={16} className="rotate-180 inline mr-2" />Back to Portfolio</span></Link>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase cursor-default flex flex-col items-start"><span className="dw-link"><span>Food</span><span>Food</span></span><span className="dw-link"><span>Photography.</span><span>Photography.</span></span></h1>
        </div>
        
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {FOOD_IMAGES.map((src, idx) => (
            <div key={idx} className="break-inside-avoid overflow-hidden rounded-sm group cursor-pointer" onClick={() => openLightbox(src, `Food Photography ${idx + 1}`)}>
              <LiquidImage 
                src={src} 
                alt={`Food Photography ${idx + 1}`} 
                className="w-full h-auto"
                imgClassName="transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const PRODUCT_IMAGES = [
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/5099dd32-d0b6-4908-93dc-2524d685cbcb_rw_3840.jpg?h=3e757b7abb3eb6479521614860d5ef26",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/55a43abe-7e24-4561-affe-77e4f0bec6ff_rw_3840.jpg?h=bf461c420d90de123efa54d0abee6bc2",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/1b65e604-e215-452a-a636-c13bd58327e7_rw_3840.jpg?h=d41348e1edad9685cf9b3fe9f2344f31",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/5dc3c01c-1c41-4098-a93c-2ace94874a72_rw_3840.jpg?h=d149073012ba52c1cca3ed42ea5009f4",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/de6e5590-9b8e-4736-b267-baa10c9215e9_rw_3840.jpg?h=3129c7afeb29a5df268b362c72a024dd",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/1c356127-d1ff-4e23-9773-085a29467c34_rw_3840.jpg?h=e1c444e33d7800e97ae035f0bf8572da",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/0cdefa10-8fdf-4f29-8dc4-7a84eeeef80b_rw_3840.jpg?h=aae9c11d3fd0e0e2fdd92c2a481b1a01",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/3ce2b0f5-891c-4ea1-b794-530064e3185d_rw_3840.jpg?h=f8f8ac97bebc8d7a4bf1a3c462f7de4a",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/31199a14-a75e-4810-9fd8-d73916ba04e9_rw_3840.jpg?h=8a254c56ca7b10e20e29ba53b8d8d16f",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/c4a32892-7be0-4461-b62f-0bea4f33f480_rw_3840.jpg?h=0053d1f7658ca1ca20a6f533c597324e",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/e32db02a-8358-4902-9bbe-8e49ca8f6827_rw_3840.jpg?h=e5f44dd12401e62c46737b48e9f4de18",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/f95fa3d6-9f86-4500-8110-8b476f306769_rw_3840.jpg?h=75df9fb88fe019bcd601a20d8370f0f5",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/f2c67f5e-aa13-46b9-9fa5-506aa1b93330_rw_3840.jpg?h=107fbe4df9f7b44fa582501a68bc7fa9",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/ab1afd5f-957d-4288-8e17-ae8665e638e8_rw_3840.jpg?h=fb23634c64ab66f1a815cd8a283745ba",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/066118af-1dfa-450c-88f5-28d8970973b0_rw_3840.jpg?h=94d49b9ff5d150b0fc31173058a0416a",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/6215030e-86ad-4741-bddf-88a60168a2a8_rw_3840.jpg?h=0fc5c9f4c291092aa1b7c659fa34dfa7",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/43092f56-1666-4d8f-9c8b-f5dad0d2ba31_rw_3840.jpg?h=881fef9aaa440be5c1765ce75771436b",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/eb53d550-0150-41e3-8734-bef4229d4b94_rw_3840.jpg?h=65e3f1d697d9cdc98c8e66613aad8584",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/1fadba4d-f852-49a0-b3ca-82de6d13f7e8_rw_3840.jpg?h=f5b365227d73cb9b8eab62425faebd0d",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/0e733894-49ca-484e-a5a7-eca8e463f125_rw_3840.jpg?h=19b3f1248d74d5cc1f3547c16c6dff3f"
];

const INSTAGRAM_IMAGES = [
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/f9698532-0490-4b4d-b74e-093228366e4d_rw_3840.png?h=b378c10ddabe2b74ad8a668f72ff592c",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/5c2d831a-1255-40b1-81c0-da0e8df7269e_rw_1200.png?h=3d4306a01dab8328f6e27a74a7c266ca",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/dd2d1db5-6f02-48ea-a82d-d87eefb522c5_rw_1200.png?h=cc393da777503075c0ee8efbfebb80ed",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/b9a18522-bd78-40c1-bc5b-6386c1579557_rw_1200.png?h=63a2848402a621fc371ab1e02bcc2082",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/42995170-c36a-4008-8a21-3b0cc1fe948f_rw_1200.png?h=da90c94035dfc080b78502f44894fbba",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/911b2ab1-a592-4077-9f59-d0a79131037c_rw_1920.png?h=4cf949876cf5bcac4050428a04eb7eec",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/50f82c6b-1054-495a-baf6-7e5669375937_rw_1920.png?h=cfa81ce2f8435ec55cb7283578426be7",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/ebe4d031-4c94-48ca-8ab2-a2ffbd1ffb93_rw_1920.png?h=55fc44aadc1ffa85e56178b1ddf8d444",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/5f2fe292-2b1e-419b-868c-5f3fedec081a_rw_1920.png?h=41bfc48cb1591bb8da83283b55806bf5",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/45493777-3d84-430b-bfdf-87bb441f821d_rw_1920.png?h=61c4483518219977d7ee41e03828d497",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/8e7b45e7-e1cb-4db8-b437-dc11585f38cb_rw_1200.png?h=8bb6c1a85a275ec9346439a4b6038cfa",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/6b97e545-fedc-4247-acf4-5116f127fed1_rw_1920.png?h=59f5a071e76b816501420f88d8900cb6",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/d9d317e6-acd9-4362-87e5-c5d24794e01b_rw_1920.png?h=cbf504b006d2b152e903cbbabfaad9ff",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/dd7652ef-18a4-4531-99f3-0aeb446e1ac4_rw_1920.png?h=0b1f02d64fdf313d395d3c4725383906",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/85f5c666-070a-4d57-847a-c0fd3bb6efc5_rw_1200.png?h=eb5c5bfad137195fddd480fd35792ff5",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/1e8730f7-d596-4398-8a08-fbf63d5e1ded_rw_1200.png?h=aec43857c6f0cbb032aa888e4ebdbade",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/05448dfd-2bec-4731-9e82-f94781d36702_rw_1200.png?h=8fb44ad685fd556cab37e867d2426dc1",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/a56b46e8-4da7-4f44-9779-813d65487ba3_rw_1200.png?h=0c3753effe8c45e273dc46a5352b0685",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/833f802c-6f5c-4ce6-bc10-3878e5b57fa5_rw_1200.png?h=19f2d751f0ee92137e882f46c21790a5",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/f5042638-5d8f-4eb8-af03-3909c53a4f6d_rw_1200.png?h=ec557c04f2d103866a4b177b60f35f44"
];

const HYPE_INSTAGRAM_IMAGES = [
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/ff2aa30e-88f4-453a-a6d5-c2cc23b4d8e8_rw_1920.jpg?h=b8f344f9f9901f8ff46a5e9d2476d00b",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/a30208df-2b16-4c33-8ca9-548a1bae1662_rw_1920.jpg?h=b27a13132cf9ec1014f5fa24bbc60d72",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/1951f022-2520-464f-bf8a-922d5c1ea2b1_rw_1920.jpg?h=df1c80a73953f713fd161baeca318195",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/32a0a6a8-1c65-486d-8427-c2e4f2b7647a_rw_1920.jpg?h=420d64e838e1a19ab6733a9f730f3681",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/af6b997e-853b-4675-9b50-25e894fccb97_rw_1920.jpg?h=cb100595fe9182eb775e9aada3f6c511",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/1483ad5e-0625-4f0c-86df-722080112dc2_rw_1920.jpg?h=c0475d7ade9ec3276a847ad61ed15dd1",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/a6de8817-8b44-47a5-ae92-369952699dba_rw_1920.jpg?h=dfbe0e019addbc3b9a0c0ceabcf851ed",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/385983c9-e165-41a4-9970-a88d085b5348_rw_1920.jpg?h=4e353c63cfbf278cf16f42d9677d359e",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/be62e8f1-40b8-4857-aa49-4579a4a76760_rw_1920.jpg?h=f03f36e8b31e350e6c7bf968b5353d89",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/71aa6f90-e737-40da-aa25-d9f78753a0c6_rw_1920.jpg?h=de319d6fda9b31d24b9ccb747b81d9a5",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/beab06da-724f-4193-aa22-28840224444b_rw_1920.jpg?h=f87ce13c7b0f94049e034a4d16f8f2fa",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/b113c15e-c600-4110-abf7-489303496d1b_rw_1920.jpg?h=a3ca47e8329db038de8b4b8c85279105",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/dc93bb57-86d4-4602-aeb5-2122e6e13232_rw_1920.jpg?h=99c216a9767e971088877db91332eab6",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/65b23661-c863-4dbe-8b5b-af596ad9f1b4_rw_1920.jpg?h=f330de303ae557f6a2ce57225cb2fa07",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/e635138d-9b2b-4dca-933c-b3422c726501_rw_1920.jpg?h=91b7b04a3b38cfc1728c3534316c1b99",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/4099fd18-2799-4477-831c-914cc13fe7ab_rw_1920.jpg?h=298b0cf1a32fa322c38e5c42a7311a71",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/939da69b-45cf-4630-bddc-3c4c87a6e7bc_rw_1920.jpg?h=d7e4bc3dd131a82983ee548c7fe703f4",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/c758642e-5690-4bcf-9b66-6ec9c8cd303a_rw_1920.jpg?h=9d546a12fa4cc3d666fd440ce9d26de",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/de70e940-b9b9-45cf-881b-5ae6ca5946eb_rw_1920.jpg?h=8553b364eff8737f1be9faeef706d268",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/79e58996-19ae-4278-b3bd-177f9d650375_rw_1920.jpg?h=3fb444ba12d2889cf687c13679480015"
];

const VIDEO_URLS = [
  "https://www-ccv.adobe.io/v1/player/ccv/4c-N7vz89QL/embed?bgcolor=%23191919&lazyLoading=true&api_key=BehancePro2View",
  "https://www-ccv.adobe.io/v1/player/ccv/7WXoUhyodM2/embed?bgcolor=%23191919&lazyLoading=true&api_key=BehancePro2View",
  "https://www-ccv.adobe.io/v1/player/ccv/HHcaLFjov8h/embed?bgcolor=%23191919&lazyLoading=true&api_key=BehancePro2View"
];

const NEW_COLLECTION_IMAGES = [
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/83e879ce-baf2-424e-98f7-667d2bf2dfab_rw_1200.jpg?h=b906f7f3409a2f7bbe9614ee160e0d0e",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/e41602e7-a4ec-4522-8be8-a7119e890ef4_rw_1920.jpg?h=2b2728f7ce1c55a30493a59ee65f2495",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/b1ccafe3-910f-4584-baa8-f5a7d1d9bb72_rw_1920.jpg?h=f378734ffbc2df5afbd008a3203bad9b",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/00266405-5afa-4e46-aa77-3416265c5326_rw_1920.jpg?h=ae4465c88c824381c008e6cb93aa5179",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/cf2283af-df83-4e37-9e0e-1377570ce248_rw_1200.jpg?h=3ad730b6cf462e55d47de1725990c913",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/eabe7afe-0de7-4e3e-844c-c053f63bc9c8_rw_1200.jpg?h=a4285092a813234c339394c25d20f33c",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/e5aa6e06-ed51-4bdb-8fc7-6e31be953d0d_rw_1200.jpg?h=89e751a9440465f52d19257ee5a4d947",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/ba301f73-d8c2-487f-9e54-10b094e691d1_rw_1200.jpg?h=bf95d9dce053b347b10bb33cced8bb38",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/221c1f93-05d4-4b65-a842-c2bf2b22cd51_rw_1200.jpg?h=f326ce45c5aa30f4dd00d15ba1e259d0",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/737f76e7-0cbb-4020-a7d1-ffaedc536207_rw_1200.jpg?h=5a7ef3b023eeb8a15781a9f22ddc5401",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/22525c6e-104a-4d4f-84b7-ebb08d8884e2_rw_1200.jpg?h=4b7169c4012a9a539f1ea8265349735b",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/5cbe1c1c-fbcc-4547-8e5e-a8a8b239b639_rw_1920.png?h=8fea929d7f60ac5993d21a3bbde555c8",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/47912a8d-1319-43c1-ae3b-0ef3f73b4fbe_rw_1920.png?h=6800979bd8ea95f0f4041716eb6908b1",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/2b793528-d67a-431b-b970-03fa29f831ef_rw_1920.png?h=a3cc5abb3b5199981a4c53ee6bf327f0",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/10e57d83-7b15-439d-8ce1-fa3b6f44dd1e_rw_1920.png?h=b0a7de084975988787bd0763aaf5a359",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/9fd8adb5-b146-4c52-9fd0-a95a20edd16d_rw_1920.png?h=c5779b47786d3e3ded6f9b3fbdfb0e12",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/ccb40ce9-aa4d-4d94-abaa-53ca01594597_rw_1920.png?h=20ae5276d9bf9a5a7515e24e34674892",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/a2755795-bbd0-4fe3-bf55-78bd2eda3025_rw_1920.png?h=81873e94e6ef04da0060c7368b4c7daf",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/183bb543-1094-426a-912f-a83cdedfcd4f_rw_1920.png?h=31857a54138c377ebabf20b746d5fea6",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/37052456-bbf3-47ac-995f-42161f5f0182_rw_1920.png?h=f3363ae29a9ddca1b38f4c5a53778668",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/a9cae052-3fbf-4803-afc5-093b214dbbe0_rw_1920.png?h=5fa6f762a98c6485b5a6c233962c71bc",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/b59715c1-25ef-4ddf-85fc-e72eac989c02_rw_1920.png?h=2b2ce3fe0b473af779bbc7ca8dba0790",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/76121542-cbaa-4552-beba-c78deb50544f_rw_1920.png?h=7e81c89c44f2646f97222c9f27a1a170",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/f23e77ce-9b2a-45aa-a03e-f25be8ff6cef_rw_1920.png?h=c46d83580b504f5e1f077f8f0453c725",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/c44f9970-f9bf-4ee4-9749-50c2dc8debf4_rw_1920.png?h=ca8f694892c05298c0146866dad5dbe3",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/5f010394-c964-478e-b813-3f002f09da4f_rw_1920.png?h=c28f7cb31350eb9cbc326a7553473f5e",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/99fa5bb8-82a1-4411-8960-a8ee7d9cc7b6_rw_1920.png?h=24c812bb1471a8120033339402da9d9a",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/e9a9d06b-ce56-4197-b7eb-86916fa2e58d_rw_1920.png?h=366ce0d31a3d5dd021e90fec0bc20a6f",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/415728c2-fced-41be-94d5-938374c151b4_rw_1920.png?h=b84b196233dfe01d25c28b860d73b99d",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/a0c64654-f7ea-4e39-96e1-e05a7e76a94a_rw_1920.png?h=32d12fed6e873c4ddc2ad8419b3cbdfd",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/77b910e1-f3df-4f42-9995-c1cb1577acf8_rw_1920.png?h=269410023f8fa91326eb5e2933acc67b",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/ae85f775-3265-418c-9987-af2231feb69e_rw_1920.png?h=3fa2e678f4fd0828ac37c6faa4e69534",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/6c4dff9c-85ac-437b-aa65-bbe4899598b4_rw_3840.jpeg?h=170aaaf444d0e2cd0d4f89b0f18c7a46",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/c63185db-861c-478c-919d-058ab9c6a416_rw_1920.png?h=1d53c0c1cee1b248712bd2f2fcd78ca1",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/851e51b6-4809-4f1e-8d8f-7bf220260eb6_rw_1200.png?h=1bd7595b23ae1f506545287fcd33cebf",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/9fc3d2ab-4179-4225-a876-5a034ebf7d32_rw_3840.jpg?h=5e436fdfb145d7370011db5d0705125f",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/98d504f6-d84c-4c3d-ad3c-ad1066fcae14_rw_3840.jpg?h=9d06cbc986f41cadabfdb0ce3106a3c0",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/74d4c25c-7304-4027-8de5-6f77a18da185_rw_3840.jpg?h=f4e067ccc80c152162c12e3f47987910",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/acdb0c5a-13bb-4266-9b1f-b8404a6097b2_rw_3840.jpg?h=27bca246348c65a9a02f08a5df4a0ee3",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/301f9488-c964-4365-80a7-0167bb6540ff_rw_3840.jpg?h=5c588ebba03bc5b4a44aa3869c739cde",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/cb0f1519-0375-493c-bcac-82df7b05296a_rw_3840.jpg?h=3f66a252df7e8366507bc623092d27f3",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/8af3a3aa-8ab8-4bf2-b725-03890a28c4b9_rw_3840.jpg?h=21b6cd29f520c4fe396caa6f921d3257",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/c5864367-6176-4599-9822-1c2614676242_rw_3840.jpg?h=e4b04d062753e88b6994e17c4ed1fad1",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/70c7afa5-6dd4-48dd-8ea0-c93b4d7793b2_rw_3840.jpg?h=ce85ebfa9027f9ba11d5d863e8080ff8",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/c7db756c-0b20-48b3-8efb-d33dde7aed9d_rwc_314x0x960x720x960.png?h=c5d677b41397b7bd25c39c5f36edf4ae",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/3f99bab9-ae72-4fc8-b719-6f7ae95c893b_car_4x3.jpg?h=c904891974b1f3c1d3da9587288dbb65",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/7eea0388-ec38-4978-83ac-c25dbeaca0a2_car_4x3.jpg?h=6e8414e2160f4c16c6723e9c74a5e8a1",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/b4309447-52da-4499-9b77-2d9e1293007f_car_4x3.jpg?h=29aaeebb9d1cc18236d2543edb3e232b",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/e7704883-9a43-4a05-90fe-0e3dd5098079_car_4x3.jpg?h=f09c1d94876cf904338f6c31e7e14d5e",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/9489b153-1623-4ef7-93a0-3a37b6578595_car_4x3.jpg?h=6d985636ab51ec761b8a3f242bffeea8",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/a202509d-8084-4f6b-99e1-5ee8c0fbb4e5_car_4x3.png?h=cc6b1cf56ae8dc85ce00003a5a2f90e9",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/90cd6e2d-3879-4ecc-9c0e-ce986c0000a9_rwc_0x750x3840x2880x3840.jpg?h=4a6d22b3463a88ba5dc3d0be45b2d2f9",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/949098e8-f14b-451b-9c23-a879e109c6f2_rwc_217x0x3417x2563x3417.jpg?h=87c50df55bf932fdfaefb0648cbac5fb",
  "https://cdn.myportfolio.com/69546baf-dc28-4990-bf93-53ab8f221e1d/4c0174de-bec6-4370-9c91-5a031bf9ebab_car_4x3.jpg?h=be74aa1e8b8b381cd82bf620d2a8192f"
];

function ProductPhotoshot() {
  return (
    <div className="min-h-screen w-full bg-transparent text-white font-sans selection:bg-[#ff4d29] selection:text-white flex flex-col relative">
      <Navbar />
      <div className="flex-1 px-6 md:px-12 pt-32 pb-20 z-20 max-w-7xl mx-auto w-full">
        <div className="mb-12">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 text-sm font-bold uppercase tracking-widest dw-link"><span><ArrowRight size={16} className="rotate-180 inline mr-2" />Back to Portfolio</span><span><ArrowRight size={16} className="rotate-180 inline mr-2" />Back to Portfolio</span></Link>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase cursor-default flex flex-col items-start"><span className="dw-link"><span>Product</span><span>Product</span></span><span className="dw-link"><span>Photoshot.</span><span>Photoshot.</span></span></h1>
        </div>
        
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {PRODUCT_IMAGES.map((src, idx) => (
            <div key={idx} className="break-inside-avoid overflow-hidden rounded-sm group cursor-pointer" onClick={() => openLightbox(src, `Product Photoshot ${idx + 1}`)}>
              <LiquidImage 
                src={src} 
                alt={`Product Photoshot ${idx + 1}`} 
                className="w-full h-auto"
                imgClassName="transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InstagramDesign() {
  return (
    <div className="min-h-screen w-full bg-transparent text-white font-sans selection:bg-[#ff4d29] selection:text-white flex flex-col relative">
      <Navbar />
      <div className="flex-1 px-6 md:px-12 pt-32 pb-20 z-20 max-w-7xl mx-auto w-full">
        <div className="mb-12">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 text-sm font-bold uppercase tracking-widest dw-link"><span><ArrowRight size={16} className="rotate-180 inline mr-2" />Back to Portfolio</span><span><ArrowRight size={16} className="rotate-180 inline mr-2" />Back to Portfolio</span></Link>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase cursor-default flex flex-col items-start"><span className="dw-link"><span>Instagram</span><span>Instagram</span></span><span className="dw-link"><span>Design.</span><span>Design.</span></span></h1>
        </div>
        
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {INSTAGRAM_IMAGES.map((src, idx) => (
            <div key={idx} className="break-inside-avoid overflow-hidden rounded-sm group cursor-pointer" onClick={() => openLightbox(src, `Instagram Design ${idx + 1}`)}>
              <LiquidImage 
                src={src} 
                alt={`Instagram Design ${idx + 1}`} 
                className="w-full h-auto"
                imgClassName="transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HypeInstagramDesign() {
  return (
    <div className="min-h-screen w-full bg-transparent text-white font-sans selection:bg-[#ff4d29] selection:text-white flex flex-col relative">
      <Navbar />
      <div className="flex-1 px-6 md:px-12 pt-32 pb-20 z-20 max-w-7xl mx-auto w-full">
        <div className="mb-12">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 text-sm font-bold uppercase tracking-widest dw-link"><span><ArrowRight size={16} className="rotate-180 inline mr-2" />Back to Portfolio</span><span><ArrowRight size={16} className="rotate-180 inline mr-2" />Back to Portfolio</span></Link>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase cursor-default flex flex-col items-start"><span className="dw-link"><span>Hype Instagram</span><span>Hype Instagram</span></span><span className="dw-link"><span>Design.</span><span>Design.</span></span></h1>
        </div>
        
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {HYPE_INSTAGRAM_IMAGES.map((src, idx) => (
            <div key={idx} className="break-inside-avoid overflow-hidden rounded-sm group cursor-pointer" onClick={() => openLightbox(src, `Hype Instagram Design ${idx + 1}`)}>
              <LiquidImage 
                src={src} 
                alt={`Hype Instagram Design ${idx + 1}`} 
                className="w-full h-auto"
                imgClassName="transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VideoEditing() {
  return (
    <div className="min-h-screen w-full bg-transparent text-white font-sans selection:bg-[#ff4d29] selection:text-white flex flex-col relative">
      <Navbar />
      <div className="flex-1 px-6 md:px-12 pt-32 pb-20 z-20 max-w-7xl mx-auto w-full">
        <div className="mb-12">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 text-sm font-bold uppercase tracking-widest dw-link"><span><ArrowRight size={16} className="rotate-180 inline mr-2" />Back to Portfolio</span><span><ArrowRight size={16} className="rotate-180 inline mr-2" />Back to Portfolio</span></Link>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase cursor-default flex flex-col items-start"><span className="dw-link"><span>Video</span><span>Video</span></span><span className="dw-link"><span>Editing.</span><span>Editing.</span></span></h1>
        </div>
        
        <div className="grid grid-cols-1 gap-12 max-w-4xl mx-auto">
          {VIDEO_URLS.map((src, idx) => (
            <div key={idx} className="w-full aspect-video overflow-hidden rounded-sm bg-gray-900">
              <iframe 
                src={src} 
                title={`Video Editing ${idx + 1}`} 
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NewCollection() {
  return (
    <div className="min-h-screen w-full bg-transparent text-white font-sans selection:bg-[#ff4d29] selection:text-white flex flex-col relative">
      <Navbar />
      <div className="flex-1 px-6 md:px-12 pt-32 pb-20 z-20 max-w-7xl mx-auto w-full">
        <div className="mb-12">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 text-sm font-bold uppercase tracking-widest dw-link"><span><ArrowRight size={16} className="rotate-180 inline mr-2" />Back to Portfolio</span><span><ArrowRight size={16} className="rotate-180 inline mr-2" />Back to Portfolio</span></Link>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase cursor-default flex flex-col items-start"><span className="dw-link"><span>New</span><span>New</span></span><span className="dw-link"><span>Collection.</span><span>Collection.</span></span></h1>
        </div>
        
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {NEW_COLLECTION_IMAGES.map((src, idx) => (
            <div key={idx} className="break-inside-avoid overflow-hidden rounded-sm group cursor-pointer" onClick={() => openLightbox(src, `New Collection ${idx + 1}`)}>
              <LiquidImage 
                src={src} 
                alt={`New Collection ${idx + 1}`} 
                className="w-full h-auto"
                imgClassName="transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <MouseGradient />
      <Lightbox />
      <div className="relative z-10 flex flex-col min-h-[100vh]">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/food-photography" element={<FoodPhotography />} />
            <Route path="/portfolio/product-photoshot" element={<ProductPhotoshot />} />
            <Route path="/portfolio/instagram-design" element={<InstagramDesign />} />
            <Route path="/portfolio/hype-instagram-design" element={<HypeInstagramDesign />} />
            <Route path="/portfolio/video-editing" element={<VideoEditing />} />
            <Route path="/portfolio/new-collection" element={<NewCollection />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
