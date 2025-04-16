import React from 'react';
import Navbar from '../components/Navbar';
import BlogSection from'../components/blog/BlogSection';
import FinanceCards from '../components/blog/FinanceCards'
import Footer from '../components/Footer';
import ContactSection from '../components/ContactSection';
import { Box } from '@mui/material';
const Blog = () => {
  return (
    <Box>
        <Navbar/>
        <BlogSection/>
       <FinanceCards/>
       <ContactSection/>
        <Footer />
    
    </Box>
  );
};

export default Blog;