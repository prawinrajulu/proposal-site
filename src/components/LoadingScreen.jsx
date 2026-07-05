import { motion, AnimatePresence } from 'framer-motion';
import StarField from './StarField';

export default function LoadingScreen({ onComplete }) {
  return (
    <AnimatePresence>
      <motion.div
        key="loading"
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cinematic"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      >
        <StarField count={120} showShootingStars={false} />

        <div className="relative z-10 flex flex-col items-center gap-8">
          {/* Animated ring */}
          <div className="relative flex items-center justify-center">
            <motion.div
              className="w-24 h-24 rounded-full border-2 border-rose-romantic/30"
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute w-16 h-16 rounded-full border border-gold-warm/40"
              animate={{ scale: [1.1, 0.8, 1.1], opacity: [0.6, 0.2, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            />
            <motion.span
              className="absolute text-4xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              ❤️
            </motion.span>
          </div>

          {/* Text */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <p className="font-romantic text-2xl md:text-3xl text-white/80 tracking-widest mb-2">
              Preparing Something Special…
            </p>
            <p className="font-sans text-sm text-white/40 tracking-[0.3em] uppercase">
              Just a moment
            </p>
          </motion.div>

          {/* Progress bar */}
          <motion.div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #e91e8c, #d4a853)',
              }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.2, ease: 'easeInOut' }}
              onAnimationComplete={onComplete}
            />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
