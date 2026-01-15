import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

interface GreetingCardProps {
  id: number;
  shape: string;
  title: string;
  emoji: string;
  isOpen: boolean;
  isLocked: boolean;
  onClick: () => void;
}

const shapeStyles: Record<string, string> = {
  cake: 'rounded-t-[50%] rounded-b-lg',
  heart: 'rounded-[50%_50%_50%_50%/60%_60%_40%_40%]',
  cloud: 'rounded-[50%]',
  envelope: 'rounded-lg',
  star: 'rounded-lg',
  infinity: 'rounded-full',
  gift: 'rounded-lg',
  fullCake: 'rounded-2xl',
};

const GreetingCard = ({ id, shape, title, emoji, isOpen, isLocked, onClick }: GreetingCardProps) => {
  return (
    <motion.div
      className={`
        relative cursor-pointer group
        ${isLocked ? 'opacity-60 cursor-not-allowed' : ''}
        ${isOpen ? 'ring-2 ring-gold ring-offset-2' : ''}
      `}
      onClick={!isLocked ? onClick : undefined}
      whileHover={!isLocked ? { scale: 1.05, y: -5 } : {}}
      whileTap={!isLocked ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: id * 0.1, type: "spring", stiffness: 100 }}
    >
      {/* Card */}
      <div
        className={`
          relative w-36 h-44 md:w-44 md:h-52
          glass-card shadow-card
          flex flex-col items-center justify-center
          transition-all duration-300
          ${shapeStyles[shape] || 'rounded-xl'}
          ${!isLocked && !isOpen ? 'animate-card-glow hover:shadow-gold' : ''}
          ${isOpen ? 'bg-gradient-to-br from-cream to-rose-light border-gold' : ''}
        `}
      >
        {/* Lock Icon */}
        {isLocked && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-muted/40 rounded-inherit z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Lock className="w-8 h-8 text-muted-foreground" />
          </motion.div>
        )}

        {/* Emoji */}
        <motion.span
          className="text-4xl md:text-5xl mb-3"
          animate={!isLocked ? { 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {emoji}
        </motion.span>

        {/* Title */}
        <p className="font-elegant text-center text-sm md:text-base px-3 text-foreground/80 leading-tight">
          {title}
        </p>

        {/* Card Number */}
        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-xs font-medium text-primary">{id}</span>
        </div>

        {/* Open indicator */}
        {isOpen && (
          <motion.div
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gold flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <span className="text-xs">✓</span>
          </motion.div>
        )}

        {/* Hover Glow Effect */}
        {!isLocked && !isOpen && (
          <div className="absolute inset-0 rounded-inherit opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-gold/10 to-primary/10" />
        )}
      </div>
    </motion.div>
  );
};

export default GreetingCard;
