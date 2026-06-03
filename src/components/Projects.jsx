import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import { useInView } from '../hooks/useInView';
import TiltCard from './TiltCard';

const gradientMap = {
  afer: 'from-emerald-600/30 via-gray-900 to-teal-600/30',
  farmacia: 'from-emerald-600/30 via-gray-900 to-teal-600/30',
  hamburgueseria: 'from-amber-600/30 via-gray-900 to-orange-600/30',
  cafeteria: 'from-rose-600/30 via-gray-900 to-pink-600/30',
  tienda: 'from-blue-600/30 via-gray-900 to-indigo-600/30',
  api: 'from-teal-600/30 via-gray-900 to-emerald-600/30',
};

function ProjectCard({ project, index, featured }) {
  const { t } = useTranslation();
  const { ref, isVisible } = useInView(0.1);
  const [imgIndex, setImgIndex] = useState(0);
  const [gridImgIndex, setGridImgIndex] = useState(0);

  const p = t(`projects.items.${project.tKey}`, { returnObjects: true });

  const statusColor = project.completed
    ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    : 'text-amber-400 bg-amber-500/10 border-amber-500/20';

  const gradient = gradientMap[project.tKey] || 'from-gray-700 via-gray-800 to-gray-900';

  if (featured) {
    const hasImages = project.images && project.images.length > 0;

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <TiltCard intensity={6} glare>
          <div className="glass rounded-xl overflow-hidden md:flex border border-gray-200/50 dark:border-gray-700/50">
            <div className={`md:w-2/5 h-52 md:h-auto ${hasImages ? '' : `bg-gradient-to-br ${gradient}`} flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-200/50 dark:border-gray-700/50 relative overflow-hidden group`}>
              {hasImages ? (
                <div className="w-full h-full relative">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={imgIndex}
                      src={project.images[imgIndex]}
                      alt={`${p.name} - ${imgIndex + 1}`}
                      className="w-full h-full object-cover object-top absolute inset-0"
                      loading="lazy"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </AnimatePresence>

                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent pointer-events-none" />

                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={() => setImgIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1))}
                        className="absolute left-2 top-1/2 -trangray-y-1/2 z-10 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                      </button>
                      <button
                        onClick={() => setImgIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1))}
                        className="absolute right-2 top-1/2 -trangray-y-1/2 z-10 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </button>
                      <div className="absolute bottom-2 left-1/2 -trangray-x-1/2 z-10 flex gap-1.5">
                        {project.images.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setImgIndex(i)}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${
                              i === imgIndex ? 'bg-emerald-400 w-4' : 'bg-white/40 hover:bg-white/60'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 30% 50%, rgba(16,185,129,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(20,184,166,0.15) 0%, transparent 50%)`,
                    }} />
                  </div>
                  <div className="relative z-10 text-center">
                    <div className="text-5xl mb-2 opacity-30 font-bold text-gradient">★</div>
                    <span className="px-4 py-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/15 rounded-full border border-emerald-500/30 backdrop-blur-sm">
                      {t('projects.featured')}
                    </span>
                  </div>
                </>
              )}
            </div>
            <div className="md:w-3/5 p-6 md:p-8">
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${statusColor}`}>
                  {p.status}
                </span>
                <span className="text-gray-400 dark:text-gray-500 text-xs font-mono">{p.category}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{p.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">{p.description}</p>
              {p.problem && (
                <div className="mb-3 p-3 bg-amber-500/5 border border-amber-500/10 rounded-lg">
                  <p className="text-xs font-semibold text-amber-400 mb-1 uppercase tracking-wider">Problema</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{p.problem}</p>
                </div>
              )}
              {p.result && (
                <div className="mb-4 p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-lg">
                  <p className="text-xs font-semibold text-emerald-400 mb-1 uppercase tracking-wider">Resultado</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{p.result}</p>
                </div>
              )}
              {p.details && (
                <ul className="space-y-1.5 mb-4">
                  {p.details.map((d, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="text-emerald-400 mt-0.5 shrink-0">▹</span>
                      {d}
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.techs.map((tech) => (
                  <span key={tech} className="px-2.5 py-1 text-xs font-mono text-teal-400 bg-teal-500/10 rounded border border-teal-500/20">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                {project.repoBack && (
                  <a href={project.repoBack} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-400 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    {t('projects.backend')}
                  </a>
                )}
                {!project.repoBack && (
                <a href={project.repo} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-400 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  {t('projects.backend')}
                </a>
                )}
                {project.repoFront && (
                  <a href={project.repoFront} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-400 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    {t('projects.frontend')}
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-teal-400 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </TiltCard>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
    >
      <div className="glass rounded-xl overflow-hidden border border-gray-700/50 h-full flex flex-col">
        <div className={`h-32 bg-gradient-to-br ${gradient} flex items-center justify-center border-b border-gray-700/50 relative overflow-hidden group`}>
          {project.images && project.images.length > 0 ? (
            <div className="w-full h-full relative">
              <img
                src={project.images[gridImgIndex]}
                alt={`${p.name} screenshot`}
                className="w-full h-full object-cover object-top absolute inset-0"
                loading="lazy"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent pointer-events-none" />
              {project.images.length > 1 && (
                <>
                  <button
                    onClick={() => setGridImgIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1))}
                    className="absolute left-1 top-1/2 -trangray-y-1/2 z-10 w-6 h-6 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button
                    onClick={() => setGridImgIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-1 top-1/2 -trangray-y-1/2 z-10 w-6 h-6 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </>
              )}
            </div>
          ) : (
            <>
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `radial-gradient(circle at 30% 50%, rgba(16,185,129,0.1) 0%, transparent 50%)`,
              }} />
              <span className="relative text-3xl font-bold text-gradient opacity-30">
                {String(index).padStart(2, '0')}
              </span>
            </>
          )}
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${statusColor}`}>
              {p.status}
            </span>
            <span className="text-gray-600 text-xs font-mono">{project.year}</span>
          </div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1.5">{p.name}</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-3 line-clamp-2 flex-1">{p.description}</p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.techs.slice(0, 4).map((tech) => (
              <span key={tech} className="px-2 py-0.5 text-xs font-mono text-teal-400 bg-teal-500/10 rounded border border-teal-500/20">
                {tech}
              </span>
            ))}
            {project.techs.length > 4 && (
              <span className="px-2 py-0.5 text-xs text-gray-400 dark:text-gray-500">+{project.techs.length - 4}</span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-auto">
            {project.repo !== '#' ? (
              <a href={project.repo} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-gray-400 dark:text-gray-500 hover:text-emerald-400 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                {t('projects.code')}
              </a>
            ) : (
              <span className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                {t('projects.comingSoon')}
              </span>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-teal-400 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { t } = useTranslation();
  const { ref, isVisible } = useInView(0.1);
  const [filter, setFilter] = useState('All');

  const allTechs = useMemo(() => {
    const techSet = new Set();
    projects.forEach((p) => p.techs.forEach((tech) => techSet.add(tech)));
    return ['All', ...Array.from(techSet).sort()];
  }, []);

  const filtered = useMemo(() => {
    if (filter === 'All') return projects;
    return projects.filter((p) => p.techs.some((tech) => tech === filter));
  }, [filter]);

  const featuredFiltered = filtered.filter((p) => p.featured)[0] || null;
  const restFiltered = filtered.filter((p) => !p.featured).slice(0, 3);

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };

  return (
    <section id="proyectos" className="relative py-16 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gray-50/40 dark:bg-gray-950/60 pointer-events-none" />

      <motion.div
        ref={ref}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={container}
        className="relative max-w-6xl mx-auto"
      >
        <motion.div variants={{ hidden: {}, visible: { opacity: 1, y: 0 } }}>
          <h2 className="text-3xl sm:text-5xl font-bold mb-3">
            <span className="text-gradient">/</span> {t('projects.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-3" />
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-2xl">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        {/* Tech filter */}
        <motion.div variants={{ hidden: {}, visible: { opacity: 1, y: 0 } }} className="mb-8">
          <div className="flex flex-wrap gap-2">
            {allTechs.map((tech) => (
              <button
                key={tech}
                onClick={() => setFilter(tech)}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all ${
                  filter === tech
                    ? 'text-emerald-400 border-emerald-500/50 bg-emerald-500/10'
                    : 'text-gray-400 dark:text-gray-500 border-gray-200 dark:border-gray-700 hover:text-gray-600 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 bg-gray-100 dark:bg-gray-800/50'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="space-y-6">
          {featuredFiltered && (
            <ProjectCard project={featuredFiltered} index={0} featured />
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {restFiltered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i + 1} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-gray-400 dark:text-gray-500 py-12">{t('projects.noResults')}</p>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <a href="https://github.com/Manuel-Adolfo-Soto?tab=repositories" target="_blank" rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-8 py-3.5 bg-gray-100 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-xl hover:border-emerald-500/50 hover:bg-gray-200 dark:hover:bg-gray-700/80 transition-all backdrop-blur-sm">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            {t('projects.viewAll')}
            <span className="group-hover:trangray-x-1 transition-transform">→</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
