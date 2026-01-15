import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import EntryScene from '@/components/EntryScene';
import GreetingsScene from '@/components/GreetingsScene';
import FinalCelebration from '@/components/FinalCelebration';

type Scene = 'entry' | 'greetings' | 'celebration';

const Index = () => {
  const [currentScene, setCurrentScene] = useState<Scene>('entry');

  const handleOpenGift = () => {
    setCurrentScene('greetings');
  };

  const handleComplete = () => {
    setCurrentScene('celebration');
  };

  const handleBackToGreetings = () => {
    setCurrentScene('greetings');
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {currentScene === 'entry' && (
          <EntryScene key="entry" onOpen={handleOpenGift} />
        )}
        
        {currentScene === 'greetings' && (
          <GreetingsScene key="greetings" onComplete={handleComplete} />
        )}
        
        {currentScene === 'celebration' && (
          <FinalCelebration key="celebration" onBack={handleBackToGreetings} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
