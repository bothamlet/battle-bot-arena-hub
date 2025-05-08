
import React from "react";
import { Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { topTeams } from "@/data/leaderboardData";
import TopTeamRow from "./TopTeamRow";

interface TeamLeaderboardProps {
  className?: string;
}

const TeamLeaderboard: React.FC<TeamLeaderboardProps> = ({ className }) => {
  // Only show the top 5 teams on the homepage leaderboard
  const topFiveTeams = topTeams.slice(0, 5);
  
  return (
    <div className={`relative ${className || ""}`}>
      <div className="battle-card">
        <div className="p-6">
          <h3 className="text-2xl font-bold text-battlebot-light-text mb-6 text-center">
            <Trophy className="inline-block mr-2 h-5 w-5 text-battlebot-golden-yellow" />
            Team Standings
          </h3>
          
          <div className="space-y-4">
            {topFiveTeams.map((team, index) => (
              <TopTeamRow key={team.id} team={team} rank={index + 1} />
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Link 
              to="/teams" 
              className="battle-button"
            >
              View Full Rankings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamLeaderboard;
