
import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { RoulettePart } from "@/types/RouletteTypes";

interface PrizeIconProps {
  result: RoulettePart;
  isRare: boolean;
  showCelebration: boolean;
}

const PrizeIcon: React.FC<PrizeIconProps> = ({ result, isRare, showCelebration }) => {
  const iconBgClass = isRare
    ? "bg-gradient-to-r from-amber-400 to-amber-300"
    : result.rarity === "rare"
    ? "bg-blue-600"
    : result.rarity === "uncommon"
    ? "bg-green-600"
    : "bg-gray-600";
    
  const iconBoxShadow = isRare
    ? "0 0 20px rgba(251, 191, 36, 0.6), inset 0 0 10px rgba(251, 191, 36, 0.4)"
    : "0 5px 15px rgba(0, 0, 0, 0.3)";

  return (
    <motion.div
      initial={{ rotateY: 0 }}
      animate={{ rotateY: isRare ? 720 : 360 }}
      transition={{ duration: isRare ? 3 : 2, ease: "easeInOut" }}
      className="w-32 h-32 flex items-center justify-center"
    >
      <div
        className={`p-6 rounded-full shadow-lg ${iconBgClass} relative`}
        style={{ boxShadow: iconBoxShadow }}
      >
        {result.icon}
        
        {isRare && showCelebration && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute"
                style={{
                  left: `${50 + 45 * Math.cos(i * (Math.PI / 4))}%`,
                  top: `${50 + 45 * Math.sin(i * (Math.PI / 4))}%`,
                  width: '20px',
                  height: '20px',
                  translateX: '-50%',
                  translateY: '-50%',
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0.2, 1, 0.2],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.8,
                  delay: i * 0.2,
                }}
              >
                <Sparkles className="text-amber-300" />
              </motion.div>
            ))}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default PrizeIcon;
