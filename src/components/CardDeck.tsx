import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SwipeableCard, { CardData } from './SwipeableCard';

const MOCK_CARDS: CardData[] = [
  {
    id: '1',
    type: 'warm-up',
    hook: 'Did you attend that last talk?',
    subtext: 'Easy way to start without overthinking.',
    backDetails: {
      title: 'This won’t feel random to them',
      lookFor: [
        'If they engage → ask what they thought',
        'If not → keep it brief or step away'
      ],
      remember: 'You’re just continuing what’s already happening'
    }
  },
  {
    id: '2',
    type: 'warm-up',
    hook: 'I love the vibe of this event so far, how about you?',
    subtext: 'Positive opening to set a friendly tone.',
    backDetails: {
      title: 'Positivity is contagious',
      lookFor: [
        'Smiling or nodding → keep the energy high',
        'Neutral response → ask about their favorite part'
      ],
      remember: 'A shared positive observation builds instant rapport'
    }
  },
  {
    id: '3',
    type: 'stretch',
    hook: 'That was a bold point they made, what’s your take?',
    subtext: 'Deeper engagement by asking for an opinion.',
    backDetails: {
      title: 'Opinions create connection',
      lookFor: [
        'Specific critique → dive deeper into the topic',
        'General agreement → share your own specific take'
      ],
      remember: 'Intellectual curiosity is a great social catalyst'
    }
  },
  {
    id: '4',
    type: 'brave',
    hook: 'Nice talking to you, I’ll let you mingle.',
    subtext: 'Light tone reduces awkwardness when leaving.',
    backDetails: {
      title: 'The exit is as important as the entrance',
      lookFor: [
        'They keep talking → wait for a natural pause',
        'They nod/agree → move on gracefully'
      ],
      remember: 'Leaving correctly makes it easier to talk to them later'
    }
  }
];

interface CardDeckProps {
  onBackToInput?: () => void;
}

const CardDeck: React.FC<CardDeckProps> = ({ onBackToInput }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right' && currentIndex < MOCK_CARDS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (direction === 'left' && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  return (
    <div className="relative w-full h-[600px] flex flex-col items-center justify-center">
      <div className="relative w-full h-full max-w-[400px]">
        <AnimatePresence initial={false}>
          {MOCK_CARDS.map((card, i) => {
            // Only render current and next couple of cards for performance
            if (i < currentIndex || i > currentIndex + 2) return null;
            
            return (
              <SwipeableCard
                key={card.id}
                data={card}
                index={i - currentIndex}
                isTopCard={i === currentIndex}
                onSwipe={handleSwipe}
              />
            );
          })}
        </AnimatePresence>
      </div>

      {/* Progress Indicators */}
      <div className="mt-8 flex gap-2 relative z-50">
        {MOCK_CARDS.map((_, i) => (
          <div 
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === currentIndex ? 'w-8 bg-[#efa339]' : 'w-2 bg-white/10'
            }`}
          />
        ))}
      </div>

      <button 
        onClick={onBackToInput}
        className="mt-12 font-body text-[11px] uppercase tracking-[3px] text-white/30 hover:text-white/60 transition-colors"
      >
        Change Scenario
      </button>
    </div>
  );
};

export default CardDeck;
