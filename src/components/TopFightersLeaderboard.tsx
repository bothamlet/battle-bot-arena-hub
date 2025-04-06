
import React from "react";
import { Star, Award } from "lucide-react";
import RobotLeaderboard from "./leaderboard/RobotLeaderboard";
import TeamLeaderboard from "./leaderboard/TeamLeaderboard";

const TopFightersLeaderboard: React.FC = () => {
  return (
    <section className="py-16 bg-battlebot-rich-blue">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-2 text-battlebot-light-text flex items-center justify-center">
            <Star className="text-battlebot-golden-yellow mr-3" />
            BattleBots Arena
          </h2>
          <div className="w-24 h-1 bg-battlebot-bright-yellow mx-auto"></div>
          <p className="text-battlebot-light-text/80 mt-4 max-w-2xl mx-auto">
            Where steel warriors clash and only the strongest survive
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Top Robots Column */}
          <div className="relative">
            <div className="absolute -top-6 -right-6 hidden md:block">
              <Award className="h-24 w-24 text-battlebot-golden-yellow/20" />
            </div>
            <RobotLeaderboard />
          </div>
          
          {/* Team Standings Column */}
          <div className="relative">
            <div className="absolute -top-6 -right-6 hidden md:block">
              <Award className="h-24 w-24 text-battlebot-golden-yellow/20" />
            </div>
            <TeamLeaderboard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopFightersLeaderboard;
