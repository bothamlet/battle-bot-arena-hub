
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EventSchedule from "../components/EventSchedule";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, List, MapPin, Calendar as CalendarIconEvent } from "lucide-react";
import { addMonths, format, isSameDay } from "date-fns";

// Example upcoming events data
const upcomingEvents = [
  {
    id: 1,
    title: "Championship Finals",
    date: new Date(2025, 4, 15),
    location: "Battle Arena A",
    description: "Top 8 robots face off in the championship finals"
  },
  {
    id: 2,
    title: "Regional Qualifiers",
    date: new Date(2025, 5, 3),
    location: "Mech Stadium",
    description: "East Coast regional qualifying tournament"
  },
  {
    id: 3,
    title: "International Invitational",
    date: new Date(2025, 5, 22),
    location: "Global Robot Arena",
    description: "Top teams from around the world compete"
  },
  {
    id: 4,
    title: "Rookie Showcase",
    date: new Date(2025, 6, 8),
    location: "Training Grounds",
    description: "New teams and robots make their debut"
  },
  {
    id: 5,
    title: "Heavyweight Tournament",
    date: new Date(2025, 6, 20),
    location: "Power Dome",
    description: "120kg+ weight class championship event"
  },
  {
    id: 6, 
    title: "Summer Slam",
    date: new Date(2025, 7, 5),
    location: "Beachside Arena",
    description: "Annual summer tournament with special rules"
  },
  {
    id: 7,
    title: "Team Challenge",
    date: new Date(2025, 7, 19),
    location: "Collaboration Center",
    description: "Teams pair up for 2v2 battles"
  },
  {
    id: 8,
    title: "Tech Innovation Cup",
    date: new Date(2025, 8, 9),
    location: "Future Labs Stadium",
    description: "Featuring the most innovative robot designs"
  },
  {
    id: 9,
    title: "Battle Royale",
    date: new Date(2025, 9, 1),
    location: "Chaos Colosseum",
    description: "Multiple robots battle simultaneously until one remains"
  },
  {
    id: 10,
    title: "Season Finale",
    date: new Date(2025, 9, 25),
    location: "Grand Arena",
    description: "Final event of the season with special awards ceremony"
  }
];

const Events: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedEvents, setSelectedEvents] = useState<any[]>([]);
  
  // Filter events for the selected date
  React.useEffect(() => {
    if (date) {
      const filtered = upcomingEvents.filter(event => 
        isSameDay(event.date, date)
      );
      setSelectedEvents(filtered);
    } else {
      setSelectedEvents([]);
    }
  }, [date]);

  // Get all dates that have events for highlighting in the calendar
  const eventDates = upcomingEvents.map(event => event.date);
  
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
          
          <Tabs defaultValue="list" className="w-full max-w-5xl mx-auto">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="list" className="data-[state=active]:bg-battlebot-golden-yellow data-[state=active]:text-battlebot-dark-text">
                <List className="mr-2 h-4 w-4" />
                List View
              </TabsTrigger>
              <TabsTrigger value="calendar" className="data-[state=active]:bg-battlebot-golden-yellow data-[state=active]:text-battlebot-dark-text">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Calendar View
              </TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="mt-0">
              <EventSchedule fullPage={true} />
            </TabsContent>

            <TabsContent value="calendar" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 battle-card p-6">
                  <h2 className="text-2xl font-bold mb-4 text-battlebot-golden-yellow">
                    6-Month Event Calendar
                  </h2>
                  <div className="bg-battlebot-deep-navy-blue p-4 rounded-lg">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="text-battlebot-light-text"
                      disabled={{ before: new Date() }}
                      fromDate={new Date()}
                      toDate={addMonths(new Date(), 6)}
                      modifiers={{
                        event: eventDates
                      }}
                      modifiersClassNames={{
                        event: "border-2 border-battlebot-golden-yellow text-battlebot-bright-yellow font-bold"
                      }}
                    />
                    <div className="mt-4 flex items-center justify-end">
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-battlebot-golden-yellow rounded-sm mr-2"></div>
                        <span className="text-battlebot-light-text text-sm">Event Scheduled</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="battle-card p-6">
                  <h2 className="text-2xl font-bold mb-4 text-battlebot-golden-yellow flex items-center">
                    <CalendarIconEvent className="mr-2 h-5 w-5" />
                    {date ? format(date, 'MMMM d, yyyy') : 'Select a Date'}
                  </h2>
                  
                  {selectedEvents.length > 0 ? (
                    <div className="space-y-4">
                      {selectedEvents.map(event => (
                        <Card key={event.id} className="bg-battlebot-deep-navy-blue border-battlebot-rich-blue">
                          <CardContent className="p-4">
                            <h3 className="text-lg font-bold text-battlebot-light-text mb-2">{event.title}</h3>
                            <div className="flex items-center text-battlebot-light-text/70 mb-2">
                              <MapPin className="h-4 w-4 mr-1 text-battlebot-golden-yellow" />
                              <span>{event.location}</span>
                            </div>
                            <p className="text-battlebot-light-text/80 text-sm">{event.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-8 text-battlebot-light-text/70">
                      {date ? 'No events scheduled for this date' : 'Select a date to view events'}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
