import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Camera, ExternalLink } from 'lucide-react';

const Timeline = ({ accounts }) => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  if (!accounts || accounts.length === 0) return null;

  return (
    <section ref={containerRef} className="py-24 overflow-hidden bg-surface/30 relative z-10 border-y border-border" id="content">
      <div className="max-w-5xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-accent font-mono text-sm tracking-widest uppercase mb-2">04. Content</h2>
          <h3 className="text-display text-4xl md:text-5xl">Digital Footprint.</h3>
        </motion.div>
      </div>

      <div className="relative h-[400px] flex items-center">
        {/* The horizontal line connecting them */}
        <div className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent top-1/2 -translate-y-1/2"></div>
        
        <motion.div 
          style={{ x }}
          className="flex gap-16 px-24 w-max"
        >
          {accounts.map((acc, index) => (
            <motion.div 
              key={acc._id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "0px 100px 0px 0px" }}
              transition={{ delay: index * 0.1 }}
              className="relative group w-80 shrink-0"
            >
              {/* Point on the timeline */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-background border-2 border-accent rounded-full z-10 shadow-[0_0_15px_rgba(94,92,230,0.5)] group-hover:scale-150 transition-transform"></div>

              {/* The Card (alternating top/bottom) */}
              <div className={`absolute left-1/2 -translate-x-1/2 w-full ${index % 2 === 0 ? 'bottom-8 pb-4' : 'top-8 pt-4'}`}>
                <div className="bg-card border border-border p-6 rounded-12px hover:border-accent/50 transition-colors">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center text-accent overflow-hidden">
                      {acc.logoUrl ? (
                        <img src={acc.logoUrl} alt={acc.name} className="w-full h-full object-cover" />
                      ) : (
                        <Camera size={20} />
                      )}
                    </div>
                    <div>
                      <h4 className="text-primary font-bold">{acc.name}</h4>
                      <p className="text-muted text-sm">{acc.handle}</p>
                    </div>
                  </div>
                  
                  <p className="text-muted text-sm mb-4">{acc.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-accent bg-accent/10 px-2 py-1 rounded">
                      {acc.followers || "Followers hidden"}
                    </span>
                    <a 
                      href={acc.profileUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-muted hover:text-primary transition-colors"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline;
