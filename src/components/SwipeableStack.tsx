import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { CardData } from '../data/cards';
import NudgeCard from './NudgeCard';

interface SwipeableStackProps {
  cards: CardData[];
  onEnd?: () => void;
  onTryCard?: (card: CardData) => void;
}

const SwipeableStack: React.FC<SwipeableStackProps> = ({ cards, onTryCard }) => {
  const [stack, setStack] = useState(cards);
  const [flippedId, setFlippedId] = useState<string | null>(null);
  const [direction, setDirection] = useState(0);

  const moveToEnd = useCallback((swipeDir: 'left' | 'right') => {
    setDirection(swipeDir === 'right' ? 1 : -1);
    setStack((prev) => {
      const newStack = [...prev];
      const movedCard = newStack.shift()!;
      newStack.push(movedCard);
      return newStack;
    });
    setFlippedId(null);
  }, []);

  // We show top 3 cards for the stack effect
  const visibleCards = stack.slice(0, 3).reverse();
  const currentOriginalIndex = cards.findIndex(c => c.id === stack[0].id) + 1;

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="relative w-full h-[540px] flex items-center justify-center [perspective:1000px]">
        <AnimatePresence initial={false} custom={direction}>
          {visibleCards.map((card, index) => {
            const isTop = index === visibleCards.length - 1;
            const stackIndex = visibleCards.length - 1 - index;
            
            return (
              <CardWrapper
                key={card.id}
                card={card}
                isTop={isTop}
                index={stackIndex}
                custom={direction}
                isFlipped={flippedId === card.id}
                onFlip={() => setFlippedId(flippedId === card.id ? null : card.id)}
                onSwipe={moveToEnd}
                onTryThis={() => onTryCard?.(card)}
              />
            );
          })}
        </AnimatePresence>
      </div>

      {/* Pagination Indicator */}
      <div className="mt-4 font-body text-[14px] font-medium text-white/40 tracking-[4px]">
        {currentOriginalIndex} / {cards.length}
      </div>
    </div>
  );
};

const CardWrapper = ({ card, isTop, index, isFlipped, onFlip, onSwipe, onTryThis, custom }: any) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  
  // Custom physics profile: stiffness: 250, damping: 25, mass: 0.8
  const springConfig = { stiffness: 250, damping: 25, mass: 0.8 };

  const handleDragEnd = (_: any, info: any) => {
    const swipeThreshold = 80;
    const velocityThreshold = 400;

    if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      onSwipe('right');
    } else if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      onSwipe('left');
    }
  };

  return (
    <motion.div
      style={{ 
        x: isTop ? x : 0, 
        rotate: isTop ? rotate : 0, 
        opacity: isTop ? opacity : 1,
        zIndex: 10 - index,
        position: 'absolute'
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      custom={custom}
      initial={{ 
        scale: 0.9, 
        opacity: 0, 
        y: 20,
        filter: 'blur(10px)'
      }}
      animate={{ 
        scale: 1 - index * 0.05, 
        opacity: 1 - index * 0.2, 
        y: index * 12,
        filter: index === 0 ? 'blur(0px)' : 'blur(4px)',
      }}
      exit={{
        x: custom > 0 ? 500 : -500,
        opacity: 0,
        scale: 0.9,
        rotate: custom > 0 ? 10 : -10,
        zIndex: -1,
        transition: { 
           duration: 0.4, 
           ease: "easeInOut"
        }
      }}
      transition={springConfig}
      className={`transform-gpu ${isTop ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'}`}
    >
      <NudgeCard 
        card={card} 
        isFlipped={isFlipped}
        onFlip={onFlip}
        onNext={() => onSwipe('right')}
        onTryThis={onTryThis}
      />
    </motion.div>
  );
};

export default SwipeableStack;
