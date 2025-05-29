import React from 'react';
import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';

const WhoAreWe = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: isMobile ? '20px' : '40px',
        backgroundColor: '#fff',
        overflow: 'hidden',
      }}
    >
      {/* Formes décoratives existantes */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: isMobile ? '40px' : '60px',
          height: isMobile ? '40px' : '60px',
          backgroundColor: '#00FF00',
          borderRadius: '50%',
          boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)', 
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: isMobile ? '40px' : '60px',
          height: isMobile ? '40px' : '60px',
          backgroundColor: '#00FF00',
          borderRadius: '50%',
          boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)', 
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          left: '10%',
          width: isMobile ? '30px' : '40px',
          height: isMobile ? '30px' : '40px',
          backgroundColor: '#0000FF',
          transform: 'rotate(45deg)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          right: '10%',
          width: isMobile ? '30px' : '40px',
          height: isMobile ? '30px' : '40px',
          backgroundColor: '#0000FF',
          transform: 'rotate(45deg)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '40%',
          left: '15%',
          width: isMobile ? '50px' : '70px',
          height: isMobile ? '50px' : '70px',
          backgroundColor: '#800080',
          borderRadius: '20%',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '40%',
          right: '15%',
          width: isMobile ? '50px' : '70px',
          height: isMobile ? '50px' : '70px',
          backgroundColor: '#800080',
          borderRadius: '20%',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: isMobile ? '20px' : '30px',
          height: isMobile ? '20px' : '30px',
          backgroundColor: '#E0E0E0',
          borderRadius: '50%',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: isMobile ? '20px' : '30px',
          height: isMobile ? '20px' : '30px',
          backgroundColor: '#E0E0E0',
          borderRadius: '50%',
        }}
      />

      {/* Formes ajoutées précédemment */}
      {/* Triangles orange */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '20%',
          width: isMobile ? '35px' : '50px',
          height: isMobile ? '35px' : '50px',
          backgroundColor: '#FF4500', // Orange
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', // Forme de triangle
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '20%',
          width: isMobile ? '35px' : '50px',
          height: isMobile ? '35px' : '50px',
          backgroundColor: '#FF4500', // Orange
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', // Forme de triangle
        }}
      />

      {/* Hexagones rouges */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          left: '15%',
          width: isMobile ? '40px' : '60px',
          height: isMobile ? '40px' : '60px',
          backgroundColor: '#FF0000', // Rouge
          clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)', // Forme d'hexagone
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          width: isMobile ? '40px' : '60px',
          height: isMobile ? '40px' : '60px',
          backgroundColor: '#FF0000', // Rouge
          clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)', // Forme d'hexagone
        }}
      />

      {/* Étoiles cyan */}
      <Box
        sx={{
          boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)', 
          position: 'absolute',
          top: '50%',
          left: '5%',
          width: isMobile ? '25px' : '35px',
          height: isMobile ? '25px' : '35px',
          backgroundColor: '#00CED1', // Cyan
          clipPath:
            'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', // Forme d'étoile
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          right: '5%',
          width: isMobile ? '25px' : '35px',
          height: isMobile ? '25px' : '35px',
          backgroundColor: '#00CED1', // Cyan
          clipPath:
            'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', // Forme d'étoile
        }}
      />

      {/* Nouvelles formes décoratives */}
      {/* Carrés jaunes avec bordure en pointillés */}
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          left: '30%',
          width: isMobile ? '30px' : '45px',
          height: isMobile ? '30px' : '45px',
          backgroundColor: '#FFFF00', // Jaune
        // Bordure en pointillés
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          right: '30%',
          width: isMobile ? '30px' : '45px',
          height: isMobile ? '30px' : '45px',
          backgroundColor: '#FFFF00', // Jaune
          // Bordure en pointillés
        }}
      />

      {/* Cercles roses avec dégradé */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '30%',
          left: '25%',
          width: isMobile ? '35px' : '50px',
          height: isMobile ? '35px' : '50px',
          background: 'linear-gradient(45deg, #FF69B4, #FFB6C1)', // Dégradé rose
          borderRadius: '50%',
          boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)', 
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '30%',
          right: '25%',
          width: isMobile ? '35px' : '50px',
          height: isMobile ? '35px' : '50px',
          background: 'linear-gradient(45deg, #FF69B4, #FFB6C1)', // Dégradé rose
          borderRadius: '50%',
          boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)', 
        }}
      />

      {/* Losanges verts avec ombre portée */}
      <Box
        sx={{
          position: 'absolute',
          top: '60%',
          left: '10%',
          width: isMobile ? '40px' : '55px',
          height: isMobile ? '40px' : '55px',
          backgroundColor: '#32CD32', // Vert
          transform: 'rotate(45deg)',
          boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)', // Ombre portée
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '60%',
          right: '10%',
          width: isMobile ? '40px' : '55px',
          height: isMobile ? '40px' : '55px',
          backgroundColor: '#32CD32', // Vert
          transform: 'rotate(45deg)',
          boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)', // Ombre portée
        }}
      />

      {/* Contenu principal */}
      <Typography
        variant={isMobile ? 'h4' : 'h2'}
        sx={{
          fontWeight: 'bold',
          marginBottom: '20px',
          color: '#000',
        }}
      >
          Qui sommes-nous ?
      </Typography>
      <Typography
        variant={isMobile ? 'body2' : 'body1'}
        sx={{
          maxWidth: '600px',
          marginBottom: '30px',
          color: '#666',
        }}
      >
Fondée sur des valeurs d’innovation, d’excellence et de responsabilité, notre entreprise s’engage à fournir des solutions de qualité supérieure répondant aux besoins spécifiques de nos clients.  
        Notre équipe expérimentée et dynamique travaille avec rigueur pour garantir performance, fiabilité et satisfaction.  
        Ensemble, nous construisons un avenir durable et créons des partenariats solides basés sur la confiance et le respect mutuel.      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: '20px',
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#1E88E5',
            padding: isMobile ? '10px 20px' : '12px 30px',
            borderRadius: '50px',
            textTransform: 'none',
            fontSize: isMobile ? '14px' : '16px',
          }}
        >
  En savoir plus        </Button>
        <Button
          variant="outlined"
          href="home#work"
          sx={{
            borderColor: '#000',
            color: '#000',
            padding: isMobile ? '10px 20px' : '12px 30px',
            borderRadius: '50px',
            textTransform: 'none',
            fontSize: isMobile ? '14px' : '16px',
          }}
        >
                    Nos réalisations

        </Button>
      </Box>
    </Box>
  );
};

export default WhoAreWe;