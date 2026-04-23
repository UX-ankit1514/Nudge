import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Clock3, RefreshCcw, TrendingUp } from 'lucide-react';
import { CardData } from '../data/cards';

type FeedbackId = 'did-it' | 'tried-it' | 'not-now';

interface OutcomeFeedbackScreenProps {
  card: CardData;
  onBackToDeck: () => void;
  onGoToDashboard: () => void;
  onNewScenario: () => void;
}

const feedbackOptions = [
  {
    id: 'did-it' as const,
    title: 'DID IT',
    description: 'I actually tried the card',
    icon: CheckCircle2,
    accent: '#0F573E',
    glow: 'rgba(62, 189, 171, 0.12)',
  },
  {
    id: 'tried-it' as const,
    title: 'TRIED IT',
    description: 'Got partway there',
    icon: TrendingUp,
    accent: '#38328C',
    glow: 'rgba(139, 127, 240, 0.12)',
  },
  {
    id: 'not-now' as const,
    title: 'NOT NOW',
    description: "Wasn't the right moment",
    icon: Clock3,
    accent: 'rgba(255, 255, 255, 0.2)',
    glow: 'rgba(255, 255, 255, 0.05)',
  },
];

const resultScreens: Record<FeedbackId, {
  badge: string;
  headline: string;
  meta: string;
  accent: string;
  panel: string;
  solidButton: string;
}> = {
  'did-it': {
    badge: 'DID IT',
    headline: 'You actually did it\nThat takes real courage',
    meta: '1 action added',
    accent: '#0F573E',
    panel: 'rgba(62, 189, 171, 0.12)',
    solidButton: '#0F573E',
  },
  'tried-it': {
    badge: 'TRIED IT',
    headline: 'You showed up. That matters\nThis is how it gets easier.',
    meta: '1 attempt added',
    accent: '#38328C',
    panel: 'rgba(139, 127, 240, 0.12)',
    solidButton: '#38328C',
  },
  'not-now': {
    badge: 'NOT NOW',
    headline: "That's okay. Timing matters\nYou'll find the right moment",
    meta: 'You paused this one',
    accent: 'rgba(255, 255, 255, 0.2)',
    panel: 'rgba(255, 255, 255, 0.05)',
    solidButton: 'rgba(255, 255, 255, 0.2)',
  },
};

const cardTypeLabels: Record<CardData['type'], string> = {
  'warm-up': 'Warm-up',
  stretch: 'Stretch',
  brave: 'Brave',
};

const OutcomeFeedbackScreen: React.FC<OutcomeFeedbackScreenProps> = ({
  card,
  onBackToDeck,
  onGoToDashboard,
  onNewScenario,
}) => {
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackId | null>(null);

  if (selectedFeedback) {
    const result = resultScreens[selectedFeedback];

    return (
      <motion.section
        key={`result-${selectedFeedback}`}
        initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -18, filter: 'blur(10px)' }}
        transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
        className="flex min-h-[calc(100vh-13rem)] w-full items-center justify-center px-0 py-8 sm:min-h-[calc(100vh-14rem)]"
      >
        <div
          className="relative w-full max-w-[540px] overflow-hidden rounded-[32px] border border-white/[0.09] bg-[rgba(18,18,20,0.82)] p-6 shadow-[0_32px_64px_-24px_rgba(0,0,0,0.9)] backdrop-blur-[60px] sm:p-8"
          style={{
            background: `radial-gradient(circle at 88% 12%, ${result.panel} 0%, transparent 40%), rgba(18,18,20,0.82)`,
          }}
        >
          <div className="pointer-events-none absolute inset-0 rounded-[32px] ring-1 ring-inset ring-white/[0.04]" />
          <div
            className="pointer-events-none absolute -left-20 top-10 h-48 w-48 rounded-full opacity-30 blur-[70px]"
            style={{ background: result.accent }}
          />

          <div className="relative z-10">
          <div
            className="inline-flex h-7 items-center justify-center rounded-full border px-3.5 font-body text-[10px] font-semibold uppercase leading-none tracking-[1.7px] text-white/80"
            style={{ background: result.panel, borderColor: result.accent }}
          >
            {result.badge}
          </div>

          <div className="mt-12 flex items-start gap-4">
            <div
              className="mt-1 h-[72px] w-px shrink-0 rounded-full"
              style={{ background: result.accent }}
            />
            <h1 className="whitespace-pre-line font-heading text-[32px] font-normal leading-[0.98] tracking-tight text-white sm:text-[40px]">
              {result.headline}
            </h1>
          </div>

          <div className="mt-5 flex items-center gap-2.5 pl-5">
            <div
              className="h-1.5 w-1.5 shrink-0 rounded-full shadow-[0_0_18px_currentColor]"
              style={{ background: result.accent }}
            />
            <p className="font-body text-sm italic leading-5 tracking-premium text-white/45">
              {result.meta}
            </p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={onGoToDashboard}
              className="flex h-12 items-center justify-center gap-2 rounded-full px-5 font-body text-sm font-semibold leading-none tracking-tight text-white shadow-[0_18px_36px_rgba(0,0,0,0.22)] transition-all duration-500 hover:-translate-y-0.5 active:scale-[0.98]"
              style={{ background: result.solidButton }}
            >
              <span className="min-w-0 text-center">Go to dashboard</span>
              <ArrowRight size={16} strokeWidth={2} className="shrink-0 text-white" />
            </button>
            <button
              type="button"
              onClick={onBackToDeck}
              className="flex h-12 items-center justify-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.035] px-5 font-body text-sm font-medium leading-none tracking-tight text-white/72 transition-all duration-500 hover:-translate-y-0.5 hover:border-white/[0.18] hover:bg-white/[0.065] hover:text-white active:scale-[0.98]"
            >
              <span className="min-w-0 text-center">Try another</span>
              <ArrowRight size={16} strokeWidth={2} className="shrink-0 text-white/70" />
            </button>
          </div>
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 26, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -18, filter: 'blur(10px)' }}
      transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
      className="w-full flex flex-col items-center px-0"
    >
      <div className="w-full max-w-[520px]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.6, ease: [0.2, 0, 0, 1] }}
          className="text-center mb-8 sm:mb-10"
        >
          <p className="font-body text-[11px] uppercase tracking-[3px] text-[#efa339] font-semibold mb-4">
            How did it go?
          </p>
          <h1 className="font-heading text-5xl sm:text-6xl text-white leading-[0.92] tracking-tight">
            You chose a card.
            <span className="block italic font-normal text-[#efa339]">What happened?</span>
          </h1>
          <p className="font-body text-sm sm:text-base text-white/40 mt-6 tracking-premium">
            Be honest. Every outcome is valid here.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.6, ease: [0.2, 0, 0, 1] }}
          className="relative overflow-hidden rounded-[32px] border border-white/[0.09] bg-[rgba(18,18,20,0.86)] p-6 sm:p-7 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] backdrop-blur-[60px]"
        >
          <div
            className="absolute inset-0 opacity-[0.18] pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 85% 15%, rgba(52, 211, 153, 0.32) 0%, transparent 56%)',
            }}
          />
          <div className="relative z-10">
            <p className="font-body text-[10px] uppercase tracking-[2.4px] text-[#efa339] font-semibold">
              Your card
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <h2 className="font-heading text-3xl text-white leading-none tracking-tight">
                {cardTypeLabels[card.type]}
              </h2>
              <p className="font-script text-[30px] leading-[1.05] text-white">
                "{card.front.hook}"
              </p>
              <p className="font-body text-sm leading-relaxed text-white/45 tracking-premium">
                {card.front.microExplanation}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="mt-5 space-y-3">
          {feedbackOptions.map((option, index) => {
            const Icon = option.icon;
            const isSelected = selectedFeedback === option.id;

            return (
              <motion.button
                type="button"
                key={option.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22 + index * 0.07, duration: 0.55, ease: [0.2, 0, 0, 1] }}
                onClick={() => setSelectedFeedback(option.id)}
                className={`group relative flex h-[78px] w-full items-center gap-4 overflow-hidden rounded-[26px] border px-4 text-left backdrop-blur-[40px] transition-all duration-500 active:scale-[0.98] ${
                  isSelected
                    ? 'border-[#efa339]/35 bg-white/[0.075] shadow-[0_20px_44px_rgba(239,163,57,0.12)]'
                    : 'border-white/[0.08] bg-white/[0.035] hover:border-white/[0.16] hover:bg-white/[0.06]'
                }`}
              >
                <div
                  className="absolute inset-0 opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at 12% 50%, ${option.glow} 0%, transparent 42%)`,
                  }}
                />
                <div
                  className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border"
                  style={{
                    background: option.glow,
                    borderColor: isSelected ? 'rgba(239, 163, 57, 0.28)' : 'rgba(255, 255, 255, 0.08)',
                    color: option.accent,
                  }}
                >
                  <Icon size={19} strokeWidth={1.8} />
                </div>
                <div className="relative z-10 min-w-0 flex-1">
                  <p className="font-body text-[13px] font-bold uppercase tracking-[1.5px] text-white">
                    {option.title}
                  </p>
                  <p className="mt-1 font-body text-sm text-white/45 tracking-premium">
                    {option.description}
                  </p>
                </div>
                <ArrowRight
                  size={17}
                  className="relative z-10 shrink-0 text-white/30 transition-all duration-500 group-hover:translate-x-1 group-hover:text-white/70"
                />
              </motion.button>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.52, duration: 0.6 }}
          className="mt-7 flex flex-col items-center gap-5"
        >
          <p className="font-body text-center text-xs text-white/30 tracking-premium">
            Trying is always the win. There's no wrong answer.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onBackToDeck}
              className="flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 font-body text-xs font-medium uppercase tracking-[1.6px] text-white/50 transition-all duration-500 hover:border-white/18 hover:bg-white/[0.06] hover:text-white"
            >
              Back to deck
            </button>
            <button
              type="button"
              onClick={onNewScenario}
              className="flex h-11 items-center gap-2 rounded-full bg-[#efa339] px-5 font-body text-xs font-semibold uppercase tracking-[1.4px] text-black shadow-[0_20px_40px_rgba(239,163,57,0.15)] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_25px_50px_rgba(239,163,57,0.3)] active:scale-[0.98]"
            >
              <RefreshCcw size={14} />
              New scenario
            </button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default OutcomeFeedbackScreen;
