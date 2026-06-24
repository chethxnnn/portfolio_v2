import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNav } from './NavContext';
import { InstagramIcon, YoutubeIcon, LinkedinIcon, GithubIcon, TwitterIcon } from './Icons';
import { FaFileAlt } from 'react-icons/fa';

const professionalSections = [
  { id: 'education', label: 'Education', number: '01' },
  { id: 'about', label: 'About', number: '02' },
  { id: 'projects', label: 'Projects', number: '03' },
  { id: 'skills', label: 'Stack', number: '04' },
  { id: 'experience', label: 'Experience', number: '05' },
  { id: 'hobbies', label: 'Passions', number: '06' },
  { id: 'contact', label: 'Contact', number: '07' },
];

const mediaSections = [
  { id: 'media-instagram', label: 'Instagram', number: '01' },
  { id: 'media-youtube', label: 'YouTube', number: '02' },
  { id: 'media-linkedin', label: 'LinkedIn', number: '03' },
  { id: 'media-github', label: 'GitHub', number: '04' },
  { id: 'media-x', label: 'X (Twitter)', number: '05' },
];

const AgeCounter = () => {
  const [age, setAge] = useState({ datePart: '', timePart: '' });

  useEffect(() => {
    const dob = new Date('2004-04-20T00:00:00');
    
    const updateAge = () => {
      const now = new Date();
      let years = now.getFullYear() - dob.getFullYear();
      let months = now.getMonth() - dob.getMonth();
      let days = now.getDate() - dob.getDate();
      let hours = now.getHours() - dob.getHours();
      let minutes = now.getMinutes() - dob.getMinutes();
      let seconds = now.getSeconds() - dob.getSeconds();

      if (seconds < 0) {
        minutes -= 1;
        seconds += 60;
      }
      if (minutes < 0) {
        hours -= 1;
        minutes += 60;
      }
      if (hours < 0) {
        days -= 1;
        hours += 24;
      }
      if (days < 0) {
        months -= 1;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
      }
      if (months < 0) {
        years -= 1;
        months += 12;
      }

      setAge({
        datePart: `${years} years ${months} months ${days} days`,
        timePart: `${hours} hours ${minutes} minutes ${seconds} seconds`
      });
    };

    updateAge();
    const interval = setInterval(updateAge, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-[9px] md:text-[10px] font-mono text-[#666666] tracking-[0.1em] uppercase mt-1 leading-relaxed">
      <div>{age.datePart}</div>
      <div>{age.timePart}</div>
    </div>
  );
};

const ProgressiveNav = ({ resumeUrl }) => {
  const { pinnedSections, setPinnedSections, viewMode, setViewMode } = useNav();
  const prevVisibleRef = useRef([]);

  const [isAtBottom, setIsAtBottom] = useState(false);
  const [activeColor, setActiveColor] = useState('#ffffff');
  const [showMobileColors, setShowMobileColors] = useState(false);
  const [isResumeExpanded, setIsResumeExpanded] = useState(false);

  const activeSections = viewMode === 'professional' ? professionalSections : mediaSections;

  useEffect(() => {
    // Reset pinned sections when mode changes
    setPinnedSections([]);
    prevVisibleRef.current = [];
  }, [viewMode, setPinnedSections]);

  useEffect(() => {
    const handleScroll = () => {
      // Check if user is at the very bottom of the page
      const scrolledToBottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50;
      setIsAtBottom(scrolledToBottom);

      const newPinned = [];

      for (const section of activeSections) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        
        if (rect.top < 100) {
          newPinned.push(section.id);
        }
      }

      if (JSON.stringify(newPinned) !== JSON.stringify(prevVisibleRef.current)) {
        prevVisibleRef.current = newPinned;
        setPinnedSections(newPinned);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSections, setPinnedSections]);

  const scrollTo = (id) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  let nextSection = null;
  if (isAtBottom) {
    nextSection = { id: 'top', label: 'Top of Page' };
  } else if (pinnedSections.length === 0) {
    nextSection = activeSections[0];
  } else {
    const currentSectionId = pinnedSections[pinnedSections.length - 1];
    const currentIndex = activeSections.findIndex(s => s.id === currentSectionId);
    if (currentIndex >= 0 && currentIndex < activeSections.length - 1) {
      nextSection = activeSections[currentIndex + 1];
    } else if (currentIndex === activeSections.length - 1) {
      nextSection = { id: 'top', label: 'Top of Page' };
    }
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none p-4 md:p-8">
      <div className="w-full relative flex justify-between items-start">
        
        {/* Name / Logo & Age Counter — always visible on the left */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="pointer-events-auto flex flex-col items-start"
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-white hover:opacity-50 transition-opacity whitespace-nowrap flex items-baseline tracking-tighter font-black text-2xl md:text-3xl"
          >
            Chethan P.
          </button>
          <div>
            <AgeCounter />
          </div>
          <a
            href={resumeUrl || "/Chethan_P_Resume.pdf"}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block mt-4 px-4 py-2 bg-white text-black font-mono text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#dddddd] transition-colors rounded-sm shadow-md"
          >
            Resume
          </a>

          {/* Mobile Collapsible Resume */}
          <div className="md:hidden mt-3 relative">
            <motion.div
              layout
              className="bg-white text-black overflow-hidden rounded-sm flex items-center shadow-lg"
              style={{ height: '24px' }}
            >
              <button 
                onClick={() => setIsResumeExpanded(!isResumeExpanded)} 
                className="w-8 h-full flex items-center justify-center shrink-0 hover:bg-[#dddddd] transition-colors"
              >
                <FaFileAlt size={12} />
              </button>
              <AnimatePresence>
                {isResumeExpanded && (
                  <motion.a
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 'auto', opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    href={resumeUrl || "/Chethan_P_Resume.pdf"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pr-3 font-mono text-[9px] font-bold tracking-[0.2em] uppercase whitespace-nowrap overflow-hidden flex items-center"
                  >
                    Resume
                  </motion.a>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>

        {/* Dynamic Center Pill */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 pointer-events-auto hidden md:flex">
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className={`flex items-center shadow-2xl overflow-hidden backdrop-blur-md transition-all duration-300 ${
              pinnedSections.length > 0 
                ? 'bg-[#0a0a0a]/70 border border-[#222222] rounded-full px-2 py-1.5 gap-1' 
                : 'bg-transparent border-transparent px-0 py-0 gap-0'
            }`}
          >
            {activeSections.map((section) => {
              const isPinned = pinnedSections.includes(section.id);
              if (!isPinned) return null;

              return (
                <motion.button
                  key={section.id}
                  layoutId={`nav-item-${section.id}`}
                  onClick={() => scrollTo(section.id)}
                  className="relative px-3 py-1.5 rounded-full text-[11px] font-mono tracking-[0.15em] uppercase text-[#888888] hover:text-white transition-colors bg-transparent hover:bg-[#1a1a1a]"
                  transition={{
                    type: 'spring',
                    stiffness: 280,
                    damping: 16,
                    mass: 1,
                  }}
                >
                  {section.label}
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        {/* Pro / Media Mode Toggle & Color Picker (Right Side) */}
        <div className="pointer-events-auto flex flex-col items-end gap-3">
          <div 
            className={`flex items-center bg-[#111111] border rounded-full p-1 relative transition-all duration-300 ${
              isAtBottom 
                ? 'border-white/60 shadow-[0_0_20px_rgba(255,255,255,0.4)] animate-pulse' 
                : 'border-[#333333] shadow-xl'
            }`}
          >
            <button
              onClick={() => {
                setViewMode('professional');
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              className={`relative px-3 py-1.5 text-[8px] md:px-4 md:py-1.5 md:text-[10px] font-mono font-bold tracking-[0.2em] uppercase transition-colors rounded-full ${
                viewMode === 'professional' ? 'text-black' : 'text-[#888888] hover:text-white'
              }`}
            >
              {viewMode === 'professional' && (
                <motion.div
                  layoutId="mode-slider"
                  className="absolute inset-0 bg-white rounded-full z-0"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10">Professional</span>
            </button>
            
            <button
              onClick={() => {
                setViewMode('media');
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              className={`relative px-3 py-1.5 text-[8px] md:px-4 md:py-1.5 md:text-[10px] font-mono font-bold tracking-[0.2em] uppercase transition-colors rounded-full ${
                viewMode === 'media' ? 'text-black' : 'text-[#888888] hover:text-white'
              }`}
            >
              {viewMode === 'media' && (
                <motion.div
                  layoutId="mode-slider"
                  className="absolute inset-0 bg-white rounded-full z-0"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10">Media</span>
            </button>
          </div>

          {/* Color Template Selector */}
          <div className="flex items-center bg-[#111111] border border-[#333333] rounded-full shadow-xl">
            {/* Desktop: always expanded */}
            <div className="hidden md:flex items-center gap-2 px-2 py-1.5">
              {[
                { id: 'white', hex: '#ffffff' },
                { id: 'red', hex: '#ff3333' },
                { id: 'blue', hex: '#3366ff' },
                { id: 'yellow', hex: '#ffcc00' },
                { id: 'orange', hex: '#ff6600' },
                { id: 'pink', hex: '#ff66cc' },
                { id: 'green', hex: '#00cc66' },
              ].map(color => (
                <button
                  key={`desktop-${color.id}`}
                  onClick={() => {
                    setActiveColor(color.hex);
                    document.documentElement.style.setProperty('--theme-white', color.hex);
                  }}
                  className={`w-3.5 h-3.5 rounded-full hover:scale-125 transition-all ${
                    activeColor === color.hex ? 'ring-2 ring-white/50 scale-125' : ''
                  }`}
                  style={{ backgroundColor: color.hex, border: color.id === 'white' ? '1px solid #444' : 'none' }}
                  title={color.id}
                />
              ))}
            </div>

            {/* Mobile: expandable */}
            <div className="flex md:hidden items-center gap-1.5 px-1.5 py-1">
              {!showMobileColors ? (
                <button
                  onClick={() => setShowMobileColors(true)}
                  className="w-3.5 h-3.5 rounded-full ring-2 ring-white/50"
                  style={{ backgroundColor: activeColor, border: activeColor === '#ffffff' ? '1px solid #444' : 'none' }}
                />
              ) : (
                [
                  { id: 'white', hex: '#ffffff' },
                  { id: 'red', hex: '#ff3333' },
                  { id: 'blue', hex: '#3366ff' },
                  { id: 'yellow', hex: '#ffcc00' },
                  { id: 'orange', hex: '#ff6600' },
                  { id: 'pink', hex: '#ff66cc' },
                  { id: 'green', hex: '#00cc66' },
                ].map(color => (
                  <button
                    key={`mobile-${color.id}`}
                    onClick={() => {
                      setActiveColor(color.hex);
                      document.documentElement.style.setProperty('--theme-white', color.hex);
                      setShowMobileColors(false);
                    }}
                    className={`w-3 h-3 rounded-full hover:scale-125 transition-all ${
                      activeColor === color.hex ? 'ring-2 ring-white/50 scale-125' : ''
                    }`}
                    style={{ backgroundColor: color.hex, border: color.id === 'white' ? '1px solid #444' : 'none' }}
                  />
                ))
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Mobile Bottom Footer Nav */}
      <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-auto flex md:hidden bg-[#0a0a0a]/90 backdrop-blur-md border-t border-[#222] px-2 py-2">
        <div className="w-full flex items-center justify-around gap-1 overflow-x-auto no-scrollbar">
          {activeSections.map((section) => {
            const isActive = pinnedSections.includes(section.id);
            const isLast = pinnedSections[pinnedSections.length - 1] === section.id;
            return (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className={`px-2 py-1.5 rounded-full text-[8px] font-mono tracking-[0.1em] uppercase whitespace-nowrap transition-all ${
                  isLast ? 'text-white bg-white/10' : isActive ? 'text-[#666]' : 'text-[#444]'
                }`}
              >
                {section.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Floating Next Section Button */}
      <AnimatePresence>
        {nextSection && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-16 md:bottom-8 right-4 md:right-8 z-50 pointer-events-auto flex flex-col items-end gap-2"
          >
            <button 
              onClick={() => scrollTo(nextSection.id)}
              className="text-[#888888] hover:text-white font-mono text-[8px] md:text-[10px] uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-1.5 md:gap-3 bg-[#0a0a0a]/80 backdrop-blur-md px-2.5 py-1.5 md:px-5 md:py-2.5 rounded-full border border-[#222222] hover:border-[#444444] shadow-xl hover:scale-105"
            >
              <span className="hidden md:inline">Next: </span>
              <span>{nextSection.id === 'top' ? 'Top' : nextSection.label}</span>
              <span className="text-white animate-bounce mt-0.5 md:mt-1 ml-0.5 md:ml-0">{nextSection.id === 'top' ? '↑' : '↓'}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProgressiveNav;
