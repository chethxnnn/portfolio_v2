import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X as XIcon } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';

const EducationCard = ({ inst, isExpanded, onToggle, index }) => {
  if (!inst) return null;

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    const query = encodeURIComponent(`${inst.name} ${inst.location}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <motion.div
      layout
      onClick={onToggle}
      className="cursor-pointer group pb-6 last:pb-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
    >
      <motion.div layout="position">
        <h4 
          onDoubleClick={handleDoubleClick}
          title="Double-click to view on map"
          className="text-white font-bold text-xl md:text-2xl mb-3 leading-tight group-hover:text-[#aaaaaa] transition-colors selection:bg-transparent"
        >
          {inst.name}
        </h4>
        <div className="flex items-center gap-6">
          <span className="text-[#666666] font-mono text-[11px] uppercase tracking-[0.2em]">{inst.year}</span>
          {inst.score && <span className="text-white font-mono text-[11px] font-bold tracking-[0.1em]">{inst.score}</span>}
        </div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-6 pt-6 border-t border-[#1a1a1a] space-y-4">
              <p className="text-[#444444] font-mono text-[10px] uppercase tracking-[0.2em]">{inst.degree} {inst.location ? `• ${inst.location}` : ''}</p>
              {inst.expandedDetails?.map((detail, i) => (
                <motion.div
                  key={`${inst._id}-detail-${i}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-[#333333] mt-1 text-xs">▸</span>
                  <p className="text-[#666666] text-sm leading-relaxed">{detail}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Education = ({ education = [] }) => {
  const [expandedId, setExpandedId] = useState(null);
  
  const institutions = [...education].sort((a, b) => a.order - b.order);

  const toggleExpand = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section className="py-16 lg:py-32 px-6 relative z-10" id="education">
      <div className="max-w-7xl mx-auto">
        <SectionHeader id="education" label="Education" title="Where It Started." index="01" />

        <div className="flex flex-col lg:flex-row items-start justify-center gap-10 lg:gap-0 mt-4 lg:mt-20">

          {/* LEFT COLUMN — School + UG cards */}
          <div className="hidden lg:flex w-[320px] shrink-0 mt-16 flex-col">
            <div className="w-full">
              <EducationCard
                inst={institutions[2]}
                isExpanded={expandedId === (institutions[2] && institutions[2]._id)}
                onToggle={() => toggleExpand(institutions[2] && institutions[2]._id)}
                index={0}
              />
            </div>
            <div className={`w-full mt-12 transition-all duration-500 ease-in-out ${expandedId === (institutions[0] && institutions[0]._id) ? 'lg:mt-8' : 'lg:mt-64'}`}>
              <EducationCard
                inst={institutions[0]}
                isExpanded={expandedId === (institutions[0] && institutions[0]._id)}
                onToggle={() => toggleExpand(institutions[0] && institutions[0]._id)}
                index={2}
              />
            </div>
          </div>

          {/* CENTER — Karnataka Map with dots and connector lines */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group relative w-[320px] h-[400px] md:w-[420px] md:h-[520px] mx-auto lg:mx-8 shrink-0 block"
          >
            <img
              src="/karnataka-map-transparent.png"
              alt="Karnataka State Map"
              className="w-full h-full object-contain opacity-30 transition-all duration-500 group-hover:opacity-70 group-hover:[filter:drop-shadow(0_0_12px_rgba(255,255,255,0.6))]"
              draggable={false}
            />

            <svg className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-60" style={{ overflow: 'visible' }}>
              <line x1="49%" y1="62%" x2="0" y2="70%" stroke="#444444" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="56%" y1="56%" x2="100%" y2="22%" stroke="#444444" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="53%" y1="68%" x2="0" y2="28%" stroke="#444444" strokeWidth="1" strokeDasharray="4 4" />
            </svg>

            <div 
              className="absolute z-10 cursor-pointer lg:cursor-default left-[40%] top-[55%] lg:left-[49%] lg:top-[62%] -translate-x-1/2 -translate-y-1/2" 
              onClick={() => { if (window.innerWidth < 1024 && institutions[2]) toggleExpand(institutions[2]._id); }}
            >
              <div className="relative flex items-center justify-center">
                <span className="absolute h-10 w-10 lg:h-6 lg:w-6 rounded-full bg-white/20 animate-ping"></span>
                <span className="absolute h-8 w-8 lg:h-4 lg:w-4 rounded-full bg-white/10"></span>
                <span className="relative h-6 w-6 lg:h-2.5 lg:w-2.5 rounded-full bg-white flex items-center justify-center">
                  <span className="lg:hidden text-[8px] font-bold text-black tracking-tighter">10th</span>
                </span>
              </div>
            </div>

            <div 
              className="absolute z-10 cursor-pointer lg:cursor-default left-[56%] top-[56%] -translate-x-1/2 -translate-y-1/2" 
              onClick={() => { if (window.innerWidth < 1024 && institutions[1]) toggleExpand(institutions[1]._id); }}
            >
              <div className="relative flex items-center justify-center">
                <span className="absolute h-10 w-10 lg:h-6 lg:w-6 rounded-full bg-white/20 animate-ping" style={{ animationDelay: '0.4s' }}></span>
                <span className="absolute h-8 w-8 lg:h-4 lg:w-4 rounded-full bg-white/10"></span>
                <span className="relative h-6 w-6 lg:h-2.5 lg:w-2.5 rounded-full bg-white flex items-center justify-center">
                  <span className="lg:hidden text-[8px] font-bold text-black tracking-tighter">12th</span>
                </span>
              </div>
            </div>

            <div 
              className="absolute z-10 cursor-pointer lg:cursor-default left-[53%] top-[68%] -translate-x-1/2 -translate-y-1/2" 
              onClick={() => { if (window.innerWidth < 1024 && institutions[0]) toggleExpand(institutions[0]._id); }}
            >
              <div className="relative flex items-center justify-center">
                <span className="absolute h-10 w-10 lg:h-6 lg:w-6 rounded-full bg-white/20 animate-ping" style={{ animationDelay: '0.8s' }}></span>
                <span className="absolute h-8 w-8 lg:h-4 lg:w-4 rounded-full bg-white/10"></span>
                <span className="relative h-6 w-6 lg:h-2.5 lg:w-2.5 rounded-full bg-white flex items-center justify-center">
                  <span className="lg:hidden text-[8px] font-bold text-black tracking-tighter">UG</span>
                </span>
              </div>
            </div>

            <div
              className="absolute font-mono text-[10px] text-[#333333] uppercase tracking-[0.25em]"
              style={{ left: '46%', top: '68%' }}
            >
              Bengaluru
            </div>

            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="text-[#1a1a1a] font-mono text-[9px] uppercase tracking-[0.4em]">Karnataka • India</span>
            </div>
          </motion.div>

          {/* RIGHT COLUMN — PU College card */}
          <div className="hidden lg:block w-[320px] shrink-0 mt-8">
            <EducationCard
              inst={institutions[1]}
              isExpanded={expandedId === (institutions[1] && institutions[1]._id)}
              onToggle={() => toggleExpand(institutions[1] && institutions[1]._id)}
              index={1}
            />
          </div>

        </div>

        <div className="lg:hidden mt-10 text-center">
          <span className="text-[#222222] font-mono text-[10px] uppercase tracking-[0.3em]">All institutions • Bengaluru, Karnataka</span>
        </div>
      </div>

      {/* Mobile Modal overlay */}
      <AnimatePresence>
        {expandedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden absolute inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 pointer-events-auto"
            onClick={(e) => { e.stopPropagation(); setExpandedId(null); }}
          >
            {(() => {
              const activeInst = institutions.find(inst => inst._id === expandedId);
              if (!activeInst) return null;
              return (
                <motion.div 
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  className="bg-[#0a0a0a] border border-[#333] p-6 w-full max-w-sm rounded-md relative shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button onClick={() => setExpandedId(null)} className="absolute top-3 right-3 text-[#666] hover:text-white transition-colors bg-black rounded-full p-1">
                    <XIcon size={16} />
                  </button>
                  <h4 className="text-white text-xl font-bold mb-1 leading-tight pr-6">{activeInst.name}</h4>
                  <h5 className="text-[#666] font-mono text-[10px] uppercase tracking-widest mb-4">{activeInst.degree}</h5>
                  <div className="flex items-center gap-4 mb-6 pb-4 border-b border-[#222]">
                    <span className="text-[#888] font-mono text-[9px] uppercase tracking-[0.2em]">{activeInst.year}</span>
                    {activeInst.score && <span className="text-white font-mono text-[9px] font-bold tracking-[0.1em]">{activeInst.score}</span>}
                  </div>
                  <div className="space-y-3">
                    {activeInst.expandedDetails?.map((detail, i) => (
                      <div key={`${activeInst._id}-detail-${i}`} className="flex items-start gap-2">
                        <span className="text-[#333] text-[10px] mt-0.5">▸</span>
                        <p className="text-[#ccc] text-xs leading-relaxed">{detail}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Education;
