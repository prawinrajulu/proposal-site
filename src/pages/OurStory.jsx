import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import StarField from '../components/StarField';
import MusicToggle from '../components/MusicToggle';
import NavDots from '../components/NavDots';
import PageTransition from '../components/PageTransition';
import { TIMELINE } from '../content';
import { ChevronRight, Calendar } from 'lucide-react';

function TimelineCard({ event, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className={`relative flex items-center gap-4 md:gap-8 mb-16 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col`}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
    >
      {/* Card */}
      <div className="w-full md:w-5/12">
        <div className="glass-rose rounded-2xl overflow-hidden group hover:border-rose-romantic/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(233,30,140,0.15)]">
          {/* Photo */}
          <div className="relative h-48 bg-gradient-to-br from-purple-deep/50 to-navy-light/50 overflow-hidden flex items-center justify-center">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              onError={e => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="absolute inset-0 items-center justify-center hidden flex-col gap-2"
              style={{ display: 'none' }}>
              <span className="text-5xl">{event.imageFallback}</span>
              <p className="text-xs text-white/30 font-sans tracking-widest uppercase">Add your photo</p>
            </div>
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 to-transparent" />
            {/* Step number */}
            <div className="absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center text-xs font-sans font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #e91e8c, #7c3aed)' }}>
              {index + 1}
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={12} className="text-gold-warm" />
              <span className="font-sans text-xs text-gold-warm/80 tracking-widest">{event.date}</span>
            </div>
            <h3 className="font-serif text-xl text-white/95 mb-2">{event.title}</h3>
            <p className="font-sans text-sm text-white/60 leading-relaxed">{event.description}</p>
          </div>
        </div>
      </div>

      {/* Center dot */}
      <div className="hidden md:flex w-2/12 justify-center items-start pt-24">
        <div className="relative">
          <div className="w-4 h-4 rounded-full bg-rose-romantic shadow-[0_0_15px_rgba(233,30,140,0.8)] animate-pulse" />
          <div className="absolute -inset-2 rounded-full border border-rose-romantic/30 animate-ping" />
        </div>
      </div>

      {/* Spacer for alternating layout */}
      <div className="hidden md:block w-5/12" />
    </motion.div>
  );
}

export default function OurStory() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-cinematic overflow-x-hidden">
        <StarField count={150} showShootingStars />
        <MusicToggle />
        <NavDots />

        {/* Nebula top */}
        <div className="fixed top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, transparent 70%)' }} />

        <div className="relative z-10 py-24 px-4 max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-sans text-xs tracking-[0.4em] uppercase text-rose-soft/60 mb-4">✦ Our Journey ✦</p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl gradient-text-rose mb-4">Our Story</h1>
            <p className="font-romantic text-xl text-white/50 italic">Every chapter, every moment, every memory.</p>
          </motion.div>

          {/* Timeline vertical line (mobile) */}
          <div className="absolute left-6 md:left-1/2 top-44 bottom-32 w-px timeline-line opacity-30 hidden md:block" />

          {/* Timeline cards */}
          <div className="relative">
            {TIMELINE.map((event, i) => (
              <TimelineCard key={event.id} event={event} index={i} />
            ))}
          </div>

          {/* Next button */}
          <motion.div
            className="flex justify-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.button
              onClick={() => navigate('/gallery')}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center gap-3 glass-rose rounded-full px-8 py-4 font-sans text-sm text-white/80 tracking-widest uppercase hover:text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(233,30,140,0.2)]"
            >
              <span>Next Memory</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
