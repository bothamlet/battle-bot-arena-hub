
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RegistrationForm from "../components/RegistrationForm";

const Register: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <RegistrationForm />
      </main>
      <Footer />
    </div>
  );
};

export default Register;
