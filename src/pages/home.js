// Home.jsx
import React, { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "../components/home/HeroSection";
import TrustedSection from "../components/home/TrustedSection";
import WhoAreWe from "../components/home/WhoAreWe";
import Footer from "../components/Footer";
import ContactSection from "../components/ContactSection";
import TeamSection from "../components/home/TeamSection";
import CareerOpportunities from "../components/home/CareerOpportunities";
import TestimonialsSection from "../components/home/TestimonialsSection";
import WorkShowcase from "../components/home/WorkShowcase";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";

const Home = () => {
  const teamSectionRef = useRef(null);
  const workShowcaseRef = useRef(null);
  const location = useLocation();

  const scrollToTeamSection = () => {
    teamSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToWorkShowcase = () => {
    workShowcaseRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (location.hash === "#work") {
      scrollToWorkShowcase();
    } else if (location.hash === "#team") {
      scrollToTeamSection();
    }
  }, [location]);

  return (
    <div style={{ padding: 0, margin: 0, width: "100%" }}>
      <Navbar />
      <HeroSection />
      <TrustedSection />
      <WhoAreWe />
      <div id="work" ref={workShowcaseRef}>
        <WorkShowcase />
      </div>
    
      <div id="team" ref={teamSectionRef}>
        <TeamSection />
      </div>
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CareerOpportunities />
      </Box>
      <TestimonialsSection />
      
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;
