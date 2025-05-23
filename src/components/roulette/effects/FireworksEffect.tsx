
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

      // Create 15 fireworks with random positions and types
      for (let i = 0; i < 15; i++) {
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

  const getColorClass = (color: "red" | "blue" | "gold") => {
    switch (color) {
      case "red":
        return "bg-red-500";
      case "blue":
        return "bg-blue-500";
      case "gold":
        return "bg-yellow-400";
    }
  };

  const renderFirework = (firework: Firework) => {
    const colorClass = getColorClass(firework.color);
    
    if (firework.type === "burst") {
      // Burst firework - particles explode outward
      return (
        <div
          key={firework.id}
          className="absolute"
          style={{ left: `${firework.x}%`, top: `${firework.y}%` }}
        >
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${colorClass}`}
              initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
              animate={{
                scale: [0, 1, 0],
                x: Math.cos(i * (Math.PI / 6)) * 100,
                y: Math.sin(i * (Math.PI / 6)) * 100,
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 2,
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
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-3 rounded-full ${colorClass}`}
              initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
              animate={{
                scale: [0, 1, 0.5],
                x: (Math.random() - 0.5) * 60,
                y: Math.random() * 150 + 50,
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 3,
                delay: firework.delay + i * 0.1,
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
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${colorClass}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.5, 1, 1.5, 0],
              opacity: [0, 1, 0.5, 1, 0],
            }}
            transition={{
              duration: 2.5,
              delay: firework.delay + i * 0.2,
              repeat: 2,
              ease: "easeInOut",
            }}
            style={{
              left: `${(Math.random() - 0.5) * 40}px`,
              top: `${(Math.random() - 0.5) * 40}px`,
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
