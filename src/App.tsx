/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { useScrollSpy } from './hooks/useScrollSpy';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { CustomizerDrawer } from './components/CustomizerDrawer';
import { CommandPalette } from './components/CommandPalette';

const SECTION_IDS = [
  'hero',
  'about',
  'skills',
  'projects',
  'experience',
  'testimonials',
  'contact',
];

const PortfolioContent: React.FC = () => {
  // Initialize scroll spy for navigation
  useScrollSpy(SECTION_IDS);

  return (
    <div className="relative min-h-screen bg-[#09090b] text-[#f4f4f5] selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Dynamic Contextual Cursor */}
      <CustomCursor />

      {/* Global Navigation */}
      <Navbar />

      {/* Main Single-Page Sections (in strict order) */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Testimonials />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Overlays & Modals */}
      <ProjectModal />
      <ResumeModal />
      <CustomizerDrawer />
      <CommandPalette />
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioContent />
    </PortfolioProvider>
  );
}
