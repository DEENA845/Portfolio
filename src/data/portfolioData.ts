import { ProfileData, AccentPreset } from '../types';

export const ACCENT_PRESETS: AccentPreset[] = [
  {
    id: 'emerald',
    name: 'Electric Emerald',
    hex: '#10b981',
    rgb: '16, 185, 129',
    glow: 'rgba(16, 185, 129, 0.25)',
    tailwindClass: 'emerald',
  },
  {
    id: 'cyan',
    name: 'Cyber Cyan',
    hex: '#06b6d4',
    rgb: '6, 182, 212',
    glow: 'rgba(6, 182, 212, 0.25)',
    tailwindClass: 'cyan',
  },
  {
    id: 'indigo',
    name: 'Neo Violet',
    hex: '#6366f1',
    rgb: '99, 102, 241',
    glow: 'rgba(99, 102, 241, 0.25)',
    tailwindClass: 'indigo',
  },
  {
    id: 'amber',
    name: 'Solar Amber',
    hex: '#f59e0b',
    rgb: '245, 158, 11',
    glow: 'rgba(245, 158, 11, 0.25)',
    tailwindClass: 'amber',
  },
  {
    id: 'rose',
    name: 'Hyper Rose',
    hex: '#f43f5e',
    rgb: '244, 63, 94',
    glow: 'rgba(244, 63, 94, 0.25)',
    tailwindClass: 'rose',
  },
];

export const INITIAL_PROFILE: ProfileData = {
  name: 'Arun Ramanathan',
  title: 'Creative Frontend Developer & UI Engineer',
  role: 'Frontend Developer',
  tagline: 'I build interfaces that move with purpose.',
  shortBio:
    'Senior Frontend Engineer specializing in micro-interactions, high-performance web applications, and precision design systems. Bridging the divide between expressive creative direction and robust scalable architecture.',
  fullBio: [
    'With over 7 years of engineering experience across high-growth startups and design studios, I obsess over the microscopic details that transform standard web interfaces into fluid, memorable tactile digital experiences.',
    'My philosophy balances uncompromising 60fps rendering performance with human-centered ergonomics, strict accessibility standards, and clean maintainable codebases.',
    'Currently exploring dynamic generative layouts, hardware-accelerated shaders, and high-fidelity real-time canvas instrumentation.'
  ],
  location: 'San Francisco, CA (PST)',
  status: 'Available for Q3/Q4 Projects & Select Full-Time Roles',
  email: 'arun.builds.web@gmail.com',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  twitter: 'https://x.com',
  heroImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
  secondaryImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
  resumeUrl: '#',
  stats: [
    {
      id: 'exp',
      value: 7,
      suffix: '+',
      label: 'Years of Craft',
      description: 'Building high-scale web products'
    },
    {
      id: 'projects',
      value: 48,
      suffix: '+',
      label: 'Shipped Products',
      description: 'From 0 to 1 and enterprise scale'
    },
    {
      id: 'users',
      value: 14,
      suffix: 'M+',
      label: 'Active Users Served',
      description: 'Across global consumer & B2B platforms'
    },
    {
      id: 'performance',
      value: 99,
      suffix: '%',
      label: 'Lighthouse Score',
      description: 'Average Core Web Vitals benchmark'
    }
  ],
  skills: [
    {
      name: 'Frontend Core & Frameworks',
      iconName: 'Code',
      description: 'Modern reactive component architectures, state machines, and micro-frontends.',
      skills: [
        { name: 'TypeScript', level: 96, highlight: true, tag: 'Strict Typing' },
        { name: 'React 19 / Next.js', level: 98, highlight: true, tag: 'RSC & Server Actions' },
        { name: 'Vue 3 / Nuxt', level: 88, highlight: false },
        { name: 'Tailwind CSS v4', level: 95, highlight: true, tag: 'Design Tokens' },
        { name: 'Vite & Webpack', level: 90, highlight: false },
        { name: 'State (Zustand/Redux)', level: 92, highlight: false }
      ]
    },
    {
      name: 'Motion & Creative Tech',
      iconName: 'Sparkles',
      description: 'Choreographed scroll experiences, physics simulations, and tactile feedback.',
      skills: [
        { name: 'GSAP / ScrollTrigger', level: 94, highlight: true, tag: 'Scroll Sync' },
        { name: 'Lenis Inertia Scrolling', level: 96, highlight: true, tag: 'Smooth Motion' },
        { name: 'Framer Motion / Motion', level: 95, highlight: true, tag: 'Layout Springs' },
        { name: 'WebGL / Three.js (Basics)', level: 78, highlight: false },
        { name: 'Canvas 2D Rendering', level: 85, highlight: false },
        { name: 'CSS GPU Animations', level: 98, highlight: true, tag: '60fps Engine' }
      ]
    },
    {
      name: 'Backend, Cloud & APIs',
      iconName: 'Server',
      description: 'Serverless functions, edge routing, caching layers, and database ergonomics.',
      skills: [
        { name: 'Node.js & Express', level: 90, highlight: true, tag: 'REST & APIs' },
        { name: 'GraphQL & Apollo', level: 84, highlight: false },
        { name: 'PostgreSQL & Prisma', level: 86, highlight: false },
        { name: 'Firebase / Supabase', level: 92, highlight: true, tag: 'Realtime' },
        { name: 'Redis Caching', level: 80, highlight: false },
        { name: 'Docker & CI/CD Pipelines', level: 82, highlight: false }
      ]
    },
    {
      name: 'Design Systems & Ergonomics',
      iconName: 'Layout',
      description: 'Tokenized primitives, rigorous WCAG accessibility, and component libraries.',
      skills: [
        { name: 'Figma to Code Pipeline', level: 96, highlight: true, tag: 'Pixel Perfect' },
        { name: 'Design Tokens Architecture', level: 94, highlight: true, tag: 'Scale' },
        { name: 'Radix UI & Headless Primitives', level: 92, highlight: false },
        { name: 'WCAG 2.1 AA Accessibility', level: 95, highlight: true, tag: 'A11y Expert' },
        { name: 'Performance Budgeting', level: 93, highlight: false },
        { name: 'Design System Governance', level: 89, highlight: false }
      ]
    }
  ],
  projects: [
    {
      id: 'lumina-os',
      title: 'Lumina Cloud Workstation',
      tagline: 'A hardware-accelerated real-time collaborative workspace for spatial media teams.',
      description:
        'Engineered an ultra-low-latency web workspace featuring infinite canvas synchronization, WebRTC video overlays, and custom multi-threaded Web Workers for processing 4K timeline previews.',
      category: 'Web App',
      metricBadge: 'Sub-30ms P99 Latency',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
      extraImages: [
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop'
      ],
      tags: ['React 19', 'TypeScript', 'Web Workers', 'WebRTC', 'Tailwind', 'Zustand'],
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: true,
      year: '2025',
      fullCaseStudy: {
        challenge:
          'Creative teams struggled with heavy desktop software that hindered browser-based collaboration and suffered from frame stutter during multi-user timeline scrubbing.',
        solution:
          'Built an offscreen canvas rendering engine coupled with delta-compression WebSocket synchronization, rendering 60fps vector manipulation even on low-spec client hardware.',
        metrics: [
          'Reduced initial load time from 4.2s to 680ms',
          'Achieved 60fps canvas performance with 50,000 simultaneous vector nodes',
          'Scaled to 120,000 daily active creators within 4 months'
        ],
        features: [
          'Infinite spatial canvas with geometric snap guides',
          'Live collaborative cursor tracking and presence rooms',
          'Export pipeline supporting WebM, MP4, and SVG asset bundles',
          'Custom shortcuts engine with accessible screen-reader fallbacks'
        ],
        architecture: [
          'Vite + React 19 Frontend with custom Web Worker pipeline',
          'Canvas 2D context with hardware GPU acceleration matrix',
          'CRDT conflict-free replicated data types for offline-first state',
          'Edge caching on Cloudflare Workers'
        ]
      }
    },
    {
      id: 'pulse-synth',
      title: 'Aura Sound & Wave Synthesizer',
      tagline: 'Interactive browser-based generative ambient synthesizer and visual audio reactive canvas.',
      description:
        'A fluid Web Audio API synthesis instrument and real-time shader visualizer with custom polyphonic oscillators, step sequencers, and MIDI keyboard plug-and-play integration.',
      category: 'Creative Tech',
      metricBadge: 'Web Audio API Native',
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop',
      extraImages: [
        'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop'
      ],
      tags: ['Web Audio API', 'Canvas Shaders', 'TypeScript', 'Motion', 'Tailwind'],
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: true,
      year: '2025',
      fullCaseStudy: {
        challenge:
          'Most audio generation tools online suffer from noticeable input lag, ugly legacy UI, and lack of visual feedback for non-musicians.',
        solution:
          'Developed a tactile, physics-based UI that translates sound frequencies into organic ripple shaders while maintaining zero audio thread blocking.',
        metrics: [
          'Zero-latency Web Audio buffer scheduling under 4ms',
          'Over 350,000 unique audio sessions generated',
          'Featured on Awwwards Site of the Day and Product Hunt #1'
        ],
        features: [
          '16-step polyphonic rhythmic matrix sequencer',
          'Low-pass, High-pass, and Formant resonant filter controls',
          'Interactive physics wave sphere responding to active frequency peaks',
          'Preset sharing with base64 state compression in URL params'
        ],
        architecture: [
          'AudioContext custom nodes with exponential frequency ramp curves',
          'RequestAnimationFrame visualizer loop with decoupled sound clock',
          'Tailwind CSS v4 with glassmorphism shader blend modes'
        ]
      }
    },
    {
      id: 'prism-design-system',
      title: 'Prism Enterprise Design System',
      tagline: 'Production-ready headless component system and token compiler for multi-brand apps.',
      description:
        'Designed and coded an enterprise design system powering 18 web applications, including 65+ accessible WCAG AA compliant components, automated token synchronizer, and interactive documentation sandbox.',
      category: 'Design System',
      metricBadge: '18 Products Unified',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop',
      extraImages: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop'
      ],
      tags: ['Design Tokens', 'Storybook', 'Radix UI', 'Tailwind', 'Figma API'],
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: true,
      year: '2024',
      fullCaseStudy: {
        challenge:
          'A distributed engineering team of 80+ developers suffered from UI inconsistencies, duplicated components, and recurring accessibility regressions across product lines.',
        solution:
          'Created a centralized token architecture using Style Dictionary and Figma API pipelines, producing synchronized React components with automated visual regression tests.',
        metrics: [
          'Cut design-to-production deployment cycles by 62%',
          'Attained 100% automated test coverage across keyboard navigation states',
          'Adopted by 100% of engineering squads across the organization'
        ],
        features: [
          'Headless polymorphic component primitives',
          'Dynamic multi-theme token switcher (Dark, Light, High-Contrast)',
          'Live interactive component playground with copyable TypeScript props',
          'Automated NPM package releases with semantic versioning'
        ],
        architecture: [
          'Monorepo architecture with Turborepo and Changesets',
          'Radix UI accessible primitives wrapped with Tailwind styling engine',
          'Automated CI/CD testing with Playwright and Axe-core'
        ]
      }
    },
    {
      id: 'horizon-finance',
      title: 'Horizon Quantum Analytics',
      tagline: 'Real-time financial derivatives portfolio visualizer with sub-second order book stream.',
      description:
        'Engineered an interactive algorithmic trading terminal with streaming D3 candle charts, customizable grid layouts, and instant transaction scenario modeling.',
      category: 'Web App',
      metricBadge: '+140% Trader Retention',
      image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=1200&auto=format&fit=crop',
      tags: ['Next.js', 'D3.js', 'WebSockets', 'TypeScript', 'Tailwind'],
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: false,
      year: '2024'
    },
    {
      id: 'stride-ai',
      title: 'Stride Autonomous Agent Studio',
      tagline: 'Visual prompt-chaining canvas and execution pipeline for generative workflows.',
      description:
        'Built a visual node graph editor allowing non-technical operators to construct, test, and deploy multi-model AI agent chains with real-time token streaming and execution logs.',
      category: 'AI & Tools',
      metricBadge: 'Node Graph Editor',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
      tags: ['React Flow', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'SSE'],
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: false,
      year: '2024'
    },
    {
      id: 'fluid-motion-kit',
      title: 'Fluid Motion Primitives',
      tagline: 'Lightweight physics-based animation hooks and cursor choreography utilities for React.',
      description:
        'Open source toolkit providing zero-dependency spring physics, scroll-driven text splits, and magnetic hover anchors used by over 8,000 developers worldwide.',
      category: 'Open Source',
      metricBadge: '1.2k+ GitHub Stars',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop',
      tags: ['Open Source', 'NPM Package', 'TypeScript', 'GSAP', 'Lenis'],
      demoUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: false,
      year: '2023'
    }
  ],
  experience: [
    {
      id: 'staff-eng',
      role: 'Staff UI Engineer & Tech Lead',
      company: 'Apex Digital Labs',
      location: 'San Francisco, CA',
      period: '2023 — Present',
      description:
        'Directing frontend architecture, creative engineering, and motion design systems for flagship enterprise and consumer applications.',
      highlights: [
        'Architected a next-generation canvas rendering engine processing millions of daily interaction events with zero UI thread jank.',
        'Mentored a team of 14 frontend engineers across reactive state design, web performance optimization, and motion choreography.',
        'Spearheaded the company-wide migration to Next.js App Router and tokenized design system.'
      ],
      technologies: ['React 19', 'TypeScript', 'Next.js', 'Tailwind CSS', 'GSAP', 'Lenis', 'GraphQL'],
      badge: 'Current Role'
    },
    {
      id: 'senior-frontend',
      role: 'Senior Frontend Developer',
      company: 'Veloce Interactive Studio',
      location: 'New York, NY (Remote)',
      period: '2021 — 2023',
      description:
        'Crafted bespoke scroll-driven web experiences, 3D WebGL interactions, and high-conversion product launch micro-sites for international brands.',
      highlights: [
        'Won 4 Awwwards Site of the Day accolades and 2 FWA recognitions for high-craft narrative web builds.',
        'Engineered custom smooth scroll orchestrators synchronizing complex video scrubs and SVG path morphs.',
        'Delivered 18 custom client projects on schedule with average Lighthouse scores exceeding 96.'
      ],
      technologies: ['TypeScript', 'Vue 3', 'GSAP ScrollTrigger', 'Three.js', 'Tailwind CSS', 'Vite']
    },
    {
      id: 'frontend-eng',
      role: 'Frontend UI/UX Engineer',
      company: 'Krypton Software',
      location: 'Austin, TX',
      period: '2019 — 2021',
      description:
        'Built real-time financial dashboards, custom data visualization components, and accessible design system widgets.',
      highlights: [
        'Migrated legacy monolithic interfaces to modular React component libraries, boosting test coverage to 92%.',
        'Implemented WebSocket-driven live order books and interactive D3 time-series financial charts.'
      ],
      technologies: ['React', 'TypeScript', 'D3.js', 'Redux', 'Styled Components', 'Jest']
    },
    {
      id: 'junior-dev',
      role: 'Junior Web Developer',
      company: 'PixelCraft Agency',
      location: 'Boston, MA',
      period: '2018 — 2019',
      description:
        'Developed responsive client websites, email templates, and interactive landing pages with precision typography and CSS animations.',
      highlights: [
        'Created over 30 custom responsive web layouts ensuring cross-browser parity on legacy and modern viewports.'
      ],
      technologies: ['JavaScript', 'HTML5/CSS3', 'Sass', 'Webpack', 'Node.js']
    }
  ],
  testimonials: [
    {
      id: 't1',
      name: 'Elena Rostova',
      role: 'VP of Product & Design',
      company: 'Apex Digital Labs',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
      quote:
        'Arun possesses that extremely rare intersection of engineering rigor and uncompromising visual taste. He doesn’t just implement designs; he elevates them into living, breathing digital products with incredible attention to micro-interactions and performance.',
      relation: 'Direct Manager at Apex Digital Labs'
    },
    {
      id: 't2',
      name: 'Marcus Vance',
      role: 'Head of Engineering',
      company: 'Veloce Studio',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop',
      quote:
        'Working with Arun on our most complex scroll-driven client builds was a dream. His deep mastery of GSAP, Lenis, and modern browser rendering pipelines meant we never had to compromise between high visual ambition and buttery 60fps frame rates.',
      relation: 'Engineering Lead at Veloce'
    },
    {
      id: 't3',
      name: 'Sophia Chen',
      role: 'Founder & CEO',
      company: 'Aura Sound Labs',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
      quote:
        'Arun brought our generative synthesizer from a napkin sketch to a viral web sensation in record time. His intuition for user ergonomics, sound-reactive animations, and clean modular code is second to none.',
      relation: 'Client & Startup Founder'
    }
  ]
};
