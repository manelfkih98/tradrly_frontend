import React from 'react';
import { Box, Typography, Grid, useTheme, useMediaQuery } from '@mui/material';

// Importer les images (ajustez les chemins selon votre structure de projet)
import hashtagPerson from '../../image/image 11.png';
import rocketPerson from '../../image/image 12.png';
import atPerson from '../../image/image 13.png';

const OurValues = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Breakpoint pour les écrans mobiles

  // Données pour chaque colonne
  const values = [
    {
      title: 'Excellence',
      description:
        "Nous nous engageons à maintenir des standards élevés dans toutes nos activités. Notre objectif est de garantir une qualité irréprochable, en mettant l'accent sur la rigueur et la précision. Chaque détail compte pour offrir des résultats optimaux et dépasser les attentes de nos clients.",
      image: hashtagPerson,
    },
    {
      title: 'Innovation',
      description:
        "L'innovation est au cœur de notre stratégie. Nous favorisons la créativité et l'adoption de nouvelles technologies pour anticiper les besoins futurs. Cette démarche proactive nous permet de proposer des solutions novatrices et adaptées à un environnement en constante évolution.",
      image: rocketPerson,
    },
    {
      title: 'Engagement',
      description:
        "Nous plaçons l'engagement au centre de notre culture d’entreprise. La collaboration, l’écoute active et la responsabilité sociale sont les piliers qui renforcent la confiance avec nos partenaires et collaborateurs. Notre approche vise à construire des relations durables et mutuellement bénéfiques.",
      image: atPerson,
    },
  ];
  

  return (
    <Box 
    sx={{
      padding: isMobile ? '10px' : '20px', // Réduit le padding
      backgroundColor: '#F6F8FC',
      textAlign: 'center',
      position: 'relative',
      borderRadius: '60px', // Réduit le border-radius
    }}
  >
      {/* Titre principal */}
      <Typography
        variant={isMobile ? 'h4' : 'h2'}
        sx={{
          fontWeight: 'bold',
          marginBottom: isMobile ? '20px' : '40px',
          color: '#000',
        }}
      >
Nos valeurs
</Typography>

      {/* Grille pour les colonnes */}
      <Grid container spacing={isMobile ? 2 : 4} justifyContent="center">
        {values.map((value, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              {/* Sous-titre */}
              <Typography
                variant={isMobile ? 'h6' : 'h5'}
                sx={{
                  fontWeight: 'bold',
                  marginBottom: '10px',
                  color: '#000',
                }}
              >
                {value.title}
              </Typography>

              {/* Description */}
              <Typography
                variant={isMobile ? 'body2' : 'body1'}
                sx={{
                  color: '#666',
                  marginBottom: '20px',
                  maxWidth: '300px',
                }}
              >
                {value.description.split('. ').map((sentence, i) => (
                  <span key={i}>
                    {sentence}
                    {i < value.description.split('. ').length - 1 && (
                      <>
                        .{' '}
                        {i === 2 && (
                          <Box
                            component="span"
                            sx={{
                              display: 'inline',
                              textDecoration: 'underline',
                              textDecorationColor: '#1E88E5',
                            }}
                          >
                            Semper justo
                          </Box>
                        )}
                      </>
                    )}
                  </span>
                ))}
              </Typography>

              {/* Image */}
              <Box
                component="img"
                src={value.image}
                alt={value.title}
                sx={{
                  width: '50%',
                  maxWidth: isMobile ? '250px' : '300px',
                  height: '70%',
                  borderRadius: '79px',
                  backgroundColor: '#D9D9D9', // Fond gris clair
                  padding: '10px',
                }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OurValues;