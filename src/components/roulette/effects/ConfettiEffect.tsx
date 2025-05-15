
import React, { useMemo } from "react";

interface ConfettiEffectProps {
  show: boolean;
}

const ConfettiEffect: React.FC<ConfettiEffectProps> = ({ show }) => {
  if (!show) return null;

  // Precompute a stable confetti array so animations won't jitter with re-randomization.
  const confettiItems = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      size: Math.random() * 10 + 5,
      backgroundColor: ["#FFD700", "#FFA500", "#FFFF00", "#F9A602", "#D4AF37"][
        Math.floor(Math.random() * 5)
      ],
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDuration: Math.random() * 3 + 2,
      animationDelay: Math.random() * 5,
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {confettiItems.map((item) => (
        <div
          key={item.id}
          className="absolute rounded-full"
          style={{
            width: `${item.size}px`,
            height: `${item.size}px`,
            backgroundColor: item.backgroundColor,
            left: `${item.left}%`,
            top: `${item.top}%`,
            animation: `fall ${item.animationDuration}s linear infinite`,
            animationDelay: `${item.animationDelay}s`,
          }}
        ></div>
      ))}
      
      <style>
        {`
          @keyframes fall {
            0% { transform: translateY(-20px); opacity: 1; }
            100% { transform: translateY(500px); opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};

export default ConfettiEffect;
