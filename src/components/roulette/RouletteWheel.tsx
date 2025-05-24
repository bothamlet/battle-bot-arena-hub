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

  // Create roulette segments with weighted probability and varying widths
  const createSegments = (): RouletteSegment[] => {
    const segments: RouletteSegment[] = [];
    let currentAngle = 0;
    let segmentId = 1;

    // Define segment widths based on rarity (in degrees)
    const segmentWidths = {
      legendary: 8,   // Very thin - 8 degrees
      epic: 12,       // Thin - 12 degrees  
      rare: 18,       // Medium - 18 degrees
      uncommon: 24,   // Medium-wide - 24 degrees
      common: 36      // Wide - 36 degrees
    };

    // Define colors for each rarity
    const rarityColors = {
      legendary: "bg-gradient-to-r from-purple-600 to-pink-600", // Purple-pink gradient
      epic: "bg-gradient-to-r from-orange-500 to-red-600",       // Orange-red gradient
      rare: "bg-gradient-to-r from-blue-500 to-indigo-600",      // Blue gradient
      uncommon: "bg-gradient-to-r from-green-500 to-emerald-600", // Green gradient
      common: "bg-gradient-to-r from-gray-600 to-gray-700"       // Gray gradient
    };

    // Create segments ensuring we fill the full 360 degrees
    const totalDegrees = 360;
    
    // Add legendary segments (2 segments)
    for (let i = 0; i < 2; i++) {
      const legendaryPart = robotParts.find(part => part.rarity === "legendary");
      if (legendaryPart && currentAngle < totalDegrees) {
        segments.push({
          id: segmentId++,
          color: rarityColors.legendary,
          part: legendaryPart,
          startAngle: currentAngle,
          width: segmentWidths.legendary
        });
        currentAngle += segmentWidths.legendary;
      }
    }

    // Add epic segments (3 segments)
    for (let i = 0; i < 3; i++) {
      const epicPart = robotParts.find(part => part.rarity === "epic");
      if (epicPart && currentAngle < totalDegrees) {
        segments.push({
          id: segmentId++,
          color: rarityColors.epic,
          part: epicPart,
          startAngle: currentAngle,
          width: segmentWidths.epic
        });
        currentAngle += segmentWidths.epic;
      }
    }

    // Add rare segments (4 segments)
    const rareParts = robotParts.filter(part => part.rarity === "rare");
    for (let i = 0; i < 4; i++) {
      const rarePart = rareParts[i % rareParts.length];
      if (rarePart && currentAngle < totalDegrees) {
        segments.push({
          id: segmentId++,
          color: rarityColors.rare,
          part: rarePart,
          startAngle: currentAngle,
          width: segmentWidths.rare
        });
        currentAngle += segmentWidths.rare;
      }
    }

    // Add uncommon segments (5 segments)
    const uncommonParts = robotParts.filter(part => part.rarity === "uncommon");
    for (let i = 0; i < 5; i++) {
      const uncommonPart = uncommonParts[i % uncommonParts.length];
      if (uncommonPart && currentAngle < totalDegrees) {
        segments.push({
          id: segmentId++,
          color: rarityColors.uncommon,
          part: uncommonPart,
          startAngle: currentAngle,
          width: segmentWidths.uncommon
        });
        currentAngle += segmentWidths.uncommon;
      }
    }

    // Fill remaining space with common segments
    const commonParts = robotParts.filter(part => part.rarity === "common");
    let commonIndex = 0;
    while (currentAngle < totalDegrees - 10) { // Leave small buffer
      const commonPart = commonParts[commonIndex % commonParts.length];
      const remainingSpace = totalDegrees - currentAngle;
      const segmentWidth = Math.min(segmentWidths.common, remainingSpace);
      
      segments.push({
        id: segmentId++,
        color: rarityColors.common,
        part: commonPart,
        startAngle: currentAngle,
        width: segmentWidth
      });
      currentAngle += segmentWidth;
      commonIndex++;
    }

    return segments;
  };

  const segments = createSegments();

  const getRandomResult = (): { part: RoulettePart; segmentIndex: number } => {
    const rand = Math.random() * 100;
    let targetRarity: string;
    
    if (rand < 1) {
      targetRarity = "legendary";
    } else if (rand < 5) {
      targetRarity = "epic";
    } else if (rand < 15) {
      targetRarity = "rare";
    } else if (rand < 40) {
      targetRarity = "uncommon";
    } else {
      targetRarity = "common";
    }

    // Find segments with matching rarity
    const matchingSegments = segments.filter(segment => segment.part.rarity === targetRarity);
    const selectedSegment = matchingSegments[Math.floor(Math.random() * matchingSegments.length)];
    const segmentIndex = segments.findIndex(seg => seg.id === selectedSegment.id);
    
    return { part: selectedSegment.part, segmentIndex };
  };

  const spinWheel = async () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult(null);
    setShowCelebration(false);
    setShowFireworks(false);
    setShowWinAnnouncement(false);
    setIsSlowingDown(false);
    
    const { part: randomResult, segmentIndex } = getRandomResult();
    const extraRotations = 8;
    
    // Calculate the angle to land on the selected segment
    const targetSegment = segments[segmentIndex];
    const segmentCenterAngle = targetSegment.startAngle + (targetSegment.width / 2);
    
    // Add some randomness within the segment
    const randomWithinSegment = (Math.random() - 0.5) * (targetSegment.width * 0.6);
    const finalAngle = segmentCenterAngle + randomWithinSegment;
    
    const newRotationAngle = rotationAngle + (extraRotations * 360) + (360 - finalAngle);
    setRotationAngle(newRotationAngle);
    
    // Trigger slowdown effect at 60% of the animation for longer suspense
    const totalDuration = 7;
    const slowdownTrigger = totalDuration * 0.6;
    
    setTimeout(() => {
      setIsSlowingDown(true);
    }, slowdownTrigger * 1000);
    
    await controls.start({
      rotate: newRotationAngle,
      transition: { 
        duration: totalDuration,
        ease: [0.25, 0.05, 0.15, 1],
      }
    });
    
    setResult(randomResult);
    setIsSpinning(false);
    setIsSlowingDown(false);
    
    setShowWinAnnouncement(true);
    
    setTimeout(() => {
      setShowFireworks(true);
    }, 500);
    
    const isRare = randomResult.rarity === "epic" || randomResult.rarity === "legendary";
    if (isRare) {
      setTimeout(() => {
        setShowCelebration(true);
      }, 800);
    }

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
        
        {/* Enhanced wheel with dynamic border and performance optimizations */}
        <div 
          className={`relative w-full h-full rounded-full overflow-hidden transition-all duration-500 ${
            isSpinning 
              ? 'border-4 border-amber-400 shadow-2xl shadow-amber-400/50' 
              : 'border-4 border-amber-500 shadow-xl'
          }`}
        >
          <motion.div 
            className="absolute w-full h-full will-change-transform"
            animate={controls}
            initial={{ rotate: rotationAngle }}
            style={{ 
              originX: 0.5, 
              originY: 0.5,
              transform: `rotate(${rotationAngle}deg) translateZ(0)`,
              backfaceVisibility: 'hidden',
            }}
          >
            {segments.map((segment, index) => {
              const startAngle = segment.startAngle;
              const endAngle = startAngle + segment.width;
              const centerAngle = startAngle + (segment.width / 2);
              
              // Calculate polygon points for the segment
              const startX = 50 + 50 * Math.cos((startAngle - 90) * Math.PI / 180);
              const startY = 50 + 50 * Math.sin((startAngle - 90) * Math.PI / 180);
              const endX = 50 + 50 * Math.cos((endAngle - 90) * Math.PI / 180);
              const endY = 50 + 50 * Math.sin((endAngle - 90) * Math.PI / 180);
              
              return (
                <div
                  key={segment.id}
                  className={`absolute w-full h-full ${segment.color} transition-all duration-300 border border-black/20 ${
                    isSlowingDown ? 'brightness-110' : ''
                  }`}
                  style={{
                    clipPath: `polygon(50% 50%, ${startX}% ${startY}%, ${endX}% ${endY}%)`,
                    willChange: isSpinning ? 'transform' : 'auto',
                  }}
                >
                  <div
                    className={`absolute text-white font-bold text-xs flex items-center justify-center transition-all duration-300 drop-shadow-lg ${
                      isSlowingDown ? 'scale-110' : ''
                    }`}
                    style={{
                      left: `${50 + 35 * Math.cos((centerAngle - 90) * Math.PI / 180)}%`,
                      top: `${50 + 35 * Math.sin((centerAngle - 90) * Math.PI / 180)}%`,
                      transform: `translate(-50%, -50%) rotate(${centerAngle}deg)`,
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
