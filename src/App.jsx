import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CashierPOS from './components/CashierPOS';
import Chatbox from './components/ChatBox';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('beranda');

  const scrollToSection = (id) => {
    setCurrentView('home');
    setActiveSection(id);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col relative">
      <Navbar 
        scrollToSection={scrollToSection} 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        activeSection={activeSection} 
      />

      <main className="flex-1 w-full">
        {currentView === 'home' ? (
          <Home
            scrollToSection={scrollToSection}
            openAIChat={() => setIsChatOpen(true)}
          />
        ) : (
          <CashierPOS />
        )}
      </main>

      <Chatbox isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </div>
  );
}