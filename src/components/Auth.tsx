import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

interface AuthProps {
  onClose: () => void;
}

export default function Auth({ onClose }: AuthProps) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [view, setView] = useState<'sign-in' | 'sign-up' | 'forgot-password'>('sign-in');
  const [message, setMessage] = useState<{ text: string, type: 'error' | 'success' } | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (view === 'sign-up') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setMessage({ text: 'Check your email for the confirmation link! (or try signing in if auto-confirmed)', type: 'success' });
      } else if (view === 'sign-in') {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else if (view === 'forgot-password') {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw error;
        setMessage({ text: 'Password reset instructions sent to your email.', type: 'success' });
      }
    } catch (error: any) {
      setMessage({ text: error.message || 'An error occurred', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-md bg-[#111] p-8 rounded-2xl border border-white/5 shadow-2xl relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-500 hover:text-white transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <h2 className="text-2xl font-semibold text-white mb-6 text-center font-heading">
          {view === 'sign-up' ? 'Create an account' : view === 'forgot-password' ? 'Reset password' : 'Welcome back'}
        </h2>
        
        {message && (
          <div className={`p-4 rounded-lg mb-6 text-sm ${message.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#efa339] transition-colors"
              type="email"
              placeholder="Your email address"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          {view !== 'forgot-password' && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#efa339] transition-colors"
                type="password"
                placeholder="Your password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          )}

          {view === 'sign-in' && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setView('forgot-password')}
                className="text-xs text-gray-500 hover:text-[#efa339] transition-colors"
              >
                Forgot password?
              </button>
            </div>
          )}

          <button
            className="w-full bg-[#efa339] text-black font-semibold rounded-lg px-4 py-3 hover:bg-[#ffb44a] transition-colors disabled:opacity-50 mt-2"
            disabled={loading}
          >
            {loading ? 'Loading...' : (view === 'sign-up' ? 'Sign Up' : view === 'forgot-password' ? 'Send Reset Link' : 'Sign In')}
          </button>
        </form>

        <div className="mt-6 text-center">
          {view === 'sign-in' ? (
            <button
              type="button"
              className="text-gray-400 hover:text-white text-sm transition-colors"
              onClick={() => setView('sign-up')}
            >
              Don't have an account? <span className="text-[#efa339]">Sign Up</span>
            </button>
          ) : (
            <button
              type="button"
              className="text-gray-400 hover:text-white text-sm transition-colors"
              onClick={() => setView('sign-in')}
            >
              Already have an account? <span className="text-[#efa339]">Sign In</span>
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
