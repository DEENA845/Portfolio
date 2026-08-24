import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { ACCENT_PRESETS } from '../data/portfolioData';
import { 
  Search, 
  Command, 
  ArrowRight, 
  FileText, 
  Sliders, 
  Palette, 
  Mail, 
  Sparkles, 
  Code2, 
  Briefcase, 
  Layers,
  Send,
  X
} from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const {
    isCmdPaletteOpen,
    setIsCmdPaletteOpen,
    scrollToSection,
    setIsResumeOpen,
    setIsCustomizerOpen,
    setAccent,
    profile,
    accent,
  } = usePortfolio();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const actions = [
    {
      id: 'sec-hero',
      title: 'Go to Top / Hero',
      category: 'Navigation',
      icon: Sparkles,
      action: () => scrollToSection('hero'),
    },
    {
      id: 'sec-about',
      title: 'About Me & Values',
      category: 'Navigation',
      icon: UserIcon,
      action: () => scrollToSection('about'),
    },
    {
      id: 'sec-skills',
      title: 'Technical Skills & Arsenal',
      category: 'Navigation',
      icon: Code2,
      action: () => scrollToSection('skills'),
    },
    {
      id: 'sec-projects',
      title: 'Selected Projects & Case Studies',
      category: 'Navigation',
      icon: Layers,
      action: () => scrollToSection('projects'),
    },
    {
      id: 'sec-experience',
      title: 'Work Experience & Timeline',
      category: 'Navigation',
      icon: Briefcase,
      action: () => scrollToSection('experience'),
    },
    {
      id: 'sec-contact',
      title: 'Get in Touch / Message',
      category: 'Navigation',
      icon: Send,
      action: () => scrollToSection('contact'),
    },
    {
      id: 'act-resume',
      title: 'View Resume & CV',
      category: 'Actions',
      icon: FileText,
      action: () => setIsResumeOpen(true),
    },
    {
      id: 'act-customizer',
      title: 'Personalize Portfolio (Live Editor)',
      category: 'Actions',
      icon: Sliders,
      action: () => setIsCustomizerOpen(true),
    },
    {
      id: 'act-email',
      title: `Copy Email (${profile.email})`,
      category: 'Actions',
      icon: Mail,
      action: () => {
        navigator.clipboard.writeText(profile.email);
      },
    },
    ...ACCENT_PRESETS.map((p) => ({
      id: `theme-${p.id}`,
      title: `Switch Accent: ${p.name}`,
      category: 'Themes',
      icon: Palette,
      action: () => setAccent(p),
    })),
  ];

  function UserIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    );
  }

  const filtered = actions.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
        setIsCmdPaletteOpen(false);
      }
    }
  };

  if (!isCmdPaletteOpen) return null;

  return (
    <AnimatePresence>
      <div
        id="cmd-palette-backdrop"
        className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/70 backdrop-blur-md"
        onClick={() => setIsCmdPaletteOpen(false)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.15 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-xl rounded-2xl bg-zinc-900 border border-zinc-700/80 shadow-2xl overflow-hidden text-zinc-100"
        >
          {/* Search Header */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-800">
            <Search className="w-4 h-4 text-zinc-400" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a command or jump to section..."
              className="flex-1 bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none font-mono"
            />
            <button
              onClick={() => setIsCmdPaletteOpen(false)}
              className="text-xs font-mono text-zinc-500 px-1.5 py-0.5 rounded bg-zinc-800 hover:text-white"
            >
              ESC
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-80 overflow-y-auto p-2 space-y-1 custom-scrollbar">
            {filtered.length === 0 ? (
              <div className="py-8 text-center text-xs font-mono text-zinc-500">
                No matching actions found.
              </div>
            ) : (
              filtered.map((item, index) => {
                const isSelected = selectedIndex === index;
                const IconComp = item.icon;
                return (
                  <button
                    key={item.id}
                    id={`cmd-item-${item.id}`}
                    onClick={() => {
                      item.action();
                      setIsCmdPaletteOpen(false);
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-mono transition-colors text-left ${
                      isSelected
                        ? 'bg-zinc-800 text-white font-semibold'
                        : 'text-zinc-400 hover:bg-zinc-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                          isSelected ? 'bg-zinc-700 text-white' : 'bg-zinc-950 text-zinc-400'
                        }`}
                      >
                        <IconComp className="w-3.5 h-3.5" style={{ color: isSelected ? accent.hex : undefined }} />
                      </div>
                      <div>
                        <div className="text-zinc-200">{item.title}</div>
                        <div className="text-[10px] text-zinc-500">{item.category}</div>
                      </div>
                    </div>

                    {isSelected && (
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Footer Shortcuts */}
          <div className="px-4 py-2 bg-zinc-950/80 border-t border-zinc-800 text-[11px] font-mono text-zinc-500 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span>↑↓ to navigate</span>
              <span>•</span>
              <span>↵ to select</span>
            </div>
            <span>Portfolio Navigator</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
