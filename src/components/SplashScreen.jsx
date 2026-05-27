import { motion, AnimatePresence } from 'framer-motion';
import AnimatedLogo from './AnimatedLogo';

export default function SplashScreen({ isVisible }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="scale-150"
          >
            <AnimatedLogo size="large" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
