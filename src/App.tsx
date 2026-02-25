/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Music, Mail, MapPin, Clock, ChevronDown, ChevronUp, Instagram, Facebook, Twitter } from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'F.A.Q', href: '#faq' },
    { name: 'Contact', href: '#contact' },
    { name: 'Team', href: '#team' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-10 h-10 flex items-center justify-center overflow-hidden rounded-sm group-hover:scale-110 transition-transform">
            <img 
              src="assets/Logo_1.png" 
              alt="Echo Frame Studios Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-xl font-bold tracking-tighter uppercase">Echo Frame Studios</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors uppercase tracking-widest"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black border-b border-white/10 md:hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-white/70 hover:text-white transition-colors uppercase tracking-widest"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-12">
    <div className="flex items-center gap-4 mb-4">
      <h2 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tight">{title}</h2>
      <div className="flex-1 h-[1px] bg-white/20"></div>
    </div>
    {subtitle && <p className="text-white/60 text-lg max-w-2xl">{subtitle}</p>}
  </div>
);

const ServiceCard = ({ title, description, price }: { title: string; description: string; price: string }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-8 rounded-2xl card-hover flex flex-col h-full"
  >
    <h3 className="text-xl font-bold mb-4 uppercase tracking-tight">{title}</h3>
    <p className="text-white/60 mb-8 flex-grow leading-relaxed">{description}</p>
    <div className="pt-6 border-t border-white/10 flex justify-between items-center">
      <span className="text-sm uppercase tracking-widest text-white/40">Starting at</span>
      <span className="text-xl font-bold">{price}</span>
    </div>
  </motion.div>
);

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:text-white/80 transition-colors"
      >
        <span className="text-lg font-medium pr-8">{question}</span>
        {isOpen ? <ChevronUp className="shrink-0" /> : <ChevronDown className="shrink-0" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-white/60 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TeamCard = ({ name, role, description }: { name: string; role: string; description: string }) => (
  <div className="p-8 rounded-2xl card-hover">
    <div className="mb-6">
      <h3 className="text-2xl font-bold uppercase tracking-tight">{name}</h3>
      <p className="text-white/40 text-sm uppercase tracking-widest mt-1">{role}</p>
    </div>
    <p className="text-white/60 leading-relaxed italic font-light">"{description}"</p>
  </div>
);

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [showOptions, setShowOptions] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getMailDetails = () => {
    const subject = `New Message from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    return {
      subject: encodeURIComponent(subject),
      body: encodeURIComponent(body)
    };
  };

  const openEmail = (type: 'default' | 'gmail' | 'outlook') => {
    const { subject, body } = getMailDetails();
    const recipient = 'business@echoframestudios.co.za';
    
    let url = '';
    switch (type) {
      case 'gmail':
        url = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}&body=${body}`;
        break;
      case 'outlook':
        url = `https://outlook.office.com/mail/deeplink/compose?to=${recipient}&subject=${subject}&body=${body}`;
        break;
      default:
        url = `mailto:${recipient}?subject=${subject}&body=${body}`;
    }
    
    window.open(url, '_blank');
    setShowOptions(false);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowOptions(true);
  };

  if (showOptions) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="h-full flex flex-col items-center justify-center text-center py-8 px-4 space-y-8"
      >
        <div className="space-y-2">
          <h3 className="text-2xl font-bold uppercase tracking-tight">Choose your Email Service</h3>
          <p className="text-white/40 text-sm">Select how you'd like to send your message</p>
        </div>
        
        <div className="grid w-full gap-4 max-w-xs">
          <button 
            onClick={() => openEmail('gmail')}
            className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white hover:text-black transition-all group"
          >
            <span className="font-bold uppercase tracking-widest text-xs">Gmail</span>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-black/10">
              <Mail size={16} />
            </div>
          </button>
          
          <button 
            onClick={() => openEmail('outlook')}
            className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white hover:text-black transition-all group"
          >
            <span className="font-bold uppercase tracking-widest text-xs">Outlook / Hotmail</span>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-black/10">
              <Mail size={16} />
            </div>
          </button>
          
          <button 
            onClick={() => openEmail('default')}
            className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white hover:text-black transition-all group"
          >
            <span className="font-bold uppercase tracking-widest text-xs">Default Mail App</span>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-black/10">
              <Mail size={16} />
            </div>
          </button>
        </div>

        <button 
          onClick={() => setShowOptions(false)}
          className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/20 hover:text-white transition-colors"
        >
          Go Back & Edit
        </button>
      </motion.div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleFormSubmit}>
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold text-white/40">Name</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="Your Name"
            className="w-full bg-black border border-white/10 rounded-sm p-3 focus:border-white/40 outline-none transition-colors placeholder:text-white/10" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest font-bold text-white/40">Email</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="your@email.com"
            className="w-full bg-black border border-white/10 rounded-sm p-3 focus:border-white/40 outline-none transition-colors placeholder:text-white/10" 
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-widest font-bold text-white/40">Message</label>
        <textarea 
          name="message"
          rows={4} 
          value={formData.message}
          onChange={handleInputChange}
          required
          placeholder="Tell us about your project..."
          className="w-full bg-black border border-white/10 rounded-sm p-3 focus:border-white/40 outline-none transition-colors resize-none placeholder:text-white/10"
        ></textarea>
      </div>
      <button 
        type="submit"
        className="w-full py-4 border border-white/20 hover:bg-white hover:text-black transition-all font-bold uppercase tracking-widest rounded-sm group flex items-center justify-center gap-2"
      >
        Send Message <Mail size={18} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </form>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-white selection:text-black">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="assets/Image_Background_1.png"
            alt="Studio Background"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl lg:text-9xl font-display font-bold uppercase tracking-tighter leading-none mb-6"
          >
            Echo Frame Studios
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/60 font-light tracking-widest uppercase mb-12"
          >
            Your Creativity Is Our Vision
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#about"
              className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-white/90 transition-colors rounded-sm"
            >
              About Us
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border border-white/20 hover:border-white/40 text-white font-bold uppercase tracking-widest transition-all rounded-sm"
            >
              Work with Us
            </a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
        <SectionHeader title="About Us" subtitle="Collaborate with expert producers" />
        <div className="max-w-3xl mx-auto space-y-6 text-lg text-white/70 leading-relaxed text-center">
          <p>
            Our story began with an idea, an idea to make music for others. Imagine the perfect soundtrack for your project.
            That's the passion David Matthews and Marcel Terblanche share at Echo Frame Studios.
          </p>
          <p>
            We started with one mission: to translate your creative vision into music that resonates deeply and feels authentically yours.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        <div className="section-divider"></div>
      </div>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 max-w-7xl mx-auto">
        <SectionHeader title="Services" />
        
        <div className="flex gap-4 mb-12">
          <button className="px-6 py-2 bg-white text-black text-sm font-bold uppercase tracking-widest rounded-full">
            All
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <ServiceCard
            title="Mixing and Mastering"
            description="We deliver polished, radio-ready mixes and masters that bring out the full potential of your music."
            price="R 2800"
          />
          <ServiceCard
            title="Music Production"
            description="From the first beat to the final arrangement, we craft professional music productions that bring your vision to life."
            price="R 3000"
          />
          <ServiceCard
            title="Vocal Production"
            description="We bring out the best in your voice, from tuning and timing to tone, your vocals will sound confident and captivating."
            price="R 3500"
          />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        <div className="section-divider"></div>
      </div>

      {/* F.A.Q Section */}
      <section id="faq" className="py-24 px-6 max-w-4xl mx-auto">
        <SectionHeader title="F.A.Q" />
        <div className="space-y-2">
          <FAQItem
            question="How long does the process take?"
            answer="Depending on the service, mixing typically takes up to a week and mastering takes 1-2 days."
          />
          <FAQItem
            question="How many revisions are included?"
            answer="Each project includes three rounds of revisions. We find this is more than enough for most clients, but additional revision rounds can be purchased if needed."
          />
          <FAQItem
            question="How do I send you my files?"
            answer="Once you book a project, you must send the files alongside the POP. We accept transfers via Google Drive, Dropbox, or WeTransfer as well."
          />
          <FAQItem
            question="Do you work with all genres?"
            answer="Yes. Our engineers have experience across a wide range of genres including pop, rock, electronic, EDM, classical, and more. Genre context matters to us, so we always ask about your references and creative goals before starting."
          />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        <div className="section-divider"></div>
      </div>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 max-w-7xl mx-auto">
        <SectionHeader title="Contact" />
        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white/40 uppercase tracking-widest text-xs font-bold">
                  <MapPin size={16} /> Location
                </div>
                <p className="text-lg">South Africa, Johannesburg</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white/40 uppercase tracking-widest text-xs font-bold">
                  <Mail size={16} /> Email
                </div>
                <p className="text-lg">business@echoframestudios.co.za</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white/40 uppercase tracking-widest text-xs font-bold">
                  <Clock size={16} /> Hours
                </div>
                <p className="text-lg">Mon-Fri – 08:00–19:00</p>
              </div>
            </div>
            <p className="text-white/40 text-sm italic">
              Please note, that price of service might change based on project scope.
            </p>
          </div>
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <ContactForm />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        <div className="section-divider"></div>
      </div>

      {/* Team Section */}
      <section id="team" className="py-24 px-6 max-w-7xl mx-auto">
        <SectionHeader title="Team" />
        <div className="grid md:grid-cols-2 gap-8">
          <TeamCard
            name="Marcel Terblanche"
            role="Co-Founder, Mixing Engineer, Vocal Engineer, Music Producer"
            description="As an Echo Frame Studios co-founder, Marcel's boundless passion for all music fuels his roles as songwriter, producer, and composer. A true multi-instrumentalist, he weaves unexpected textures and fresh ideas into every project, crafting sounds uniquely tailored to your vision."
          />
          <TeamCard
            name="David Matthews"
            role="Co-Founder, Mixing Engineer, Music Producer"
            description="As an Echo Frame Studios co-founder, David pours that passion into every role: producer, mixing engineer and mastering engineer, all focused on one thing: understanding and elevating your unique sound."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 flex items-center justify-center overflow-hidden rounded-sm">
              <img 
                src="assets/Logo_1.png" 
                alt="Echo Frame Studios Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xl font-bold tracking-tighter uppercase">Echo Frame Studios</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {['Home', 'About', 'Services', 'F.A.Q', 'Contact', 'Team'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm font-medium text-white/40 hover:text-white transition-colors uppercase tracking-widest"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="flex gap-6 mb-12">
            <a href="#" className="text-white/40 hover:text-white transition-colors"><Instagram size={20} /></a>
            <a href="#" className="text-white/40 hover:text-white transition-colors"><Facebook size={20} /></a>
            <a href="#" className="text-white/40 hover:text-white transition-colors"><Twitter size={20} /></a>
          </div>

          <p className="text-white/20 text-xs uppercase tracking-[0.2em]">
            Copyright © 2026 Echo Frame Studios. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
