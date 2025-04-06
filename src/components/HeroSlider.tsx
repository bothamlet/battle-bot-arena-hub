
import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    title: "CHAMPIONSHIP FINALS",
    subtitle: "May 15-17, 2024 • Las Vegas, Nevada",
    description: "The ultimate showdown between the world's most advanced battle bots!"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1563292769-4a6620e8ac68?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    title: "REGIONAL QUALIFIERS",
    subtitle: "April 3-5, 2024 • Chicago, Illinois",
    description: "Last chance to qualify for the championship finals!"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    title: "ROBOT REVOLUTION",
    subtitle: "June 12-14, 2024 • Tokyo, Japan",
    description: "Featuring next-gen autonomous battle bots and cutting-edge technology!"
  }
];

const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[85vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute top-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 8, 20, 0.7), rgba(0, 29, 61, 0.7)), url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="container mx-auto h-full flex flex-col justify-center items-center text-center px-4">
            <h2 className="text-battlebot-golden-yellow text-xl md:text-2xl font-bold tracking-wider mb-5">
              {slide.subtitle}
            </h2>
            <h1 className="text-battlebot-light-text text-6xl md:text-8xl font-extrabold mb-8">
              {slide.title}
            </h1>
            <p className="text-battlebot-light-text text-xl md:text-3xl max-w-3xl mb-12">
              {slide.description}
            </p>
            <div className="flex space-x-8">
              <button className="battle-button text-xl py-4 px-10">
                Buy Tickets
              </button>
              <button className="bg-transparent border-2 border-battlebot-golden-yellow text-battlebot-golden-yellow font-bold py-4 px-10 text-xl rounded-md hover:bg-battlebot-golden-yellow/10 transition-colors duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-battlebot-deep-navy-blue/70 hover:bg-battlebot-deep-navy-blue text-battlebot-light-text p-4 rounded-full"
      >
        <ArrowLeft size={32} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-battlebot-deep-navy-blue/70 hover:bg-battlebot-deep-navy-blue text-battlebot-light-text p-4 rounded-full"
      >
        <ArrowRight size={32} />
      </button>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-4 h-4 rounded-full ${
              index === currentSlide ? "bg-battlebot-golden-yellow" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
