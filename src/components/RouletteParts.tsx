
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Banknote, Zap, Cpu, Cog, Wrench, Trophy } from "lucide-react";

type RoulettePart = {
  name: string;
  icon: React.ReactNode;
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary";
  color: string;
};

const rouletteParts: RoulettePart[] = [
  { name: "Motor", icon: <Zap className="h-8 w-8" />, rarity: "common", color: "bg-gray-300" },
  { name: "CPU", icon: <Cpu className="h-8 w-8" />, rarity: "uncommon", color: "bg-green-300" },
  { name: "Gear", icon: <Cog className="h-8 w-8" />, rarity: "common", color: "bg-gray-300" },
  { name: "Weapon", icon: <Wrench className="h-8 w-8" />, rarity: "rare", color: "bg-blue-300" },
  { name: "Frame", icon: <Banknote className="h-8 w-8" />, rarity: "uncommon", color: "bg-green-300" },
  { name: "Trophy Part", icon: <Trophy className="h-8 w-8" />, rarity: "legendary", color: "bg-yellow-300" },
];

const RouletteParts = ({ onClose }: { onClose: () => void }) => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<RoulettePart | null>(null);
  const [rouletteItems, setRouletteItems] = useState<RoulettePart[]>([]);

  // Generate random sequence for spinning effect
  useEffect(() => {
    if (!spinning) return;
    
    // Create a longer random sequence for spinning animation
    const sequence = Array(20)
      .fill(null)
      .map(() => rouletteParts[Math.floor(Math.random() * rouletteParts.length)]);
      
    setRouletteItems(sequence);
    
    // Set the final result
    const finalResult = rouletteParts[Math.floor(Math.random() * rouletteParts.length)];
    
    const timer = setTimeout(() => {
      setSpinning(false);
      setResult(finalResult);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [spinning]);

  const spinRoulette = () => {
    setSpinning(true);
    setResult(null);
  };

  return (
    <div className="p-6 bg-battlebot-deep-navy-blue rounded-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-battlebot-light-text">
        Robot Parts Roulette
      </h2>
      
      <div className="mb-6">
        <div className="relative h-20 overflow-hidden bg-battlebot-rich-blue rounded-lg mb-4 border-2 border-battlebot-golden-yellow">
          {spinning ? (
            <div className="absolute inset-0 flex items-center animate-[slide_3s_linear]">
              {rouletteItems.map((part, index) => (
                <div 
                  key={index} 
                  className={`flex-shrink-0 w-20 h-20 flex flex-col items-center justify-center ${part.color} border-r border-gray-700`}
                >
                  {part.icon}
                  <span className="text-xs text-battlebot-dark-text font-semibold mt-1">{part.name}</span>
                </div>
              ))}
            </div>
          ) : result ? (
            <div className={`w-full h-full flex flex-col items-center justify-center ${result.color}`}>
              {result.icon}
              <span className="text-sm text-battlebot-dark-text font-bold mt-1">{result.name}</span>
              <span className="text-xs text-battlebot-dark-text">{result.rarity}</span>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-battlebot-light-text">Spin to win parts!</span>
            </div>
          )}
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            onClick={spinRoulette}
            disabled={spinning}
            className="battle-button"
          >
            {spinning ? "Spinning..." : "Spin"}
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="bg-battlebot-rich-blue text-battlebot-light-text border-battlebot-golden-yellow hover:bg-battlebot-deep-navy-blue"
          >
            Close
          </Button>
        </div>
      </div>
      
      <div className="text-sm text-battlebot-light-text">
        <h3 className="font-bold mb-2">Rarities:</h3>
        <ul className="space-y-1">
          <li className="flex items-center"><span className="w-4 h-4 inline-block mr-2 bg-gray-300 rounded-full"></span> Common</li>
          <li className="flex items-center"><span className="w-4 h-4 inline-block mr-2 bg-green-300 rounded-full"></span> Uncommon</li>
          <li className="flex items-center"><span className="w-4 h-4 inline-block mr-2 bg-blue-300 rounded-full"></span> Rare</li>
          <li className="flex items-center"><span className="w-4 h-4 inline-block mr-2 bg-purple-300 rounded-full"></span> Epic</li>
          <li className="flex items-center"><span className="w-4 h-4 inline-block mr-2 bg-yellow-300 rounded-full"></span> Legendary</li>
        </ul>
      </div>
    </div>
  );
};

export default RouletteParts;
