import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PostCandida from '../components/candidat/PostCandida'
import { Box } from '@mui/material';
const candidat =() => {
    return (
        <Box sx={{minHeight: "100vh" }}>
      
        <Navbar />
      <PostCandida />
        <Footer />
        </Box>
       
  
    );
    }
export default candidat;