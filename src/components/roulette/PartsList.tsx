
import React from "react";
import { RoulettePart, rarityColors } from "./RouletteTypes";
import { rouletteParts } from "./RouletteData";

const PartsList: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-battlebot-rich-blue/50 to-battlebot-deep-navy-blue/50 p-6">
      <h3 className="text-2xl font-bold mb-4 text-battlebot-golden-yellow">Available Robot Parts:</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {rouletteParts.map((part, index) => (
          <div key={index} className="bg-battlebot-deep-navy-blue/80 border border-battlebot-golden-yellow/30 rounded-lg p-4 hover:border-battlebot-golden-yellow transition-colors">
            <div className="flex items-center mb-2">
              <span className={`w-10 h-10 inline-flex items-center justify-center mr-3 rounded-full ${rarityColors[part.rarity]}`}>
                {part.icon}
              </span>
              <div>
                <span className="font-bold text-battlebot-light-text block">{part.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${rarityColors[part.rarity]}`}>
                  {part.rarity}
                </span>
              </div>
            </div>
            <p className="text-battlebot-light-text/80 text-sm">{part.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartsList;
