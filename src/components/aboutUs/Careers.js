import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import personImage from '../../image/person.png'; 

// Style personnalisé pour le conteneur
const CareersSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2), // Réduit de 4 à 2 pour moins de padding
  py: 5,
  backgroundColor: '#F3EBFF', // Fond violet clair
  borderRadius: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  minHeight: '200px', // Réduit de 300px à 200px
}));

// Style pour le bouton rempli
const FilledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#333', // Couleur sombre pour le bouton rempli
  color: '#fff',
  padding: theme.spacing(1, 2), // Réduit légèrement le padding des boutons
  marginRight: theme.spacing(1), // Réduit l'espacement entre les boutons
  '&:hover': {
    backgroundColor: '#555',
  },
}));

// Style pour le bouton en contour
const OutlinedButton = styled(Button)(({ theme }) => ({
  borderColor: '#333',
  color: '#333',
  padding: theme.spacing(1, 2), // Réduit légèrement le padding des boutons
  '&:hover': {
    borderColor: '#555',
    color: '#555',
  },
}));

const Careers = () => {
  return (
    <CareersSection>
      <Grid container spacing={2} alignItems="center"> {/* Réduit l'espacement de 4 à 2 */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" mb={2}> {/* Réduit la marge de 3 à 2 */}
            Discover careers in <strong>Tradly Now!</strong>
          </Typography>
          <Box>
            <FilledButton
              variant="contained"
              endIcon={<ArrowForwardIcon />}
            >
              Wanna know more
            </FilledButton>
            <OutlinedButton variant="outlined">
              Our cool work
            </OutlinedButton>
          </Box>
        </Grid>

        {/* Partie droite - Image */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <img
              src={personImage}
              alt="Person"
              style={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '8px',
                maxHeight: '200px', // Limite la hauteur de l'image
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </CareersSection>
  );
};

export default Careers;