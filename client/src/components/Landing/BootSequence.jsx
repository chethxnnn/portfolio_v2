import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const BootSequence = ({ messages, onComplete }) => {
  const [visibleLines, setVisibleLines] = useState([]);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    const runSequence = async () => {
      for (let i = 0; i < messages.length; i++) {
        if (!isMounted) return;
        const msg = messages[i];
        
        setVisibleLines(prev => [...prev, { id: i, text: msg.text }]);
        
        await new Promise(r => setTimeout(r, msg.delay || 1500));
        
        if (msg.error) {
          setVisibleLines(prev => {
            const newLines = [...prev];
            newLines[newLines.length - 1] = {
              ...newLines[newLines.length - 1],
              errorText: msg.errorText || ' failed'
            };
            return newLines;
          });
          await new Promise(r => setTimeout(r, 800));
        }
      }

      if (!isMounted) return;
      await new Promise(r => setTimeout(r, 600));
      setIsDone(true);
      setTimeout(() => {
        if (isMounted) onComplete();
      }, 800);
    };

    runSequence();
    return () => { isMounted = false; };
  }, [messages, onComplete]);

  const handleSkip = () => {
    if (isDone) return;
    setIsDone(true);
    setTimeout(() => {
      onComplete();
    }, 400); // Quicker fade out on skip
  };

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: isDone ? 0 : 1, scale: isDone ? 1.05 : 1 }}
      transition={{ duration: isDone ? 0.4 : 0.8, ease: "easeInOut" }}
      className="fixed inset-0 bg-black z-[100] flex flex-col justify-center px-8 md:px-24"
    >
      <div className="font-mono text-white text-sm md:text-lg">
        {visibleLines.map((line) => (
          <motion.div 
            key={line.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-2 md:mb-4 leading-relaxed"
          >
            {line.text}
            {line.errorText && (
              <span className="text-red-500 font-bold ml-2">{line.errorText}</span>
            )}
          </motion.div>
        ))}
        {!isDone && (
          <motion.div 
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-3 h-5 bg-white ml-2 translate-y-1"
          />
        )}
      </div>

      {!isDone && (
        <button 
          onClick={handleSkip}
          className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-[#444444] hover:text-white font-mono text-xs md:text-sm uppercase tracking-[0.3em] transition-colors"
        >
          Skip
        </button>
      )}
    </motion.div>
  );
};

export default BootSequence;
