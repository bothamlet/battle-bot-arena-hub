
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RoulettePart, rarityColors } from "./RouletteTypes";

interface RouletteResultProps {
  result: RoulettePart | null;
  spinCompleted: boolean;
  showCelebration: boolean;
}

const RouletteResult: React.FC<RouletteResultProps> = ({ result, spinCompleted, showCelebration }) => {
  if (!spinCompleted || !result) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
        className="mt-8 p-8 bg-battlebot-rich-blue rounded-lg flex items-center justify-center flex-col border-2 border-battlebot-golden-yellow relative overflow-hidden"
      >
        {showCelebration && (
          <>
            <div className="absolute inset-0 z-0 overflow-hidden">
              {Array.from({ length: 50 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: `${Math.random() * 10 + 5}px`,
                    height: `${Math.random() * 10 + 5}px`,
                    backgroundColor: ['#FFD700', '#FF4500', '#00BFFF', '#7FFF00', '#FF1493'][Math.floor(Math.random() * 5)],
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animation: `fall ${Math.random() * 3 + 2}s linear infinite`,
                    animationDelay: `${Math.random() * 5}s`
                  }}
                ></div>
              ))}
            </div>
            <style>
              {`
                @keyframes fall {
                  0% { transform: translateY(-20px); opacity: 1; }
                  100% { transform: translateY(500px); opacity: 0; }
                }
              `}
            </style>
          </>
        )}
        
        <div className="relative z-10">
          <motion.div 
            initial={{ rotateY: 0 }}
            animate={{ rotateY: 360 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="w-32 h-32 flex items-center justify-center"
          >
            <div className={`p-6 rounded-full ${rarityColors[result.rarity]} shadow-lg`}>
              {result.icon}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center mt-5"
          >
            <h3 className="text-battlebot-golden-yellow font-bold text-3xl mb-2">{result.name}</h3>
            <p className={`capitalize text-lg font-medium ${rarityColors[result.rarity]} px-3 py-1 rounded-full inline-block mb-3`}>
              {result.rarity}
            </p>
            <p className="text-battlebot-light-text text-xl">{result.description}</p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default RouletteResult;
