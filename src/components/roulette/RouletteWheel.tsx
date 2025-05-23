import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { RouletteSegment, RoulettePart, robotParts } from "@/types/RouletteTypes";
import PrizeDetails from "./prize/PrizeDetails";
import PrizeIcon from "./prize/PrizeIcon";
import ConfettiEffect from "./effects/ConfettiEffect";
import SparkleEffect from "./effects/SparkleEffect";
import FireworksEffect from "./effects/FireworksEffect";

const RouletteWheel: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<RoulettePart | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const controls = useAnimation();
  const spinDuration = 5;

  // Create roulette segments with weighted probability
  const segments: RouletteSegment[] = [
    { id: 1, color: "bg-red-600", part: robotParts[0] },
    { id: 2, color: "bg-black", part: robotParts[1] },
    { id: 3, color: "bg-red-600", part: robotParts[2] },
    { id: 4, color: "bg-black", part: robotParts[3] },
    { id: 5, color: "bg-red-600", part: robotParts[4] },
    { id: 6, color: "bg-black", part: robotParts[5] },
    { id: 7, color: "bg-red-600", part: robotParts[6] },
    { id: 8, color: "bg-black", part: robotParts[7] },
    { id: 9, color: "bg-red-600", part: robotParts[8] },
    { id: 10, color: "bg-black", part: robotParts[9] },
    { id: 11, color: "bg-red-600", part: robotParts[10] },
    { id: 12, color: "bg-black", part: robotParts[11] },
  ];

  const getRandomResult = (): RoulettePart => {
    const rand = Math.random() * 100;
    
    if (rand < 1) {
      // 1% legendary
      return robotParts.find(part => part.rarity === "legendary") || robotParts[0];
    } else if (rand < 5) {
      // 4% epic
      return robotParts.find(part => part.rarity === "epic") || robotParts[0];
    } else if (rand < 15) {
      // 10% rare
      const rareParts = robotParts.filter(part => part.rarity === "rare");
      return rareParts[Math.floor(Math.random() * rareParts.length)];
    } else if (rand < 40) {
      // 25% uncommon
      const uncommonParts = robotParts.filter(part => part.rarity === "uncommon");
      return uncommonParts[Math.floor(Math.random() * uncommonParts.length)];
    } else {
      // 60% common
      const commonParts = robotParts.filter(part => part.rarity === "common");
      return commonParts[Math.floor(Math.random() * commonParts.length)];
    }
  };

  const spinWheel = async () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult(null);
    setShowCelebration(false);
    setShowFireworks(false);
    
    const randomResult = getRandomResult();
    const extraRotations = 5;
    const segmentAngle = 360 / segments.length;
    const resultPosition = Math.floor(Math.random() * segments.length);
    const resultAngle = resultPosition * segmentAngle;
    
    const finalRotation = (extraRotations * 360) + resultAngle + (Math.random() * (segmentAngle * 0.5));
    
    await controls.start({
      rotate: finalRotation,
      transition: { 
        duration: spinDuration,
        ease: "easeOut",
      }
    });
    
    setResult(randomResult);
    setIsSpinning(false);
    
    // Show fireworks for any win
    setShowFireworks(true);
    
    const isRare = randomResult.rarity === "epic" || randomResult.rarity === "legendary";
    if (isRare) {
      setShowCelebration(true);
    }

    // Hide fireworks after 4 seconds
    setTimeout(() => {
      setShowFireworks(false);
    }, 4000);
  };

  const isRare = result && (result.rarity === "epic" || result.rarity === "legendary");

  return (
    <div className="flex flex-col items-center space-y-6 relative">
      <ConfettiEffect show={showCelebration} />
      <FireworksEffect show={showFireworks} />
      
      <div className="relative w-80 h-80 sm:w-96 sm:h-96">
        <SparkleEffect show={showCelebration} isRare={!!isRare} />
        
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-5 z-10">
          <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-amber-500"></div>
        </div>
        
        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-amber-500 shadow-xl">
          <motion.div 
            className="absolute w-full h-full"
            animate={controls}
            style={{ originX: 0.5, originY: 0.5 }}
          >
            {segments.map((segment, index) => {
              const angle = (index * 360) / segments.length;
              return (
                <div
                  key={segment.id}
                  className={`absolute w-full h-full ${segment.color}`}
                  style={{
                    clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((angle - 360 / segments.length / 2) * Math.PI / 180)}% ${50 + 50 * Math.sin((angle - 360 / segments.length / 2) * Math.PI / 180)}%, ${50 + 50 * Math.cos((angle + 360 / segments.length / 2) * Math.PI / 180)}% ${50 + 50 * Math.sin((angle + 360 / segments.length / 2) * Math.PI / 180)}%)`,
                  }}
                >
                  <div
                    className="absolute text-white font-bold text-xs flex items-center justify-center"
                    style={{
                      left: `${50 + 35 * Math.cos(angle * Math.PI / 180)}%`,
                      top: `${50 + 35 * Math.sin(angle * Math.PI / 180)}%`,
                      transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                      width: '20px',
                      height: '20px',
                    }}
                  >
                    {segment.part.icon}
                  </div>
                </div>
              );
            })}
            
            <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-amber-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 border-2 border-amber-700"></div>
          </motion.div>
        </div>
      </div>
      
      <div className="flex flex-col items-center gap-4">
        <Button
          onClick={spinWheel}
          disabled={isSpinning}
          className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-6 rounded-full shadow-lg flex items-center gap-2 text-lg"
        >
          <RotateCw className={isSpinning ? "animate-spin" : ""} />
          {isSpinning ? "Spinning..." : "Spin Wheel"}
        </Button>
        
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-6 bg-battlebot-deep-navy-blue/90 border border-amber-500 rounded-lg text-center relative overflow-hidden"
          >
            <div className="flex flex-col items-center gap-4">
              <PrizeIcon 
                result={result} 
                isRare={!!isRare} 
                showCelebration={showCelebration} 
              />
              <PrizeDetails result={result} isRare={!!isRare} />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RouletteWheel;
