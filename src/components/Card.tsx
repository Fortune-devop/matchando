import React from 'react';
import { motion } from 'framer-motion';
import { CardType } from './MemoryGame';

interface CardProps {
  card: CardType;
  isFlipped: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ card, isFlipped, onClick }) => {
  return (
    <div
      className="relative aspect-[3/4] cursor-pointer"
      onClick={onClick}
    >
      <motion.div
        className="w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 300, damping: 30 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Card Back */}
        <div
          className={`absolute w-full h-full bg-blue-500 rounded-xl shadow-lg flex items-center justify-center text-white text-2xl font-bold
            ${isFlipped ? 'backface-hidden' : ''}`}
        >
          ?
        </div>

        {/* Card Front */}
        <div
          className={`absolute w-full h-full rounded-xl shadow-lg flex items-center justify-center p-2 text-white font-bold text-xl
            ${card.type === 'spanish' ? 'bg-purple-500' : 'bg-orange-500'}
            ${card.isMatched ? 'ring-4 ring-green-400' : ''}
            ${isFlipped ? '' : 'backface-hidden'}
          `}
          style={{ transform: "rotateY(180deg)" }}
        >
          {card.content}
        </div>
      </motion.div>
    </div>
  );
};

export default Card;