
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RouletteWheel from "../components/roulette/RouletteWheel";

const Gamble = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-battlebot-deep-navy-blue py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-battlebot-light-text text-center mb-8">
            BattleBots Gamble
          </h1>
          <div className="max-w-4xl mx-auto">
            <RouletteWheel />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Gamble;
