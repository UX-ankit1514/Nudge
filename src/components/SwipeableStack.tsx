import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { CardData } from '../data/cards';
import NudgeCard from './NudgeCard';

interface SwipeableStackProps {
  cards: CardData[];
  onEnd?: () => void;
  onTryCard?: (card: CardData) => void;
}

const SwipeableStack: React.FC<SwipeableStackProps> = ({ cards, onEnd, onTryCard }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flippedId, setFlippedId] = useState<string | null>(null);
  const [exitX, setExitX] = useState<number>(0);

  const handleNext = useCallback(() => {
    if (currentIndex < cards.length - 1) {
      setExitX(500);
      setCurrentIndex(prev => prev + 1);
      setFlippedId(null);
    } else if (onEnd) {
      setExitX(500);
      onEnd();
    }
  }, [currentIndex, cards.length, onEnd]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setExitX(-500);
      setCurrentIndex(prev => prev - 1);
      setFlippedId(null);
    }
  }, [currentIndex]);

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center [perspective:1000px]">
      <AnimatePresence mode="popLayout" custom={exitX}>
        <CardWrapper
          key={cards[currentIndex].id}
          card={cards[currentIndex]}
          isFlipped={flippedId === cards[currentIndex].id}
          onFlip={() => setFlippedId(flippedId === cards[currentIndex].id ? null : cards[currentIndex].id)}
          onSwipeRight={handleNext}
          onSwipeLeft={handlePrev}
          onTryThis={() => onTryCard?.(cards[currentIndex])}
          exitX={exitX}
        />

        {/* Next Card Preview (Visual Stack) */}
        {currentIndex < cards.length - 1 && (
          <motion.div
            key={`next-${cards[currentIndex + 1].id}`}
            initial={{ scale: 0.9, opacity: 0, y: 15 }}
            animate={{ scale: 0.95, opacity: 0.4, y: 10 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute -z-10"
          >
            <div className="w-[300px] h-[465px] rounded-[32px] bg-white/5 border border-white/5 backdrop-blur-sm" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Indicators */}
      <div className="absolute -bottom-16 flex items-center gap-8 text-white/20 font-body text-[11px] uppercase tracking-widest">
        <button 
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`flex items-center gap-2 transition-colors ${currentIndex > 0 ? 'text-white/40 hover:text-white' : 'opacity-20 cursor-not-allowed'}`}
        >
           ← Swipe Left (Prev)
        </button>
        <div className="w-1 h-1 rounded-full bg-white/10" />
        <button 
          onClick={handleNext}
          className="flex items-center gap-2 transition-colors text-white/40 hover:text-white"
        >
           Swipe Right (Next) →
        </button>
      </div>
      
      {/* Progress Counter */}
      <div className="absolute -top-12 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
        <span className="font-body text-[10px] text-white/50 tracking-premium">
          {currentIndex + 1} of {cards.length} Cards
        </span>
      </div>
    </div>
  );
};

// Internal wrapper to manage independent motion values for the active card
const CardWrapper = ({ card, isFlipped, onFlip, onSwipeRight, onSwipeLeft, onTryThis, exitX }: any) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x > 100) {
      onSwipeRight();
    } else if (info.offset.x < -100) {
      onSwipeLeft();
    }
  };

  return (
    <motion.div
      style={{ x, rotate, opacity, zIndex: 10 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.6}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ 
        x: exitX, 
        opacity: 0, 
        scale: 0.8,
        transition: { duration: 0.3 } 
      }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 25
      }}
      className="absolute cursor-grab active:cursor-grabbing"
    >
      <NudgeCard 
        card={card} 
        isFlipped={isFlipped}
        onFlip={onFlip}
        onNext={onSwipeRight}
        onTryThis={onTryThis}
      />
    </motion.div>
  );
};

export default SwipeableStack;
