import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import StarField from '../components/StarField';
import MusicToggle from '../components/MusicToggle';
import NavDots from '../components/NavDots';
import PageTransition from '../components/PageTransition';
import { LETTER, COUPLE } from '../content';
import { ChevronRight } from 'lucide-react';

// Typewriter hook
function useTypewriter(text, speed = 28, startDelay = 400) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const idxRef = useRef(0);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    idxRef.current = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (idxRef.current >= text.length) {
          clearInterval(interval);
          setDone(true);
          return;
        }
        idxRef.current++;
        setDisplayed(text.slice(0, idxRef.current));
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayed, done };
}

// Envelope Animation States: 'closed' | 'opening' | 'open'
export default function Letter() {
  const navigate = useNavigate();
  const [envelopeState, setEnvelopeState] = useState('closed');
  const [showLetter, setShowLetter] = useState(false);
  const [showWaxSeal, setShowWaxSeal] = useState(true);

  const { displayed, done } = useTypewriter(
    LETTER.body,
    20,
    showLetter ? 600 : 99999
  );

  const openEnvelope = () => {
    if (envelopeState !== 'closed') return;
    setEnvelopeState('opening');
    setShowWaxSeal(false);
    setTimeout(() => {
      setEnvelopeState('open');
      setTimeout(() => setShowLetter(true), 500);
    }, 1000);
  };

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-cinematic overflow-x-hidden flex flex-col items-center justify-center py-20 px-4">
        <StarField count={150} />
        <MusicToggle />
        <NavDots />

        {/* Background glow */}
        <div className="fixed inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(212,168,83,0.06) 0%, transparent 65%)' }} />

        <div className="relative z-10 w-full max-w-2xl">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-sans text-xs tracking-[0.4em] uppercase text-gold-warm/60 mb-3">✦ A Letter For You ✦</p>
            <h1 className="font-serif text-4xl sm:text-5xl gradient-text-gold">Open Me</h1>
          </motion.div>

          {/* Envelope */}
          <AnimatePresence mode="wait">
            {!showLetter ? (
              <motion.div
                key="envelope"
                className="relative w-full max-w-md mx-auto"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, y: -40 }}
                transition={{ duration: 0.5 }}
              >
                {/* Envelope body */}
                <div
                  className={`relative cursor-pointer select-none ${envelopeState === 'closed' ? 'hover:scale-[1.02]' : ''} transition-transform duration-300`}
                  onClick={openEnvelope}
                  style={{ filter: envelopeState === 'opening' ? 'brightness(1.1)' : undefined }}
                >
                  {/* Envelope base */}
                  <div className="glass-gold rounded-xl aspect-[1.6/1] w-full flex items-end justify-center overflow-hidden relative"
                    style={{ minHeight: 260 }}>
                    {/* Back panel */}
                    <div className="absolute inset-0 rounded-xl"
                      style={{ background: 'linear-gradient(160deg, rgba(212,168,83,0.15) 0%, rgba(59,7,100,0.2) 100%)' }} />

                    {/* Flap */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-1/2 origin-top"
                      animate={envelopeState === 'opening' ? { rotateX: -180, opacity: 0 } : { rotateX: 0, opacity: 1 }}
                      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <div className="w-full h-full"
                        style={{
                          background: 'linear-gradient(160deg, rgba(212,168,83,0.2) 0%, rgba(59,7,100,0.3) 100%)',
                          clipPath: 'polygon(0 0, 50% 80%, 100% 0)',
                          borderTop: '1px solid rgba(212,168,83,0.3)',
                        }} />
                    </motion.div>

                    {/* Left triangle */}
                    <div className="absolute bottom-0 left-0 w-1/2 h-full"
                      style={{
                        background: 'linear-gradient(135deg, rgba(212,168,83,0.08) 0%, rgba(59,7,100,0.15) 100%)',
                        clipPath: 'polygon(0 0, 0 100%, 100% 100%)',
                      }} />
                    {/* Right triangle */}
                    <div className="absolute bottom-0 right-0 w-1/2 h-full"
                      style={{
                        background: 'linear-gradient(225deg, rgba(212,168,83,0.08) 0%, rgba(59,7,100,0.15) 100%)',
                        clipPath: 'polygon(100% 0, 0 100%, 100% 100%)',
                      }} />

                    {/* Bottom triangle */}
                    <div className="absolute bottom-0 left-0 right-0 h-1/2"
                      style={{
                        background: 'linear-gradient(0deg, rgba(212,168,83,0.1) 0%, rgba(59,7,100,0.2) 100%)',
                        clipPath: 'polygon(0 100%, 50% 0, 100% 100%)',
                      }} />

                    {/* Wax seal */}
                    <AnimatePresence>
                      {showWaxSeal && (
                        <motion.div
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center z-10 wax-seal-enter"
                          exit={{ scale: 0, opacity: 0, rotate: 20 }}
                          transition={{ duration: 0.4 }}
                          style={{
                            background: 'radial-gradient(circle, #be185d 0%, #7c3aed 100%)',
                            boxShadow: '0 0 20px rgba(190,24,93,0.6), 0 4px 15px rgba(0,0,0,0.4)',
                          }}
                        >
                          <span className="text-2xl">❤</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {envelopeState === 'closed' && (
                    <motion.p
                      className="text-center mt-4 font-romantic text-gold-warm/70 italic text-sm"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Click to open your letter…
                    </motion.p>
                  )}
                  {envelopeState === 'opening' && (
                    <p className="text-center mt-4 font-romantic text-gold-warm/70 italic text-sm">
                      Opening…
                    </p>
                  )}
                </div>
              </motion.div>
            ) : (
              /* Letter card */
              <motion.div
                key="letter"
                className="w-full"
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="glass-gold rounded-2xl p-8 sm:p-12 relative overflow-hidden"
                  style={{ boxShadow: '0 0 60px rgba(212,168,83,0.1), 0 25px 60px rgba(0,0,0,0.4)' }}>
                  {/* Paper texture overlay */}
                  <div className="absolute inset-0 opacity-5 pointer-events-none"
                    style={{
                      backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(212,168,83,0.3) 28px, rgba(212,168,83,0.3) 29px)`,
                    }} />

                  {/* Corner ornament */}
                  <div className="absolute top-4 left-4 text-gold-warm/20 text-2xl">❧</div>
                  <div className="absolute top-4 right-4 text-gold-warm/20 text-2xl" style={{ transform: 'scaleX(-1)' }}>❧</div>
                  <div className="absolute bottom-4 left-4 text-gold-warm/20 text-2xl" style={{ transform: 'scaleY(-1)' }}>❧</div>
                  <div className="absolute bottom-4 right-4 text-gold-warm/20 text-2xl" style={{ transform: 'scale(-1)' }}>❧</div>

                  <div className="relative z-10">
                    {/* Salutation */}
                    <motion.p
                      className="font-script text-2xl text-gold-warm mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {LETTER.salutation}
                    </motion.p>

                    {/* Body with typewriter */}
                    <div className="font-romantic text-lg sm:text-xl text-white/80 leading-relaxed whitespace-pre-line mb-8">
                      {displayed}
                      {!done && <span className="typewriter-cursor" />}
                    </div>

                    {/* Closing */}
                    <AnimatePresence>
                      {done && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6 }}
                        >
                          <div className="my-6 flex items-center gap-4">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-warm/30" />
                            <span className="text-gold-warm text-lg">❤</span>
                            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-warm/30" />
                          </div>
                          <p className="font-romantic text-lg text-white/50 italic">{LETTER.closing}</p>
                          <p className="font-script text-3xl text-gold-warm mt-1">{LETTER.signature}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Next button */}
                <AnimatePresence>
                  {done && (
                    <motion.div
                      className="flex justify-center mt-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <motion.button
                        onClick={() => navigate('/proposal')}
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.97 }}
                        className="group flex items-center gap-3 rounded-full px-10 py-4 font-sans text-sm text-white tracking-widest uppercase glow-rose animate-pulse-glow"
                        style={{ background: 'linear-gradient(135deg, #e91e8c, #be185d, #7c3aed)' }}
                      >
                        Read The Question
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}
