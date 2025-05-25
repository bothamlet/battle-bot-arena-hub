
import React, { useState, useRef, useEffect, useMemo } from "react";
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

  // Define rarity colors and segment distribution
  const rarityConfig = {
    common: { color: "bg-gray-600", segments: 24, probability: 60 }, // 60%
    uncommon: { color: "bg-green-600", segments: 10, probability: 25 }, // 25%
    rare: { color: "bg-blue-600", segments: 4, probability: 10 }, // 10%
    epic: { color: "bg-purple-600", segments: 2, probability: 4 }, // 4%
    legendary: { color: "bg-orange-500", segments: 1, probability: 1 } // 1%
  };

  // Create segments based on rarity distribution and shuffle them randomly - memoized to prevent re-creation
  const segments = useMemo(() => {
    const newSegments: Array<{ id: number; color: string; rarity: string; angle: number }> = [];
    let segmentId = 1;
    
    // Create all segments first
    Object.entries(rarityConfig).forEach(([rarity, config]) => {
      const segmentAngle = 360 / 41; // Total 41 segments
      const segmentWidth = config.segments;
      
      for (let i = 0; i < segmentWidth; i++) {
        newSegments.push({
          id: segmentId++,
          color: config.color,
          rarity,
          angle: segmentAngle
        });
      }
    });
    
    // Shuffle the segments randomly using Fisher-Yates algorithm
    for (let i = newSegments.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newSegments[i], newSegments[j]] = [newSegments[j], newSegments[i]];
    }
    
    return newSegments;
  }, []); // Empty dependency array means this only runs once

  const getRandomResult = (): RoulettePart => {
    const rand = Math.random() * 100;
    let selectedRarity: string;
    
    if (rand < 1) {
      selectedRarity = "legendary";
    } else if (rand < 5) {
      selectedRarity = "epic";
    } else if (rand < 15) {
      selectedRarity = "rare";
    } else if (rand < 40) {
      selectedRarity = "uncommon";
    } else {
      selectedRarity = "common";
    }

    // Get a random part from the selected rarity
    const partsOfRarity = robotParts.filter(part => part.rarity === selectedRarity);
    return partsOfRarity[Math.floor(Math.random() * partsOfRarity.length)];
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
    const extraRotations = 10;
    const segmentAngle = 360 / segments.length;
    
    // Find segments matching the result rarity
    const matchingSegments = segments
      .map((segment, index) => ({ segment, index }))
      .filter(({ segment }) => segment.rarity === randomResult.rarity);
    
    // Pick a random matching segment
    const selectedSegment = matchingSegments[Math.floor(Math.random() * matchingSegments.length)];
    const resultAngle = selectedSegment.index * segmentAngle;
    
    const newRotationAngle = rotationAngle + (extraRotations * 360) + resultAngle + (Math.random() * (segmentAngle * 0.8));
    setRotationAngle(newRotationAngle);
    
    const totalDuration = 8;
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
              const angle = (index * 360) / segments.length;
              return (
                <div
                  key={segment.id}
                  className={`absolute w-full h-full ${segment.color} transition-all duration-300 ${
                    isSlowingDown ? 'brightness-110' : ''
                  }`}
                  style={{
                    clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((angle - 360 / segments.length / 2) * Math.PI / 180)}% ${50 + 50 * Math.sin((angle - 360 / segments.length / 2) * Math.PI / 180)}%, ${50 + 50 * Math.cos((angle + 360 / segments.length / 2) * Math.PI / 180)}% ${50 + 50 * Math.sin((angle + 360 / segments.length / 2) * Math.PI / 180)}%)`,
                    willChange: isSpinning ? 'transform' : 'auto',
                  }}
                >
                  {/* Rarity indicator text */}
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
                    {segment.rarity === 'legendary' ? '★' : 
                     segment.rarity === 'epic' ? '◆' :
                     segment.rarity === 'rare' ? '●' :
                     segment.rarity === 'uncommon' ? '▲' : '■'}
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
        
        {/* Rarity Legend */}
        <div className="flex flex-wrap justify-center gap-2 text-sm">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-600 rounded"></div>
            <span className="text-gray-300">Common (■)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-600 rounded"></div>
            <span className="text-green-300">Uncommon (▲)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-600 rounded"></div>
            <span className="text-blue-300">Rare (●)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-purple-600 rounded"></div>
            <span className="text-purple-300">Epic (◆)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-orange-500 rounded"></div>
            <span className="text-orange-300">Legendary (★)</span>
          </div>
        </div>
        
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
