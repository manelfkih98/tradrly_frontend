import React from 'react';
import Navbar from '../components/Navbar';
import WhoAreWe from '../components/aboutUs/WhoAreWe';
import OurValues from '../components/aboutUs/OurValues';
import HowWeHelp from '../components/aboutUs/HowWeHelp';
import Purpose from '../components/aboutUs/Purpose';
import TradlyInNumbers from '../components/aboutUs/TradlyInNumbers';
import WhatMakesUsDifferent from '../components/aboutUs/WhatMakesUsDifferent';
import Careers from '../components/aboutUs/Careers';
import Footer from '../components/Footer';
import ContactSection from '../components/ContactSection';
import { Box } from '@mui/material';

const UboutUs = () => {
  return (
    <Box sx={{ width: '100%', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />
      <WhoAreWe />
      <OurValues />
      <HowWeHelp />
      <Purpose />
      <TradlyInNumbers />
      <WhatMakesUsDifferent />
      <ContactSection />
      <Careers />
      <Footer />
    </Box>
  );
};

export default UboutUs;
