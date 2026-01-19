import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EnvelopeGreetingProps {
  greeting: {
    id: number;
    title: string;
    emoji: string;
    hindiShayari: string;
    englishShayari: string;
    song?: string;
  };
  onComplete: () => void;
  isLast: boolean;
  onFinalComplete: () => void;
}

const WordByWordText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const words = text.split(' ');
  
  return (
    <span className="inline">
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: delay + index * 0.15,
            duration: 0.3,
            ease: "easeOut"
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

const EnvelopeGreeting = ({ greeting, onComplete, isLast, onFinalComplete }: EnvelopeGreetingProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleEnvelopeClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      // Play song
      if (greeting.song) {
        audioRef.current = new Audio(greeting.song);
        audioRef.current.volume = 0.4;
        audioRef.current.play().catch(() => {});
      }
      // Show content after envelope opens
      setTimeout(() => setShowContent(true), 600);
    }
  };

  const handleContinue = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (isLast) {
      onFinalComplete();
    } else {
      onComplete();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{
        background: 'linear-gradient(to bottom, #fff, #ffe4e9)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header - Always visible */}
      <motion.div
        className="absolute top-6 left-0 right-0 text-center z-30"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.h1
          className="font-script text-2xl md:text-4xl mb-1"
          style={{ color: '#ff2e63' }}
          animate={{ 
            textShadow: ['0 0 10px rgba(255,46,99,0.3)', '0 0 20px rgba(255,46,99,0.5)', '0 0 10px rgba(255,46,99,0.3)']
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          HAPPY BIRTHDAY MY LOVE💞
        </motion.h1>
        <p className="font-elegant text-base md:text-lg" style={{ color: '#ff2e63' }}>
          One surprise at a time… 💖
        </p>
      </motion.div>

      {/* Greeting Number Badge */}
      <motion.div
        className="absolute top-28 left-1/2 -translate-x-1/2 z-30"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: "spring" }}
      >
        <div 
          className="px-4 py-1 rounded-full text-white font-elegant text-sm"
          style={{ background: '#ff2e63' }}
        >
          Gift {greeting.id} of 8
        </div>
      </motion.div>

      {/* Envelope */}
      <AnimatePresence mode="wait">
        {!showContent ? (
          <motion.div
            key="envelope"
            className="relative cursor-pointer"
            onClick={handleEnvelopeClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Craft Paper Envelope */}
            <motion.div
              className="relative w-80 h-56 md:w-96 md:h-64"
              style={{
                perspective: '1000px',
              }}
            >
              {/* Envelope Body */}
              <div
                className="absolute inset-0 rounded-lg overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, #d4a574 0%, #c4956a 50%, #b8895e 100%)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                }}
              >
                {/* Paper texture overlay */}
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' /%3E%3C/svg%3E")',
                  }}
                />

                {/* Bottom fold lines */}
                <div 
                  className="absolute bottom-0 left-0 w-1/2 h-1/2"
                  style={{
                    borderRight: '2px solid rgba(139, 90, 43, 0.3)',
                    borderTop: '2px solid rgba(139, 90, 43, 0.3)',
                    transform: 'skewY(-10deg)',
                    transformOrigin: 'bottom left',
                  }}
                />
                <div 
                  className="absolute bottom-0 right-0 w-1/2 h-1/2"
                  style={{
                    borderLeft: '2px solid rgba(139, 90, 43, 0.3)',
                    borderTop: '2px solid rgba(139, 90, 43, 0.3)',
                    transform: 'skewY(10deg)',
                    transformOrigin: 'bottom right',
                  }}
                />
              </div>

              {/* Envelope Flap (Top) */}
              <motion.div
                className="absolute -top-1 left-0 right-0 h-32 origin-bottom"
                style={{
                  background: 'linear-gradient(180deg, #c4956a 0%, #d4a574 100%)',
                  clipPath: 'polygon(0 100%, 50% 0%, 100% 100%)',
                  boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
                }}
                animate={isOpen ? { rotateX: 180, y: -20 } : { rotateX: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' /%3E%3C/svg%3E")',
                  }}
                />
              </motion.div>

              {/* Decorative Elements - Twine and Flowers */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                animate={isOpen ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {/* Twine */}
                <div className="flex flex-col items-center">
                  <div className="w-1 h-16 bg-gradient-to-b from-amber-700 to-amber-600 rounded-full opacity-80" />
                  <div className="flex gap-1 -mt-2">
                    <div className="w-0.5 h-8 bg-amber-700 rounded-full transform -rotate-12 opacity-80" />
                    <div className="w-0.5 h-10 bg-amber-700 rounded-full opacity-80" />
                    <div className="w-0.5 h-8 bg-amber-700 rounded-full transform rotate-12 opacity-80" />
                  </div>
                  
                  {/* Flowers and leaves */}
                  <div className="flex items-end gap-1 -mt-4">
                    <span className="text-2xl transform -rotate-12">🌿</span>
                    <span className="text-xl">🌸</span>
                    <span className="text-lg transform rotate-12">🌼</span>
                  </div>
                </div>
              </motion.div>

              {/* Gold dots decoration */}
              <div className="absolute top-4 left-6 w-2 h-2 rounded-full bg-amber-500 opacity-60" />
              <div className="absolute top-8 right-8 w-1.5 h-1.5 rounded-full bg-amber-500 opacity-60" />
              <div className="absolute bottom-12 left-10 w-1.5 h-1.5 rounded-full bg-amber-500 opacity-60" />
              <div className="absolute bottom-8 right-12 w-2 h-2 rounded-full bg-amber-500 opacity-60" />
            </motion.div>

            {/* Tap instruction */}
            <motion.p
              className="text-center mt-6 font-elegant text-lg"
              style={{ color: '#ff2e63' }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {isOpen ? 'Opening...' : 'Tap to open 💌'}
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            className="relative w-[85%] max-w-md rounded-3xl p-8 shadow-2xl z-10 overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
            }}
            initial={{ scale: 0.5, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: -100 }}
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {greeting.title}
            </motion.h3>

            {/* Hindi Shayari - Word by Word Animation */}
            <div
              className="font-elegant text-lg text-center mb-3 leading-relaxed font-semibold"
              style={{ color: '#333' }}
            >
              <WordByWordText text={greeting.hindiShayari} delay={0.5} />
            </div>

            {/* English Translation - Word by Word Animation */}
            <div
              className="text-center italic text-sm mb-6"
              style={{ color: '#666' }}
            >
              <WordByWordText text={greeting.englishShayari} delay={1.5} />
            </div>

            {/* Action Button */}
            <motion.button
              className="w-full py-3 rounded-full font-elegant text-lg transition-all text-white"
              style={{
                background: '#ff2e63',
                border: 'none',
              }}
              onClick={handleContinue}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
            >
              {isLast ? 'Final Surprise ➔' : 'Next Gift 💖'}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EnvelopeGreeting;
