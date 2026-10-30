import React from 'react';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ServicesSection from './ServicesSection';
import PortalAndTrackSection from './PortalAndTrackSection';
import ContactSection from './ContactSection';

export default function Home({ scrollToSection, openAIChat }) {
  return (
    <div className="space-y-16">
      <HeroSection scrollToSection={scrollToSection} />
      <AboutSection />
      <ServicesSection scrollToSection={scrollToSection} />
      <PortalAndTrackSection openAIChat={openAIChat} />
      <ContactSection />
    </div>
  );
}