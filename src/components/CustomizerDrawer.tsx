import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { ACCENT_PRESETS } from '../data/portfolioData';
import { 
  X, 
  Sliders, 
  RotateCcw, 
  Upload, 
  Palette, 
  Sparkles, 
  User, 
  Mail, 
  Link2, 
  Check, 
  Eye 
} from 'lucide-react';

export const CustomizerDrawer: React.FC = () => {
  const {
    isCustomizerOpen,
    setIsCustomizerOpen,
    profile,
    updateProfile,
    resetProfile,
    accent,
    setAccent,
    reducedMotion,
    toggleReducedMotion,
    setCursorText,
    resetCursor,
  } = usePortfolio();

  const [formValues, setFormValues] = useState({
    name: profile.name,
    title: profile.title,
    role: profile.role,
    tagline: profile.tagline,
    shortBio: profile.shortBio,
    email: profile.email,
    github: profile.github,
    linkedin: profile.linkedin,
    twitter: profile.twitter,
    heroImage: profile.heroImage,
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isCustomizerOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setFormValues((prev) => ({ ...prev, heroImage: result }));
        updateProfile({ heroImage: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formValues);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleReset = () => {
    resetProfile();
    setFormValues({
      name: 'Arun Ramanathan',
      title: 'Creative Frontend Developer & UI Engineer',
      role: 'Frontend Developer',
      tagline: 'I build interfaces that move with purpose.',
      shortBio:
        'Senior Frontend Engineer specializing in micro-interactions, high-performance web applications, and precision design systems. Bridging the divide between expressive creative direction and robust scalable architecture.',
      email: 'arun.builds.web@gmail.com',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://x.com',
      heroImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
    });
  };

  return (
    <AnimatePresence>
      <div
        id="customizer-backdrop"
        className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-md"
        onClick={() => setIsCustomizerOpen(false)}
      >
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg h-full bg-zinc-900 border-l border-zinc-800 shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto text-zinc-100 custom-scrollbar"
        >
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2.5">
                <Sliders className="w-5 h-5" style={{ color: accent.hex }} />
                <div>
                  <h2 className="text-lg font-bold font-display text-white">Live Portfolio Editor</h2>
                  <p className="text-xs font-mono text-zinc-400">Personalize with your content</p>
                </div>
              </div>

              <button
                onClick={() => setIsCustomizerOpen(false)}
                className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSave} className="space-y-6 mt-6">
              {/* Accent Color Picker */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5" />
                  <span>Accent Color Theme</span>
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {ACCENT_PRESETS.map((p) => (
                    <button
                      type="button"
                      key={p.id}
                      onClick={() => setAccent(p)}
                      className={`h-9 rounded-xl flex items-center justify-center transition-all ${
                        accent.id === p.id
                          ? 'ring-2 ring-white scale-105 shadow-md'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: p.hex }}
                      title={p.name}
                    >
                      {accent.id === p.id && <Check className="w-4 h-4 text-zinc-950 stroke-[3]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Photo Upload & Preview */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span>Hero Headshot / Photo</span>
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-700 flex-shrink-0">
                    <img
                      src={formValues.heroImage}
                      alt="Headshot Preview"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={formValues.heroImage}
                      onChange={(e) => {
                        setFormValues({ ...formValues, heroImage: e.target.value });
                        updateProfile({ heroImage: e.target.value });
                      }}
                      placeholder="Image URL..."
                      className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-mono text-white focus:outline-none"
                    />
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-300 cursor-pointer transition-colors">
                      <Upload className="w-3 h-3" />
                      <span>Upload Local Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Name & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400">Full Name</label>
                  <input
                    type="text"
                    value={formValues.name}
                    onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400">Role Title</label>
                  <input
                    type="text"
                    value={formValues.role}
                    onChange={(e) => setFormValues({ ...formValues, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Tagline */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-400">Hero Tagline</label>
                <input
                  type="text"
                  value={formValues.tagline}
                  onChange={(e) => setFormValues({ ...formValues, tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white focus:outline-none"
                />
              </div>

              {/* Short Bio */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-400">Short Bio</label>
                <textarea
                  rows={3}
                  value={formValues.shortBio}
                  onChange={(e) => setFormValues({ ...formValues, shortBio: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs sm:text-sm text-white focus:outline-none resize-none"
                />
              </div>

              {/* Email & GitHub */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400">Email Address</label>
                  <input
                    type="email"
                    value={formValues.email}
                    onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400">GitHub Link</label>
                  <input
                    type="text"
                    value={formValues.github}
                    onChange={(e) => setFormValues({ ...formValues, github: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Accessibility / Motion Settings */}
              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-white">Reduced Motion Mode</div>
                  <div className="text-[11px] text-zinc-400">Disables 3D tilt & high inertia</div>
                </div>
                <button
                  type="button"
                  onClick={toggleReducedMotion}
                  className={`w-11 h-6 rounded-full transition-colors relative ${
                    reducedMotion ? 'bg-emerald-500' : 'bg-zinc-800'
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                      reducedMotion ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl font-bold text-xs text-zinc-950 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
                  style={{ backgroundColor: accent.hex }}
                >
                  {savedSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Saved!</span>
                    </>
                  ) : (
                    <span>Apply Changes</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="p-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                  title="Reset to default Arun profile"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
