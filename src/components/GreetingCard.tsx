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

// 8 unique card designs based on reference images
const cardStyles = [
  // Card 1: Pink/Blush with Gold Lace and Pink Ribbon with Gemstone
  {
    bg: 'linear-gradient(145deg, hsl(340 40% 85%), hsl(340 35% 80%))',
    border: 'hsl(42 85% 55% / 0.5)',
    accent: 'hsl(340 50% 70%)',
    textColor: 'hsl(42 85% 35%)',
    overlayPattern: 'radial-gradient(circle at 20% 20%, hsl(42 85% 65% / 0.3) 2%, transparent 3%), radial-gradient(circle at 80% 80%, hsl(42 85% 65% / 0.3) 2%, transparent 3%)',
    ribbon: 'hsl(340 45% 75%)',
    gemstone: true,
  },
  // Card 2: Gold/Champagne Glitter with Ivory Ribbon
  {
    bg: 'linear-gradient(145deg, hsl(42 50% 70%), hsl(42 45% 60%))',
    border: 'hsl(42 60% 45% / 0.6)',
    accent: 'hsl(42 70% 80%)',
    textColor: 'hsl(42 30% 20%)',
    overlayPattern: 'radial-gradient(circle at 30% 40%, hsl(42 85% 85% / 0.5) 1%, transparent 2%), radial-gradient(circle at 70% 60%, hsl(42 85% 85% / 0.5) 1%, transparent 2%)',
    ribbon: 'hsl(45 40% 92%)',
    gemstone: false,
  },
  // Card 3: Purple Velvet with Gold Tassel
  {
    bg: 'linear-gradient(145deg, hsl(280 50% 25%), hsl(280 45% 20%))',
    border: 'hsl(42 85% 55% / 0.5)',
    accent: 'hsl(42 85% 55%)',
    textColor: 'hsl(42 85% 75%)',
    overlayPattern: 'repeating-linear-gradient(45deg, hsl(280 40% 30% / 0.3) 0px, transparent 1px, transparent 10px)',
    ribbon: 'hsl(42 85% 55%)',
    gemstone: false,
    hasTassel: true,
  },
  // Card 4: Gold Embossed with Gold Ribbon Tie
  {
    bg: 'linear-gradient(145deg, hsl(42 40% 75%), hsl(42 35% 65%))',
    border: 'hsl(42 60% 50% / 0.6)',
    accent: 'hsl(42 70% 50%)',
    textColor: 'hsl(42 40% 25%)',
    overlayPattern: 'radial-gradient(ellipse at center, hsl(42 60% 70% / 0.4) 0%, transparent 70%)',
    ribbon: 'hsl(42 70% 50%)',
    gemstone: false,
    hasRibbonTie: true,
  },
  // Card 5: Lavender/Grey with Cream Ribbon and Roses
  {
    bg: 'linear-gradient(145deg, hsl(270 15% 85%), hsl(270 12% 80%))',
    border: 'hsl(270 20% 70% / 0.5)',
    accent: 'hsl(340 30% 75%)',
    textColor: 'hsl(270 20% 35%)',
    overlayPattern: 'radial-gradient(circle at 50% 30%, hsl(270 15% 90% / 0.5) 10%, transparent 40%)',
    ribbon: 'hsl(45 50% 90%)',
    gemstone: false,
    hasRose: true,
  },
  // Card 6: Blush Pink with Dusty Rose Ribbon and Heart
  {
    bg: 'linear-gradient(145deg, hsl(350 35% 90%), hsl(350 30% 85%))',
    border: 'hsl(42 50% 70% / 0.4)',
    accent: 'hsl(350 40% 70%)',
    textColor: 'hsl(42 50% 35%)',
    overlayPattern: 'none',
    ribbon: 'hsl(350 35% 75%)',
    gemstone: false,
    hasHeart: true,
  },
  // Card 7: Light Blue Floral with Clock Design
  {
    bg: 'linear-gradient(145deg, hsl(200 60% 90%), hsl(200 55% 85%))',
    border: 'hsl(200 40% 70% / 0.5)',
    accent: 'hsl(200 50% 60%)',
    textColor: 'hsl(200 40% 30%)',
    overlayPattern: 'radial-gradient(circle at 20% 80%, hsl(120 30% 70% / 0.2) 5%, transparent 15%), radial-gradient(circle at 80% 20%, hsl(200 40% 80% / 0.3) 5%, transparent 15%)',
    ribbon: 'hsl(200 40% 80%)',
    gemstone: false,
    hasClock: true,
  },
  // Card 8: Maroon/Burgundy Velvet with Gold Wax Seal
  {
    bg: 'linear-gradient(145deg, hsl(350 60% 25%), hsl(350 55% 20%))',
    border: 'hsl(42 85% 55% / 0.4)',
    accent: 'hsl(42 85% 55%)',
    textColor: 'hsl(42 85% 80%)',
    overlayPattern: 'none',
    ribbon: 'none',
    gemstone: false,
    hasWaxSeal: true,
    hasFlowers: true,
  },
];

const GreetingCard = ({ id, title, emoji, isOpen, isLocked, onClick }: GreetingCardProps) => {
  const style = cardStyles[id - 1] || cardStyles[0];

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
            ? `linear-gradient(145deg, hsl(42 85% 55% / 0.3), hsl(42 85% 45% / 0.2))`
            : style.bg,
          border: `2px solid ${style.border}`,
        }}
      >
        {/* Pattern Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ background: style.overlayPattern }}
        />

        {/* Gold Lace Border Effect */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(to right, ${style.accent} 1px, transparent 1px) 0 0 / 8px 100%,
              linear-gradient(to bottom, ${style.accent} 1px, transparent 1px) 0 0 / 100% 8px
            `,
            opacity: 0.1,
          }}
        />

        {/* Ribbon (horizontal) */}
        {style.ribbon !== 'none' && (
          <div 
            className="absolute left-0 right-0 h-6 md:h-8 top-1/2 -translate-y-1/2 z-10"
            style={{ 
              background: style.ribbon,
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            }}
          >
            {/* Ribbon Bow */}
            <div 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12"
              style={{
                background: style.ribbon,
                borderRadius: '50%',
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
              }}
            >
              {/* Bow loops */}
              <div 
                className="absolute w-5 h-4 md:w-6 md:h-5 rounded-full -left-3 md:-left-4 top-1/2 -translate-y-1/2"
                style={{ 
                  background: style.ribbon,
                  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)',
                }}
              />
              <div 
                className="absolute w-5 h-4 md:w-6 md:h-5 rounded-full -right-3 md:-right-4 top-1/2 -translate-y-1/2"
                style={{ 
                  background: style.ribbon,
                  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)',
                }}
              />
            </div>

            {/* Gemstone (Card 1) */}
            {style.gemstone && (
              <motion.div 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 rounded-full z-20"
                style={{ 
                  background: 'radial-gradient(circle at 30% 30%, hsl(300 60% 80%), hsl(300 50% 60%), hsl(300 40% 45%))',
                  border: '2px solid hsl(42 70% 55%)',
                  boxShadow: '0 2px 8px rgba(180, 100, 180, 0.5)',
                }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}

            {/* Heart (Card 6) */}
            {style.hasHeart && (
              <motion.div 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl z-20"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                💛
              </motion.div>
            )}
          </div>
        )}

        {/* Tassel (Card 3) */}
        {style.hasTassel && (
          <motion.div 
            className="absolute -top-1 right-4 z-20"
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-1 h-8 bg-gradient-to-b from-gold to-gold/70" />
            <div className="w-4 h-8 -ml-1.5 bg-gradient-to-b from-gold via-gold/80 to-gold/60 rounded-b-full" 
              style={{ 
                clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
              }}
            />
          </motion.div>
        )}

        {/* Ribbon Tie (Card 4) */}
        {style.hasRibbonTie && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div 
              className="w-12 h-0.5 rounded-full"
              style={{ background: 'linear-gradient(90deg, transparent, hsl(42 70% 50%), transparent)' }}
            />
            <motion.div 
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2"
              style={{
                width: '20px',
                height: '16px',
                background: 'linear-gradient(180deg, hsl(42 70% 50%), hsl(42 60% 40%))',
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              }}
              animate={{ rotateY: [0, 180, 360] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
        )}

        {/* Rose (Card 5) */}
        {style.hasRose && (
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl z-20"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🌹
          </motion.div>
        )}

        {/* Clock (Card 7) */}
        {style.hasClock && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <motion.div 
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center"
              style={{ 
                borderColor: 'hsl(200 50% 60%)',
                background: 'radial-gradient(circle, hsl(200 60% 95%), hsl(200 50% 85%))',
              }}
            >
              <motion.div 
                className="text-sm"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              >
                🕐
              </motion.div>
            </motion.div>
          </div>
        )}

        {/* Wax Seal (Card 8) */}
        {style.hasWaxSeal && (
          <motion.div 
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div 
              className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center"
              style={{ 
                background: 'radial-gradient(circle at 30% 30%, hsl(42 80% 65%), hsl(42 70% 45%))',
                boxShadow: '0 3px 10px rgba(0,0,0,0.3)',
              }}
            >
              <span className="text-xs" style={{ color: 'hsl(42 30% 25%)' }}>👣</span>
            </div>
          </motion.div>
        )}

        {/* Dried Flowers (Card 8) */}
        {style.hasFlowers && (
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 z-15">
            <motion.div
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🌸
            </motion.div>
          </div>
        )}

        {/* Lock Icon */}
        {isLocked && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-foreground/40 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Lock className="w-8 h-8 text-muted-foreground" />
          </motion.div>
        )}

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-end pb-4 px-3 z-5">
          {/* Emoji */}
          <motion.span
            className="text-3xl md:text-4xl mb-2"
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
            className="font-elegant text-center text-xs leading-tight"
            style={{ color: style.textColor }}
          >
            {title}
          </p>
        </div>

        {/* Card Number Badge */}
        <div 
          className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center z-25"
          style={{ 
            background: 'linear-gradient(145deg, hsl(42 85% 55%), hsl(42 85% 45%))',
            color: 'hsl(220 40% 15%)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          }}
        >
          <span className="text-xs font-bold">{id}</span>
        </div>

        {/* Open indicator */}
        {isOpen && (
          <motion.div
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center z-30"
            style={{ background: 'linear-gradient(145deg, hsl(120 60% 45%), hsl(120 50% 40%))' }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <span className="text-xs text-white">✓</span>
          </motion.div>
        )}

        {/* Hover Glow Effect */}
        {!isLocked && !isOpen && (
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-5"
            style={{ background: 'linear-gradient(145deg, hsl(42 85% 55% / 0.15), hsl(42 85% 45% / 0.1))' }}
          />
        )}

        {/* Sparkle dots */}
        <div className="absolute top-3 left-3 w-1 h-1 rounded-full bg-white/60 animate-pulse z-20" />
        <div className="absolute bottom-12 right-4 w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse z-20" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-1/4 left-6 w-1 h-1 rounded-full bg-white/50 animate-pulse z-20" style={{ animationDelay: '1s' }} />
      </div>
    </motion.div>
  );
};

export default GreetingCard;
