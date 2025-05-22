
import { ReactNode } from "react";

// Robot part types with rarity
export interface RoulettePart {
  name: string;
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary";
  description: string;
  icon: ReactNode;
}

export interface RouletteSegment {
  id: number;
  color: string;
  label: string;
  part: RoulettePart;
}
