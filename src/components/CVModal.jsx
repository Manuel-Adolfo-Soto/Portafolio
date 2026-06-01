import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useCVModal } from '../context/useCVModal';
import CVContent from './CVContent';
import { cvData } from '../data/cv';
import { cvDataEn } from '../data/cv-en';

const LABELS = {
  es: {
    summary: 'Resumen Profesional', experience: 'Experiencia Profesional',
    skills: 'Habilidades Técnicas', projects: 'Proyectos Destacables',
    education: 'Educación', languages: 'Idiomas',
    certifications: 'Certificaciones', interests: 'Intereses',
    problem: 'Problema:', results: 'Resultados:', pdf: '📥 Descargar PDF',
    tip: 'O presiona Ctrl+P y selecciona "Guardar como PDF"',
  },
  en: {
    summary: 'Professional Summary', experience: 'Professional Experience',
    skills: 'Technical Skills', projects: 'Featured Projects',
    education: 'Education', languages: 'Languages',
    certifications: 'Certifications', interests: 'Interests',
    problem: 'Problem:', results: 'Results:', pdf: '📥 Download PDF',
    tip: 'Or press Ctrl+P and select "Save as PDF"',
  },
};

function buildCvPage(data, labels) {
  const items = (arr, sep = '·') => arr.map((x, i) => `${x}${i < arr.length - 1 ? ` ${sep} ` : ''}`).join('');

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>CV - Manuel Adolfo Soto</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:Inter,system-ui,-apple-system,sans-serif;background:#fff;color:#1e293b;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.cv-page{max-width:210mm;margin:0 auto;padding:18mm 14mm;background:#fff}
h1{font-size:26pt;font-weight:800;letter-spacing:-.02em;color:#0f172a;margin-bottom:2px}
.title{font-size:14pt;font-weight:600;color:#0891b2;margin-bottom:2px}
.subtitle{font-size:10pt;color:#64748b;font-family:'Fira Code',monospace}
.contact{display:flex;flex-wrap:wrap;justify-content:center;gap:6px 16px;margin-top:10px;font-size:9pt;color:#475569}
.contact span{white-space:nowrap}
.sep{width:100%;height:2px;background:linear-gradient(90deg,#06b6d4,#8b5cf6);margin:14px 0 18px;border:0}
.section{margin-bottom:22px}
.section-title{font-size:9pt;font-weight:700;text-transform:uppercase;letter-spacing:.15em;color:#0891b2;border-bottom:2px solid #e2e8f0;padding-bottom:6px;margin-bottom:12px}
.exp-item{margin-bottom:18px}
.exp-header{display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;margin-bottom:4px}
.exp-title{font-size:11pt;font-weight:700;color:#0f172a}
.exp-company{font-size:9pt;font-weight:500;color:#0891b2}
.exp-period{font-size:9pt;font-weight:600;color:#334155;text-align:right}
.exp-duration{font-size:8pt;color:#94a3b8}
.exp-desc{font-size:9pt;color:#475569;font-style:italic;margin-bottom:8px;line-height:1.5}
.cat-title{font-size:8pt;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#64748b;margin-bottom:4px}
ul{list-style:none;padding:0;margin-bottom:8px}
li{font-size:9pt;color:#334155;padding-left:12px;position:relative;line-height:1.6}
li::before{content:"▸";position:absolute;left:0;color:#06b6d4}
.tags{display:flex;flex-wrap:wrap;gap:4px;margin-top:6px}
.tag{font-size:7pt;padding:2px 6px;background:#e2e8f0;color:#475569;border-radius:3px;font-family:'Fira Code',monospace}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:24px}
.skills-group{margin-bottom:10px;break-inside:avoid}
.skills-title{font-size:8pt;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#0891b2;margin-bottom:2px}
.skills-items{font-size:8pt;color:#475569;line-height:1.6}
.proj-item{margin-bottom:18px}
.proj-header{display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;margin-bottom:4px}
.proj-name{font-size:11pt;font-weight:700;color:#0f172a}
.proj-role{font-size:8pt;font-weight:500;color:#0891b2}
.proj-badges{display:flex;gap:6px;margin-bottom:8px}
.badge{font-size:7pt;padding:2px 6px;border-radius:3px;font-weight:500}
.badge-cyan{background:#e0f2fe;color:#0e7490}
.badge-violet{background:#ede9fe;color:#6d28d9}
.badge-emerald{background:#d1fae5;color:#047857}
.proj-desc{font-size:9pt;color:#475569;line-height:1.5;margin-bottom:6px}
.proj-label{font-weight:600;color:#334155}
.edu-item{margin-bottom:14px}
.edu-degree{font-size:11pt;font-weight:700;color:#0f172a}
.edu-inst{font-size:9pt;color:#0891b2}
.edu-meta{font-size:8pt;color:#94a3b8;margin-bottom:4px}
.edu-status{display:inline-block;font-size:7pt;padding:2px 6px;background:#d1fae5;color:#047857;border-radius:3px;font-weight:500;margin-bottom:6px}
.cert-item{margin-bottom:10px}
.cert-name{font-size:9pt;font-weight:700;color:#0f172a}
.cert-issuer{font-size:8pt;color:#0891b2}
.int-group{display:flex;flex-wrap:wrap;gap:6px}
.int-item{font-size:8pt;padding:3px 8px;background:#e2e8f0;color:#475569;border-radius:3px}
.toolbar{text-align:center;padding:16px;background:#f8fafc;border-bottom:1px solid #e2e8f0;font-family:Inter,system-ui,sans-serif}
.toolbar button{padding:10px 28px;background:linear-gradient(135deg,#06b6d4,#8b5cf6);color:#fff;border:none;border-radius:8px;font-size:15px;font-weight:600;cursor:pointer}
.toolbar button:hover{opacity:.85}
@media print{.toolbar{display:none}@page{size:A4;margin:0}body{margin:0}.cv-page{max-width:none}}
</style>
</head>
<body>
<div class="toolbar"><button onclick="window.print()">${labels.pdf}</button>
<span style="margin-left:12px;font-size:13px;color:#64748b;">${labels.tip}</span></div>
<div class="cv-page">
<span style="display:block;font-size:0;line-height:0;overflow:hidden">${data.hidden}</span>

<header style="text-align:center;margin-bottom:22px">
<div style="display:flex;justify-content:center;margin-bottom:10px">
<img src="${location.origin}/images/Mi%20foto%20de%20perfil/Mi%20foto%20de%20perfil.jpeg" alt="${data.name}" style="width:64px;height:64px;border-radius:50%;object-fit:cover;border:2px solid rgba(6,182,212,.3)">
</div>
<h1>${data.name}</h1>
<p class="title">${data.title}</p>
<p class="subtitle">${data.subtitle}</p>
<div class="contact">
${Object.values(data.contact).map(v => `<span>${v}</span>`).join('')}
</div>
</header>
<hr class="sep">

<div class="section">
<div class="section-title">${labels.summary}</div>
${data.summary.map(p => `<p style="font-size:9pt;color:#475569;line-height:1.6;margin-bottom:4px">${p}</p>`).join('')}
</div>

<div class="section">
<div class="section-title">${labels.experience}</div>
${data.experience.map(exp => `
<div class="exp-item">
<div class="exp-header">
<div><span class="exp-title">${exp.title}</span><br><span class="exp-company">${exp.company} | ${exp.location}</span></div>
<div><div class="exp-period">${exp.period}</div><div class="exp-duration">${exp.duration}</div></div>
</div>
<p class="exp-desc">${exp.description}</p>
${exp.highlights.map(g => `
<div style="margin-bottom:8px">
<div class="cat-title">${g.category}:</div>
<ul>${g.items.map(i => `<li>${i}</li>`).join('')}</ul>
</div>`).join('')}
<div class="tags">${exp.technologies.map(t => `<span class="tag">${t}</span>`).join('')}</div>
</div>`).join('')}
</div>

<div class="section">
<div class="section-title">${labels.skills}</div>
<div class="grid-2">
${Object.values(data.skills).map(g => `
<div class="skills-group">
<div class="skills-title">${g.title}</div>
<div class="skills-items">${items(g.items)}</div>
</div>`).join('')}
</div>
</div>

<div class="section">
<div class="section-title">${labels.projects}</div>
${data.projects.map(p => `
<div class="proj-item">
<div class="proj-header"><span class="proj-name">${p.name}</span><span class="proj-role">${p.role} | ${p.period}</span></div>
<div class="proj-badges"><span class="badge badge-cyan">${p.type}</span><span class="badge badge-violet">${p.status}</span></div>
<p class="proj-desc">${p.description}</p>
<p class="proj-desc"><span class="proj-label">${labels.problem}</span> ${p.problem}</p>
<div class="tags">${p.stack.map(t => `<span class="tag">${t}</span>`).join('')}</div>
<ul>${p.features.map(f => `<li>${f}</li>`).join('')}</ul>
<p class="proj-desc" style="margin-top:6px"><span class="proj-label">${labels.results}</span> ${p.results}</p>
</div>`).join('')}
</div>

<div class="grid-2">
<div>
<div class="section">
<div class="section-title">${labels.education}</div>
${data.education.map(e => `
<div class="edu-item">
<div class="edu-degree">${e.degree}</div>
<div class="edu-inst">${e.institution}</div>
<div class="edu-meta">${e.period} | ${e.location}</div>
<span class="edu-status">${e.status}</span>
<ul style="margin-top:4px">${e.details.map(d => `<li>${d}</li>`).join('')}</ul>
</div>`).join('')}
</div>
</div>
<div>
<div class="section">
<div class="section-title">${labels.languages}</div>
${data.languages.map(l => `<p style="font-size:9pt;color:#334155;margin-bottom:4px"><strong>${l.name}:</strong> ${l.level}</p>`).join('')}
</div>
${data.certifications.length ? `
<div class="section">
<div class="section-title">${labels.certifications}</div>
${data.certifications.map(c => `
<div class="cert-item">
<div class="cert-name">${c.name}</div>
<div class="cert-issuer">${c.issuer}</div>
<p style="font-size:9pt;color:#475569">${c.description}</p>
</div>`).join('')}
</div>` : ''}
<div class="section">
<div class="section-title">${labels.interests}</div>
<div class="int-group">${data.interests.map(i => `<span class="int-item">${i}</span>`).join('')}</div>
</div>
</div>
</div>

</div>
</body>
</html>`;
}

export default function CVModal() {
  const { i18n } = useTranslation();
  const { isOpen, closeCV } = useCVModal();
  const cvRef = useRef(null);

  const handleDownloadPDF = () => {
    const lang = i18n.language?.startsWith('en') ? 'en' : 'es';
    const data = lang === 'en' ? cvDataEn : cvData;
    const labels = LABELS[lang];
    const html = buildCvPage(data, labels);
    window.open(URL.createObjectURL(new Blob([html], { type: 'text/html' })));
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
