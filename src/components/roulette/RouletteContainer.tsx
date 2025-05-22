
import React, { useState, useCallback } from "react";
import { Trophy, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { RoulettePart } from "./RouletteTypes";
import { rouletteParts } from "./RouletteData";
import RouletteWheel from "./RouletteWheel";
import RouletteResult from "./RouletteResult";
import PartsList from "./PartsList";
import FireworksDisplay from "./FireworksDisplay";

const RouletteContainer: React.FC = () => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<RoulettePart | null>(null);
  const [spinCompleted, setSpinCompleted] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const { toast } = useToast();

  // Returns a random RoulettePart weighted by rarity.
  const getWeightedRandomItem = useCallback((): RoulettePart => {
    const weights: { [key: string]: number } = {
      common: 45,
      uncommon: 30,
      rare: 15,
      epic: 7,
      legendary: 3,
    };

    const weightedArray: RoulettePart[] = [];
    rouletteParts.forEach((part) => {
      const weight = weights[part.rarity];
      for (let i = 0; i < weight; i++) {
        weightedArray.push(part);
      }
    });

    const randomIndex = Math.floor(Math.random() * weightedArray.length);
    return weightedArray[randomIndex];
  }, []);

  const spinRoulette = () => {
    if (spinning) return;

    // Reset all state for a new spin.
    setSpinning(true);
    setResult(null);
    setSpinCompleted(false);
    setShowCelebration(false);

    // Determine the winning item.
    const winningItem = getWeightedRandomItem();
    const winningIndex = rouletteParts.findIndex(
      (item) => item.name === winningItem.name
    );

    // Calculate the rotation so that we land on the winning segment.
    const segmentAngle = 360 / rouletteParts.length;
    const extraSpins = 8; // Dramatic effect with extra spins.
    
    // Calculate rotation to make pointer point to the winning segment
    // We need to adjust by segmentAngle/2 to align with the center of the segment
    const targetRotation = 360 - (winningIndex * segmentAngle + segmentAngle / 2);
    
    // Add extra full rotations for dramatic effect
    const totalRotation = targetRotation + extraSpins * 360;

    // IMPORTANT: Use the updater to set absolute rotation, not relative
    setRotationAngle(totalRotation);

    // The spin duration matches the animation duration in RouletteWheel.
    const spinDuration = 12000; // 12 seconds.
    setTimeout(() => {
      setSpinning(false);
      setResult(winningItem);
      setSpinCompleted(true);

      // Delay the celebration and toast a bit for added suspense.
      setTimeout(() => {
        setShowCelebration(true);

        const toastDescription =
          winningItem.rarity === "legendary" ||
          winningItem.rarity === "epic"
            ? "Wow! An extremely rare find!"
            : `Rarity: ${winningItem.rarity}`;

        toast({
          title: `You won: ${winningItem.name}!`,
          description: toastDescription,
          duration: 5000,
        });
      }, 1000);
    }, spinDuration);
  };

  // Determine fireworks intensity based on rarity
  const getFireworkIntensity = () => {
    if (!result) return "low";
    
    if (result.rarity === "legendary") return "high";
    if (result.rarity === "epic") return "high";
    if (result.rarity === "rare") return "medium";
    return "low";
  };

  return (
    <div className="bg-gradient-to-b from-amber-950 to-amber-900 rounded-lg border-4 border-amber-800 shadow-2xl max-w-4xl mx-auto overflow-hidden">
      {/* Display fireworks across the entire webpage when celebration is active */}
      <FireworksDisplay 
        show={showCelebration} 
        intensity={getFireworkIntensity()} 
      />
      
      <div className="p-6">
        <h2 className="text-4xl font-bold text-center mb-4 text-amber-300 flex items-center justify-center">
          <Trophy className="h-8 w-8 mr-3 text-amber-400" />
          Robot Parts Roulette
          <Trophy className="h-8 w-8 ml-3 text-amber-400" />
        </h2>

        <p className="text-center text-amber-200 mb-8 text-xl">
          Spin the wheel of fortune to win valuable robot parts!
        </p>

        <div className="relative">
          <div className="relative z-0">
            {/* Casino table cloth background */}
            <div
              className="absolute inset-0 -m-6 rounded-xl"
              style={{
                background: "linear-gradient(135deg, #1E5631 0%, #0B7A40 100%)",
                boxShadow: "inset 0 0 80px rgba(0,0,0,0.4)",
                zIndex: -1,
              }}
            ></div>

            <RouletteWheel 
              spinning={spinning} 
              rotationAngle={rotationAngle} 
            />
          </div>
          <RouletteResult
            result={result}
            spinCompleted={spinCompleted}
            showCelebration={showCelebration}
          />
        </div>

        <div className="flex justify-center mt-12 mb-4">
          <Button
            onClick={spinRoulette}
            disabled={spinning}
            className={`bg-amber-700 text-amber-100 hover:bg-amber-600 font-bold text-xl px-8 py-6 rounded-lg shadow-lg transform transition-transform ${
              spinning ? "opacity-50" : "hover:scale-105 shadow-amber-900/50"
            }`}
            style={{
              background: spinning
                ? "#78350f"
                : "linear-gradient(180deg, #92400E 0%, #78350F 100%)",
              border: "2px solid #B45309",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.3), inset 0 1px 3px rgba(255,255,255,0.2)",
            }}
          >
            <DollarSign className="mr-2 h-6 w-6" />
            {spinning ? "Spinning..." : "SPIN THE WHEEL"}
          </Button>
        </div>
      </div>

      <PartsList />
    </div>
  );
};

export default RouletteContainer;
