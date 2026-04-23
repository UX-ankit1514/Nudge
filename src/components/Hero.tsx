import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Nudge Hero Section - Premium Vibe Coding Aesthetic
 * Includes animated 3D card stack, SVG noise, gradient blobs, and fixed UI alignment.
 */

interface CardData {
  id: string;
  type: 'warm-up' | 'brave' | 'stretch';
  say: string;
  explanation: string;
  isTopPick?: boolean;
}

const INITIAL_CARDS: CardData[] = [
  {
    id: 'warm-up',
    type: 'warm-up',
    say: "Did you attend that last talk?",
    explanation: "Easy way to start without overthinking.",
    isTopPick: true
  },
  {
    id: 'stretch',
    type: 'stretch',
    say: "What did you think about that speaker?",
    explanation: "Easy way to open a real conversation."
  },
  {
    id: 'brave',
    type: 'brave',
    say: "Nice talking to you, I’ll let you mingle.",
    explanation: "Light tone reduces awkwardness."
  }
];

const HeroBackground = ({ children }: { children?: React.ReactNode }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#030303] flex items-center">
      {/* 1. Interactive Spotlight */}
      <div
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(239, 163, 57, 0.05), transparent 80%)`
        }}
      />

      {/* 2. Sophisticated Gradient Mesh */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Primary Ambient Glow */}
        <div
          className="absolute top-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full blur-[140px] opacity-[0.12]"
          style={{ background: 'radial-gradient(circle, #efa339 0%, transparent 70%)' }}
        />
        {/* Secondary Accent */}
        <div
          className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] opacity-[0.08]"
          style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }}
        />
      </div>

      {/* 3. Restored Technical Grid lines */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* 4. Refined Premium Grain Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      ></div>

      {/* 5. Content Wrapper */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
};

const CARD_VARIANTS = {
  front: {
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
    zIndex: 30,
    opacity: 1,
    filter: 'blur(0px)',
  },
  middle: {
    x: -132,
    y: 2,
    scale: 0.9,
    rotate: -8,
    zIndex: 20,
    opacity: 0.7,
    filter: 'blur(1px)',
  },
  back: {
    x: 138,
    y: 1,
    scale: 0.85,
    rotate: 15,
    zIndex: 10,
    opacity: 0.5,
    filter: 'blur(2px)',
  },
  exit: {
    x: 300,
    y: -50,
    scale: 0.8,
    rotate: 25,
    opacity: 0,
    zIndex: 5,
    transition: { duration: 0.5 }
  }
};

const Hero: React.FC<{ onStart?: () => void }> = ({ onStart }) => {
  const [cards, setCards] = useState(INITIAL_CARDS);
  const [isHovered, setIsHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const shuffle = useCallback(() => {
    setCards((prevCards) => {
      const [first, ...rest] = prevCards;
      return [...rest, first];
    });
  }, []);

  const handleCardClick = (id: string) => {
    setCards((prevCards) => {
      const index = prevCards.findIndex(c => c.id === id);
      if (index <= 0) return prevCards;
      const newCards = [...prevCards];
      const [selected] = newCards.splice(index, 1);
      return [selected, ...newCards];
    });
  };

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(shuffle, 3000);
    return () => clearInterval(interval);
  }, [isHovered, shuffle]);

  return (
    <HeroBackground>
      <div className="container mx-auto px-6 lg:px-24 pt-10 mt-16 lg:mt-0 lg:pt-20 flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-0 relative z-10 w-full max-w-[1440px]">

        {/* Left Side: Copy & Actions */}
        <div className="w-full lg:w-1/2 z-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
            className="flex flex-col items-start space-y-6 sm:space-y-8"
          >
            <div className="relative pl-0 border-l border-white/[0.05] py-2">
              <div className="space-y-0 relative">
                <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-[130px] leading-[0.8] sm:leading-[0.8] md:leading-[0.75] text-white tracking-[-0.05em] lg:tracking-display">
                  Stop
                </h1>
                <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-[130px] leading-[0.8] sm:leading-[0.8] md:leading-[0.75] text-white tracking-[-0.05em] lg:tracking-display">
                  scrolling
                </h1>
                <h1
                  onClick={onStart}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      onStart?.();
                    }
                  }}
                  className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-[130px] leading-[0.8] sm:leading-[0.8] md:leading-[0.75] text-[#efa339] italic font-normal tracking-[-0.05em] lg:tracking-display pt-2 sm:pt-4 md:pt-6 cursor-pointer transition-colors duration-500 hover:text-[#f7bb5c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#efa339]/60 focus-visible:ring-offset-4 focus-visible:ring-offset-[#030303]"
                >
                  Start living
                </h1>
              </div>
            </div>

            <p className="font-body text-base sm:text-lg lg:text-[22px] text-white/50 tracking-premium max-w-[460px] leading-relaxed font-light text-balance pt-2 sm:pt-4">
              A curated experience for the modern rhythm of life. Elevate your idle moments into intentional small wins.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center pt-6 sm:pt-10 w-full">
              <button 
                onClick={onStart}
                className="w-full sm:w-[260px] h-[54px] sm:h-[58px] bg-[#efa339] text-black font-body font-semibold rounded-full text-[15px] sm:text-[16px] tracking-tight shadow-[0_20px_40px_rgba(239,163,57,0.15)] hover:shadow-[0_25px_50px_rgba(239,163,57,0.3)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-700 flex items-center justify-center group"
              >
                Begin your journey
                <motion.span 
                  animate={{ x: [0, 5, 0] }} 
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-2"
                >→</motion.span>
              </button>
              <button className="w-full sm:w-[200px] h-[54px] sm:h-[58px] border border-white/10 backdrop-blur-md text-white/70 font-body font-medium rounded-full text-[15px] tracking-tight hover:bg-white/5 hover:text-white hover:-translate-y-1 active:scale-[0.98] transition-all duration-700 flex items-center justify-center">
                Learn more
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Animated 3D Layered Card Stack */}
        <div
          className="w-full lg:w-1/2 relative h-[500px] sm:h-[600px] lg:h-[650px] mt-8 lg:mt-0 flex items-center justify-center [perspective:3000px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative w-full h-full flex items-center justify-center transform-gpu">
            <AnimatePresence initial={false}>
              {cards.map((card, index) => {
                const position = index === 0 ? 'front' : index === 1 ? 'middle' : 'back';
                const isMobile = windowWidth < 640;
                const isTablet = windowWidth >= 640 && windowWidth < 1024;
                const baseScale = isMobile ? 0.7 : isTablet ? 0.85 : 1;
                const variant = CARD_VARIANTS[position];

                const customAnimate = {
                  ...variant,
                  scale: variant.scale * baseScale,
                  x: variant.x * baseScale,
                  y: variant.y * baseScale,
                };

                const customInitial = {
                  ...CARD_VARIANTS.back,
                  scale: CARD_VARIANTS.back.scale * baseScale,
                  x: CARD_VARIANTS.back.x * baseScale,
                  y: CARD_VARIANTS.back.y * baseScale,
                };

                const customExit = {
                  ...CARD_VARIANTS.exit,
                  scale: CARD_VARIANTS.exit.scale * baseScale,
                  x: CARD_VARIANTS.exit.x * baseScale,
                  y: CARD_VARIANTS.exit.y * baseScale,
                };

                return (
                  <motion.div
                    key={card.id}
                    layout
                    initial={customInitial}
                    animate={customAnimate}
                    exit={customExit}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 25,
                      mass: 1
                    }}
                    className="absolute cursor-pointer"
                    onClick={() => handleCardClick(card.id)}
                  >
                    <CardUI card={card} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </HeroBackground>
  );
};

const CardUI: React.FC<{ card: CardData }> = ({ card }) => {
  const isWarmUp = card.type === 'warm-up';
  const isStretch = card.type === 'stretch';

  return (
    <div
      className="box-border overflow-hidden relative flex flex-col justify-between transition-shadow duration-500"
      style={{
        width: isWarmUp ? '300px' : (isStretch ? '275px' : '276px'),
        height: isWarmUp ? '465px' : (isStretch ? '427px' : '428px'),
        borderRadius: '32px',
        boxShadow: isWarmUp ? '0 25px 50px -12px rgba(0, 0, 0, 0.7)' : '0 10px 20px rgba(0,0,0,0.4)',
        background: 'rgba(18, 18, 20, 0.9)',
        backdropFilter: 'blur(60px) saturate(180%)',
        WebkitBackdropFilter: 'blur(60px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      {/* Background Gradient Mesh - Refined */}
      <div
        className="absolute opacity-[0.4]"
        style={{
          inset: '-20%',
          background: isWarmUp
            ? 'radial-gradient(circle at 70% 30%, #11734C 0%, transparent 70%)'
            : (isStretch ? 'radial-gradient(circle at 70% 30%, #7B3700 0% , transparent 70%)' : 'radial-gradient(circle at 70% 30%, #C03F3F 0% , transparent 70%)'),
          filter: 'blur(40px)',
          transform: 'rotate(180deg)'
        }}
      />


      {/* Subtle Inner Glow */}
      <div className="absolute inset-0 rounded-[32px] border border-white/5 pointer-events-none" />

      {/* Content Container */}
      <div className="relative flex flex-col h-full w-full p-6 lg:p-7 z-10">

        {/* Top Pills */}
        <div className="flex flex-row justify-between items-center w-full">
          {/* Main Tag Pill */}
          <div
            className="flex flex-row justify-center items-center px-[12px] py-[6px] rounded-full w-auto whitespace-nowrap backdrop-blur-md"
            style={{
              background: isWarmUp
                ? 'rgba(52, 211, 153, 0.1)'
                : (isStretch ? 'rgba(251, 146, 60, 0.1)' : 'rgba(255, 146, 126, 0.1)'),
              border: `1px solid ${isWarmUp ? 'rgba(52, 211, 153, 0.2)' : (isStretch ? 'rgba(251, 146, 60, 0.2)' : 'rgba(255, 146, 126, 0.2)')}`
            }}
          >
            <span className={`font-body font-medium text-[11px] leading-none ${isWarmUp ? 'text-[#34D399]' : (isStretch ? 'text-[#FB923C]' : 'text-[#FF927E]')}`}>
              {isWarmUp ? '🟢 Warm-up' : (isStretch ? '🟠 Stretch' : '🔮 Brave')}
            </span>
          </div>

          {/* Top Pick Pill (Only if present) */}
          {card.isTopPick && (
            <div className="flex flex-row justify-center items-center px-[12px] py-[6px] bg-[#efa339]/10 border border-[#efa339]/20 rounded-full w-auto whitespace-nowrap">
              <span className="font-body font-semibold text-[9px] leading-none tracking-[1px] uppercase text-[#efa339]">
                TOP PICK
              </span>
            </div>
          )}
        </div>

        {/* Text Body */}
        <div className="flex flex-col items-start gap-4 w-full mt-10">
          <span className="font-heading italic text-lg text-white/40 tracking-wide">
            Say:
          </span>
          <span className="font-script font-bold text-[36px] lg:text-[38px] leading-[1.1] text-white w-full min-h-[90px] drop-shadow-sm">
            "{card.say}"
          </span>
          <p className="font-body font-light text-[12px] leading-relaxed text-white/50 mt-1 max-w-[90%]">
            {card.explanation}
          </p>
        </div>

        {/* Bottom CTAs - Premium Pill Design */}
        <div className="flex flex-row gap-2.5 w-full mt-auto pt-6">
          <button className="flex-1 flex flex-row justify-center items-center py-[9px] gap-1.5 bg-white/[0.03] border border-white/[0.08] rounded-full hover:bg-white/[0.08] hover:border-white/[0.15] transition-all active:scale-[0.97] group/btn">
            <span className="font-body font-medium text-[12px] text-white/70 group-hover/btn:text-white">Try this</span>
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 transition-all"><path d="M2.91602 7H11.0827" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /><path d="M7 2.91666L11.0833 6.99999L7 11.0833" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button className="flex-1 flex flex-row justify-center items-center py-[9px] gap-1.5 bg-white/[0.03] border border-white/[0.08] rounded-full hover:bg-white/[0.08] hover:border-white/[0.15] transition-all active:scale-[0.97] group/btn">
            <span className="font-body font-medium text-[12px] text-white/70 group-hover/btn:text-white">Next</span>
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 transition-all"><path d="M2.91602 7H11.0827" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /><path d="M7 2.91666L11.0833 6.99999L7 11.0833" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Hero;
