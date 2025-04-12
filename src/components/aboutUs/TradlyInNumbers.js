import React from 'react';
import { Box, Typography, Grid, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import CountUp from 'react-countup';

// Style personnalisé pour le conteneur
const NumbersSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
}));

// Style pour le texte des nombres
const NumberText = styled(Typography)(({ theme }) => ({
  fontSize: '3rem', // Taille des grands nombres
  fontWeight: 'bold',
  color: theme.palette.text.primary,
}));

// Style pour la description sous les nombres
const DescriptionText = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(1),
}));

const TradlyInNumbers = () => {
  // Données des statistiques
  const stats = [
    { value: 20, suffix: '', description: 'Hours (avg.) of manual work saved each month' },
    { value: 100, suffix: '%', description: 'Hours (avg.) of manual work saved each month' },
    { value: 95, suffix: '%', description: 'Hours (avg.) of manual work saved each month' },
    { value: 20, suffix: '', description: 'Hours (avg.) of manual work saved each month' },
  ];

  return (
    <NumbersSection>
      {/* Titre */}
      <Typography variant="h3" fontWeight="bold" mb={4}>
        Tradly in,{' '}
        <span style={{ color: '#1976d2' }}>Numbers</span> {/* "Numbers" en bleu */}
      </Typography>

      {/* Grille des statistiques */}
      <Grid container spacing={2} justifyContent="center" wrap="nowrap">
        {stats.map((stat, index) => (
          <React.Fragment key={index}>
            <Grid item xs={3} sx={{ minWidth: '150px' }}>
              <NumberText>
                <CountUp
                  end={stat.value} // Valeur finale
                  duration={2.5} // Durée de l'animation
                  suffix={stat.suffix} // Ajouter un suffixe comme "%"
                  enableScrollSpy // Lancer l'animation quand l'élément est visible
                  scrollSpyDelay={200} // Délai avant le début de l'animation
                />
              </NumberText>
              <DescriptionText>{stat.description}</DescriptionText>
            </Grid>
            {/* Ajouter un Divider vertical entre les statistiques, sauf pour le dernier élément */}
            {index < stats.length - 1 && (
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  height: '60px', // Hauteur de la barre
                  width: '4px', // Épaisseur de la barre
                  backgroundColor: theme => theme.palette.divider, // Couleur gris clair
                  alignSelf: 'center',
                  margin: '0 16px', // Espacement autour de la barre
                }}
              />
            )}
          </React.Fragment>
        ))}
      </Grid>
    </NumbersSection>
  );
};

export default TradlyInNumbers;