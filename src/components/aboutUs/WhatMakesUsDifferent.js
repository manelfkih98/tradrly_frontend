import React from 'react';
import { Box, Typography, Grid, CardMedia, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import CircleIcon from '@mui/icons-material/Circle'; // Icône pour les puces
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Import de l'image locale (à ajuster selon votre structure de projet)
import illustrationImage from '../../image/div.home-feature-1-image-container.png'; // Remplacez par le chemin de votre image
import teamImage1 from '../../image/div.home-feature-1-image-container (1).png'; // Image pour la première section
import teamImage2 from '../../image/div.home-feature-1-image-container (3).png'; // Image pour la deuxième section


const DifferentSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
}));

const SubtitleText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(4),
}));

// Style pour le texte des listes
const ListText = styled(ListItemText)(({ theme }) => ({
  '& .MuiListItemText-primary': {
    fontWeight: 'bold',
  },
  '& .MuiListItemText-secondary': {
    color: theme.palette.text.secondary,
  },
}));

const WhatMakesUsDifferent = () => {
  // Données des sections
  const sections = [
    {
      title: 'Ce qui nous distingue',
      description:
        "Nous offrons des solutions innovantes qui optimisent votre temps et améliorent vos résultats, tout en réduisant la maintenance.",
      points: [
        { primary: 'Gain de temps', secondary: 'Nos outils vous permettent de réduire considérablement vos tâches manuelles.' },
        { primary: 'Maintenance réduite', secondary: "Nos systèmes sont conçus pour nécessiter un minimum d'entretien." },
        { primary: 'Intégration invisible', secondary: "Nos solutions s'intègrent parfaitement sans perturber votre environnement." },
      ],
      image: illustrationImage,
      imageFirst: true,
    },
    {
      title: 'Notre approche unique',
      description:
        "Nous mettons l'accent sur la simplicité d'utilisation et la fiabilité, pour garantir une expérience utilisateur optimale.",
      points: [
        { primary: 'Facilité d’utilisation', secondary: 'Une interface intuitive accessible à tous.' },
        { primary: 'Fiabilité éprouvée', secondary: 'Des solutions robustes testées dans des conditions réelles.' },
        { primary: 'Support dédié', secondary: "Une équipe disponible pour vous accompagner à chaque étape." },
      ],
      image: teamImage1,
      imageFirst: false,
    },
    {
      title: 'Notre engagement',
      description:
        "Nous sommes engagés à vous fournir des services de qualité qui dépassent vos attentes et favorisent votre succès.",
      points: [
        { primary: 'Qualité garantie', secondary: "Des standards élevés pour un service irréprochable." },
        { primary: 'Innovation constante', secondary: 'Nous améliorons continuellement nos produits.' },
        { primary: 'Satisfaction client', secondary: 'Votre succès est notre priorité absolue.' },
      ],
      image: teamImage2,
      imageFirst: true,
    },
  ];


  return (
    <DifferentSection>
      {/* Titre et sous-titre */}
      <Typography variant="h3" fontWeight="bold" mb={2}>
        Ce qui nous distingue
      </Typography>
      <SubtitleText variant="body1">
        Découvrez pourquoi nos clients nous font confiance et ce qui rend nos solutions uniques sur le marché.
      </SubtitleText>


      {/* Illustration */}
      

      {/* Sections alternées */}
      {sections.map((section, index) => (
        <Grid container spacing={4} key={index} mb={4} direction={section.imageFirst ? 'row' : 'row-reverse'}>
          {/* Image */}
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              image={section.image}
              alt="Team working"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
              }}
            />
          </Grid>

          {/* Texte */}
          <Grid item xs={12} md={6} display="flex" alignItems="center">
            <Box>
              <Typography variant="h4" fontWeight="bold" mb={2}>
                {section.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={2}>
                {section.description}
              </Typography>
              <List>
                {section.points.map((point, idx) => (
                  <ListItem key={idx}>
                 <ListItemIcon>
  <CheckCircleIcon sx={{ fontSize: '30px', color: 'black' }} />
</ListItemIcon>
                    <ListText primary={point.primary} secondary={point.secondary} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>
      ))}
    </DifferentSection>
  );
};

export default WhatMakesUsDifferent;