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
        title: 'What Makes Us Different',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum felis, sed ullamcorper tempus faucibus in imperdiet. Elementum felis, sed ullamcorper tempus faucibus in imperdiet.',
        points: [
          { primary: 'He takes less', secondary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
          { primary: 'No maintenance', secondary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
          { primary: 'Winchout hidden and integrated', secondary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        ],
        image: illustrationImage,
        imageFirst: true, // Texte à gauche, image à droite
      },
    {
      title: 'What Makes Us Different',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum felis, sed ullamcorper tempus faucibus in imperdiet. Elementum felis, sed ullamcorper tempus faucibus in imperdiet.',
      points: [
        { primary: 'He takes less', secondary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { primary: 'No maintenance', secondary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { primary: 'Winchout hidden and integrated', secondary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
      ],
      image: teamImage1,
      imageFirst: false, // Texte à gauche, image à droite
    },
    {
      title: 'What Makes Us Different',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum felis, sed ullamcorper tempus faucibus in imperdiet. Elementum felis, sed ullamcorper tempus faucibus in imperdiet.',
      points: [
        { primary: 'He takes less', secondary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { primary: 'No maintenance', secondary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { primary: 'Winchout hidden and integrated', secondary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
      ],
      image: teamImage2,
      imageFirst: true, // Image à gauche, texte à droite
    },
  ];

  return (
    <DifferentSection>
      {/* Titre et sous-titre */}
      <Typography variant="h3" fontWeight="bold" mb={2}>
        What Makes Us Different
      </Typography>
      <SubtitleText variant="body1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum felis, sed ullamcorper tempus faucibus in imperdiet.
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