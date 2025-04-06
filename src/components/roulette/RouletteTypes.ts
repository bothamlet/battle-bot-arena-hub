
import { ReactNode } from "react";

export type RarityType = "common" | "uncommon" | "rare" | "epic" | "legendary";

export interface RoulettePart {
  name: string;
  icon: ReactNode;
  rarity: RarityType;
  color: string;
  description: string;
}

export const rarityColors = {
  common: "bg-gray-300 text-gray-800",
  uncommon: "bg-green-400 text-green-900",
  rare: "bg-blue-400 text-blue-900",
  epic: "bg-purple-400 text-purple-900",
  legendary: "bg-yellow-400 text-yellow-900"
};
