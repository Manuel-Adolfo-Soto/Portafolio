import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const icons = {
  repos: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
  followers: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
  following: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
};

const langColors = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  HTML: '#e34f26',
  CSS: '#1572b6',
  Vue: '#4fc08d',
  'C#': '#178600',
  Python: '#3572a5',
  PHP: '#777bb4',
  Java: '#b07219',
  Dockerfile: '#384d54',
  Shell: '#89e051',
};

export default function GitHubStats() {
  const { t } = useTranslation();
  const { ref, isVisible } = useInView(0.1);
  const [stats, setStats] = useState(null);
  const [langs, setLangs] = useState([]);

  useEffect(() => {
    fetch('https://api.github.com/users/khiomaru')
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetch('https://api.github.com/users/khiomaru/repos?per_page=100')
      .then((r) => r.json())
      .then(async (repos) => {
        const langMap = {};
        for (const repo of repos) {
          if (repo.fork) continue;
          const lang = repo.language;
          if (lang) langMap[lang] = (langMap[lang] || 0) + 1;
        }
        const sorted = Object.entries(langMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 8);
        setLangs(sorted);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetch('https://api.github.com/users/khiomaru')
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  const items = stats
    ? [
        { label: t('github.repos'), value: stats.public_repos, icon: 'repos' },
        { label: t('github.followers'), value: stats.followers, icon: 'followers' },
        { label: t('github.following'), value: stats.following, icon: 'following' },
      ]
    : [];

  return (
    <section className="relative py-28 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950 pointer-events-none" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="relative max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-5xl font-bold mb-3">
            <span className="text-gradient">/</span> {t('github.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full mb-12" />
        </motion.div>

        {/* Stats cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          {items.map((item) => (
            <div key={item.label} className="glass rounded-xl p-6 text-center card-hover">
              <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icons[item.icon]} />
                </svg>
              </div>
              <div className="text-3xl font-bold text-white font-mono">{item.value ?? '—'}</div>
              <div className="text-sm text-slate-400 mt-1">{item.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Activity graph */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass rounded-xl p-6 card-hover"
        >
          <h3 className="text-white font-semibold mb-4">{t('github.activity')}</h3>
          <img
            src="https://github-readme-activity-graph.vercel.app/graph?username=khiomaru&theme=react-dark&hide_border=true&bg_color=0f172a&color=06b6d4&line=8b5cf6&point=ffffff"
            alt="GitHub Activity Graph"
            className="w-full rounded-lg"
            loading="lazy"
          />
        </motion.div>

        {/* Top langs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-xl p-6 mt-6 card-hover"
        >
          <h3 className="text-white font-semibold mb-4">{t('github.languages')}</h3>
          {langs.length > 0 ? (
            <div className="space-y-3">
              {langs.map(([lang, count], i) => {
                const pct = Math.round((count / langs.reduce((a, [, c]) => a + c, 0)) * 100);
                const color = langColors[lang] || '#6366f1';
                return (
                  <div key={lang}>
                    <div className="flex justify-between text-sm mb-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                        <span className="text-slate-300">{lang}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-500 font-mono text-xs">{count} repo{count > 1 ? 's' : ''}</span>
                        <span className="text-slate-600 font-mono text-xs w-8 text-right">{pct}%</span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: color }}
                        initial={{ width: 0 }}
                        animate={isVisible ? { width: `${pct}%` } : { width: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-slate-500 text-sm">{t('github.loading')}</p>
          )}
        </motion.div>

        {/* GitHub link */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-center mt-8"
        >
          <a
            href="https://github.com/khiomaru"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            github.com/khiomaru
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
