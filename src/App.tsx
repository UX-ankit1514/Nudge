import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import JourneyScreen from './components/JourneyScreen';
import DashboardScreen from './components/DashboardScreen';

type AppView = 'hero' | 'journey' | 'dashboard';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('hero');

  const handleNavigate = (item: string) => {
    if (item === 'Home') {
      setView('hero');
      return;
    }

    if (item === 'Start') {
      setView('journey');
      return;
    }

    if (item === 'Dashboard') {
      setView('dashboard');
    }
  };

  const activeItem = view === 'hero' ? 'Home' : view === 'dashboard' ? 'Dashboard' : 'Start';

  return (
    <div className="min-h-screen relative selection:bg-[#efa339]/30 selection:text-white bg-[#030303]">
      <Navbar activeItem={activeItem} onNavigate={handleNavigate} />
      <main>
        <AnimatePresence mode="wait">
          {view === 'hero' ? (
            <motion.div
              key="hero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Hero onStart={() => setView('journey')} />
            </motion.div>
          ) : view === 'journey' ? (
            <motion.div
              key="journey"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <JourneyScreen onGoToDashboard={() => setView('dashboard')} />
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <DashboardScreen />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;
