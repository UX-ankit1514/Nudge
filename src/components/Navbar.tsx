import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  activeItem?: string;
  onNavigate?: (item: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeItem = 'Home', onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

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

  const menuVariants = {
    closed: {
      opacity: 0,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <>
      <header className="sticky top-0 md:fixed md:top-0 md:left-0 z-[100] w-full backdrop-blur-[15px] md:backdrop-blur-none bg-[#0a0a0a]/70 md:bg-transparent border-b border-white/5 md:border-none transition-all duration-300">
        <nav className="max-w-[1440px] mx-auto px-6 py-4 lg:px-24 md:py-8 flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#efa339] flex items-center justify-center shadow-[0_0_20px_rgba(239,163,57,0.3)]">
              <span className="font-heading text-black text-xl md:text-2xl font-bold italic">N</span>
            </div>
            <span className="font-heading text-white text-xl md:text-2xl tracking-tighter">
              Nudge <span className="text-[#efa339] font-light">2.0</span>
            </span>
          </div>

          {/* Navigation Items (Desktop) */}
          <div className="hidden md:flex gap-2 p-1 bg-white/[0.02] border border-white/[0.05] rounded-full backdrop-blur-2xl">
            {navItems.map((item) => (
              <button
                type="button"
                key={item.label} 
                onClick={() => handleNavigate(item.label)}
                className={`px-6 py-2.5 rounded-full cursor-pointer transition-all duration-500 ${
                  activeItem === item.label 
                  ? 'bg-white/[0.08] text-white shadow-[0_4px_12px_rgba(0,0,0,0.1)]' 
                  : 'text-white/40 hover:text-white/80 hover:bg-white/[0.04]'
                }`}
              >
                <span className="text-[13px] font-body font-medium tracking-premium">
                  {item.label}
                </span>
                {activeItem === item.label && (
                   <motion.div layoutId="nav-underline" className="h-1 bg-[#efa339] rounded-full mt-1 w-1/2 mx-auto" />
                )}
              </button>
            ))}
          </div>

          {/* Action Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-3 md:gap-4">
            <button
              type="button"
              onClick={() => handleNavigate('Start')}
              className="px-4 py-2 md:px-6 md:py-2.5 bg-white/[0.05] border border-white/[0.1] rounded-full text-white text-[12px] md:text-[13px] font-body font-medium hover:bg-white/[0.1] transition-all duration-500"
            >
              Get Started
            </button>
            
            {/* Minimalist 2-line Hamburger Icon for Mobile */}
            <button 
              className="md:hidden relative z-[110] w-8 h-8 flex flex-col justify-center items-end gap-1.5 focus:outline-none group"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <motion.span 
                animate={isMobileMenuOpen ? { rotate: 45, y: 4, width: '100%' } : { rotate: 0, y: 0, width: '100%' }}
                className="h-[1.5px] bg-white rounded-full transition-all duration-300"
              />
              <motion.span 
                animate={isMobileMenuOpen ? { rotate: -45, y: -4, width: '100%' } : { rotate: 0, y: 0, width: '60%' }}
                className="h-[1.5px] bg-white rounded-full transition-all duration-300"
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Full-screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-[#0a0a0a]/95 backdrop-blur-[30px] flex items-center justify-center md:hidden"
          >
            <motion.div 
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex flex-col items-center gap-8"
            >
              {navItems.map((item) => (
                <motion.div
                  key={item.label}
                  variants={itemVariants}
                  className="cursor-pointer group"
                  onClick={() => handleNavigate(item.label)}
                >
                  <span className={`font-heading text-5xl tracking-[-0.02em] transition-colors duration-300 ${
                    activeItem === item.label ? 'text-[#efa339]' : 'text-white/50 group-hover:text-white'
                  }`}>
                    {item.label}
                  </span>
                </motion.div>
              ))}
              
              <motion.div 
                variants={itemVariants}
                className="mt-8"
              >
                <button
                  type="button"
                  onClick={() => handleNavigate('Start')}
                  className="px-10 py-4 bg-[#efa339] text-black font-body font-semibold rounded-full text-lg tracking-tight shadow-[0_20px_40px_rgba(239,163,57,0.15)]"
                >
                  Get Started
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
