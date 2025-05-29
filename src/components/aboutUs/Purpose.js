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
  const paragraphs = [
    
    "Nous favorisons une culture d’amélioration continue et de collaboration, permettant à nos clients de s’adapter rapidement aux exigences changeantes du secteur tout en maintenant des standards élevés de qualité et d’intégrité.",
    
    "Notre équipe dédiée travaille avec rigueur pour concevoir et mettre en œuvre des stratégies dépassant les attentes, offrant des résultats mesurables et une valeur durable pour toutes les parties prenantes.",
    
    "En tirant parti des analyses basées sur les données et en développant des partenariats solides, nous visons à créer des solutions impactantes qui répondent aux défis complexes et ouvrent de nouvelles perspectives d’innovation et d’expansion."
  ];

  return (
    <PurposeSection>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Box display="flex" alignItems="center" mb={2}>
            <FlameIcon sx={{ fontSize: 40, color: '#ff5722', mr: 1 }} />
            <Typography variant="h3" fontWeight="bold">
              Notre objectif
            </Typography>
          </Box>

          {paragraphs.map((text, index) => (
            <PurposeCard key={index}>
              <CardContent>
                <PurposeText variant="body1">
                  {text}
                </PurposeText>
              </CardContent>
            </PurposeCard>
          ))}
        </Grid>

        <Grid item xs={12} md={6}>
          <CardMedia
            sx={{
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            }}
            component="img"
            height="400"
            image={teamImage} 
            alt="Équipe travaillant sur un tableau transparent"
          />
        </Grid>
      </Grid>
    </PurposeSection>
  );
};

export default Purpose;
