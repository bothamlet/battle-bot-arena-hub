
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Trophy, Users, Star, Shield, Flag, Medal } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Team data structure
interface TeamMember {
  name: string;
  role: string;
  robotName: string;
  imageUrl: string;
}

interface Team {
  id: number;
  name: string;
  rank: number;
  points: number;
  wins: number;
  losses: number;
  knockouts: number;
  members: TeamMember[];
  logo: string;
  description: string;
}

const teams: Team[] = [
  {
    id: 1,
    name: "Crusher Kings",
    rank: 1,
    points: 245,
    wins: 12,
    losses: 2,
    knockouts: 9,
    members: [
      {
        name: "Alex Morgan",
        role: "Captain/Engineer",
        robotName: "Decimator",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
      },
      {
        name: "Riley Johnson",
        role: "Weapons Specialist",
        robotName: "Pulverizer",
        imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
      }
    ],
    logo: "https://images.unsplash.com/photo-1535378620166-273708d44e4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    description: "Reigning champions known for their powerful hydraulic crushing weapons and innovative armor designs."
  },
  {
    id: 2,
    name: "Metal Mayhem",
    rank: 2,
    points: 230,
    wins: 11,
    losses: 3,
    knockouts: 8,
    members: [
      {
        name: "Sam Wilson",
        role: "Team Lead/Driver",
        robotName: "Havoc",
        imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
      },
      {
        name: "Jamie Lee",
        role: "Electronics Engineer",
        robotName: "Chaos",
        imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
      }
    ],
    logo: "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    description: "Known for their high-speed robots with spinning blade weapons that can reach up to 10,000 RPM."
  },
  {
    id: 3,
    name: "Robo Wreckers",
    rank: 3,
    points: 210,
    wins: 10,
    losses: 4,
    knockouts: 7,
    members: [
      {
        name: "Taylor Kim",
        role: "Designer/Builder",
        robotName: "Demolisher",
        imageUrl: "https://images.unsplash.com/photo-1569913486515-b74bf7751574?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
      },
      {
        name: "Jordan Patel",
        role: "Strategist/Driver",
        robotName: "Annihilator",
        imageUrl: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
      }
    ],
    logo: "https://images.unsplash.com/photo-1531279550271-23c2a77a765c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    description: "Engineering students turned professional builders, specializing in pneumatic flipping mechanisms."
  },
  {
    id: 4,
    name: "Circuit Breakers",
    rank: 4,
    points: 195,
    wins: 9,
    losses: 5,
    knockouts: 6,
    members: [
      {
        name: "Casey Zhang",
        role: "Lead Engineer",
        robotName: "Voltage",
        imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
      },
      {
        name: "Morgan Rivera",
        role: "Software Developer",
        robotName: "Surge",
        imageUrl: "https://images.unsplash.com/photo-1546820389-44d77e1f3b31?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
      }
    ],
    logo: "https://images.unsplash.com/photo-1548191194-b3d4f051fd7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    description: "Tech industry professionals who create robots with advanced AI-assisted driving and targeting systems."
  },
  {
    id: 5,
    name: "Steel Titans",
    rank: 5,
    points: 180,
    wins: 8,
    losses: 6,
    knockouts: 5,
    members: [
      {
        name: "Drew Peterson",
        role: "Mechanical Engineer",
        robotName: "Colossus",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
      },
      {
        name: "Avery Thompson",
        role: "Fabricator/Driver",
        robotName: "Goliath",
        imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
      }
    ],
    logo: "https://images.unsplash.com/photo-1531347424667-726947bdf9c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    description: "Industrial welders who build heavily armored robots with powerful ramming and lifting mechanisms."
  },
  {
    id: 6,
    name: "Volt Vipers",
    rank: 6,
    points: 165,
    wins: 8,
    losses: 6,
    knockouts: 4,
    members: [
      {
        name: "Quinn Carter",
        role: "Electrical Engineer",
        robotName: "Fang",
        imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
      },
      {
        name: "Blake Washington",
        role: "Mechanical Designer",
        robotName: "Venom",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
      }
    ],
    logo: "https://images.unsplash.com/photo-1623159829109-ae4d27aae321?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    description: "Specialists in electric-powered robots with quick, agile designs and precision control systems."
  },
  {
    id: 7,
    name: "Spark Slammers",
    rank: 7,
    points: 150,
    wins: 7,
    losses: 7,
    knockouts: 5,
    members: [
      {
        name: "Robin Chen",
        role: "Lead Designer",
        robotName: "Thunder",
        imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
      },
      {
        name: "Jackie Monroe",
        role: "Robotics Engineer",
        robotName: "Lightning",
        imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
      }
    ],
    logo: "https://images.unsplash.com/photo-1621110629498-6886d8b4efa3?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    description: "Former aerospace engineers who build lightweight, highly maneuverable robots with innovative weapons."
  },
  {
    id: 8,
    name: "Gear Gladiators",
    rank: 8,
    points: 135,
    wins: 6,
    losses: 8,
    knockouts: 4,
    members: [
      {
        name: "Skyler Rodriguez",
        role: "Mechanical Engineer",
        robotName: "Centurion",
        imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
      },
      {
        name: "Reese Lawson",
        role: "Machinist/Driver",
        robotName: "Legion",
        imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
      }
    ],
    logo: "https://images.unsplash.com/photo-1629904869392-ae2a682d4d01?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    description: "Classically trained machinists who focus on precision-engineered robots with intricate mechanical systems."
  }
];

// Individual fighter data
interface Fighter {
  id: number;
  name: string;
  team: string;
  robotName: string;
  wins: number;
  losses: number;
  knockouts: number;
  imageUrl: string;
  specialty: string;
  rank: number;
  weightClass: string;
}

const fighters: Fighter[] = [
  {
    id: 1,
    name: "Alex Morgan",
    team: "Crusher Kings",
    robotName: "Decimator",
    wins: 15,
    losses: 2,
    knockouts: 12,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    specialty: "Hydraulic Crusher",
    rank: 1,
    weightClass: "Heavyweight"
  },
  {
    id: 2,
    name: "Riley Johnson",
    team: "Crusher Kings",
    robotName: "Pulverizer",
    wins: 14,
    losses: 3,
    knockouts: 10,
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    specialty: "Spinning Blade",
    rank: 2,
    weightClass: "Middleweight"
  },
  {
    id: 3,
    name: "Sam Wilson",
    team: "Metal Mayhem",
    robotName: "Havoc",
    wins: 13,
    losses: 4,
    knockouts: 11,
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    specialty: "Rotating Drum",
    rank: 3,
    weightClass: "Heavyweight"
  },
  {
    id: 4,
    name: "Jamie Lee",
    team: "Metal Mayhem",
    robotName: "Chaos",
    wins: 12,
    losses: 5,
    knockouts: 9,
    imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    specialty: "Flipper",
    rank: 4,
    weightClass: "Lightweight"
  },
  {
    id: 5,
    name: "Taylor Kim",
    team: "Robo Wreckers",
    robotName: "Demolisher",
    wins: 11,
    losses: 6,
    knockouts: 8,
    imageUrl: "https://images.unsplash.com/photo-1569913486515-b74bf7751574?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    specialty: "Pneumatic Hammer",
    rank: 5,
    weightClass: "Super Heavyweight"
  }
];

const TeamRow: React.FC<{ team: Team; index: number }> = ({ team, index }) => {
  return (
    <div className={`flex flex-col md:flex-row items-center gap-4 p-4 rounded-lg bg-battlebot-deep-navy-blue border-l-4 ${
      index < 3 ? "border-battlebot-golden-yellow" : "border-battlebot-rich-blue"
    }`}>
      <div className="md:w-20 flex-shrink-0 flex justify-center">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-battlebot-dark-blue-black flex items-center justify-center overflow-hidden">
            <img src={team.logo} alt={team.name} className="w-full h-full object-cover" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-battlebot-golden-yellow flex items-center justify-center text-battlebot-dark-text font-bold shadow-md">
            {team.rank}
          </div>
        </div>
      </div>

      <div className="flex-grow text-center md:text-left">
        <h3 className="text-xl font-bold text-battlebot-light-text">{team.name}</h3>
        <p className="text-battlebot-light-text/70 text-sm line-clamp-2">{team.description}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-2 text-center">
        <div>
          <div className="text-battlebot-golden-yellow font-bold text-lg">{team.points}</div>
          <div className="text-battlebot-light-text/60 text-xs">POINTS</div>
        </div>
        <div>
          <div className="text-battlebot-light-text font-bold text-lg">{team.wins}</div>
          <div className="text-battlebot-light-text/60 text-xs">WINS</div>
        </div>
        <div>
          <div className="text-battlebot-light-text font-bold text-lg">{team.losses}</div>
          <div className="text-battlebot-light-text/60 text-xs">LOSSES</div>
        </div>
        <div>
          <div className="text-battlebot-bright-yellow font-bold text-lg">{team.knockouts}</div>
          <div className="text-battlebot-light-text/60 text-xs">KOs</div>
        </div>
      </div>

      <div className="flex md:flex-col items-center gap-2">
        {team.members.map((member, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <img 
              src={member.imageUrl} 
              alt={member.name} 
              className="w-8 h-8 rounded-full object-cover border border-battlebot-golden-yellow/50"
            />
            <div className="hidden md:block">
              <div className="text-battlebot-light-text text-sm">{member.name}</div>
              <div className="text-battlebot-light-text/60 text-xs">{member.robotName}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FighterRow: React.FC<{ fighter: Fighter; index: number }> = ({ fighter, index }) => {
  return (
    <div className={`flex flex-col md:flex-row items-center gap-4 p-4 rounded-lg bg-battlebot-deep-navy-blue border-l-4 ${
      index < 3 ? "border-battlebot-golden-yellow" : "border-battlebot-rich-blue"
    }`}>
      <div className="md:w-20 flex-shrink-0 flex justify-center">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-battlebot-dark-blue-black flex items-center justify-center overflow-hidden">
            <img src={fighter.imageUrl} alt={fighter.name} className="w-full h-full object-cover" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-battlebot-golden-yellow flex items-center justify-center text-battlebot-dark-text font-bold shadow-md">
            {fighter.rank}
          </div>
        </div>
      </div>

      <div className="flex-grow text-center md:text-left">
        <h3 className="text-xl font-bold text-battlebot-light-text">{fighter.name}</h3>
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
          <span className="text-battlebot-light-text/70 text-sm">{fighter.team}</span>
          <span className="hidden md:inline text-battlebot-light-text/70">•</span>
          <span className="text-battlebot-golden-yellow text-sm font-semibold">{fighter.robotName}</span>
        </div>
        <div className="text-battlebot-light-text/70 text-xs mt-1">
          <span className="bg-battlebot-rich-blue px-2 py-0.5 rounded">{fighter.weightClass}</span>
          <span className="ml-2 bg-battlebot-rich-blue px-2 py-0.5 rounded">{fighter.specialty}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-x-6 gap-y-2 text-center">
        <div>
          <div className="text-battlebot-light-text font-bold text-lg">{fighter.wins}</div>
          <div className="text-battlebot-light-text/60 text-xs">WINS</div>
        </div>
        <div>
          <div className="text-battlebot-light-text font-bold text-lg">{fighter.losses}</div>
          <div className="text-battlebot-light-text/60 text-xs">LOSSES</div>
        </div>
        <div>
          <div className="text-battlebot-bright-yellow font-bold text-lg">{fighter.knockouts}</div>
          <div className="text-battlebot-light-text/60 text-xs">KOs</div>
        </div>
      </div>
    </div>
  );
};

const Teams: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.members.some(member => 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.robotName.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const filteredFighters = fighters.filter(fighter => 
    fighter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fighter.robotName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fighter.team.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-16 bg-battlebot-dark-blue-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-battlebot-light-text flex items-center justify-center">
              <Trophy className="text-battlebot-golden-yellow mr-3" />
              BattleBots Leaderboards
            </h1>
            <div className="w-24 h-1 bg-battlebot-bright-yellow mx-auto"></div>
            <p className="text-battlebot-light-text/80 mt-4 max-w-2xl mx-auto">
              View the current standings of teams and individual fighters in the Battle Bots championship series.
            </p>
          </div>

          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search teams or fighters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-battlebot-deep-navy-blue border border-battlebot-rich-blue rounded-lg px-4 py-2 pl-10 text-battlebot-light-text focus:outline-none focus:border-battlebot-bright-yellow"
              />
              <div className="absolute left-3 top-2.5 text-battlebot-light-text/50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          <Tabs defaultValue="teams" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="teams" className="data-[state=active]:bg-battlebot-golden-yellow data-[state=active]:text-battlebot-dark-text">
                <Users className="mr-2 h-4 w-4" />
                Teams
              </TabsTrigger>
              <TabsTrigger value="fighters" className="data-[state=active]:bg-battlebot-golden-yellow data-[state=active]:text-battlebot-dark-text">
                <Star className="mr-2 h-4 w-4" />
                Individual Fighters
              </TabsTrigger>
            </TabsList>

            <TabsContent value="teams" className="mt-0">
              <div className="bg-battlebot-dark-blue-black/70 p-6 backdrop-blur-sm rounded-lg">
                <div className="flex items-center mb-6">
                  <Flag size={24} className="text-battlebot-golden-yellow mr-3" />
                  <h2 className="text-2xl font-bold text-battlebot-light-text">Team Standings</h2>
                </div>

                <div className="space-y-4">
                  {filteredTeams.length > 0 ? (
                    filteredTeams.map((team, index) => (
                      <TeamRow key={team.id} team={team} index={index} />
                    ))
                  ) : (
                    <div className="text-center py-8 text-battlebot-light-text">
                      <p>No teams found matching your search.</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 text-center">
                  <p className="text-battlebot-light-text/70 text-sm">
                    Team rankings are updated weekly based on performance in official BattleBots events.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="fighters" className="mt-0">
              <div className="bg-battlebot-dark-blue-black/70 p-6 backdrop-blur-sm rounded-lg">
                <div className="flex items-center mb-6">
                  <Medal size={24} className="text-battlebot-golden-yellow mr-3" />
                  <h2 className="text-2xl font-bold text-battlebot-light-text">Individual Fighter Rankings</h2>
                </div>

                <div className="space-y-4">
                  {filteredFighters.length > 0 ? (
                    filteredFighters.map((fighter, index) => (
                      <FighterRow key={fighter.id} fighter={fighter} index={index} />
                    ))
                  ) : (
                    <div className="text-center py-8 text-battlebot-light-text">
                      <p>No fighters found matching your search.</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 text-center">
                  <p className="text-battlebot-light-text/70 text-sm">
                    Fighter rankings consider individual performance metrics including wins, knockouts, and technical scoring.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Teams;
