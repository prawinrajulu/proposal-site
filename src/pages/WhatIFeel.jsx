import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import StarField from '../components/StarField';
import FloatingParticles from '../components/FloatingParticles';
import NavDots from '../components/NavDots';
import PageTransition from '../components/PageTransition';
import { WHAT_I_FEEL } from '../content';
import { ChevronRight } from 'lucide-react';

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.4 } },
};

const lineVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function WhatIFeel() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-cinematic overflow-hidden flex flex-col items-center justify-center py-24 px-4">
        <StarField count={180} showShootingStars />
        <FloatingParticles count={12} shapes={['✦', '✧', '·']} />
        <NavDots />

        {/* Abstract Glowing Silhouette / Moon representation */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] rounded-full pointer-events-none filter blur-[80px]"
          style={{
            background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, rgba(233,30,140,0.08) 50%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-3xl w-full flex flex-col items-center text-center">
          {/* Header */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-sans text-xs tracking-[0.4em] uppercase text-gold-warm/60 mb-4">✦ My Feelings ✦</p>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl gradient-text-gold mb-4">
              {WHAT_I_FEEL.heading}
            </h1>
            <p className="font-romantic text-lg text-white/40 italic">{WHAT_I_FEEL.subheading}</p>
          </motion.div>

          {/* Staggered Lines */}
          <motion.div
            className="flex flex-col gap-6 sm:gap-8 mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {WHAT_I_FEEL.lines.map((line, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center gap-3 sm:gap-4"
                variants={lineVariants}
              >
                <span className="text-rose-soft/40 text-sm">✦</span>
                <p className="font-romantic text-2xl sm:text-3xl md:text-4xl text-white/80 italic font-light">
                  {line}
                </p>
                <span className="text-rose-soft/40 text-sm">✦</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Next Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.8 }}
          >
            <motion.button
              onClick={() => navigate('/before-i-ask')}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center gap-3 glass-gold rounded-full px-8 py-4 font-sans text-sm text-gold-warm tracking-widest uppercase hover:text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,168,83,0.25)]"
            >
              <span>{WHAT_I_FEEL.ctaButton}</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
