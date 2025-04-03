
import React from "react";
import Header from "../components/Header";
import HeroSlider from "../components/HeroSlider";
import EventSchedule from "../components/EventSchedule";
import Footer from "../components/Footer";
import TopFightersLeaderboard from "../components/TopFightersLeaderboard";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSlider />
        <TopFightersLeaderboard />
        <EventSchedule />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
