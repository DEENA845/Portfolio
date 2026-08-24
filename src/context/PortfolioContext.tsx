import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ProfileData, Project, AccentPreset } from '../types';
import { INITIAL_PROFILE, ACCENT_PRESETS } from '../data/portfolioData';
import Lenis from 'lenis';

interface CursorState {
  text: string;
  variant: 'default' | 'hover' | 'drag' | 'view' | 'action' | 'hidden';
  active: boolean;
}

interface PortfolioContextType {
  profile: ProfileData;
  updateProfile: (data: Partial<ProfileData>) => void;
  resetProfile: () => void;
  accent: AccentPreset;
  setAccent: (accent: AccentPreset) => void;
  activeSection: string;
  setActiveSection: (id: string) => void;
  cursorState: CursorState;
  setCursorText: (text: string, variant?: CursorState['variant']) => void;
  resetCursor: () => void;
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  isResumeOpen: boolean;
  setIsResumeOpen: (open: boolean) => void;
  isCustomizerOpen: boolean;
  setIsCustomizerOpen: (open: boolean) => void;
  isCmdPaletteOpen: boolean;
  setIsCmdPaletteOpen: (open: boolean) => void;
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
  lenis: Lenis | null;
  scrollToSection: (sectionId: string) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<ProfileData>(() => {
    try {
      const saved = localStorage.getItem('portfolio_user_data_v1');
      if (saved) {
        return { ...INITIAL_PROFILE, ...JSON.parse(saved) };
      }
    } catch {
      // fallback
    }
    return INITIAL_PROFILE;
  });

  const [accent, setAccentState] = useState<AccentPreset>(() => {
    try {
      const savedAccentId = localStorage.getItem('portfolio_accent_id');
      const found = ACCENT_PRESETS.find((a) => a.id === savedAccentId);
      if (found) return found;
    } catch {
      // fallback
    }
    return ACCENT_PRESETS[0]; // Emerald default
  });

  const [activeSection, setActiveSection] = useState<string>('hero');
  const [cursorState, setCursorState] = useState<CursorState>({
    text: '',
    variant: 'default',
    active: false,
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);
  const [isCmdPaletteOpen, setIsCmdPaletteOpen] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [lenis, setLenis] = useState<Lenis | null>(null);

  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    if (mediaQuery.matches) {
      return () => mediaQuery.removeEventListener('change', handleMediaChange);
    }

    const lenisInstance = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      infinite: false,
    });

    setLenis(lenisInstance);

    let rafId: number;
    function raf(time: number) {
      lenisInstance.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      cancelAnimationFrame(rafId);
      lenisInstance.destroy();
    };
  }, []);

  // Sync CSS variables when accent changes
  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', accent.hex);
    document.documentElement.style.setProperty('--accent-color-rgb', accent.rgb);
    document.documentElement.style.setProperty('--accent-glow', accent.glow);
    try {
      localStorage.setItem('portfolio_accent_id', accent.id);
    } catch {
      // ignore
    }
  }, [accent]);

  // Global keyboard shortcuts (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCmdPaletteOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setSelectedProject(null);
        setIsResumeOpen(false);
        setIsCustomizerOpen(false);
        setIsCmdPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const updateProfile = (data: Partial<ProfileData>) => {
    setProfile((prev) => {
      const updated = { ...prev, ...data };
      try {
        localStorage.setItem('portfolio_user_data_v1', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const resetProfile = () => {
    setProfile(INITIAL_PROFILE);
    try {
      localStorage.removeItem('portfolio_user_data_v1');
    } catch {
      // ignore
    }
  };

  const setAccent = (newAccent: AccentPreset) => {
    setAccentState(newAccent);
  };

  const setCursorText = (text: string, variant: CursorState['variant'] = 'hover') => {
    setCursorState({
      text,
      variant,
      active: true,
    });
  };

  const resetCursor = () => {
    setCursorState({
      text: '',
      variant: 'default',
      active: false,
    });
  };

  const toggleReducedMotion = () => {
    setReducedMotion((prev) => !prev);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (!el) return;
    if (lenis && !reducedMotion) {
      lenis.scrollTo(el, { offset: -60 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        profile,
        updateProfile,
        resetProfile,
        accent,
        setAccent,
        activeSection,
        setActiveSection,
        cursorState,
        setCursorText,
        resetCursor,
        selectedProject,
        setSelectedProject,
        isResumeOpen,
        setIsResumeOpen,
        isCustomizerOpen,
        setIsCustomizerOpen,
        isCmdPaletteOpen,
        setIsCmdPaletteOpen,
        reducedMotion,
        toggleReducedMotion,
        lenis,
        scrollToSection,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
