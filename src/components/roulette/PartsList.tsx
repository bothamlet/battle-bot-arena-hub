
import React from "react";
import { RarityType } from "./RouletteTypes";
import { rouletteParts } from "./RouletteData";

const PartsList: React.FC = () => {
  // Define custom rarity colors that match our wooden casino theme
  const customRarityColors: Record<RarityType, string> = {
    "common": "bg-gray-600 text-gray-100",
    "uncommon": "bg-green-600 text-green-100",
    "rare": "bg-blue-600 text-blue-100",
    "epic": "bg-purple-600 text-purple-100",
    "legendary": "bg-amber-400 text-amber-950"
  };
  
  return (
    <div className="bg-gradient-to-r from-amber-950/90 to-amber-900/90 p-6 border-t-4 border-amber-800">
      <h3 className="text-2xl font-bold mb-4 text-amber-300">Available Robot Parts:</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {rouletteParts.map((part, index) => (
          <div 
            key={index} 
            className="bg-gradient-to-br from-amber-950 to-amber-900 border border-amber-800/50 rounded-lg p-4 hover:border-amber-700 transition-colors"
            style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }}
          >
            <div className="flex items-center mb-2">
              <span className={`w-10 h-10 inline-flex items-center justify-center mr-3 rounded-full ${customRarityColors[part.rarity]}`}>
                {part.icon}
              </span>
              <div>
                <span className="font-bold text-amber-200 block">{part.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${customRarityColors[part.rarity]}`}>
                  {part.rarity}
                </span>
              </div>
            </div>
            <p className="text-amber-200/80 text-sm">{part.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartsList;
