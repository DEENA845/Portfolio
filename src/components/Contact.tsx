import React, { useState } from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import confetti from 'canvas-confetti';
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  Github, 
  Linkedin, 
  Twitter, 
  FileText, 
  Sparkles,
  MessageSquare,
  Clock
} from 'lucide-react';

export const Contact: React.FC = () => {
  const { profile, accent, setIsResumeOpen, setCursorText, resetCursor } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Web Application',
    message: '',
  });

  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(profile.email);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormError('Please fill out all required fields.');
      return;
    }

    setFormError('');
    setIsSubmitting(true);

    // Simulate reliable transmission and trigger confetti
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: [accent.hex, '#ffffff', '#a1a1aa'],
        });
      } catch {
        // fallback
      }
    }, 900);
  };

  return (
    <section
      id="contact"
      aria-label="Contact and Inquiries"
      className="py-28 relative overflow-hidden bg-[#09090b] border-t border-zinc-900"
    >
      {/* Background glow */}
      <div 
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[160px] opacity-20 pointer-events-none"
        style={{ backgroundColor: accent.hex }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">06 / GET IN TOUCH</span>
          <div className="h-[1px] w-12 bg-zinc-800" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Big Headline & Direct Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white tracking-tight leading-[1.08]">
                Let's build something{' '}
                <span style={{ color: accent.hex }}>extraordinary</span>.
              </h2>
              <p className="mt-4 text-base text-zinc-400 leading-relaxed font-normal">
                Whether you have an upcoming project, a challenging engineering problem, or simply want to say hello — my inbox is always open.
              </p>
            </div>

            {/* Quick Copy Email Card */}
            <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3">
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider flex items-center justify-between">
                <span>Direct Email Contact</span>
                <span className="text-emerald-400 font-medium">Fast Response</span>
              </div>

              <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Mail className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                  <span className="text-sm font-mono text-zinc-200 truncate">{profile.email}</span>
                </div>
                <button
                  id="copy-email-btn"
                  onClick={copyEmailToClipboard}
                  onMouseEnter={() => setCursorText(isCopied ? 'COPIED!' : 'COPY')}
                  onMouseLeave={resetCursor}
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-white flex items-center gap-1.5 transition-colors flex-shrink-0"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Direct Social & Asset Links */}
            <div className="space-y-3">
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Connect Across Platforms</div>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setCursorText('GITHUB')}
                  onMouseLeave={resetCursor}
                  className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white flex items-center gap-2 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>

                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setCursorText('LINKEDIN')}
                  onMouseLeave={resetCursor}
                  className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white flex items-center gap-2 transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-blue-400" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={profile.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setCursorText('TWITTER')}
                  onMouseLeave={resetCursor}
                  className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white flex items-center gap-2 transition-colors"
                >
                  <Twitter className="w-4 h-4 text-sky-400" />
                  <span>Twitter / X</span>
                </a>

                <button
                  id="contact-resume-btn"
                  onClick={() => setIsResumeOpen(true)}
                  onMouseEnter={() => setCursorText('RESUME')}
                  onMouseLeave={resetCursor}
                  className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white flex items-center gap-2 transition-colors"
                >
                  <FileText className="w-4 h-4" style={{ color: accent.hex }} />
                  <span>Resume / CV</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-zinc-900/70 border border-zinc-800 shadow-2xl backdrop-blur-xl">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div 
                    className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center shadow-lg"
                    style={{
                      backgroundColor: `${accent.hex}20`,
                      color: accent.hex,
                    }}
                  >
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-display text-white">Message Transmitted</h3>
                  <p className="text-sm text-zinc-400 max-w-md mx-auto">
                    Thank you for reaching out, <span className="text-white font-medium">{formData.name}</span>. I have received your note and will reply promptly to <span className="text-white font-medium">{formData.email}</span>.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', projectType: 'Web Application', message: '' });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-200"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold font-display text-white">Send a Direct Message</h3>
                    <p className="text-xs text-zinc-400 mt-1">Fill in the parameters below for immediate routing.</p>
                  </div>

                  {formError && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 font-mono">
                      {formError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className="text-xs font-mono text-zinc-400">
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                        style={{
                          borderColor: formData.name ? `${accent.hex}60` : undefined,
                        }}
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="contact-email" className="text-xs font-mono text-zinc-400">
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                        style={{
                          borderColor: formData.email ? `${accent.hex}60` : undefined,
                        }}
                      />
                    </div>
                  </div>

                  {/* Project Type */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-zinc-400">
                      Topic / Project Type
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['Web Application', 'Design System', 'Freelance / Contract', 'Full-time Role'].map((type) => {
                        const isSelected = formData.projectType === type;
                        return (
                          <button
                            type="button"
                            key={type}
                            onClick={() => setFormData({ ...formData, projectType: type })}
                            className={`px-3 py-2 rounded-xl text-xs font-mono transition-all text-center ${
                              isSelected
                                ? 'bg-zinc-800 text-white border font-medium'
                                : 'bg-zinc-950 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
                            }`}
                            style={{
                              borderColor: isSelected ? accent.hex : undefined,
                            }}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="text-xs font-mono text-zinc-400">
                      Your Message *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your project goals, timeline, and scope..."
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                      style={{
                        borderColor: formData.message ? `${accent.hex}60` : undefined,
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    id="submit-contact-form-btn"
                    type="submit"
                    disabled={isSubmitting}
                    onMouseEnter={() => setCursorText('SEND')}
                    onMouseLeave={resetCursor}
                    className="w-full py-4 rounded-xl font-bold text-sm text-zinc-950 flex items-center justify-center gap-2 transition-transform transform hover:-translate-y-0.5 disabled:opacity-50"
                    style={{
                      backgroundColor: accent.hex,
                      boxShadow: `0 0 25px ${accent.glow}`,
                    }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                        <span>Sending message...</span>
                      </span>
                    ) : (
                      <>
                        <span>Transmit Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
