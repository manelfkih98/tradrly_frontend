import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import lenovoLogo from '../../image/lonovo.png';
import slackLogo from '../../image/slack.png';
import youtubeLogo from '../../image/youtube.png';
import amazonLogo from '../../image/amazon.png';
import googleLogo from '../../image/google.png';
import microsoftLogo from '../../image/microsoft.png';
import axaj from '../../image/axaj.png';

const logos = [
  { src:axaj, alt: "Microsoft" },
  { src: lenovoLogo, alt: "Lenovo" },
  { src: slackLogo, alt: "Slack" },
  { src: youtubeLogo, alt: "YouTube" },
  { src: amazonLogo, alt: "Amazon" },
  { src: googleLogo, alt: "Google" },
  { src: microsoftLogo, alt: "Microsoft" },

];

const TrustedSection = () => {
  return (
    <Box sx={{ textAlign: 'center', py: 28, backgroundColor: '#fff' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom color="text.primary">
        They placed their trust in us
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
        We have <Box component="span" fontWeight="bold" display="inline">23k+</Box> Satisfied & Trusted Customers
      </Typography>

      <Grid container spacing={5} justifyContent="center" alignItems="center">
  {logos.map((logo, index) => (
    <Grid item key={index}>
      <Box
        sx={{
          width: 80, 
          height: 40, 
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          src={logo.src}
          alt={logo.alt}
          sx={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain", 
            filter: 'grayscale(100%) opacity(0.6)',
            transition: '0.3s',
            '&:hover': {
              filter: 'grayscale(0%) opacity(1)',
              transform: 'scale(1.05)',
            },
          }}
        />
      </Box>
    </Grid>
  ))}
</Grid>

    </Box>
  );
};

export default TrustedSection;
