import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import birthdayCake from '@/assets/birthday-cake.png';
import cakeSlice from '@/assets/cake-slice.png';
import memory1 from '@/assets/memory-1.jpg';
import memory2 from '@/assets/memory-2.jpg';
import memory3 from '@/assets/memory-3.jpg';
import memory4 from '@/assets/memory-4.jpg';
import memory5 from '@/assets/memory-5.jpg';
import watercolorBg from '@/assets/watercolor-bg.jpeg';
import FloatingHearts from './FloatingHearts';

interface FinalCelebrationProps {
  onBack: () => void;
}

// Images and videos for memories
const imageMemories = [memory1, memory2, memory3, memory4, memory5];
const videoMemories = [
  '/videos/memory-video-1.mp4',
  '/videos/memory-video-2.mp4',
  '/videos/memory-video-3.mp4',
];

const FinalCelebration = ({ onBack }: FinalCelebrationProps) => {
  const [step, setStep] = useState<'intro' | 'cake' | 'slice' | 'memories' | 'final'>('intro');
  const [cakeCut, setCakeCut] = useState(false);
  const hbdAudioRef = useRef<HTMLAudioElement | null>(null);
  const palPalAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Load Happy Birthday song
    hbdAudioRef.current = new Audio('/audio/happy-birthday.mp3');
    hbdAudioRef.current.volume = 0.5;
    hbdAudioRef.current.loop = true;

    // Load Pal Pal song for memories
    palPalAudioRef.current = new Audio('/audio/pal-pal.mp3');
    palPalAudioRef.current.volume = 0.4;
    palPalAudioRef.current.loop = true;
    
    return () => {
      if (hbdAudioRef.current) {
        hbdAudioRef.current.pause();
      }
      if (palPalAudioRef.current) {
        palPalAudioRef.current.pause();
      }
    };
  }, []);

  const handleStartCelebration = () => {
    setStep('cake');
    // Start Happy Birthday song
    if (hbdAudioRef.current) {
      hbdAudioRef.current.play().catch(() => {});
    }
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
        // Show cake slice after confetti
        setTimeout(() => setStep('slice'), 500);
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

  const handleSliceClick = () => {
    // Stop HBD song, start Pal Pal
    if (hbdAudioRef.current) {
      hbdAudioRef.current.pause();
    }
    if (palPalAudioRef.current) {
      palPalAudioRef.current.play().catch(() => {});
    }
    setStep('memories');
  };

  const handleMemoriesComplete = () => {
    setStep('final');
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

        {/* Cake Slice Step */}
        {step === 'slice' && (
          <motion.div
            key="slice"
            className="relative z-20 h-full flex flex-col items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.h2
              className="font-script text-2xl md:text-3xl text-primary-foreground mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Your special slice! 🍰
            </motion.h2>

            <motion.div
              className="cursor-pointer hover:scale-105 transition-transform"
              onClick={handleSliceClick}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <motion.img
                src={cakeSlice}
                alt="Cake Slice"
                className="w-56 md:w-72 h-auto drop-shadow-2xl"
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            <motion.p
              className="text-center text-primary-foreground/70 mt-6 font-elegant"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            >
              Tap for memories… 💖
            </motion.p>
          </motion.div>
        )}

        {/* Memories Step */}
        {step === 'memories' && (
          <motion.div
            key="memories"
            className="relative z-20 h-full flex flex-col items-center justify-center p-4 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Floating Images */}
            <div className="absolute inset-0 overflow-hidden">
              {imageMemories.map((memory, i) => (
                <motion.div
                  key={`img-${i}`}
                  className="absolute w-40 md:w-56 rounded-xl overflow-hidden shadow-2xl"
                  style={{
                    left: `${5 + (i % 4) * 24}%`,
                    top: '110%',
                    border: '4px solid white',
                  }}
                  animate={{
                    y: [0, -window.innerHeight * 1.5],
                    rotate: [-10 + i * 5, 10 + i * 3],
                    x: [0, Math.sin(i) * 80],
                  }}
                  transition={{
                    duration: 12 + i * 2,
                    repeat: Infinity,
                    delay: i * 1.2,
                    ease: "linear",
                  }}
                >
                  <img 
                    src={memory} 
                    alt={`Memory ${i + 1}`} 
                    className="w-full h-48 md:h-64 object-cover"
                  />
                </motion.div>
              ))}

              {/* Floating Videos - Muted */}
              {videoMemories.map((video, i) => (
                <motion.div
                  key={`vid-${i}`}
                  className="absolute w-44 md:w-60 rounded-xl overflow-hidden shadow-2xl"
                  style={{
                    left: `${15 + (i % 3) * 28}%`,
                    top: '115%',
                    border: '4px solid white',
                  }}
                  animate={{
                    y: [0, -window.innerHeight * 1.6],
                    rotate: [5 - i * 4, -5 + i * 2],
                    x: [0, Math.cos(i) * 60],
                  }}
                  transition={{
                    duration: 14 + i * 2.5,
                    repeat: Infinity,
                    delay: i * 2 + 3,
                    ease: "linear",
                  }}
                >
                  <video 
                    src={video} 
                    className="w-full h-52 md:h-72 object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </motion.div>
              ))}
            </div>

            {/* Continue Button */}
            <motion.div
              className="relative z-30 text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
            >
              <motion.h2
                className="font-script text-3xl md:text-4xl text-primary-foreground mb-6"
                style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
              >
                Beautiful Memories… 💕
              </motion.h2>
              <motion.button
                className="bg-gradient-to-r from-gold to-gold-dark text-foreground px-8 py-4 rounded-full font-elegant text-lg shadow-gold hover:shadow-xl transition-all"
                onClick={handleMemoriesComplete}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                See Final Message 💖
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {/* Final Step */}
        {step === 'final' && (
          <motion.div
            key="final"
            className="relative z-20 h-full flex flex-col items-center justify-center p-4 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Floating Memories in background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
              {imageMemories.slice(0, 4).map((memory, i) => (
                <motion.div
                  key={i}
                  className="absolute w-32 md:w-44 rounded-lg overflow-hidden shadow-xl"
                  style={{
                    left: `${5 + i * 25}%`,
                    top: '110%',
                    border: '3px solid white',
                  }}
                  animate={{
                    y: [0, -window.innerHeight * 1.5],
                    rotate: [-5 + i * 5, 5 + i * 3],
                  }}
                  transition={{
                    duration: 18 + i * 3,
                    repeat: Infinity,
                    delay: i * 2,
                    ease: "linear",
                  }}
                >
                  <img 
                    src={memory} 
                    alt={`Memory ${i + 1}`} 
                    className="w-full h-40 md:h-52 object-cover"
                  />
                </motion.div>
              ))}
            </div>

            {/* Final Message */}
            <motion.div
              className="text-center z-10 p-8 md:p-12 rounded-3xl max-w-lg"
              style={{
                background: 'linear-gradient(145deg, hsl(220 40% 15% / 0.95), hsl(220 40% 12% / 0.95))',
                border: '1px solid hsl(42 85% 55% / 0.3)',
                boxShadow: '0 0 60px hsl(42 85% 55% / 0.2)',
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              {/* Gold corners */}
              <div className="absolute top-0 left-0 w-16 h-16" style={{ background: 'linear-gradient(135deg, hsl(42 85% 55% / 0.2) 0%, transparent 60%)' }} />
              <div className="absolute bottom-0 right-0 w-16 h-16" style={{ background: 'linear-gradient(315deg, hsl(42 85% 55% / 0.2) 0%, transparent 60%)' }} />

              <motion.h1
                className="font-script text-4xl md:text-5xl mb-6"
                style={{ color: 'hsl(42 85% 65%)' }}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Happy Birthday 💖
              </motion.h1>

              <motion.p
                className="font-elegant text-lg md:text-xl leading-relaxed mb-4"
                style={{ color: 'hsl(42 85% 80%)' }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
              >
                You are not just loved today,<br />
                you are celebrated… always.
              </motion.p>

              <motion.p
                className="font-script text-lg mt-6"
                style={{ color: 'hsl(42 85% 55% / 0.7)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
              >
                — from someone who cares ✨
              </motion.p>

              <motion.button
                className="mt-8 px-6 py-3 rounded-full font-elegant transition-all"
                style={{
                  background: 'hsl(42 85% 55% / 0.1)',
                  color: 'hsl(42 85% 65%)',
                  border: '1px solid hsl(42 85% 55% / 0.3)',
                }}
                onClick={onBack}
                whileHover={{ scale: 1.05, backgroundColor: 'hsl(42 85% 55% / 0.2)' }}
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
