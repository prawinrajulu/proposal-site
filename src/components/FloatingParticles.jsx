import { useEffect, useState } from 'react';

const SHAPES = ['❤', '✦', '✧', '·', '♡'];

function Particle({ id, shape, x, size, duration, delay, color }) {
  return (
    <div
      key={id}
      className="fixed pointer-events-none select-none z-0"
      style={{
        left: `${x}%`,
        top: '-5%',
        fontSize: `${size}px`,
        color,
        opacity: 0.6,
        animation: `petalFall ${duration}s ${delay}s linear infinite`,
        filter: 'blur(0.3px)',
      }}
    >
      {shape}
    </div>
  );
}

export default function FloatingParticles({ count = 18, shapes = SHAPES }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const colors = ['#e91e8c', '#f472b6', '#d4a853', '#a78bfa', '#c4b5fd', '#f5cc7a'];
    const ps = Array.from({ length: count }, (_, i) => ({
      id: i,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      x: Math.random() * 100,
      size: Math.random() * 16 + 8,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(ps);
  }, [count, shapes]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {particles.map(p => <Particle key={p.id} {...p} />)}
    </div>
  );
}
