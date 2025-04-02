
import React, { useState } from "react";
import { Bot } from "lucide-react";

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    teamName: "",
    captainName: "",
    email: "",
    phone: "",
    botName: "",
    weightClass: "lightweight",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
    alert("Registration submitted successfully!");
    setFormData({
      teamName: "",
      captainName: "",
      email: "",
      phone: "",
      botName: "",
      weightClass: "lightweight",
      description: "",
    });
  };

  return (
    <section className="py-16 bg-battlebot-rich-blue">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-battlebot-deep-navy-blue rounded-lg overflow-hidden shadow-2xl border border-battlebot-bright-yellow/20">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 bg-gradient-to-br from-battlebot-dark-blue-black to-battlebot-deep-navy-blue p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto w-20 h-20 rounded-full bg-battlebot-golden-yellow flex items-center justify-center mb-4 animate-pulse-glow">
                  <Bot size={40} className="text-battlebot-dark-blue-black" />
                </div>
                <h3 className="text-2xl font-bold text-battlebot-light-text mb-2">Register Your Bot</h3>
                <p className="text-battlebot-light-text/70">
                  Join the ranks of elite competitors in the next battle arena event!
                </p>
                <div className="mt-8 space-y-3">
                  <div className="flex items-center text-battlebot-light-text/80">
                    <span className="w-6 h-6 rounded-full bg-battlebot-golden-yellow/20 flex items-center justify-center mr-2 text-battlebot-golden-yellow">1</span>
                    <span>Fill out team details</span>
                  </div>
                  <div className="flex items-center text-battlebot-light-text/80">
                    <span className="w-6 h-6 rounded-full bg-battlebot-golden-yellow/20 flex items-center justify-center mr-2 text-battlebot-golden-yellow">2</span>
                    <span>Describe your battle bot</span>
                  </div>
                  <div className="flex items-center text-battlebot-light-text/80">
                    <span className="w-6 h-6 rounded-full bg-battlebot-golden-yellow/20 flex items-center justify-center mr-2 text-battlebot-golden-yellow">3</span>
                    <span>Receive confirmation</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3 p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="teamName" className="block text-battlebot-light-text mb-1">Team Name *</label>
                    <input
                      type="text"
                      id="teamName"
                      name="teamName"
                      required
                      value={formData.teamName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded bg-battlebot-dark-blue-black border border-battlebot-rich-blue focus:border-battlebot-bright-yellow text-battlebot-light-text focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="captainName" className="block text-battlebot-light-text mb-1">Captain Name *</label>
                    <input
                      type="text"
                      id="captainName"
                      name="captainName"
                      required
                      value={formData.captainName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded bg-battlebot-dark-blue-black border border-battlebot-rich-blue focus:border-battlebot-bright-yellow text-battlebot-light-text focus:outline-none"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-battlebot-light-text mb-1">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded bg-battlebot-dark-blue-black border border-battlebot-rich-blue focus:border-battlebot-bright-yellow text-battlebot-light-text focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-battlebot-light-text mb-1">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded bg-battlebot-dark-blue-black border border-battlebot-rich-blue focus:border-battlebot-bright-yellow text-battlebot-light-text focus:outline-none"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="botName" className="block text-battlebot-light-text mb-1">Bot Name *</label>
                    <input
                      type="text"
                      id="botName"
                      name="botName"
                      required
                      value={formData.botName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded bg-battlebot-dark-blue-black border border-battlebot-rich-blue focus:border-battlebot-bright-yellow text-battlebot-light-text focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="weightClass" className="block text-battlebot-light-text mb-1">Weight Class *</label>
                    <select
                      id="weightClass"
                      name="weightClass"
                      required
                      value={formData.weightClass}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded bg-battlebot-dark-blue-black border border-battlebot-rich-blue focus:border-battlebot-bright-yellow text-battlebot-light-text focus:outline-none"
                    >
                      <option value="lightweight">Lightweight (60kg)</option>
                      <option value="middleweight">Middleweight (100kg)</option>
                      <option value="heavyweight">Heavyweight (120kg+)</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-battlebot-light-text mb-1">Bot Description</label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded bg-battlebot-dark-blue-black border border-battlebot-rich-blue focus:border-battlebot-bright-yellow text-battlebot-light-text focus:outline-none"
                    placeholder="Tell us about your bot's weapons, strategy, and unique features..."
                  />
                </div>
                
                <div className="flex items-center mt-4">
                  <input
                    type="checkbox"
                    id="agree"
                    required
                    className="w-4 h-4 text-battlebot-golden-yellow bg-battlebot-dark-blue-black border-battlebot-rich-blue focus:ring-battlebot-bright-yellow"
                  />
                  <label htmlFor="agree" className="ml-2 text-sm text-battlebot-light-text/80">
                    I agree to the competition rules and safety guidelines
                  </label>
                </div>
                
                <button
                  type="submit"
                  className="w-full mt-6 bg-battlebot-golden-yellow text-battlebot-dark-text font-bold py-3 px-6 rounded-md 
                  hover:bg-battlebot-bright-yellow transition-all duration-300 shadow-lg hover:shadow-battlebot-bright-yellow/30"
                >
                  Register Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
