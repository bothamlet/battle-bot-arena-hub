
import React from "react";
import Header from "../components/Header";
import HeroSlider from "../components/HeroSlider";
import EventSchedule from "../components/EventSchedule";
import Footer from "../components/Footer";
import TopFightersLeaderboard from "../components/TopFightersLeaderboard";
import { Shield, Book, Gavel, FileCheck } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSlider />
        
        {/* Rules Section */}
        <section className="py-16 bg-battlebot-deep-navy-blue">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-2 text-battlebot-light-text flex items-center justify-center">
                <Shield className="text-battlebot-golden-yellow mr-3" />
                Competition Rules
              </h2>
              <div className="w-24 h-1 bg-battlebot-bright-yellow mx-auto"></div>
              <p className="text-battlebot-light-text/80 mt-4 max-w-2xl mx-auto">
                Everything you need to know about the BattleBots competition
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="battle-card p-6 text-center hover:border-battlebot-golden-yellow transition-colors">
                <Book size={48} className="mx-auto text-battlebot-golden-yellow mb-4" />
                <h3 className="text-xl font-bold text-battlebot-light-text mb-3">Robot Specifications</h3>
                <p className="text-battlebot-light-text/70 mb-4">
                  Weight classes, dimensional requirements, and design restrictions for competing robots.
                </p>
              </div>

              <div className="battle-card p-6 text-center hover:border-battlebot-golden-yellow transition-colors">
                <Gavel size={48} className="mx-auto text-battlebot-golden-yellow mb-4" />
                <h3 className="text-xl font-bold text-battlebot-light-text mb-3">Combat Regulations</h3>
                <p className="text-battlebot-light-text/70 mb-4">
                  Official match rules, scoring criteria, and arena specifications for all battles.
                </p>
              </div>

              <div className="battle-card p-6 text-center hover:border-battlebot-golden-yellow transition-colors">
                <FileCheck size={48} className="mx-auto text-battlebot-golden-yellow mb-4" />
                <h3 className="text-xl font-bold text-battlebot-light-text mb-3">Safety Protocols</h3>
                <p className="text-battlebot-light-text/70 mb-4">
                  Mandatory safety features, team conduct guidelines, and emergency procedures.
                </p>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link to="/rules" className="battle-button">
                View Complete Rulebook
              </Link>
            </div>
          </div>
        </section>
        
        <TopFightersLeaderboard />
        <EventSchedule />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
