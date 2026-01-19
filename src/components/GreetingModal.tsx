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
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal - Luxury Envelope Style */}
          <motion.div
            className="relative w-full max-w-md rounded-2xl p-8 shadow-2xl z-10 overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, hsl(220 40% 15%), hsl(220 40% 12%))',
              border: '1px solid hsl(42 85% 55% / 0.3)',
            }}
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
          >
            {/* Gold Corner Accents */}
            <div className="absolute top-0 left-0 w-20 h-20">
              <div 
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  background: 'linear-gradient(135deg, hsl(42 85% 55% / 0.3) 0%, transparent 60%)',
                }}
              />
            </div>
            <div className="absolute bottom-0 right-0 w-20 h-20">
              <div 
                className="absolute bottom-0 right-0 w-full h-full"
                style={{
                  background: 'linear-gradient(315deg, hsl(42 85% 55% / 0.3) 0%, transparent 60%)',
                }}
              />
            </div>

            {/* Gold Border Frame */}
            <div 
              className="absolute inset-3 rounded-xl border pointer-events-none"
              style={{ borderColor: 'hsl(42 85% 55% / 0.3)' }}
            />

            {/* Decorative Top Border */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent rounded-full" />

            {/* Emoji */}
            <motion.div
              className="text-center mb-6 relative z-10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <span className="text-6xl">{greeting.emoji}</span>
            </motion.div>

            {/* Title */}
            <motion.h3
              className="font-script text-3xl text-center mb-6 relative z-10"
              style={{ color: 'hsl(42 85% 65%)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {greeting.title}
            </motion.h3>

            {/* Divider */}
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent mx-auto mb-6" />

            {/* Hindi Shayari */}
            <motion.p
              className="font-elegant text-xl text-center mb-4 leading-relaxed relative z-10"
              style={{ color: 'hsl(42 85% 80%)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              "{greeting.hindiShayari}"
            </motion.p>

            {/* English Translation */}
            <motion.p
              className="text-center italic text-sm mb-8 relative z-10"
              style={{ color: 'hsl(42 85% 60% / 0.7)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              "{greeting.englishShayari}"
            </motion.p>

            {/* Action Button */}
            <motion.button
              className={`
                w-full py-3 rounded-full font-elegant text-lg transition-all relative z-10
                ${isLast 
                  ? 'shadow-lg hover:shadow-xl' 
                  : 'hover:opacity-80'
                }
              `}
              style={{
                background: isLast 
                  ? 'linear-gradient(145deg, hsl(42 85% 55%), hsl(42 85% 45%))'
                  : 'hsl(42 85% 55% / 0.1)',
                color: isLast ? 'hsl(220 40% 15%)' : 'hsl(42 85% 65%)',
                border: isLast ? 'none' : '1px solid hsl(42 85% 55% / 0.3)',
              }}
              onClick={isLast ? handleContinue : handleClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {isLast ? 'Tap me to continue 🎂' : 'Tap me to go back 💖'}
            </motion.button>

            {/* Card Number */}
            <div 
              className="absolute bottom-4 right-4 text-sm font-elegant"
              style={{ color: 'hsl(42 85% 55% / 0.5)' }}
            >
              {greeting.id} / 8
            </div>

            {/* Sparkle dots */}
            <div className="absolute top-8 right-8 w-1.5 h-1.5 rounded-full bg-gold/60 animate-pulse" />
            <div className="absolute bottom-16 left-8 w-2 h-2 rounded-full bg-gold/40 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GreetingModal;
