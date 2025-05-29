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
  fontSize: '3rem',
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
    { value: 20, suffix: '', description: 'Heures moyennes de travail manuel économisées chaque mois' },
    { value: 100, suffix: '%', description: "Taux de satisfaction client garanti" },
    { value: 95, suffix: '%', description: "Taux d'efficacité opérationnelle atteint" },
    { value: 20, suffix: '', description: "Nouveaux projets lancés chaque trimestre" },
  ];

  return (
    <NumbersSection>
      {/* Titre */}
      <Typography variant="h3" fontWeight="bold" mb={4}>
        Tradly en{' '}
        <span style={{ color: '#1976d2' }}>chiffres</span>
      </Typography>

      {/* Wrapper pour forcer le non-wrap horizontal */}
      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'nowrap' }}>
        <Grid container spacing={2} justifyContent="center" wrap="nowrap" sx={{ maxWidth: 900 }}>
          {stats.map((stat, index) => (
            <React.Fragment key={index}>
              <Grid item xs={3} sx={{ minWidth: 150 }}>
                <NumberText>
                  <CountUp
                    end={stat.value}
                    duration={2.5}
                    suffix={stat.suffix}
                    enableScrollSpy
                    scrollSpyDelay={200}
                  />
                </NumberText>
                <DescriptionText>{stat.description}</DescriptionText>
              </Grid>
              {/* Divider vertical entre les stats sauf après la dernière */}
              {index < stats.length - 1 && (
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    height: 60,
                    width: 4,
                    backgroundColor: (theme) => theme.palette.divider,
                    alignSelf: 'center',
                    margin: '0 16px',
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </Grid>
      </Box>
    </NumbersSection>
  );
};

export default TradlyInNumbers;
