import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import StarField from '../components/StarField';
import FloatingParticles from '../components/FloatingParticles';
import NavDots from '../components/NavDots';
import PageTransition from '../components/PageTransition';
import { PROPOSAL, NAMES } from '../content';

// Rose petal falling animation
function RosePetals() {
  const petals = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 6,
    duration: Math.random() * 4 + 5,
    size: Math.random() * 16 + 10,
    color: ['#e91e8c', '#f472b6', '#be185d', '#fce7f3', '#d4a853'][Math.floor(Math.random() * 5)],
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {petals.map(p => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: '-5%',
            fontSize: `${p.size}px`,
            color: p.color,
            animation: `petalFall ${p.duration}s ${p.delay}s linear infinite`,
            filter: 'blur(0.5px)',
            opacity: 0.7,
          }}
        >
          {['🌸', '🌹', '✦', '❤', '·'][Math.floor(Math.random() * 5)]}
        </div>
      ))}
    </div>
  );
}

// Celebration fireworks
function launchFireworks() {
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 99 };

  const randomInRange = (min, max) => Math.random() * (max - min) + min;

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) { clearInterval(interval); return; }

    const particleCount = 50 * (timeLeft / duration);

    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#e91e8c', '#f472b6', '#d4a853', '#a78bfa', '#ffffff'],
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#e91e8c', '#f472b6', '#d4a853', '#a78bfa', '#ffffff'],
    });
  }, 250);
}

// Dodging "I Need A Moment" button
function DodgeButton({ label }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);
  const clicks = useRef(0);
  const [surrendered, setSurrendered] = useState(false);
  const [tooltip, setTooltip] = useState('');
  const tooltips = ['Are you sure? 🥺', 'Think again! 😅', 'Wait a second…', 'Please? ❤️', 'Almost clicked it!'];

  const dodge = useCallback(() => {
    clicks.current++;
    if (clicks.current >= 5) {
      setSurrendered(true);
      return;
    }
    
    const buttonWidth = 160;
    const buttonHeight = 45;
    const padding = 50;
    
    // Calculate random position in the viewport
    const randomX = Math.random() * (window.innerWidth - buttonWidth - padding * 2) + padding;
    const randomY = Math.random() * (window.innerHeight - buttonHeight - padding * 2) + padding;
    
    setPos({ x: randomX, y: randomY });
    setHasMoved(true);
    
    setTooltip(tooltips[clicks.current - 1] || 'Still thinking… ❤️');
    setTimeout(() => setTooltip(''), 1200);
  }, []);

  if (surrendered) return null;

  return (
    <div className={hasMoved ? '' : 'relative'}>
      <motion.button
        className={`${hasMoved ? 'fixed z-50' : 'relative'} glass rounded-full px-6 py-3 font-sans text-sm text-white/50 tracking-widest hover:text-white/70 transition-colors duration-200`}
        style={hasMoved ? { left: `${pos.x}px`, top: `${pos.y}px` } : {}}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        onHoverStart={dodge}
        whileTap={{ scale: 0.95 }}
      >
        {label}
        
        <AnimatePresence>
          {tooltip && (
            <motion.div
              className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap font-romantic text-sm text-rose-soft bg-midnight-200/90 px-3 py-1 rounded-full pointer-events-none"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {tooltip}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

export default function Proposal() {
  const navigate = useNavigate();
  const [answered, setAnswered] = useState(false);
  const hasSentNotification = useRef(false);

  const handleYes = () => {
    // Start celebration instantly
    setAnswered(true);
    launchFireworks();

    // Send Telegram notification in background only once per session
    if (!hasSentNotification.current) {
      hasSentNotification.current = true;
      const apiUrl = import.meta.env.VITE_API_URL;
      
      if (!apiUrl) {
        console.error('API Error: VITE_API_URL is not defined in the environment configuration.');
        return;
      }
      
      fetch(`${apiUrl}/api/proposal-accepted`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'proposal_accepted',
          timestamp: new Date().toISOString(),
          source: 'proposal website'
        })
      })
      .then(res => res.json())
      .then(data => console.log('Notification status:', data))
      .catch(err => console.error('Notification failed to send:', err));
    }
  };

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-proposal flex flex-col items-center justify-center overflow-hidden px-4">
        <StarField count={250} showShootingStars />
        <FloatingParticles count={20} shapes={['❤', '♡', '✦', '·']} />
        <RosePetals />
        <NavDots />

        {/* Moonlight glow center */}
        <div className="fixed top-[-5%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(212,168,83,0.08) 0%, rgba(233,30,140,0.05) 40%, transparent 70%)' }} />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl w-full">
          <AnimatePresence mode="wait">
            {!answered ? (
              /* Proposal Scene */
              <motion.div
                key="question"
                className="flex flex-col items-center gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6 }}
              >
                {/* Ring Ring Ring */}
                <motion.div
                  className="relative"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8, type: 'spring', bounce: 0.5 }}
                >
                  <div className="w-28 h-28 rounded-full flex items-center justify-center relative"
                    style={{
                      background: 'radial-gradient(circle, rgba(233,30,140,0.2) 0%, rgba(212,168,83,0.1) 50%, transparent 70%)',
                      boxShadow: '0 0 60px rgba(233,30,140,0.3), 0 0 120px rgba(233,30,140,0.1)',
                    }}>
                    <span className="text-6xl animate-heart-beat">💍</span>
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-full border border-rose-romantic/20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  />
                </motion.div>

                {/* Eyebrow / Intro Lines */}
                <div className="flex flex-col gap-2">
                  <motion.p
                    className="font-romantic text-xl sm:text-2xl text-white/70 italic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    "{PROPOSAL.introLine1}"
                  </motion.p>
                  <motion.p
                    className="font-romantic text-xl sm:text-2xl text-white/70 italic"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    "{PROPOSAL.introLine2}"
                  </motion.p>
                </div>

                {/* Main question */}
                <motion.h1
                  className="font-serif font-bold text-5xl sm:text-6xl md:text-7xl leading-tight text-glow-rose px-2"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #f472b6 50%, #d4a853 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 1.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {PROPOSAL.question}
                </motion.h1>

                <motion.p
                  className="font-romantic text-lg text-white/40 italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  — {NAMES.boyName}
                </motion.p>

                {/* Buttons */}
                <motion.div
                  className="flex flex-wrap items-center justify-center gap-6 mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 }}
                >
                  {/* YES button */}
                  <motion.button
                    onClick={handleYes}
                    whileHover={{ scale: 1.1, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative overflow-hidden rounded-full px-12 py-5 font-sans font-semibold text-white text-base tracking-widest uppercase glow-rose transition-all duration-300"
                    style={{ background: 'linear-gradient(135deg, #e91e8c, #be185d, #d4a853)' }}
                  >
                    <span className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity"
                      style={{ background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.25) 50%, transparent 65%)', backgroundSize: '200%', animation: 'shimmerBtn 1.5s linear infinite' }} />
                    <span className="relative">{PROPOSAL.yesButton}</span>
                  </motion.button>

                  {/* Dodge Button */}
                  <DodgeButton label={PROPOSAL.maybeButton} />
                </motion.div>
              </motion.div>
            ) : (
              /* Celebration Scene */
              <motion.div
                key="celebration"
                className="flex flex-col items-center gap-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  className="relative flex items-center justify-center"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="w-40 h-40 rounded-full flex items-center justify-center"
                    style={{
                      background: 'radial-gradient(circle, rgba(233,30,140,0.3) 0%, transparent 70%)',
                      boxShadow: '0 0 80px rgba(233,30,140,0.5), 0 0 160px rgba(233,30,140,0.2)',
                    }}>
                    <motion.span
                      className="text-8xl"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      ❤️
                    </motion.span>
                  </div>
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-8 rounded-full"
                      style={{
                        background: 'linear-gradient(180deg, #e91e8c, transparent)',
                        transformOrigin: '50% 80px',
                        transform: `rotate(${deg}deg)`,
                      }}
                      animate={{ opacity: [1, 0.3, 1], scaleY: [1, 0.6, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </motion.div>

                {/* Celebration Messages */}
                <motion.h1
                  className="font-serif text-4xl sm:text-5xl md:text-6xl text-center leading-tight px-2"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #f472b6 50%, #d4a853 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: 'none',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {PROPOSAL.celebrationHeading}
                </motion.h1>

                <motion.p
                  className="font-romantic text-2xl text-white/60 italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  {PROPOSAL.celebrationSub}
                </motion.p>

                <motion.p
                  className="font-romantic text-xl text-gold-warm italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  — {NAMES.boyName} & {NAMES.girlName}
                </motion.p>

                {/* Replay */}
                <motion.button
                  onClick={() => navigate('/')}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-4 glass rounded-full px-8 py-4 font-sans text-sm text-white/70 tracking-widest uppercase hover:text-white transition-all duration-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  {PROPOSAL.replayButton}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}
