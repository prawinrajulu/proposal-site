import { useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  return (
    <>
      {/* 
        To add background music:
        1. Place an MP3 file in /public/music.mp3
        2. The button below will play/pause it
      */}
      <audio ref={audioRef} loop src="/bgmusic.mp3" preload="none" />

      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed top-5 right-5 z-50 glass rounded-full p-3 transition-all duration-300 group"
        aria-label={playing ? 'Mute music' : 'Play music'}
        title={playing ? 'Pause music' : 'Play music'}
      >
        <motion.div
          animate={playing ? { rotate: [0, 5, -5, 0] } : {}}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          {playing ? (
            <Volume2 size={20} className="text-rose-soft group-hover:text-gold-warm transition-colors" />
          ) : (
            <VolumeX size={20} className="text-white/40 group-hover:text-white/80 transition-colors" />
          )}
        </motion.div>

        {playing && (
          <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-rose-romantic rounded-full animate-ping" />
        )}
      </motion.button>
    </>
  );
}
