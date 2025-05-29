import React, { useState } from 'react';
import { Box, Typography, TextField, Button, IconButton } from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useDispatch } from 'react-redux';
import { createContact } from '../store/services/contactService';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 35.52363962761327,
  lng: 11.031091393848422,
};

const ContactSection = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    object: '',
    subject: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.object) {
      errors.object = 'Object is required';
    }

    if (!formData.subject) {
      errors.subject = 'Subject is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const contactData = {
        object: formData.object,
        email: formData.email,
        subject: formData.subject,
      };

      dispatch(createContact(contactData));
      toast.success("Message sent successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      setFormData({ email: '', object: '', subject: '' });
      setFormErrors({});
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        width: '90%',
        minHeight: '100px',
        gap: { xs: 2, md: 4 },
        p: { xs: 2, md: 4 },
      }}
    >
      {/* Formulaire de contact */}
      <Box
        component="form"
        onSubmit={handleSubmit}
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
          Besoin d'aide ?
        </Typography>

        {/* Infos de contact */}
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
                '&:hover': { backgroundColor: '#e0e0e0' },
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
                '&:hover': { backgroundColor: '#e0e0e0' },
              }}
            >
              <Phone />
            </IconButton>
            <Typography variant="body2">+216 28163524</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              sx={{
                color: '#000',
                backgroundColor: '#f0f0f0',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                '&:hover': { backgroundColor: '#e0e0e0' },
              }}
            >
              <LocationOn />
            </IconButton>
            <Typography variant="body2">pépiniere d'entreprises APII Mahdia</Typography>
          </Box>
        </Box>

        {/* Champs du formulaire */}
        <TextField
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          error={!!formErrors.email}
          helperText={formErrors.email}
          fullWidth
          sx={{ backgroundColor: '#f9f9f9', borderRadius: '8px' }}
        />

        <TextField
          name="object"
          label="Object"
          value={formData.object}
          onChange={handleChange}
          error={!!formErrors.object}
          helperText={formErrors.object}
          fullWidth
          sx={{ backgroundColor: '#f9f9f9', borderRadius: '8px' }}
        />

        <TextField
          name="subject"
          label="Subject"
          value={formData.subject}
          onChange={handleChange}
          multiline
          rows={4}
          error={!!formErrors.subject}
          helperText={formErrors.subject}
          fullWidth
          sx={{ backgroundColor: '#f9f9f9', borderRadius: '8px' }}
        />

        <Button
          type="submit"
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

      {/* Google Map */}
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
          <Typography variant="body2">pépiniere d'entreprises APII Mahdia</Typography>
        </Box>
      </Box>

   
      <ToastContainer />
    </Box>
  );
};

export default ContactSection;
