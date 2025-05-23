
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface FireworksEffectProps {
  show: boolean;
}

interface Firework {
  id: number;
  x: number;
  y: number;
  type: "burst" | "fountain" | "sparkle";
  color: "red" | "blue" | "gold";
  delay: number;
}

const FireworksEffect: React.FC<FireworksEffectProps> = ({ show }) => {
  const [fireworks, setFireworks] = useState<Firework[]>([]);

  useEffect(() => {
    if (show) {
      const newFireworks: Firework[] = [];
      const types: ("burst" | "fountain" | "sparkle")[] = ["burst", "fountain", "sparkle"];
      const colors: ("red" | "blue" | "gold")[] = ["red", "blue", "gold"];

      // Create 20 fireworks with random positions and types
      for (let i = 0; i < 20; i++) {
        newFireworks.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 60 + 10, // Keep them in upper portion
          type: types[Math.floor(Math.random() * types.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 2,
        });
      }
      setFireworks(newFireworks);
    } else {
      setFireworks([]);
    }
  }, [show]);

  if (!show) return null;

  const getColorClasses = (color: "red" | "blue" | "gold") => {
    switch (color) {
      case "red":
        return {
          fill: "bg-red-500 border-red-300",
          shadow: "shadow-red-500/50",
          glow: "shadow-lg shadow-red-400/80"
        };
      case "blue":
        return {
          fill: "bg-blue-500 border-blue-300",
          shadow: "shadow-blue-500/50",
          glow: "shadow-lg shadow-blue-400/80"
        };
      case "gold":
        return {
          fill: "bg-yellow-400 border-yellow-200",
          shadow: "shadow-yellow-400/50",
          glow: "shadow-lg shadow-yellow-300/80"
        };
    }
  };

  const renderFirework = (firework: Firework) => {
    const colorClasses = getColorClasses(firework.color);
    
    if (firework.type === "burst") {
      // Burst firework - particles explode outward
      return (
        <div
          key={firework.id}
          className="absolute"
          style={{ left: `${firework.x}%`, top: `${firework.y}%` }}
        >
          {[...Array(16)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-3 h-3 rounded-full border-2 ${colorClasses.fill} ${colorClasses.glow}`}
              initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
              animate={{
                scale: [0, 1.5, 1, 0],
                x: Math.cos(i * (Math.PI / 8)) * 120,
                y: Math.sin(i * (Math.PI / 8)) * 120,
                opacity: [1, 1, 0.8, 0],
              }}
              transition={{
                duration: 4,
                delay: firework.delay,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      );
    }

    if (firework.type === "fountain") {
      // Fountain firework - particles fall downward
      return (
        <div
          key={firework.id}
          className="absolute"
          style={{ left: `${firework.x}%`, top: `${firework.y}%` }}
        >
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-4 rounded-full border ${colorClasses.fill} ${colorClasses.glow}`}
              initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
              animate={{
                scale: [0, 1.2, 0.8, 0.3],
                x: (Math.random() - 0.5) * 80,
                y: Math.random() * 200 + 80,
                opacity: [1, 1, 0.7, 0],
              }}
              transition={{
                duration: 5,
                delay: firework.delay + i * 0.15,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      );
    }

    // Sparkle firework - twinkling effect
    return (
      <div
        key={firework.id}
        className="absolute"
        style={{ left: `${firework.x}%`, top: `${firework.y}%` }}
      >
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full border ${colorClasses.fill} ${colorClasses.glow}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 2, 1.5, 2, 0.5, 0],
              opacity: [0, 1, 0.6, 1, 0.4, 0],
            }}
            transition={{
              duration: 4.5,
              delay: firework.delay + i * 0.25,
              repeat: 1,
              ease: "easeInOut",
            }}
            style={{
              left: `${(Math.random() - 0.5) * 50}px`,
              top: `${(Math.random() - 0.5) * 50}px`,
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {fireworks.map(renderFirework)}
    </div>
  );
};

export default FireworksEffect;
