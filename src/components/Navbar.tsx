import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  activeItem?: string;
  onNavigate?: (item: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeItem = 'Home', onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home' },
    { label: 'Start' },
    { label: 'Dashboard' },
    { label: 'About' },
  ];

  const handleNavigate = (label: string) => {
    onNavigate?.(label);
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 z-[100] w-full transition-all duration-500 ${
        isScrolled ? 'py-4' : 'py-8'
      }`}
    >
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-6">
        {/* Restored Orange Logo */}
        <div 
          className="group flex cursor-pointer items-center gap-3"
          onClick={() => handleNavigate('Home')}
        >
          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-[#efa339] text-black transition-transform duration-500 group-hover:scale-110 flex items-center justify-center">
            <span className="font-heading text-2xl font-bold italic">N</span>
            <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-500 group-hover:opacity-20" />
          </div>
          <span className="font-heading text-2xl tracking-tighter text-white">
            Nudge <span className="italic text-[#efa339]">2.0</span>
          </span>
        </div>

        {/* Minimalist Desktop Nav */}
        <div className="hidden items-center gap-1 rounded-full border border-white/[0.05] bg-white/[0.02] p-1 backdrop-blur-md md:flex">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavigate(item.label)}
              className={`relative px-6 py-2 text-[11px] font-bold uppercase tracking-[2px] transition-colors duration-500 ${
                activeItem === item.label ? 'text-white' : 'text-white/30 hover:text-white/60'
              }`}
            >
              <span className="relative z-10">{item.label}</span>
              {activeItem === item.label && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-white/[0.08]"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Restored Orange Get Started Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleNavigate('Start')}
            className="group relative hidden overflow-hidden rounded-full bg-[#efa339] px-8 py-2.5 text-[11px] font-bold uppercase tracking-[2px] text-black transition-all duration-500 hover:shadow-[0_0_20px_rgba(239,163,57,0.3)] md:block"
          >
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-500 group-hover:opacity-20" />
          </button>

          {/* Mobile Toggle */}
          <button 
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-white/10 md:hidden bg-white/5"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <motion.span 
              animate={isMobileMenuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              className="h-[1px] w-5 bg-white"
            />
            <motion.span 
              animate={isMobileMenuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              className="h-[1px] w-5 bg-white"
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/95 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => handleNavigate(item.label)}
                  className={`font-heading text-6xl transition-colors ${
                    activeItem === item.label ? 'text-[#efa339]' : 'text-white/50 hover:text-white'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
              
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => handleNavigate('Start')}
                className="mt-8 px-10 py-4 bg-[#efa339] text-black font-body font-bold rounded-full text-lg tracking-tight"
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
