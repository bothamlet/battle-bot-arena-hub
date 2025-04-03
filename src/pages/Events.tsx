
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EventSchedule from "../components/EventSchedule";

const Events: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-16 bg-battlebot-dark-blue-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-battlebot-light-text">
              Upcoming BattleBots Events
            </h1>
            <div className="w-24 h-1 bg-battlebot-bright-yellow mx-auto"></div>
            <p className="text-battlebot-light-text/80 mt-4 max-w-2xl mx-auto">
              Check out the schedule of upcoming tournaments, exhibitions, and championship matches
            </p>
          </div>
          
          <EventSchedule />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
