import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingHearts from './FloatingHearts';
import EnvelopeGreeting from './EnvelopeGreeting';
import ProgressReminder from './ProgressReminder';

interface GreetingsSceneProps {
  onComplete: () => void;
}

const greetings = [
  {
    id: 1,
    shape: 'cake',
    title: 'A Sweet Birthday Wish',
    emoji: '🎂',
    hindiShayari: 'Tumhari khushi meri sabse khoobsurat dua hai 🎂',
    englishShayari: 'Your happiness is my favourite wish.',
    song: '/audio/dil-ibadat.mp3',
  },
  {
    id: 2,
    shape: 'heart',
    title: 'For My Favourite Person',
    emoji: '💖',
    hindiShayari: 'Tum ho to har din thoda sa khaas lagta hai 💖',
    englishShayari: 'With you, ordinary days feel special.',
    song: '/audio/ishq-wala-love.mp3',
  },
  {
    id: 3,
    shape: 'cloud',
    title: 'Smile First',
    emoji: '😊',
    hindiShayari: 'Ek muskaan… aur din ban jaata hai 😊',
    englishShayari: 'One smile, and everything feels lighter.',
    song: '/audio/ishq-risk.mp3',
  },
  {
    id: 4,
    shape: 'envelope',
    title: 'A Little Feeling',
    emoji: '💌',
    hindiShayari: 'Kuch log lafzon se nahi, ehsaason se yaad rehte hain 💌',
    englishShayari: 'Some people are remembered by feelings, not words.',
    song: '/audio/chaahat.mp3',
  },
  {
    id: 5,
    shape: 'star',
    title: 'Something Special',
    emoji: '✨',
    hindiShayari: 'Tumhara hona hi kaafi hai, aaj ke din ke liye ✨',
    englishShayari: 'Just your presence makes today complete.',
    song: '/audio/nede-nede.mp3',
  },
  {
    id: 6,
    shape: 'infinity',
    title: 'From the Heart',
    emoji: '💕',
    hindiShayari: 'Dil ne kaha, aaj tumhe thoda zyada mehsoos karo 💕',
    englishShayari: 'My heart just wanted you to feel extra special today.',
    song: '/audio/hangover.mp3',
  },
  {
    id: 7,
    shape: 'gift',
    title: 'Almost There…',
    emoji: '🎁',
    hindiShayari: 'Bas ek kadam aur… phir kahani poori ho jaayegi 🎁',
    englishShayari: 'Just one more step before the story completes.',
    song: '/audio/mann-mera.mp3',
  },
  {
    id: 8,
    shape: 'fullCake',
    title: 'Last but not least…',
    emoji: '🎂',
    hindiShayari: 'Kuch pal sirf yaad banne ke liye hote hain…aur aaj unmein se ek hai 💖🎂',
    englishShayari: 'Some moments are meant to turn into memories.',
    song: '/audio/kina-chir.mp3',
  },
];

const GreetingsScene = ({ onComplete }: GreetingsSceneProps) => {
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Play Tere Liye romantic Bollywood background music
    bgAudioRef.current = new Audio('/audio/tere-liye-bg.mp3');
    bgAudioRef.current.loop = true;
    bgAudioRef.current.volume = 0.15;
    bgAudioRef.current.play().catch(() => {});
    
    return () => {
      if (bgAudioRef.current) {
        bgAudioRef.current.pause();
        bgAudioRef.current = null;
      }
    };
  }, []);

  const handleGreetingComplete = () => {
    // Move to next greeting
    setCurrentGreetingIndex(prev => prev + 1);
  };

  const handleFinalComplete = () => {
    // Stop background music before going to final scene
    if (bgAudioRef.current) {
      bgAudioRef.current.pause();
      bgAudioRef.current = null;
    }
    onComplete();
  };

  const currentGreeting = greetings[currentGreetingIndex];

  return (
    <motion.div
      className="fixed inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Floating Hearts */}
      <FloatingHearts count={12} />

      {/* Progress Reminder */}
      <ProgressReminder openedCount={currentGreetingIndex} />

      {/* Sequential Envelope Greetings */}
      <AnimatePresence mode="wait">
        {currentGreeting && (
          <EnvelopeGreeting
            key={currentGreeting.id}
            greeting={currentGreeting}
            onComplete={handleGreetingComplete}
            isLast={currentGreeting.id === 8}
            onFinalComplete={handleFinalComplete}
          />
        )}
      </AnimatePresence>

      {/* Progress Dots - Fixed at bottom */}
      <motion.div
        className="fixed bottom-6 left-0 right-0 flex items-center justify-center gap-2 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="flex gap-1.5">
          {greetings.map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                i < currentGreetingIndex ? 'bg-pink-500' : i === currentGreetingIndex ? 'bg-pink-400 animate-pulse' : 'bg-pink-200'
              }`}
            />
          ))}
        </div>
        <span className="text-sm font-elegant ml-2" style={{ color: '#ff2e63' }}>
          {currentGreetingIndex} / 8 opened
        </span>
      </motion.div>
    </motion.div>
  );
};

export default GreetingsScene;
