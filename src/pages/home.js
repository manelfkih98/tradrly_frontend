import React, { useRef } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/home/HeroSection';
import TrustedSection from '../components/home/TrustedSection';
import WhoAreWe from '../components/home/WhoAreWe';
import Footer from '../components/Footer';
import ContactSection from '../components/ContactSection';
import TeamSection from '../components/home/TeamSection';
import CareerOpportunities from '../components/home/CareerOpportunities';
import TestimonialsSection from '../components/home/TestimonialsSection';
import WorkShowcase from '../components/home/WorkShowcase';

const Home = () => {
  const workShowcaseRef = useRef(null);

  const scrollToWorkShowcase = () => {
    workShowcaseRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
    style={{  padding: 0, margin: 0, width: '100%' }}
    >
      <Navbar />
      <HeroSection />
      <TrustedSection />
      <WhoAreWe />
      <TeamSection />
      <box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
      <CareerOpportunities />
      </box>
      <TestimonialsSection />
      <WorkShowcase ref={workShowcaseRef} />
     <ContactSection/>
      <Footer />
    </div>
  );
};

export default Home;