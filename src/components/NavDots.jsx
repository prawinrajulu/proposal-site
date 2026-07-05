import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const PAGES = [
  { path: '/', label: 'Home' },
  { path: '/little-things', label: 'The Little Things' },
  { path: '/what-i-feel', label: 'What I Feel' },
  { path: '/before-i-ask', label: 'Before I Ask You' },
  { path: '/proposal', label: 'Proposal' },
];

export default function NavDots() {
  const location = useLocation();
  const navigate = useNavigate();
  const current = PAGES.findIndex(p => p.path === location.pathname);

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3" role="navigation" aria-label="Page navigation">
      {PAGES.map((page, i) => (
        <motion.button
          key={page.path}
          onClick={() => navigate(page.path)}
          whileHover={{ scale: 1.4 }}
          className="relative group"
          aria-label={`Navigate to ${page.label}`}
          title={page.label}
        >
          <div
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current
                ? 'bg-rose-romantic scale-125 shadow-[0_0_8px_rgba(233,30,140,0.8)]'
                : 'bg-white/30 hover:bg-white/60'
            }`}
          />
          {/* Tooltip */}
          <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xs text-white/80 bg-midnight-200/80 backdrop-blur px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            {page.label}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
