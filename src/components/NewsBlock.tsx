
import React from "react";
import { Calendar, Trophy, Users } from "lucide-react";

interface NewsItemProps {
  icon: React.ReactNode;
  title: string;
  date: string;
  description: string;
  imageSrc: string;
}

const NewsItem: React.FC<NewsItemProps> = ({ icon, title, date, description, imageSrc }) => {
  return (
    <div className="battle-card flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 rounded-full bg-battlebot-rich-blue flex items-center justify-center mr-3">
            {icon}
          </div>
          <p className="text-battlebot-bright-yellow text-sm">{date}</p>
        </div>
        <h3 className="text-xl font-bold text-battlebot-light-text mb-3">{title}</h3>
        <p className="text-battlebot-light-text/80 mb-4 flex-grow">{description}</p>
        <button className="text-battlebot-bright-yellow hover:text-battlebot-golden-yellow font-semibold transition-colors duration-300 self-start">
          Read More →
        </button>
      </div>
    </div>
  );
};

const NewsBlock: React.FC = () => {
  return (
    <section className="py-16 bg-battlebot-dark-blue-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 text-battlebot-light-text">Latest Updates</h2>
          <div className="w-24 h-1 bg-battlebot-bright-yellow mx-auto"></div>
          <p className="text-battlebot-light-text/80 mt-4 max-w-2xl mx-auto">
            Stay updated with the latest news, team announcements, and event highlights from the Battle Bots community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <NewsItem
            icon={<Trophy size={16} className="text-battlebot-golden-yellow" />}
            title="2023 World Champions Crowned"
            date="March 10, 2024"
            description="Team HyperShock takes home the trophy after an intense final battle against defending champions Bite Force."
            imageSrc="https://images.unsplash.com/photo-1535378620166-273708d44e4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
          />
          <NewsItem
            icon={<Users size={16} className="text-battlebot-golden-yellow" />}
            title="New Competitor Regulations Announced"
            date="March 5, 2024"
            description="Updated weight classes and safety guidelines have been published for the upcoming season. Review the changes now."
            imageSrc="https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
          />
          <NewsItem
            icon={<Calendar size={16} className="text-battlebot-golden-yellow" />}
            title="Summer Exhibition Announced"
            date="February 28, 2024"
            description="Join us for a special exhibition event featuring demonstration matches and technology showcases from top teams."
            imageSrc="https://images.unsplash.com/photo-1531279550271-23c2a77a765c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
          />
        </div>
      </div>
    </section>
  );
};

export default NewsBlock;
