import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { education } from '../data/projects';
import { useInView } from '../hooks/useInView';

export default function Education() {
  const { t } = useTranslation();
  const { ref, isVisible } = useInView(0.1);

  return (
    <section id="educacion" className="relative py-28 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-slate-100/50 to-slate-50 dark:from-slate-950 dark:via-slate-900/30 dark:to-slate-950 pointer-events-none" />

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
            <span className="text-gradient">/</span> {t('education.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full mb-12" />
        </motion.div>

        {education.map((edu, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="glass rounded-xl p-8 card-hover">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-xs font-medium text-emerald-400 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                    {t('education.badge')}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{edu.degree}</h3>
                  <p className="text-cyan-400">{edu.institution}</p>
                </div>
                <span className="px-3 py-1 text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 font-mono">
                  {edu.period}
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-4">{edu.description}</p>
              <ul className="space-y-2">
                {edu.highlights.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-slate-500 dark:text-slate-400 text-sm">
                    <span className="text-cyan-400 mt-1">▹</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass rounded-xl p-6 mt-6 card-hover">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🇬🇧</span>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{t('education.english.title')}</h3>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600 dark:text-slate-300">{t('education.english.level')}</span>
                  <span className="text-amber-400 font-mono text-xs">{t('education.english.badge')}</span>
                </div>
                <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full w-[25%] bg-gradient-to-r from-amber-500 to-amber-400 rounded-full" />
                </div>
              </div>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-3">
              {t('education.english.description')}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
