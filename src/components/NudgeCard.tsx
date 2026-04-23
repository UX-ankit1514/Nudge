import React from 'react';
import { motion } from 'framer-motion';
import { CardData } from '../data/cards';
import { Lightbulb, ArrowRight } from 'lucide-react';

interface NudgeCardProps {
  card: CardData;
  isFlipped: boolean;
  onFlip: () => void;
  onNext?: () => void;
  onTryThis?: () => void;
}

const NudgeCard: React.FC<NudgeCardProps> = ({ card, isFlipped, onFlip, onNext, onTryThis }) => {
  const isWarmUp = card.type === 'warm-up';
  const isStretch = card.type === 'stretch';

  const semanticColor = isWarmUp 
    ? '#34D399' // Green
    : (isStretch ? '#FB923C' : '#FF927E'); // Orange : Brave (Red)

  const semanticBg = isWarmUp
    ? 'rgba(52, 211, 153, 0.1)'
    : (isStretch ? 'rgba(251, 146, 60, 0.1)' : 'rgba(255, 146, 126, 0.1)');

  const semanticBorder = isWarmUp
    ? 'rgba(52, 211, 153, 0.2)'
    : (isStretch ? 'rgba(251, 146, 60, 0.2)' : 'rgba(255, 146, 126, 0.2)');

  return (
    <div 
      className="relative w-[300px] h-[465px] cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        onFlip();
      }}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="w-full h-full relative transform-gpu"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Side */}
        <div
          className="absolute inset-0 w-full h-full rounded-[32px] overflow-hidden bg-[rgba(18,18,20,0.9)] backdrop-blur-[60px] border border-white/10 flex flex-col p-7 z-10 shadow-2xl"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Internal Radial Mesh */}
          <div
            className="absolute opacity-[0.3] pointer-events-none"
            style={{
              inset: '-20%',
              background: `radial-gradient(circle at 70% 30%, ${semanticColor} 0%, transparent 70%)`,
              filter: 'blur(40px)',
              transform: 'rotate(180deg)'
            }}
          />

          {/* Top Pills */}
          <div className="flex flex-row justify-between items-center w-full relative z-20">
            <div
              className="flex flex-row justify-center items-center px-[12px] py-[6px] rounded-full w-auto whitespace-nowrap backdrop-blur-md"
              style={{ background: semanticBg, border: `1px solid ${semanticBorder}` }}
            >
              <span className={`font-body font-medium text-[11px] leading-none`} style={{ color: semanticColor }}>
                {card.front.tag}
              </span>
            </div>

            {card.isTopPick && (
              <div className="flex flex-row justify-center items-center px-[12px] py-[6px] bg-[#efa339]/10 border border-[#efa339]/20 rounded-full w-auto whitespace-nowrap">
                <span className="font-body font-semibold text-[9px] leading-none tracking-[1px] uppercase text-[#efa339]">
                  TOP PICK
                </span>
              </div>
            )}
          </div>

          {/* Main Hook Section */}
          <div className="flex flex-col items-start gap-4 w-full mt-10 relative z-20">
            <span className="font-heading italic text-lg text-white/40 tracking-wide">
              Say:
            </span>
            <div className="flex flex-col gap-3">
              <span className="font-heading font-medium text-[36px] lg:text-[40px] leading-[1.1] text-white w-full drop-shadow-sm">
                "{card.front.hook}"
              </span>
              <p className="font-body text-[13px] text-white/50 leading-relaxed max-w-[90%]">
                {card.front.microExplanation}
              </p>
            </div>
          </div>

          {/* Commitment Triggers (CTAs) */}
          <div className="mt-auto flex items-center justify-between relative z-20">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onTryThis?.();
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group/btn"
            >
              <span className="font-body font-medium text-[12px] text-[#d1fae5] group-hover/btn:text-white transition-colors">Try this</span>
              <ArrowRight size={14} className="text-white/40 group-hover/btn:text-white transition-all group-hover/btn:translate-x-0.5" />
            </button>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                onNext?.();
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group/btn"
            >
              <span className="font-body font-medium text-[12px] text-[#d1fae5] group-hover/btn:text-white transition-colors">Next</span>
              <ArrowRight size={14} className="text-white/40 group-hover/btn:text-white transition-all group-hover/btn:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 w-full h-full rounded-[32px] overflow-hidden bg-[rgba(18,18,20,0.95)] backdrop-blur-[60px] border border-white/10 flex flex-col p-7 z-10 shadow-2xl"
          style={{ 
            backfaceVisibility: 'hidden', 
            transform: 'rotateY(180deg)',
            background: isWarmUp ? 'linear-gradient(180deg, #0b3d24 0%, #121214 100%)' : (isStretch ? 'linear-gradient(180deg, #7b3700 0%, #121214 100%)' : 'linear-gradient(180deg, #c03f3f 0%, #121214 100%)')
          }}
        >
           {/* Top Pills (Back) */}
           <div className="flex flex-row justify-between items-center w-full relative z-20">
            <div
              className="flex flex-row justify-center items-center px-[12px] py-[6px] rounded-full w-auto whitespace-nowrap backdrop-blur-md bg-white/5 border border-white/10"
            >
              <span className={`font-body font-medium text-[11px] leading-none text-white/80`}>
                {card.front.tag}
              </span>
            </div>

            <div className="bg-white/5 border border-white/10 p-2 rounded-xl">
              <Lightbulb size={16} className="text-white/60" />
            </div>
          </div>

          {/* Strategy Content */}
          <div className="flex flex-col items-start gap-6 w-full mt-8 relative z-20">
            <p className="font-body font-semibold text-[19px] leading-tight text-white">
               {card.back.strategy}
            </p>

            <div className="space-y-4 w-full">
               <div className="space-y-1.5">
                  <span className="font-body text-[11px] uppercase tracking-[2px] text-white/40">Look for this</span>
                  <div className="font-body text-[13px] text-white/70 leading-relaxed space-y-1">
                     {card.back.lookFor.map((line, i) => (
                       <p key={i}>{line}</p>
                     ))}
                  </div>
               </div>

               <div className="space-y-1.5">
                  <span className="font-body text-[11px] uppercase tracking-[2px] text-white/40">Remember</span>
                  <p className="font-body text-[13px] text-white/70 leading-relaxed">
                     {card.back.remember}
                  </p>
               </div>
            </div>
          </div>

          <div className="mt-auto relative z-20">
             <p className="font-body font-light text-[11px] text-white/30 text-center w-full">
                Tap to flip back
             </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NudgeCard;
