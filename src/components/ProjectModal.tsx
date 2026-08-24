import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  X, 
  ExternalLink, 
  Github, 
  Layers, 
  CheckCircle2, 
  TrendingUp, 
  Cpu, 
  ArrowUpRight,
  Code2
} from 'lucide-react';

export const ProjectModal: React.FC = () => {
  const { selectedProject, setSelectedProject, accent, setCursorText, resetCursor } = usePortfolio();

  if (!selectedProject) return null;

  const caseStudy = selectedProject.fullCaseStudy;

  return (
    <AnimatePresence>
      <div 
        id="case-study-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto bg-black/80 backdrop-blur-xl"
        onClick={() => setSelectedProject(null)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-zinc-900 border border-zinc-700/80 shadow-2xl text-zinc-100 p-6 sm:p-8 md:p-10 custom-scrollbar"
        >
          {/* Close button */}
          <button
            id="close-project-modal-btn"
            onClick={() => setSelectedProject(null)}
            onMouseEnter={() => setCursorText('CLOSE')}
            onMouseLeave={resetCursor}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 flex items-center justify-center text-zinc-300 hover:text-white transition-all z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header & Badges */}
          <div className="space-y-4 pr-12">
            <div className="flex flex-wrap items-center gap-2">
              <span 
                className="px-3 py-1 rounded-full text-xs font-mono font-semibold"
                style={{
                  backgroundColor: `${accent.hex}20`,
                  color: accent.hex,
                }}
              >
                {selectedProject.category}
              </span>
              {selectedProject.metricBadge && (
                <span className="px-3 py-1 rounded-full bg-zinc-800 text-xs font-mono text-zinc-300 border border-zinc-700">
                  {selectedProject.metricBadge}
                </span>
              )}
              <span className="text-xs font-mono text-zinc-500">
                Year: {selectedProject.year}
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold font-display text-white tracking-tight">
              {selectedProject.title}
            </h2>
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
              {selectedProject.tagline}
            </p>
          </div>

          {/* Main Visual Image Preview */}
          <div className="my-8 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 aspect-video relative group">
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Deep Case Study Information */}
          {caseStudy ? (
            <div className="space-y-8 mt-6">
              {/* Challenge & Solution Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800">
                  <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-rose-400" />
                    <span>The Engineering Challenge</span>
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {caseStudy.challenge}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800">
                  <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" style={{ color: accent.hex }} />
                    <span>The Architectural Solution</span>
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {caseStudy.solution}
                  </p>
                </div>
              </div>

              {/* Quantified Metrics */}
              {caseStudy.metrics && caseStudy.metrics.length > 0 && (
                <div className="p-6 rounded-2xl bg-zinc-950/60 border border-zinc-800/80">
                  <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" style={{ color: accent.hex }} />
                    <span>Key Metrics & Deliverables</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {caseStudy.metrics.map((metric, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs font-medium text-zinc-200">
                        {metric}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Feature Highlights */}
              {caseStudy.features && caseStudy.features.length > 0 && (
                <div className="space-y-3">
                  <div className="text-sm font-semibold text-white font-display">Core Feature Capabilities</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {caseStudy.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-zinc-300">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent.hex }} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Architecture Stack */}
              {caseStudy.architecture && caseStudy.architecture.length > 0 && (
                <div className="space-y-3">
                  <div className="text-sm font-semibold text-white font-display">System Architecture Highlights</div>
                  <div className="space-y-2">
                    {caseStudy.architecture.map((arch, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-300">
                        {arch}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
              <div className="text-sm font-semibold text-white">Project Overview</div>
              <p className="text-sm text-zinc-300 leading-relaxed">{selectedProject.description}</p>
            </div>
          )}

          {/* Tech Stack Chips */}
          <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-wrap gap-2">
            {selectedProject.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-lg bg-zinc-800 text-xs font-mono text-zinc-300 border border-zinc-700"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Bottom Actions */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {selectedProject.demoUrl && (
                <a
                  href={selectedProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl font-semibold text-xs text-zinc-950 flex items-center gap-2 transition-transform hover:-translate-y-0.5"
                  style={{
                    backgroundColor: accent.hex,
                    boxShadow: `0 0 20px ${accent.glow}`,
                  }}
                >
                  <span>Launch Live Site</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl font-medium text-xs text-zinc-300 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 flex items-center gap-2"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>View Repository</span>
                </a>
              )}
            </div>

            <button
              onClick={() => setSelectedProject(null)}
              className="text-xs font-mono text-zinc-400 hover:text-white"
            >
              Back to portfolio
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
