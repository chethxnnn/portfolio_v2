import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { InstagramIcon, YoutubeIcon, LinkedinIcon, GithubIcon, TwitterIcon } from '../common/Icons';

const useScrollSpy = (ids) => {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      let currentActive = null;
      for (const id of ids) {
        const el = document.getElementById(`media-${id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Check if the section overlaps with the middle of the viewport
          if (rect.top <= window.innerHeight * 0.6 && rect.bottom >= window.innerHeight * 0.4) {
            currentActive = id;
            break;
          }
        }
      }
      setActiveId(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Trigger immediately to check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [ids]);

  return activeId;
};

const StoryBlock = ({ name, handle, story, link, avatar }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    className="group relative pl-6 border-l border-[#333] hover:border-white transition-colors duration-500"
  >
    <div className="absolute w-2 h-2 bg-white rounded-full -left-[4.5px] top-4 opacity-0 group-hover:opacity-100 transition-opacity" />
    
    <div className="flex items-center gap-4 mb-2">
      {avatar && (
        <div className="w-12 h-12 rounded-full overflow-hidden border border-[#333] shrink-0">
          <img src={avatar} alt={name} className="w-full h-full object-cover" loading="lazy" />
        </div>
      )}
      <div>
        <h3 className="text-2xl md:text-3xl font-bold text-white">{name}</h3>
        <a href={link} target="_blank" rel="noreferrer" className="text-gray-500 font-mono text-xs hover:text-white transition-colors flex items-center gap-2">
          {handle} <FaExternalLinkAlt size={10} />
        </a>
      </div>
    </div>
    
    <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl font-serif mt-4">
      {story}
    </p>
  </motion.div>
);

const InstagramSection = ({ id, accounts = [] }) => {
  if (!accounts.length) return null;
  return (
    <div id={`media-${id}`} className="min-h-screen flex flex-col justify-center py-20 px-6 md:px-12">
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-5xl md:text-8xl font-bold bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent italic tracking-tighter"
      >
        Instagram
      </motion.h2>
      
      <div className="mt-6 flex flex-wrap gap-4 md:gap-8 font-mono text-xs md:text-sm uppercase tracking-widest text-pink-500 mb-16">
        <span>6,000+ Followers</span>
        <span className="hidden md:inline">•</span>
        <span>5M+ Views</span>
      </div>

      <div className="space-y-16">
        {accounts.map((acc, i) => (
          <StoryBlock key={acc._id || i} name={acc.name} handle={acc.handle} story={acc.description} link={acc.profileUrl} avatar={acc.logoUrl} />
        ))}
      </div>
    </div>
  );
};

const YoutubeSection = ({ id, accounts = [] }) => {
  if (!accounts.length) return null;
  return (
    <div id={`media-${id}`} className="min-h-screen flex flex-col justify-center py-20 px-6 md:px-12">
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-5xl md:text-8xl font-black text-[#FF0000] tracking-tighter"
        style={{ fontFamily: "'Oswald', sans-serif" }} 
      >
        YouTube
      </motion.h2>
      
      <div className="mt-6 flex flex-wrap gap-4 md:gap-8 font-mono text-xs md:text-sm uppercase tracking-widest text-[#FF0000] mb-16">
        <span>400k+ Total Views</span>
      </div>

      <div className="space-y-16">
        {accounts.map((acc, i) => (
          <StoryBlock 
            key={acc._id || i}
            name={acc.name}
            handle={acc.handle}
            avatar={acc.logoUrl}
            story={acc.description}
            link={acc.profileUrl}
          />
        ))}
      </div>
    </div>
  );
};

const LinkedinSection = ({ id, accounts = [] }) => {
  if (!accounts.length) return null;
  return (
    <div id={`media-${id}`} className="min-h-screen flex flex-col justify-center py-20 px-6 md:px-12">
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-5xl md:text-8xl font-bold text-[#0A66C2] tracking-tight"
      >
        LinkedIn
      </motion.h2>
      
      <div className="mt-6 flex flex-wrap gap-4 md:gap-8 font-mono text-xs md:text-sm uppercase tracking-widest text-[#0A66C2] mb-16">
        <span>9,000+ Connections</span>
        <span className="hidden md:inline">•</span>
        <span>500 Avg Daily Impressions</span>
      </div>

      <div className="space-y-16">
        {accounts.map((acc, i) => (
          <StoryBlock 
            key={acc._id || i}
            name={acc.name}
            handle={acc.handle}
            avatar={acc.logoUrl}
            story={acc.description}
            link={acc.profileUrl}
          />
        ))}
      </div>
    </div>
  );
};

const GithubSection = ({ id, accounts = [] }) => {
  if (!accounts.length) return null;
  return (
    <div id={`media-${id}`} className="min-h-screen flex flex-col justify-center py-20 px-6 md:px-12">
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-5xl md:text-8xl font-bold text-white tracking-tight"
      >
        GitHub
      </motion.h2>
      
      <div className="mt-6 flex flex-wrap gap-4 md:gap-8 font-mono text-xs md:text-sm uppercase tracking-widest text-gray-400 mb-16">
        <span>Open Source</span>
        <span className="hidden md:inline">•</span>
        <span>Engineering Prowess</span>
      </div>

      <div className="space-y-16">
        {accounts.map((acc, i) => (
          <StoryBlock 
            key={acc._id || i}
            name={acc.name}
            handle={acc.handle}
            avatar={acc.logoUrl}
            story={acc.description}
            link={acc.profileUrl}
          />
        ))}
      </div>
    </div>
  );
};

const XSection = ({ id, accounts = [] }) => {
  if (!accounts.length) return null;
  return (
    <div id={`media-${id}`} className="min-h-[70vh] flex flex-col justify-center py-20 px-6 md:px-12">
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-5xl md:text-8xl font-black text-white tracking-tighter"
      >
        X <span className="text-gray-600 font-light text-4xl md:text-6xl align-middle">(Twitter)</span>
      </motion.h2>
      
      <div className="mt-6 flex flex-wrap gap-4 md:gap-8 font-mono text-xs md:text-sm uppercase tracking-widest text-gray-500 mb-16">
        <span>Thoughts & Threads</span>
      </div>

      <div className="space-y-16">
        {accounts.map((acc, i) => (
          <StoryBlock 
            key={acc._id || i}
            name={acc.name}
            handle={acc.handle}
            avatar={acc.logoUrl}
            story={acc.description}
            link={acc.profileUrl}
          />
        ))}
      </div>
    </div>
  );
};

const SIDEBAR_ITEMS = [
  { id: 'instagram', icon: InstagramIcon, color: 'text-pink-500' },
  { id: 'youtube', icon: YoutubeIcon, color: 'text-[#FF0000]' },
  { id: 'linkedin', icon: LinkedinIcon, color: 'text-[#0A66C2]' },
  { id: 'github', icon: GithubIcon, color: 'text-white' },
  { id: 'x', icon: TwitterIcon, color: 'text-gray-300' },
];

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { createPortal } from 'react-dom';

const MediaShowcase = ({ mediaAccounts = [] }) => {
  const activeId = useScrollSpy(['instagram', 'youtube', 'linkedin', 'github', 'x']);
  const containerRef = useRef(null);

  const sidebarContent = (
    <div className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-10 z-[100] hidden md:flex">
      {SIDEBAR_ITEMS.map((item) => {
        const isActive = activeId === item.id;
        const Icon = item.icon;
        return (
          <a
            key={item.id}
            href={`#media-${item.id}`}
            className="relative group"
          >
            <motion.div
              animate={{
                scale: isActive ? 1.5 : 1,
                opacity: isActive ? 1 : 0.3,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`transition-colors duration-500 ${isActive ? item.color : 'text-gray-500 group-hover:text-white group-hover:opacity-100'}`}
            >
              <Icon className="w-6 h-6 md:w-8 md:h-8" />
            </motion.div>
            {/* Glow effect behind active icon */}
            {isActive && (
              <motion.div 
                layoutId="activeGlow"
                className={`absolute inset-0 blur-xl opacity-20 ${item.color}`}
              />
            )}
          </a>
        );
      })}
    </div>
  );

  return (
    <section ref={containerRef} className="relative w-full bg-black min-h-screen text-white pt-12 md:pt-24" id="content">
      
      {/* Portaled Icon Sidebar (Escapes parent CSS transforms to stay truly fixed) */}
      {typeof document !== 'undefined' && createPortal(sidebarContent, document.body)}

      <div className="flex max-w-7xl mx-auto">
        
        {/* Main Content Area (With left margin to account for fixed sidebar) */}
        <div className="flex-1 pb-32 md:ml-24 lg:ml-32">
           <InstagramSection id="instagram" accounts={mediaAccounts.filter(a => a.platform === 'instagram')} />
           <YoutubeSection id="youtube" accounts={mediaAccounts.filter(a => a.platform === 'youtube')} />
           <LinkedinSection id="linkedin" accounts={mediaAccounts.filter(a => a.platform === 'linkedin')} />
           <GithubSection id="github" accounts={mediaAccounts.filter(a => a.platform === 'github')} />
           <XSection id="x" accounts={mediaAccounts.filter(a => a.platform === 'x')} />
        </div>
        
      </div>
    </section>
  );
};

export default MediaShowcase;
