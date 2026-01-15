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
  } | null;
  isLast: boolean;
  onContinue: () => void;
}

const GreetingModal = ({ isOpen, onClose, greeting, isLast, onContinue }: GreetingModalProps) => {
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
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-md glass-card rounded-2xl p-8 shadow-glow z-10"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
          >
            {/* Decorative Top Border */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-gold to-transparent rounded-full" />

            {/* Emoji */}
            <motion.div
              className="text-center mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <span className="text-6xl">{greeting.emoji}</span>
            </motion.div>

            {/* Title */}
            <motion.h3
              className="font-script text-3xl text-center text-primary mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {greeting.title}
            </motion.h3>

            {/* Divider */}
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto mb-6" />

            {/* Hindi Shayari */}
            <motion.p
              className="font-elegant text-xl text-center text-foreground/90 mb-4 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              "{greeting.hindiShayari}"
            </motion.p>

            {/* English Translation */}
            <motion.p
              className="text-center text-muted-foreground italic text-sm mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              "{greeting.englishShayari}"
            </motion.p>

            {/* Action Button */}
            <motion.button
              className={`
                w-full py-3 rounded-full font-elegant text-lg transition-all
                ${isLast 
                  ? 'bg-gradient-to-r from-gold to-gold-dark text-foreground shadow-gold hover:shadow-xl' 
                  : 'bg-primary/10 text-primary hover:bg-primary/20'
                }
              `}
              onClick={isLast ? onContinue : onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {isLast ? 'Tap me to continue 🎂' : 'Tap me to go back 💖'}
            </motion.button>

            {/* Card Number */}
            <div className="absolute bottom-4 right-4 text-sm text-muted-foreground/50 font-elegant">
              {greeting.id} / 8
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GreetingModal;
