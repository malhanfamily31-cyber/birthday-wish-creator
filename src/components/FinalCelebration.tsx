import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import birthdayCake from '@/assets/birthday-cake.png';
import memory1 from '@/assets/couple-memory-1.jpg';
import memory2 from '@/assets/couple-memory-2.jpg';
import memory3 from '@/assets/couple-memory-3.jpg';
import watercolorBg from '@/assets/watercolor-bg.jpeg';
import FloatingHearts from './FloatingHearts';

interface FinalCelebrationProps {
  onBack: () => void;
}

const memories = [memory1, memory2, memory3];

const FinalCelebration = ({ onBack }: FinalCelebrationProps) => {
  const [step, setStep] = useState<'intro' | 'cake' | 'celebration'>('intro');
  const [cakeCut, setCakeCut] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Happy Birthday song would play here
    audioRef.current = new Audio();
    audioRef.current.volume = 0.5;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const handleStartCelebration = () => {
    setStep('cake');
  };

  const handleCakeCut = () => {
    setCakeCut(true);
    
    // Trigger confetti
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        clearInterval(interval);
        setTimeout(() => setStep('celebration'), 500);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#e8a0a0', '#d4a373', '#ffd700', '#ff69b4', '#ffffff'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#e8a0a0', '#d4a373', '#ffd700', '#ff69b4', '#ffffff'],
      });
    }, 250);
  };

  return (
    <motion.div
      className="fixed inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${watercolorBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/80 via-foreground/60 to-foreground/80" />

      {/* Floating Hearts */}
      <FloatingHearts count={10} />

      <AnimatePresence mode="wait">
        {/* Intro Step */}
        {step === 'intro' && (
          <motion.div
            key="intro"
            className="relative z-20 h-full flex flex-col items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <motion.div
              className="text-center"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.p
                className="font-script text-3xl md:text-4xl text-primary-foreground mb-8"
                animate={{ 
                  textShadow: ['0 0 20px hsl(42 85% 55% / 0.3)', '0 0 40px hsl(42 85% 55% / 0.6)', '0 0 20px hsl(42 85% 55% / 0.3)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                This one is special… 🎂
              </motion.p>
              
              <motion.button
                className="bg-gradient-to-r from-gold to-gold-dark text-foreground px-8 py-4 rounded-full font-elegant text-xl shadow-gold hover:shadow-xl transition-all"
                onClick={handleStartCelebration}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Let's celebrate 🎉
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {/* Cake Cutting Step */}
        {step === 'cake' && (
          <motion.div
            key="cake"
            className="relative z-20 h-full flex flex-col items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Candle glow effect */}
            <motion.div
              className="absolute top-1/4 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-gold/30 blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />

            <motion.h2
              className="font-script text-2xl md:text-3xl text-primary-foreground mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Make a wish… 🎂
            </motion.h2>

            {/* Cake */}
            <motion.div
              className={`relative cursor-pointer ${!cakeCut ? 'hover:scale-105' : ''} transition-transform`}
              onClick={!cakeCut ? handleCakeCut : undefined}
              whileTap={!cakeCut ? { scale: 0.95 } : {}}
            >
              {/* Candle flames */}
              {!cakeCut && (
                <motion.div
                  className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-8"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 0.3, repeat: Infinity }}
                >
                  <span className="text-3xl animate-candle-flicker">🔥</span>
                  <span className="text-3xl animate-candle-flicker" style={{ animationDelay: '0.1s' }}>🔥</span>
                  <span className="text-3xl animate-candle-flicker" style={{ animationDelay: '0.2s' }}>🔥</span>
                </motion.div>
              )}

              <motion.img
                src={birthdayCake}
                alt="Birthday Cake"
                className="w-64 md:w-80 h-auto drop-shadow-2xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: cakeCut ? [1, 1.1, 1] : 1, 
                  opacity: 1,
                  filter: cakeCut ? 'brightness(1.2)' : 'brightness(1)'
                }}
                transition={{ duration: 0.5 }}
              />

              {!cakeCut && (
                <motion.p
                  className="text-center text-primary-foreground/70 mt-4 font-elegant"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Tap to cut the cake!
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* Celebration Step */}
        {step === 'celebration' && (
          <motion.div
            key="celebration"
            className="relative z-20 h-full flex flex-col items-center justify-center p-4 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Floating Memories */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {memories.map((memory, i) => (
                <motion.div
                  key={i}
                  className="absolute w-32 md:w-48 rounded-lg overflow-hidden shadow-card opacity-60"
                  style={{
                    left: `${20 + i * 30}%`,
                    top: '100%',
                  }}
                  animate={{
                    y: [0, -window.innerHeight * 1.5],
                    rotate: [-5 + i * 5, 5 + i * 3],
                    x: [0, Math.sin(i) * 50],
                  }}
                  transition={{
                    duration: 15 + i * 3,
                    repeat: Infinity,
                    delay: i * 2,
                    ease: "linear",
                  }}
                >
                  <img 
                    src={memory} 
                    alt={`Memory ${i + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>

            {/* Final Message */}
            <motion.div
              className="text-center z-10 glass-card p-8 md:p-12 rounded-3xl shadow-glow max-w-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <motion.h1
                className="font-script text-4xl md:text-5xl text-primary mb-6"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Happy Birthday 💖
              </motion.h1>

              <motion.p
                className="font-elegant text-lg md:text-xl text-foreground/80 leading-relaxed mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
              >
                You are not just loved today,<br />
                you are celebrated… always.
              </motion.p>

              <motion.p
                className="text-muted-foreground font-script text-lg mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
              >
                — from someone who cares ✨
              </motion.p>

              <motion.button
                className="mt-8 bg-primary/10 text-primary px-6 py-3 rounded-full font-elegant hover:bg-primary/20 transition-all"
                onClick={onBack}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                Back to greetings 💕
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FinalCelebration;
