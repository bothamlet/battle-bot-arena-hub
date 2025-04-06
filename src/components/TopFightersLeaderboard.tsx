
import React from "react";
import { Trophy, Star, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

interface Robot {
  id: number;
  robotName: string;
  ownerName: string;
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

const topRobots: Robot[] = [
  {
    id: 1,
    robotName: "Decimator",
    ownerName: "Alex Morgan",
    teamName: "Crusher Kings",
    wins: 15,
    knockouts: 12,
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 2,
    robotName: "Pulverizer",
    ownerName: "Riley Johnson",
    teamName: "Crusher Kings",
    wins: 14,
    knockouts: 10,
    imageUrl: "https://images.unsplash.com/photo-1507646227500-4d389b0012be?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 3,
    robotName: "Havoc",
    ownerName: "Sam Wilson",
    teamName: "Metal Mayhem",
    wins: 13,
    knockouts: 11,
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 4,
    robotName: "Chaos",
    ownerName: "Jamie Lee",
    teamName: "Metal Mayhem",
    wins: 12,
    knockouts: 9,
    imageUrl: "https://images.unsplash.com/photo-1535378620166-273708d44e4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 5,
    robotName: "Demolisher",
    ownerName: "Taylor Kim",
    teamName: "Robo Wreckers",
    wins: 11,
    knockouts: 8,
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
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

const TopRobotRow: React.FC<{ robot: Robot; rank: number }> = ({ robot, rank }) => {
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
        <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-battlebot-golden-yellow">
          <img src={team.logo} alt={team.name} className="w-full h-full object-cover" />
        </div>
      </div>
      
      <div className="ml-5 flex-grow">
        <div className="text-battlebot-light-text font-bold text-2xl leading-tight">{team.name}</div>
        <div className="flex items-center mt-2">
          <span className="text-battlebot-golden-yellow text-lg">{team.points} Points</span>
        </div>
      </div>
      
      <div className="flex items-center gap-5">
        <div className="text-center">
          <div className="text-battlebot-light-text font-bold text-xl">{team.wins}</div>
          <div className="text-battlebot-light-text/60 text-xs">WINS</div>
        </div>
        <div className="text-center">
          <div className="text-battlebot-light-text/80 font-bold text-xl">{team.losses}</div>
          <div className="text-battlebot-light-text/60 text-xs">LOSSES</div>
        </div>
      </div>
    </div>
  );
};

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
          
          {/* Team Standings Column */}
          <div className="relative">
            <div className="absolute -top-6 -right-6 hidden md:block">
              <Award className="h-24 w-24 text-battlebot-golden-yellow/20" />
            </div>
            
            <div className="battle-card">
              <div className="p-6">
                <h3 className="text-2xl font-bold text-battlebot-light-text mb-6 text-center">
                  <Trophy className="inline-block mr-2 h-5 w-5 text-battlebot-golden-yellow" />
                  Team Standings
                </h3>
                
                <div className="space-y-4">
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
