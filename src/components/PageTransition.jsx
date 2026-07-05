import { motion, AnimatePresence } from 'framer-motion';

const variants = {
  initial: { opacity: 0, y: 24, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -24, scale: 0.98 },
};

export default function PageTransition({ children, className = '' }) {
  return (
    <motion.div
      className={`page-wrapper ${className}`}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
