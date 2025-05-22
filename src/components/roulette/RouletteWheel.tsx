
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RotateCw, Robot, Wrench, Gear, Cpu, Battery, Microchip, HardDrive } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { RoulettePart, RouletteSegment } from "./RouletteTypes";
import PrizeDetails from "./prize/PrizeDetails";
import PrizeIcon from "./prize/PrizeIcon";
import SparkleEffect from "./effects/SparkleEffect";
import ConfettiEffect from "./effects/ConfettiEffect";

const RouletteWheel: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<RouletteSegment | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const controls = useAnimation();
  const spinDuration = 5;
  
  // Define robot parts with their rarities
  const robotParts: RoulettePart[] = [
    { 
      name: "Basic CPU", 
      rarity: "common", 
      description: "A standard processing unit for basic robot functions.",
      icon: <Cpu className="w-8 h-8 text-gray-200" />
    },
    { 
      name: "Steel Gear", 
      rarity: "common", 
      description: "Standard metal gear for mechanical movement.",
      icon: <Gear className="w-8 h-8 text-gray-200" />
    },
    { 
      name: "Standard Battery", 
      rarity: "common", 
      description: "Provides basic power to robot components.",
      icon: <Battery className="w-8 h-8 text-gray-200" />
    },
    { 
      name: "Reinforced Wrench", 
      rarity: "uncommon", 
      description: "Hardened tool for advanced adjustments.",
      icon: <Wrench className="w-8 h-8 text-green-200" />
    },
    { 
      name: "Enhanced Microchip", 
      rarity: "uncommon", 
      description: "Improved processing capabilities for faster calculations.",
      icon: <Microchip className="w-8 h-8 text-green-200" />
    },
    { 
      name: "Tactical Sensor", 
      rarity: "rare", 
      description: "High precision sensor array for advanced detection.",
      icon: <Robot className="w-8 h-8 text-blue-200" />
    },
    { 
      name: "Quantum Processor", 
      rarity: "rare", 
      description: "Next-gen computing core for complex operations.",
      icon: <Cpu className="w-8 h-8 text-blue-200" />
    },
    { 
      name: "Fusion Cell", 
      rarity: "epic", 
      description: "Advanced power source utilizing fusion technology.",
      icon: <Battery className="w-8 h-8 text-purple-200" />
    },
    { 
      name: "Neural Network Module", 
      rarity: "epic", 
      description: "AI learning system for adaptive robot behavior.",
      icon: <Microchip className="w-8 h-8 text-purple-200" />
    },
    { 
      name: "Quantum Storage", 
      rarity: "legendary", 
      description: "Revolutionary data storage with near-infinite capacity.",
      icon: <HardDrive className="w-8 h-8 text-amber-200" />
    },
    { 
      name: "Graviton Core", 
      rarity: "legendary", 
      description: "Experimental power source harnessing gravitational energy.",
      icon: <Gear className="w-8 h-8 text-amber-200" />
    },
    { 
      name: "Sentient Circuit", 
      rarity: "legendary", 
      description: "Self-aware processing unit that develops its own logic.",
      icon: <Robot className="w-8 h-8 text-amber-200" />
    },
  ];

  // Create wheel segments with colors based on rarity
  const segments: RouletteSegment[] = robotParts.map((part, index) => {
    let color = "bg-gray-600"; // common
    
    if (part.rarity === "legendary") {
      color = "bg-amber-600";
    } else if (part.rarity === "epic") {
      color = "bg-purple-600";
    } else if (part.rarity === "rare") {
      color = "bg-blue-600";
    } else if (part.rarity === "uncommon") {
      color = "bg-green-600";
    }
    
    return {
      id: index + 1,
      color: color,
      label: (index + 1).toString(),
      part: part
    };
  });

  const getRandomResult = () => {
    // Weight the results by rarity
    const weights = {
      common: 50,     // 50% chance
      uncommon: 30,   // 30% chance
      rare: 15,       // 15% chance
      epic: 4,        // 4% chance
      legendary: 1    // 1% chance
    };
    
    // Create a weighted array
    const weightedSegments: RouletteSegment[] = [];
    
    segments.forEach(segment => {
      const count = weights[segment.part.rarity];
      for (let i = 0; i < count; i++) {
        weightedSegments.push(segment);
      }
    });
    
    // Get random segment from weighted array
    const randomIndex = Math.floor(Math.random() * weightedSegments.length);
    return weightedSegments[randomIndex];
  };

  const spinWheel = async () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult(null);
    setShowCelebration(false);
    
    const randomResult = getRandomResult();
    const extraRotations = 5; // Number of full rotations before landing
    const segmentAngle = 360 / segments.length;
    const resultPosition = segments.findIndex(seg => seg.id === randomResult.id);
    const resultAngle = resultPosition * segmentAngle;
    
    // Calculate final rotation: full rotations + position of the result + small random offset
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
    
    // Show celebration effects for rare items
    if (randomResult.part.rarity === "epic" || randomResult.part.rarity === "legendary") {
      setShowCelebration(true);
    }
  };

  // Check if result is rare for special effects
  const isRareResult = result?.part.rarity === "epic" || result?.part.rarity === "legendary";

  return (
    <div className="flex flex-col items-center space-y-6 relative">
      {/* Celebration effects */}
      <ConfettiEffect show={showCelebration} />
      <SparkleEffect show={showCelebration} isRare={isRareResult || false} />
      
      <div className="relative w-80 h-80 sm:w-96 sm:h-96">
        {/* Pointer/indicator */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-5 z-10">
          <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-amber-500"></div>
        </div>
        
        {/* Wheel container */}
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
                    className="absolute text-white font-bold text-lg"
                    style={{
                      left: `${50 + 35 * Math.cos(angle * Math.PI / 180)}%`,
                      top: `${50 + 35 * Math.sin(angle * Math.PI / 180)}%`,
                      transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                    }}
                  >
                    {segment.label}
                  </div>
                </div>
              );
            })}
            
            {/* Center circle */}
            <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-amber-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 border-2 border-amber-700"></div>
          </motion.div>
        </div>
      </div>
      
      {/* Controls */}
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
          <div className="mt-4 p-6 bg-battlebot-deep-navy-blue/95 border border-battlebot-golden-yellow rounded-lg text-center w-full max-w-md">
            <div className="flex flex-col items-center justify-center">
              {/* Prize icon */}
              <PrizeIcon 
                result={result.part} 
                isRare={isRareResult} 
                showCelebration={showCelebration} 
              />
              
              {/* Prize details */}
              <PrizeDetails result={result.part} isRare={isRareResult} />
              
              <div className="mt-4 bg-battlebot-deep-navy-blue/50 p-2 px-4 rounded-full border border-battlebot-golden-yellow/30">
                <span className="text-battlebot-golden-yellow text-sm">
                  {result.part.rarity === "legendary" ? "0.1%" : 
                   result.part.rarity === "epic" ? "1.1%" :
                   result.part.rarity === "rare" ? "5.5%" :
                   result.part.rarity === "uncommon" ? "24%" : "69.4%"} chance
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RouletteWheel;
