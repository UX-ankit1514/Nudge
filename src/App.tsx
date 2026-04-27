import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Session } from '@supabase/supabase-js';
import { supabase } from './lib/supabase';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import JourneyScreen from './components/JourneyScreen';
import DashboardScreen from './components/DashboardScreen';
import Auth from './components/Auth';

type AppView = 'hero' | 'journey' | 'dashboard';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('hero');
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      // We don't automatically set view to dashboard here if we want them to stay on hero, 
      // but the instructions said "If user is already logged in and returns later: redirect directly to dashboard."
      // REMOVED INITIAL REDIRECT SO HOME SCREEN ALWAYS OPENS FIRST
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (event === 'SIGNED_IN' && session) {
        setView('dashboard');
        setIsAuthModalOpen(false);
      } else if (event === 'SIGNED_OUT') {
        setView('hero');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleNavigate = async (item: string) => {
    if (item === 'Home') {
      setView('hero');
      return;
    }

    if (item === 'Start') {
      setView('journey');
      return;
    }

    if (item === 'Dashboard' || item === 'Login') {
      if (session) {
        setView('dashboard');
      } else {
        setIsAuthModalOpen(true);
      }
      return;
    }

    if (item === 'Sign Out') {
      await supabase.auth.signOut();
      setView('hero');
      return;
    }
  };

  const activeItem = view === 'hero' ? 'Home' : view === 'journey' ? 'Start' : 'Dashboard';

  return (
    <div className="min-h-screen relative selection:bg-[#efa339]/30 selection:text-white bg-[#030303]">
      <Navbar 
        activeItem={activeItem} 
        onNavigate={handleNavigate} 
        isAuthenticated={!!session}
        userEmail={session?.user?.email} 
      />
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
              <Hero onStart={() => handleNavigate('Start')} />
            </motion.div>
          ) : view === 'journey' ? (
            <motion.div
              key="journey"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <JourneyScreen onGoToDashboard={() => handleNavigate('Dashboard')} />
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

      {isAuthModalOpen && (
        <Auth onClose={() => setIsAuthModalOpen(false)} />
      )}
    </div>
  );
};

export default App;
