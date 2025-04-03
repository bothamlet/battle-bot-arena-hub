
import React from "react";
import { Calendar, Clock, MapPin, Users, Shield, Trophy, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface EventProps {
  date: string;
  title: string;
  location: string;
  time: string;
  description?: string;
  weightClass?: string;
  prize?: string;
  participants?: string[];
  featured?: boolean;
}

const EventDetail: React.FC<{ event: EventProps }> = ({ event }) => {
  const participants = event.participants || [
    "Crusher Kings", "Metal Mayhem", "Robo Wreckers", "Circuit Breakers", 
    "Steel Titans", "Volt Vipers", "Spark Slammers", "Gear Gladiators"
  ];
  
  const description = event.description || 
    "Join us for an exciting robot battle event featuring the most advanced combat machines in the region. This event will showcase innovative designs, powerful weapons, and strategic gameplay.";
  
  const weightClass = event.weightClass || (event.featured ? "Heavyweight (120kg)" : "Middleweight (100kg)");
  
  const prize = event.prize || (event.featured ? "$10,000 + Championship Trophy" : "$5,000");

  return (
    <div className="text-battlebot-light-text">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-battlebot-golden-yellow mb-2">{event.title}</h3>
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-battlebot-bright-yellow mr-2" />
            <span>{event.date}</span>
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
          <p>{description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-battlebot-rich-blue/20 p-4 rounded-md">
          <div className="flex items-center mb-2">
            <Shield className="w-5 h-5 text-battlebot-golden-yellow mr-2" />
            <h4 className="font-bold">Weight Class</h4>
          </div>
          <p>{weightClass}</p>
        </div>
        <div className="bg-battlebot-rich-blue/20 p-4 rounded-md">
          <div className="flex items-center mb-2">
            <Trophy className="w-5 h-5 text-battlebot-golden-yellow mr-2" />
            <h4 className="font-bold">Prize</h4>
          </div>
          <p>{prize}</p>
        </div>
        <div className="bg-battlebot-rich-blue/20 p-4 rounded-md">
          <div className="flex items-center mb-2">
            <Users className="w-5 h-5 text-battlebot-golden-yellow mr-2" />
            <h4 className="font-bold">Participants</h4>
          </div>
          <p>{participants.length} teams</p>
        </div>
      </div>

      <div>
        <h4 className="font-bold mb-2 flex items-center">
          <Users className="w-5 h-5 text-battlebot-golden-yellow mr-2" />
          Participating Teams
        </h4>
        <div className="bg-battlebot-deep-navy-blue p-4 rounded-md">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {participants.map((team, index) => (
              <li key={index} className="flex items-center">
                <span className="w-2 h-2 bg-battlebot-bright-yellow rounded-full mr-2"></span>
                {team}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <Link to="/register">
          <Button className="battle-button">Register for this Event</Button>
        </Link>
      </div>
    </div>
  );
};

const Event: React.FC<EventProps> = ({ date, title, location, time, featured = false, ...rest }) => {
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
              <EventDetail event={{ date, title, location, time, featured, ...rest }} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

const EventSchedule: React.FC = () => {
  return (
    <section className="py-16 bg-battlebot-dark-blue-black/95 bg-[url(https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80)] bg-fixed bg-blend-overlay">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 text-battlebot-light-text">Upcoming Events</h2>
          <div className="w-24 h-1 bg-battlebot-bright-yellow mx-auto"></div>
          <p className="text-battlebot-light-text/80 mt-4 max-w-2xl mx-auto">
            Mark your calendar for these exciting battle bot competitions and exhibitions.
          </p>
        </div>

        <div className="bg-battlebot-dark-blue-black/70 p-6 backdrop-blur-sm rounded-lg">
          <div className="flex items-center mb-8">
            <Calendar size={24} className="text-battlebot-golden-yellow mr-3" />
            <h3 className="text-2xl font-bold text-battlebot-light-text">2024 Event Schedule</h3>
          </div>
          
          <div className="space-y-4">
            <Event
              date="April 3-5"
              title="Regional Qualifiers - Midwest Division"
              location="Chicago, Illinois"
              time="10:00 AM - 6:00 PM"
              featured
              weightClass="Heavyweight (120kg)"
              prize="$10,000 + Trophy"
              participants={["Crusher Kings", "Metal Mayhem", "Robo Wreckers", "Circuit Breakers"]}
              description="The first stop in our regional qualifier circuit brings us to the Windy City! Teams will compete for points and placement in the championship finals."
            />
            <Event
              date="April 18-20"
              title="Regional Qualifiers - East Coast Division"
              location="Boston, Massachusetts"
              time="11:00 AM - 7:00 PM"
              weightClass="Middleweight (100kg)"
              prize="$7,500"
              participants={["Steel Titans", "Volt Vipers", "Spark Slammers", "Gear Gladiators"]}
              description="The East Coast showdown features academic powerhouses and veteran teams battling for glory in the historic Boston Arena."
            />
            <Event
              date="May 1-3"
              title="Regional Qualifiers - West Coast Division"
              location="San Francisco, California"
              time="10:00 AM - 6:00 PM"
              weightClass="Lightweight (60kg) & Middleweight (100kg)"
              prize="$7,500"
              participants={["Crusher Kings", "Volt Vipers", "Spark Slammers", "Circuit Breakers"]}
              description="Silicon Valley hosts the West Coast qualifiers with special technology showcases and cutting-edge robot designs."
            />
            <Event
              date="May 15-17"
              title="Championship Finals"
              location="Las Vegas, Nevada"
              time="12:00 PM - 10:00 PM"
              featured
              weightClass="All Divisions"
              prize="$25,000 + Championship Belt"
              participants={["Top 8 Qualifying Teams"]}
              description="The ultimate battle robot showdown! The top teams from regional qualifiers compete for the championship title in this three-day elimination tournament."
            />
            <Event
              date="June 12-14"
              title="Robot Revolution Exhibition"
              location="Tokyo, Japan"
              time="11:00 AM - 8:00 PM"
              weightClass="All Divisions - Exhibition"
              prize="Technology Exchange"
              participants={["International Invitational Teams"]}
              description="An international exhibition featuring teams from around the world showcasing the latest in battle robot technology and design."
            />
          </div>
          
          <div className="mt-8 text-center">
            <Link to="/events">
              <button className="battle-button">
                View Full Calendar
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventSchedule;
