// TestimonialsSection.jsx
import React from 'react';
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

const TestimonialsSection = () => {
  // Sample data for testimonials (you can replace this with real data or fetch from an API)
  const testimonials = [
    {
      name: 'Guillermo Rauch',
      title: 'CEO, Vercel',
      quote: 'The xyteam absolutely nailed combining xyz and abc in a delightful experience.',
    },
    {
      name: 'Zeno Rocha',
      title: 'CEO, Resend',
      quote: 'The xyteam absolutely nailed combining xyz and abc in a delightful experience. The xyteam absolutely nailed combining xyz and abc in a delightful experience.',
    },
    {
      name: 'Chun Jiang',
      title: 'CEO, Monterey AI',
      quote: 'The xyteam absolutely nailed combining xyz and abc in a delightful experience.',
    },
    {
      name: 'Vlad Mietsiko',
      title: 'Co-founder, Inifsical',
      quote: 'The xyteam absolutely nailed combining xyz and abc in a delightful experience. The xyteam absolutely nailed combining xyz and abc in a delightful experience.',
    },
    {
      name: 'Cherly Poty',
      title: 'CEO, Defer',
      quote: 'The xyteam absolutely nailed combining xyz and abc in a delightful experience. The xyteam absolutely nailed combining xyz and abc in a delightful experience.',
    },
    {
      name: 'Adam Carrigan',
      title: 'Co-founder, MindsDB',
      quote: 'The xyteam absolutely nailed combining xyz and abc in a delightful experience.',
    },
    {
      name: 'Mayan Salom',
      title: 'Co-founder, Elementary',
      quote: 'The xyteam absolutely nailed combining xyz and abc in a delightful experience. The xyteam absolutely nailed combining xyz and abc in a delightful experience.',
    },
    {
      name: 'Ashley Mulligan',
      title: 'Head of Product Engineering, Flatfile',
      quote: 'The xyteam absolutely nailed combining xyz and abc in a delightful experience. The xyteam absolutely nailed combining xyz and abc in a delightful experience.',
    },
    {
      name: 'Mark Bao',
      title: 'Co-founder, Goody',
      quote: 'The xyteam absolutely nailed combining xyz and abc in a delightful experience. The xyteam absolutely nailed combining xyz and abc in a delightful experience.',
    },
  ];

  return (
    <Box sx={{ bgcolor: 'white', py: 8, px: { xs: 2, sm: 4, lg: 8 } }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', lg: '4rem' },
              fontWeight: 'bold',
              lineHeight: 1.2,
            }}
          >
            innovation and AI to create{' '}
            <Box component="span" sx={{ color: 'blue' }}>
              cutting-edge, high-quality
            </Box>{' '}
            solutions
          </Typography>
          <Typography
            variant="body1"
            sx={{ mt: 2, color: 'grey.500', fontSize: { xs: '0.875rem', sm: '1rem' } }}
          >
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
          <Button
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
            Discover our blog
          </Button>
        </Box>

        {/* Clients' Thoughts Section */}
        <Box sx={{ mt: 10, textAlign: 'center' }}>
          <Typography
            variant="h3"
            sx={{ fontSize: { xs: '2rem', sm: '2.5rem' }, fontWeight: 'bold' }}
          >
            Clients’ Thoughts
          </Typography>
          <Typography
            variant="body1"
            sx={{ mt: 2, color: 'grey.500', fontSize: { xs: '0.875rem', sm: '1rem' } }}
          >
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>

          {/* Testimonials Grid */}
          <Grid container spacing={3} sx={{ mt: 4 }}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
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
                      <Avatar
                        sx={{ width: 48, height: 48, bgcolor: 'grey.300', mr: 2 }}
                      />
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
                      sx={{ mt: 3, color: 'grey.600', fontSize: '1rem' }}
                    >
                      {testimonial.quote}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Show More Button */}
          <Button
            variant="text"
            sx={{
              mt: 4,
              color: 'blue',
              textTransform: 'none',
              fontWeight: 'medium',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Show more
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default TestimonialsSection;