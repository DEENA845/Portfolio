import React from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { useCountUp } from '../hooks/useCountUp';
import { 
  Zap, 
  Cpu, 
  Eye, 
  Sparkles, 
  Workflow, 
  TerminalSquare, 
  CheckCircle2 
} from 'lucide-react';

const StatCard: React.FC<{ stat: { id: string; value: number; suffix: string; label: string; description: string }; accentHex: string }> = ({ stat, accentHex }) => {
  const { count, elementRef } = useCountUp(stat.value, 1800);

  return (
    <div
      ref={elementRef}
      className="relative p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300 backdrop-blur-sm group"
    >
      <div className="flex items-baseline gap-1">
        <span className="text-4xl sm:text-5xl font-bold font-display tracking-tight text-white group-hover:scale-105 transition-transform duration-300">
          {count}
        </span>
        <span 
          className="text-3xl sm:text-4xl font-bold font-display"
          style={{ color: accentHex }}
        >
          {stat.suffix}
        </span>
      </div>
      <div className="mt-2 text-sm font-semibold text-zinc-200">{stat.label}</div>
      <p className="mt-1 text-xs text-zinc-400 font-normal leading-relaxed">{stat.description}</p>
    </div>
  );
};

export const About: React.FC = () => {
  const { profile, accent, setCursorText, resetCursor } = usePortfolio();

  const principles = [
    {
      icon: Zap,
      title: '60fps Interaction Fidelity',
      description: 'Choreographing gestures, scroll physics, and layout springs with zero frame drops.',
    },
    {
      icon: Cpu,
      title: 'Rigorous Architecture',
      description: 'Clean separation of concerns, strict TypeScript types, and modular token systems.',
    },
    {
      icon: Eye,
      title: 'Obsessive Polish',
      description: 'Caring for the unprompted details — micro-haptics, font kerning, and smooth fallbacks.',
    },
  ];

  return (
    <section
      id="about"
      aria-label="About Biography and Impact"
      className="py-24 relative overflow-hidden bg-[#09090b]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">01 / DISCOVERY</span>
          <div className="h-[1px] w-12 bg-zinc-800" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Statement & Bio */}
          <div className="lg:col-span-8 space-y-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight leading-[1.15]">
              Engineering digital products where{' '}
              <span 
                className="underline decoration-2 underline-offset-8"
                style={{ textDecorationColor: accent.hex }}
              >
                every pixel and micro-interaction
              </span>{' '}
              serves a deliberate purpose.
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
              {profile.fullBio.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Core Values Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {principles.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60 flex flex-col space-y-2 hover:bg-zinc-900/80 transition-colors"
                  >
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center bg-zinc-800"
                      style={{ color: accent.hex }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-sm font-semibold text-white">{item.title}</div>
                    <p className="text-xs text-zinc-400 leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Secondary Visual / Philosophy Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl bg-zinc-900/70 border border-zinc-800/90 shadow-xl backdrop-blur-md">
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: accent.hex }}
                />
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Current Focus</span>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Refining spatial canvas pipelines, WebGPU shader interactions, and accessible generative UI components.
              </p>
              <div className="mt-4 pt-4 border-t border-zinc-800/80 flex flex-wrap gap-1.5">
                {['React 19', 'Web Audio', 'GSAP', 'Lenis', 'Tailwind v4', 'A11y'].map((pill) => (
                  <span
                    key={pill}
                    className="px-2.5 py-1 rounded-md bg-zinc-800 text-[11px] font-mono text-zinc-300"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-gradient-to-br from-zinc-900/90 to-zinc-950 border border-zinc-800 text-center flex flex-col items-center">
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">Location & Timezone</div>
              <div className="text-lg font-semibold text-white">{profile.location}</div>
              <div className="mt-2 text-xs text-zinc-400">
                Synchronized across Americas & European collaboration hours.
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row with Count-Up Numbers */}
        <div className="mt-16 pt-12 border-t border-zinc-800/80">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {profile.stats.map((stat) => (
              <StatCard key={stat.id} stat={stat} accentHex={accent.hex} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
