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
        background: 'linear-gradient(180deg, rgba(235, 225, 255, 0.9), rgba(255, 255, 255, 0.9))',
        boxShadow: 'inset 0 0 50px rgba(101, 131, 176, 0.2)',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      {/* Titre principal */}
      <Typography
        variant="h2"
        sx={{
          fontWeight: 'bold',
          marginBottom: '1rem',
          color: '#333',
        }}
      >
        Notre Blog
      </Typography>

      {/* Texte descriptif */}
      <Typography
        variant="body1"
        sx={{
          maxWidth: '600px',
          marginBottom: '2rem',
          color: '#555',
        }}
      >
        Découvrez nos articles, nos conseils et notre actualité. Nous partageons ici nos idées, nos
        projets, et tout ce qui nous passionne dans le monde du digital et de l'innovation.
      </Typography>

      {/* Boutons */}
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        {/* Bouton "Qui sommes-nous ?" */}
        <Button
          variant="contained"
          href="/about"
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
          Qui sommes-nous ?
        </Button>

        {/* Bouton "Nos réalisations" */}
        <Button
          variant="outlined"
          href="/home#work"
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
          Nos réalisations
        </Button>
      </Box>
    </Box>
  );
};

export default BlogSection;
