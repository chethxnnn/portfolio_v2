import { motion } from 'framer-motion';
import { useMemo } from 'react';

const WORDS = [
  "EDITOR", "CREATOR", "DEVELOPER", "SHOOTER", "DIRECTOR", "SPEAKER", "THINKER",
  "VIBE-CODER", "FRONTEND", "BACKEND", "FULLSTACK", "AI", "LLMs", "AGENTS",
  "REACT", "NODE.JS", "MONGODB", "JAVASCRIPT", "PYTHON", "TAILWIND",
  "PREMIERE PRO", "CAPCUT", "CANVA", "TIMBRE", "DSLR", "CINEMATOGRAPHY",
  "YOUTUBER", "STORYTELLER", "DESIGNER", "UI/UX", "MERN", "KPMG",
  "VARCONS", "ENTREPRENEUR", "VISIONARY", "ENGINEER", "ARCHITECT",
  "DEBUGGER", "HACKER", "PHOTOGRAPHY", "TYPOGRAPHY", "COLOR GRADING",
  "SCRIPT WRITER", "SOCIAL STRATEGY", "CREATIVE", "MAKER"
];

const NORMAL_SIZES = ['text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl', 'text-7xl'];
const BIG_SIZES = ['text-7xl', 'text-8xl', 'text-9xl', 'text-[10rem]'];
const WEIGHTS = ['font-extralight', 'font-light', 'font-normal', 'font-medium', 'font-bold', 'font-black'];
const FONTS = ['font-sans', 'font-mono', 'font-serif'];
const STYLES = ['outline', 'muted', 'solid'];

const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

const getRandomDifferent = (array, previousValue) => {
  let newValue;
  do {
    newValue = array[Math.floor(Math.random() * array.length)];
  } while (newValue === previousValue && array.length > 1);
  return newValue;
};

const HoverWord = ({ word }) => {
  return (
    <motion.span
      whileHover={{ y: -20, scale: 1.05, color: '#ffffff', WebkitTextStroke: '0px transparent', zIndex: 50 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className={`inline-block cursor-pointer transition-colors duration-300 ${word.font} ${word.size} ${word.weight} ${word.styleClass}`}
      style={{ 
        ...(word.isOutline ? { WebkitTextStroke: '1.5px rgba(255,255,255,0.7)' } : {}),
        transform: `translateY(${word.translateY})`
      }}
    >
      {word.text}
    </motion.span>
  );
};

const MarqueeRow = ({ items, direction, duration }) => {
  return (
    <div className="flex whitespace-nowrap overflow-visible items-center -my-2">
      <motion.div
        className="flex gap-4 md:gap-16 px-2 md:px-4 items-center"
        animate={{ x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ ease: "linear", duration, repeat: Infinity }}
      >
        <div className="flex gap-4 md:gap-16 items-center">
          {items.map((w, i) => <HoverWord key={`a-${i}`} word={w} />)}
        </div>
        <div className="flex gap-4 md:gap-16 items-center">
          {items.map((w, i) => <HoverWord key={`b-${i}`} word={w} />)}
        </div>
      </motion.div>
    </div>
  );
};

const Hero = () => {
  const rows = useMemo(() => {
    const generatedRows = [];
    const shuffledWords = shuffle(WORDS);
    
    // Create a master array of word objects so the styling remains consistent as they snake through rows
    let prevSize = null;
    let prevWeight = null;
    let prevStyle = null;
    let prevFont = null;

    const masterItems = shuffledWords.map((text, index) => {
      const weight = getRandomDifferent(WEIGHTS, prevWeight);
      const style = getRandomDifferent(STYLES, prevStyle);
      const font = getRandomDifferent(FONTS, prevFont);
      
      prevWeight = weight;
      prevStyle = style;
      prevFont = font;

      const isOutline = style === 'outline';
      const isMuted = style === 'muted';
      const styleClass = isOutline 
        ? 'text-transparent' 
        : (isMuted ? 'text-[#333]' : 'text-white');

      // Random vertical offset between -40% and 40% to completely break the rigid row lanes
      const translateY = `${(Math.random() - 0.5) * 80}%`;

      return { text, weight, font, isOutline, styleClass, translateY };
    });

    // 5 Rows. Master array has 46 items.
    // For a perfect snake, we offset the starting index of each row by an amount roughly equal 
    // to how many words fit on screen, so when they leave Row N, they enter Row N+1.
    // Let's assume roughly 9 words fit on screen.
    const WORDS_PER_ROW_ON_SCREEN = 9;

    for (let i = 0; i < 7; i++) {
      const offset = (masterItems.length - (i * WORDS_PER_ROW_ON_SCREEN)) % masterItems.length;
      
      const rowItemsData = [
        ...masterItems.slice(offset),
        ...masterItems.slice(0, offset)
      ];

      const isCenterRow = i === 3; // Row 3 is the exact middle of 7 rows
      
      let prevRowSize = null;
      const finalRowItems = rowItemsData.map(item => {
        const sizePool = isCenterRow ? BIG_SIZES : NORMAL_SIZES;
        const size = getRandomDifferent(sizePool, prevRowSize);
        prevRowSize = size;
        return { ...item, size };
      });

      generatedRows.push({
        id: i,
        items: finalRowItems,
        direction: i % 2 === 0 ? 'left' : 'right',
        duration: Math.random() * 60 + 80 // Decreased speed significantly (80s - 140s loop)
      });
    }
    return generatedRows;
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-between relative overflow-hidden bg-black select-none py-8">
      
      {/* Container specifically designed to be much wider than viewport so scrolling x:-50% is seamless */}
      <div className="relative z-10 flex flex-col justify-between flex-grow h-full w-[300vw] -ml-[100vw]">
        {rows.map((row) => (
          <MarqueeRow 
            key={row.id} 
            items={row.items} 
            direction={row.direction} 
            duration={row.duration} 
          />
        ))}
      </div>

      {/* Fade masks for the left, right, top, and bottom edges */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none" />
    </section>
  );
};

export default Hero;
