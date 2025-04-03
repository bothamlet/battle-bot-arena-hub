
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Trophy, Flag, Star } from "lucide-react";

const Playoffs: React.FC = () => {
  // Data for the playoff brackets
  const semifinals = [
    {
      match: 1,
      team1: {
        name: "Crusher Kings",
        score: 3,
        logo: "https://images.unsplash.com/photo-1535378620166-273708d44e4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      },
      team2: {
        name: "Metal Mayhem",
        score: 1,
        logo: "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      },
      winner: "Crusher Kings"
    },
    {
      match: 2,
      team1: {
        name: "Robo Wreckers",
        score: 2,
        logo: "https://images.unsplash.com/photo-1531279550271-23c2a77a765c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      },
      team2: {
        name: "Circuit Breakers",
        score: 3,
        logo: "https://images.unsplash.com/photo-1548191194-b3d4f051fd7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      },
      winner: "Circuit Breakers"
    }
  ];

  const finals = {
    match: 3,
    team1: {
      name: "Crusher Kings",
      score: 2,
      logo: "https://images.unsplash.com/photo-1535378620166-273708d44e4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    },
    team2: {
      name: "Circuit Breakers",
      score: 1,
      logo: "https://images.unsplash.com/photo-1548191194-b3d4f051fd7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    },
    winner: "Crusher Kings",
    completed: true
  };

  const TeamCard = ({ team, score, winner, position }: { team: any; score: number; winner: boolean; position: "top" | "bottom" }) => {
    return (
      <div 
        className={`flex items-center ${position === "top" ? "rounded-t-lg" : "rounded-b-lg"} ${
          winner ? "bg-battlebot-rich-blue border-l-4 border-battlebot-golden-yellow" : "bg-battlebot-deep-navy-blue"
        } p-4`}
      >
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-battlebot-golden-yellow/70">
          <img src={team.logo} alt={team.name} className="w-full h-full object-cover" />
        </div>
        <div className="ml-4 flex-grow">
          <p className={`font-bold ${winner ? "text-battlebot-golden-yellow" : "text-battlebot-light-text"}`}>
            {team.name} {winner && <Trophy className="h-4 w-4 inline-block ml-1 text-battlebot-golden-yellow" />}
          </p>
        </div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
          winner ? "bg-battlebot-golden-yellow text-battlebot-dark-text" : "bg-battlebot-deep-navy-blue text-battlebot-light-text/80 border border-battlebot-light-text/30"
        }`}>
          {score}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-16 bg-battlebot-dark-blue-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-battlebot-light-text flex items-center justify-center">
              <Trophy className="text-battlebot-golden-yellow mr-3" />
              Championship Playoff Bracket
            </h1>
            <div className="w-24 h-1 bg-battlebot-bright-yellow mx-auto"></div>
            <p className="text-battlebot-light-text/80 mt-4 max-w-2xl mx-auto">
              Best-of-5 elimination tournament to crown the BattleBots champion
            </p>
          </div>

          {/* Playoff bracket */}
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-center items-center">
              <div className="flex items-stretch h-full">
                {/* Semifinals */}
                <div className="flex flex-col justify-around space-y-24 pr-6">
                  <div className="flex flex-col">
                    <div className="battle-card overflow-hidden shadow-lg mb-2">
                      <div className="bg-battlebot-rich-blue px-4 py-2 flex items-center">
                        <Flag className="h-4 w-4 text-battlebot-golden-yellow mr-2" />
                        <h3 className="text-battlebot-light-text font-bold">Semifinal 1</h3>
                      </div>
                      <TeamCard 
                        team={semifinals[0].team1} 
                        score={semifinals[0].team1.score} 
                        winner={semifinals[0].winner === semifinals[0].team1.name}
                        position="top"
                      />
                      <div className="h-px bg-battlebot-light-text/20"></div>
                      <TeamCard 
                        team={semifinals[0].team2} 
                        score={semifinals[0].team2.score} 
                        winner={semifinals[0].winner === semifinals[0].team2.name}
                        position="bottom"
                      />
                    </div>
                    <div className="text-battlebot-light-text/70 text-center text-sm">
                      Best of 5 • Completed
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="battle-card overflow-hidden shadow-lg mb-2">
                      <div className="bg-battlebot-rich-blue px-4 py-2 flex items-center">
                        <Flag className="h-4 w-4 text-battlebot-golden-yellow mr-2" />
                        <h3 className="text-battlebot-light-text font-bold">Semifinal 2</h3>
                      </div>
                      <TeamCard 
                        team={semifinals[1].team1} 
                        score={semifinals[1].team1.score} 
                        winner={semifinals[1].winner === semifinals[1].team1.name}
                        position="top"
                      />
                      <div className="h-px bg-battlebot-light-text/20"></div>
                      <TeamCard 
                        team={semifinals[1].team2} 
                        score={semifinals[1].team2.score} 
                        winner={semifinals[1].winner === semifinals[1].team2.name}
                        position="bottom"
                      />
                    </div>
                    <div className="text-battlebot-light-text/70 text-center text-sm">
                      Best of 5 • Completed
                    </div>
                  </div>
                </div>
                
                {/* Connecting lines */}
                <div className="flex flex-col justify-center w-16 relative">
                  <div className="absolute top-[25%] transform -translate-y-1/2 w-full h-1/2">
                    <div className="h-1/2 border-r-2 border-b-2 border-battlebot-golden-yellow/50 w-full"></div>
                  </div>
                  <div className="absolute bottom-[25%] transform translate-y-1/2 w-full h-1/2">
                    <div className="h-1/2 border-r-2 border-t-2 border-battlebot-golden-yellow/50 w-full"></div>
                  </div>
                </div>
                
                {/* Finals */}
                <div className="flex flex-col justify-center">
                  <div className="flex flex-col">
                    <div className="battle-card overflow-hidden shadow-lg mb-2 border-2 border-battlebot-golden-yellow">
                      <div className="bg-battlebot-golden-yellow px-4 py-3 flex items-center">
                        <Star className="h-5 w-5 text-battlebot-dark-text mr-2" />
                        <h3 className="text-battlebot-dark-text font-bold text-lg">Championship Final</h3>
                      </div>
                      <TeamCard 
                        team={finals.team1} 
                        score={finals.team1.score} 
                        winner={finals.winner === finals.team1.name}
                        position="top"
                      />
                      <div className="h-px bg-battlebot-light-text/20"></div>
                      <TeamCard 
                        team={finals.team2} 
                        score={finals.team2.score} 
                        winner={finals.winner === finals.team2.name}
                        position="bottom"
                      />
                    </div>
                    <div className="text-battlebot-light-text/70 text-center text-sm">
                      Best of 5 • Completed
                    </div>
                  </div>
                  
                  {finals.completed && (
                    <div className="mt-8 text-center">
                      <div className="inline-block bg-battlebot-golden-yellow rounded-full px-6 py-2 text-battlebot-dark-text font-bold text-lg">
                        Champion: {finals.winner} <Trophy className="h-5 w-5 inline-block ml-1" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-16 border-t border-battlebot-rich-blue pt-8">
              <h2 className="text-2xl font-bold text-battlebot-light-text mb-6 flex items-center">
                <Flag className="text-battlebot-golden-yellow mr-3" />
                Championship Schedule
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="battle-card p-4">
                  <h3 className="text-lg font-bold text-battlebot-golden-yellow mb-2">Quarterfinals</h3>
                  <p className="text-battlebot-light-text mb-1">Completed on April 1, 2025</p>
                  <p className="text-battlebot-light-text/70 text-sm">8 teams competed, 4 advanced</p>
                </div>
                <div className="battle-card p-4">
                  <h3 className="text-lg font-bold text-battlebot-golden-yellow mb-2">Semifinals</h3>
                  <p className="text-battlebot-light-text mb-1">Completed on April 15, 2025</p>
                  <p className="text-battlebot-light-text/70 text-sm">4 teams competed, 2 advanced</p>
                </div>
                <div className="battle-card p-4 border-2 border-battlebot-golden-yellow">
                  <h3 className="text-lg font-bold text-battlebot-golden-yellow mb-2">Championship Final</h3>
                  <p className="text-battlebot-light-text mb-1">Completed on May 1, 2025</p>
                  <p className="text-battlebot-light-text/70 text-sm">Crusher Kings defeated Circuit Breakers 3-1</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Playoffs;
