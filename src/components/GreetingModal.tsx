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

// Text animation variants for shayari
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.3,
    },
  },
};

const wordVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    filter: 'blur(10px)',
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring' as const,
      damping: 12,
      stiffness: 100,
    },
  },
};

const AnimatedText = ({ text, className, style, delay = 0 }: { text: string; className?: string; style?: React.CSSProperties; delay?: number }) => {
  const words = text.split(' ');
  
  return (
    <motion.p
      className={className}
      style={style}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      transition={{ delayChildren: delay }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
};

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
              background: 'linear-gradient(145deg, hsl(350 60% 25%), hsl(350 55% 18%))',
              border: '2px solid hsl(42 85% 55% / 0.4)',
            }}
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
          >
            {/* Feather decorations */}
            <motion.div 
              className="absolute top-4 left-4 text-2xl opacity-60"
              animate={{ rotate: [-10, 10, -10], y: [-2, 2, -2] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              🪶
            </motion.div>
            <motion.div 
              className="absolute bottom-4 right-4 text-2xl opacity-60 rotate-180"
              animate={{ rotate: [170, 190, 170], y: [2, -2, 2] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            >
              🪶
            </motion.div>

            {/* Decorative oval frame */}
            <div 
              className="absolute inset-6 rounded-[50%] border-2 pointer-events-none opacity-30"
              style={{ borderColor: 'hsl(42 85% 55%)' }}
            />

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

            {/* Decorative Top Border */}
            <motion.div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full"
              style={{ background: 'linear-gradient(to right, transparent, hsl(42 85% 55%), transparent)' }}
              animate={{ scaleX: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Heart Icon */}
            <motion.div
              className="text-center mb-4 relative z-10"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <span className="text-3xl">🤍</span>
            </motion.div>

            {/* Emoji */}
            <motion.div
              className="text-center mb-4 relative z-10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <motion.span 
                className="text-5xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {greeting.emoji}
              </motion.span>
            </motion.div>

            {/* Title with animation */}
            <motion.h3
              className="font-script text-2xl text-center mb-4 relative z-10"
              style={{ color: 'hsl(42 85% 75%)' }}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
            >
              {greeting.title}
            </motion.h3>

            {/* Divider */}
            <motion.div 
              className="w-20 h-px mx-auto mb-4"
              style={{ background: 'linear-gradient(to right, transparent, hsl(42 85% 55% / 0.6), transparent)' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5 }}
            />

            {/* Hindi Shayari with word-by-word animation */}
            <AnimatedText
              text={`"${greeting.hindiShayari}"`}
              className="font-elegant text-lg text-center mb-3 leading-relaxed relative z-10"
              style={{ color: 'hsl(0 0% 95%)' }}
              delay={0.5}
            />

            {/* English Translation with animation */}
            <AnimatedText
              text={`"${greeting.englishShayari}"`}
              className="text-center italic text-sm mb-6 relative z-10"
              style={{ color: 'hsl(42 85% 70% / 0.8)' }}
              delay={0.8}
            />

            {/* Small decorative dots */}
            <motion.div 
              className="flex justify-center gap-2 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 h-1 rounded-full"
                  style={{ background: 'hsl(42 85% 55% / 0.6)' }}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </motion.div>

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
                  : 'hsl(42 85% 55% / 0.15)',
                color: isLast ? 'hsl(350 60% 15%)' : 'hsl(42 85% 75%)',
                border: isLast ? 'none' : '1px solid hsl(42 85% 55% / 0.3)',
              }}
              onClick={isLast ? handleContinue : handleClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              {isLast ? 'Tap me to continue 🎂' : 'Tap me to go back 💖'}
            </motion.button>

            {/* Card Number */}
            <motion.div 
              className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm font-elegant"
              style={{ color: 'hsl(42 85% 55% / 0.5)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {greeting.id} / 8
            </motion.div>

            {/* Sparkle dots */}
            <motion.div 
              className="absolute top-8 right-8 w-1.5 h-1.5 rounded-full bg-gold/60"
              animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div 
              className="absolute bottom-20 left-8 w-2 h-2 rounded-full bg-gold/40"
              animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GreetingModal;
