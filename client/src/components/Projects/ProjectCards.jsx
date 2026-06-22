import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import SectionHeader from '../common/SectionHeader';

const TiltCard = ({ project }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full rounded-lg bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#282828] transition-colors cursor-crosshair group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* Preview area */}
      <div
        style={{ transform: "translateZ(30px)" }}
        className="w-full aspect-[16/10] bg-[#080808] rounded-t-lg overflow-hidden border-b border-[#1a1a1a] flex items-center justify-center group-hover:border-[#282828] transition-colors"
      >
        {project.images && project.images.length > 0 ? (
          <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
        ) : (
          <div className="text-center px-4">
            <div className="font-mono text-[#222222] text-xs uppercase tracking-widest mb-2">{project.title}</div>
            <div className="w-12 h-[1px] bg-[#1a1a1a] mx-auto"></div>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ transform: "translateZ(40px)" }} className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.featured && (
            <span className="text-white bg-[#222] font-mono text-[9px] uppercase tracking-[0.2em] px-2 py-1 rounded-sm">Featured</span>
          )}
          {project.projectType && (
            <span className="text-[#888] border border-[#333] font-mono text-[9px] uppercase tracking-[0.2em] px-2 py-1 rounded-sm">{project.projectType}</span>
          )}
          {project.status && (
            <span className={`font-mono text-[9px] uppercase tracking-[0.2em] border px-2 py-1 rounded-sm flex items-center gap-1.5 ${project.status === 'Ongoing' ? 'text-yellow-500 border-yellow-900/50' : 'text-green-500 border-green-900/50'}`}>
              {project.status === 'Ongoing' && <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></span>}
              {project.status}
            </span>
          )}
        </div>
        <h3 className="text-white font-bold text-lg mb-3 leading-tight">{project.title}</h3>
        <p className="text-[#555555] text-sm leading-relaxed mb-5 line-clamp-3">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.techStack?.map((tech, i) => (
            <span key={i} className="text-[10px] font-mono text-[#444444] border border-[#1a1a1a] px-2 py-1 rounded uppercase tracking-wider">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-[#888] hover:text-white transition-colors font-mono text-xs uppercase tracking-widest underline decoration-[#333] hover:decoration-white underline-offset-4">
              (Check Now)
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-[#888] hover:text-white transition-colors font-mono text-xs uppercase tracking-widest underline decoration-[#333] hover:decoration-white underline-offset-4">
              (Code)
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectCards = ({ projects }) => {
  const [showAll, setShowAll] = useState(false);

  if (!projects || projects.length === 0) return null;

  // Ensure BillDost and MateUp are always the initial two shown
  const initialProjects = projects.filter(p => p.title.includes('BillDost') || p.title.includes('MateUp'));
  const remainingProjects = projects.filter(p => !p.title.includes('BillDost') && !p.title.includes('MateUp'));
  
  const displayedProjects = showAll ? [...initialProjects, ...remainingProjects] : initialProjects;

  return (
    <section className="py-16 md:py-32 px-6 relative z-10" id="projects" style={{ perspective: "1200px" }}>
      <div className="max-w-5xl mx-auto">
        <SectionHeader id="projects" label="Work" title="Projects." index="03" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayedProjects.map((project) => (
            <TiltCard key={project._id} project={project} />
          ))}
        </div>

        {projects.length > initialProjects.length && (
          <div className="mt-16 flex justify-center">
            <button 
              onClick={() => setShowAll(!showAll)}
              className="border border-[#333] hover:border-white text-[#888] hover:text-white transition-colors px-8 py-3 font-mono text-xs uppercase tracking-widest rounded-sm"
            >
              {showAll ? '(View Less)' : '(View More)'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectCards;
