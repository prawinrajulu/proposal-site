import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import StarField from '../components/StarField';
import FloatingParticles from '../components/FloatingParticles';
import MusicToggle from '../components/MusicToggle';
import PageTransition from '../components/PageTransition';
import { NAMES, LANDING } from '../content';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function Landing() {
  const navigate = useNavigate();

  // Moon glow parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = e => setMousePos({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 });
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <PageTransition>
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-cinematic">
        <StarField count={220} showShootingStars />
        <FloatingParticles count={16} />
        <MusicToggle />

        {/* Moon glow */}
        <div
          className="fixed top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none z-0 transition-transform duration-100"
          style={{
            background: 'radial-gradient(ellipse, rgba(212,168,83,0.06) 0%, rgba(59,7,100,0.08) 50%, transparent 75%)',
            transform: `translate(calc(-50% + ${mousePos.x * 30}px), ${mousePos.y * 20}px)`,
          }}
        />
        {/* Nebula glow bottom */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full h-64 pointer-events-none z-0"
          style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(124,58,237,0.12) 0%, transparent 70%)' }} />

        {/* Main content */}
        <motion.div
          className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Small eyebrow */}
          <motion.p variants={item} className="font-sans text-xs tracking-[0.4em] uppercase text-rose-soft/70 mb-6">
            ✦ For {NAMES.girlName} ✦
          </motion.p>

          {/* Main heading */}
          <motion.h1 variants={item} className="font-serif font-bold leading-tight mb-2">
            <span className="block text-4xl sm:text-5xl md:text-7xl text-white/90 text-glow-white">
              {LANDING.heading}
            </span>
            <span className="block text-4xl sm:text-5xl md:text-7xl gradient-text-rose mt-1 text-balance">
              {LANDING.headingAccent}
            </span>
          </motion.h1>

          {/* Divider */}
          <motion.div variants={item} className="my-8 flex items-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-romantic/50" />
            <span className="text-rose-romantic text-xl animate-heart-beat">❤</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose-romantic/50" />
          </motion.div>

          {/* Subheading */}
          <motion.p variants={item} className="font-romantic text-xl sm:text-2xl md:text-3xl text-white/70 italic max-w-2xl leading-relaxed mb-12">
            "{LANDING.subheading}"
          </motion.p>

          {/* CTA Button */}
          <motion.button
            variants={item}
            onClick={() => navigate('/little-things')}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="relative group overflow-hidden rounded-full px-12 py-4 font-sans font-medium text-white tracking-widest text-sm uppercase glow-rose transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #e91e8c, #be185d, #7c3aed)',
            }}
          >
            {/* Shimmer overlay */}
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.2) 50%, transparent 65%)', backgroundSize: '200% 100%', animation: 'shimmerBtn 1.5s linear infinite' }} />
            <span className="relative flex items-center gap-2">
              {LANDING.ctaButton}
              <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
            </span>
          </motion.button>
        </motion.div>


        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <span className="text-white/20 text-xs tracking-widest uppercase font-sans">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </div>
    </PageTransition>
  );
}
