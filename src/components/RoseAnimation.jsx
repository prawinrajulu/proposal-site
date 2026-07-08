import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// SVG Elements as components for high performance and no asset dependency
const LeafSVG = () => (
  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-lg">
    <path
      d="M10 90 C 20 60, 40 40, 90 10 C 60 40, 40 60, 10 90"
      fill="url(#leafGrad)"
    />
    <path
      d="M10 90 Q 50 50 90 10"
      stroke="#14532d"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <defs>
      <linearGradient id="leafGrad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#15803d" />
        <stop offset="50%" stopColor="#166534" />
        <stop offset="100%" stopColor="#14532d" />
      </linearGradient>
    </defs>
  </svg>
);

const RosePetalSVG = ({ colorIndex = 0 }) => {
  const colors = [
    { primary: '#dc2626', secondary: '#991b1b', highlight: '#f87171' },
    { primary: '#be185d', secondary: '#831843', highlight: '#f472b6' },
    { primary: '#e11d48', secondary: '#9f1239', highlight: '#fda4af' },
  ];
  const color = colors[colorIndex % colors.length];

  return (
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-md">
      <path
        d="M50 10 C30 10, 10 30, 15 60 C20 85, 80 85, 85 60 C90 30, 70 10, 50 10 Z"
        fill={`url(#petalGrad-${colorIndex})`}
      />
      <path
        d="M50 10 Q 50 50 50 82"
        stroke={color.secondary}
        strokeWidth="1"
        opacity="0.3"
      />
      <defs>
        <linearGradient id={`petalGrad-${colorIndex}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color.highlight} />
          <stop offset="40%" stopColor={color.primary} />
          <stop offset="100%" stopColor={color.secondary} />
        </linearGradient>
      </defs>
    </svg>
  );
};

const RoseHeadSVG = () => (
  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-xl">
    {/* Outer Petals */}
    <path d="M50 10 C 25 10, 15 40, 25 65 C 35 90, 65 90, 75 65 C 85 40, 75 10, 50 10 Z" fill="#990f1a" />
    <path d="M50 15 C 30 15, 20 45, 30 68 C 40 85, 60 85, 70 68 C 80 45, 70 15, 50 15 Z" fill="#b91c1c" />
    
    {/* Mid Petals */}
    <path d="M50 22 C 35 22, 28 48, 35 65 C 42 78, 58 78, 65 65 C 72 48, 65 22, 50 22 Z" fill="#dc2626" />
    <path d="M50 28 C 40 28, 34 50, 40 62 C 45 72, 55 72, 60 62 C 66 50, 60 28, 50 28 Z" fill="#ef4444" />
    
    {/* Center Bud */}
    <path d="M50 35 C 44 35, 40 48, 44 56 C 47 62, 53 62, 56 56 C 60 48, 56 35, 50 35 Z" fill="#f87171" />
    <circle cx="50" cy="46" r="6" fill="#b91c1c" />
    
    {/* Highlights and details */}
    <path d="M42 42 C 45 38, 55 38, 58 42" stroke="#fecdd3" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
  </svg>
);

const CornerRoseWithStem = ({ rotation = 0 }) => (
  <div style={{ transform: `rotate(${rotation}deg)` }} className="w-40 h-40 relative select-none pointer-events-none opacity-40 md:opacity-50">
    {/* Leaves */}
    <div className="absolute w-12 h-12 left-6 top-16 rotate-[-45deg] scale-x-[-1]">
      <LeafSVG />
    </div>
    <div className="absolute w-14 h-14 right-4 top-12 rotate-[30deg]">
      <LeafSVG />
    </div>
    <div className="absolute w-10 h-10 left-12 top-24 rotate-[15deg]">
      <LeafSVG />
    </div>
    
    {/* Curved Stem */}
    <svg viewBox="0 0 100 100" fill="none" className="absolute inset-0 w-full h-full">
      <path
        d="M20 90 Q 40 70 50 50 T 50 30"
        stroke="#166534"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Thorns */}
      <path d="M35 77 L 28 77 L 33 72 Z" fill="#14532d" />
      <path d="M47 57 L 54 59 L 49 64 Z" fill="#14532d" />
    </svg>

    {/* Main Rose Head */}
    <div className="absolute w-20 h-20 left-1/2 top-4 -translate-x-1/2">
      <RoseHeadSVG />
    </div>
  </div>
);

export default function RoseAnimation() {
  const location = useLocation();
  const [isAccepted, setIsAccepted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [petals, setPetals] = useState([]);
  const [floatingRoses, setFloatingRoses] = useState([]);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Listen for the proposal acceptance event
  useEffect(() => {
    const handleAccepted = () => setIsAccepted(true);
    window.addEventListener('proposal-accepted', handleAccepted);

    // Reset state if we navigate away from proposal page
    if (location.pathname !== '/proposal') {
      setIsAccepted(false);
    }

    return () => {
      window.removeEventListener('proposal-accepted', handleAccepted);
    };
  }, [location.pathname]);

  // Generate petals and floating roses configurations
  useEffect(() => {
    // Determine counts based on device and proposal status
    let petalCount = isMobile ? 10 : 20;
    let roseCount = isMobile ? 2 : 4;

    if (isAccepted) {
      petalCount = isMobile ? 22 : 40;
      roseCount = isMobile ? 4 : 6;
    }

    // Generate Petals
    const newPetals = Array.from({ length: petalCount }, (_, i) => {
      const size = Math.random() * 18 + (isMobile ? 12 : 16);
      const startX = Math.random() * 100;
      // Stagger animation delays to avoid simultaneous clumped spawn
      const delay = Math.random() * -20; // negative delay starts animation midway for smooth load
      const duration = Math.random() * 12 + 10; // slower, premium fall speed
      const drift = Math.random() * 200 - 100; // diagonal drift amount (pixels)
      const colorIndex = Math.floor(Math.random() * 3);
      const initialRotation = Math.random() * 360;
      const rotationSpin = Math.random() * 360 * (Math.random() > 0.5 ? 1 : -1);

      return {
        id: `petal-${i}-${isAccepted ? 'celebrate' : 'normal'}`,
        size,
        startX,
        delay,
        duration,
        drift,
        colorIndex,
        initialRotation,
        rotationSpin,
        opacity: Math.random() * 0.4 + 0.5, // Subtle and premium opacity (0.5 to 0.9)
      };
    });

    // Generate Floating Roses
    const newFloatingRoses = Array.from({ length: roseCount }, (_, i) => {
      const size = Math.random() * 24 + (isMobile ? 24 : 32);
      const startX = Math.random() * 80 + 10; // keep away from absolute edges slightly
      const delay = Math.random() * -25;
      const duration = Math.random() * 15 + 15; // slow rising speed
      const drift = Math.random() * 150 - 75;
      const initialRotation = Math.random() * 360;
      const rotationSpin = Math.random() * 180 * (Math.random() > 0.5 ? 1 : -1);

      return {
        id: `rose-${i}-${isAccepted ? 'celebrate' : 'normal'}`,
        size,
        startX,
        delay,
        duration,
        drift,
        initialRotation,
        rotationSpin,
        opacity: Math.random() * 0.25 + 0.25, // very subtle (0.25 to 0.5) so they don't distract
      };
    });

    setPetals(newPetals);
    setFloatingRoses(newFloatingRoses);
  }, [isMobile, isAccepted]);

  return (
    <div
      className="fixed inset-0 pointer-events-none select-none z-[1] overflow-hidden"
      aria-hidden="true"
    >
      {/* Corner Roses - Fixed Decorative Elements */}
      <div className="absolute top-[-20px] left-[-20px] scale-75 md:scale-100 origin-top-left">
        <CornerRoseWithStem rotation={135} />
      </div>
      <div className="absolute top-[-20px] right-[-20px] scale-75 md:scale-100 origin-top-right">
        <CornerRoseWithStem rotation={-135} />
      </div>
      
      {/* Bottom corners decorative elements */}
      <div className="absolute bottom-[-30px] left-[-30px] scale-75 md:scale-100 origin-bottom-left">
        <CornerRoseWithStem rotation={45} />
      </div>
      <div className="absolute bottom-[-30px] right-[-30px] scale-75 md:scale-100 origin-bottom-right">
        <CornerRoseWithStem rotation={-45} />
      </div>

      {/* Floating Petals Layer */}
      <AnimatePresence>
        {petals.map((p) => (
          <motion.div
            key={p.id}
            className="absolute top-[-5%]"
            style={{
              left: `${p.startX}%`,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
            }}
            initial={{ y: '-10vh', x: 0, rotate: p.initialRotation, opacity: 0 }}
            animate={{
              y: '110vh',
              x: p.drift,
              rotate: p.initialRotation + p.rotationSpin,
              opacity: [0, p.opacity, p.opacity, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <RosePetalSVG colorIndex={p.colorIndex} />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Floating Full Roses Layer */}
      <AnimatePresence>
        {floatingRoses.map((r) => (
          <motion.div
            key={r.id}
            className="absolute bottom-[-10%]"
            style={{
              left: `${r.startX}%`,
              width: r.size,
              height: r.size,
              opacity: r.opacity,
            }}
            initial={{ y: '10vh', x: 0, rotate: r.initialRotation, opacity: 0 }}
            animate={{
              y: '-120vh',
              x: r.drift,
              rotate: r.initialRotation + r.rotationSpin,
              opacity: [0, r.opacity, r.opacity, 0],
            }}
            transition={{
              duration: r.duration,
              delay: r.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <RoseHeadSVG />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
