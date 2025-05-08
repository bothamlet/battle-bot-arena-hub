
import React, { useState, useEffect, useCallback } from "react";
import { Trophy, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { RoulettePart } from "./RouletteTypes";
import { rouletteParts } from "./RouletteData";
import RouletteWheel from "./RouletteWheel";
import RouletteResult from "./RouletteResult";
import PartsList from "./PartsList";

const RouletteContainer: React.FC = () => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<RoulettePart | null>(null);
  const [spinCompleted, setSpinCompleted] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const { toast } = useToast();
  
  const getWeightedRandomItem = useCallback(() => {
    // Weight parts by rarity to make legendary/epic items rare
    const weights = {
      "common": 45,
      "uncommon": 30,
      "rare": 15,
      "epic": 7,
      "legendary": 3
    };
    
    // Create weighted array
    const weightedArray: RoulettePart[] = [];
    
    rouletteParts.forEach(part => {
      const weight = weights[part.rarity];
      for (let i = 0; i < weight; i++) {
        weightedArray.push(part);
      }
    });
    
    // Get random item from weighted array
    const randomIndex = Math.floor(Math.random() * weightedArray.length);
    return weightedArray[randomIndex];
  }, []);
  
  const spinRoulette = () => {
    if (spinning) return;
    
    setSpinning(true);
    setResult(null);
    setSpinCompleted(false);
    setShowCelebration(false);
    
    // Get the weighted random part
    const winningItem = getWeightedRandomItem();
    
    // Find the index of this item in the original array
    const winningIndex = rouletteParts.findIndex(item => item.name === winningItem.name);
    
    // Calculate rotation angle (multiple of 360 + winningIndex position)
    const segmentAngle = 360 / rouletteParts.length;
    const extraSpins = 8; // More spins for dramatic effect
    const targetAngle = extraSpins * 360 + (winningIndex * segmentAngle);
    
    // Set the rotation angle
    setRotationAngle(targetAngle);
    
    // Set timeout to finish spinning
    const spinDuration = 12000; // Match the duration in the wheel component
    
    setTimeout(() => {
      setSpinning(false);
      setResult(winningItem);
      setSpinCompleted(true);
      
      // Delay toast and celebration effects for suspense
      setTimeout(() => {
        setShowCelebration(true);
        
        const toastDescription = winningItem.rarity === "legendary" || winningItem.rarity === "epic" 
          ? "Wow! An extremely rare find!"
          : `Rarity: ${winningItem.rarity}`;
        
        toast({
          title: `You won: ${winningItem.name}!`,
          description: toastDescription,
          duration: 5000,
        });
      }, 1000);
    }, spinDuration);
  };

  return (
    <div className="bg-gradient-to-b from-amber-950 to-amber-900 rounded-lg border-4 border-amber-800 shadow-2xl max-w-4xl mx-auto overflow-hidden">
      <div className="p-6">
        <h2 className="text-4xl font-bold text-center mb-4 text-amber-300 flex items-center justify-center">
          <Trophy className="h-8 w-8 mr-3 text-amber-400" />
          Robot Parts Roulette
          <Trophy className="h-8 w-8 ml-3 text-amber-400" />
        </h2>
        
        <p className="text-center text-amber-200 mb-8 text-xl">
          Spin the wheel of fortune to win valuable robot parts!
        </p>
        
        <div className="relative">
          <div className="relative z-0">
            {/* Casino table cloth background */}
            <div 
              className="absolute inset-0 -m-6 rounded-xl"
              style={{
                background: "linear-gradient(135deg, #1E5631 0%, #0B7A40 100%)",
                boxShadow: "inset 0 0 80px rgba(0,0,0,0.4)",
                zIndex: -1
              }}
            ></div>
            
            <RouletteWheel spinning={spinning} rotationAngle={rotationAngle} />
          </div>
          <RouletteResult result={result} spinCompleted={spinCompleted} showCelebration={showCelebration} />
        </div>
        
        <div className="flex justify-center mt-12 mb-4">
          <Button
            onClick={spinRoulette}
            disabled={spinning}
            className={`bg-amber-700 text-amber-100 hover:bg-amber-600 font-bold text-xl px-8 py-6 rounded-lg shadow-lg transform transition-transform ${spinning ? 'opacity-50' : 'hover:scale-105 shadow-amber-900/50'}`}
            style={{
              background: spinning ? "#78350f" : "linear-gradient(180deg, #92400E 0%, #78350F 100%)",
              border: "2px solid #B45309",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3), inset 0 1px 3px rgba(255,255,255,0.2)"
            }}
          >
            <DollarSign className="mr-2 h-6 w-6" />
            {spinning ? "Spinning..." : "SPIN THE WHEEL"}
          </Button>
        </div>
      </div>
      
      <PartsList />
    </div>
  );
};

export default RouletteContainer;
