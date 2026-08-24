import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const { profile, accent, setCursorText, resetCursor } = usePortfolio();
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = profile.testimonials;

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section
      id="testimonials"
      aria-label="Peer and Client Testimonials"
      className="py-24 relative overflow-hidden bg-[#09090b]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">05 / ENDORSEMENTS</span>
          <div className="h-[1px] w-12 bg-zinc-800" />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight">
              Words From Collaborators
            </h2>
            <p className="mt-2 text-base text-zinc-400 max-w-xl">
              Perspectives from engineering leads, product directors, and founders I have had the privilege to build with.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              id="testimonial-prev-btn"
              onClick={prevTestimonial}
              onMouseEnter={() => setCursorText('PREV')}
              onMouseLeave={resetCursor}
              aria-label="Previous testimonial"
              className="w-11 h-11 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              id="testimonial-next-btn"
              onClick={nextTestimonial}
              onMouseEnter={() => setCursorText('NEXT')}
              onMouseLeave={resetCursor}
              aria-label="Next testimonial"
              className="w-11 h-11 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Active Testimonial Card */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="p-8 sm:p-12 rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-2xl backdrop-blur-xl relative"
            >
              {/* Giant Quote Icon background */}
              <Quote
                className="absolute top-8 right-8 w-16 h-16 opacity-10 pointer-events-none"
                style={{ color: accent.hex }}
              />

              <div className="space-y-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-current"
                      style={{ color: accent.hex }}
                    />
                  ))}
                </div>

                <blockquote className="text-lg sm:text-2xl text-zinc-100 font-normal leading-relaxed font-display">
                  "{current.quote}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-zinc-800/80">
                  <img
                    src={current.avatar}
                    alt={current.name}
                    referrerPolicy="no-referrer"
                    className="w-13 h-13 rounded-full object-cover border-2 border-zinc-700"
                  />
                  <div>
                    <div className="font-semibold text-white text-base">{current.name}</div>
                    <div className="text-xs font-mono text-zinc-400">
                      {current.role} • {current.company}
                    </div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">{current.relation}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                id={`testimonial-dot-${idx}`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'w-8' : 'w-2 bg-zinc-800'
                }`}
                style={{
                  backgroundColor: currentIndex === idx ? accent.hex : undefined,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
