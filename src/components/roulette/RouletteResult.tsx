
import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RoulettePart } from "./RouletteTypes";
import { Sparkles, PartyPopper } from "lucide-react";

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

  // Generate fireworks for celebrations
  const fireworks = useMemo(() => {
    const count = isRare ? 15 : isUncommon ? 8 : 4;
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * 80 + 40,
      left: Math.random() * 120 - 10, // Some can go outside the container
      top: Math.random() * 120 - 10,
      delay: Math.random() * 2,
      duration: Math.random() * 1.5 + 0.8,
      color: [
        "#FF5252", // Red
        "#FFD740", // Yellow
        "#40C4FF", // Blue
        "#69F0AE", // Green
        "#E040FB", // Purple
        "#FF6E40", // Orange
      ][Math.floor(Math.random() * 6)],
    }));
  }, [isRare, isUncommon]);

  // Precomputed style and class variables for readability:
  const containerBgClass = isRare
    ? "bg-gradient-to-r from-amber-900 to-amber-800"
    : "bg-gradient-to-r from-amber-950 to-amber-900";
  const containerBorderClass = isRare ? "border-amber-400" : "border-amber-700";
  const containerBoxShadow = isRare
    ? "0 0 30px rgba(251, 191, 36, 0.4), inset 0 0 20px rgba(251, 191, 36, 0.2)"
    : "0 10px 30px rgba(0, 0, 0, 0.3), inset 0 0 10px rgba(0, 0, 0, 0.2)";

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

  const rarityLabelClass =
    result.rarity === "legendary"
      ? "bg-amber-400 text-amber-950"
      : result.rarity === "epic"
      ? "bg-purple-500 text-purple-950"
      : result.rarity === "rare"
      ? "bg-blue-500 text-blue-950"
      : result.rarity === "uncommon"
      ? "bg-green-500 text-green-950"
      : "bg-gray-400 text-gray-800";

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
            </div>

            {/* Fireworks effect */}
            {fireworks.map((firework) => (
              <div
                key={`firework-${firework.id}`}
                className="absolute"
                style={{
                  left: `${firework.left}%`,
                  top: `${firework.top}%`,
                  zIndex: 5,
                }}
              >
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1, 0.9],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: firework.duration,
                    delay: firework.delay,
                    ease: [0.2, 0.8, 0.2, 1],
                  }}
                >
                  <div
                    className="firework-burst"
                    style={{
                      width: `${firework.size}px`,
                      height: `${firework.size}px`,
                      background: `radial-gradient(circle, ${firework.color} 0%, transparent 70%)`,
                    }}
                  ></div>
                </motion.div>
              </div>
            ))}

            {/* Rare win celebration icons */}
            {isRare && (
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
              </div>
            )}

            <style>{`
              @keyframes fall {
                0% { transform: translateY(-20px); opacity: 1; }
                100% { transform: translateY(500px); opacity: 0; }
              }
              
              @keyframes sparkle {
                0%, 100% { opacity: 0; transform: scale(0.4) rotate(45deg); }
                50% { opacity: 1; transform: scale(1) rotate(45deg); }
              }
            `}</style>
          </>
        )}

        {/* Add perspective for more pronounced 3D rotation */}
        <div className="relative z-10" style={{ perspective: "1000px" }}>
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
              
              {/* Sparkle effect around icon for rare/legendary items */}
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

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center mt-5"
          >
            <h3
              className={`font-bold text-3xl mb-2 ${
                isRare ? "text-amber-300" : "text-amber-200"
              }`}
            >
              {result.name}
            </h3>
            <p
              className={`capitalize text-lg font-medium px-3 py-1 rounded-full inline-block mb-3 ${rarityLabelClass}`}
            >
              {result.rarity}
            </p>
            <p className="text-amber-100 text-xl">{result.description}</p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default RouletteResult;
