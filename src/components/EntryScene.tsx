import { motion } from 'framer-motion';
import ribbonImage from '@/assets/ribbon-pink.png';
import watercolorBg from '@/assets/watercolor-bg.jpeg';
import FloatingHearts from './FloatingHearts';

interface EntrySceneProps {
  onOpen: () => void;
}

const EntryScene = ({ onOpen }: EntrySceneProps) => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Watercolor Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${watercolorBg})` }}
      />
      
      {/* Soft overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/30" />
      
      {/* Floating Hearts */}
      <FloatingHearts count={20} />
      
      {/* Main Content */}
      <motion.div
        className="relative z-20 flex flex-col items-center cursor-pointer"
        onClick={onOpen}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Ribbon */}
        <motion.div
          className="animate-ribbon-pulse"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
        >
          <img 
            src={ribbonImage} 
            alt="Gift Ribbon" 
            className="w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-2xl"
          />
        </motion.div>
        
        {/* Text */}
        <motion.div
          className="mt-8 text-center"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h2 className="font-script text-4xl md:text-5xl text-primary animate-text-glow">
            Open Me 🎁
          </h2>
          <motion.p
            className="mt-4 text-muted-foreground font-elegant text-lg"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Tap to reveal your surprise...
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default EntryScene;
