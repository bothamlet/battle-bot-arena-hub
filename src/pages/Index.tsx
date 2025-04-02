
import React from "react";
import Header from "../components/Header";
import HeroSlider from "../components/HeroSlider";
import NewsBlock from "../components/NewsBlock";
import RegistrationForm from "../components/RegistrationForm";
import EventSchedule from "../components/EventSchedule";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSlider />
        <NewsBlock />
        <EventSchedule />
        <RegistrationForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
