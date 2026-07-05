import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import StarField from '../components/StarField';
import FloatingParticles from '../components/FloatingParticles';
import MusicToggle from '../components/MusicToggle';
import NavDots from '../components/NavDots';
import PageTransition from '../components/PageTransition';
import { GALLERY } from '../content';

function PolaroidCard({ photo, index, onClick }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const rotations = [-3, 2, -1.5, 3, -2.5, 1, -3.5, 2.5];
  const rot = rotations[index % rotations.length];

  return (
    <motion.div
      ref={ref}
      className="polaroid cursor-pointer rounded-sm shadow-2xl"
      style={{ rotate: rot }}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      whileHover={{
        scale: 1.06,
        rotate: 0,
        z: 50,
        transition: { duration: 0.3 },
      }}
      onClick={() => onClick(photo)}
    >
      {/* Photo */}
      <div className="w-full aspect-square bg-gradient-to-br from-purple-deep/60 to-navy-light/60 overflow-hidden relative">
        <img
          src={photo.src}
          alt={`Memory ${photo.id}`}
          className="w-full h-full object-cover"
          onError={e => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div className="absolute inset-0 items-center justify-center flex-col gap-2 text-white/30"
          style={{ display: 'none' }}>
          <span className="text-4xl">📸</span>
          <p className="text-xs font-sans tracking-widest text-center px-2">Add Photo Here</p>
        </div>
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Caption area */}
      <div className="pt-3 pb-1 px-1">
        <p className="font-script text-xs text-white/60 text-center leading-relaxed">
          {photo.caption}
        </p>
      </div>

      {/* Subtle glow on hover */}
      <div className="absolute inset-0 rounded-sm opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: 'inset 0 0 30px rgba(233,30,140,0.1)' }} />
    </motion.div>
  );
}

function Lightbox({ photo, photos, onClose }) {
  const [current, setCurrent] = useState(photos.indexOf(photo));

  const prev = () => setCurrent(c => (c - 1 + photos.length) % photos.length);
  const next = () => setCurrent(c => (c + 1) % photos.length);

  const p = photos[current];

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-midnight/95 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center max-w-2xl w-full px-4">
        {/* Close */}
        <button onClick={onClose} className="absolute -top-12 right-4 text-white/40 hover:text-white transition-colors">
          <X size={28} />
        </button>

        {/* Image */}
        <motion.div
          key={current}
          className="polaroid w-full max-w-md mx-auto"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="aspect-[4/3] bg-gradient-to-br from-purple-deep/60 to-navy-light/60 overflow-hidden">
            <img
              src={p.src}
              alt={`Memory ${p.id}`}
              className="w-full h-full object-cover"
              onError={e => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="w-full h-full items-center justify-center flex-col gap-2 text-white/30"
              style={{ display: 'none' }}>
              <span className="text-5xl">📸</span>
              <p className="text-sm font-sans">Add Your Photo Here</p>
            </div>
          </div>
          <div className="pt-4 pb-2 px-2 text-center">
            <p className="font-script text-lg text-white/80">{p.caption}</p>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center gap-8 mt-6">
          <button onClick={prev} className="text-white/40 hover:text-white transition-colors p-2">
            <ChevronLeft size={28} />
          </button>
          <span className="font-sans text-xs text-white/30">{current + 1} / {photos.length}</span>
          <button onClick={next} className="text-white/40 hover:text-white transition-colors p-2">
            <ChevronRight size={28} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const navigate = useNavigate();
  const [lightboxPhoto, setLightboxPhoto] = useState(null);

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-cinematic overflow-x-hidden">
        <StarField count={150} showShootingStars />
        <FloatingParticles count={10} shapes={['✦', '·', '✧']} />
        <MusicToggle />
        <NavDots />

        <div className="relative z-10 py-24 px-4 max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-sans text-xs tracking-[0.4em] uppercase text-rose-soft/60 mb-4">✦ Our Gallery ✦</p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl gradient-text-gold mb-4">
              {GALLERY.heading}
            </h1>
            <p className="font-romantic text-xl text-white/50 italic">{GALLERY.subheading}</p>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {GALLERY.photos.map((photo, i) => (
              <PolaroidCard
                key={photo.id}
                photo={photo}
                index={i}
                onClick={setLightboxPhoto}
              />
            ))}
          </div>

          {/* Next button */}
          <motion.div
            className="flex justify-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => navigate('/reasons')}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="group glass-rose rounded-full px-8 py-4 font-sans text-sm text-white/80 tracking-widest uppercase hover:text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(233,30,140,0.2)]"
            >
              And The Reasons I Love You →
            </motion.button>
          </motion.div>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxPhoto && (
            <Lightbox
              photo={lightboxPhoto}
              photos={GALLERY.photos}
              onClose={() => setLightboxPhoto(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
