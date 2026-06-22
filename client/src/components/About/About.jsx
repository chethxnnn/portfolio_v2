import { motion } from 'framer-motion';
import SectionHeader from '../common/SectionHeader';

const Highlight = ({ children }) => (
  <span className="inline-block font-sans font-black text-white text-xl md:text-4xl tracking-tighter uppercase mx-1 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] cursor-default origin-bottom">
    {children}
  </span>
);

const About = ({ data }) => {
  if (!data) return null;

  return (
    <section className="py-16 md:py-32 px-6 relative z-10" id="about">
      <div className="max-w-4xl mx-auto">
        <SectionHeader id="about" label="About" title="The Story." index="02" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto mt-20 space-y-24"
        >
          {data.story && data.story.length > 0 ? (
            data.story.map((para, index) => {
              const words = para.split(' ');
              const candidates = [];
              words.forEach((w, i) => {
                if (w.replace(/[^a-zA-Z]/g, '').length > 4) candidates.push(i);
              });
              
              const numHighlights = Math.min(candidates.length, Math.floor(Math.random() * 3) + 2);
              const selectedIndices = new Set();
              for (let i = 0; i < numHighlights; i++) {
                if (candidates.length === 0) break;
                const randIdx = Math.floor(Math.random() * candidates.length);
                selectedIndices.add(candidates[randIdx]);
                candidates.splice(randIdx, 1);
              }

              const renderedWords = words.map((w, i) => {
                if (selectedIndices.has(i)) {
                  return <span key={i}><Highlight>{w}</Highlight> </span>;
                }
                return <span key={i}>{w} </span>;
              });

              const alignClass = index % 2 === 0 ? "text-left md:pr-32" : "text-right md:pl-32";

              return (
                <p key={index} className={`font-mono text-lg md:text-xl text-[#888888] leading-loose ${alignClass}`}>
                  {renderedWords}
                </p>
              );
            })
          ) : (
            <p className="font-mono text-lg md:text-xl text-[#888888] leading-loose text-left md:pr-32">
              {data.bio}
            </p>
          )}
          

          {data.resumeUrl && (
            <div className="flex justify-center md:justify-end mt-12">
              <a 
                href={data.resumeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center px-8 py-4 font-mono font-bold text-black bg-white rounded-full overflow-hidden transition-transform hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Resume
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left z-0"></div>
              </a>
            </div>
          )}

        </motion.div>
      </div>
    </section>
  );
};

export default About;
