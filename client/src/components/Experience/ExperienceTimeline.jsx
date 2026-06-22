import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X as XIcon } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';

const ExperienceTimeline = ({ experience }) => {
  const [activeExp, setActiveExp] = useState(null);

  if (!experience || experience.length === 0) return null;

  const pastExp = experience.length > 1 ? experience[1] : experience[0];
  const presentExp = experience[0];

  const getCasualText = (company, originalText) => {
    if (company.includes('Varcons')) {
      return "Here, I got my hands dirty with full-stack dev. I built web templates from scratch, hooked up MySQL databases, and basically learned how to wire the frontend to the backend.";
    }
    if (company.includes('KPMG')) {
      return "Right now, I'm deep into the SAP ecosystem—building AI-powered assistants with Flask and Next.js, automating business processes, and hacking together live supplier portals.";
    }
    return originalText;
  };

  const activeExpData = [pastExp, presentExp].find(exp => exp?._id === activeExp);

  return (
    <section className={`py-16 md:py-32 px-6 relative z-10 overflow-hidden`} id="experience" onClick={() => setActiveExp(null)}>
      <div className="max-w-5xl mx-auto">
        <SectionHeader id="experience" label="Experience" title="My Journey." index="05" />

        <div className="relative mt-20 h-64 md:h-[450px] w-full">
          {/* SVG Graph Background */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 400" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#333" />
                <stop offset="100%" stopColor="#fff" />
              </linearGradient>
            </defs>
            <motion.path 
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              viewport={{ once: true }}
              d="M 50 350 C 400 350, 600 50, 950 50" 
              stroke="url(#lineGradient)" 
              strokeWidth="4" 
              fill="none" 
              strokeLinecap="round"
            />
          </svg>

          {/* Past Waypoint (Bottom Left) */}
          {pastExp && (
            <div 
              className="absolute z-20 pointer-events-none"
              style={{ left: '5%', top: '87.5%', transform: 'translate(-50%, -50%)' }}
            >
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-col items-center justify-center pointer-events-auto"
              >
                <div 
                  className="group cursor-pointer flex flex-col items-center justify-center relative"
                  onClick={(e) => { e.stopPropagation(); setActiveExp(activeExp === pastExp._id ? null : pastExp._id); }}
                >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#111] border-2 border-[#444] flex items-center justify-center text-green-500 shadow-xl hover:scale-125 hover:border-green-500 transition-all z-10">
                  <span className="font-bold text-lg leading-none select-none">✓</span>
                </div>
                
                <div className="absolute top-1/2 -translate-y-1/2 left-full ml-3 md:top-full md:left-1/2 md:-translate-x-1/2 md:-translate-y-0 md:ml-0 md:mt-4 text-left md:text-center w-32 md:w-48 text-[#888] font-mono text-[8px] md:text-[10px] uppercase tracking-widest select-none">
                  <div className="text-[#ccc] mb-0.5 md:mb-1.5 font-bold tracking-[0.3em]">{pastExp.company}</div>
                  {pastExp.startDate} — {pastExp.endDate}
                </div>
              </div>

              {/* Expansion Modal */}
              <AnimatePresence>
                {activeExp === pastExp._id && (
                  <>
                    {/* Desktop Inline */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20, x: '-50%', scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
                      exit={{ opacity: 0, y: 20, x: '-50%', scale: 0.95 }}
                      className="hidden md:block absolute bottom-[120%] left-0 w-96 bg-[#0a0a0a] border border-[#333] p-6 shadow-[0_0_50px_rgba(255,255,255,0.05)] rounded-sm cursor-default"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button onClick={() => setActiveExp(null)} className="absolute top-3 right-3 text-[#666] hover:text-white transition-colors bg-black rounded-full p-1">
                        <XIcon size={16} />
                      </button>
                      <h4 className="text-white text-xl font-bold mb-1 leading-tight pr-6">{pastExp.role}</h4>
                      <h5 className="text-[#666] font-mono text-[10px] uppercase tracking-widest mb-4">{pastExp.company}</h5>
                      <p className="text-[#ccc] text-sm leading-relaxed mb-6 italic border-l-2 border-[#333] pl-3">
                        "{getCasualText(pastExp.company, pastExp.description)}"
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {pastExp.techStack?.map((tech, i) => (
                          <span key={i} className="text-[9px] font-mono px-2 py-1 bg-[#111] border border-[#333] text-[#aaa] uppercase rounded-sm">{tech}</span>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
              </motion.div>
            </div>
          )}

          {/* Present Waypoint (Top Right) */}
          {presentExp && (
            <div 
              className="absolute z-20 pointer-events-none"
              style={{ right: '0%', top: '12.5%', transform: 'translate(0%, -50%)' }}
            >
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-col items-center justify-center pointer-events-auto"
              >
                <div 
                  className="group cursor-pointer flex flex-col items-center justify-center relative"
                  onClick={(e) => { e.stopPropagation(); setActiveExp(activeExp === presentExp._id ? null : presentExp._id); }}
                >
                {/* The Blinking Dot perfectly on the line */}
                <div className="relative w-6 h-6 flex items-center justify-center z-10 group-hover:scale-150 transition-transform">
                  <div className="absolute w-full h-full bg-white rounded-full animate-ping opacity-75"></div>
                  <div className="relative w-3 h-3 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,1)]"></div>
                </div>
                
                {/* Logo, Text, and Dates below the dot */}
                <div className="absolute top-1/2 -translate-y-1/2 right-full mr-3 md:top-full md:right-auto md:left-1/2 md:-translate-x-1/2 md:-translate-y-0 md:mr-0 md:-mt-4 text-right md:text-center w-32 md:w-48 flex flex-col items-end md:items-center gap-0 group-hover:translate-y-2 md:group-hover:translate-y-2 transition-transform z-10">
                  <div className="flex items-center justify-end md:justify-center gap-1 md:gap-2">
                    <img 
                      src="/kpmg-transparent.png" 
                      alt="KPMG" 
                      className="w-12 md:w-20 object-contain" 
                    />
                    <span className="text-[#ccc] font-bold tracking-[0.3em] text-[9px] md:text-[10px] uppercase mt-0.5">KPMG India</span>
                  </div>
                  <div className="text-[#888] font-mono text-[9px] md:text-[10px] uppercase tracking-widest select-none -mt-1">
                    {presentExp.startDate} — {presentExp.endDate}
                  </div>
                </div>
              </div>

              {/* Expansion Modal */}
              <AnimatePresence>
                {activeExp === presentExp._id && (
                  <>
                    {/* Desktop Inline */}
                    <motion.div 
                      initial={{ opacity: 0, x: 20, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 20, scale: 0.95 }}
                      className="hidden md:block absolute right-[150%] top-1/2 -translate-y-1/2 w-96 bg-[#0a0a0a] border border-[#333] p-6 shadow-[0_0_50px_rgba(255,255,255,0.05)] rounded-sm cursor-default"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button onClick={() => setActiveExp(null)} className="absolute top-3 right-3 text-[#666] hover:text-white transition-colors bg-black rounded-full p-1">
                        <XIcon size={16} />
                      </button>
                      <h4 className="text-white text-xl font-bold mb-1 leading-tight pr-6">{presentExp.role}</h4>
                      <h5 className="text-[#666] font-mono text-[10px] uppercase tracking-widest mb-4">{presentExp.company}</h5>
                      <p className="text-[#ccc] text-sm leading-relaxed mb-6 italic border-l-2 border-[#333] pl-3">
                        "{getCasualText(presentExp.company, presentExp.description)}"
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {presentExp.techStack?.map((tech, i) => (
                          <span key={i} className="text-[9px] font-mono px-2 py-1 bg-[#111] border border-[#333] text-[#aaa] uppercase rounded-sm">{tech}</span>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
              </motion.div>
            </div>
          )}
        </div>

      </div>

      {/* Root-Level Mobile Absolute Modal */}
      <AnimatePresence>
        {activeExpData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden absolute inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 pointer-events-auto"
            onClick={(e) => { e.stopPropagation(); setActiveExp(null); }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-[#0a0a0a] border border-[#333] p-6 w-full max-w-sm rounded-md relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setActiveExp(null)} className="absolute top-3 right-3 text-[#666] hover:text-white transition-colors bg-black rounded-full p-1">
                <XIcon size={16} />
              </button>
              <h4 className="text-white text-xl font-bold mb-1 leading-tight pr-6">{activeExpData.role}</h4>
              <h5 className="text-[#666] font-mono text-[10px] uppercase tracking-widest mb-4">{activeExpData.company}</h5>
              <p className="text-[#ccc] text-sm leading-relaxed mb-6 italic border-l-2 border-[#333] pl-3">
                "{getCasualText(activeExpData.company, activeExpData.description)}"
              </p>
              <div className="flex flex-wrap gap-1.5">
                {activeExpData.techStack?.map((tech, i) => (
                  <span key={i} className="text-[9px] font-mono px-2 py-1 bg-[#111] border border-[#333] text-[#aaa] uppercase rounded-sm">{tech}</span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ExperienceTimeline;
