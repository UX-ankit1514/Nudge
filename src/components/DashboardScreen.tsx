import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Flame, Radar } from 'lucide-react';

const weekDays = [
  { day: 'M', color: '#0F573E' },
  { day: 'T', color: '#38328C' },
  { day: 'W', color: '#0F573E' },
  { day: 'T', color: '#0F573E' },
  { day: 'F', color: '#0F573E' },
  { day: 'S', color: '#0F573E' },
  { day: 'S', color: '#0F573E' },
];

const activity = [
  '#0F573E',
  '#38328C',
  '#0F573E',
  '#0F573E',
  '#0F573E',
  '#0F573E',
  '#4D4D4F',
  '#4D4D4F',
  '#0F573E',
  '#0F573E',
  '#38328C',
  '#0F573E',
];

const DashboardPanel: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = '' }) => (
  <div
    className={`relative overflow-hidden rounded-[28px] border border-white/[0.09] bg-[rgba(18,18,20,0.78)] shadow-[0_32px_64px_-24px_rgba(0,0,0,0.9)] backdrop-blur-[60px] transition-all duration-700 hover:border-white/[0.14] ${className}`}
  >
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_12%,rgba(239,163,57,0.08),transparent_34%),radial-gradient(circle_at_10%_100%,rgba(124,58,237,0.07),transparent_36%)]" />
    <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/[0.04]" />
    <div className="relative z-10 h-full">
    {children}
    </div>
  </div>
);

const DashboardScreen: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#030303] px-6 pb-16 pt-28 sm:pt-32 lg:pt-[130px]">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(70.28%_142.29%_at_50%_0%,rgba(196,181,253,0.08)_0%,rgba(0,0,0,0)_30%)]" />
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <motion.section
        initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -18, filter: 'blur(10px)' }}
        transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] }}
        className="relative z-10 mx-auto flex w-full max-w-[960px] flex-col gap-5"
      >
        <DashboardPanel className="grid gap-5 p-4 sm:p-5 lg:grid-cols-[240px_1fr]">
          <div className="flex min-h-[152px] flex-col items-center justify-center rounded-[22px] border border-white/[0.08] bg-white/[0.045] px-5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <Flame size={42} className="mb-4 text-[#FF9D33] drop-shadow-[0_8px_24px_rgba(239,163,57,0.24)]" fill="#FF9D33" strokeWidth={1.35} />
            <p className="font-body text-[22px] font-semibold leading-none tracking-tight text-white sm:text-[24px]">
              4 Day Streak
            </p>
            <p className="mt-2 font-body text-[11px] font-semibold uppercase tracking-[1.8px] text-white/35">
              Current rhythm
            </p>
          </div>

          <div className="flex min-w-0 flex-col justify-center gap-5 px-1 py-1 sm:px-2">
            <div className="flex items-center justify-between gap-4">
              <h1 className="font-body text-[12px] font-semibold uppercase leading-none tracking-[2px] text-white/45">
                Challenge
              </h1>
              <p className="font-body text-[22px] font-semibold leading-none tracking-tight text-white">
                7/30
              </p>
            </div>

            <div className="h-2.5 overflow-hidden rounded-full bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <div className="h-full w-[24%] rounded-full bg-[#3DBDAB] shadow-[0_0_22px_rgba(61,189,171,0.3)]" />
            </div>

            <div className="grid grid-cols-7 gap-2 sm:gap-4">
              {weekDays.map((item, index) => (
                <div key={`${item.day}-${index}`} className="flex flex-col items-center gap-2.5">
                  <div
                    className="h-8 w-8 rounded-full ring-1 ring-white/[0.06] sm:h-9 sm:w-9"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-body text-[11px] font-semibold uppercase leading-none tracking-[1.8px] text-white/65">
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </DashboardPanel>

        <div className="grid gap-6 lg:grid-cols-2">
          <DashboardPanel className="flex min-h-[136px] items-center px-6 py-6 sm:px-7">
            <div className="flex items-center gap-5 sm:gap-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#9B8FF5]/20 bg-[#9B8FF5]/10">
                <Radar size={31} className="text-[#9B8FF5]" strokeWidth={2} />
              </div>
              <div>
                <p className="font-body text-[22px] font-semibold leading-tight tracking-tight text-white">
                  3 Attempts
                </p>
                <p className="mt-1.5 font-body text-sm font-light leading-6 tracking-premium text-white/48">
                  You showed up 3 times
                </p>
              </div>
            </div>
          </DashboardPanel>

          <DashboardPanel className="flex min-h-[136px] items-center px-6 py-6 sm:px-7">
            <div className="flex items-center gap-5 sm:gap-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#3DBDAB]/20 bg-[#3DBDAB]/10">
                <CheckCircle2 size={32} className="text-[#3DBDAB]" strokeWidth={1.9} />
              </div>
              <div>
                <p className="font-body text-[22px] font-semibold leading-tight tracking-tight text-white">
                  1 Completed
                </p>
                <p className="mt-1.5 font-body text-sm font-light leading-6 tracking-premium text-white/48">
                  You followed through
                </p>
              </div>
            </div>
          </DashboardPanel>
        </div>

        <DashboardPanel className="p-5 sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <h2 className="font-heading text-[34px] leading-none tracking-tight text-white sm:text-[38px]">
              Your recent activity
            </h2>
            <div className="flex flex-wrap items-center gap-3 pt-1 font-body text-[10px] font-semibold uppercase leading-none tracking-[1.6px] text-white/52">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#0F573E] ring-1 ring-white/[0.06]" />
                YOU DID
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#38328C] ring-1 ring-white/[0.06]" />
                YOU TRIED
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#4D4D4F] ring-1 ring-white/[0.06]" />
                YOU SKIPPED
              </span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-6 gap-3 sm:grid-cols-12 sm:gap-4 lg:gap-5">
            {activity.map((color, index) => (
              <div
                key={`${color}-${index}`}
                className="h-8 w-8 rounded-full ring-1 ring-white/[0.06] sm:h-9 sm:w-9"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </DashboardPanel>

        <p className="mt-3 text-center font-body text-sm italic leading-6 tracking-premium text-white/32">
          Trying is always the win. There's no wrong answer.
        </p>
      </motion.section>
    </div>
  );
};

export default DashboardScreen;
