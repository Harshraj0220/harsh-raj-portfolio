import React from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';

const { useState, useEffect, useRef, useCallback } = React;
const e = React.createElement;
const m = (tag, props, ...children) => e(motion[tag] || motion.div, props, ...children);

// ════════════════════════════════════════════════
// DATA
// ════════════════════════════════════════════════

const SOCIAL_LINKS = [
  { name: 'GitHub', url: 'https://github.com/Harshraj0220', icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/harsh-raj20/', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
  { name: 'Instagram', url: 'https://www.instagram.com/harshraj__2002/', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
  { name: 'LeetCode', url: 'https://leetcode.com/u/eGpHeoy8LH/', icon: 'M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z' },
];

const SKILLS = {
  'Languages': ['Python', 'SQL', 'JavaScript', 'Java', 'C++', 'HTML/CSS'],
  'Libraries & Frameworks': ['Pandas', 'NumPy', 'Scikit-Learn', 'TensorFlow', 'React', 'Flask', 'Matplotlib'],
  'Tools & Platforms': ['MySQL', 'PostgreSQL', 'Git', 'Docker', 'AWS', 'Jupyter', 'Linux'],
  'Soft Skills': ['Problem Solving', 'Team Leadership', 'Communication', 'Critical Thinking'],
};

const PROJECTS = [
  {
    title: 'Real-time Process Monitoring Dashboard',
    date: "Apr' 24",
    description: 'Developed a real-time system monitoring web application displaying CPU and memory utilization metrics with dynamic graphs and an auto-refreshing process table supporting search and filtering.',
    tech: ['Python', 'psutil', 'Flask', 'JavaScript', 'Chart.js', 'System Monitoring'],
    github: 'https://github.com/Harshraj0220/Real-time-Process-Monitoring-Dashboard',
    image: 'Projects/Real time process monitoring dashboard/Pic 1.jpg'
  },
  {
    title: 'Wind Tunnel Data Visualizer',
    date: "Feb' 25",
    description: 'Designed and demonstrated a wind flow visualization system to analyze real-time airflow over a vehicle body, identifying turbulence and drag-prone regions impacting aerodynamic efficiency, top speed, and acceleration.',
    tech: ['Aerodynamics', 'Flow Visualization', 'Prototyping'],
    github: '',
    googleDrive: 'https://drive.google.com/drive/folders/1-pxN-AjQioYBVGGYgV112p6KNnKWhwI6?usp=drive_link',
    video: 'Projects/Wind tunnel data visualizer/WhatsApp Video 2026-03-22 at 10.31.34 PM.mp4'
  },
  {
    title: 'AI Creative Writing Coach',
    date: "Apr' 25",
    description: 'Developed an AI-powered writing assistant using NLP to generate writing prompts, deliver contextual feedback, improve story structure, and enhance user creativity through an interactive chat interface.',
    tech: ['Python', 'Flask', 'NLP/LLMs', 'JavaScript', 'REST APIs'],
    github: 'https://github.com/Harshraj0220/Ai-Creative-Writing-Coach',
    image: 'Projects/AI creative writing coach/Screenshot 2026-03-22 221456.png'
  }
];

const TRAININGS = [
  {
    title: 'CPP with Object Oriented Programming',
    company: 'CipherSchools',
    date: "Jun' 25 – Jul' 25",
    description: 'Data Science using CPP: Conducted exploratory data analysis and feature engineering with Pandas and NumPy, significantly reducing data preprocessing time. Developed and evaluated multiple Machine Learning models—including Linear Regression, KNN, SVM, Decision Trees, and K-Means via Scikit-learn—achieving a 15% average accuracy improvement.'
  }
];

const TIMELINE = [
  { type: 'Education', title: 'Bachelor of Technology - CSE (CGPA: 7.45)', org: 'Lovely Professional University, Phagwara', date: 'Aug’ 23 – Present' },
  { type: 'Training', title: 'CPP with OOPs Summer Training', org: 'CipherSchools', date: "Jun' 25 – Jul' 25" },
  { type: 'Education', title: 'Intermediate - PCM (78%)', org: 'DAV Public School, Patna', date: 'Aug’ 20 – Jul’ 22' },
  { type: 'Education', title: 'Matriculation (88%)', org: 'Christ Church Diocesan School, Patna', date: 'Feb’ 19 – Jul’ 20' },
];

const CERTIFICATIONS = [
  { title: 'CPP with OOPs Programming Language', issuer: 'CipherSchools', date: 'Jul 2025', file: 'Certificates/Screenshot 2026-03-22 215240.png' },
  { title: 'IELTS Pro', issuer: 'Udemy', date: 'Nov 2024', file: 'Certificates/Screenshot 2026-03-22 215308.png' },
  { title: 'Business Management - Basic to Advanced', issuer: 'Udemy', date: 'Oct 2023', file: 'Certificates/Screenshot 2026-03-22 215329.png' },
  { title: 'Build Generative AI Apps with No-Code', issuer: 'Udemy', date: 'Aug 2025', file: 'Certificates/Screenshot 2026-03-22 215347.png' },
  { title: 'Computational Theory', issuer: 'Infosys Springboard', date: 'Jul 2025', file: 'Certificates/Screenshot 2026-03-22 215645.png' },
  { title: 'Master Generative AI & tools', issuer: 'Infosys Springboard', date: 'Aug 2025', file: 'Certificates/Screenshot 2026-03-22 215703.png' },
];

const MARQUEE_WORDS = ['DATA ENGINEERING', 'MACHINE LEARNING', 'PYTHON', 'SQL', 'ETL PIPELINES', 'ANALYTICS', 'CLOUD', 'AI', 'BIG DATA', 'VISUALIZATION'];

// ════════════════════════════════════════════════
// HOOKS
// ════════════════════════════════════════════════

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  return y;
}

function useInViewOnce(ref, threshold = 0.2) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

function AnimatedCounter({ target }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const inView = useInViewOnce(ref);
  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const startTime = Date.now();
    const step = () => {
      const progress = Math.min((Date.now() - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);
  return e('span', { ref }, count);
}

// ════════════════════════════════════════════════
// ANIMATION VARIANTS
// ════════════════════════════════════════════════

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

// ════════════════════════════════════════════════
// SVG ICON
// ════════════════════════════════════════════════

function SvgIcon({ path, size = 20 }) {
  return e('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'currentColor' }, e('path', { d: path }));
}

const DownloadIcon = () => e('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
  e('path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' }),
  e('polyline', { points: '7 10 12 15 17 10' }),
  e('line', { x1: '12', y1: '15', x2: '12', y2: '3' })
);

// ════════════════════════════════════════════════
// NAVBAR
// ════════════════════════════════════════════════

function NavBar() {
  const scrollY = useScrollY();
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = scrollY > 60;

  const links = ['About', 'Projects', 'Training', 'Timeline', 'Certificates', 'Contact'];

  return e(React.Fragment, null,
    e('nav', { className: `navbar ${scrolled ? 'scrolled' : ''}` },
      e('a', { href: '#', className: 'nav-logo' }, 'HARSH RAJ'),
      e('ul', { className: 'nav-links' },
        ...links.map(l => e('li', { key: l }, e('a', { href: `#${l.toLowerCase()}` }, l)))
      ),
      e('button', {
        className: 'hamburger',
        onClick: () => setMenuOpen(!menuOpen),
        'aria-label': 'Menu',
      },
        e('span', { style: menuOpen ? { transform: 'rotate(45deg) translate(5px, 5px)' } : {} }),
        e('span', { style: menuOpen ? { opacity: 0 } : {} }),
        e('span', { style: menuOpen ? { transform: 'rotate(-45deg) translate(5px, -5px)' } : {} }),
      ),
    ),
    e('div', { className: `mobile-menu ${menuOpen ? 'open' : ''}` },
      ...links.map(l => e('a', {
        key: l,
        href: `#${l.toLowerCase()}`,
        onClick: () => setMenuOpen(false),
      }, l)),
    ),
  );
}

// ════════════════════════════════════════════════
// HERO
// ════════════════════════════════════════════════

function Hero() {
  const [showResumeModal, setShowResumeModal] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') setShowResumeModal(false); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return e(React.Fragment, null,
    e(motion.section, {
      className: 'hero',
      initial: 'hidden',
      animate: 'visible',
      variants: stagger,
    },
    e('div', { className: 'container w-full' },
      e('div', { className: 'hero-grid' },
        e('div', { style: { display: 'flex', flexDirection: 'column', justifyContent: 'center' } },
          m('div', { variants: fadeUp },
            e('h1', { className: 'hero-slogan' }, 'HARSH RAJ')
          ),
          m('div', { variants: fadeUp },
            e('p', { className: 'hero-sub' }, 'DATA ENGINEER')
          ),
          m('div', { variants: fadeUp, className: 'hero-socials', style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '16px' } },
            e('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '12px' } },
              ...SOCIAL_LINKS.map(link =>
                e('a', {
                  key: link.name,
                  href: link.url,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  className: 'social-btn',
                  title: link.name,
                }, e(SvgIcon, { path: link.icon, size: 18 })),
              )
            ),
            e('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' } },
              e('a', { href: '#contact', className: 'work-btn' }, 'Work with me'),
              e('div', { className: 'download-wrapper' },
                e('button', { 
                  onClick: (e) => { e.preventDefault(); setShowResumeModal(true); },
                  className: 'download-btn', 
                  'aria-label': 'View Resume' 
                },
                  e(DownloadIcon, null),
                  e('span', { className: 'download-text' }, 'RESUME')
                )
              )
            )
          ),
        ),
        m('div', { variants: fadeUp, className: 'hero-right' },
          e('div', { className: 'floating-icon icon-1' }, '☁️'),
          e('div', { className: 'floating-icon icon-2' }, '📊'),
          e('div', { className: 'floating-icon icon-3' }, '🐍'),
          e('div', { className: 'floating-icon icon-4' }, '⚙️'),
          e('div', { className: 'info-card' },
            e('p', { className: 'info-card-text' },
              '3rd-year ',
              e('span', { className: 'highlight' }, 'B.Tech CSE (Data Science)'),
              ' student — building scalable, insight-driven products at the intersection of data engineering and fintech.'
            )
          )
        ),
      ),
    ),
    ),
    // Resume Peek Modal
    e(AnimatePresence, null,
      showResumeModal && e(motion.div, {
        key: 'resume-modal-overlay',
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        style: {
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px'
        },
        onClick: () => setShowResumeModal(false)
      },
        e('button', {
          style: {
            position: 'absolute', top: '24px', right: '32px',
            background: 'none', border: 'none', color: 'white', fontSize: '2.5rem', 
            cursor: 'pointer', fontFamily: 'var(--font-display)', lineHeight: 1
          },
          onClick: () => setShowResumeModal(false)
        }, '×'),
        e(motion.div, {
          key: 'resume-modal-content',
          initial: { scale: 0.95, opacity: 0, y: 20 },
          animate: { scale: 1, opacity: 1, y: 0 },
          exit: { scale: 0.95, opacity: 0, y: 20 },
          transition: { type: 'spring', damping: 25, stiffness: 300 },
          style: {
            width: '100%', maxWidth: '800px', height: '90vh', 
            background: 'var(--dark-2)', border: '2px solid var(--gold)',
            boxShadow: '12px 12px 0 #000', display: 'flex', flexDirection: 'column'
          },
          onClick: (e) => e.stopPropagation()
        },
          e('div', { style: { padding: '16px 24px', borderBottom: '2px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            e('h3', { style: { fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--white)', textTransform: 'uppercase' } }, 'RESUME'),
            e('div', { style: { display: 'flex', gap: '16px', alignItems: 'center' } },
              e('a', {
                href: 'Resume/Harsh Raj_resume.jpg', 
                download: 'Harsh_Raj_Resume.jpg',
                style: {
                  background: 'var(--gold)', color: 'var(--dark)', padding: '6px 12px',
                  fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 'bold',
                  textDecoration: 'none', border: '2px solid #000', boxShadow: '2px 2px 0 #000'
                }
              }, 'DOWNLOAD ⬇'),
              e('button', {
                style: {
                  background: 'none', border: 'none', color: 'var(--grey)', fontSize: '1.5rem', 
                  cursor: 'pointer', fontFamily: 'var(--font-body)', lineHeight: 1
                },
                onClick: () => setShowResumeModal(false),
                'aria-label': 'Close'
              }, 'ESC')
            )
          ),
          e('div', { 
            style: { 
              flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', 
              alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
            } 
          },
            e('img', {
              src: 'Resume/Harsh Raj_resume.jpg',
              alt: 'Harsh Raj Resume',
              style: { 
                maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '4px'
              }
            })
          )
        )
      )
    )
  );
}

// ════════════════════════════════════════════════
// MARQUEE
// ════════════════════════════════════════════════

function Marquee({ reverse = false, dark = false }) {
  const items = [...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS];
  return e('div', { className: `marquee-wrap ${dark ? 'dark-marquee' : ''}` },
    e('div', { className: `marquee-track ${reverse ? 'reverse' : ''}` },
      ...items.map((word, i) =>
        e('span', { key: i, className: 'marquee-item' },
          word,
          e('span', { className: 'marquee-dot' }),
        ),
      ),
    ),
  );
}

// ════════════════════════════════════════════════
// ABOUT SECTION
// ════════════════════════════════════════════════

function AboutSection() {
  return e(motion.section, {
    id: 'about',
    className: 'section about',
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: true, margin: '-80px' },
    variants: stagger,
  },
    e('div', { className: 'container' },
      m('div', { variants: fadeUp, className: 'section-title' },
        e('span', { className: 'num' }, '01'),
        'ABOUT ME',
      ),
      // Stats
      m('div', { variants: fadeUp, className: 'stats-grid' },
        ...[
          { num: 3, suffix: '+', label: 'YEARS CODING' },
          { num: PROJECTS.length, suffix: '+', label: 'PROJECTS BUILT' },
          { num: CERTIFICATIONS.length, suffix: '', label: 'CERTIFICATIONS' },
        ].map((s, i) =>
          e('div', { key: i, className: 'stat-card' },
            e('div', { className: 'stat-number' },
              e(AnimatedCounter, { target: s.num }),
              s.suffix,
            ),
            e('div', { className: 'stat-label' }, s.label),
          ),
        ),
      ),
      // Skills
      m('div', { variants: fadeUp, className: 'skills-grid' },
        ...Object.entries(SKILLS).map(([category, skills]) =>
          e('div', { key: category, className: 'skill-group' },
            e('div', { className: 'skill-group-title' }, category),
            e('div', { className: 'skill-tags' },
              ...skills.map(skill =>
                e('span', { key: skill, className: 'skill-tag' }, skill),
              ),
            ),
          ),
        ),
      ),
    ),
  );
}

// ════════════════════════════════════════════════
// PROJECTS
// ════════════════════════════════════════════════

function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);

  // Handle escape key for project modal
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') setSelectedProject(null); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return e(motion.section, {
    id: 'projects',
    className: 'section projects',
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: true, margin: '-80px' },
    variants: stagger,
  },
    e('div', { className: 'container' },
      m('div', { variants: fadeUp, className: 'section-title' },
        e('span', { className: 'num' }, '02'),
        'PROJECTS',
      ),
      ...PROJECTS.map((proj, idx) =>
        m('div', {
          key: idx,
          variants: fadeUp,
          className: 'project-card',
        },
          e('div', { className: 'project-num' }, String(idx + 1).padStart(2, '0')),
          e('div', null,
            e('div', { style: { display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' } },
              e('h3', { className: 'project-title', style: { margin: 0 } }, proj.title),
              e('span', { style: { color: 'var(--grey)', fontSize: '0.9rem', fontFamily: 'var(--font-body)', fontWeight: 'bold' } }, proj.date)
            ),
            e('p', { className: 'project-desc' }, proj.description),
            e('div', { className: 'project-tags' },
              ...proj.tech.map(t => e('span', { key: t, className: 'project-tag' }, t)),
            ),
          ),
          e('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-end', justifyContent: 'center' } },
            e('button', {
              onClick: (e) => { e.preventDefault(); setSelectedProject(proj); },
              style: { 
                cursor: 'pointer', background: 'none', border: '2px solid var(--gold)', 
                color: 'var(--gold)', padding: '8px 16px', textTransform: 'uppercase', 
                fontWeight: 'bold', fontSize: '0.8rem', fontFamily: 'var(--font-body)', width: '120px' 
              }
            }, 'PEEK 👁'),
            proj.github ? e('a', {
              href: proj.github, target: '_blank', rel: 'noopener noreferrer',
              style: { 
                display: 'inline-block', textAlign: 'center', background: 'var(--gold)', 
                color: 'var(--dark)', border: '2px solid #000', padding: '8px 16px', 
                textTransform: 'uppercase', textDecoration: 'none', fontWeight: 'bold', 
                fontSize: '0.8rem', fontFamily: 'var(--font-body)', width: '120px' 
              }
            }, 'GITHUB ↗') : null,
            proj.googleDrive ? e('a', {
              href: proj.googleDrive, target: '_blank', rel: 'noopener noreferrer',
              style: { 
                display: 'inline-block', textAlign: 'center', background: 'var(--gold)', 
                color: 'var(--dark)', border: '2px solid #000', padding: '8px 16px', 
                textTransform: 'uppercase', textDecoration: 'none', fontWeight: 'bold', 
                fontSize: '0.8rem', fontFamily: 'var(--font-body)', width: '120px' 
              }
            }, 'DRIVE ↗') : null
          ),
        ),
      ),
    ),
    
    // Image Viewer Modal for Peak
    e(AnimatePresence, null,
      selectedProject && e(motion.div, {
        key: 'project-modal-overlay',
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        style: {
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px'
        },
        onClick: () => setSelectedProject(null)
      },
        e('button', {
          style: {
            position: 'absolute', top: '24px', right: '32px',
            background: 'none', border: 'none', color: 'white', fontSize: '2.5rem', 
            cursor: 'pointer', fontFamily: 'var(--font-display)', lineHeight: 1
          },
          onClick: () => setSelectedProject(null)
        }, '×'),
        e(motion.div, {
          key: 'project-modal-content',
          initial: { scale: 0.95, opacity: 0, y: 20 },
          animate: { scale: 1, opacity: 1, y: 0 },
          exit: { scale: 0.95, opacity: 0, y: 20 },
          transition: { type: 'spring', damping: 25, stiffness: 300 },
          style: {
            width: '100%', maxWidth: '1000px', height: '85vh', 
            background: 'var(--dark-2)', border: '2px solid #000',
            boxShadow: '12px 12px 0 var(--gold)', display: 'flex', flexDirection: 'column'
          },
          onClick: (e) => e.stopPropagation()
        },
          e('div', { style: { padding: '16px 24px', borderBottom: '2px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            e('h3', { style: { fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--white)', textTransform: 'uppercase' } }, selectedProject.title),
            e('button', {
              style: {
                background: 'none', border: 'none', color: 'var(--grey)', fontSize: '1.5rem', 
                cursor: 'pointer', fontFamily: 'var(--font-body)', lineHeight: 1
              },
              onClick: () => setSelectedProject(null),
              'aria-label': 'Close'
            }, 'ESC')
          ),
          e('div', { 
            style: { 
              flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', 
              alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
            } 
          },
            selectedProject.video ? 
              e('video', {
                src: selectedProject.video,
                controls: true,
                autoPlay: true,
                style: { maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '4px', outline: 'none' }
              })
            : 
              e('img', {
                src: selectedProject.image,
                alt: selectedProject.title,
                style: { 
                  maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '4px'
                }
              })
          )
        )
      )
    )
  );
}

// ════════════════════════════════════════════════
// TRAINING
// ════════════════════════════════════════════════

function TrainingSection() {
  return e(motion.section, {
    id: 'training',
    className: 'section training',
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: true, margin: '-80px' },
    variants: stagger,
  },
    e('div', { className: 'container' },
      m('div', { variants: fadeUp, className: 'section-title' },
        e('span', { className: 'num' }, '03'),
        'TRAINING',
      ),
      ...TRAININGS.map((train, idx) =>
        m('div', {
          key: idx,
          variants: fadeUp,
          className: 'project-card',
          style: { gridTemplateColumns: '80px 1fr', alignItems: 'center' }
        },
          e('div', { className: 'project-num' }, String(idx + 1).padStart(2, '0')),
          e('div', null,
            e('div', { style: { display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' } },
              e('h3', { className: 'project-title', style: { margin: 0 } }, train.title),
              e('span', { style: { color: 'var(--grey)', fontSize: '0.9rem', fontFamily: 'var(--font-body)', fontWeight: 'bold' } }, train.date)
            ),
            e('div', { style: { color: 'var(--gold)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '16px', textTransform: 'uppercase' } }, train.company),
            e('p', { className: 'project-desc', style: { margin: 0 } }, train.description)
          )
        )
      )
    )
  );
}

// ════════════════════════════════════════════════
// TIMELINE
// ════════════════════════════════════════════════

function TimelineSection() {
  return e(motion.section, {
    id: 'timeline',
    className: 'section timeline',
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: true, margin: '-80px' },
    variants: stagger,
  },
    e('div', { className: 'container' },
      m('div', { variants: fadeUp, className: 'section-title', style: { marginBottom: '8px' } },
        e('span', { className: 'num' }, '04'),
        'THE RECORD',
      ),
      m('p', { variants: fadeUp, className: 'section-subtitle', style: { marginBottom: '48px', color: 'var(--grey)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' } },
        'History, Education and Training'
      ),
      e('div', { className: 'timeline-line' },
        ...TIMELINE.map((item, idx) =>
          m('div', { key: idx, variants: fadeUp, className: 'timeline-item' },
            e('div', { className: 'timeline-type' }, item.type),
            e('div', { className: 'timeline-title' }, item.title),
            e('div', { className: 'timeline-org' }, item.org),
            e('div', { className: 'timeline-date' }, item.date),
          ),
        ),
      ),
    ),
  );
}

// ════════════════════════════════════════════════
// CERTIFICATES
// ════════════════════════════════════════════════

function CertificatesSection() {
  const [selectedCert, setSelectedCert] = useState(null);

  // Handle escape key for modal
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') setSelectedCert(null); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return e(motion.section, {
    id: 'certificates',
    className: 'section certificates',
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: true, margin: '-80px' },
    variants: stagger,
  },
    e('div', { className: 'container' },
      m('div', { variants: fadeUp, className: 'section-title' },
        e('span', { className: 'num' }, '05'),
        'CERTIFICATES',
      ),
      e('div', { className: 'cert-grid' },
        ...CERTIFICATIONS.map((cert, idx) =>
          m('div', { 
            key: idx, 
            variants: fadeUp, 
            className: 'cert-card group',
            onClick: () => setSelectedCert(cert),
            style: { cursor: 'pointer' } 
          },
            e('div', { className: 'cert-bg-num' }, String(idx + 1).padStart(2, '0')),
            e('div', { className: 'cert-title flex items-center justify-between' }, 
              cert.title,
              e('span', { className: 'text-gold opacity-0 group-hover:opacity-100 transition-opacity' }, '↗')
            ),
            e('div', { className: 'cert-issuer' }, cert.issuer),
            e('div', { className: 'cert-date' }, cert.date),
          ),
        ),
      ),
    ),
    
    // PDF Viewer Modal
    e(AnimatePresence, null,
      selectedCert && e(motion.div, {
        key: 'modal-overlay',
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        style: {
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px'
        },
        onClick: () => setSelectedCert(null)
      },
        e('button', {
          style: {
            position: 'absolute', top: '24px', right: '32px',
            background: 'none', border: 'none', color: 'white', fontSize: '2.5rem', 
            cursor: 'pointer', fontFamily: 'var(--font-display)', lineHeight: 1
          },
          onClick: () => setSelectedCert(null)
        }, '×'),
        e(motion.div, {
          key: 'modal-content',
          initial: { scale: 0.95, opacity: 0, y: 20 },
          animate: { scale: 1, opacity: 1, y: 0 },
          exit: { scale: 0.95, opacity: 0, y: 20 },
          transition: { type: 'spring', damping: 25, stiffness: 300 },
          style: {
            width: '100%', maxWidth: '1000px', height: '85vh', 
            background: 'var(--dark-2)', border: '2px solid var(--gold)',
            boxShadow: '12px 12px 0 #000', display: 'flex', flexDirection: 'column'
          },
          onClick: (e) => e.stopPropagation()
        },
          e('div', { style: { padding: '16px 24px', borderBottom: '2px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
            e('h3', { style: { fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--white)', textTransform: 'uppercase' } }, selectedCert.title),
            e('button', {
              style: {
                background: 'none', border: 'none', color: 'var(--grey)', fontSize: '1.5rem', 
                cursor: 'pointer', fontFamily: 'var(--font-body)', lineHeight: 1
              },
              onClick: () => setSelectedCert(null),
              'aria-label': 'Close'
            }, 'ESC')
          ),
          e('div', { 
            style: { 
              flex: 1, 
              padding: '24px', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              overflow: 'hidden'
            } 
          },
            e('img', {
              src: selectedCert.file,
              alt: selectedCert.title,
              style: { 
                maxWidth: '100%', 
                maxHeight: 'calc(100% - 60px)', 
                objectFit: 'contain',
                borderRadius: '8px',
              }
            }),
            e('a', { 
              href: selectedCert.file, 
              download: selectedCert.title + ' Certificate', 
              style: { 
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '16px',
                padding: '10px 20px',
                color: 'var(--dark)',
                background: 'var(--gold)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                fontWeight: 'bold',
                textDecoration: 'none',
                textTransform: 'uppercase',
                border: '2px solid #000',
                boxShadow: '2px 2px 0 #000',
                transition: 'transform 0.1s, box-shadow 0.1s',
              },
              onMouseOver: e => {
                e.currentTarget.style.transform = 'translate(2px, 2px)';
                e.currentTarget.style.boxShadow = '0px 0px 0 #000';
              },
              onMouseOut: e => {
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = '2px 2px 0 #000';
              }
            }, 
              e(DownloadIcon, null),
              'DOWNLOAD CERTIFICATE'
            )
          )
        )
      )
    )
  );
}

// ════════════════════════════════════════════════
// CONTACT
// ════════════════════════════════════════════════

function ContactSection() {
  return e(motion.section, {
    id: 'contact',
    className: 'section contact',
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: true, margin: '-80px' },
    variants: stagger,
  },
    e('div', { className: 'container' },
      m('div', { variants: fadeUp, className: 'section-title' },
        e('span', { className: 'num' }, '06'),
        'GET IN TOUCH',
      ),
      m('div', { variants: fadeUp, className: 'contact-grid' },
        e('div', null,
          e('div', { className: 'contact-heading' },
            "LET'S BUILD ",
            e('span', { className: 'gold' }, 'SOMETHING'),
            ' TOGETHER',
          ),
          e('p', { className: 'contact-text' },
            "Open to collaborations, internship opportunities, and interesting data engineering challenges. Let's connect and create impact with data.",
          ),
          e('div', { style: { marginTop: '24px', display: 'flex', gap: '12px' } },
            ...SOCIAL_LINKS.map(link =>
              e('a', {
                key: link.name,
                href: link.url,
                target: '_blank',
                rel: 'noopener noreferrer',
                className: 'social-btn',
                title: link.name,
              }, e(SvgIcon, { path: link.icon, size: 18 })),
            ),
          ),
          e('div', { style: { marginTop: '24px', fontFamily: 'var(--font-body)', color: 'var(--grey)' } },
            'Contact me at: ',
            e('a', { 
              href: 'mailto:harshraj6020@gmail.com', 
              style: { color: 'var(--gold)', fontWeight: 'bold', textDecoration: 'none' } 
            }, 'harshraj6020@gmail.com')
          )
        ),
        e('form', {
          className: 'contact-form',
          action: 'https://formspree.io/f/xeerbojd',
          method: 'POST',
        },
          e('input', { type: 'text', name: 'name', className: 'form-input', placeholder: 'YOUR NAME', required: true }),
          e('input', { type: 'email', name: 'email', className: 'form-input', placeholder: 'YOUR EMAIL', required: true }),
          e('textarea', { name: 'message', className: 'form-textarea', placeholder: 'YOUR MESSAGE', required: true }),
          e('button', { type: 'submit', className: 'form-submit' }, 'SEND MESSAGE →'),
        ),
      ),
    ),
  );
}

// ════════════════════════════════════════════════
// FOOTER
// ════════════════════════════════════════════════

function Footer() {
  return e('footer', { className: 'footer' },
    e('p', null,
      '© Harsh Raj. Crafted with ',
      e('span', { className: 'gold' }, 'data'),
      ' and ',
      e('span', { className: 'gold' }, 'precision'),
      '.',
    ),
  );
}

// ════════════════════════════════════════════════
// APP
// ════════════════════════════════════════════════

function App() {
  return e(React.Fragment, null,
    e(NavBar),
    e('main', null,
      e(Hero),
      e(Marquee, { reverse: false }),
      e(AboutSection),
      e(Marquee, { reverse: true, dark: true }),
      e(ProjectsSection),
      e(Marquee, { reverse: false }),
      e(TrainingSection),
      e(Marquee, { reverse: true, dark: true }),
      e(TimelineSection),
      e(Marquee, { reverse: false }),
      e(CertificatesSection),
      e(ContactSection),
    ),
    e(Footer),
  );
}

// ════════════════════════════════════════════════
// MOUNT
// ════════════════════════════════════════════════

createRoot(document.getElementById('root')).render(e(App));
