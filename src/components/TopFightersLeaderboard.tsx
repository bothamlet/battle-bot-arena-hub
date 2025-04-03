
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

interface Team {
  id: number;
  name: string;
  wins: number;
  losses: number;
  points: number;
  logo: string;
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

const topTeams: Team[] = [
  {
    id: 1,
    name: "Crusher Kings",
    wins: 12,
    losses: 2,
    points: 245,
    logo: "https://images.unsplash.com/photo-1535378620166-273708d44e4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 2,
    name: "Metal Mayhem",
    wins: 11,
    losses: 3,
    points: 230,
    logo: "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 3,
    name: "Robo Wreckers",
    wins: 10,
    losses: 4,
    points: 210,
    logo: "https://images.unsplash.com/photo-1531279550271-23c2a77a765c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 4,
    name: "Circuit Breakers",
    wins: 9,
    losses: 5,
    points: 195,
    logo: "https://images.unsplash.com/photo-1548191194-b3d4f051fd7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 5,
    name: "Steel Titans",
    wins: 8,
    losses: 6,
    points: 180,
    logo: "https://images.unsplash.com/photo-1531347424667-726947bdf9c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
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
        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-battlebot-golden-yellow">
          <img src={fighter.imageUrl} alt={fighter.name} className="w-full h-full object-cover" />
        </div>
      </div>
      
      <div className="ml-3 flex-grow">
        <div className="text-battlebot-light-text font-semibold text-lg leading-tight">{fighter.name}</div>
        <div className="flex items-center">
          <span className="text-battlebot-golden-yellow text-base">{fighter.robotName}</span>
          <span className="text-battlebot-light-text/50 text-xs mx-1">•</span>
          <span className="text-battlebot-light-text/70 text-sm">{fighter.teamName}</span>
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

const TopTeamRow: React.FC<{ team: Team; rank: number }> = ({ team, rank }) => {
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
        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-battlebot-golden-yellow">
          <img src={team.logo} alt={team.name} className="w-full h-full object-cover" />
        </div>
      </div>
      
      <div className="ml-3 flex-grow">
        <div className="text-battlebot-light-text font-semibold text-lg leading-tight">{team.name}</div>
        <div className="flex items-center">
          <span className="text-battlebot-golden-yellow text-base">{team.points} Points</span>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="text-center">
          <div className="text-battlebot-light-text font-bold">{team.wins}</div>
          <div className="text-battlebot-light-text/60 text-xs">WINS</div>
        </div>
        <div className="text-center">
          <div className="text-battlebot-light-text/80 font-bold">{team.losses}</div>
          <div className="text-battlebot-light-text/60 text-xs">LOSSES</div>
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
            BattleBots Leaderboard
          </h2>
          <div className="w-24 h-1 bg-battlebot-bright-yellow mx-auto"></div>
          <p className="text-battlebot-light-text/80 mt-4 max-w-2xl mx-auto">
            The most fearsome competitors in the Battle Bots arena
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Top Fighters Column */}
          <div className="relative">
            <div className="absolute -top-6 -right-6 hidden md:block">
              <Award className="h-24 w-24 text-battlebot-golden-yellow/20" />
            </div>
            
            <div className="battle-card">
              <div className="p-6">
                <h3 className="text-2xl font-bold text-battlebot-light-text mb-4 text-center">
                  <Trophy className="inline-block mr-2 h-5 w-5 text-battlebot-golden-yellow" />
                  Top Fighters
                </h3>
                
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
                    View All Fighters
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Team Standings Column */}
          <div className="relative">
            <div className="absolute -top-6 -right-6 hidden md:block">
              <Award className="h-24 w-24 text-battlebot-golden-yellow/20" />
            </div>
            
            <div className="battle-card">
              <div className="p-6">
                <h3 className="text-2xl font-bold text-battlebot-light-text mb-4 text-center">
                  <Trophy className="inline-block mr-2 h-5 w-5 text-battlebot-golden-yellow" />
                  Team Standings
                </h3>
                
                <div className="space-y-3">
                  {topTeams.map((team, index) => (
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
        </div>
      </div>
    </section>
  );
};

export default TopFightersLeaderboard;
