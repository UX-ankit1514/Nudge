import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Flame, Radar, TrendingUp, Calendar, Zap, ArrowRight, Activity } from 'lucide-react';

const weekDays = [
  { day: 'M', status: 'done', color: '#3DBDAB' },
  { day: 'T', status: 'tried', color: '#9B8FF5' },
  { day: 'W', status: 'done', color: '#3DBDAB' },
  { day: 'T', status: 'done', color: '#3DBDAB' },
  { day: 'F', status: 'done', color: '#3DBDAB' },
  { day: 'S', status: 'pending', color: 'transparent' },
  { day: 'S', status: 'pending', color: 'transparent' },
];

const activity = Array.from({ length: 12 }).map((_, i) => {
  if (i < 5) return '#3DBDAB';
  if (i < 8) return '#9B8FF5';
  if (i < 10) return '#4D4D4F';
  return '#1A1A1C';
});

const DashboardPanel: React.FC<React.PropsWithChildren<{ className?: string; delay?: number }>> = ({ 
  children, 
  className = '',
  delay = 0 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay, ease: [0.2, 0, 0, 1] }}
    className={`relative overflow-hidden rounded-[28px] border border-white/[0.09] bg-[rgba(18,18,20,0.78)] shadow-[0_32px_64px_-24px_rgba(0,0,0,0.9)] backdrop-blur-[60px] transition-all duration-700 hover:border-white/[0.14] ${className}`}
  >
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_12%,rgba(239,163,57,0.08),transparent_34%),radial-gradient(circle_at_10%_100%,rgba(124,58,237,0.07),transparent_36%)]" />
    <div className="relative z-10 h-full">
      {children}
    </div>
  </motion.div>
);

const DashboardScreen: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeMouseMoveListener?.('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#030303]">
      {/* RESTORED EXACT BACKGROUND FROM HERO/START */}
      <div
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(239, 163, 57, 0.05), transparent 80%)`
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

      <main className="relative z-10 mx-auto max-w-[960px] px-6 pb-24 pt-32 lg:pt-40">
        <header className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
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
              className="mt-3 font-heading text-5xl text-white lg:text-6xl"
            >
              Mastering <span className="italic text-[#efa339]">Consistency</span>
            </motion.h1>
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 p-2 px-5 backdrop-blur-md"
          >
            <Calendar size={14} className="text-[#efa339]" />
            <span className="font-body text-[12px] font-medium text-white/60">April 24, 2026</span>
          </motion.div>
        </header>

        <div className="grid gap-6">
          {/* Hero Stats Section */}
          <DashboardPanel className="p-1 sm:p-2" delay={0.2}>
            <div className="grid lg:grid-cols-[260px_1fr]">
              <div className="flex flex-col items-center justify-center rounded-[22px] border border-white/[0.08] bg-white/[0.04] p-8 text-center">
                <div className="relative">
                  <Flame size={48} className="text-[#efa339] drop-shadow-[0_0_15px_rgba(239,163,57,0.4)]" fill="#efa339" />
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-[#efa339] blur-xl rounded-full -z-10"
                  />
                </div>
                <h2 className="mt-6 font-heading text-[52px] leading-none text-white">4</h2>
                <p className="font-body text-[11px] font-bold uppercase tracking-[2px] text-white/30">Day Streak</p>
                <div className="mt-8 flex w-full items-center gap-2">
                  <div className="h-1 flex-1 rounded-full bg-white/10">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '60%' }}
                      className="h-full rounded-full bg-[#efa339]" 
                    />
                  </div>
                  <span className="font-body text-[10px] text-white/40">60%</span>
                </div>
              </div>

              <div className="flex flex-col justify-center p-8 lg:p-10">
                <div className="flex items-center justify-between">
                  <h3 className="font-body text-[12px] font-bold uppercase tracking-[3px] text-white/40">Weekly Rhythm</h3>
                  <div className="flex items-center gap-1.5 text-[12px] text-white/60">
                    <span className="font-body font-semibold text-white">7/30</span>
                    <span className="text-white/30">completed</span>
                  </div>
                </div>

                <div className="mt-10 grid grid-cols-7 gap-3 sm:gap-6">
                  {weekDays.map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-4">
                      <div 
                        className={`h-10 w-10 rounded-full flex items-center justify-center border transition-all duration-500 ${
                          item.status === 'done' ? 'bg-[#3DBDAB] border-[#3DBDAB]/20 shadow-[0_0_15px_rgba(61,189,171,0.3)]' :
                          item.status === 'tried' ? 'bg-[#9B8FF5] border-[#9B8FF5]/20 shadow-[0_0_15px_rgba(155,143,245,0.3)]' :
                          'bg-white/5 border-white/5'
                        }`}
                      >
                        {item.status === 'done' && <CheckCircle2 size={16} className="text-black" strokeWidth={2.5} />}
                        {item.status === 'tried' && <Zap size={16} className="text-white" fill="currentColor" />}
                      </div>
                      <span className="font-body text-[10px] font-bold text-white/20 uppercase tracking-widest">{item.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DashboardPanel>

          {/* Detailed Stats Row */}
          <div className="grid gap-6 sm:grid-cols-2">
            <DashboardPanel className="group flex items-center gap-6 p-7" delay={0.3}>
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#9B8FF5]/20 bg-[#9B8FF5]/10 text-[#9B8FF5] transition-transform duration-500 group-hover:scale-110">
                <Radar size={32} />
              </div>
              <div>
                <h4 className="font-heading text-3xl text-white">3 Attempts</h4>
                <p className="mt-1 font-body text-[13px] text-white/40 leading-relaxed">You engaged with curiosity today.</p>
              </div>
            </DashboardPanel>

            <DashboardPanel className="group flex items-center gap-6 p-7" delay={0.4}>
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#3DBDAB]/20 bg-[#3DBDAB]/10 text-[#3DBDAB] transition-transform duration-500 group-hover:scale-110">
                <CheckCircle2 size={32} />
              </div>
              <div>
                <h4 className="font-heading text-3xl text-white">1 Completed</h4>
                <p className="mt-1 font-body text-[13px] text-white/40 leading-relaxed">You successfully closed the loop.</p>
              </div>
            </DashboardPanel>
          </div>

          {/* Activity Visualizer */}
          <DashboardPanel className="p-8 sm:p-10" delay={0.5}>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-heading text-4xl text-white italic">Recent Activity</h2>
                <p className="mt-1 font-body text-sm text-white/30">Visualizing your journey over time.</p>
              </div>
              <div className="flex flex-wrap gap-5">
                {[
                  { label: 'DONE', color: '#3DBDAB' },
                  { label: 'TRIED', color: '#9B8FF5' },
                  { label: 'SKIPPED', color: '#4D4D4F' }
                ].map(tag => (
                  <div key={tag.label} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: tag.color }} />
                    <span className="font-body text-[10px] font-bold uppercase tracking-[1px] text-white/40">{tag.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 grid grid-cols-6 gap-3 sm:grid-cols-12 sm:gap-4">
              {activity.map((color, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.03 }}
                  className="aspect-square rounded-full border border-white/5 transition-transform duration-300 hover:scale-125"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            <button className="mt-12 flex items-center gap-3 text-[#efa339] group">
              <span className="font-body text-[11px] font-bold uppercase tracking-[2px]">View full history</span>
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </DashboardPanel>
        </div>

        <p className="mt-16 text-center font-body text-[13px] italic text-white/20">
          "The small wins are the only wins that matter."
        </p>
      </main>
    </div>
  );
};

export default DashboardScreen;
