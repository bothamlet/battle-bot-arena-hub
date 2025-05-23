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
import WinAnnouncement from "./effects/WinAnnouncement";

const RouletteWheel: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<RoulettePart | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showWinAnnouncement, setShowWinAnnouncement] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isSlowingDown, setIsSlowingDown] = useState(false);
  const controls = useAnimation();
  const spinDuration = 4; // Slightly faster base spin
  const slowDownDuration = 2; // Suspenseful slowdown phase

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
    setShowWinAnnouncement(false);
    setIsSlowingDown(false);
    
    const randomResult = getRandomResult();
    const extraRotations = 8; // More rotations for drama
    const segmentAngle = 360 / segments.length;
    const resultPosition = Math.floor(Math.random() * segments.length);
    const resultAngle = resultPosition * segmentAngle;
    
    // Calculate new rotation angle relative to the current position
    const newRotationAngle = rotationAngle + (extraRotations * 360) + resultAngle + (Math.random() * (segmentAngle * 0.3));
    setRotationAngle(newRotationAngle);
    
    // First phase: Fast spinning
    await controls.start({
      rotate: newRotationAngle - 180, // Stop just before the result
      transition: { 
        duration: spinDuration,
        ease: "easeOut",
      }
    });
    
    // Suspenseful slowdown phase
    setIsSlowingDown(true);
    await controls.start({
      rotate: newRotationAngle,
      transition: { 
        duration: slowDownDuration,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for dramatic effect
      }
    });
    
    setResult(randomResult);
    setIsSpinning(false);
    setIsSlowingDown(false);
    
    // Show win announcement first
    setShowWinAnnouncement(true);
    
    // Then show fireworks
    setTimeout(() => {
      setShowFireworks(true);
    }, 500);
    
    const isRare = randomResult.rarity === "epic" || randomResult.rarity === "legendary";
    if (isRare) {
      setTimeout(() => {
        setShowCelebration(true);
      }, 800);
    }

    // Hide effects after duration
    setTimeout(() => {
      setShowFireworks(false);
      setShowWinAnnouncement(false);
    }, 8000);
  };

  const isRare = result && (result.rarity === "epic" || result.rarity === "legendary");

  return (
    <div className="flex flex-col items-center space-y-6 relative">
      <ConfettiEffect show={showCelebration} />
      <FireworksEffect show={showFireworks} />
      <WinAnnouncement show={showWinAnnouncement} result={result} />
      
      <div className="relative w-80 h-80 sm:w-96 sm:h-96">
        <SparkleEffect show={showCelebration} isRare={!!isRare} />
        
        {/* Enhanced pointer with glow effect */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-5 z-10">
          <div 
            className={`w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-amber-500 transition-all duration-300 ${
              isSlowingDown ? 'filter drop-shadow-[0_0_8px_rgba(245,158,11,0.8)] scale-110' : ''
            }`}
          ></div>
        </div>
        
        {/* Enhanced wheel with dynamic border */}
        <div 
          className={`relative w-full h-full rounded-full overflow-hidden transition-all duration-500 ${
            isSpinning 
              ? 'border-4 border-amber-400 shadow-2xl shadow-amber-400/50' 
              : 'border-4 border-amber-500 shadow-xl'
          }`}
        >
          <motion.div 
            className="absolute w-full h-full"
            animate={controls}
            initial={{ rotate: rotationAngle }}
            style={{ originX: 0.5, originY: 0.5 }}
          >
            {segments.map((segment, index) => {
              const angle = (index * 360) / segments.length;
              return (
                <div
                  key={segment.id}
                  className={`absolute w-full h-full ${segment.color} transition-all duration-300 ${
                    isSlowingDown ? 'brightness-110' : ''
                  }`}
                  style={{
                    clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((angle - 360 / segments.length / 2) * Math.PI / 180)}% ${50 + 50 * Math.sin((angle - 360 / segments.length / 2) * Math.PI / 180)}%, ${50 + 50 * Math.cos((angle + 360 / segments.length / 2) * Math.PI / 180)}% ${50 + 50 * Math.sin((angle + 360 / segments.length / 2) * Math.PI / 180)}%)`,
                  }}
                >
                  <div
                    className={`absolute text-white font-bold text-xs flex items-center justify-center transition-all duration-300 ${
                      isSlowingDown ? 'scale-110' : ''
                    }`}
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
            
            {/* Enhanced center hub */}
            <div 
              className={`absolute top-1/2 left-1/2 w-8 h-8 bg-amber-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 border-2 border-amber-700 transition-all duration-300 ${
                isSpinning ? 'shadow-lg shadow-amber-400/60 scale-110' : ''
              }`}
            ></div>
          </motion.div>
        </div>
      </div>
      
      <div className="flex flex-col items-center gap-4">
        {/* Enhanced spin button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={spinWheel}
            disabled={isSpinning}
            className={`bg-amber-500 hover:bg-amber-600 text-black font-bold py-4 px-8 rounded-full shadow-lg flex items-center gap-2 text-xl transition-all duration-300 ${
              isSpinning 
                ? 'animate-pulse shadow-amber-400/60 shadow-xl' 
                : 'hover:shadow-amber-400/40 hover:shadow-xl'
            }`}
          >
            <RotateCw 
              className={`${isSpinning ? "animate-spin" : ""} transition-all duration-300`} 
              size={24}
            />
            {isSpinning ? (isSlowingDown ? "Almost there..." : "Spinning...") : "Spin Wheel"}
          </Button>
        </motion.div>
        
        {result && !showWinAnnouncement && (
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
