import React from 'react';
import { Box, Typography, Grid, CardMedia, Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import FlameIcon from '@mui/icons-material/Whatshot';

// Import de l'image locale
import teamImage from '../../image/Frame 1618871176.png';

// Style personnalisé pour le conteneur
const PurposeSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  minHeight: '400px',
}));

// Style pour le texte dans les cartes
const PurposeText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

// Style pour la carte
const PurposeCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  border: `1px solid ${theme.palette.divider}`, 
  borderRadius: theme.spacing(1),
  boxShadow: 'none', 
}));

const Purpose = () => {
  return (
    <PurposeSection>
      <Grid container spacing={4} alignItems="center">
       
        <Grid item xs={12} md={6}>
          <Box display="flex" alignItems="center" mb={2}>
            <FlameIcon sx={{ fontSize: 40, color: '#ff5722', mr: 1 }} />
            <Typography variant="h3" fontWeight="bold">
              Our Purpose
            </Typography>
          </Box>

         
          {[...Array(4)].map((_, index) => (
            <PurposeCard key={index}>
              <CardContent>
                <PurposeText variant="body1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum felis, sed ullamcorper tempus faucibus in imperdiet. SEM
                </PurposeText>
              </CardContent>
            </PurposeCard>
          ))}
        </Grid>

        <Grid item xs={12} md={6}>
        
        <CardMedia
        mx={{
            borderRadius: '16px',
           
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          }}
          component="img"
          height="400"
          image={teamImage} 
          alt="Team working on a transparent board"
        />
     
    </Grid>
      </Grid>
    </PurposeSection>
  );
};

export default Purpose;