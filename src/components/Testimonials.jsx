import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const testimonials = [
  {
    quote: "Manuel Adolfo Soto realizó actividades de apoyo tecnológico y desarrollo, demostrando responsabilidad, aprendizaje continuo, disposición al trabajo en equipo y compromiso con los objetivos institucionales. Su participación aportó al fortalecimiento de procesos tecnológicos y atención de requerimientos digitales dentro de la empresa.",
    author: "Jefatura - Afer Bolivia",
    role: "Supervisor de Sistemas",
  },
];

export default function Testimonials() {
  const { t } = useTranslation();
  const { ref, isVisible } = useInView(0.1);

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
            <span className="text-gradient">/</span> {t('testimonials.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full mb-12" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="glass rounded-xl p-8 md:p-10 card-hover relative">
            <div className="absolute top-6 left-6 text-6xl text-cyan-500/10 font-serif leading-none select-none">"</div>
            <div className="relative">
              <p className="text-slate-200 text-base md:text-lg leading-relaxed italic mb-8">
                "{testimonials[0].quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm">
                  AF
                </div>
                <div>
                  <p className="text-white font-semibold">{testimonials[0].author}</p>
                  <p className="text-slate-500 text-sm">{testimonials[0].role}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
