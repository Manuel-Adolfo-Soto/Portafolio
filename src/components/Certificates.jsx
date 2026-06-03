import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { certificates } from '../data/projects';
import { useInView } from '../hooks/useInView';

export default function Certificates() {
  const { t } = useTranslation();
  const { ref, isVisible } = useInView(0.1);
  const [preview, setPreview] = useState(null);

  const openPreview = (cert) => {
    const images = cert.images || [cert.link];
    setPreview({ images, index: 0 });
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setPreview(p => ({ ...p, index: p.index === 0 ? p.images.length - 1 : p.index - 1 }));
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setPreview(p => ({ ...p, index: p.index === p.images.length - 1 ? 0 : p.index + 1 }));
  };

  return (
    <section id="certificados" className="relative py-28 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-slate-50/80 dark:bg-slate-950/60 pointer-events-none" />

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
            <span className="text-gradient">/</span> {t('certificates.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full mb-12" />
        </motion.div>

        {certificates.filter(cert => !cert.pending).map((cert, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <button onClick={() => openPreview(cert)} className="w-full text-left glass rounded-xl overflow-hidden card-hover border border-slate-200/50 dark:border-slate-700/50">
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-48 h-48 sm:h-auto bg-slate-100 dark:bg-slate-800 shrink-0 flex items-center justify-center">
                  {cert.link.endsWith('.pdf') ? (
                    <svg className="w-12 h-12 text-cyan-400/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  ) : (
                    <img
                      src={cert.images?.[0] || cert.link}
                      alt={cert.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">{cert.name}</h3>
                  <p className="text-cyan-400 text-sm mb-2">{cert.issuer}</p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">{cert.description}</p>
                  <span className="mt-3 text-xs text-cyan-400/70 hover:text-cyan-400 transition-colors">Click para ver completo →</span>
                </div>
              </div>
            </button>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4"
            onClick={() => setPreview(null)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-2xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setPreview(null)}
                className="absolute -top-10 right-0 text-slate-500 dark:text-slate-400 hover:text-white transition-colors text-sm"
              >
                Cerrar ✕
              </button>
              {preview.images.length > 1 && (
                <>
                  <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors text-xl z-10">‹</button>
                  <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors text-xl z-10">›</button>
                </>
              )}
              {preview.images[preview.index].endsWith('.pdf') ? (
                <embed
                  src={preview.images[preview.index]}
                  type="application/pdf"
                  className="w-full h-[80vh] rounded-xl shadow-2xl"
                />
              ) : (
                <img
                  src={preview.images[preview.index]}
                  alt="Certificado"
                  className="w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
                />
              )}
              {preview.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {preview.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => { e.stopPropagation(); setPreview(p => ({ ...p, index: idx })); }}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${idx === preview.index ? 'bg-cyan-400 scale-125' : 'bg-white/50 hover:bg-white/80'}`}
                    />
                  ))}
                </div>
              )}
              <a
                href={preview.images[preview.index]}
                download
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-violet-500 rounded-lg hover:from-cyan-400 hover:to-violet-400 transition-all"
              >
                {preview.images[preview.index].endsWith('.pdf') ? 'Descargar PDF' : 'Descargar imagen'}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
