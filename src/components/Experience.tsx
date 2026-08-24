import React from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronRight } from 'lucide-react';

export const Experience: React.FC = () => {
  const { profile, accent, setCursorText, resetCursor } = usePortfolio();

  return (
    <section
      id="experience"
      aria-label="Work Experience and Career History"
      className="py-24 relative overflow-hidden bg-zinc-950/60 border-t border-zinc-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">04 / TIMELINE</span>
          <div className="h-[1px] w-12 bg-zinc-800" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight">
              Work History & Experience
            </h2>
            <p className="mt-2 text-base text-zinc-400 max-w-xl">
              Leading frontend initiatives, shipping consumer features, and establishing engineering standards across tech hubs.
            </p>
          </div>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l border-zinc-800 ml-4 sm:ml-8 space-y-12 pl-6 sm:pl-10">
          {profile.experience.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Timeline Marker Node */}
              <div
                className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 border-zinc-900 transition-all duration-300 group-hover:scale-125"
                style={{
                  backgroundColor: idx === 0 ? accent.hex : '#3f3f46',
                  boxShadow: idx === 0 ? `0 0 12px ${accent.glow}` : undefined,
                }}
              />

              {/* Experience Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300 backdrop-blur-sm space-y-4">
                {/* Header Information */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                        {item.role}
                      </h3>
                      {item.badge && (
                        <span 
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold"
                          style={{
                            backgroundColor: `${accent.hex}20`,
                            color: accent.hex,
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-semibold text-zinc-300 mt-0.5 flex items-center gap-2">
                      <span>{item.company}</span>
                      <span className="text-zinc-600">•</span>
                      <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {item.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 bg-zinc-800/80 px-3 py-1 rounded-lg self-start sm:self-auto border border-zinc-700/60">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.period}</span>
                  </div>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                  {item.description}
                </p>

                {/* Key Accomplishment Bullets */}
                <div className="space-y-2 pt-1">
                  {item.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <ChevronRight className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: accent.hex }} />
                      <span className="leading-relaxed">{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Chips */}
                <div className="pt-3 border-t border-zinc-800/80 flex flex-wrap gap-1.5">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-zinc-800/60 text-[11px] font-mono text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
