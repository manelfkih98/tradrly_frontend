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
      title: 'This is a value',
      description:
        'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum felis, sed ullamcorper tempus faucibus in imperdiet. Semper justo mauris sed fusce erat aenean tristique. In imperdiet. Semper justo mauris sed fusce erat aenean tristique.',
      image: hashtagPerson,
    },
    {
      title: 'This is a value',
      description:
        'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum felis, sed ullamcorper tempus faucibus in imperdiet. Semper j.',
      image: rocketPerson,
    },
    {
      title: 'This is a value',
      description:
        'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum felis, sed ullamcorper tempus faucibus in imperdiet. Semper justo mauris sed fusce erat aenean tristique. In imperdiet. Semper justo mauris sed fusce erat aenean tristique.',
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
        Our Values
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