
import React, { useState } from "react";
import { Bot, Shield, Trophy, Zap, Users, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    teamName: "",
    captainName: "",
    email: "",
    phone: "",
    botName: "",
    weightClass: "lightweight",
    description: "",
    weaponType: "spinner",
    memberCount: "2",
    experience: "rookie",
    mediaConsent: false,
    rulesAgreement: false,
  });

  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    
    toast({
      title: "Registration Successful!",
      description: `Team "${formData.teamName}" with bot "${formData.botName}" has been registered.`,
      duration: 5000,
    });
    
    setFormData({
      teamName: "",
      captainName: "",
      email: "",
      phone: "",
      botName: "",
      weightClass: "lightweight",
      description: "",
      weaponType: "spinner",
      memberCount: "2",
      experience: "rookie",
      mediaConsent: false,
      rulesAgreement: false,
    });
  };

  return (
    <section className="py-16 bg-gradient-to-b from-battlebot-rich-blue to-battlebot-deep-navy-blue">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto bg-battlebot-deep-navy-blue rounded-lg overflow-hidden shadow-2xl border border-battlebot-golden-yellow">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/5 bg-gradient-to-br from-battlebot-dark-blue-black to-battlebot-deep-navy-blue p-8 flex items-start justify-center">
              <div className="sticky top-10">
                <div className="mx-auto w-32 h-32 rounded-full bg-battlebot-golden-yellow flex items-center justify-center mb-6 animate-pulse-glow relative">
                  <Bot size={60} className="text-battlebot-dark-blue-black" />
                  <div className="absolute inset-0 rounded-full border-4 border-battlebot-golden-yellow animate-ping opacity-50"></div>
                </div>
                <h3 className="text-3xl font-bold text-battlebot-light-text mb-4">Register Your BattleBot</h3>
                <p className="text-battlebot-light-text/70 text-lg mb-8">
                  Join the ranks of elite competitors in the next championship season!
                </p>
                
                <div className="mt-8 space-y-5">
                  <div className="flex items-center text-battlebot-light-text/90">
                    <span className="w-8 h-8 rounded-full bg-battlebot-golden-yellow/20 flex items-center justify-center mr-3 text-battlebot-golden-yellow">1</span>
                    <span className="text-lg">Fill out team details</span>
                  </div>
                  <div className="flex items-center text-battlebot-light-text/90">
                    <span className="w-8 h-8 rounded-full bg-battlebot-golden-yellow/20 flex items-center justify-center mr-3 text-battlebot-golden-yellow">2</span>
                    <span className="text-lg">Describe your battle bot</span>
                  </div>
                  <div className="flex items-center text-battlebot-light-text/90">
                    <span className="w-8 h-8 rounded-full bg-battlebot-golden-yellow/20 flex items-center justify-center mr-3 text-battlebot-golden-yellow">3</span>
                    <span className="text-lg">Sign waivers and agreements</span>
                  </div>
                  <div className="flex items-center text-battlebot-light-text/90">
                    <span className="w-8 h-8 rounded-full bg-battlebot-golden-yellow/20 flex items-center justify-center mr-3 text-battlebot-golden-yellow">4</span>
                    <span className="text-lg">Receive confirmation</span>
                  </div>
                </div>
                
                <div className="mt-12 p-6 bg-battlebot-dark-blue-black/50 rounded-lg border border-battlebot-golden-yellow/20">
                  <h4 className="text-battlebot-golden-yellow font-bold text-xl mb-3 flex items-center">
                    <Trophy className="mr-2" />
                    Championship Benefits
                  </h4>
                  <ul className="space-y-3 text-battlebot-light-text/80">
                    <li className="flex items-start">
                      <Shield className="h-5 w-5 mr-2 text-battlebot-bright-yellow shrink-0 mt-0.5" />
                      <span>Compete for the grand prize of $50,000</span>
                    </li>
                    <li className="flex items-start">
                      <Zap className="h-5 w-5 mr-2 text-battlebot-bright-yellow shrink-0 mt-0.5" />
                      <span>Global TV and streaming coverage</span>
                    </li>
                    <li className="flex items-start">
                      <Users className="h-5 w-5 mr-2 text-battlebot-bright-yellow shrink-0 mt-0.5" />
                      <span>Access to sponsor networking events</span>
                    </li>
                    <li className="flex items-start">
                      <Video className="h-5 w-5 mr-2 text-battlebot-bright-yellow shrink-0 mt-0.5" />
                      <span>Exclusive media opportunities</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="md:w-3/5 p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-battlebot-golden-yellow border-b border-battlebot-golden-yellow/30 pb-2">Team Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="teamName" className="block text-battlebot-light-text mb-2 font-medium">Team Name *</label>
                      <input
                        type="text"
                        id="teamName"
                        name="teamName"
                        required
                        value={formData.teamName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-battlebot-dark-blue-black border border-battlebot-rich-blue focus:border-battlebot-bright-yellow text-battlebot-light-text focus:outline-none"
                        placeholder="Enter your team name"
                      />
                    </div>
                    <div>
                      <label htmlFor="captainName" className="block text-battlebot-light-text mb-2 font-medium">Team Captain Name *</label>
                      <input
                        type="text"
                        id="captainName"
                        name="captainName"
                        required
                        value={formData.captainName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-battlebot-dark-blue-black border border-battlebot-rich-blue focus:border-battlebot-bright-yellow text-battlebot-light-text focus:outline-none"
                        placeholder="Enter team captain's full name"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label htmlFor="email" className="block text-battlebot-light-text mb-2 font-medium">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-battlebot-dark-blue-black border border-battlebot-rich-blue focus:border-battlebot-bright-yellow text-battlebot-light-text focus:outline-none"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-battlebot-light-text mb-2 font-medium">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-battlebot-dark-blue-black border border-battlebot-rich-blue focus:border-battlebot-bright-yellow text-battlebot-light-text focus:outline-none"
                        placeholder="(123) 456-7890"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <label htmlFor="memberCount" className="block text-battlebot-light-text mb-2 font-medium">Team Size *</label>
                    <select
                      id="memberCount"
                      name="memberCount"
                      required
                      value={formData.memberCount}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-battlebot-dark-blue-black border border-battlebot-rich-blue focus:border-battlebot-bright-yellow text-battlebot-light-text focus:outline-none"
                    >
                      <option value="1">Single Competitor</option>
                      <option value="2">2 Members</option>
                      <option value="3-5">3-5 Members</option>
                      <option value="6+">6+ Members</option>
                    </select>
                  </div>
                  
                  <div className="mt-6">
                    <label htmlFor="experience" className="block text-battlebot-light-text mb-2 font-medium">Team Experience Level *</label>
                    <select
                      id="experience"
                      name="experience"
                      required
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-battlebot-dark-blue-black border border-battlebot-rich-blue focus:border-battlebot-bright-yellow text-battlebot-light-text focus:outline-none"
                    >
                      <option value="rookie">Rookie (First Time)</option>
                      <option value="amateur">Amateur (1-2 Seasons)</option>
                      <option value="experienced">Experienced (3-5 Seasons)</option>
                      <option value="veteran">Veteran (6+ Seasons)</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-battlebot-golden-yellow border-b border-battlebot-golden-yellow/30 pb-2">Robot Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="botName" className="block text-battlebot-light-text mb-2 font-medium">Robot Name *</label>
                      <input
                        type="text"
                        id="botName"
                        name="botName"
                        required
                        value={formData.botName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-battlebot-dark-blue-black border border-battlebot-rich-blue focus:border-battlebot-bright-yellow text-battlebot-light-text focus:outline-none"
                        placeholder="Enter your robot's name"
                      />
                    </div>
                    <div>
                      <label htmlFor="weightClass" className="block text-battlebot-light-text mb-2 font-medium">Weight Class *</label>
                      <select
                        id="weightClass"
                        name="weightClass"
                        required
                        value={formData.weightClass}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-battlebot-dark-blue-black border border-battlebot-rich-blue focus:border-battlebot-bright-yellow text-battlebot-light-text focus:outline-none"
                      >
                        <option value="lightweight">Lightweight (60kg)</option>
                        <option value="middleweight">Middleweight (100kg)</option>
                        <option value="heavyweight">Heavyweight (120kg)</option>
                        <option value="superheavyweight">Super Heavyweight (140kg+)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <label htmlFor="weaponType" className="block text-battlebot-light-text mb-2 font-medium">Primary Weapon Type *</label>
                    <select
                      id="weaponType"
                      name="weaponType"
                      required
                      value={formData.weaponType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-battlebot-dark-blue-black border border-battlebot-rich-blue focus:border-battlebot-bright-yellow text-battlebot-light-text focus:outline-none"
                    >
                      <option value="spinner">Spinner</option>
                      <option value="flipper">Flipper</option>
                      <option value="crusher">Crusher</option>
                      <option value="hammer">Hammer</option>
                      <option value="saw">Saw</option>
                      <option value="wedge">Wedge</option>
                      <option value="drum">Drum</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="mt-6">
                    <label htmlFor="description" className="block text-battlebot-light-text mb-2 font-medium">Robot Description</label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-battlebot-dark-blue-black border border-battlebot-rich-blue focus:border-battlebot-bright-yellow text-battlebot-light-text focus:outline-none"
                      placeholder="Tell us about your robot's design, weapons, strategy, and unique features..."
                    />
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-battlebot-golden-yellow border-b border-battlebot-golden-yellow/30 pb-2">Terms & Agreements</h3>
                  
                  <div className="space-y-4 mt-4">
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="mediaConsent"
                        name="mediaConsent"
                        checked={formData.mediaConsent}
                        onChange={handleChange}
                        className="mt-1 w-4 h-4 text-battlebot-golden-yellow bg-battlebot-dark-blue-black border-battlebot-rich-blue focus:ring-battlebot-bright-yellow"
                      />
                      <label htmlFor="mediaConsent" className="ml-2 text-battlebot-light-text/80">
                        I consent to be photographed and filmed during the event, and grant permission for these materials to be used for promotional purposes.
                      </label>
                    </div>
                    
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="rulesAgreement"
                        name="rulesAgreement"
                        required
                        checked={formData.rulesAgreement}
                        onChange={handleChange}
                        className="mt-1 w-4 h-4 text-battlebot-golden-yellow bg-battlebot-dark-blue-black border-battlebot-rich-blue focus:ring-battlebot-bright-yellow"
                      />
                      <label htmlFor="rulesAgreement" className="ml-2 text-battlebot-light-text/80">
                        I agree to the <a href="/rules" className="text-battlebot-golden-yellow hover:underline">competition rules</a> and safety guidelines, and understand that violation may result in disqualification.
                      </label>
                    </div>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full py-4 bg-battlebot-golden-yellow text-battlebot-dark-text font-bold text-xl rounded-lg 
                  hover:bg-battlebot-bright-yellow transition-all duration-300 shadow-lg hover:shadow-battlebot-bright-yellow/30 transform hover:scale-[1.02]"
                >
                  Register Your Team & Robot
                </button>
                
                <p className="text-battlebot-light-text/60 text-center text-sm mt-4">
                  Upon submission, you will receive a confirmation email with further instructions.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
