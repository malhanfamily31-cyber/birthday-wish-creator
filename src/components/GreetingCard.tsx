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

const GreetingCard = ({ id, title, emoji, isOpen, isLocked, onClick }: GreetingCardProps) => {
  return (
    <motion.div
      className={`
        relative cursor-pointer group
        ${isLocked ? 'opacity-60 cursor-not-allowed' : ''}
        ${isOpen ? 'ring-2 ring-gold ring-offset-2 ring-offset-background' : ''}
      `}
      onClick={!isLocked ? onClick : undefined}
      whileHover={!isLocked ? { scale: 1.05, y: -5 } : {}}
      whileTap={!isLocked ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: id * 0.1, type: "spring", stiffness: 100 }}
    >
      {/* Luxury Envelope Card */}
      <div
        className={`
          relative w-36 h-44 md:w-44 md:h-52
          rounded-lg overflow-hidden
          shadow-lg
          transition-all duration-300
          ${!isLocked && !isOpen ? 'animate-card-glow hover:shadow-gold' : ''}
        `}
        style={{
          background: isOpen 
            ? 'linear-gradient(145deg, hsl(42 85% 55% / 0.3), hsl(42 85% 45% / 0.2))'
            : 'linear-gradient(145deg, hsl(220 40% 15%), hsl(220 40% 12%))',
          border: '1px solid hsl(42 85% 55% / 0.3)',
        }}
      >
        {/* Gold Corner Accents */}
        <div className="absolute top-0 left-0 w-12 h-12">
          <div 
            className="absolute top-0 left-0 w-full h-full"
            style={{
              background: 'linear-gradient(135deg, hsl(42 85% 55% / 0.4) 0%, transparent 60%)',
            }}
          />
          <svg className="absolute top-1 left-1 w-8 h-8" viewBox="0 0 40 40">
            <path 
              d="M0 0 Q20 5 40 0 Q35 20 40 40" 
              fill="none" 
              stroke="hsl(42 85% 55% / 0.6)" 
              strokeWidth="1"
            />
          </svg>
        </div>
        
        <div className="absolute bottom-0 right-0 w-12 h-12">
          <div 
            className="absolute bottom-0 right-0 w-full h-full"
            style={{
              background: 'linear-gradient(315deg, hsl(42 85% 55% / 0.4) 0%, transparent 60%)',
            }}
          />
          <svg className="absolute bottom-1 right-1 w-8 h-8 rotate-180" viewBox="0 0 40 40">
            <path 
              d="M0 0 Q20 5 40 0 Q35 20 40 40" 
              fill="none" 
              stroke="hsl(42 85% 55% / 0.6)" 
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* Gold Border Frame */}
        <div 
          className="absolute inset-2 rounded border pointer-events-none"
          style={{ borderColor: 'hsl(42 85% 55% / 0.4)' }}
        />

        {/* Lock Icon */}
        {isLocked && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-foreground/40 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Lock className="w-8 h-8 text-muted-foreground" />
          </motion.div>
        )}

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center p-4 z-5">
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
          <p 
            className="font-elegant text-center text-xs md:text-sm px-2 leading-tight"
            style={{ color: 'hsl(42 85% 70%)' }}
          >
            {title}
          </p>
        </div>

        {/* Card Number */}
        <div 
          className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
          style={{ 
            background: 'linear-gradient(145deg, hsl(42 85% 55%), hsl(42 85% 45%))',
            color: 'hsl(220 40% 15%)'
          }}
        >
          <span className="text-xs font-bold">{id}</span>
        </div>

        {/* Open indicator */}
        {isOpen && (
          <motion.div
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center z-20"
            style={{ background: 'linear-gradient(145deg, hsl(42 85% 55%), hsl(42 85% 45%))' }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <span className="text-xs">✓</span>
          </motion.div>
        )}

        {/* Hover Glow Effect */}
        {!isLocked && !isOpen && (
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'linear-gradient(145deg, hsl(42 85% 55% / 0.1), hsl(42 85% 45% / 0.05))' }}
          />
        )}

        {/* Sparkle dots */}
        <div className="absolute top-3 right-10 w-1 h-1 rounded-full bg-gold/60 animate-pulse" />
        <div className="absolute bottom-5 left-4 w-1.5 h-1.5 rounded-full bg-gold/40 animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-1/3 right-4 w-1 h-1 rounded-full bg-gold/50 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </motion.div>
  );
};

export default GreetingCard;
