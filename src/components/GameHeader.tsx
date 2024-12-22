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
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        Match the Spanish Word!
      </h1>
      <div className="text-xl text-gray-600">
        Matches: {matches}/{totalPairs}
      </div>
    </motion.div>
  );
};

export default GameHeader;