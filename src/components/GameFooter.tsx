import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface GameFooterProps {
  onRestart: () => void;
  matches: number;
  totalPairs: number;
}

const GameFooter: React.FC<GameFooterProps> = ({ onRestart, matches, totalPairs }) => {
  const messages = [
    "¡Vamos! You can do it! 🌟",
    "Great progress! Keep going! ⭐",
    "Almost there! ¡Sigue así! 🎯",
    "¡Excelente! You're doing great! 🌈"
  ];

  const currentMessage = messages[Math.min(Math.floor((matches / totalPairs) * messages.length), messages.length - 1)];

  return (
    <motion.div
      className="text-center py-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-lg text-gray-600 mb-4">{currentMessage}</p>
      <Button
        onClick={onRestart}
        className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 rounded-lg transition-colors"
      >
        Restart Game
      </Button>
    </motion.div>
  );
};

export default GameFooter;