import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GreetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  greeting: {
    id: number;
    title: string;
    emoji: string;
    hindiShayari: string;
    englishShayari: string;
    song?: string;
  } | null;
  isLast: boolean;
  onContinue: () => void;
}

const GreetingModal = ({ isOpen, onClose, greeting, isLast, onContinue }: GreetingModalProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isOpen && greeting?.song) {
      // Play greeting-specific song
      audioRef.current = new Audio(greeting.song);
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch(() => {});
    }

    return () => {
      // Stop song when modal closes
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [isOpen, greeting?.song]);

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    onClose();
  };

  const handleContinue = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    onContinue();
  };

  if (!greeting) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop - Glassmorphism */}
          <motion.div
            className="absolute inset-0 bg-black/40"
            style={{ backdropFilter: 'blur(8px)' }}
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal - Clean White Glassmorphism */}
          <motion.div
            className="relative w-[85%] max-w-md rounded-3xl p-8 shadow-2xl z-10 overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
            }}
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
          >
            {/* Emoji */}
            <motion.div
              className="text-center mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <span className="text-6xl">{greeting.emoji}</span>
            </motion.div>

            {/* Title */}
            <motion.h3
              className="font-script text-2xl text-center mb-4"
              style={{ color: '#ff2e63' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {greeting.title}
            </motion.h3>

            {/* Hindi Shayari */}
            <motion.p
              className="font-elegant text-lg text-center mb-3 leading-relaxed font-semibold"
              style={{ color: '#333' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {greeting.hindiShayari}
            </motion.p>

            {/* English Translation */}
            <motion.p
              className="text-center italic text-sm mb-6"
              style={{ color: '#666' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {greeting.englishShayari}
            </motion.p>

            {/* Action Button */}
            <motion.button
              className="w-full py-3 rounded-full font-elegant text-lg transition-all text-white"
              style={{
                background: '#ff2e63',
                border: 'none',
              }}
              onClick={isLast ? handleContinue : handleClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {isLast ? 'Final Surprise ➔' : 'Tap to go back 💖'}
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GreetingModal;
