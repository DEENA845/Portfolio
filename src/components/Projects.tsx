import React, { useState } from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project } from '../types';
import { 
  ArrowUpRight, 
  ExternalLink, 
  Github, 
  Sparkles, 
  Layers, 
  Maximize2 
} from 'lucide-react';

export const Projects: React.FC = () => {
  const { profile, accent, setSelectedProject, setCursorText, resetCursor } = usePortfolio();
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = ['All', 'Web App', 'Creative Tech', 'Design System', 'AI & Tools', 'Open Source'];

  const filteredProjects =
    activeFilter === 'All'
      ? profile.projects
      : profile.projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="projects"
      aria-label="Selected Projects and Case Studies"
      className="py-28 relative overflow-hidden bg-[#09090b]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">03 / ARCHIVE</span>
              <div className="h-[1px] w-12 bg-zinc-800" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight">
              Selected Works & Case Studies
            </h2>
            <p className="mt-2 text-base text-zinc-400 max-w-xl">
              A curated selection of client platforms, open source tools, and high-fidelity experimental interfaces.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isSelected = activeFilter === cat;
              return (
                <button
                  key={cat}
                  id={`project-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  onClick={() => setActiveFilter(cat)}
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

        {/* Project Beats List (Alternating Left/Right Rhythm) */}
        <div className="space-y-24">
          {filteredProjects.map((project, index) => {
            const isImageLeft = index % 2 === 0;

            return (
              <motion.div
                key={project.id}
                id={`project-beat-${project.id}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center group"
              >
                {/* Visual Thumbnail Column */}
                <div
                  className={`lg:col-span-7 ${
                    isImageLeft ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div
                    onClick={() => setSelectedProject(project)}
                    onMouseEnter={() => setCursorText('VIEW')}
                    onMouseLeave={resetCursor}
                    className="relative rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800/90 shadow-2xl cursor-pointer transition-all duration-500 group-hover:border-zinc-600 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
                  >
                    {/* Top window bar simulation */}
                    <div className="px-4 py-3 bg-zinc-950/80 border-b border-zinc-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                        <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                        <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                      </div>
                      <div className="text-[11px] font-mono text-zinc-500">
                        {project.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.app
                      </div>
                      <div className="flex items-center gap-2">
                        <span 
                          className="px-2 py-0.5 rounded text-[10px] font-mono font-medium"
                          style={{
                            backgroundColor: `${accent.hex}20`,
                            color: accent.hex,
                          }}
                        >
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Screenshot Frame */}
                    <div className="aspect-[16/10] overflow-hidden relative bg-zinc-950">
                      <img
                        src={project.image}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top filter contrast-[1.05] group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                      {/* Expand Overlay Button */}
                      <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-white text-xs font-mono flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Case Study</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content & Specs Column */}
                <div
                  className={`lg:col-span-5 space-y-6 ${
                    isImageLeft ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-zinc-500">{project.year}</span>
                      <span className="text-zinc-700">•</span>
                      {project.metricBadge && (
                        <span 
                          className="text-xs font-mono font-semibold"
                          style={{ color: accent.hex }}
                        >
                          {project.metricBadge}
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight group-hover:text-white transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      id={`btn-case-study-${project.id}`}
                      onClick={() => setSelectedProject(project)}
                      onMouseEnter={() => setCursorText('EXPLORE')}
                      onMouseLeave={resetCursor}
                      className="px-5 py-2.5 rounded-xl text-xs font-semibold text-zinc-950 flex items-center gap-1.5 transition-transform hover:-translate-y-0.5"
                      style={{
                        backgroundColor: accent.hex,
                        boxShadow: `0 0 20px ${accent.glow}`,
                      }}
                    >
                      <span>Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => setCursorText('VISIT')}
                        onMouseLeave={resetCursor}
                        className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => setCursorText('CODE')}
                        onMouseLeave={resetCursor}
                        className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-colors"
                        title="Source Code"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
