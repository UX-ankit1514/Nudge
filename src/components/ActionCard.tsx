import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ActionCardProps {
  type: 'warm-up' | 'brave' | 'stretch';
  say: string;
  explanation: string;
  isTopPick?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const ActionCard: React.FC<ActionCardProps> = ({ 
  type, 
  say, 
  explanation, 
  isTopPick = false,
  className = '',
  style
}) => {
  const configs = {
    'warm-up': {
      tag: 'Warm-up',
      icon: '🟢',
      bg: 'linear-gradient(135deg, rgba(52, 211, 153, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)',
      tagBg: 'linear-gradient(90deg, rgba(52, 211, 153, 0.25) 0%, rgba(190, 242, 100, 0.1) 100%)',
      tagText: '#d1fae5',
      shadow: 'shadow-[0_20px_50px_rgba(16,185,129,0.15)]'
    },
    'brave': {
      tag: 'Brave',
      icon: '🔮',
      bg: 'linear-gradient(135deg, rgba(248, 113, 113, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%)',
      tagBg: 'rgba(255, 146, 126, 0.45)',
      tagText: '#fafafa',
      shadow: 'shadow-[0_20px_50px_rgba(239,68,68,0.15)]'
    },
    'stretch': {
      tag: 'Stretch',
      icon: '🟠',
      bg: 'linear-gradient(135deg, rgba(251, 146, 60, 0.1) 0%, rgba(234, 88, 12, 0.05) 100%)',
      tagBg: 'rgba(251, 146, 60, 0.25)',
      tagText: '#d1fae5',
      shadow: 'shadow-[0_20px_50px_rgba(249,115,22,0.15)]'
    }
  };

  const config = configs[type];

  return (
    <div 
      className={`p-8 flex flex-col justify-between overflow-hidden relative group transition-all duration-700 hover:border-white/30 ${config.shadow} rounded-[32px] ${className}`}
      style={{ 
        ...style, 
        background: 'rgba(18, 18, 20, 0.9)',
        backdropFilter: 'blur(60px) saturate(180%)',
        WebkitBackdropFilter: 'blur(60px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      {/* Background Decorative Mesh - Glassy Glow */}
      <div 
        className="absolute inset-0 opacity-[0.08] pointer-events-none group-hover:opacity-[0.12] transition-opacity duration-700"
        style={{ background: config.bg }}
      />
      
      {/* Top Section: Tags */}
      <div className="flex justify-between items-center relative z-10">
        <div 
          className="px-4 py-2 rounded-full flex items-center gap-2 border border-white/5 backdrop-blur-xl w-auto shrink-0 shadow-sm"
          style={{ background: config.tagBg }}
        >
          <span className="text-[12px] opacity-90 shrink-0">{config.icon}</span>
          <span className="font-body font-semibold text-[11px] tracking-wider uppercase whitespace-nowrap" style={{ color: config.tagText }}>
            {config.tag}
          </span>
        </div>

        {isTopPick && (
          <div className="bg-[#efa339]/10 border border-[#efa339]/20 px-3 py-1.5 rounded-full backdrop-blur-md shrink-0 w-auto">
            <span className="font-body font-bold text-[9px] text-[#efa339] tracking-[2px] uppercase whitespace-nowrap">
              TOP PICK
            </span>
          </div>
        )}
      </div>

      {/* Middle Section: Text */}
      <div className="space-y-6 relative z-10 mt-14 mb-auto">
        <p className="font-heading italic text-[22px] text-white/40 leading-none">Say:</p>
        <h2 className="font-heading text-[38px] lg:text-[42px] leading-[1] text-white tracking-tight group-hover:scale-[1.01] transition-transform duration-700 [transition-timing-function:var(--ease-premium)]">
          {say.split(' ').map((word, i) => (
            <span key={i} className={i === 0 ? '' : (i % 3 === 0 ? 'text-[#efa339] italic font-medium' : '')}>
              {word}{' '}
            </span>
          ))}
        </h2>
        <p className="font-body text-[14px] text-white/50 leading-relaxed max-w-[90%] font-light tracking-premium">
          {explanation}
        </p>
      </div>

      {/* Bottom Section: Actions */}
      <div className="flex justify-between items-center gap-3 relative z-10 mt-14">
        <button className="flex-1 bg-[#efa339] hover:bg-[#ffb349] border border-transparent px-4 py-3 rounded-full flex items-center justify-center gap-2 transition-all group/btn active:scale-95 shadow-[0_10px_20px_rgba(239,163,57,0.1)]">
          <span className="font-body font-semibold text-[13px] text-black">Try this</span>
          <ArrowRight className="w-4 h-4 text-black transition-transform group-hover/btn:translate-x-1" />
        </button>
        <button className="flex-1 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 px-4 py-3 rounded-full flex items-center justify-center gap-2 transition-all group/btn active:scale-95">
          <span className="font-body font-medium text-[13px] text-white/70 group-hover/btn:text-white transition-colors">Next</span>
          <ArrowRight className="w-4 h-4 text-white/40 transition-all group-hover/btn:text-white group-hover/btn:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default ActionCard;
