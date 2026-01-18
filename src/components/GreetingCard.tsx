import { motion } from 'framer-motion';

interface GreetingCardProps {
  id: number;
  shape: string;
  title: string;
  emoji: string;
  isOpen: boolean;
  isLocked: boolean;
  onClick: () => void;
}

const GreetingCard = ({ id, title, emoji, isOpen, isLocked, onClick }: GreetingCardProps) => {
  return (
    <motion.div
      className={`
        relative cursor-pointer
        ${isLocked ? 'grayscale opacity-60' : ''}
      `}
      onClick={!isLocked ? onClick : undefined}
      whileHover={!isLocked ? { scale: 1.05, y: -5 } : {}}
      whileTap={!isLocked ? { scale: 0.95 } : {}}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: id * 0.1, type: "spring", stiffness: 100 }}
    >
      {/* Simple Card - Pink/White Theme */}
      <div
        className={`
          relative w-36 h-44 md:w-44 md:h-52
          bg-white rounded-2xl overflow-hidden
          shadow-lg hover:shadow-xl
          transition-all duration-400
          border border-pink-100
          ${isLocked ? '' : 'hover:border-pink-300'}
        `}
        style={{
          boxShadow: isOpen 
            ? '0 8px 32px rgba(255, 105, 180, 0.25)' 
            : '0 8px 32px rgba(0, 0, 0, 0.08)',
        }}
      >
        {/* Lock Icon for locked cards */}
        {isLocked && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-gray-200/60 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="text-3xl">🔒</span>
          </motion.div>
        )}

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center p-4">
          {/* Emoji */}
          <motion.span
            className="text-4xl md:text-5xl mb-3"
            animate={!isLocked ? { 
              scale: [1, 1.1, 1],
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {isLocked ? '🔒' : emoji}
          </motion.span>

          {/* Title */}
          <p 
            className="font-elegant text-center text-sm md:text-base font-semibold px-2 leading-tight"
            style={{ color: '#ff2e63' }}
          >
            {title}
          </p>
        </div>

        {/* Open checkmark indicator */}
        {isOpen && (
          <motion.div
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center z-20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <span className="text-white text-xs">✓</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default GreetingCard;
