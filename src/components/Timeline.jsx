import { timeline } from '../data/projects';
import { useInView } from '../hooks/useInView';

export default function Timeline() {
  const { ref, isVisible } = useInView();

  return (
    <section id="trayectoria" className="py-20 px-4 bg-slate-900/30">
      <div
        ref={ref}
        className={`max-w-3xl mx-auto transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          <span className="text-gradient">&lt;</span> Trayectoria{' '}
          <span className="text-gradient">/&gt;</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full mb-10" />

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 via-violet-500 to-transparent" />

          <div className="space-y-8">
            {timeline.map((item, i) => (
              <div
                key={i}
                className="relative pl-20 group"
                style={{ animationDelay: `${i * 200}ms` }}
              >
                <div className="absolute left-5 top-1 w-6 h-6 rounded-full bg-slate-900 border-2 border-cyan-500 flex items-center justify-center group-hover:border-violet-500 transition-colors z-10">
                  <span className="text-xs">{item.icon}</span>
                </div>

                <div className="glass rounded-xl p-5 card-hover">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm font-bold text-cyan-400 font-mono">{item.year}</span>
                  </div>
                  <h3 className="text-white font-semibold">{item.title}</h3>
                  <p className="text-slate-400 text-sm mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
