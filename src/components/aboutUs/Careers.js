import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import personImage from '../../image/person.png';

// Conteneur principal stylisé
const CareersSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: '#F3EBFF',
  borderRadius: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  minHeight: '220px',
}));

// Bouton rempli (violet)
const FilledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#7B3FE4',
  color: '#fff',
  padding: theme.spacing(1.5, 3),
  marginRight: theme.spacing(2),
  textTransform: 'none',
  borderRadius: 12,
  fontWeight: 500,
  '&:hover': {
    backgroundColor: '#6931d4',
  },
}));

// Bouton outline
const OutlinedButton = styled(Button)(({ theme }) => ({
  borderColor: '#7B3FE4',
  color: '#7B3FE4',
  padding: theme.spacing(1.5, 3),
  textTransform: 'none',
  borderRadius: 12,
  fontWeight: 500,
  '&:hover': {
    borderColor: '#6931d4',
    color: '#6931d4',
  },
}));

const Careers = () => {
  return (
    <CareersSection>
      <Grid container spacing={2} alignItems="center">
        {/* Texte à gauche */}
        <Grid item xs={12} md={6}>
          <Typography variant="h3" fontWeight="bold" mb={2} color="#1C1C1E">
            Découvrez les opportunités chez <span style={{ color: '#7B3FE4' }}>Tradly !</span>
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Rejoignez une équipe passionnée qui construit l’avenir du digital.
          </Typography>
          <Box>
            <FilledButton variant="contained" endIcon={<ArrowForwardIcon />} href='/careers'>
              En savoir plus
            </FilledButton>
            <OutlinedButton variant="outlined" href='/home#work'>
              Nos projets
            </OutlinedButton>
          </Box>
        </Grid>

        {/* Image à droite */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <img
              src={personImage}
              alt="Illustration d'une personne"
              style={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '12px',
                maxHeight: '200px',
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </CareersSection>
  );
};

export default Careers;
