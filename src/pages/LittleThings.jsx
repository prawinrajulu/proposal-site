import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import StarField from '../components/StarField';
import FloatingParticles from '../components/FloatingParticles';
import MusicToggle from '../components/MusicToggle';
import NavDots from '../components/NavDots';
import PageTransition from '../components/PageTransition';
import { LITTLE_THINGS, NAMES } from '../content';
import { ChevronRight } from 'lucide-react';

function FeatureCard({ card, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      className="glass-rose rounded-2xl p-8 flex flex-col items-center text-center gap-4 group hover:border-rose-romantic/40 transition-all duration-500 cursor-default relative overflow-hidden"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      whileHover={{
        y: -8,
        boxShadow: '0 25px 60px rgba(233,30,140,0.15), 0 0 20px rgba(233,30,140,0.05)',
        transition: { duration: 0.3 },
      }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(233,30,140,0.06) 0%, transparent 70%)' }} />

      <motion.span
        className="text-5xl"
        animate={inView ? { scale: [1, 1.15, 1] } : {}}
        transition={{ delay: index * 0.08 + 0.4, duration: 0.5 }}
      >
        {card.icon}
      </motion.span>

      <div className="w-8 h-px bg-gradient-to-r from-transparent via-rose-romantic/40 to-transparent" />

      <p className="font-romantic text-lg sm:text-xl text-white/80 leading-relaxed italic group-hover:text-white transition-colors duration-300">
        "{card.text}"
      </p>
    </motion.div>
  );
}

export default function LittleThings() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-cinematic overflow-x-hidden">
        <StarField count={150} showShootingStars />
        <FloatingParticles count={15} shapes={['❤', '♡', '✦']} />
        <MusicToggle />
        <NavDots />

        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-30"
          style={{ background: 'radial-gradient(ellipse, rgba(233,30,140,0.1) 0%, transparent 70%)' }} />

        <div className="relative z-10 py-24 px-4 max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-sans text-xs tracking-[0.4em] uppercase text-rose-soft/60 mb-4">✦ Simple Details ✦</p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl gradient-text-rose mb-4">
              {LITTLE_THINGS.heading}
            </h1>
            <p className="font-romantic text-xl text-white/50 italic">{LITTLE_THINGS.subheading}</p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
            {LITTLE_THINGS.cards.map((card, i) => (
              <FeatureCard key={card.id} card={card} index={i} />
            ))}
          </div>

          {/* Next Button */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => navigate('/what-i-feel')}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center gap-3 rounded-full px-10 py-4 font-sans text-sm text-white tracking-widest uppercase transition-all duration-300 glow-rose"
              style={{ background: 'linear-gradient(135deg, #e91e8c, #7c3aed)' }}
            >
              <span>{LITTLE_THINGS.ctaButton}</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
