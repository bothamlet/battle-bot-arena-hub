
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FireworkType = "burst" | "trail" | "sparkler";

interface FireworkProps {
  id: number;
  top: number;
  left: number;
  type: FireworkType;
  color: string;
  size: number;
  duration: number;
  delay: number;
}

interface FireworksDisplayProps {
  show: boolean;
  intensity: "low" | "medium" | "high";
}

const FireworksDisplay: React.FC<FireworksDisplayProps> = ({ show, intensity }) => {
  const [fireworks, setFireworks] = useState<FireworkProps[]>([]);
  
  // Color palettes for different firework types
  const burstColors = ["#FF5252", "#FF7E5F", "#F97316"];  // Red to orange
  const trailColors = ["#40C4FF", "#33C3F0", "#0EA5E9"];  // Blue variants
  const sparklerColors = ["#D946EF", "#9b87f5", "#8B5CF6"];  // Purple/magenta
  
  const generateFireworks = useCallback(() => {
    if (!show) return [];
    
    const count = intensity === "high" ? 30 : intensity === "medium" ? 15 : 7;
    const newFireworks: FireworkProps[] = [];
    
    for (let i = 0; i < count; i++) {
      const type: FireworkType = ["burst", "trail", "sparkler"][Math.floor(Math.random() * 3)] as FireworkType;
      
      // Select color based on firework type
      const colorArray = type === "burst" ? burstColors : 
                         type === "trail" ? trailColors : sparklerColors;
      const color = colorArray[Math.floor(Math.random() * colorArray.length)];
      
      newFireworks.push({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        type,
        color,
        size: Math.random() * 100 + (intensity === "high" ? 150 : intensity === "medium" ? 100 : 50),
        duration: Math.random() * 2 + 1.5,
        delay: Math.random() * 3
      });
    }
    
    return newFireworks;
  }, [show, intensity]);
  
  // Generate new fireworks when the show prop changes
  useEffect(() => {
    setFireworks(generateFireworks());
    
    // Generate additional waves of fireworks
    if (show) {
      const interval = setInterval(() => {
        setFireworks(prev => [...prev.filter(fw => fw.delay > 0.5), ...generateFireworks()]);
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [show, generateFireworks]);
  
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {fireworks.map((firework) => (
          <motion.div
            key={`${firework.id}-${firework.top}-${firework.left}`}
            className="absolute"
            style={{
              top: `${firework.top}%`,
              left: `${firework.left}%`
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: firework.duration,
              delay: firework.delay
            }}
          >
            {firework.type === "burst" && (
              <div
                className="firework-burst rounded-full"
                style={{
                  width: `${firework.size}px`,
                  height: `${firework.size}px`,
                  background: `radial-gradient(circle, ${firework.color} 0%, transparent 70%)`,
                  boxShadow: `0 0 ${firework.size / 5}px ${firework.color}`,
                  animation: `firework-burst ${firework.duration}s ease-out forwards`
                }}
              />
            )}
            
            {firework.type === "trail" && (
              <div className="firework-trail">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: `${firework.size / 10}px`,
                      height: `${firework.size / 10}px`,
                      backgroundColor: firework.color,
                      boxShadow: `0 0 ${firework.size / 15}px ${firework.color}`,
                      transform: `rotate(${i * 30}deg) translate(${firework.size / 2}px, 0)`,
                      animation: `firework-trail ${firework.duration}s ease-out forwards ${i * 0.08}s`
                    }}
                  />
                ))}
              </div>
            )}
            
            {firework.type === "sparkler" && (
              <div className="firework-sparkler">
                {[...Array(20)].map((_, i) => {
                  const angle = Math.random() * 360;
                  const distance = Math.random() * (firework.size / 2);
                  
                  return (
                    <div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        width: `${Math.random() * (firework.size / 15) + 2}px`,
                        height: `${Math.random() * (firework.size / 15) + 2}px`,
                        backgroundColor: firework.color,
                        boxShadow: `0 0 ${firework.size / 20}px ${firework.color}`,
                        transform: `rotate(${angle}deg) translate(${distance}px, 0)`,
                        animation: `firework-sparkler ${firework.duration * 0.8}s ease-out infinite alternate ${Math.random() * 0.5}s`
                      }}
                    />
                  );
                })}
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
      
      <style jsx>{`
        @keyframes firework-burst {
          0% { transform: scale(0); opacity: 1; }
          50% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.2); opacity: 0; }
        }
        
        @keyframes firework-trail {
          0% { transform: rotate(inherit) translate(calc(inherit), 0) scale(1); opacity: 1; }
          70% { opacity: 0.7; }
          100% { transform: rotate(inherit) translate(calc(inherit + 50px), 0) scale(0); opacity: 0; }
        }
        
        @keyframes firework-sparkler {
          0% { transform: rotate(inherit) translate(calc(inherit), 0) scale(1); opacity: 1; }
          50% { opacity: 0.8; transform: rotate(inherit) translate(calc(inherit + 15px), 0) scale(0.8); }
          100% { transform: rotate(inherit) translate(calc(inherit), 0) scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default FireworksDisplay;
