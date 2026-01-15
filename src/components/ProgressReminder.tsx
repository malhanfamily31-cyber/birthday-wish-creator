import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ProgressReminderProps {
  openedCount: number;
}

const reminders: Record<number, string> = {
  3: "Warning! 🚨 Sirf 3 khule… abhi 5 aur baaki hain! 💕",
  5: "Halfway done! 💖 Ruk mat… mazaa to aage hai ✨",
  7: "Almost there! 🔥 Bas ek last surprise bacha hai 🎁",
};

const ProgressReminder = ({ openedCount }: ProgressReminderProps) => {
  const [showReminder, setShowReminder] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');

  useEffect(() => {
    if (reminders[openedCount]) {
      setCurrentMessage(reminders[openedCount]);
      setShowReminder(true);
      const timer = setTimeout(() => setShowReminder(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [openedCount]);

  return (
    <AnimatePresence>
      {showReminder && (
        <motion.div
          className="fixed top-20 left-1/2 -translate-x-1/2 z-40"
          initial={{ opacity: 0, y: -50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -30, x: '-50%' }}
          transition={{ type: "spring", damping: 15 }}
        >
          <div className="glass-card px-6 py-3 rounded-full shadow-soft">
            <p className="font-script text-xl text-primary">
              {currentMessage}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProgressReminder;
