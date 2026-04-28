import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  activeItem?: string;
  onNavigate?: (item: string) => void;
  isAuthenticated?: boolean;
  userEmail?: string;
}

const Navbar: React.FC<NavbarProps> = ({ activeItem = 'Home', onNavigate, isAuthenticated = false, userEmail }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  
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
    setIsProfileDropdownOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 z-[100] w-full transition-all duration-500 ${
        isScrolled ? 'py-4' : 'py-8'
      }`}
    >
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-6">
        {/* Logo */}
        <div 
          className="group flex cursor-pointer items-center gap-3"
          onClick={() => handleNavigate('Home')}
        >
          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-[#efa339] text-black transition-transform duration-500 group-hover:scale-110 flex items-center justify-center">
            <span className="font-heading text-2xl font-bold italic">N</span>
            <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-500 group-hover:opacity-20" />
          </div>
          <span className="font-heading text-2xl tracking-tighter text-white">
            Nudge
          </span>
        </div>

        {/* Desktop Nav */}
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

        {/* Desktop Right Side / Profile Dropdown */}
        <div className="hidden md:flex items-center gap-4 relative">
          {isAuthenticated ? (
            <div className="relative">
              <button 
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2 rounded-full border border-white/[0.05] bg-white/[0.02] pl-3 pr-1 py-1 backdrop-blur-md transition-colors hover:bg-white/[0.05]"
              >
                <span className="text-xs text-white/70 font-medium">
                  {userEmail?.split('@')[0] || 'Profile'}
                </span>
                <div className="h-7 w-7 rounded-full bg-[#efa339] flex items-center justify-center text-black font-bold text-xs uppercase">
                  {userEmail?.[0] || 'U'}
                </div>
              </button>
              
              <AnimatePresence>
                {isProfileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-48 rounded-xl border border-white/10 bg-[#111] py-2 shadow-xl overflow-hidden"
                  >
                    <div className="px-4 py-3 mb-1 border-b border-white/5">
                      <p className="text-xs text-white/50 truncate" title={userEmail}>{userEmail}</p>
                    </div>
                    <button
                      onClick={() => handleNavigate('Dashboard')}
                      className="w-full text-left px-4 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-white transition-colors"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => handleNavigate('Sign Out')}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors mt-1"
                    >
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              onClick={() => handleNavigate('Start')}
              className="group relative overflow-hidden rounded-full bg-[#efa339] px-8 py-2.5 text-[11px] font-bold uppercase tracking-[2px] text-black transition-all duration-500 hover:shadow-[0_0_20px_rgba(239,163,57,0.3)]"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-500 group-hover:opacity-20" />
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-white/10 md:hidden bg-white/5 z-[110]"
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
            <div className="flex flex-col items-center gap-8 w-full max-w-sm px-6">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => handleNavigate(item.label)}
                  className={`font-heading text-5xl transition-colors ${
                    activeItem === item.label ? 'text-[#efa339]' : 'text-white/50 hover:text-white'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
              
              <div className="w-full h-[1px] bg-white/10 my-4" />

              {isAuthenticated ? (
                <div className="flex flex-col items-center w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-white/50 text-sm mb-6 truncate max-w-full"
                  >
                    Signed in as {userEmail}
                  </motion.div>
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    onClick={() => handleNavigate('Sign Out')}
                    className="w-full px-10 py-4 bg-red-500/10 border border-red-500/20 text-red-400 font-body font-bold rounded-full text-lg tracking-tight hover:bg-red-500/20 transition-colors"
                  >
                    Sign Out
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={() => handleNavigate('Login')}
                  className="w-full px-10 py-4 bg-[#efa339] text-black font-body font-bold rounded-full text-lg tracking-tight hover:bg-[#ffb44a] transition-colors"
                >
                  Login / Sign Up
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
