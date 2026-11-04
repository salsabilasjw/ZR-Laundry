import React from 'react';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ServicesSection from './ServicesSection';
import PortalAndTrackSection from './PortalAndTrackSection';
import ContactSection from './ContactSection';

export default function Home({ scrollToSection, openAIChat, isMemberActive, memberExpiryDate, setIsMemberActive, setMemberExpiryDate }) {
  return (
    <div className="space-y-16">
      <HeroSection scrollToSection={scrollToSection} />
      <AboutSection />
      <ServicesSection 
        scrollToSection={scrollToSection} 
        isMemberActive={isMemberActive}
      />
      <PortalAndTrackSection 
        openAIChat={openAIChat} 
        isMemberActive={isMemberActive}
        memberExpiryDate={memberExpiryDate}
        setIsMemberActive={setIsMemberActive}
        setMemberExpiryDate={setMemberExpiryDate}
      />
      <ContactSection />
    </div>
  );
}