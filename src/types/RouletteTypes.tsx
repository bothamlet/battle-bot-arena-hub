
import React from "react";
import { Bot, Cog, Wrench, Zap, Shield, Cpu } from "lucide-react";

export interface RoulettePart {
  name: string;
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary";
  description: string;
  icon: React.ReactNode;
}

export interface RouletteSegment {
  id: number;
  color: string;
  part: RoulettePart;
}

// Define the robot parts with their respective properties
export const robotParts: RoulettePart[] = [
  // Common parts (60% chance)
  { 
    name: "Basic Screw", 
    rarity: "common", 
    description: "A simple metal screw for basic assembly", 
    icon: <Wrench className="text-white" size={24} /> 
  },
  { 
    name: "Wire Bundle", 
    rarity: "common", 
    description: "Standard electrical wiring", 
    icon: <Zap className="text-white" size={24} /> 
  },
  { 
    name: "Steel Plate", 
    rarity: "common", 
    description: "Basic armor plating", 
    icon: <Shield className="text-white" size={24} /> 
  },
  { 
    name: "Motor Unit", 
    rarity: "common", 
    description: "Standard movement motor", 
    icon: <Cog className="text-white" size={24} /> 
  },
  { 
    name: "Sensor Array", 
    rarity: "common", 
    description: "Basic detection sensors", 
    icon: <Bot className="text-white" size={24} /> 
  },
  { 
    name: "Circuit Board", 
    rarity: "common", 
    description: "Standard processing unit", 
    icon: <Cpu className="text-white" size={24} /> 
  },
  
  // Uncommon parts (25% chance)
  { 
    name: "Titanium Bolt", 
    rarity: "uncommon", 
    description: "Durable titanium fastener", 
    icon: <Wrench className="text-white" size={24} /> 
  },
  { 
    name: "High-Voltage Cable", 
    rarity: "uncommon", 
    description: "Heavy-duty power transmission", 
    icon: <Zap className="text-white" size={24} /> 
  },
  { 
    name: "Reinforced Plating", 
    rarity: "uncommon", 
    description: "Enhanced protective armor", 
    icon: <Shield className="text-white" size={24} /> 
  },
  
  // Rare parts (10% chance)
  { 
    name: "Precision Servo", 
    rarity: "rare", 
    description: "High-accuracy movement system", 
    icon: <Cog className="text-white" size={24} /> 
  },
  { 
    name: "AI Processing Core", 
    rarity: "rare", 
    description: "Advanced artificial intelligence", 
    icon: <Bot className="text-white" size={24} /> 
  },
  
  // Epic parts (4% chance)
  { 
    name: "Quantum Processor", 
    rarity: "epic", 
    description: "Next-generation computing power", 
    icon: <Cpu className="text-white" size={24} /> 
  },
  
  // Legendary parts (1% chance)
  { 
    name: "Fusion Core", 
    rarity: "legendary", 
    description: "Unlimited power source", 
    icon: <Zap className="text-white" size={24} /> 
  }
];
