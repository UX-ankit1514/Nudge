import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Flame, Radar, Zap, Activity } from 'lucide-react';

const weekDays = [
  { day: 'M', status: 'done' },
  { day: 'T', status: 'tried' },
  { day: 'W', status: 'done' },
  { day: 'T', status: 'done' },
  { day: 'F', status: 'done' },
  { day: 'S', status: 'skipped' },
  { day: 'S', status: 'skipped' },
];

const activityDays = ['M','T','W','T','F','S','S','M','T','W','T','F','S','S'];
const activity = Array.from({ length: 14 }).map((_, i) => {
  if (i < 5) return 'done';
  if (i < 8) return 'tried';
  if (i < 10) return 'skipped';
  return 'skipped';
});

const StatusCircle = ({ status, size = 'md' }: { status: string, size?: 'sm' | 'md' | 'lg' }) => {
  const dimensions = size === 'sm' ? 'w-7 h-7' : size === 'lg' ? 'w-10 h-10' : 'w-8 h-8';
  const iconSize = size === 'sm' ? 14 : size === 'lg' ? 18 : 16;

  if (status === 'done') {
    return (
      <div className={`${dimensions} shrink-0 rounded-full flex items-center justify-center bg-[#efa339] shadow-[0_0_12px_rgba(239,163,57,0.4)]`}>
        <CheckCircle2 size={iconSize} className="text-[#121214]" strokeWidth={3} />
      </div>
    );
  }
  if (status === 'tried') {
    return (
      <div className={`${dimensions} shrink-0 rounded-full flex items-center justify-center border border-[#efa339] bg-[#efa339]/20`}>
        <Zap size={iconSize} className="text-[#efa339]" fill="currentColor" />
      </div>
    );
  }
  return (
    <div className={`${dimensions} shrink-0 rounded-full flex items-center justify-center border border-white/20 bg-transparent`} />
  );
};

const DashboardPanel: React.FC<React.PropsWithChildren<{ className?: string; delay?: number }>> = ({ 
  children, 
  className = '',
  delay = 0 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay, ease: [0.2, 0, 0, 1] }}
    className={`relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-[rgba(18,18,20,0.86)] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] backdrop-blur-[60px] transition-all duration-700 hover:border-white/[0.14] ${className}`}
  >
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_12%,rgba(239,163,57,0.08),transparent_34%)]" />
    <div className="relative z-10 h-full w-full">
      {children}
    </div>
  </motion.div>
);

const DashboardScreen: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      containerRef.current.style.setProperty('--mouse-x', `${clientX}px`);
      containerRef.current.style.setProperty('--mouse-y', `${clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative h-[100dvh] w-full overflow-hidden bg-[#030303] flex flex-col">
      {/* RESTORED EXACT BACKGROUND FROM HERO/START */}
      <div
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(239, 163, 57, 0.05), transparent 80%)`
        }}
      />
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full blur-[140px] opacity-[0.12]"
          style={{ background: 'radial-gradient(circle, #efa339 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] opacity-[0.08]"
          style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }}
        />
      </div>
      <div
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      <div
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      <main className="relative z-10 mx-auto w-full max-w-[960px] px-6 py-6 sm:py-8 flex flex-col h-full justify-center gap-4 sm:gap-6">
        <header className="flex flex-col gap-2 shrink-0">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-[#efa339]"
          >
            <Activity size={14} />
            <span className="font-body text-[11px] font-bold uppercase tracking-[2px]">Real-time Insights</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl text-white lg:text-5xl"
          >
            Mastering <span className="italic text-[#efa339]">Consistency</span>
          </motion.h1>
        </header>

        <div className="flex flex-col gap-4 sm:gap-5 min-h-0 shrink-0">
          {/* Card 1: Streak & Weekly Rhythm */}
          <DashboardPanel className="p-5 sm:p-6 shrink-0" delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
              <div className="flex items-center gap-5 sm:border-r border-white/10 sm:pr-10 shrink-0 w-full sm:w-auto justify-between sm:justify-start">
                <div className="flex items-center gap-5">
                  <div className="relative flex shrink-0">
                    <Flame size={40} className="text-[#efa339] drop-shadow-[0_0_15px_rgba(239,163,57,0.4)]" fill="#efa339" />
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-[#efa339] blur-xl rounded-full -z-10"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h2 className="font-heading text-4xl leading-none text-white">4</h2>
                    <p className="font-body text-[11px] font-bold uppercase tracking-[2px] text-white/40 mt-1">Day Streak</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 w-full flex flex-col justify-center">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-body text-[11px] font-bold uppercase tracking-[3px] text-white/40">Weekly Rhythm</h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-white/60">
                    <span className="font-body font-semibold text-white">7/30</span>
                    <span className="text-white/30">completed</span>
                  </div>
                </div>

                <div className="flex justify-between items-center w-full">
                  {weekDays.map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <StatusCircle status={item.status} size="lg" />
                      <span className="font-body text-[10px] font-bold text-white/30 uppercase tracking-widest">{item.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DashboardPanel>

          {/* Cards 2 & 3: Detailed Stats Row */}
          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 shrink-0">
            <DashboardPanel className="group p-5 sm:p-6" delay={0.3}>
              <div className="flex items-center gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#9B8FF5]/20 bg-[#9B8FF5]/10 text-[#9B8FF5] transition-transform duration-500 group-hover:scale-110">
                  <Radar size={24} />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading text-3xl text-white">3</span>
                    <span className="font-body text-sm font-medium text-white/80">Attempts</span>
                  </div>
                  <p className="mt-0.5 font-body text-xs text-white/40 leading-relaxed">You engaged with curiosity today.</p>
                </div>
              </div>
            </DashboardPanel>

            <DashboardPanel className="group p-5 sm:p-6" delay={0.4}>
              <div className="flex items-center gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#3DBDAB]/20 bg-[#3DBDAB]/10 text-[#3DBDAB] transition-transform duration-500 group-hover:scale-110">
                  <CheckCircle2 size={24} />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading text-3xl text-white">1</span>
                    <span className="font-body text-sm font-medium text-white/80">Completed</span>
                  </div>
                  <p className="mt-0.5 font-body text-xs text-white/40 leading-relaxed">You successfully closed the loop.</p>
                </div>
              </div>
            </DashboardPanel>
          </div>

          {/* Card 4: Activity Visualizer */}
          <DashboardPanel className="p-5 sm:p-6 shrink-0" delay={0.5}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
              <h2 className="font-heading text-2xl text-white italic">Recent Activity</h2>
              <div className="flex flex-wrap gap-4">
                {[
                  { label: 'DONE', status: 'done' },
                  { label: 'TRIED', status: 'tried' },
                  { label: 'SKIPPED', status: 'skipped' }
                ].map(tag => (
                  <div key={tag.label} className="flex items-center gap-2">
                    <StatusCircle status={tag.status} size="sm" />
                    <span className="font-body text-[10px] font-bold uppercase tracking-[1px] text-white/40">{tag.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center w-full gap-1 sm:gap-2">
              {activity.map((status, i) => (
                <div key={i} className="flex flex-col items-center gap-2 flex-1">
                  <StatusCircle status={status} size="sm" />
                  <span className="font-body text-[9px] font-bold text-white/30 uppercase">{activityDays[i]}</span>
                </div>
              ))}
            </div>
          </DashboardPanel>
        </div>
      </main>
    </div>
  );
};

export default DashboardScreen;
