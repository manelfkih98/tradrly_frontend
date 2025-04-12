import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Container,
  Button,
  Box,
} from '@mui/material';

// Import local images
import image1 from '../../image/app/image (1).png';
import image2 from '../../image/app/image (2).png';
import image3 from '../../image/app/image (3).png';
import image4 from '../../image/app/image (4).png';
import image5 from '../../image/app/image (5).png';
import image6 from '../../image/app/image 9.png';
import image7 from '../../image/app/image (1).png';
import image8 from '../../image/app/image (2).png';
import image9 from '../../image/app/image (3).png';

// Define portfolio items
const portfolioItems = [
  {
    image: image1,
    hashtag: '#Mobile app name',
    date: '12/09/2025',
  },
  {
    image: image2,
    hashtag: '#Mobile app name',
    date: '12/09/2025',
  },
  {
    image: image3,
    hashtag: '#Mobile app name',
    date: '12/09/2025',
  },
  {
    image: image4,
    hashtag: '#Mobile app name',
    date: '12/09/2025',
  },
  {
    image: image5,
    hashtag: '#Mobile app name',
    date: '12/09/2025',
  },
  {
    image: image6,
    hashtag: '#Mobile app name',
    date: '12/09/2025',
  },
  {
    image: image7,
    hashtag: '#Mobile app name',
    date: '12/09/2025',
  },
  {
    image: image8,
    hashtag: '#Mobile app name',
    date: '12/09/2025',
  },
  {
    image: image9,
    hashtag: '#Mobile app name',
    date: '12/09/2025',
  },
  {
    image: image1,
    hashtag: '#Mobile app name',
    date: '12/09/2025',
  },
];

const departments = [
  {
    name: 'Mobile apps',
    items: portfolioItems.slice(0, 5),
  },
  {
    name: 'Websites',
    items: portfolioItems.slice(5, 10),
  },
  {
    name: 'Designs',
    items: portfolioItems.slice(0, 5),
  },
  {
    name: 'Dashboards',
    items: portfolioItems.slice(5, 10),
  },
];

const WorkShowcase = () => {
  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ mb: 5 }}>
        OUR WORK IS BASED ON
      </Typography>

      {departments.map((department, deptIndex) => (
        <div key={deptIndex} style={{ marginBottom: '48px' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: deptIndex % 2 === 0 ? 'flex-start' : 'flex-end',
              marginBottom: '16px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 16px',
                border: '1px solid #1976d2',
                borderRadius: '20px',
                backgroundColor: '#fff',
                boxShadow: 1,
              }}
            >
              {/* Icon and department name */}
              <Typography
                variant="h6"
                sx={{
                  color: '#1976d2',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                {department.name}
              </Typography>
            </Box>
          </Box>

          {/* Cards container with horizontal scroll */}
          <div
            style={{
              display: 'flex',
              overflowX: 'auto',
              paddingBottom: '16px',
              scrollBehavior: 'smooth',
              scrollbarWidth: 'none',
            }}
          >
            {department.items.map((item, index) => (
              <div
                key={index}
                style={{
                  flex: '0 0 auto',
                  width: '33.33%',
                  minWidth: '300px',
                  padding: '0 12px',
                }}
              >
                <Card
                  sx={{
                    boxShadow: 3,
                    borderRadius: 2,
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.image}
                    alt={item.hashtag}
                    sx={{ objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
                  />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary">
                      {item.hashtag}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {item.date}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

        
          
        </div>
      ))}
    </Container>
  );
};

export default WorkShowcase;
