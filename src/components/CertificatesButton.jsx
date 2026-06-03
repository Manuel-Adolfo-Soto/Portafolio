import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { certificates } from '../data/projects';

export default function CertificatesButton() {
  const [open, setOpen] = useState(false);
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
    <>
      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-20 z-50 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white text-sm font-medium shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-110 transition-all"
        aria-label="Certificaciones"
      >
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
          Certificaciones
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={() => setOpen(false)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-3xl max-h-[85vh] glass rounded-2xl overflow-hidden border border-slate-700/50 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50">
                <h3 className="text-white font-semibold text-lg">Certificaciones</h3>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {certificates.filter(cert => !cert.pending).map((cert, i) => (
                  <button key={i} onClick={() => openPreview(cert)} className="w-full text-left glass rounded-xl overflow-hidden card-hover border border-slate-200/50 dark:border-slate-700/50">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-40 h-40 sm:h-auto bg-slate-100 dark:bg-slate-800 shrink-0 flex items-center justify-center overflow-hidden">
                        {cert.link.endsWith('.pdf') ? (
                          <iframe src={`${cert.link}#toolbar=0`} className="w-full h-full pointer-events-none" title="Certificado PDF" />
                        ) : (
                          <img src={cert.images?.[0] || cert.link} alt={cert.name} className="w-full h-full object-cover" loading="lazy" />
                        )}
                      </div>
                      <div className="p-4 flex flex-col justify-center">
                        <h4 className="text-base font-semibold text-slate-900 dark:text-white mb-1">{cert.name}</h4>
                        <p className="text-cyan-400 text-sm mb-1">{cert.issuer}</p>
                        <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2">{cert.description}</p>
                        <span className="mt-2 text-xs text-cyan-400/70 hover:text-cyan-400 transition-colors">Click para ver completo →</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              <button onClick={() => setPreview(null)} className="absolute -top-10 right-0 text-slate-500 dark:text-slate-400 hover:text-white transition-colors text-sm">
                Cerrar ✕
              </button>
              {preview.images.length > 1 && (
                <>
                  <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors text-xl z-10">‹</button>
                  <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors text-xl z-10">›</button>
                </>
              )}
              {preview.images[preview.index].endsWith('.pdf') ? (
                <iframe src={`${preview.images[preview.index]}#toolbar=0`} className="w-full h-[80vh] rounded-xl shadow-2xl" title="Certificado PDF" />
              ) : (
                <img src={preview.images[preview.index]} alt="Certificado" className="w-full max-h-[80vh] object-contain rounded-xl shadow-2xl" />
              )}
              {preview.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {preview.images.map((_, idx) => (
                    <button key={idx} onClick={(e) => { e.stopPropagation(); setPreview(p => ({ ...p, index: idx })); }} className={`w-2.5 h-2.5 rounded-full transition-all ${idx === preview.index ? 'bg-cyan-400 scale-125' : 'bg-white/50 hover:bg-white/80'}`} />
                  ))}
                </div>
              )}
              <a href={preview.images[preview.index]} download className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-violet-500 rounded-lg hover:from-cyan-400 hover:to-violet-400 transition-all">
                {preview.images[preview.index].endsWith('.pdf') ? 'Descargar PDF' : 'Descargar imagen'}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
