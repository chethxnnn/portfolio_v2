import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import SectionHeader from '../common/SectionHeader';



const WheelItem = ({ hobby, index, scrollRef, setItemRef, isActive }) => {
  const itemRef = useRef(null);

  // Expose the ref to the parent for exact scroll tracking
  useEffect(() => {
    setItemRef(index, itemRef.current);
  }, [index, setItemRef]);

  return (
    <motion.div
      ref={itemRef}
      className="py-12 flex items-center justify-start cursor-pointer origin-left"
      onClick={() => {
        if (itemRef.current && scrollRef.current) {
          const container = scrollRef.current;
          const item = itemRef.current;
          const scrollPos = item.offsetTop - (container.clientHeight / 2) + (item.clientHeight / 2);
          container.scrollTo({ top: scrollPos, behavior: 'smooth' });
        }
      }}
    >
      <motion.span 
        animate={{ 
          scale: isActive ? 1.5 : 1, 
          opacity: isActive ? 1 : 0.25,
          x: isActive ? 0 : 30
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        style={{ originX: 0 }}
        className={`text-2xl md:text-4xl font-sans font-semibold tracking-wider uppercase whitespace-pre-line text-left leading-tight transition-colors ${isActive ? 'text-white' : 'text-[#888]'}`}
      >
        {hobby.title}
      </motion.span>
    </motion.div>
  );
};

const Hobbies = ({ hobbies = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const mobileScrollRef = useRef(null);
  const itemRefs = useRef([]);

  const sortedHobbies = [...hobbies].sort((a, b) => a.order - b.order);

  const setItemRef = (index, el) => {
    itemRefs.current[index] = el;
  };

  // Desktop vertical scroll tracking
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const containerCenter = container.scrollTop + (container.clientHeight / 2);

    let closestIndex = 0;
    let minDistance = Infinity;

    itemRefs.current.forEach((item, index) => {
      if (!item) return;
      const itemCenter = item.offsetTop + (item.clientHeight / 2);
      const distance = Math.abs(containerCenter - itemCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  };

  const activeHobby = sortedHobbies[activeIndex] || sortedHobbies[0];

  if (!sortedHobbies.length) return null;

  return (
    <section className="py-12 md:py-32 px-6 relative z-10 overflow-hidden" id="hobbies">
      <div className="max-w-7xl mx-auto">
        <SectionHeader id="hobbies" label="Passions" title="Hobbies." index="06" />

        {/* === MOBILE HORIZONTAL LAYOUT === */}
        <div className="md:hidden mt-12">
          {/* Horizontal scrollable hobby titles */}
          <div 
            ref={mobileScrollRef}
            className="flex gap-6 overflow-x-auto no-scrollbar pb-6 snap-x snap-mandatory px-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {sortedHobbies.map((hobby, index) => (
              <button
                key={hobby._id || index}
                onClick={() => setActiveIndex(index)}
                className={`flex-shrink-0 snap-center px-4 py-3 rounded-full border transition-all duration-300 font-mono text-xs uppercase tracking-widest ${
                  activeIndex === index
                    ? 'bg-white text-black border-white scale-105'
                    : 'bg-transparent text-[#555] border-[#333] hover:border-[#555]'
                }`}
              >
                <span className="mr-2">{hobby.icon}</span>
                {hobby.title.replace('\n', ' ')}
              </button>
            ))}
          </div>

          {/* Active hobby content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeHobby._id || activeHobby.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="mt-6 px-2"
            >
              <div className="text-3xl mb-4">{activeHobby.icon}</div>
              <div className="font-sans text-sm text-[#bbbbbb] leading-relaxed text-justify">
                {activeHobby.desc}
              </div>
              {activeHobby.tools && (
                <div className="mt-6 text-[10px] font-mono text-[#888] uppercase tracking-[0.2em]">
                  {activeHobby.tools}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* === DESKTOP VERTICAL LAYOUT (unchanged) === */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-24 items-center mt-20">
          
          {/* Left Column: Dynamic Display */}
          <motion.div layout className="relative flex flex-col items-start md:items-end pr-0 md:pr-16 text-left md:text-right">
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-white/5 blur-[100px] rounded-full pointer-events-none" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={`desc-${activeHobby.title}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 border border-[#333333] rounded-[24px] flex items-center justify-center mb-8 shadow-xl bg-[#0a0a0a]/50">
                  <span className="text-4xl">{activeHobby.icon}</span>
                </div>
                <p className="font-mono text-sm text-[#888888] leading-relaxed max-w-lg text-justify">
                  {activeHobby.desc}
                </p>
                <p className="font-mono text-xs text-[#555] mt-6 tracking-widest uppercase">
                  {activeHobby.tools}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right Column: 3D Circular Scroller */}
          <div className="relative h-[500px] flex justify-start md:justify-start pl-0 md:pl-16">
            {/* Fade masks for top and bottom of scroller */}
            <div className="absolute inset-0 pointer-events-none z-20" style={{
              background: 'linear-gradient(to bottom, #000 0%, transparent 20%, transparent 80%, #000 100%)'
            }} />
            
            <div 
              ref={scrollRef}
              onScroll={handleScroll}
              className="w-full h-full overflow-y-auto no-scrollbar scroll-smooth pr-12"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {/* Padding to ensure first and last items can reach the vertical center */}
              <div className="h-[200px]" />
              
              <div className="flex flex-col">
                {sortedHobbies.map((hobby, index) => (
                  <WheelItem 
                    key={hobby._id || index} 
                    hobby={hobby} 
                    index={index} 
                    scrollRef={scrollRef}
                    setItemRef={setItemRef}
                    isActive={activeIndex === index}
                  />
                ))}
              </div>

              <div className="h-[200px]" />
            </div>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        ::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
};

export default Hobbies;
