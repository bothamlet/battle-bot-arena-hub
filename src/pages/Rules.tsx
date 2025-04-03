
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Shield, AlertTriangle, Award, Scale } from "lucide-react";

const Rules: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-16 bg-battlebot-dark-blue-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-battlebot-light-text mb-4">
              Battle<span className="text-battlebot-golden-yellow">Bots</span> Competition Rules
            </h1>
            <div className="w-24 h-1 bg-battlebot-bright-yellow mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="battle-card p-6">
              <div className="flex items-center mb-4">
                <Shield className="w-8 h-8 text-battlebot-golden-yellow mr-3" />
                <h2 className="text-2xl font-bold text-battlebot-light-text">Safety Requirements</h2>
              </div>
              <ul className="space-y-3 text-battlebot-light-text/90">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-battlebot-bright-yellow rounded-full mt-2 mr-2"></span>
                  <span>All robots must include a master power switch that is accessible from the exterior of the robot.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-battlebot-bright-yellow rounded-full mt-2 mr-2"></span>
                  <span>Spinning weapons must have a mechanical method to arrest the weapon rotation for safe handling.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-battlebot-bright-yellow rounded-full mt-2 mr-2"></span>
                  <span>All robots must include a remote disabling system that can shut down all movement and weapons.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-battlebot-bright-yellow rounded-full mt-2 mr-2"></span>
                  <span>No explosives, liquids, flames, EMP generators or untethered projectiles are permitted.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-battlebot-bright-yellow rounded-full mt-2 mr-2"></span>
                  <span>All lithium batteries must be encased in a protective housing to prevent puncture.</span>
                </li>
              </ul>
            </div>

            <div className="battle-card p-6">
              <div className="flex items-center mb-4">
                <Scale className="w-8 h-8 text-battlebot-golden-yellow mr-3" />
                <h2 className="text-2xl font-bold text-battlebot-light-text">Weight Classes</h2>
              </div>
              <div className="space-y-4 text-battlebot-light-text/90">
                <div className="p-3 bg-battlebot-rich-blue/30 rounded-md">
                  <h3 className="font-bold text-battlebot-golden-yellow">Lightweight</h3>
                  <p>60kg (132lbs) maximum</p>
                </div>
                <div className="p-3 bg-battlebot-rich-blue/30 rounded-md">
                  <h3 className="font-bold text-battlebot-golden-yellow">Middleweight</h3>
                  <p>100kg (220lbs) maximum</p>
                </div>
                <div className="p-3 bg-battlebot-rich-blue/30 rounded-md">
                  <h3 className="font-bold text-battlebot-golden-yellow">Heavyweight</h3>
                  <p>120kg (264lbs) maximum</p>
                </div>
                <div className="p-3 bg-battlebot-rich-blue/30 rounded-md">
                  <h3 className="font-bold text-battlebot-golden-yellow">Super Heavyweight</h3>
                  <p>140kg+ (308lbs+)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="battle-card p-6">
              <div className="flex items-center mb-4">
                <Award className="w-8 h-8 text-battlebot-golden-yellow mr-3" />
                <h2 className="text-2xl font-bold text-battlebot-light-text">Match Rules</h2>
              </div>
              <ul className="space-y-3 text-battlebot-light-text/90">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-battlebot-bright-yellow rounded-full mt-2 mr-2"></span>
                  <span>Matches consist of 3-minute rounds.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-battlebot-bright-yellow rounded-full mt-2 mr-2"></span>
                  <span>A robot is declared knocked out if it is unable to demonstrate controlled movement for 20 seconds.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-battlebot-bright-yellow rounded-full mt-2 mr-2"></span>
                  <span>If no knockout occurs, judges will score the match based on damage, aggression, and control.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-battlebot-bright-yellow rounded-full mt-2 mr-2"></span>
                  <span>Teams have 20 minutes between matches for repairs.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-battlebot-bright-yellow rounded-full mt-2 mr-2"></span>
                  <span>A maximum of 2 team members are allowed in the arena during setup and removal.</span>
                </li>
              </ul>
            </div>

            <div className="battle-card p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-8 h-8 text-battlebot-golden-yellow mr-3" />
                <h2 className="text-2xl font-bold text-battlebot-light-text">Disqualification</h2>
              </div>
              <ul className="space-y-3 text-battlebot-light-text/90">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-battlebot-bright-yellow rounded-full mt-2 mr-2"></span>
                  <span>Intentionally damaging the arena or its containment systems.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-battlebot-bright-yellow rounded-full mt-2 mr-2"></span>
                  <span>Use of prohibited weapons or materials (explosives, nets, jammers, etc).</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-battlebot-bright-yellow rounded-full mt-2 mr-2"></span>
                  <span>Unsportsmanlike conduct, including verbal abuse of opponents or officials.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-battlebot-bright-yellow rounded-full mt-2 mr-2"></span>
                  <span>Failure to comply with referee instructions during a match.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-battlebot-bright-yellow rounded-full mt-2 mr-2"></span>
                  <span>Tampering with opponent robots or control systems before, during, or after matches.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-battlebot-light-text/70 italic">
              All rules are subject to interpretation by the head referee. The event organizers reserve the right to modify rules for safety or competition integrity.
            </p>
            <button className="battle-button mt-6">
              Download Complete Rulebook (PDF)
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Rules;
