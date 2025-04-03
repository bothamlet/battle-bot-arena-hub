
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trophy, DollarSign, Flag, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import RoulettePartsNew from "../components/RoulettePartsNew";

type Match = {
  id: number;
  team1: string;
  team2: string;
  team1Coef: number;
  team2Coef: number;
  date: string;
  location: string;
  team1Image: string;
  team2Image: string;
};

const matches: Match[] = [
  {
    id: 1,
    team1: "Crusher Kings",
    team2: "Metal Mayhem",
    team1Coef: 1.5,
    team2Coef: 2.7,
    date: "2023-10-15",
    location: "Battle Arena A",
    team1Image: "https://images.unsplash.com/photo-1535378620166-273708d44e4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    team2Image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 2,
    team1: "Robo Wreckers",
    team2: "Circuit Breakers",
    team1Coef: 2.1,
    team2Coef: 1.8,
    date: "2023-10-22",
    location: "Mech Stadium",
    team1Image: "https://images.unsplash.com/photo-1531279550271-23c2a77a765c?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    team2Image: "https://images.unsplash.com/photo-1548191194-b3d4f051fd7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 3,
    team1: "Steel Titans",
    team2: "Volt Vipers",
    team1Coef: 3.2,
    team2Coef: 1.3,
    date: "2023-11-05",
    location: "Robot Rumble Pit",
    team1Image: "https://images.unsplash.com/photo-1531347424667-726947bdf9c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    team2Image: "https://images.unsplash.com/photo-1623159829109-ae4d27aae321?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 4,
    team1: "Spark Slammers",
    team2: "Gear Gladiators",
    team1Coef: 1.9,
    team2Coef: 2.0,
    date: "2023-11-12",
    location: "Battle Arena B",
    team1Image: "https://images.unsplash.com/photo-1621110629498-6886d8b4efa3?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    team2Image: "https://images.unsplash.com/photo-1629904869392-ae2a682d4d01?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
];

const Betting = () => {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<"team1" | "team2" | null>(null);
  const [betAmount, setBetAmount] = useState<number>(10);
  const { toast } = useToast();

  const handleBet = () => {
    if (!selectedMatch || !selectedTeam) return;
    
    const teamName = selectedTeam === "team1" ? selectedMatch.team1 : selectedMatch.team2;
    const coefficient = selectedTeam === "team1" ? selectedMatch.team1Coef : selectedMatch.team2Coef;
    const potentialWin = (betAmount * coefficient).toFixed(2);
    
    toast({
      title: "Bet Placed!",
      description: `$${betAmount} on ${teamName}. Potential win: $${potentialWin}`,
      duration: 5000,
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8 px-4 bg-battlebot-dark-blue-black">
        <div className="container mx-auto">
          <Tabs defaultValue="betting" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="betting" className="data-[state=active]:bg-battlebot-golden-yellow data-[state=active]:text-battlebot-dark-text">
                <DollarSign className="mr-2 h-4 w-4" />
                Match Betting
              </TabsTrigger>
              <TabsTrigger value="roulette" className="data-[state=active]:bg-battlebot-golden-yellow data-[state=active]:text-battlebot-dark-text">
                <Zap className="mr-2 h-4 w-4" />
                Parts Roulette
              </TabsTrigger>
            </TabsList>

            <TabsContent value="betting" className="mt-4">
              <div className="flex items-center mb-8">
                <Trophy size={32} className="text-battlebot-golden-yellow mr-3" />
                <h1 className="text-3xl font-bold text-battlebot-light-text">
                  Robot Fight Betting
                </h1>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 battle-card">
                  <div className="p-4">
                    <h2 className="text-xl font-bold mb-4 text-battlebot-golden-yellow flex items-center">
                      <Flag className="mr-2" /> Upcoming Matches
                    </h2>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="hover:bg-battlebot-rich-blue/30">
                            <TableHead className="text-battlebot-light-text">Teams</TableHead>
                            <TableHead className="text-battlebot-light-text text-right">Team 1 Odds</TableHead>
                            <TableHead className="text-battlebot-light-text text-right">Team 2 Odds</TableHead>
                            <TableHead className="text-battlebot-light-text">Date</TableHead>
                            <TableHead className="text-battlebot-light-text">Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {matches.map((match) => (
                            <TableRow 
                              key={match.id} 
                              className="hover:bg-battlebot-rich-blue/20 border-b border-battlebot-rich-blue/30"
                            >
                              <TableCell className="text-battlebot-light-text font-medium">
                                <div className="flex items-center space-x-4">
                                  <div className="flex items-center gap-2">
                                    <div className="w-12 h-12 rounded-full overflow-hidden">
                                      <img src={match.team1Image} alt={match.team1} className="w-full h-full object-cover" />
                                    </div>
                                    <span>{match.team1}</span>
                                  </div>
                                  <span className="text-battlebot-light-text/50">vs</span>
                                  <div className="flex items-center gap-2">
                                    <div className="w-12 h-12 rounded-full overflow-hidden">
                                      <img src={match.team2Image} alt={match.team2} className="w-full h-full object-cover" />
                                    </div>
                                    <span>{match.team2}</span>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="text-battlebot-light-text text-right">
                                {match.team1Coef.toFixed(2)}
                              </TableCell>
                              <TableCell className="text-battlebot-light-text text-right">
                                {match.team2Coef.toFixed(2)}
                              </TableCell>
                              <TableCell className="text-battlebot-light-text">
                                {new Date(match.date).toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="outline"
                                  className="hover:bg-battlebot-rich-blue hover:text-battlebot-bright-yellow border-battlebot-golden-yellow/50"
                                  onClick={() => setSelectedMatch(match)}
                                >
                                  Place Bet
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>

                <div className="battle-card">
                  <div className="p-4">
                    <h2 className="text-xl font-bold mb-4 text-battlebot-golden-yellow flex items-center">
                      <DollarSign className="mr-2" /> Place Your Bet
                    </h2>
                    
                    {selectedMatch ? (
                      <div>
                        <div className="mb-6 text-battlebot-light-text">
                          <div className="flex items-center gap-4 mb-3">
                            <div className="w-16 h-16 rounded-full overflow-hidden">
                              <img src={selectedMatch.team1Image} alt={selectedMatch.team1} className="w-full h-full object-cover" />
                            </div>
                            <h3 className="font-semibold text-lg">
                              {selectedMatch.team1} vs {selectedMatch.team2}
                            </h3>
                            <div className="w-16 h-16 rounded-full overflow-hidden">
                              <img src={selectedMatch.team2Image} alt={selectedMatch.team2} className="w-full h-full object-cover" />
                            </div>
                          </div>
                          <p className="text-sm mb-1">
                            <span className="text-battlebot-light-text/70">Date:</span> {new Date(selectedMatch.date).toLocaleDateString()}
                          </p>
                          <p className="text-sm">
                            <span className="text-battlebot-light-text/70">Location:</span> {selectedMatch.location}
                          </p>
                        </div>

                        <div className="mb-6">
                          <p className="mb-2 text-battlebot-light-text">Select a team:</p>
                          <div className="grid grid-cols-2 gap-2">
                            <Button
                              variant={selectedTeam === "team1" ? "default" : "outline"}
                              className={selectedTeam === "team1" 
                                ? "bg-battlebot-golden-yellow text-battlebot-dark-text" 
                                : "border-battlebot-golden-yellow/50 text-battlebot-light-text"}
                              onClick={() => setSelectedTeam("team1")}
                            >
                              <div className="mr-2 w-8 h-8 rounded-full overflow-hidden">
                                <img src={selectedMatch.team1Image} alt={selectedMatch.team1} className="w-full h-full object-cover" />
                              </div>
                              {selectedMatch.team1} ({selectedMatch.team1Coef.toFixed(2)})
                            </Button>
                            <Button
                              variant={selectedTeam === "team2" ? "default" : "outline"}
                              className={selectedTeam === "team2" 
                                ? "bg-battlebot-golden-yellow text-battlebot-dark-text" 
                                : "border-battlebot-golden-yellow/50 text-battlebot-light-text"}
                              onClick={() => setSelectedTeam("team2")}
                            >
                              <div className="mr-2 w-8 h-8 rounded-full overflow-hidden">
                                <img src={selectedMatch.team2Image} alt={selectedMatch.team2} className="w-full h-full object-cover" />
                              </div>
                              {selectedMatch.team2} ({selectedMatch.team2Coef.toFixed(2)})
                            </Button>
                          </div>
                        </div>

                        <div className="mb-6">
                          <p className="mb-2 text-battlebot-light-text">Bet amount: ${betAmount}</p>
                          <Slider
                            value={[betAmount]}
                            min={5}
                            max={100}
                            step={5}
                            onValueChange={(value) => setBetAmount(value[0])}
                            className="mb-4"
                          />
                          <p className="text-sm text-battlebot-golden-yellow">
                            Potential win: $
                            {selectedTeam 
                              ? (betAmount * (selectedTeam === "team1" 
                                  ? selectedMatch.team1Coef 
                                  : selectedMatch.team2Coef)).toFixed(2)
                              : "0.00"
                            }
                          </p>
                        </div>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              className="w-full battle-button" 
                              disabled={!selectedTeam}
                            >
                              Place Bet
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-battlebot-deep-navy-blue border-battlebot-golden-yellow">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-battlebot-golden-yellow">Confirm Bet</AlertDialogTitle>
                              <AlertDialogDescription className="text-battlebot-light-text">
                                Are you sure you want to place a ${betAmount} bet on {selectedTeam === "team1" ? selectedMatch.team1 : selectedMatch.team2}?
                                <br /><br />
                                Potential win: $
                                {selectedTeam 
                                  ? (betAmount * (selectedTeam === "team1" 
                                      ? selectedMatch.team1Coef 
                                      : selectedMatch.team2Coef)).toFixed(2)
                                  : "0.00"
                                }
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="border-battlebot-golden-yellow text-battlebot-light-text">Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                className="bg-battlebot-golden-yellow text-battlebot-dark-text hover:bg-battlebot-bright-yellow"
                                onClick={handleBet}
                              >
                                Confirm Bet
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-battlebot-light-text">
                        <p className="mb-2">Select a match to place your bet</p>
                        <div className="w-16 h-16 text-battlebot-golden-yellow">
                          <Trophy size={64} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="roulette" className="mt-4">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-battlebot-light-text flex items-center justify-center">
                  <Zap className="text-battlebot-golden-yellow mr-3" size={32} />
                  Robot Parts Roulette
                </h2>
                <p className="text-battlebot-light-text/80 mt-2 text-xl max-w-2xl mx-auto">
                  Try your luck on the wheel of fortune to win valuable robot parts for your next battle!
                </p>
              </div>
              <RoulettePartsNew />
            </TabsContent>
          </Tabs>

          {/* Add playoff bracket button in the header */}
          <div className="mt-16 text-center">
            <Link to="/playoffs" className="battle-button">
              View Current Playoff Bracket
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Betting;
