
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Banknote, Zap, Cpu, Cog, Wrench, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const [rotationDegree, setRotationDegree] = useState(0);
  const { toast } = useToast();
  
  useEffect(() => {
    if (!spinning) return;
    
    // Generate a random number of full rotations plus the position for the final result
    const numberOfRotations = 5 + Math.random() * 5; // Between 5-10 full rotations
    const segmentAngle = 360 / rouletteParts.length;
    const randomIndex = Math.floor(Math.random() * rouletteParts.length);
    
    // Calculate final position: full rotations + position to land on the chosen item
    // We subtract from 360 because we want the arrow to point at the segment (reverse calculation)
    const finalPosition = (numberOfRotations * 360) + (360 - (randomIndex * segmentAngle) - (segmentAngle / 2));
    
    // Animate rotation
    let start: number | null = null;
    const duration = 3000; // 3 seconds spin
    
    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for slowing down toward the end
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
      const currentRotation = progress < 1 
        ? progress * finalPosition 
        : finalPosition;
      
      setRotationDegree(easeOut(progress) * finalPosition);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Animation completed
        setSpinning(false);
        setResult(rouletteParts[randomIndex]);
        
        // Show toast notification
        toast({
          title: `You won: ${rouletteParts[randomIndex].name}!`,
          description: `Rarity: ${rouletteParts[randomIndex].rarity}`,
          duration: 5000,
        });
      }
    };
    
    requestAnimationFrame(animate);
  }, [spinning, toast]);

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
        <div className="relative w-64 h-64 mx-auto">
          {/* Circular Roulette Wheel */}
          <div 
            className="w-full h-full rounded-full border-4 border-battlebot-golden-yellow overflow-hidden"
            style={{ 
              transform: `rotate(${rotationDegree}deg)`, 
              transition: spinning ? "none" : "transform 0.5s ease-out",
              boxShadow: "0 0 15px rgba(255, 214, 10, 0.5)"
            }}
          >
            {rouletteParts.map((part, index) => {
              const segmentAngle = 360 / rouletteParts.length;
              const rotation = index * segmentAngle;
              
              return (
                <div 
                  key={index}
                  className={`absolute w-full h-full ${part.color}`}
                  style={{
                    clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((rotation + segmentAngle) * Math.PI / 180)}% ${50 + 50 * Math.sin((rotation + segmentAngle) * Math.PI / 180)}%, 50% 50%)`,
                    transform: `rotate(${rotation}deg)`,
                  }}
                >
                  <div 
                    className="absolute"
                    style={{ 
                      left: '50%', 
                      top: '20%',
                      transform: `translateX(-50%) rotate(${90}deg)` 
                    }}
                  >
                    {part.icon}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Arrow Pointer */}
          <div 
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 z-10"
            style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.5))" }}
          >
            <div className="w-0 h-0 mx-auto border-l-[10px] border-r-[10px] border-t-[20px] border-l-transparent border-r-transparent border-t-battlebot-bright-yellow"></div>
          </div>
          
          {/* Center circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-battlebot-rich-blue border-2 border-battlebot-golden-yellow z-10 flex items-center justify-center">
            <Trophy className="h-6 w-6 text-battlebot-golden-yellow" />
          </div>
        </div>

        {/* Result Display */}
        {result && !spinning && (
          <div className="mt-4 p-2 rounded-lg flex items-center justify-center flex-col">
            <div className={`p-3 rounded-full ${result.color}`}>
              {result.icon}
            </div>
            <div className="text-center mt-2">
              <p className="text-battlebot-golden-yellow font-bold">{result.name}</p>
              <p className="text-battlebot-light-text text-sm capitalize">{result.rarity}</p>
            </div>
          </div>
        )}

        <div className="flex justify-center space-x-4 mt-6">
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
