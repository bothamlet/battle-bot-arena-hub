
import { Banknote, Zap, Cpu, Cog, Wrench, Trophy, Rocket, Shield } from "lucide-react";
import { RoulettePart } from "./RouletteTypes";
import React from "react";

export const rouletteParts: RoulettePart[] = [
  { 
    name: "Motor", 
    icon: React.createElement(Zap, { className: "h-8 w-8" }), 
    rarity: "common", 
    color: "bg-red-500",
    description: "Basic propulsion unit for your robot"
  },
  { 
    name: "CPU", 
    icon: React.createElement(Cpu, { className: "h-8 w-8" }), 
    rarity: "uncommon", 
    color: "bg-black",
    description: "Processing unit to enhance AI capabilities"
  },
  { 
    name: "Gear", 
    icon: React.createElement(Cog, { className: "h-8 w-8" }), 
    rarity: "common", 
    color: "bg-red-500",
    description: "Essential mechanical component" 
  },
  { 
    name: "Weapon", 
    icon: React.createElement(Wrench, { className: "h-8 w-8" }), 
    rarity: "rare", 
    color: "bg-black",
    description: "Offensive attachment for combat"
  },
  { 
    name: "Frame", 
    icon: React.createElement(Shield, { className: "h-8 w-8" }), 
    rarity: "uncommon", 
    color: "bg-red-500",
    description: "Structural chassis enhancement"
  },
  { 
    name: "Trophy Part", 
    icon: React.createElement(Trophy, { className: "h-8 w-8" }), 
    rarity: "legendary", 
    color: "bg-black",
    description: "Rare component from championship robots"
  },
  { 
    name: "Booster", 
    icon: React.createElement(Rocket, { className: "h-8 w-8" }), 
    rarity: "epic", 
    color: "bg-black",
    description: "Speed enhancement module"
  },
  { 
    name: "Power Core", 
    icon: React.createElement(Banknote, { className: "h-8 w-8" }), 
    rarity: "rare", 
    color: "bg-red-500",
    description: "Advanced energy storage unit"
  }
];
