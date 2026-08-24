import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  X, 
  Download, 
  Printer, 
  FileText, 
  Mail, 
  Globe, 
  MapPin, 
  CheckCircle2, 
  ExternalLink,
  Sparkles
} from 'lucide-react';

export const ResumeModal: React.FC = () => {
  const { isResumeOpen, setIsResumeOpen, profile, accent, setCursorText, resetCursor } = usePortfolio();

  if (!isResumeOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Generate a downloadable text/markdown or trigger simulated print-to-pdf
    const resumeText = `
# ${profile.name}
${profile.title}
Email: ${profile.email} | Location: ${profile.location}

## Summary
${profile.shortBio}

## Experience
${profile.experience
  .map(
    (exp) => `
### ${exp.role} — ${exp.company} (${exp.period})
Location: ${exp.location}
${exp.description}
Highlights:
${exp.highlights.map((h) => `- ${h}`).join('\n')}
Technologies: ${exp.technologies.join(', ')}
`
  )
  .join('\n')}

## Skills
${profile.skills.map((cat) => `### ${cat.name}\n${cat.skills.map((s) => s.name).join(', ')}`).join('\n\n')}
    `.trim();

    const blob = new Blob([resumeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${profile.name.replace(/\s+/g, '_')}_Resume.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      <div
        id="resume-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 overflow-y-auto bg-black/80 backdrop-blur-xl"
        onClick={() => setIsResumeOpen(false)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-zinc-900 border border-zinc-700/80 shadow-2xl text-zinc-100 p-6 sm:p-8 md:p-12 custom-scrollbar"
        >
          {/* Header Action Bar */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-zinc-950"
                style={{ backgroundColor: accent.hex }}
              >
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white font-display">Curriculum Vitae</h2>
                <p className="text-xs font-mono text-zinc-400">ATS Optimized Preview</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="resume-print-btn"
                onClick={handlePrint}
                onMouseEnter={() => setCursorText('PRINT')}
                onMouseLeave={resetCursor}
                className="p-2 sm:px-3.5 sm:py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-200 flex items-center gap-1.5 border border-zinc-700 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Print</span>
              </button>

              <button
                id="resume-download-btn"
                onClick={handleDownload}
                onMouseEnter={() => setCursorText('DOWNLOAD')}
                onMouseLeave={resetCursor}
                className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold text-zinc-950 flex items-center gap-1.5 transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: accent.hex }}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download CV</span>
              </button>

              <button
                id="close-resume-modal-btn"
                onClick={() => setIsResumeOpen(false)}
                onMouseEnter={() => setCursorText('CLOSE')}
                onMouseLeave={resetCursor}
                className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white ml-2 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Printable Resume Sheet Container */}
          <div className="space-y-8 bg-zinc-950/80 p-6 sm:p-8 rounded-2xl border border-zinc-800 font-sans">
            {/* Header / Contact Details */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white font-display">{profile.name}</h1>
                <p className="text-sm font-semibold text-zinc-300 mt-0.5" style={{ color: accent.hex }}>
                  {profile.title}
                </p>
              </div>

              <div className="text-xs font-mono text-zinc-400 space-y-1 text-left sm:text-right">
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{profile.location}</span>
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
                Professional Summary
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {profile.shortBio}
              </p>
            </div>

            {/* Experience Section */}
            <div className="space-y-6">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
                Work Experience
              </h3>

              <div className="space-y-6">
                {profile.experience.map((exp) => (
                  <div key={exp.id} className="space-y-2 text-xs sm:text-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div className="font-bold text-white">
                        {exp.role} <span className="font-normal text-zinc-400">at</span> {exp.company}
                      </div>
                      <span className="text-xs font-mono text-zinc-400">{exp.period}</span>
                    </div>

                    <p className="text-zinc-300 text-xs leading-relaxed">{exp.description}</p>

                    <ul className="list-disc list-inside space-y-1 text-xs text-zinc-400 pl-1">
                      {exp.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>

                    <div className="pt-1 flex flex-wrap gap-1">
                      {exp.technologies.map((t) => (
                        <span key={t} className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] font-mono text-zinc-400">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Skills Overview */}
            <div className="space-y-4 pt-4 border-t border-zinc-800">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
                Core Proficiencies
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {profile.skills.map((group) => (
                  <div key={group.name} className="space-y-1">
                    <div className="font-semibold text-zinc-200">{group.name}</div>
                    <div className="text-zinc-400 text-xs">
                      {group.skills.map((s) => s.name).join(' • ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Accolades */}
            <div className="space-y-2 pt-4 border-t border-zinc-800 text-xs">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
                Education & Accolades
              </h3>
              <div className="flex justify-between items-center text-zinc-300">
                <span>B.S. in Computer Science & Interactive Media</span>
                <span className="font-mono text-zinc-500">Honors Graduate</span>
              </div>
              <p className="text-zinc-400 text-[11px]">
                4x Awwwards Site of the Day, 2x FWA Recognition, Speaker at React Summit.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
