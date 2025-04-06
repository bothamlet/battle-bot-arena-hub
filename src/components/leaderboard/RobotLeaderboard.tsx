
import React from "react";
import { Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { topRobots } from "@/data/leaderboardData";
import TopRobotRow from "./TopRobotRow";

interface RobotLeaderboardProps {
  className?: string;
}

const RobotLeaderboard: React.FC<RobotLeaderboardProps> = ({ className }) => {
  return (
    <div className={`relative ${className || ""}`}>
      <div className="battle-card">
        <div className="p-6">
          <h3 className="text-2xl font-bold text-battlebot-light-text mb-6 text-center">
            <Trophy className="inline-block mr-2 h-5 w-5 text-battlebot-golden-yellow" />
            Top Combat Robots
          </h3>
          
          <div className="space-y-4">
            {topRobots.map((robot, index) => (
              <TopRobotRow key={robot.id} robot={robot} rank={index + 1} />
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Link 
              to="/teams" 
              className="battle-button"
            >
              View All Combat Robots
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RobotLeaderboard;
