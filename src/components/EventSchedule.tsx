
import React from "react";
import { Calendar, Clock, MapPin } from "lucide-react";

interface EventProps {
  date: string;
  title: string;
  location: string;
  time: string;
  featured?: boolean;
}

const Event: React.FC<EventProps> = ({ date, title, location, time, featured = false }) => {
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
          <button className={`px-4 py-2 rounded-md transition-colors duration-300 ${
            featured 
              ? "bg-battlebot-golden-yellow text-battlebot-dark-text hover:bg-battlebot-bright-yellow" 
              : "border border-battlebot-bright-yellow text-battlebot-bright-yellow hover:bg-battlebot-bright-yellow/10"
          }`}>
            Details
          </button>
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
            />
            <Event
              date="April 18-20"
              title="Regional Qualifiers - East Coast Division"
              location="Boston, Massachusetts"
              time="11:00 AM - 7:00 PM"
            />
            <Event
              date="May 1-3"
              title="Regional Qualifiers - West Coast Division"
              location="San Francisco, California"
              time="10:00 AM - 6:00 PM"
            />
            <Event
              date="May 15-17"
              title="Championship Finals"
              location="Las Vegas, Nevada"
              time="12:00 PM - 10:00 PM"
              featured
            />
            <Event
              date="June 12-14"
              title="Robot Revolution Exhibition"
              location="Tokyo, Japan"
              time="11:00 AM - 8:00 PM"
            />
          </div>
          
          <div className="mt-8 text-center">
            <button className="battle-button">
              View Full Calendar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventSchedule;
