import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import Card from './Card';
import GameHeader from './GameHeader';
import GameFooter from './GameFooter';
import { shuffle } from '../utils/gameUtils';

const wordPairs = [
  { spanish: "perro", english: "dog" },
  { spanish: "gato", english: "cat" },
  { spanish: "casa", english: "house" },
  { spanish: "árbol", english: "tree" },
  { spanish: "sol", english: "sun" },
  { spanish: "luna", english: "moon" },
  { spanish: "libro", english: "book" },
  { spanish: "agua", english: "water" },
];

export interface CardType {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
  type: 'spanish' | 'english';
}

const MemoryGame = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  const initializeGame = () => {
    const gameCards: CardType[] = [];
    wordPairs.forEach((pair, index) => {
      gameCards.push({
        id: index * 2,
        content: pair.spanish,
        isFlipped: false,
        isMatched: false,
        type: 'spanish'
      });
      gameCards.push({
        id: index * 2 + 1,
        content: pair.english,
        isFlipped: false,
        isMatched: false,
        type: 'english'
      });
    });
    setCards(shuffle(gameCards));
    setFlippedCards([]);
    setMatches(0);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (id: number) => {
    if (isChecking || flippedCards.includes(id) || 
        cards.find(card => card.id === id)?.isMatched || 
        flippedCards.length === 2) {
      return;
    }

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setIsChecking(true);
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards.find(card => card.id === firstId);
      const secondCard = cards.find(card => card.id === secondId);

      if (firstCard && secondCard) {
        const isMatch = wordPairs.some(pair => 
          (firstCard.content === pair.spanish && secondCard.content === pair.english) ||
          (firstCard.content === pair.english && secondCard.content === pair.spanish)
        );

        if (isMatch) {
          setCards(cards.map(card => 
            card.id === firstId || card.id === secondId
              ? { ...card, isMatched: true }
              : card
          ));
          setMatches(prev => {
            const newMatches = prev + 1;
            if (newMatches === wordPairs.length) {
              toast("¡Felicitaciones! You've completed the game! 🎉");
            }
            return newMatches;
          });
          setFlippedCards([]);
        } else {
          setTimeout(() => {
            setFlippedCards([]);
          }, 1000);
        }
      }
      setTimeout(() => setIsChecking(false), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <GameHeader matches={matches} totalPairs={wordPairs.length} />
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {cards.map(card => (
            <Card
              key={card.id}
              card={card}
              isFlipped={flippedCards.includes(card.id)}
              onClick={() => handleCardClick(card.id)}
            />
          ))}
        </motion.div>

        <GameFooter onRestart={initializeGame} matches={matches} totalPairs={wordPairs.length} />
      </div>
    </div>
  );
};

export default MemoryGame;