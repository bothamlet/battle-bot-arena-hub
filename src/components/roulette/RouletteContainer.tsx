
import React, { useState, useEffect } from "react";
import { Trophy, Rocket } from "lucide-react";
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
  
  const spinRoulette = () => {
    if (spinning) return;
    
    setSpinning(true);
    setResult(null);
    setSpinCompleted(false);
    setShowCelebration(false);
    
    // Calculate a random winning item
    const randomIndex = Math.floor(Math.random() * rouletteParts.length);
    const winningItem = rouletteParts[randomIndex];
    
    // Calculate rotation angle (multiple of 360 + winningIndex position)
    const segmentAngle = 360 / rouletteParts.length;
    const extraSpins = 5; // Number of full rotations
    const targetAngle = extraSpins * 360 + (randomIndex * segmentAngle);
    
    // Set the rotation angle
    setRotationAngle(targetAngle);
    
    // Set timeout to finish spinning
    setTimeout(() => {
      setSpinning(false);
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
          <RouletteWheel spinning={spinning} rotationAngle={rotationAngle} />
          <RouletteResult result={result} spinCompleted={spinCompleted} showCelebration={showCelebration} />
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
      
      <PartsList />
    </div>
  );
};

export default RouletteContainer;
