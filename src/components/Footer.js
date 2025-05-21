import React from 'react';
import {
  AppBar, Toolbar, Box, Typography, IconButton, Link, alpha, InputBase, InputAdornment
} from '@mui/material';
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
        overflow: "hidden",
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
        {/* Première ligne : Newsletter et liens de navigation */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem',
            width: '100%',
          }}
        >
          {/* Section Newsletter */}
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
              <InputBase
                placeholder="Entrez votre email"
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
              Inscrivez-vous à notre newsletter pour ne rien manquer. <strong>Désinscription</strong> possible à tout moment.
            </Typography>
          </Box>

          {/* Liens de navigation */}
          <Box sx={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <Link href="#" color="inherit" underline="hover">
              Qui sommes-nous
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Nos réalisations
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Notre équipe
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Carrières
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Blog
            </Link>
          </Box>
        </Box>

        {/* Deuxième ligne : Réseaux sociaux et droits d’auteur */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {/* Réseaux sociaux */}
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            {[Facebook, Twitter, LinkedIn, Instagram].map((Icon, index) => (
              <IconButton
                key={index}
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
                <Icon />
              </IconButton>
            ))}
          </Box>

          {/* Droits d’auteur */}
          <Typography variant="body2">
            © COPYRIGHT - TOUS DROITS RÉSERVÉS.
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
