import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Odometer = ({ target, suffix = "", label, isFloat = false }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target]);

  const displayCount = isFloat ? count.toFixed(1) : Math.floor(count);

  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
        {displayCount}{suffix}
      </div>
      <div className="text-[10px] md:text-xs font-mono text-[#888] uppercase tracking-[0.3em] mt-3">
        {label}
      </div>
    </div>
  );
};

const MediaHero = () => {
  return (
    <section id="media-hero" className="min-h-[90vh] flex flex-col items-center justify-center relative overflow-hidden bg-black px-4 md:px-8 pt-[25vh] md:pt-[20vh] pb-12">
      
      {/* 1. Kinetic Background Typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden opacity-30 select-none">
        <motion.div
          initial={{ x: "50%" }}
          animate={{ x: "-50%" }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="whitespace-nowrap"
        >
          <span 
            className="text-[15rem] md:text-[25rem] font-black uppercase tracking-tighter text-transparent"
            style={{ WebkitTextStroke: "2px rgba(255,255,255,0.15)" }}
          >
            INFLUENCE - SCALE - MEDIA - 
          </span>
        </motion.div>
      </div>

      {/* Deep Background Glow (White instead of purple) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none z-0" />

      {/* 2. Core Statement */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center w-full flex flex-col items-center"
        >
          <div className="relative inline-block mb-16 text-center">
            <span 
              className="absolute -top-8 sm:-top-12 md:-top-24 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-4 text-4xl sm:text-6xl md:text-[8rem] text-gray-300 tracking-wide z-10 drop-shadow-lg"
              style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
            >
              मेरी
            </span>
            <span className="text-[4rem] sm:text-[8rem] md:text-[16rem] font-black tracking-tighter text-white drop-shadow-2xl leading-none uppercase">
              MEDIA
            </span>
          </div>
        </motion.div>

        {/* 3. Stat Pills (No Boxes, Clean Numbers Below) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="w-full grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-6 sm:gap-12 md:gap-24 mt-8 md:mt-0"
        >
          <div className="flex items-center justify-center">
            <Odometer target={5.4} suffix="M+" label="Total Views" isFloat={true} />
          </div>
          <div className="flex items-center justify-center">
            <Odometer target={15} suffix="k+" label="Total Audience" isFloat={false} />
          </div>
          <div className="flex items-center justify-center">
            <Odometer target={8} suffix="" label="Active Channels" isFloat={false} />
          </div>
          <div className="flex items-center justify-center">
            <Odometer target={500} suffix="+" label="Daily Impressions" isFloat={false} />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default MediaHero;
