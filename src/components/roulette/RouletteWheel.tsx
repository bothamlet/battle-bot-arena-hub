
import React from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { rouletteParts } from "./RouletteData";

// Generates a smooth wedge shape for an arc spanning sweepAngle degrees.
// We always generate this shape from a 0° starting point, and then rotate the container.
function getPolygonPoints(sweepAngle: number, steps = 20): string {
  const cx = 50; // center x (%)
  const cy = 50; // center y (%)
  const radius = 50; // outer radius as percentage
  const points = [`${cx}% ${cy}%`];

  for (let i = 0; i <= steps; i++) {
    const angle = (sweepAngle * i) / steps * (Math.PI / 180);
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    // Use toFixed to avoid overly long decimals.
    points.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
  }

  return points.join(", ");
}

interface RouletteWheelProps {
  spinning: boolean;
  rotationAngle: number;
}

const RouletteWheel: React.FC<RouletteWheelProps> = ({ spinning, rotationAngle }) => {
  const segmentAngle = 360 / rouletteParts.length;

  return (
    <div className="relative w-72 h-72 md:w-[28rem] md:h-[28rem] mx-auto">
      {/* Wooden outer ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-800 to-amber-700 shadow-[inset_0_0_15px_rgba(0,0,0,0.5)]"></div>

      {/* Outer decorative ring */}
      <div className="absolute inset-[8px] rounded-full border-[8px] border-amber-600 shadow-lg"></div>

      {/* Pointer indicator */}
      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 z-20 w-8 h-12">
        <div className="w-0 h-0 border-l-[16px] border-r-[16px] border-t-[24px] border-l-transparent border-r-transparent border-t-red-600 mx-auto shadow-lg"></div>
        <div className="h-2 w-4 bg-red-700 mx-auto rounded-b-sm"></div>
      </div>

      {/* Roulette wheel container */}
      <div 
        className="absolute inset-[16px] rounded-full overflow-hidden border-8 border-amber-900 bg-amber-950"
        style={{
          boxShadow: "inset 0 0 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.5)"
        }}
      >
        {/* The animated wheel that rotates */}
        <motion.div 
          className="w-full h-full relative"
          animate={{ rotate: rotationAngle }}
          initial={{ rotate: 0 }}
          transition={{ 
            duration: spinning ? 12 : 0, 
            ease: spinning ? [0.2, 0.1, 0.3, 1.0] : "easeOut",
            type: "tween"
          }}
        >
          {rouletteParts.map((part, index) => {
            // For each segment, calculate its starting angle and determine fill color.
            const startAngle = index * segmentAngle;
            const isEvenSegment = index % 2 === 0;

            return (
              <div 
                key={index}
                className="absolute inset-0"
                style={{
                  transform: `rotate(${startAngle}deg)`,
                  transformOrigin: "50% 50%",
                }}
              >
                {/* The inner wedge with enhanced 3D effect */}
                <div 
                  className="absolute inset-0"
                  style={{
                    clipPath: `polygon(50% 50%, ${getPolygonPoints(segmentAngle)})`,
                    backgroundColor: isEvenSegment ? "#8B0000" : "#000000",
                    transform: "scale(0.98)", // Create a tiny gap between segments
                    boxShadow: isEvenSegment 
                      ? "inset 0 0 15px rgba(255, 255, 255, 0.1)" 
                      : "inset 0 0 15px rgba(255, 255, 255, 0.05)",
                  }}
                >
                  {/* Radial highlight to create depth effect */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(
                        circle at 50% 50%,
                        ${isEvenSegment ? 'rgba(200, 0, 0, 0.8)' : 'rgba(40, 40, 40, 0.8)'} 0%,
                        ${isEvenSegment ? '#8B0000' : '#000000'} 70%
                      )`,
                      clipPath: `polygon(50% 50%, ${getPolygonPoints(segmentAngle)})`,
                    }}
                  ></div>

                  {/* Segment divider lines */}
                  <div 
                    className="absolute h-1/2 w-[2px] bg-amber-900 left-1/2 top-0"
                    style={{
                      transform: "translateX(-50%)",
                      boxShadow: "0 0 3px rgba(0,0,0,0.5)"
                    }}
                  ></div>

                  {/* Inner segment border highlight */}
                  <div
                    className="absolute"
                    style={{
                      top: "0%",
                      left: "50%",
                      width: "50%",
                      height: "50%",
                      background: `linear-gradient(${startAngle + segmentAngle/2}deg, 
                        rgba(255, 255, 255, 0.1) 0%, 
                        rgba(255, 255, 255, 0) 60%)`,
                      transformOrigin: "0% 100%",
                      transform: "rotate(0deg)"
                    }}
                  ></div>

                  {/* Label container: rotated by half the segment angle so content appears centered */}
                  <div
                    className="absolute bottom-[20%] left-1/2"
                    style={{
                      transform: `translateX(-50%) rotate(${segmentAngle / 2}deg)`,
                      transformOrigin: "center"
                    }}
                  >
                    <div className={`inline-block ${
                        part.rarity === "legendary" 
                          ? "bg-yellow-600 shadow-[0_0_8px_rgba(255,215,0,0.6)]" 
                          : isEvenSegment 
                          ? "bg-red-800" 
                          : "bg-gray-800"
                      } p-2 rounded-full shadow-md`}>
                      {part.icon}
                    </div>
                    <p className="text-white text-md mt-1 font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] text-center">
                      {part.name}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Add decorative dot pattern for texture */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i / 24) * 360;
            const radian = (angle * Math.PI) / 180;
            const radius = 35; // Percentage from center
            const x = 50 + radius * Math.cos(radian);
            const y = 50 + radius * Math.sin(radian);
            
            return (
              <div 
                key={`dot-${i}`} 
                className="absolute w-1.5 h-1.5 rounded-full bg-amber-900"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: "translate(-50%, -50%)",
                  boxShadow: "inset 0 0 2px rgba(255, 255, 255, 0.3)"
                }}
              ></div>
            );
          })}
        </motion.div>

        {/* Center cap with enhanced 3D effect */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-r from-amber-700 to-amber-800 flex items-center justify-center z-10 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3),0_5px_10px_rgba(0,0,0,0.7)]">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-950 to-amber-900 flex items-center justify-center border-2 border-amber-800 shadow-[inset_0_0_8px_rgba(0,0,0,0.8)]">
            <Trophy className="h-8 w-8 text-amber-400 drop-shadow-[0_0_2px_rgba(255,215,0,0.6)]" />
          </div>
        </div>
      </div>

      {/* Metal ball track with enhanced reflection */}
      <div 
        className="absolute inset-[10px] rounded-full pointer-events-none"
        style={{ 
          background: "linear-gradient(135deg, #d4af37 0%, #f9e076 50%, #d4af37 100%)",
          boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.3)"
        }}
      >
        {/* Add metallic reflection effect */}
        <div 
          className="absolute inset-0 rounded-full" 
          style={{
            background: "linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.3) 50%, transparent 60%)",
            boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.2)"
          }}
        ></div>
      </div>

      {/* Casino-style number pegs with enhanced 3D effect */}
      <div className="absolute inset-0 -m-2 rounded-full pointer-events-none">
        {Array.from({ length: 28 }).map((_, i) => {
          const angle = (i / 28) * 360;
          const radian = (angle * Math.PI) / 180;
          const radius = 48.5;
          const x = radius * Math.cos(radian);
          const y = radius * Math.sin(radian);
          return (
            <div 
              key={i}
              className={`absolute w-2 h-2 rounded-full ${spinning ? "animate-pulse" : ""}`}
              style={{ 
                left: `calc(50% + ${x}%)`,
                top: `calc(50% + ${y}%)`,
                background: "radial-gradient(circle at 30% 30%, #f9e076, #d4af37)",
                boxShadow: "0 0 3px rgba(0,0,0,0.5), inset 0 0 1px rgba(255,255,255,0.8)",
                animationDelay: `${i * 0.1}s`,
              }}
            ></div>
          );
        })}
      </div>

      {/* Additional wooden texture overlay */}
      <div 
        className="absolute inset-0 rounded-full opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.01\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          mixBlendMode: "multiply",
        }}
      ></div>
    </div>
  );
};

export default RouletteWheel;
