import React, { useState } from 'react';
import {
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  Box,
  Container,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { motion } from 'framer-motion';

const TestimonialsSection = () => {
  // Données fictives des témoignages
  const testimonials = [
    { name: 'Guillermo Rauch', title: 'PDG, Vercel', quote: 'L\'équipe a su combiner innovation et qualité dans une expérience remarquable.' },
    { name: 'Zeno Rocha', title: 'PDG, Resend', quote: 'Un travail exceptionnel alliant technologie de pointe et efficacité.' },
    { name: 'Chun Jiang', title: 'PDG, Monterey AI', quote: 'Une équipe remarquable qui comprend les besoins des clients.' },
    { name: 'Vlad Mietsiko', title: 'Co-fondateur, Inifsical', quote: 'Une expérience exceptionnelle du début à la fin.' },
    { name: 'Cherly Poty', title: 'PDG, Defer', quote: 'Une attention aux détails et une exécution impeccable.' },
    { name: 'Adam Carrigan', title: 'Co-fondateur, MindsDB', quote: 'Des résultats concrets avec une approche centrée sur l’innovation.' },
    { name: 'Mayan Salom', title: 'Co-fondateur, Elementary', quote: 'Une équipe engagée qui livre toujours au-delà des attentes.' },
    { name: 'Ashley Mulligan', title: 'Responsable produit, Flatfile', quote: 'Une expérience utilisateur fluide et bien pensée.' },
    { name: 'Mark Bao', title: 'Co-fondateur, Goody', quote: 'Des solutions efficaces adaptées aux besoins actuels.' },
  ];

  const [visibleCount, setVisibleCount] = useState(6);

  const afficherPlus = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <Box sx={{ bgcolor: 'white', py: 8, px: { xs: 2, sm: 4, lg: 8 } }}>
      <Container maxWidth="lg">
        {/* En-tête */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', lg: '4rem' },
              fontWeight: 'bold',
              lineHeight: 1.2,
            }}
          >
            Allier innovation et IA pour créer{' '}
            <Box component="span" sx={{ color: 'blue' }}>
              des solutions modernes et de qualité
            </Box>
          </Typography>
          <Typography
            variant="body1"
            sx={{ mt: 2, color: 'grey.500', fontSize: { xs: '0.875rem', sm: '1rem' } }}
          >
            Nous développons des solutions sur mesure basées sur l’intelligence artificielle.
          </Typography>
          <Button
            href="/blog"
            variant="contained"
            sx={{
              mt: 3,
              bgcolor: 'grey.800',
              color: 'white',
              borderRadius: '50px',
              py: 1.5,
              px: 4,
              textTransform: 'none',
              '&:hover': { bgcolor: 'grey.700' },
            }}
            endIcon={<ArrowForwardIcon />}
          >
            Découvrir notre blog
          </Button>
        </Box>

        {/* Section Témoignages */}
        <Box sx={{ mt: 10, textAlign: 'center' }}>
          <Typography
            variant="h3"
            sx={{ fontSize: { xs: '2rem', sm: '2.5rem' }, fontWeight: 'bold' }}
          >
            Avis de nos clients
          </Typography>
          <Typography
            variant="body1"
            sx={{ mt: 2, color: 'grey.500', fontSize: { xs: '0.875rem', sm: '1rem' } }}
          >
            Ce que disent nos partenaires et clients.
          </Typography>

          {/* Grille de témoignages */}
          <Grid container spacing={3} sx={{ mt: 4 }}>
            {testimonials.slice(0, visibleCount).map((testimonial, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      p: 3,
                      bgcolor: 'grey.50',
                      borderRadius: 2,
                      boxShadow: 1,
                      textAlign: 'left',
                    }}
                  >
                    <CardContent sx={{ p: 0 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ width: 48, height: 48, bgcolor: 'grey.300', mr: 2 }}>
                          {testimonial.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .slice(0, 2)
                            .toUpperCase()}
                        </Avatar>
                        <Box>
                          <Typography variant="h6" sx={{ fontSize: '1.125rem', fontWeight: 'medium' }}>
                            {testimonial.name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'grey.500', fontSize: '0.875rem' }}>
                            {testimonial.title}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          mt: 3,
                          color: 'grey.600',
                          fontSize: '1rem',
                          display: '-webkit-box',
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {testimonial.quote}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {/* Bouton Afficher plus */}
          {visibleCount < testimonials.length && (
            <Button
              variant="text"
              onClick={afficherPlus}
              sx={{
                mt: 4,
                color: 'blue',
                textTransform: 'none',
                fontWeight: 'medium',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Afficher plus
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default TestimonialsSection;
