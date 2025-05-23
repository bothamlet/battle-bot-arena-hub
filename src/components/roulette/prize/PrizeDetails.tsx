
import React from "react";
import { motion } from "framer-motion";
import { RoulettePart } from "@/types/RouletteTypes";

interface PrizeDetailsProps {
  result: RoulettePart;
  isRare: boolean;
}

const PrizeDetails: React.FC<PrizeDetailsProps> = ({ result, isRare }) => {
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
  );
};

export default PrizeDetails;
