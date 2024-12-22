import React from 'react';
import { motion } from 'framer-motion';

interface GameHeaderProps {
  matches: number;
  totalPairs: number;
}

const GameHeader: React.FC<GameHeaderProps> = ({ matches, totalPairs }) => {
  return (
    <motion.div
      className="text-center py-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-wider">
        Magic Match
      </h1>
      <div className="text-xl text-primary-foreground/80">
        Matches: {matches}/{totalPairs}
      </div>
    </motion.div>
  );
};

export default GameHeader;