import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CareersPage from '../components/careers/CareersPage';
import { Box } from '@mui/material';
const Careers =() => {
    return (
        <Box sx={{minHeight: "100vh" }}>
      
        <Navbar />
      <CareersPage />
        <Footer />
        </Box>
       
  
    );
    }
export default Careers;