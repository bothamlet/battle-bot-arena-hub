
import React from "react";
import { motion } from "framer-motion";
import { PartyPopper, Sparkles } from "lucide-react";

interface SparkleEffectProps {
  show: boolean;
  isRare: boolean;
}

const SparkleEffect: React.FC<SparkleEffectProps> = ({ show, isRare }) => {
  if (!show || !isRare) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ 
          scale: [0, 1.5, 1], 
          rotate: [0, 0, 0],
          y: [0, -20, 0]
        }}
        transition={{ 
          duration: 1.2,
          delay: 0.2,
          times: [0, 0.6, 1]
        }}
        className="text-amber-400"
      >
        <PartyPopper size={80} />
      </motion.div>
      
      <style>
        {`
          @keyframes sparkle {
            0%, 100% { opacity: 0; transform: scale(0.4) rotate(45deg); }
            50% { opacity: 1; transform: scale(1) rotate(45deg); }
          }
        `}
      </style>
    </div>
  );
};

export default SparkleEffect;
