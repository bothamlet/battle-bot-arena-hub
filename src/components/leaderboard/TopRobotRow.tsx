
import React from "react";
import { Trophy } from "lucide-react";
import { Robot } from "@/data/leaderboardData";

interface TopRobotRowProps {
  robot: Robot;
  rank: number;
}

const TopRobotRow: React.FC<TopRobotRowProps> = ({ robot, rank }) => {
  return (
    <div className="flex items-center bg-battlebot-deep-navy-blue hover:bg-battlebot-rich-blue/30 transition-colors p-3 rounded-lg">
      <div className="w-8 text-center flex-shrink-0">
        {rank === 1 ? (
          <Trophy className="h-5 w-5 text-battlebot-golden-yellow mx-auto" />
        ) : rank === 2 ? (
          <Trophy className="h-5 w-5 text-battlebot-light-text/80 mx-auto" />
        ) : rank === 3 ? (
          <Trophy className="h-5 w-5 text-amber-600 mx-auto" />
        ) : (
          <span className="text-battlebot-light-text/70 font-semibold">{rank}</span>
        )}
      </div>
      
      <div className="ml-3 flex-shrink-0">
        <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-battlebot-golden-yellow">
          <img src={robot.imageUrl} alt={robot.robotName} className="w-full h-full object-cover" />
        </div>
      </div>
      
      <div className="ml-5 flex-grow">
        <div className="text-battlebot-golden-yellow font-bold text-2xl leading-tight">{robot.robotName}</div>
        <div className="flex items-center mt-1">
          <span className="text-battlebot-light-text/60 text-sm">Built by {robot.teamName}</span>
        </div>
        <div className="text-battlebot-light-text/40 text-xs mt-1">Operated by {robot.ownerName}</div>
      </div>
      
      <div className="flex items-center gap-5">
        <div className="text-center">
          <div className="text-battlebot-light-text font-bold text-xl">{robot.wins}</div>
          <div className="text-battlebot-light-text/60 text-xs">WINS</div>
        </div>
        <div className="text-center">
          <div className="text-battlebot-bright-yellow font-bold text-xl">{robot.knockouts}</div>
          <div className="text-battlebot-light-text/60 text-xs">KOs</div>
        </div>
      </div>
    </div>
  );
};

export default TopRobotRow;
