
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
        <section className="py-24 bg-battlebot-deep-navy-blue">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-4 text-battlebot-light-text flex items-center justify-center">
                <Shield className="text-battlebot-golden-yellow mr-4" size={40} />
                Competition Rules
              </h2>
              <div className="w-32 h-1 bg-battlebot-bright-yellow mx-auto"></div>
              <p className="text-battlebot-light-text/80 mt-6 max-w-3xl mx-auto text-xl">
                Everything you need to know about the BattleBots competition
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
              <div className="battle-card p-8 text-center hover:border-battlebot-golden-yellow transition-colors">
                <Book size={64} className="mx-auto text-battlebot-golden-yellow mb-6" />
                <h3 className="text-2xl font-bold text-battlebot-light-text mb-4">Robot Specifications</h3>
                <p className="text-battlebot-light-text/70 mb-4 text-lg">
                  Weight classes, dimensional requirements, and design restrictions for competing robots.
                </p>
              </div>

              <div className="battle-card p-8 text-center hover:border-battlebot-golden-yellow transition-colors">
                <Gavel size={64} className="mx-auto text-battlebot-golden-yellow mb-6" />
                <h3 className="text-2xl font-bold text-battlebot-light-text mb-4">Combat Regulations</h3>
                <p className="text-battlebot-light-text/70 mb-4 text-lg">
                  Official match rules, scoring criteria, and arena specifications for all battles.
                </p>
              </div>

              <div className="battle-card p-8 text-center hover:border-battlebot-golden-yellow transition-colors">
                <FileCheck size={64} className="mx-auto text-battlebot-golden-yellow mb-6" />
                <h3 className="text-2xl font-bold text-battlebot-light-text mb-4">Safety Protocols</h3>
                <p className="text-battlebot-light-text/70 mb-4 text-lg">
                  Mandatory safety features, team conduct guidelines, and emergency procedures.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link to="/rules" className="battle-button text-lg py-3 px-8">
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
