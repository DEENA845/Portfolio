import React, { useState } from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Code, 
  Sparkles, 
  Server, 
  Layout, 
  CheckCircle2, 
  Cpu, 
  Layers, 
  Terminal 
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Code,
  Sparkles,
  Server,
  Layout,
};

export const Skills: React.FC = () => {
  const { profile, accent, setCursorText, resetCursor } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...profile.skills.map((c) => c.name)];

  const filteredSkills =
    selectedCategory === 'All'
      ? profile.skills
      : profile.skills.filter((c) => c.name === selectedCategory);

  return (
    <section
      id="skills"
      aria-label="Technical Skills and Capabilities"
      className="py-24 relative overflow-hidden bg-zinc-950/60 border-t border-b border-zinc-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">02 / CAPABILITIES</span>
              <div className="h-[1px] w-12 bg-zinc-800" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight">
              Skills & Technical Arsenal
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  id={`skill-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  onClick={() => setSelectedCategory(cat)}
                  onMouseEnter={() => setCursorText('FILTER')}
                  onMouseLeave={resetCursor}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    isSelected
                      ? 'bg-zinc-800 text-white border font-semibold'
                      : 'bg-zinc-900/60 text-zinc-400 border border-zinc-800/80 hover:text-zinc-200'
                  }`}
                  style={{
                    borderColor: isSelected ? accent.hex : undefined,
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSkills.map((categoryGroup, groupIdx) => {
            const IconComponent = ICON_MAP[categoryGroup.iconName] || Code;

            return (
              <motion.div
                key={categoryGroup.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: groupIdx * 0.1 }}
                className="p-7 rounded-3xl bg-zinc-900/70 border border-zinc-800/90 shadow-xl backdrop-blur-md flex flex-col justify-between hover:border-zinc-700 transition-all duration-300 group"
              >
                <div>
                  {/* Category Card Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center bg-zinc-800 border border-zinc-700/60 group-hover:scale-105 transition-transform"
                        style={{ color: accent.hex }}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white font-display">
                          {categoryGroup.name}
                        </h3>
                        <p className="text-xs text-zinc-400 font-normal">
                          {categoryGroup.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Skills List inside this group */}
                  <div className="space-y-4 mt-6">
                    {categoryGroup.skills.map((skill) => (
                      <div key={skill.name} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-zinc-200">{skill.name}</span>
                            {skill.tag && (
                              <span 
                                className="px-2 py-0.5 rounded text-[10px] font-mono tracking-tight"
                                style={{
                                  backgroundColor: `${accent.hex}15`,
                                  color: accent.hex,
                                }}
                              >
                                {skill.tag}
                              </span>
                            )}
                          </div>
                          <span className="font-mono text-zinc-500 text-[11px]">{skill.level}%</span>
                        </div>

                        {/* Progress Bar Meter */}
                        <div className="h-1.5 w-full rounded-full bg-zinc-800/90 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                            className="h-full rounded-full"
                            style={{
                              backgroundColor: skill.highlight ? accent.hex : '#52525b',
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Tags summary */}
                <div className="mt-8 pt-4 border-t border-zinc-800/80 flex flex-wrap gap-1.5">
                  {categoryGroup.skills.map((s) => (
                    <span
                      key={s.name}
                      className="px-2.5 py-1 rounded-md bg-zinc-800/80 text-[11px] font-mono text-zinc-400"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
