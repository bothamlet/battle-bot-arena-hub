
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RotateCw, DollarSign } from "lucide-react";
import { motion, useAnimation } from "framer-motion";

interface RouletteSegment {
  id: number;
  color: string;
  label: string;
  value: number;
}

const RouletteWheel: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<RouletteSegment | null>(null);
  const controls = useAnimation();
  const spinDuration = 5;
  const segments: RouletteSegment[] = [
    { id: 1, color: "bg-red-600", label: "1", value: 1 },
    { id: 2, color: "bg-black", label: "2", value: 2 },
    { id: 3, color: "bg-red-600", label: "3", value: 3 },
    { id: 4, color: "bg-black", label: "4", value: 4 },
    { id: 5, color: "bg-red-600", label: "5", value: 5 },
    { id: 6, color: "bg-black", label: "6", value: 6 },
    { id: 7, color: "bg-red-600", label: "7", value: 7 },
    { id: 8, color: "bg-black", label: "8", value: 8 },
    { id: 9, color: "bg-red-600", label: "9", value: 9 },
    { id: 10, color: "bg-black", label: "10", value: 10 },
    { id: 11, color: "bg-red-600", label: "11", value: 11 },
    { id: 12, color: "bg-black", label: "12", value: 12 },
  ];

  const getRandomResult = () => {
    const randomIndex = Math.floor(Math.random() * segments.length);
    return segments[randomIndex];
  };

  const spinWheel = async () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult(null);
    
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
  };

  return (
    <div className="flex flex-col items-center space-y-6">
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
          <div className="mt-4 p-4 bg-battlebot-golden-yellow/20 border border-battlebot-golden-yellow rounded-lg text-center">
            <p className="text-battlebot-light-text text-xl font-bold">Result: {result.label}</p>
            <p className="text-battlebot-golden-yellow flex items-center justify-center gap-1">
              <DollarSign size={18} />
              <span>Value: {result.value} credits</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RouletteWheel;
