import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { ACCENT_PRESETS } from '../data/portfolioData';
import { 
  FileText, 
  Command, 
  Palette, 
  Menu, 
  X, 
  Sparkles, 
  Sliders,
  ArrowUpRight 
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC = () => {
  const {
    profile,
    activeSection,
    scrollToSection,
    accent,
    setAccent,
    setIsResumeOpen,
    setIsCustomizerOpen,
    setIsCmdPaletteOpen,
    setCursorText,
    resetCursor,
  } = usePortfolio();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccentMenuOpen, setIsAccentMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-[#09090b]/80 backdrop-blur-xl border-b border-white/10 shadow-2xl'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Monogram */}
          <button
            id="nav-logo-btn"
            onClick={() => scrollToSection('hero')}
            onMouseEnter={() => setCursorText('TOP')}
            onMouseLeave={resetCursor}
            className="flex items-center gap-2.5 group text-left focus:outline-none"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-display font-bold text-sm tracking-tight text-white border transition-transform duration-200 group-hover:scale-105"
              style={{
                backgroundColor: '#18181b',
                borderColor: `${accent.hex}40`,
                boxShadow: `0 0 15px ${accent.glow}`,
              }}
            >
              {profile.name.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="font-display font-semibold text-sm tracking-tight text-white group-hover:text-white/90">
                {profile.name}
              </span>
              <span className="text-[11px] font-mono text-zinc-400 -mt-0.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {profile.role}
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav
            id="nav-desktop-menu"
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-zinc-900/70 border border-white/10 backdrop-blur-md shadow-inner"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => scrollToSection(item.id)}
                  onMouseEnter={() => setCursorText(item.label.toUpperCase())}
                  onMouseLeave={resetCursor}
                  className={`relative px-3.5 py-1.5 text-xs font-medium tracking-wide rounded-full transition-colors duration-200 ${
                    isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-full border shadow-sm"
                      style={{
                        backgroundColor: '#27272a',
                        borderColor: `${accent.hex}60`,
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Suite */}
          <div className="flex items-center gap-2">
            {/* Quick Cmd+K search trigger */}
            <button
              id="cmd-palette-trigger-btn"
              onClick={() => setIsCmdPaletteOpen(true)}
              onMouseEnter={() => setCursorText('SEARCH')}
              onMouseLeave={resetCursor}
              title="Quick Command Palette (⌘K)"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 text-zinc-400 hover:text-zinc-200 text-xs font-mono transition-all"
            >
              <Command className="w-3.5 h-3.5" />
              <span>⌘K</span>
            </button>

            {/* Accent Theme Switcher Button */}
            <div className="relative">
              <button
                id="accent-palette-trigger-btn"
                onClick={() => setIsAccentMenuOpen((prev) => !prev)}
                onMouseEnter={() => setCursorText('THEME')}
                onMouseLeave={resetCursor}
                title="Change Theme Accent"
                className="w-9 h-9 rounded-lg flex items-center justify-center bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white transition-all"
              >
                <Palette className="w-4 h-4" style={{ color: accent.hex }} />
              </button>

              {/* Accent Dropdown */}
              <AnimatePresence>
                {isAccentMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setIsAccentMenuOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-48 p-2 rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl z-40"
                    >
                      <div className="text-[11px] font-mono uppercase text-zinc-500 px-2 py-1 tracking-wider">
                        Accent Color
                      </div>
                      <div className="space-y-1 mt-1">
                        {ACCENT_PRESETS.map((preset) => (
                          <button
                            key={preset.id}
                            id={`accent-btn-${preset.id}`}
                            onClick={() => {
                              setAccent(preset);
                              setIsAccentMenuOpen(false);
                            }}
                            className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                              accent.id === preset.id
                                ? 'bg-zinc-800 text-white font-medium'
                                : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200'
                            }`}
                          >
                            <span
                              className="w-3 h-3 rounded-full shadow-sm"
                              style={{ backgroundColor: preset.hex }}
                            />
                            <span>{preset.name}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Live Customizer / Edit Drawer */}
            <button
              id="customizer-drawer-trigger-btn"
              onClick={() => setIsCustomizerOpen(true)}
              onMouseEnter={() => setCursorText('CUSTOMIZE')}
              onMouseLeave={resetCursor}
              title="Personalize & Edit Portfolio"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 text-xs font-medium text-zinc-300 hover:text-white transition-all"
            >
              <Sliders className="w-3.5 h-3.5 text-emerald-400" style={{ color: accent.hex }} />
              <span className="hidden sm:inline">Customize</span>
            </button>

            {/* Resume Action */}
            <button
              id="nav-resume-btn"
              onClick={() => setIsResumeOpen(true)}
              onMouseEnter={() => setCursorText('RESUME')}
              onMouseLeave={resetCursor}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide text-zinc-950 transition-all transform hover:-translate-y-0.5"
              style={{
                backgroundColor: accent.hex,
                boxShadow: `0 0 20px ${accent.glow}`,
              }}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              id="mobile-nav-toggle-btn"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-30 bg-[#09090b]/95 backdrop-blur-2xl border-b border-zinc-800 p-6 md:hidden shadow-2xl"
          >
            <nav className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  id={`mobile-nav-item-${item.id}`}
                  onClick={() => {
                    scrollToSection(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    activeSection === item.id
                      ? 'bg-zinc-800/80 text-white font-semibold'
                      : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                  }`}
                >
                  <span>{item.label}</span>
                  {activeSection === item.id && (
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: accent.hex }}
                    />
                  )}
                </button>
              ))}

              <div className="pt-4 mt-2 border-t border-zinc-800/80 flex flex-col gap-2.5">
                <button
                  id="mobile-resume-trigger-btn"
                  onClick={() => {
                    setIsResumeOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-zinc-950"
                  style={{ backgroundColor: accent.hex }}
                >
                  <FileText className="w-4 h-4" />
                  <span>View Resume / CV</span>
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
