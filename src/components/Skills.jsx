import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { skills } from '../data/projects';
import { useInView } from '../hooks/useInView';

const categories = [
  { key: 'frontend', label: 'Frontend', color: '#06b6d4' },
  { key: 'backend', label: 'Backend', color: '#8b5cf6' },
  { key: 'databases', label: 'Bases de Datos', color: '#10b981' },
  { key: 'tools', label: 'Herramientas', color: '#f59e0b' },
  { key: 'networking', label: 'Redes', color: '#f43f5e' },
];

function SkillRing({ name, level, index, color }) {
  const { ref, isVisible } = useInView(0.2);
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (level / 100) * circumference;

  return (
    <div ref={ref} className="flex flex-col items-center gap-2 group">
      <div className="relative w-20 h-20">
        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r={radius} fill="none" stroke="rgba(51,65,85,0.5)" strokeWidth="4" />
          <motion.circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isVisible ? { strokeDashoffset: offset } : { strokeDashoffset: circumference }}
            transition={{ duration: 1.2, delay: index * 0.1, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="text-sm font-bold font-mono text-white"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            {level}%
          </motion.span>
        </div>
      </div>
      <span className="text-xs text-slate-400 group-hover:text-white transition-colors">{name}</span>
    </div>
  );
}

export default function Skills() {
  const { t } = useTranslation();
  const { ref, isVisible } = useInView(0.1);

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section id="habilidades" className="relative py-28 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950 pointer-events-none" />

      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        className="relative max-w-6xl mx-auto"
      >
        <motion.div variants={item}>
          <h2 className="text-3xl sm:text-5xl font-bold mb-3">
            <span className="text-gradient">/</span> {t('skills.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full mb-12" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <motion.div key={cat.key} variants={item}>
              <div className="glass rounded-xl p-6 card-hover h-full">
                <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                  {t(`skills.categories.${cat.key}`)}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {skills[cat.key].map((skill, i) => (
                    <SkillRing key={skill.name} {...skill} index={i} color={cat.color} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
