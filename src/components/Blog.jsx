import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const codeSnippet = `@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(dto);
    const token = await this.authService.generateToken({
      sub: user.id,
      role: user.role,    // 'admin' | 'user' | 'client'
    });
    return { token, user };
  }
}`;

export default function Blog() {
  const { t } = useTranslation();
  const { ref, isVisible } = useInView(0.1);
  const post = t('blog.post', { returnObjects: true });

  return (
    <section id="blog" className="relative py-16 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-gray-100/50 to-gray-50 dark:from-gray-950 dark:via-gray-900/30 dark:to-gray-950 pointer-events-none" />

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
            <span className="text-gradient">/</span> {t('blog.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-6" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="glass rounded-xl overflow-hidden card-hover border border-gray-200/50 dark:border-gray-700/50">
            <div className="px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-mono text-emerald-400">{post.tag}</span>
              </div>
              <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">{post.date}</span>
            </div>

            <div className="p-6 md:p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{post.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">{post.intro}</p>

              <div className="space-y-4 mb-6">
                {post.sections.map((section, i) => (
                  <div key={i}>
                    <h4 className="text-emerald-400 font-semibold text-sm mb-1">{section.heading}</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{section.body}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white/80 dark:bg-gray-900/80 rounded-xl p-4 mb-6 overflow-x-auto border border-gray-200 dark:border-gray-800">
                <pre className="text-xs font-mono text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre">{codeSnippet}</pre>
              </div>

              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">{post.conclusion}</p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 text-xs font-mono text-teal-400 bg-teal-500/10 rounded-md border border-teal-500/20">
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href="https://github.com/Manuel-Adolfo-Soto/Afer-Bolivia-backend"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-emerald-400 hover:underline"
                >
                  {t('blog.viewCode')} →
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8"
        >
          <div className="glass rounded-xl p-6 text-center border border-dashed border-gray-200/50 dark:border-gray-700/50">
            <p className="text-gray-400 dark:text-gray-500 text-sm font-mono">{t('blog.nextPost')}</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
