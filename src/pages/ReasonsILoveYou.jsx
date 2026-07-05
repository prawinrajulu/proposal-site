import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import StarField from '../components/StarField';
import FloatingParticles from '../components/FloatingParticles';
import MusicToggle from '../components/MusicToggle';
import NavDots from '../components/NavDots';
import PageTransition from '../components/PageTransition';
import { REASONS } from '../content';
import { ChevronRight } from 'lucide-react';

function ReasonCard({ card, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      className="glass-rose rounded-2xl p-6 flex flex-col items-center text-center gap-3 group hover:border-rose-romantic/40 transition-all duration-500 cursor-default relative overflow-hidden"
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
      whileHover={{
        y: -8,
        boxShadow: '0 25px 60px rgba(233,30,140,0.2), 0 0 30px rgba(233,30,140,0.1)',
        transition: { duration: 0.3 },
      }}
    >
      {/* Glow blob on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(233,30,140,0.08) 0%, transparent 70%)' }} />

      {/* Number badge */}
      <div className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-sans font-bold text-white/40 border border-white/10">
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Icon */}
      <motion.span
        className="text-4xl"
        animate={inView ? { scale: [1, 1.15, 1] } : {}}
        transition={{ delay: index * 0.06 + 0.4, duration: 0.5 }}
      >
        {card.icon}
      </motion.span>

      {/* Divider */}
      <div className="w-8 h-px bg-gradient-to-r from-transparent via-rose-romantic/50 to-transparent" />

      {/* Reason text */}
      <p className="font-romantic text-base sm:text-lg text-white/80 leading-relaxed italic group-hover:text-white/95 transition-colors duration-300">
        "{card.reason}"
      </p>
    </motion.div>
  );
}

export default function ReasonsILoveYou() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-cinematic overflow-x-hidden">
        <StarField count={150} showShootingStars />
        <FloatingParticles count={14} shapes={['❤', '♡', '✦']} />
        <MusicToggle />
        <NavDots />

        {/* Glow accent */}
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-30"
          style={{ background: 'radial-gradient(ellipse, rgba(233,30,140,0.12) 0%, transparent 70%)' }} />

        <div className="relative z-10 py-24 px-4 max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-sans text-xs tracking-[0.4em] uppercase text-rose-soft/60 mb-4">✦ From My Heart ✦</p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl gradient-text-rose mb-4">
              {REASONS.heading}
            </h1>
            <p className="font-romantic text-xl text-white/50 italic">{REASONS.subheading}</p>
          </motion.div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16">
            {REASONS.cards.map((card, i) => (
              <ReasonCard key={card.id} card={card} index={i} />
            ))}

            {/* Extra centered card if odd number */}
            {REASONS.cards.length % 3 === 1 && <div className="hidden lg:block" />}
          </div>

          {/* Closing line */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-romantic text-2xl text-white/60 italic">
              "…and a thousand more reasons I could never finish writing."
            </p>
          </motion.div>

          {/* Next button */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => navigate('/letter')}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center gap-3 rounded-full px-10 py-4 font-sans text-sm text-white tracking-widest uppercase transition-all duration-300 glow-rose"
              style={{ background: 'linear-gradient(135deg, #e91e8c, #7c3aed)' }}
            >
              <span>One Last Thing…</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
