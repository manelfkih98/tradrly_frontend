import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const BlogSection = () => {
  return (
<Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50vh',
    background: 'linear-gradient(180deg, rgba(235, 225, 255, 0.9), rgba(255, 255, 255, 0.9))', // Corrected: Linear gradient as a string
    boxShadow: 'inset 0 0 50px rgba(101, 131, 176, 0.2)', // Subtle reflective blue glow
    textAlign: 'center',
    padding: '2rem',
  }}
>
    
      {/* Heading */}
      <Typography
        variant="h2"
        sx={{
          fontWeight: 'bold',
          marginBottom: '1rem',
          color: '#333',
        }}
      >
        Our Blog
      </Typography>

      {/* Placeholder Text */}
      <Typography
        variant="body1"
        sx={{
          maxWidth: '600px',
          marginBottom: '2rem',
          color: '#555',
        }}
      >
        Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Elementum felis, sed ullamcorper tempus faucibus in imperdiet. Semper justo mauris sed
        fusce erat aenean tristique.
      </Typography>

      {/* Buttons */}
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        {/* "Who are we?" Button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#1976d2',
            color: '#fff',
            borderRadius: '50px',
            padding: '0.5rem 2rem',
            textTransform: 'none',
            fontSize: '1rem',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          }}
        >
          Who are we?
        </Button>

        {/* "Our cool work" Button */}
        <Button
          variant="outlined"
          sx={{
            borderColor: '#555',
            color: '#555',
            borderRadius: '50px',
            padding: '0.5rem 2rem',
            textTransform: 'none',
            fontSize: '1rem',
            '&:hover': {
              borderColor: '#333',
              color: '#333',
            },
          }}
        >
          Our cool work
        </Button>
      </Box>
    </Box>
  );
};

export default BlogSection;