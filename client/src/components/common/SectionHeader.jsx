import { motion } from 'framer-motion';
import { useNav } from './NavContext';

const SectionHeader = ({ id, label, title, index }) => {
  const { pinnedSections } = useNav();
  const isPinned = pinnedSections.includes(id);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
      className="text-center mb-16 md:mb-20"
    >
      {/* We keep a static placeholder so the layout doesn't jump when the element is sucked into the nav */}
      <div className="h-6 mb-2 relative flex justify-center items-center">
        {!isPinned && (
          <motion.div
            layoutId={`nav-item-${id}`}
            className="absolute text-[#666666] font-mono text-sm tracking-[0.3em] uppercase whitespace-nowrap"
            transition={{
              type: 'spring',
              stiffness: 280,
              damping: 16,
              mass: 1,
            }}
          >
            {index && `${index}. `}{label}
          </motion.div>
        )}
      </div>

      <motion.h3
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-display text-4xl md:text-5xl text-white mt-4"
      >
        {title}
      </motion.h3>
    </motion.div>
  );
};

export default SectionHeader;
