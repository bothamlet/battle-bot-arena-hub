
import React from "react";
import { Link } from "react-router-dom";
import { Trophy, Users, Star } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="bg-battlebot-deep-navy-blue py-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Trophy size={32} className="text-battlebot-golden-yellow mr-2" />
              <span className="text-2xl font-bold text-battlebot-light-text">
                Battle<span className="text-battlebot-bright-yellow">Bots</span>
              </span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="battle-nav-link">
              Home
            </Link>
            <Link to="/events" className="battle-nav-link">
              Events
            </Link>
            <Link to="/gamble" className="battle-nav-link">
              Gamble
            </Link>
            <Link to="/teams" className="battle-nav-link">
              Teams
            </Link>
            <Link to="/rules" className="battle-nav-link">
              Rules
            </Link>
          </nav>
          
          <div className="flex items-center space-x-2">
            <Link 
              to="/register" 
              className="battle-button flex items-center"
            >
              <Star size={18} className="mr-1" />
              Register
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
