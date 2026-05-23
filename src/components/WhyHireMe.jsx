import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const icons = {
  experience: 'M21 13.255A23.93 23.93 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  team: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  study: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422m-6.16 3.422l-6.16-3.422M12 20v-6l-6.16-3.422M12 20l6.16-3.422M21 10v4',
  stack: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
};

export default function WhyHireMe() {
  const { t } = useTranslation();
  const { ref, isVisible } = useInView(0.1);
  const items = t('whyme.items', { returnObjects: true });

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section className="relative py-28 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/30 to-slate-950 pointer-events-none" />

      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        className="relative max-w-5xl mx-auto"
      >
        <motion.div variants={item}>
          <h2 className="text-3xl sm:text-5xl font-bold mb-3">
            <span className="text-gradient">/</span> {t('whyme.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full mb-12" />
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {items.map((entry, i) => (
            <motion.div key={i} variants={item}>
              <div className="glass rounded-xl p-6 card-hover h-full group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center shrink-0 group-hover:from-cyan-500/30 group-hover:to-violet-500/30 transition-all">
                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icons[entry.icon] || icons.stack} />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{entry.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{entry.desc}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
