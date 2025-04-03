
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RegistrationForm from "../components/RegistrationForm";

const Register: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-battlebot-dark-blue-black/90 bg-[url(https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80)] bg-fixed bg-blend-overlay py-10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-2 text-battlebot-light-text">
                Join The Robot Revolution
              </h1>
              <div className="w-24 h-1 bg-battlebot-bright-yellow mx-auto"></div>
              <p className="text-battlebot-light-text/80 mt-4 max-w-2xl mx-auto text-xl">
                Register your team and battle bot for the next championship season
              </p>
            </div>
          </div>
        </div>
        <RegistrationForm />
      </main>
      <Footer />
    </div>
  );
};

export default Register;
