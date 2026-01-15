import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface FloatingHeartsProps {
  count?: number;
}

const FloatingHearts = ({ count = 15 }: FloatingHeartsProps) => {
  const hearts = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 10 + Math.random() * 10,
      size: 16 + Math.random() * 24,
      opacity: 0.4 + Math.random() * 0.4,
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-primary"
          style={{
            left: `${heart.left}%`,
            bottom: '-50px',
            fontSize: heart.size,
            opacity: heart.opacity,
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            x: [0, Math.sin(heart.id) * 50],
            rotate: [0, 360],
            scale: [1, 0.5],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          💖
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
