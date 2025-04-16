import React from 'react';
import { AppBar, Toolbar, Box, Typography, IconButton, Link, alpha, InputBase, InputAdornment } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram, ArrowForward } from '@mui/icons-material';

const Footer = () => {
  return (
    <AppBar
   
    sx={{
      position: "relative",
      display: "flex",
      color: "#ffffff",
      boxSizing: "border-box",
     backgroundColor: "#0a0a0a",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      overflow: " hidden",
    
    }}
  >
      <Toolbar
        sx={{
          flexDirection: 'column',
          alignItems: 'stretch',
          gap: '2rem',
          px: { xs: 2, md: 10 },
          py: 2,
        }}
      >
        {/* Première ligne : Newsletter (sans les icônes) et liens de navigation */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem',
            width: '100%',
          }}
        >
          {/* Section Newsletter (sans les icônes) */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '250px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              NEWSLETTER
            </Typography>
            <Box
              sx={{
                position: 'relative',
                borderRadius: '999px',
                backgroundColor: alpha('#ffffff', 0.1),
                '&:hover': {
                  backgroundColor: alpha('#ffffff', 0.2),
                },
                width: 250,
                display: 'flex',
                alignItems: 'center',
                px: 2,
                py: 0.5,
              }}
            >
           
              <IconButton sx={{ color: 'white', p: 0, mr: 1 }}>
                {/* Vous pouvez remplacer par une icône d'email si vous en avez une */}
              </IconButton>
              <InputBase
                placeholder="Enter your email"
                inputProps={{ 'aria-label': 'email' }}
                sx={{ color: 'white', width: '100%' }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      sx={{
                        color: '#000',
                        backgroundColor: '#fff',
                        borderRadius: '50%',
                        width: '25px',
                        height: '25px',
                        '&:hover': {
                          backgroundColor: '#e0e0e0',
                        },
                      }}
                    >
                      <ArrowForward />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Box>
            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
              Nisi rhoncus mattis rhoncus urna neque viverra. UNSUBSCRIBE
            </Typography>
          </Box>

          {/* Liens de navigation */}
          <Box sx={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <Link href="#" color="inherit" underline="hover">
              Who are we
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Our work
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Our team
            </Link>
            <Link href="#" color="inherit" underline="hover">
               Careers
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Blog
            </Link>
          </Box>
        </Box>

        {/* Deuxième ligne : Icônes des réseaux sociaux et Copyright */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {/* Icônes des réseaux sociaux */}
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <IconButton
              sx={{
                color: '#fff',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid #fff',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                },
              }}
            >
              <Facebook />
            </IconButton>
            <IconButton
              sx={{
                color: '#fff',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid #fff',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                },
              }}
            >
              <Twitter />
            </IconButton>
            <IconButton
              sx={{
                color: '#fff',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid #fff',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                },
              }}
            >
              <LinkedIn />
            </IconButton>
            <IconButton
              sx={{
                color: '#fff',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid #fff',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                },
              }}
            >
              <Instagram />
            </IconButton>
          </Box>

          {/* Copyright */}
          <Typography variant="body2">
            © COPYRIGHT - ALL RIGHT RESERVED.
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;