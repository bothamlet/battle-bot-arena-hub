
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Trophy, Users, Star, Shield, Flag, Medal } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TopRobotRow from "../components/leaderboard/TopRobotRow";
import TopTeamRow from "../components/leaderboard/TopTeamRow";
import { topRobots, topTeams } from "@/data/leaderboardData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Teams: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredTeams = topTeams.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRobots = topRobots.filter(robot => 
    robot.robotName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    robot.teamName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group robots by team for the detailed view
  const robotsByTeam = topRobots.reduce((acc, robot) => {
    if (!acc[robot.teamName]) {
      acc[robot.teamName] = [];
    }
    acc[robot.teamName].push(robot);
    return acc;
  }, {} as Record<string, typeof topRobots>);

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
              View the current standings of teams and combat robots in the Battle Bots championship series.
            </p>
          </div>

          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search teams or robots..."
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
              <TabsTrigger value="robots" className="data-[state=active]:bg-battlebot-golden-yellow data-[state=active]:text-battlebot-dark-text">
                <Shield className="mr-2 h-4 w-4" />
                Combat Robots
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
                      <div key={team.id} className="mb-8">
                        <TopTeamRow team={team} rank={index + 1} />
                        
                        {robotsByTeam[team.name] && (
                          <div className="mt-2 ml-12 bg-battlebot-deep-navy-blue/50 rounded-lg p-4">
                            <h3 className="text-battlebot-light-text font-semibold mb-3">Team Robots</h3>
                            <div className="grid md:grid-cols-2 gap-3">
                              {robotsByTeam[team.name].map((robot) => (
                                <div 
                                  key={robot.id} 
                                  className="bg-battlebot-rich-blue/30 rounded-lg p-3 flex items-center"
                                >
                                  <div className="w-16 h-16 rounded-full overflow-hidden border border-battlebot-golden-yellow mr-3">
                                    <img src={robot.imageUrl} alt={robot.robotName} className="w-full h-full object-cover" />
                                  </div>
                                  <div>
                                    <div className="text-battlebot-golden-yellow font-bold">{robot.robotName}</div>
                                    <div className="text-battlebot-light-text/70 text-xs">Operated by {robot.ownerName}</div>
                                    <div className="text-battlebot-light-text/90 text-sm mt-1">
                                      {robot.wins} Wins · {robot.knockouts} KOs
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
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

            <TabsContent value="robots" className="mt-0">
              <div className="bg-battlebot-dark-blue-black/70 p-6 backdrop-blur-sm rounded-lg">
                <div className="flex items-center mb-6">
                  <Medal size={24} className="text-battlebot-golden-yellow mr-3" />
                  <h2 className="text-2xl font-bold text-battlebot-light-text">Combat Robot Rankings</h2>
                </div>

                <div className="space-y-4">
                  {filteredRobots.length > 0 ? (
                    filteredRobots.map((robot, index) => (
                      <TopRobotRow key={robot.id} robot={robot} rank={index + 1} />
                    ))
                  ) : (
                    <div className="text-center py-8 text-battlebot-light-text">
                      <p>No robots found matching your search.</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 text-center">
                  <p className="text-battlebot-light-text/70 text-sm">
                    Robot rankings consider battle performance metrics including wins, knockouts, and technical scoring.
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
