import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useCVModal } from '../context/useCVModal';
import CVContent from './CVContent';

export default function CVModal() {
  const { t } = useTranslation();
  const { isOpen, closeCV } = useCVModal();
  const cvRef = useRef(null);

  const handleDownloadPDF = () => {
    const cvElement = document.querySelector('.cv-page');
    if (!cvElement) {
      window.print();
      return;
    }

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      window.print();
      return;
    }

    const styles = document.querySelectorAll('style, link[rel="stylesheet"]');
    const stylesHTML = Array.from(styles).map(s => s.outerHTML).join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>CV - Manuel Adolfo Soto</title>
          ${stylesHTML}
          <style>
            @page { size: A4; margin: 0; }
            body {
              margin: 0;
              padding: 0;
              background: white !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .cv-page {
              max-width: 210mm;
              margin: 0 auto;
              padding: 15mm 12mm;
              background: white !important;
            }
          </style>
        </head>
        <body>${cvElement.outerHTML}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeCV} />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-4xl h-[85vh] glass rounded-2xl overflow-hidden border border-slate-700/50 flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50">
              <h3 className="text-white font-semibold">CV - Manuel Adolfo Soto</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDownloadPDF}
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg hover:from-emerald-400 hover:to-teal-400 transition-all flex items-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  PDF
                </button>
                <button
                  onClick={closeCV}
                  className="p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900 print:overflow-visible">
              <CVContent ref={cvRef} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
