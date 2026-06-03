import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { certificates } from '../data/projects';

export default function CertificatesModal({ open, onClose }) {
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
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={onClose}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-3xl max-h-[85vh] glass rounded-2xl overflow-hidden border border-gray-700/50 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700/50">
                <h3 className="text-white font-semibold text-lg">Certificaciones</h3>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {certificates.filter(cert => !cert.pending).map((cert, i) => (
                  <button key={i} onClick={() => openPreview(cert)} className="w-full text-left glass rounded-xl overflow-hidden card-hover border border-gray-200/50 dark:border-gray-700/50">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-40 h-40 sm:h-auto bg-gray-100 dark:bg-gray-800 shrink-0 flex items-center justify-center overflow-hidden">
                        <img src={cert.images?.[0] || cert.link} alt={cert.name} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div className="p-4 flex flex-col justify-center">
                        <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-1">{cert.name}</h4>
                        <p className="text-emerald-400 text-sm mb-1">{cert.issuer}</p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2">{cert.description}</p>
                        <span className="mt-2 text-xs text-emerald-400/70 hover:text-emerald-400 transition-colors">Click para ver completo →</span>
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
              <button onClick={() => setPreview(null)} className="absolute -top-10 right-0 text-gray-500 dark:text-gray-400 hover:text-white transition-colors text-sm">
                Cerrar ✕
              </button>
              {preview.images.length > 1 && (
                <>
                  <button onClick={prevImage} className="absolute left-2 top-1/2 -trangray-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors text-xl z-10">‹</button>
                  <button onClick={nextImage} className="absolute right-2 top-1/2 -trangray-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors text-xl z-10">›</button>
                </>
              )}
              <img src={preview.images[preview.index]} alt="Certificado" className="w-full max-h-[80vh] object-contain rounded-xl shadow-2xl" />
              {preview.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -trangray-x-1/2 flex gap-2">
                  {preview.images.map((_, idx) => (
                    <button key={idx} onClick={(e) => { e.stopPropagation(); setPreview(p => ({ ...p, index: idx })); }} className={`w-2.5 h-2.5 rounded-full transition-all ${idx === preview.index ? 'bg-emerald-400 scale-125' : 'bg-white/50 hover:bg-white/80'}`} />
                  ))}
                </div>
              )}
              <a href={preview.images[preview.index]} download className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg hover:from-emerald-400 hover:to-teal-400 transition-all">
                Descargar imagen
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
