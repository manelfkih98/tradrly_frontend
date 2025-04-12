import React from 'react';
import { Box, Typography, TextField, Button, IconButton } from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// Style pour la carte Google Maps
const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 35.502445,
  lng: 11.045721,
};

const ContactSection = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        width: '100%',
        minHeight: '500px',
        gap: { xs: 2, md: 4 },
        p: { xs: 2, md: 4 },
      }}
    >
      {/* Formulaire de contact */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: '#fff',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          p: { xs: 2, sm: 3, md: 4 },
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          minWidth: { xs: '100%', md: '400px' },
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Needs help?
        </Typography>

        {/* Informations de contact */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: '1.5rem',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              sx={{
                color: '#000',
                backgroundColor: '#f0f0f0',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                '&:hover': {
                  backgroundColor: '#e0e0e0',
                },
              }}
            >
              <Email />
            </IconButton>
            <Typography variant="body2">Tradyly@gmail.com</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              sx={{
                color: '#000',
                backgroundColor: '#f0f0f0',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                '&:hover': {
                  backgroundColor: '#e0e0e0',
                },
              }}
            >
              <Phone />
            </IconButton>
            <Typography variant="body2">+1 010 110 101</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              sx={{
                color: '#000',
                backgroundColor: '#f0f0f0',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                '&:hover': {
                  backgroundColor: '#e0e0e0',
                },
              }}
            >
              <LocationOn />
            </IconButton>
            <Typography variant="body2">Mahdia</Typography>
          </Box>
        </Box>

        {/* Formulaire */}
        <TextField
          label="Email"
          variant="outlined"
          placeholder="msi@sirnmple.com"
          fullWidth
          sx={{
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            fontSize: { xs: '0.9rem', sm: '1rem' },
            '& .MuiInputBase-input': {
              py: { xs: 1, sm: 1.5 },
            },
          }}
        />
        <TextField
          label="Object"
          variant="outlined"
          fullWidth
          sx={{
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            fontSize: { xs: '0.9rem', sm: '1rem' },
            '& .MuiInputBase-input': {
              py: { xs: 1, sm: 1.5 },
            },
          }}
        />
        <TextField
          label="Subject"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          sx={{
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            fontSize: { xs: '0.9rem', sm: '1rem' },
            '& .MuiInputBase-input': {
              py: { xs: 1, sm: 1.5 },
            },
          }}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: '#1c2526',
            color: '#fff',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            borderRadius: '8px',
            py: { xs: 1.2, sm: 1.5 },
            fontSize: { xs: '0.85rem', sm: '1rem' },
            '&:hover': {
              backgroundColor: '#2a3435',
            },
          }}
        >
          Send
        </Button>
      </Box>

      {/* Section Carte */}
      <Box
        sx={{
          flex: 1,
          position: 'relative',
          minHeight: { xs: '300px', md: 'auto' },
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <LoadScript googleMapsApiKey="AIzaSyBLxJk12yqUrHm72Pe0_j4qZho30exMhOA">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={12}
          >
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
        <Box
          sx={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#1c2526',
            color: '#fff',
            px: 2,
            py: 1,
            borderRadius: '8px',
          }}
        >
          <Typography variant="body2">Mahdia, Tunisia</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactSection;
