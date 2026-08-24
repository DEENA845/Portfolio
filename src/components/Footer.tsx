import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowUp, Clock, Terminal, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { profile, accent, scrollToSection, setCursorText, resetCursor } = usePortfolio();
  const [timeString, setTimeString] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const options: Intl.DateTimeFormatOptions = {
          timeZone: 'America/Los_Angeles',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        };
        const formatter = new Intl.DateTimeFormat([], options);
        setTimeString(formatter.format(new Date()));
      } catch {
        setTimeString(new Date().toLocaleTimeString());
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="py-12 bg-zinc-950 border-t border-zinc-900 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Local Timezone */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2 font-display font-bold text-white text-sm">
              <span 
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: accent.hex }}
              />
              <span>{profile.name}</span>
            </div>
            <span className="hidden sm:inline text-zinc-700">|</span>
            <div className="flex items-center gap-1.5 font-mono text-zinc-500">
              <Clock className="w-3.5 h-3.5 text-zinc-400" />
              <span>SF Local Time: {timeString || '03:35 AM PST'}</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6 font-mono text-xs">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={profile.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Twitter / X
            </a>
          </div>

          {/* Back to Top */}
          <button
            id="footer-back-to-top-btn"
            onClick={() => scrollToSection('hero')}
            onMouseEnter={() => setCursorText('TOP')}
            onMouseLeave={resetCursor}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" style={{ color: accent.hex }} />
          </button>
        </div>

        <div className="pt-6 border-t border-zinc-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500 font-mono">
          <div>
            © {new Date().getFullYear()} {profile.name}. All rights reserved. Crafted with React, Tailwind & Lenis.
          </div>
          <div className="flex items-center gap-2">
            <span>High Performance Mode Enabled</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
