// src/components/LandingPage.js
import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { styled } from '@mui/system';
import backgroundGif from "../../image/original-ef7a3f092751b85aca25ccd3c9dc2175 1 (3).png";

// Styled component for the background
const BackgroundBox = styled(Box)({
    backgroundImage:`url(${backgroundGif})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '20px',
  color: '#fff',
  position: 'relative',
});

// Styled button with a transparent background and white border
const CustomButton = styled(Button)({
  border: '1px solid #fff',
  borderRadius: '20px',
  color: '#fff',
  padding: '10px 20px',
  textTransform: 'none',
  marginBottom: '10px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});

const LandingPage = () => {
  return (
    <BackgroundBox>
      {/* Header with Logo */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Trady
        </Typography>
      </Box>

      {/* Main Content */}
      <Container sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.5rem', md: '4rem' },
            fontWeight: 'bold',
            lineHeight: 1.2,
            mb: 2,
          }}
        >
          BEYOND CODE, <br /> INTO THE FUTURE
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: '1rem', md: '1.25rem' },
            maxWidth: '400px',
            mb: 4,
          }}
        >
          Blending innovation with intuitive design to create web and mobile solutions that learn, adapt, and grow with you
        </Typography>
      </Container>

      {/* Buttons Section */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', mb: 4 }}>
        <CustomButton variant="outlined" endIcon={<span>→</span>}>
          Who are we?
        </CustomButton>
        <CustomButton variant="outlined" endIcon={<span>→</span>}>
          Our cool work
        </CustomButton>
      </Box>
    </BackgroundBox>
  );
};

export default LandingPage;