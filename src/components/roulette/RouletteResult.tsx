
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RoulettePart } from "./RouletteTypes";
import ConfettiEffect from "./effects/ConfettiEffect";
import SparkleEffect from "./effects/SparkleEffect";
import PrizeIcon from "./prize/PrizeIcon";
import PrizeDetails from "./prize/PrizeDetails";

interface RouletteResultProps {
  result: RoulettePart | null;
  spinCompleted: boolean;
  showCelebration: boolean;
}

const RouletteResult: React.FC<RouletteResultProps> = ({
  result,
  spinCompleted,
  showCelebration,
}) => {
  if (!spinCompleted || !result) return null;

  const isRare = result.rarity === "legendary" || result.rarity === "epic";
  const isUncommon = result.rarity === "rare" || result.rarity === "uncommon";

  // Precomputed style and class variables for readability
  const containerBgClass = isRare
    ? "bg-gradient-to-r from-amber-900 to-amber-800"
    : "bg-gradient-to-r from-amber-950 to-amber-900";
  const containerBorderClass = isRare ? "border-amber-400" : "border-amber-700";
  const containerBoxShadow = isRare
    ? "0 0 30px rgba(251, 191, 36, 0.4), inset 0 0 20px rgba(251, 191, 36, 0.2)"
    : "0 10px 30px rgba(0, 0, 0, 0.3), inset 0 0 10px rgba(0, 0, 0, 0.2)";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
        className={`mt-8 p-8 rounded-lg flex flex-col items-center justify-center relative overflow-hidden ${containerBgClass} border-2 ${containerBorderClass}`}
        style={{ boxShadow: containerBoxShadow }}
      >
        {showCelebration && (
          <>
            {/* Confetti effect for all wins */}
            <ConfettiEffect show={showCelebration} />

            {/* Rare win celebration icons */}
            <SparkleEffect show={showCelebration} isRare={isRare} />
          </>
        )}

        {/* Add perspective for more pronounced 3D rotation */}
        <div className="relative z-10" style={{ perspective: "1000px" }}>
          <PrizeIcon 
            result={result} 
            isRare={isRare} 
            showCelebration={showCelebration} 
          />

          <PrizeDetails result={result} isRare={isRare} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default RouletteResult;
