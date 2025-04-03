
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Banknote, Zap, Cpu, Cog, Wrench, Trophy, Rocket, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

type RoulettePart = {
  name: string;
  icon: React.ReactNode;
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary";
  color: string;
  description: string;
};

const rouletteParts: RoulettePart[] = [
  { 
    name: "Motor", 
    icon: <Zap className="h-8 w-8" />, 
    rarity: "common", 
    color: "bg-red-500",
    description: "Basic propulsion unit for your robot"
  },
  { 
    name: "CPU", 
    icon: <Cpu className="h-8 w-8" />, 
    rarity: "uncommon", 
    color: "bg-black",
    description: "Processing unit to enhance AI capabilities"
  },
  { 
    name: "Gear", 
    icon: <Cog className="h-8 w-8" />, 
    rarity: "common", 
    color: "bg-red-500",
    description: "Essential mechanical component" 
  },
  { 
    name: "Weapon", 
    icon: <Wrench className="h-8 w-8" />, 
    rarity: "rare", 
    color: "bg-black",
    description: "Offensive attachment for combat"
  },
  { 
    name: "Frame", 
    icon: <Shield className="h-8 w-8" />, 
    rarity: "uncommon", 
    color: "bg-red-500",
    description: "Structural chassis enhancement"
  },
  { 
    name: "Trophy Part", 
    icon: <Trophy className="h-8 w-8" />, 
    rarity: "legendary", 
    color: "bg-black",
    description: "Rare component from championship robots"
  },
  { 
    name: "Booster", 
    icon: <Rocket className="h-8 w-8" />, 
    rarity: "epic", 
    color: "bg-black",
    description: "Speed enhancement module"
  },
  { 
    name: "Power Core", 
    icon: <Banknote className="h-8 w-8" />, 
    rarity: "rare", 
    color: "bg-red-500",
    description: "Advanced energy storage unit"
  },
];

const rarityColors = {
  common: "bg-gray-300 text-gray-800",
  uncommon: "bg-green-400 text-green-900",
  rare: "bg-blue-400 text-blue-900",
  epic: "bg-purple-400 text-purple-900",
  legendary: "bg-yellow-400 text-yellow-900"
};

const RoulettePartsNew: React.FC = () => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<RoulettePart | null>(null);
  const [items, setItems] = useState<RoulettePart[]>([]);
  const [spinCompleted, setSpinCompleted] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [showCelebration, setShowCelebration] = useState(false);
  
  // Set up the roulette items
  useEffect(() => {
    // Create a list of items to display in the roulette
    // We duplicate the parts to create a longer list for better visual effect
    const rouletteItems = [...rouletteParts, ...rouletteParts, ...rouletteParts].sort(() => Math.random() - 0.5);
    setItems(rouletteItems);
  }, []);

  const spinRoulette = () => {
    if (spinning) return;
    
    setSpinning(true);
    setResult(null);
    setSpinCompleted(false);
    setShowCelebration(false);
    
    // Calculate a random winning item
    const randomIndex = Math.floor(Math.random() * rouletteParts.length);
    const winningItem = rouletteParts[randomIndex];
    
    // Set timeout to finish spinning
    setTimeout(() => {
      setResult(winningItem);
      setSpinCompleted(true);
      
      // Delay toast and celebration effects for suspense
      setTimeout(() => {
        setShowCelebration(true);
        
        toast({
          title: `You won: ${winningItem.name}!`,
          description: `Rarity: ${winningItem.rarity}`,
          duration: 5000,
        });
      }, 1000);
    }, 5000); // 5 seconds of spinning
  };

  return (
    <div className="bg-battlebot-dark-blue-black rounded-lg border-4 border-battlebot-golden-yellow shadow-2xl max-w-4xl mx-auto overflow-hidden">
      <div className="bg-gradient-to-r from-battlebot-deep-navy-blue to-battlebot-rich-blue p-6">
        <h2 className="text-4xl font-bold text-center mb-4 text-battlebot-golden-yellow flex items-center justify-center">
          <Trophy className="h-8 w-8 mr-3 text-battlebot-bright-yellow" />
          Robot Parts Roulette
          <Trophy className="h-8 w-8 ml-3 text-battlebot-bright-yellow" />
        </h2>
        
        <p className="text-center text-battlebot-light-text mb-8 text-xl">
          Spin the wheel of fortune to win valuable robot parts!
        </p>
        
        <div className="relative">
          {/* Casino-style roulette display */}
          <div className="max-w-3xl mx-auto bg-battlebot-deep-navy-blue rounded-lg p-4 overflow-hidden border-2 border-battlebot-golden-yellow relative">
            <div className="absolute inset-0 bg-gradient-to-r from-battlebot-golden-yellow/10 to-battlebot-golden-yellow/5 pointer-events-none"></div>
            
            {/* Pointer indicator */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10 w-8 h-10">
              <div className="w-0 h-0 border-l-[16px] border-r-[16px] border-t-[24px] border-l-transparent border-r-transparent border-t-battlebot-golden-yellow mx-auto shadow-lg"></div>
            </div>
            
            {/* Roulette items container */}
            <div 
              ref={wheelRef}
              className="relative h-32 overflow-hidden rounded border-2 border-battlebot-light-text/20"
            >
              <div 
                className={`flex transition-transform duration-5000 ease-out`}
                style={{ 
                  transform: spinning ? 'translateX(-92%)' : 'translateX(0)',
                  width: `${items.length * 180}px`,
                  transitionTimingFunction: spinning ? 'cubic-bezier(0.1, 0.7, 0.1, 1)' : 'ease-out'
                }}
              >
                {items.map((item, index) => (
                  <div 
                    key={index} 
                    className={`flex-shrink-0 w-44 h-32 flex flex-col items-center justify-center border-r-2 border-battlebot-light-text/20 ${
                      item.color === 'bg-red-500' ? 'bg-gradient-to-b from-red-800 to-red-950' : 'bg-gradient-to-b from-black to-gray-900'
                    }`}
                  >
                    <div className={`p-3 rounded-full ${rarityColors[item.rarity]}`}>
                      {item.icon}
                    </div>
                    <p className="text-battlebot-light-text font-bold mt-2 text-center">
                      {item.name}
                    </p>
                    <p className={`text-xs ${rarityColors[item.rarity]} px-2 py-0.5 rounded-full mt-1`}>
                      {item.rarity}
                    </p>
                  </div>
                ))}
              </div>
              
              {/* Highlight for the winning position */}
              <div className="absolute left-1/2 top-0 transform -translate-x-1/2 h-full w-[180px] border-l-2 border-r-2 border-battlebot-bright-yellow/50 z-10 pointer-events-none"></div>
              
              {/* Overlay gradient on both sides */}
              <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-battlebot-deep-navy-blue to-transparent z-20 pointer-events-none"></div>
              <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-battlebot-deep-navy-blue to-transparent z-20 pointer-events-none"></div>
            </div>
            
            {/* Lights animation */}
            <div className="absolute inset-x-0 top-0 flex justify-between">
              {Array.from({ length: 20 }).map((_, i) => (
                <div 
                  key={i}
                  className={`w-3 h-3 rounded-full ${spinning ? 'animate-pulse' : ''}`}
                  style={{ 
                    backgroundColor: spinning ? (i % 2 === 0 ? '#FFD700' : '#FF4500') : '#555',
                    animationDelay: `${i * 0.1}s` 
                  }}
                ></div>
              ))}
            </div>
            
            <div className="absolute inset-x-0 bottom-0 flex justify-between">
              {Array.from({ length: 20 }).map((_, i) => (
                <div 
                  key={i}
                  className={`w-3 h-3 rounded-full ${spinning ? 'animate-pulse' : ''}`}
                  style={{ 
                    backgroundColor: spinning ? (i % 2 === 0 ? '#FFD700' : '#FF4500') : '#555',
                    animationDelay: `${i * 0.1}s` 
                  }}
                ></div>
              ))}
            </div>
          </div>
          
          {/* Result display with animation */}
          <AnimatePresence>
            {spinCompleted && result && (
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
                    <style jsx>{`
                      @keyframes fall {
                        0% { transform: translateY(-20px); opacity: 1; }
                        100% { transform: translateY(500px); opacity: 0; }
                      }
                    `}</style>
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
            )}
          </AnimatePresence>
        </div>
        
        <div className="flex justify-center mt-8">
          <Button
            onClick={spinRoulette}
            disabled={spinning}
            className="bg-battlebot-golden-yellow text-battlebot-dark-text hover:bg-battlebot-bright-yellow font-bold text-xl px-8 py-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
          >
            {spinning ? "Spinning..." : "SPIN THE WHEEL"}
          </Button>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-battlebot-rich-blue/50 to-battlebot-deep-navy-blue/50 p-6">
        <h3 className="text-2xl font-bold mb-4 text-battlebot-golden-yellow">Available Robot Parts:</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {rouletteParts.map((part, index) => (
            <div key={index} className="bg-battlebot-deep-navy-blue/80 border border-battlebot-golden-yellow/30 rounded-lg p-4 hover:border-battlebot-golden-yellow transition-colors">
              <div className="flex items-center mb-2">
                <span className={`w-10 h-10 inline-flex items-center justify-center mr-3 rounded-full ${rarityColors[part.rarity]}`}>
                  {part.icon}
                </span>
                <div>
                  <span className="font-bold text-battlebot-light-text block">{part.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${rarityColors[part.rarity]}`}>
                    {part.rarity}
                  </span>
                </div>
              </div>
              <p className="text-battlebot-light-text/80 text-sm">{part.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoulettePartsNew;
