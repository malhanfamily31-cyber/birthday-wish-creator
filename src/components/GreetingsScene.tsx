import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import FloatingHearts from './FloatingHearts';
import GreetingCard from './GreetingCard';
import GreetingModal from './GreetingModal';
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
  const [openedCards, setOpenedCards] = useState<number[]>([]);
  const [selectedGreeting, setSelectedGreeting] = useState<typeof greetings[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Play Tere Liye romantic Bollywood background music
    bgAudioRef.current = new Audio('/audio/tere-liye-bg.mp3');
    bgAudioRef.current.loop = true;
    bgAudioRef.current.volume = 0.2;
    bgAudioRef.current.play().catch(() => {});
    
    return () => {
      if (bgAudioRef.current) {
        bgAudioRef.current.pause();
        bgAudioRef.current = null;
      }
    };
  }, []);

  const handleCardClick = (id: number) => {
    // Check if card is locked (all previous cards must be opened)
    const isLocked = id > 1 && !openedCards.includes(id - 1);
    if (isLocked) return;

    const greeting = greetings.find(g => g.id === id);
    if (greeting) {
      // Pause background music when opening card
      if (bgAudioRef.current) {
        bgAudioRef.current.pause();
      }
      setSelectedGreeting(greeting);
      setIsModalOpen(true);
      if (!openedCards.includes(id)) {
        setOpenedCards(prev => [...prev, id]);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGreeting(null);
    // Resume background music
    if (bgAudioRef.current) {
      bgAudioRef.current.play().catch(() => {});
    }
  };

  const handleContinue = () => {
    setIsModalOpen(false);
    // Stop background music before going to final scene
    if (bgAudioRef.current) {
      bgAudioRef.current.pause();
      bgAudioRef.current = null;
    }
    onComplete();
  };

  return (
    <motion.div
      className="fixed inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        background: 'linear-gradient(to bottom, #fff, #ffe4e9)',
      }}
    >
      {/* Watermark Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.h1
          className="text-[12vw] font-script whitespace-nowrap select-none"
          style={{ 
            color: 'rgba(255, 46, 99, 0.05)',
            fontWeight: 900,
          }}
        >
          HAPPY BIRTHDAY
        </motion.h1>
      </div>

      {/* Floating Hearts */}
      <FloatingHearts count={12} />

      {/* Progress Reminder */}
      <ProgressReminder openedCount={openedCards.length} />

      {/* Main Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center p-4">
        {/* Header */}
        <motion.div
          className="text-center mb-6"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.h1
            className="font-script text-3xl md:text-5xl mb-2"
            style={{ color: '#ff2e63' }}
            animate={{ 
              textShadow: ['0 0 10px rgba(255,46,99,0.3)', '0 0 20px rgba(255,46,99,0.5)', '0 0 10px rgba(255,46,99,0.3)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            HAPPY BIRTHDAY MY LOVE💞
          </motion.h1>
          <p className="font-elegant text-lg md:text-xl" style={{ color: '#ff2e63' }}>
            One surprise at a time… 💖
          </p>
        </motion.div>

        {/* Cards Grid - 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 max-w-xl md:max-w-4xl mx-auto">
          {greetings.map((greeting) => (
            <GreetingCard
              key={greeting.id}
              id={greeting.id}
              shape={greeting.shape}
              title={greeting.title}
              emoji={greeting.emoji}
              isOpen={openedCards.includes(greeting.id)}
              isLocked={greeting.id > 1 && !openedCards.includes(greeting.id - 1)}
              onClick={() => handleCardClick(greeting.id)}
            />
          ))}
        </div>

        {/* Progress Dots */}
        <motion.div
          className="mt-6 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex gap-1.5">
            {greetings.map((_, i) => (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                  openedCards.includes(i + 1) ? 'bg-pink-500' : 'bg-pink-200'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-elegant ml-2" style={{ color: '#ff2e63' }}>
            {openedCards.length} / 8 opened
          </span>
        </motion.div>
      </div>

      {/* Greeting Modal */}
      <GreetingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        greeting={selectedGreeting}
        isLast={selectedGreeting?.id === 8}
        onContinue={handleContinue}
      />
    </motion.div>
  );
};

export default GreetingsScene;
