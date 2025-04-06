
import React from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { RoulettePart, rarityColors } from "./RouletteTypes";
import { rouletteParts } from "./RouletteData";

interface RouletteWheelProps {
  spinning: boolean;
  rotationAngle: number;
}

const RouletteWheel: React.FC<RouletteWheelProps> = ({ spinning, rotationAngle }) => {
  return (
    <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto">
      {/* Pointer indicator */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10 w-8 h-10">
        <div className="w-0 h-0 border-l-[16px] border-r-[16px] border-t-[24px] border-l-transparent border-r-transparent border-t-battlebot-golden-yellow mx-auto shadow-lg"></div>
      </div>
            
      {/* Roulette wheel */}
      <div 
        className="w-full h-full rounded-full overflow-hidden border-8 border-battlebot-golden-yellow relative"
        style={{
          boxShadow: "0 0 20px rgba(255, 215, 0, 0.5)"
        }}
      >
        <motion.div 
          className="w-full h-full"
          animate={{ 
            rotate: rotationAngle 
          }}
          transition={{ 
            duration: spinning ? 5 : 0, 
            ease: spinning ? "easeInOut" : "easeOut",
            type: "spring",
            damping: 20
          }}
        >
          {rouletteParts.map((part, index) => {
            const segmentAngle = 360 / rouletteParts.length;
            const startAngle = index * segmentAngle;
            
            return (
              <div 
                key={index} 
                className="absolute top-0 left-0 w-full h-full"
                style={{ 
                  transform: `rotate(${startAngle}deg)`,
                  transformOrigin: "50% 50%"
                }}
              >
                <div 
                  className="absolute w-full h-1/2 overflow-hidden origin-bottom"
                  style={{ 
                    transform: 'translateX(50%)',
                    backgroundColor: part.color === 'bg-red-500' ? '#7f1d1d' : '#111'
                  }}
                >
                  <div className="relative w-full h-full">
                    <div className="absolute bottom-3 left-0 w-full text-center transform -translate-x-1/2 rotate-90">
                      <div className={`inline-block ${rarityColors[part.rarity]} p-2 rounded-full`}>
                        {part.icon}
                      </div>
                      <p className="text-battlebot-light-text text-sm mt-1 font-bold">{part.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
              
        {/* Center cap */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-battlebot-golden-yellow flex items-center justify-center z-10">
          <div className="w-10 h-10 rounded-full bg-battlebot-deep-navy-blue flex items-center justify-center">
            <Trophy className="h-6 w-6 text-battlebot-golden-yellow" />
          </div>
        </div>
      </div>
            
      {/* Blinking lights around the wheel */}
      <div className="absolute inset-0 -m-2 rounded-full pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => {
          const angle = (i / 20) * 360;
          const radian = (angle * Math.PI) / 180;
          const radius = 48.5;
          const x = radius * Math.cos(radian);
          const y = radius * Math.sin(radian);
                
          return (
            <div 
              key={i}
              className={`absolute w-3 h-3 rounded-full ${spinning ? 'animate-pulse' : ''}`}
              style={{ 
                left: `calc(50% + ${x}%)`,
                top: `calc(50% + ${y}%)`,
                backgroundColor: spinning ? (i % 2 === 0 ? '#FFD700' : '#FF4500') : '#555',
                animationDelay: `${i * 0.1}s` 
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default RouletteWheel;
