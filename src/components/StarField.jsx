import { useEffect, useRef } from 'react';

export default function StarField({ count = 200, showShootingStars = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animId;
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    // Stars
    const stars = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.8 + 0.2,
      alpha: Math.random(),
      delta: (Math.random() * 0.015 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
      color: Math.random() > 0.8 ? '#f5cc7a' : Math.random() > 0.6 ? '#c4b5fd' : '#ffffff',
    }));

    // Shooting stars
    const shootingStars = [];
    const spawnShootingStar = () => {
      if (!showShootingStars) return;
      shootingStars.push({
        x: Math.random() * W * 0.7,
        y: Math.random() * H * 0.4,
        len: Math.random() * 150 + 80,
        speed: Math.random() * 12 + 6,
        alpha: 1,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
      });
    };

    let shootTimer = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Draw stars
      stars.forEach(s => {
        s.alpha += s.delta;
        if (s.alpha <= 0.1 || s.alpha >= 1) s.delta *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = Math.max(0.1, s.alpha);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Draw shooting stars
      shootTimer++;
      if (shootTimer > 180) {
        shootTimer = 0;
        spawnShootingStar();
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        const grad = ctx.createLinearGradient(ss.x, ss.y, ss.x - ss.len * Math.cos(ss.angle), ss.y - ss.len * Math.sin(ss.angle));
        grad.addColorStop(0, `rgba(255,255,255,${ss.alpha})`);
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - ss.len * Math.cos(ss.angle), ss.y - ss.len * Math.sin(ss.angle));
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ss.x += ss.speed * Math.cos(ss.angle);
        ss.y += ss.speed * Math.sin(ss.angle);
        ss.alpha -= 0.02;
        if (ss.alpha <= 0 || ss.x > W || ss.y > H) shootingStars.splice(i, 1);
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, [count, showShootingStars]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
