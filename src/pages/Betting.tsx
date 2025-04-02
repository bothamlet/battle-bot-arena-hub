
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trophy, DollarSign, Flag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Match = {
  id: number;
  team1: string;
  team2: string;
  team1Coef: number;
  team2Coef: number;
  date: string;
  location: string;
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
  },
  {
    id: 2,
    team1: "Robo Wreckers",
    team2: "Circuit Breakers",
    team1Coef: 2.1,
    team2Coef: 1.8,
    date: "2023-10-22",
    location: "Mech Stadium",
  },
  {
    id: 3,
    team1: "Steel Titans",
    team2: "Volt Vipers",
    team1Coef: 3.2,
    team2Coef: 1.3,
    date: "2023-11-05",
    location: "Robot Rumble Pit",
  },
  {
    id: 4,
    team1: "Spark Slammers",
    team2: "Gear Gladiators",
    team1Coef: 1.9,
    team2Coef: 2.0,
    date: "2023-11-12",
    location: "Battle Arena B",
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
                        <TableHead className="text-battlebot-light-text">Match</TableHead>
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
                            {match.team1} vs {match.team2}
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
                      <h3 className="font-semibold text-lg mb-2">
                        {selectedMatch.team1} vs {selectedMatch.team2}
                      </h3>
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
                          {selectedMatch.team1} ({selectedMatch.team1Coef.toFixed(2)})
                        </Button>
                        <Button
                          variant={selectedTeam === "team2" ? "default" : "outline"}
                          className={selectedTeam === "team2" 
                            ? "bg-battlebot-golden-yellow text-battlebot-dark-text" 
                            : "border-battlebot-golden-yellow/50 text-battlebot-light-text"}
                          onClick={() => setSelectedTeam("team2")}
                        >
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
                    <div className="w-12 h-12 text-battlebot-golden-yellow">
                      <Trophy size={48} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Betting;
