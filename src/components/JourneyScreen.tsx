import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, ArrowUp, Sparkles, RefreshCcw, ArrowLeft } from 'lucide-react';
import SwipeableStack from './SwipeableStack';
import OutcomeFeedbackScreen from './OutcomeFeedbackScreen';
import { CARDS, CardData } from '../data/cards';

interface JourneyScreenProps {
  onGoToDashboard: () => void;
}

const JourneyScreen: React.FC<JourneyScreenProps> = ({ onGoToDashboard }) => {
  const [scenario, setScenario] = useState('');
  const [showDeck, setShowDeck] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

  const categories = [
    { icon: '☕️', label: 'Cafe' },
    { icon: '🌳', label: 'Park' },
    { icon: '🏢', label: 'Office' },
    { icon: '🎟️', label: 'Event' },
    { icon: '🚶‍♂️', label: 'Public' },
  ];

  const handleGenerate = () => {
    if (!scenario.trim()) return;
    setIsGenerating(true);
    setSelectedCard(null);
    // Simulate generation time
    setTimeout(() => {
      setIsGenerating(false);
      setShowDeck(true);
    }, 1500);
  };

  const handleNewScenario = () => {
    setSelectedCard(null);
    setShowDeck(false);
  };

  return (
    <div className={`relative min-h-screen w-full overflow-hidden bg-[#030303] flex flex-col items-center justify-start px-6 pb-16 ${showDeck && !selectedCard ? 'pt-[164px]' : 'pt-32 sm:pt-36 lg:pt-40'}`}>
      {/* 1. Global Background (Consistent with Hero) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Technical Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Sophisticated Gradient Mesh */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] opacity-[0.06]"
            style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }}
          />
        </div>

        {/* Grain Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* 2. Content Container */}
      <div className="relative z-10 w-full max-w-[1200px] flex flex-col items-center">
        <AnimatePresence mode="wait">
          {selectedCard ? (
            <OutcomeFeedbackScreen
              key="outcome-view"
              card={selectedCard}
              onBackToDeck={() => setSelectedCard(null)}
              onGoToDashboard={onGoToDashboard}
              onNewScenario={handleNewScenario}
            />
          ) : !showDeck ? (
            <motion.div 
              key="input-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
              transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
              className="w-full flex flex-col items-center text-center"
            >
              {/* Floating Icon */}
              <div className="mb-8 relative">
                  <div className="absolute inset-0 blur-2xl bg-[#efa339]/20 rounded-full scale-150" />
                  <motion.div
                      animate={{ 
                          rotate: [0, 5, -5, 0],
                          scale: [1, 1.05, 1]
                      }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      className="relative z-10 w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center backdrop-blur-xl shadow-2xl"
                  >
                      <Sparkles size={32} className="text-[#efa339]" />
                  </motion.div>
              </div>

              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl text-white mb-6 tracking-tight max-w-2xl leading-[0.9]">
                What's the <span className="text-[#efa339] italic font-normal">scenario</span>?
              </h1>
              
              <p className="font-body text-lg text-white/40 mb-12 max-w-[500px] leading-relaxed tracking-premium">
                Describe the situation and I'll generate a custom action deck for you.
              </p>

              {/* Premium Scenario Input */}
              <div className="w-full max-w-[700px] relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#efa339]/20 to-[#7c3aed]/20 rounded-[32px] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-[rgba(18,18,20,0.8)] border border-white/[0.08] rounded-[30px] p-3 flex flex-col gap-3 shadow-2xl backdrop-blur-[40px]">
                  <textarea 
                    value={scenario}
                    onChange={(e) => setScenario(e.target.value)}
                    placeholder="e.g. I am at a tech event and I want to approach a group of people talking about AI..."
                    className="w-full bg-transparent border-none outline-none text-white font-body text-lg placeholder:text-white/20 p-5 min-h-[140px] resize-none"
                  />
                  
                  <div className="flex items-center justify-between p-2 pt-0">
                    <div className="flex items-center gap-2 pl-3">
                      <button className="p-2.5 text-white/30 hover:text-white/60 transition-colors">
                        <Mic size={20} />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <button 
                        onClick={handleGenerate}
                        disabled={!scenario.trim() || isGenerating}
                        className={`px-8 py-3.5 rounded-2xl font-body font-semibold text-sm transition-all flex items-center gap-3 active:scale-95 shadow-lg ${
                          scenario.trim() && !isGenerating 
                          ? 'bg-[#efa339] text-black shadow-[#efa339]/20 hover:shadow-[#efa339]/40 hover:-translate-y-0.5' 
                          : 'bg-white/5 text-white/20 border border-white/10 cursor-not-allowed'
                        }`}
                      >
                        {isGenerating ? (
                          <>
                            <RefreshCcw size={18} className="animate-spin" />
                            Thinking...
                          </>
                        ) : (
                          <>
                            Generate Deck
                            <ArrowUp size={18} className="rotate-90" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap justify-center gap-3 mt-12 opacity-50 hover:opacity-100 transition-opacity duration-500">
                {categories.map((cat) => (
                  <button 
                    key={cat.label}
                    onClick={() => setScenario(prev => prev + (prev ? ' ' : '') + `I'm at a ${cat.label.toLowerCase()}...`)}
                    className="px-5 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-full text-white/50 font-body text-[13px] hover:bg-white/5 hover:text-white/80 transition-all backdrop-blur-sm"
                  >
                    <span className="mr-2">{cat.icon}</span>
                    {cat.label}
                  </button>
                ))}
              </div>

            </motion.div>
          ) : (
            <motion.div 
              key="deck-view"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
              className="w-full flex flex-col items-center relative"
            >
              {/* Back Navigation */}
              <button 
                onClick={() => setShowDeck(false)}
                className="absolute left-0 top-0 sm:left-4 p-2 text-white/40 hover:text-white transition-colors z-50 flex items-center justify-center rounded-full hover:bg-white/5"
                aria-label="Back to scenario"
              >
                <ArrowLeft size={24} />
              </button>

              <div className="flex flex-col items-center justify-center w-full">
                <div className="text-center mb-[40px] relative z-10 pointer-events-none">
                   <h2 className="font-heading text-3xl sm:text-4xl text-white mb-2 italic">Your custom deck is ready</h2>
                   <p className="font-body text-white/40 text-xs tracking-premium uppercase">Optimized for your scenario</p>
                </div>

                <SwipeableStack 
                  cards={CARDS} 
                  onTryCard={setSelectedCard}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default JourneyScreen;

