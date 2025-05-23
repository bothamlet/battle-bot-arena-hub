
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RoulettePart } from "@/types/RouletteTypes";
import { Trophy, Star, Zap, Sparkles } from "lucide-react";

interface WinAnnouncementProps {
  show: boolean;
  result: RoulettePart | null;
}

const WinAnnouncement: React.FC<WinAnnouncementProps> = ({ show, result }) => {
  if (!show || !result) return null;

  const getRarityConfig = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return {
          bgColor: "bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500",
          textColor: "text-amber-900",
          borderColor: "border-amber-300",
          glowColor: "shadow-amber-400/80",
          icon: <Trophy size={40} className="text-amber-900" />,
          title: "LEGENDARY WIN!",
          particles: 20
        };
      case "epic":
        return {
          bgColor: "bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700",
          textColor: "text-purple-100",
          borderColor: "border-purple-300",
          glowColor: "shadow-purple-500/80",
          icon: <Star size={40} className="text-purple-100" />,
          title: "EPIC WIN!",
          particles: 15
        };
      case "rare":
        return {
          bgColor: "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700",
          textColor: "text-blue-100",
          borderColor: "border-blue-300",
          glowColor: "shadow-blue-500/80",
          icon: <Zap size={40} className="text-blue-100" />,
          title: "RARE WIN!",
          particles: 12
        };
      case "uncommon":
        return {
          bgColor: "bg-gradient-to-r from-green-500 via-green-600 to-green-700",
          textColor: "text-green-100",
          borderColor: "border-green-300",
          glowColor: "shadow-green-500/80",
          icon: <Sparkles size={40} className="text-green-100" />,
          title: "UNCOMMON WIN!",
          particles: 8
        };
      default:
        return {
          bgColor: "bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700",
          textColor: "text-gray-100",
          borderColor: "border-gray-300",
          glowColor: "shadow-gray-500/80",
          icon: <Sparkles size={40} className="text-gray-100" />,
          title: "YOU WON!",
          particles: 5
        };
    }
  };

  const config = getRarityConfig(result.rarity);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.3 }}
        transition={{ 
          duration: 0.6,
          ease: [0.175, 0.885, 0.32, 1.275]
        }}
        className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
      >
        {/* Background overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(config.particles)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-current rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                color: config.textColor === "text-amber-900" ? "#fbbf24" : 
                       config.textColor === "text-purple-100" ? "#a855f7" :
                       config.textColor === "text-blue-100" ? "#3b82f6" :
                       config.textColor === "text-green-100" ? "#10b981" : "#6b7280"
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 2,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 1
              }}
            />
          ))}
        </div>
        
        {/* Main announcement card */}
        <motion.div
          initial={{ y: 50, rotateX: -15 }}
          animate={{ y: 0, rotateX: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className={`relative p-8 rounded-2xl border-4 ${config.bgColor} ${config.borderColor} ${config.glowColor} shadow-2xl max-w-md mx-4`}
        >
          {/* Pulsing border effect */}
          <motion.div
            className={`absolute inset-0 rounded-2xl border-4 ${config.borderColor} opacity-50`}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          
          <div className="relative z-10 text-center space-y-4">
            {/* Icon with rotation */}
            <motion.div
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex justify-center"
            >
              {config.icon}
            </motion.div>
            
            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className={`text-3xl font-bold ${config.textColor}`}
            >
              {config.title}
            </motion.h2>
            
            {/* Prize icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-6xl flex justify-center py-2"
            >
              {result.icon}
            </motion.div>
            
            {/* Prize name */}
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className={`text-2xl font-bold ${config.textColor}`}
            >
              {result.name}
            </motion.h3>
            
            {/* Prize description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className={`text-lg ${config.textColor} opacity-90`}
            >
              {result.description}
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WinAnnouncement;
