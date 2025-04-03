import React from "react";
import { Trophy, Star, Award } from "lucide-react";
import { Link } from "react-router-dom";

interface Fighter {
  id: number;
  name: string;
  robotName: string;
  teamName: string;
  wins: number;
  knockouts: number;
  imageUrl: string;
}

const topFighters: Fighter[] = [
  {
    id: 1,
    name: "Alex Morgan",
    robotName: "Decimator",
    teamName: "Crusher Kings",
    wins: 15,
    knockouts: 12,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 2,
    name: "Riley Johnson",
    robotName: "Pulverizer",
    teamName: "Crusher Kings",
    wins: 14,
    knockouts: 10,
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 3,
    name: "Sam Wilson",
    robotName: "Havoc",
    teamName: "Metal Mayhem",
    wins: 13,
    knockouts: 11,
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 4,
    name: "Jamie Lee",
    robotName: "Chaos",
    teamName: "Metal Mayhem",
    wins: 12,
    knockouts: 9,
    imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 5,
    name: "Taylor Kim",
    robotName: "Demolisher",
    teamName: "Robo Wreckers",
    wins: 11,
    knockouts: 8,
    imageUrl: "https://images.unsplash.com/photo-1569913486515-b74bf7751574?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  }
];

const TopFighterRow: React.FC<{ fighter: Fighter; rank: number }> = ({ fighter, rank }) => {
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
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-battlebot-golden-yellow">
          <img src={fighter.imageUrl} alt={fighter.name} className="w-full h-full object-cover" />
        </div>
      </div>
      
      <div className="ml-3 flex-grow">
        <div className="text-battlebot-light-text font-semibold leading-tight">{fighter.name}</div>
        <div className="flex items-center">
          <span className="text-battlebot-golden-yellow text-xs">{fighter.robotName}</span>
          <span className="text-battlebot-light-text/50 text-xs mx-1">•</span>
          <span className="text-battlebot-light-text/70 text-xs">{fighter.teamName}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="text-center">
          <div className="text-battlebot-light-text font-bold">{fighter.wins}</div>
          <div className="text-battlebot-light-text/60 text-xs">WINS</div>
        </div>
        <div className="text-center">
          <div className="text-battlebot-bright-yellow font-bold">{fighter.knockouts}</div>
          <div className="text-battlebot-light-text/60 text-xs">KOs</div>
        </div>
      </div>
    </div>
  );
};

const TopFightersLeaderboard: React.FC = () => {
  return (
    <section className="py-12 bg-battlebot-rich-blue">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2 text-battlebot-light-text flex items-center justify-center">
            <Star className="text-battlebot-golden-yellow mr-3" />
            Top Fighters Leaderboard
          </h2>
          <div className="w-24 h-1 bg-battlebot-bright-yellow mx-auto"></div>
          <p className="text-battlebot-light-text/80 mt-4 max-w-2xl mx-auto">
            The most fearsome competitors in the Battle Bots arena
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute -top-6 -right-6 hidden md:block">
              <Award className="h-24 w-24 text-battlebot-golden-yellow/20" />
            </div>
            
            <div className="battle-card">
              <div className="p-6">
                <div className="space-y-3">
                  {topFighters.map((fighter, index) => (
                    <TopFighterRow key={fighter.id} fighter={fighter} rank={index + 1} />
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
        </div>
      </div>
    </section>
  );
};

export default TopFightersLeaderboard;
