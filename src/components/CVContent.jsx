import { forwardRef } from 'react';
import { cvData } from '../data/cv';

const Section = ({ title, children, className = '' }) => (
  <div className={`mb-6 ${className}`}>
    <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-cyan-600 dark:text-cyan-400 border-b border-slate-300 dark:border-slate-600 pb-1.5 mb-3">
      {title}
    </h2>
    {children}
  </div>
);

const CVContent = forwardRef(function CVContent(_props, ref) {
  const { name, title, subtitle, contact, summary, experience, skills, projects, education, certifications, languages, interests } = cvData;

  return (
    <div ref={ref} className="cv-page bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 p-8 md:p-10 max-w-[210mm] mx-auto font-sans leading-relaxed print:shadow-none">
      {/* Header */}
      <header className="text-center mb-6 pb-5 border-b-2 border-cyan-500 dark:border-cyan-400">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">{name}</h1>
        <p className="text-lg font-semibold text-cyan-600 dark:text-cyan-400 mt-1">{title}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 font-mono">{subtitle}</p>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-3 text-xs text-slate-600 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            {contact.email}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            {contact.phone}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            {contact.linkedin}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" /></svg>
            {contact.github}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            {contact.location}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" /></svg>
            {contact.website}
          </span>
        </div>
      </header>

      {/* Summary */}
      <Section title="Resumen Profesional">
        {summary.map((p, i) => (
          <p key={i} className="text-xs leading-relaxed text-slate-700 dark:text-slate-300 mb-1 last:mb-0">{p}</p>
        ))}
      </Section>

      {/* Experience */}
      <Section title="Experiencia Profesional">
        {experience.map((exp, i) => (
          <div key={i} className="mb-5 last:mb-0">
            <div className="flex flex-wrap items-baseline justify-between mb-1.5">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{exp.title}</h3>
                <p className="text-xs font-medium text-cyan-600 dark:text-cyan-400">{exp.company} | {exp.location}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">{exp.period}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">{exp.duration}</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 italic">{exp.description}</p>
            {exp.highlights.map((group, gi) => (
              <div key={gi} className="mb-2 last:mb-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">{group.category}:</p>
                <ul className="space-y-0.5">
                  {group.items.map((item, ii) => (
                    <li key={ii} className="text-[11px] text-slate-700 dark:text-slate-300 pl-3 relative before:content-['▸'] before:absolute before:left-0 before:text-cyan-500 dark:before:text-cyan-400">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="mt-2 flex flex-wrap gap-1">
              {exp.technologies.map((tech, ti) => (
                <span key={ti} className="text-[9px] px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded font-mono">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </Section>

      {/* Skills */}
      <Section title="Habilidades Técnicas">
        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
          {Object.values(skills).map((group, gi) => (
            <div key={gi} className={gi >= 5 ? 'col-span-2' : ''}>
              <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-0.5">
                {group.title}
              </p>
              <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                {group.items.map((item, ii) => (
                  <span key={ii} className="text-[10px] text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item}{ii < group.items.length - 1 ? '·' : ''}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section title="Proyectos Destacables">
        {projects.map((proj, i) => (
          <div key={i} className="mb-4 last:mb-0">
            <div className="flex flex-wrap items-baseline justify-between mb-1">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">{proj.name}</h3>
              <p className="text-[10px] font-medium text-cyan-600 dark:text-cyan-400">{proj.role} | {proj.period}</p>
            </div>
            <div className="flex flex-wrap gap-2 mb-1.5">
              <span className="text-[9px] px-1.5 py-0.5 bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 rounded font-medium">{proj.type}</span>
              <span className="text-[9px] px-1.5 py-0.5 bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 rounded font-medium">{proj.status}</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mb-1">{proj.description}</p>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mb-1"><span className="font-semibold text-slate-700 dark:text-slate-300">Problema:</span> {proj.problem}</p>
            <div className="flex flex-wrap gap-1 mb-1.5">
              {proj.stack.map((tech, ti) => (
                <span key={ti} className="text-[9px] px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded font-mono">{tech}</span>
              ))}
            </div>
            <ul className="space-y-0.5 mb-1.5">
              {proj.features.map((f, fi) => (
                <li key={fi} className="text-[11px] text-slate-700 dark:text-slate-300 pl-3 relative before:content-['▸'] before:absolute before:left-0 before:text-cyan-500 dark:before:text-cyan-400">
                  {f}
                </li>
              ))}
            </ul>
            <p className="text-[11px] text-slate-600 dark:text-slate-400"><span className="font-semibold text-slate-700 dark:text-slate-300">Resultados:</span> {proj.results}</p>
          </div>
        ))}
      </Section>

      {/* Education + Languages + Certifications */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Section title="Educación">
            {education.map((edu, i) => (
              <div key={i}>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{edu.degree}</h3>
                <p className="text-xs text-cyan-600 dark:text-cyan-400">{edu.institution}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{edu.period} | {edu.location}</p>
                <span className="inline-block mt-1 text-[9px] px-1.5 py-0.5 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded font-medium">{edu.status}</span>
                <ul className="mt-2 space-y-0.5">
                  {edu.details.map((d, di) => (
                    <li key={di} className="text-[11px] text-slate-600 dark:text-slate-400 pl-3 relative before:content-['▸'] before:absolute before:left-0 before:text-cyan-500 dark:before:text-cyan-400">{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Section>
        </div>
        <div>
          <Section title="Idiomas">
            <ul className="space-y-1">
              {languages.map((lang, i) => (
                <li key={i} className="text-[11px] text-slate-700 dark:text-slate-300">
                  <span className="font-semibold">{lang.name}:</span> {lang.level}
                </li>
              ))}
            </ul>
          </Section>

          {certifications.length > 0 && (
            <Section title="Certificaciones">
              {certifications.map((cert, i) => (
                <div key={i} className="mb-2 last:mb-0">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{cert.name}</h4>
                  <p className="text-[11px] text-cyan-600 dark:text-cyan-400">{cert.issuer}</p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">{cert.description}</p>
                </div>
              ))}
            </Section>
          )}

          <Section title="Intereses">
            <div className="flex flex-wrap gap-1.5">
              {interests.map((interest, i) => (
                <span key={i} className="text-[10px] px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded">
                  {interest}
                </span>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
});

export default CVContent;
