import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowRight, Lightbulb } from 'lucide-react';

export interface CardData {
  id: string;
  type: 'warm-up' | 'stretch' | 'brave';
  hook: string;
  subtext: string;
  backDetails: {
    title: string;
    lookFor: string[];
    remember: string;
  };
}

interface SwipeableCardProps {
  data: CardData;
  onSwipe: (direction: 'left' | 'right') => void;
  isTopCard: boolean;
  index: number;
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({ data, onSwipe, isTopCard, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  
  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x > 100) {
      onSwipe('right');
    } else if (info.offset.x < -100) {
      onSwipe('left');
    }
  };

  const typeConfig = {
    'warm-up': {
      label: 'Warm-up',
      icon: '🟢',
      accent: 'var(--color-warm-up)',
      bgGradient: 'linear-gradient(135deg, rgba(52, 211, 153, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)',
    },
    'stretch': {
      label: 'Stretch',
      icon: '🟠',
      accent: 'var(--color-stretch)',
      bgGradient: 'linear-gradient(135deg, rgba(251, 146, 60, 0.1) 0%, rgba(234, 88, 12, 0.05) 100%)',
    },
    'brave': {
      label: 'Brave',
      icon: '🔮',
      accent: 'var(--color-brave)',
      bgGradient: 'linear-gradient(135deg, rgba(248, 113, 113, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%)',
    }
  };

  const config = typeConfig[data.type];

  return (
    <div className="absolute inset-0 flex items-center justify-center perspective-1000">
      <motion.div
        style={{
          x,
          rotate,
          opacity,
          zIndex: 100 - index,
          transformStyle: 'preserve-3d',
        }}
        drag={isTopCard ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        animate={{
          rotateY: isFlipped ? 180 : 0,
          scale: 1 - index * 0.05,
          y: index * 15,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
        onClick={() => setIsFlipped(!isFlipped)}
        className="relative w-[320px] h-[480px] cursor-grab active:cursor-grabbing"
      >
        {/* FRONT FACE */}
        <div 
          className="absolute inset-0 w-full h-full bg-[rgba(18,18,20,0.9)] backdrop-blur-[60px] saturate-180 border border-white/[0.1] rounded-[32px] shadow-2xl p-8 flex flex-col justify-between backface-hidden"
          style={{ transform: 'rotateY(0deg)' }}
        >
          {/* Accent Glow */}
          <div 
            className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{ background: config.bgGradient }}
          />
          
          <div className="flex justify-between items-center relative z-10">
            <div className="px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] backdrop-blur-md flex items-center gap-2">
              <span className="text-xs">{config.icon}</span>
              <span className="font-body font-semibold text-[10px] tracking-wider uppercase text-white/70">
                {config.label}
              </span>
            </div>
            {index === 0 && (
              <div className="px-3 py-1.5 rounded-full bg-[#efa339]/10 border border-[#efa339]/20 backdrop-blur-md">
                <span className="font-body font-bold text-[9px] text-[#efa339] tracking-[2px] uppercase">
                  TOP PICK
                </span>
              </div>
            )}
          </div>

          <div className="mt-12 space-y-4 relative z-10">
            <p className="font-script text-[24px] text-white/40 italic">Say:</p>
            <h2 className="font-heading text-[36px] leading-[1.1] text-white tracking-tight">
              {data.hook}
            </h2>
          </div>

          <div className="mt-auto relative z-10">
            <p className="font-body text-sm text-white/50 leading-relaxed italic">
              {data.subtext}
            </p>
            
            <div className="mt-8 flex gap-3">
               <div className="flex-1 bg-white/[0.03] border border-white/10 px-4 py-3 rounded-full flex items-center justify-center gap-2">
                  <span className="font-body font-medium text-[12px] text-white/50">Details</span>
                  <ArrowRight className="w-3 h-3 text-white/30" />
               </div>
               <div className="flex-1 bg-white/[0.03] border border-white/10 px-4 py-3 rounded-full flex items-center justify-center gap-2">
                  <span className="font-body font-medium text-[12px] text-white/50">Next</span>
                  <ArrowRight className="w-3 h-3 text-white/30" />
               </div>
            </div>
          </div>
        </div>

        {/* BACK FACE */}
        <div 
          className="absolute inset-0 w-full h-full bg-[rgba(18,18,20,0.95)] backdrop-blur-[60px] saturate-180 border border-white/[0.1] rounded-[32px] shadow-2xl p-8 flex flex-col justify-between backface-hidden"
          style={{ transform: 'rotateY(180deg)' }}
        >
          {/* Accent Glow */}
          <div 
            className="absolute inset-0 opacity-[0.12] pointer-events-none"
            style={{ background: config.bgGradient }}
          />

          <div className="flex justify-between items-center relative z-10">
             <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-white/70" />
             </div>
             <div className="px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] backdrop-blur-md flex items-center gap-2">
              <span className="text-xs">{config.icon}</span>
              <span className="font-body font-semibold text-[10px] tracking-wider uppercase text-white/70">
                {config.label}
              </span>
            </div>
          </div>

          <div className="mt-8 space-y-6 relative z-10">
            <h3 className="font-body font-semibold text-[18px] text-white leading-tight">
              {data.backDetails.title}
            </h3>
            
            <div className="space-y-4">
               <p className="font-body text-[10px] tracking-[2px] uppercase text-white/40">Look for this</p>
               <ul className="space-y-2">
                  {data.backDetails.lookFor.map((item, i) => (
                    <li key={i} className="font-body text-[12px] text-white/70 flex items-start gap-2 italic">
                      <span className="text-[#efa339]">→</span>
                      {item}
                    </li>
                  ))}
               </ul>
            </div>

            <div className="space-y-2">
               <p className="font-body text-[10px] tracking-[2px] uppercase text-white/40">Remember</p>
               <p className="font-body text-[12px] text-white/70 leading-relaxed">
                  {data.backDetails.remember}
               </p>
            </div>
          </div>

          <div className="mt-auto relative z-10">
            <button className="w-full bg-[#efa339] hover:bg-[#ffb349] px-6 py-4 rounded-full flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-orange-500/10">
              <span className="font-body font-bold text-[14px] text-black">Try this</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SwipeableCard;
