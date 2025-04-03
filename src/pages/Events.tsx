
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Calendar, Clock, MapPin, Info, Users, Shield, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface EventProps {
  id: string;
  date: string;
  title: string;
  location: string;
  time: string;
  description: string;
  participants: string[];
  weightClass: string;
  prize: string;
  featured?: boolean;
}

const EventDetail: React.FC<{ event: EventProps }> = ({ event }) => {
  return (
    <div className="text-battlebot-light-text">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-battlebot-golden-yellow mb-2">{event.title}</h3>
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-battlebot-bright-yellow mr-2" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-battlebot-bright-yellow mr-2" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-5 h-5 text-battlebot-bright-yellow mr-2" />
            <span>{event.location}</span>
          </div>
        </div>
        <div className="bg-battlebot-deep-navy-blue p-4 rounded-md mb-4">
          <p>{event.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-battlebot-rich-blue/20 p-4 rounded-md">
          <div className="flex items-center mb-2">
            <Shield className="w-5 h-5 text-battlebot-golden-yellow mr-2" />
            <h4 className="font-bold">Weight Class</h4>
          </div>
          <p>{event.weightClass}</p>
        </div>
        <div className="bg-battlebot-rich-blue/20 p-4 rounded-md">
          <div className="flex items-center mb-2">
            <Trophy className="w-5 h-5 text-battlebot-golden-yellow mr-2" />
            <h4 className="font-bold">Prize</h4>
          </div>
          <p>{event.prize}</p>
        </div>
        <div className="bg-battlebot-rich-blue/20 p-4 rounded-md">
          <div className="flex items-center mb-2">
            <Users className="w-5 h-5 text-battlebot-golden-yellow mr-2" />
            <h4 className="font-bold">Participants</h4>
          </div>
          <p>{event.participants.length} teams</p>
        </div>
      </div>

      <div>
        <h4 className="font-bold mb-2 flex items-center">
          <Users className="w-5 h-5 text-battlebot-golden-yellow mr-2" />
          Participating Teams
        </h4>
        <div className="bg-battlebot-deep-navy-blue p-4 rounded-md">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {event.participants.map((team, index) => (
              <li key={index} className="flex items-center">
                <span className="w-2 h-2 bg-battlebot-bright-yellow rounded-full mr-2"></span>
                {team}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <Button className="battle-button">Register for this Event</Button>
      </div>
    </div>
  );
};

const Event: React.FC<EventProps & { onDetailsClick: () => void }> = ({ 
  date, title, location, time, featured = false, onDetailsClick 
}) => {
  return (
    <div className={`p-6 rounded-lg transition-all duration-300 hover:translate-y-[-5px] ${
      featured 
        ? "bg-gradient-to-r from-battlebot-deep-navy-blue to-battlebot-rich-blue border-l-4 border-battlebot-golden-yellow" 
        : "bg-battlebot-deep-navy-blue"
    }`}>
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="md:w-32 mb-4 md:mb-0">
          <div className={`text-center p-2 rounded ${
            featured ? "bg-battlebot-golden-yellow" : "bg-battlebot-dark-blue-black"
          }`}>
            <span className={`block text-sm ${
              featured ? "text-battlebot-dark-text" : "text-battlebot-light-text"
            }`}>
              {date}
            </span>
          </div>
        </div>
        
        <div className="md:ml-6 md:flex-1">
          <h3 className="text-xl font-bold text-battlebot-light-text mb-2">{title}</h3>
          <div className="flex flex-col md:flex-row md:items-center text-sm text-battlebot-light-text/70">
            <div className="flex items-center mb-2 md:mb-0 md:mr-6">
              <MapPin size={16} className="mr-1 text-battlebot-bright-yellow" />
              <span>{location}</span>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-1 text-battlebot-bright-yellow" />
              <span>{time}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 md:mt-0 md:ml-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                onClick={onDetailsClick}
                className={`px-4 py-2 rounded-md transition-colors duration-300 ${
                  featured 
                    ? "bg-battlebot-golden-yellow text-battlebot-dark-text hover:bg-battlebot-bright-yellow" 
                    : "border border-battlebot-bright-yellow text-battlebot-bright-yellow hover:bg-battlebot-bright-yellow/10"
                }`}
              >
                Details
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-battlebot-dark-blue-black border border-battlebot-bright-yellow max-w-3xl">
              <DialogHeader>
                <DialogTitle className="text-battlebot-golden-yellow">Event Details</DialogTitle>
                <DialogDescription className="text-battlebot-light-text/80">
                  Complete information about this battle event
                </DialogDescription>
              </DialogHeader>
              <EventDetail event={{
                id: Math.random().toString(36).substr(2, 9),
                date,
                title,
                location,
                time,
                description: "Join us for an exciting robot battle event featuring the most advanced combat machines in the region. This event will showcase innovative designs, powerful weapons, and strategic gameplay.",
                participants: ["Crusher Kings", "Metal Mayhem", "Robo Wreckers", "Circuit Breakers", "Steel Titans", "Volt Vipers", "Spark Slammers", "Gear Gladiators"],
                weightClass: featured ? "Heavyweight (120kg)" : "Middleweight (100kg)",
                prize: featured ? "$10,000 + Championship Trophy" : "$5,000",
                featured
              }} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

const Events: React.FC = () => {
  // Enhanced event data
  const eventsList = [
    {
      id: "event1",
      date: "April 3-5",
      title: "Regional Qualifiers - Midwest Division",
      location: "Chicago, Illinois",
      time: "10:00 AM - 6:00 PM",
      featured: true
    },
    {
      id: "event2",
      date: "April 18-20",
      title: "Regional Qualifiers - East Coast Division",
      location: "Boston, Massachusetts",
      time: "11:00 AM - 7:00 PM"
    },
    {
      id: "event3",
      date: "May 1-3",
      title: "Regional Qualifiers - West Coast Division",
      location: "San Francisco, California",
      time: "10:00 AM - 6:00 PM"
    },
    {
      id: "event4",
      date: "May 15-17",
      title: "Championship Finals",
      location: "Las Vegas, Nevada",
      time: "12:00 PM - 10:00 PM",
      featured: true
    },
    {
      id: "event5",
      date: "June 12-14",
      title: "Robot Revolution Exhibition",
      location: "Tokyo, Japan",
      time: "11:00 AM - 8:00 PM"
    },
    {
      id: "event6",
      date: "July 8-10",
      title: "International Invitational",
      location: "London, UK",
      time: "2:00 PM - 9:00 PM",
      featured: true
    },
    {
      id: "event7",
      date: "August 5-7",
      title: "Summer Showdown",
      location: "Miami, Florida",
      time: "1:00 PM - 8:00 PM"
    },
    {
      id: "event8",
      date: "September 15-17",
      title: "College Championship",
      location: "Austin, Texas",
      time: "11:00 AM - 7:00 PM"
    },
    {
      id: "event9",
      date: "October 20-22",
      title: "Fall Classic",
      location: "Seattle, Washington",
      time: "10:00 AM - 6:00 PM"
    },
    {
      id: "event10",
      date: "November 25-27",
      title: "Year-End Championships",
      location: "New York City, New York",
      time: "12:00 PM - 9:00 PM",
      featured: true
    }
  ];

  const [filter, setFilter] = useState("all");

  // Filter events based on selection
  const filteredEvents = filter === "all" 
    ? eventsList 
    : filter === "featured" 
      ? eventsList.filter(event => event.featured) 
      : eventsList.filter(event => !event.featured);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-16 bg-battlebot-dark-blue-black bg-[url(https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80)] bg-fixed bg-blend-overlay">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-battlebot-light-text">
              Upcoming BattleBots Events
            </h1>
            <div className="w-24 h-1 bg-battlebot-bright-yellow mx-auto"></div>
            <p className="text-battlebot-light-text/80 mt-4 max-w-2xl mx-auto">
              View all scheduled battle bot competitions and exhibitions around the world.
              Register for events or get detailed information about each competition.
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-md shadow-sm bg-battlebot-deep-navy-blue/50 p-1">
              <button
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  filter === "all"
                    ? "bg-battlebot-golden-yellow text-battlebot-dark-text"
                    : "text-battlebot-light-text hover:bg-battlebot-deep-navy-blue/70"
                }`}
                onClick={() => setFilter("all")}
              >
                All Events
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  filter === "featured"
                    ? "bg-battlebot-golden-yellow text-battlebot-dark-text"
                    : "text-battlebot-light-text hover:bg-battlebot-deep-navy-blue/70"
                }`}
                onClick={() => setFilter("featured")}
              >
                Featured
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  filter === "regular"
                    ? "bg-battlebot-golden-yellow text-battlebot-dark-text"
                    : "text-battlebot-light-text hover:bg-battlebot-deep-navy-blue/70"
                }`}
                onClick={() => setFilter("regular")}
              >
                Regular
              </button>
            </div>
          </div>

          <div className="bg-battlebot-dark-blue-black/70 p-6 backdrop-blur-sm rounded-lg">
            <div className="flex items-center mb-8">
              <Calendar size={24} className="text-battlebot-golden-yellow mr-3" />
              <h3 className="text-2xl font-bold text-battlebot-light-text">2024 Event Schedule</h3>
            </div>
            
            <div className="space-y-4">
              {filteredEvents.map((event) => (
                <Event
                  key={event.id}
                  id={event.id}
                  date={event.date}
                  title={event.title}
                  location={event.location}
                  time={event.time}
                  featured={event.featured}
                  onDetailsClick={() => {}}
                  description=""
                  participants={[]}
                  weightClass=""
                  prize=""
                />
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="battle-card p-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <Info size={24} className="text-battlebot-golden-yellow mr-2" />
                <h3 className="text-xl font-bold text-battlebot-light-text">Want to host an event?</h3>
              </div>
              <p className="text-battlebot-light-text/80 mb-6">
                If you're interested in hosting a BattleBots competition at your venue, 
                we provide arena rental, official referees, and technical support.
              </p>
              <Button className="battle-button">
                Contact Event Team
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
