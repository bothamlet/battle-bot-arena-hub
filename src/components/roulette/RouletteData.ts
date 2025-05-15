import React from "react";
import { DollarSign, Zap, Cpu, Cog, Wrench, Trophy, Rocket, Shield } from "lucide-react";
import { RoulettePart } from "./RouletteTypes";

export const rouletteParts: RoulettePart[] = [
  { 
    name: "Basic Motor", 
    icon: React.createElement(Zap, { className: "h-8 w-8" }), 
    rarity: "common", 
    color: "bg-red-500",
    description: "Standard propulsion unit for robot movement"
  },
  { 
    name: "Control CPU", 
    icon: React.createElement(Cpu, { className: "h-8 w-8" }), 
    rarity: "uncommon", 
    color: "bg-black",
    description: "Processing unit with enhanced combat algorithms"
  },
  { 
    name: "Steel Gear", 
    icon: React.createElement(Cog, { className: "h-8 w-8" }), 
    rarity: "common", 
    color: "bg-red-500",
    description: "Standard mechanical component" 
  },
  { 
    name: "Weapon Unit", 
    icon: React.createElement(Wrench, { className: "h-8 w-8" }), 
    rarity: "rare", 
    color: "bg-black",
    description: "Advanced offensive attachment for combat"
  },
  { 
    name: "Armor Frame", 
    icon: React.createElement(Shield, { className: "h-8 w-8" }), 
    rarity: "uncommon", 
    color: "bg-red-500",
    description: "Reinforced structural protection"
  },
  { 
    name: "Champion Core", 
    icon: React.createElement(Trophy, { className: "h-8 w-8" }), 
    rarity: "legendary", 
    color: "bg-black",
    description: "Ultra-rare component from championship robots"
  },
  { 
    name: "Quantum Booster", 
    icon: React.createElement(Rocket, { className: "h-8 w-8" }), 
    rarity: "epic", 
    color: "bg-black",
    description: "Revolutionary speed enhancement module"
  },
  { 
    name: "Power Cell", 
    icon: React.createElement(DollarSign, { className: "h-8 w-8" }), 
    rarity: "rare", 
    color: "bg-red-500",
    description: "High-capacity energy storage unit"
  }
];
