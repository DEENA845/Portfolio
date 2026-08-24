import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  ArrowDown, 
  ArrowUpRight, 
  Sparkles, 
  MapPin, 
  Terminal, 
  Code2, 
  Layers 
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { profile, accent, scrollToSection, setCursorText, resetCursor, reducedMotion } = usePortfolio();

  // 3D Parallax Tilt for Hero Photo Card
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="hero"
      aria-label="Hero Introduction"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-grid-pattern"
    >
      {/* Background ambient radial glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] opacity-25 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: accent.hex }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & Intent */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-300 shadow-md backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span 
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: accent.hex }}
                />
                <span 
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ backgroundColor: accent.hex }}
                />
              </span>
              <span>{profile.status}</span>
            </motion.div>

            {/* Main Tagline & Headline */}
            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-2"
              >
                <Terminal className="w-4 h-4" style={{ color: accent.hex }} />
                <span>{profile.name} — {profile.role}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white font-display leading-[1.08]"
              >
                {profile.tagline.split(' ').map((word, i) => {
                  const isHighlight = i === profile.tagline.split(' ').length - 1 || word.toLowerCase().includes('move') || word.toLowerCase().includes('purpose');
                  return (
                    <span
                      key={i}
                      className="inline-block mr-2.5"
                    >
                      {isHighlight ? (
                        <span 
                          className="relative inline-block transition-colors duration-300"
                          style={{
                            color: accent.hex,
                            textShadow: `0 0 35px ${accent.glow}`,
                          }}
                        >
                          {word}
                        </span>
                      ) : (
                        word
                      )}
                    </span>
                  );
                })}
              </motion.h1>
            </div>

            {/* Sub-line */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg sm:text-xl text-zinc-400 max-w-2xl font-normal leading-relaxed"
            >
              {profile.shortBio}
            </motion.p>

            {/* Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto"
            >
              <button
                id="hero-explore-projects-btn"
                onClick={() => scrollToSection('projects')}
                onMouseEnter={() => setCursorText('PROJECTS')}
                onMouseLeave={resetCursor}
                className="px-7 py-3.5 rounded-xl font-semibold text-sm text-zinc-950 transition-all transform hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2 group"
                style={{
                  backgroundColor: accent.hex,
                  boxShadow: `0 0 25px ${accent.glow}`,
                }}
              >
                <span>Explore Works</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                id="hero-contact-btn"
                onClick={() => scrollToSection('contact')}
                onMouseEnter={() => setCursorText('TALK')}
                onMouseLeave={resetCursor}
                className="px-6 py-3.5 rounded-xl font-semibold text-sm text-zinc-200 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 hover:border-zinc-500 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400" />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 pl-2">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                <span>{profile.location}</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Hero Focal Visual with 3D Tilt Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX: reducedMotion ? 0 : rotateX,
                rotateY: reducedMotion ? 0 : rotateY,
                transformStyle: 'preserve-3d',
              }}
              className="relative w-full max-w-md cursor-pointer group"
              onMouseEnter={() => setCursorText('ARUN')}
            >
              {/* Backlit Glowing Aura */}
              <div 
                className="absolute -inset-2 rounded-3xl opacity-30 group-hover:opacity-50 blur-2xl transition-all duration-500 pointer-events-none"
                style={{ backgroundColor: accent.hex }}
              />

              {/* Main Card Frame */}
              <div className="relative rounded-3xl bg-zinc-900/90 border border-zinc-700/60 p-3 shadow-2xl backdrop-blur-xl overflow-hidden transition-all duration-300 group-hover:border-zinc-500">
                {/* Visual Viewport */}
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-950">
                  <img
                    src={profile.heroImage}
                    alt={profile.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center filter grayscale contrast-[1.08] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  {/* Subtle Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-zinc-950/20 pointer-events-none" />

                  {/* Corner Accent Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-wide text-zinc-300 flex items-center gap-1.5">
                    <Code2 className="w-3 h-3" style={{ color: accent.hex }} />
                    <span>ENGINEER & DESIGNER</span>
                  </div>

                  {/* Bottom Interactive Spec Bar */}
                  <div className="absolute bottom-3 inset-x-3 p-3 rounded-xl bg-zinc-950/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-white">{profile.name}</div>
                      <div className="text-[11px] font-mono text-zinc-400">{profile.title}</div>
                    </div>
                    <div 
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-zinc-950"
                      style={{ backgroundColor: accent.hex }}
                    >
                      <Layers className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="w-full flex justify-center items-center gap-2 pt-6 z-10"
      >
        <button
          id="hero-scroll-down-btn"
          onClick={() => scrollToSection('about')}
          onMouseEnter={() => setCursorText('EXPLORE')}
          onMouseLeave={resetCursor}
          className="flex flex-col items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors focus:outline-none"
        >
          <span className="text-[11px] font-mono uppercase tracking-widest">Scroll to explore</span>
          <div className="w-5 h-8 rounded-full border border-zinc-700 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="w-1 h-2 rounded-full"
              style={{ backgroundColor: accent.hex }}
            />
          </div>
        </button>
      </motion.div>
    </section>
  );
};
