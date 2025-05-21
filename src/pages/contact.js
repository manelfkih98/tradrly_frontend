import React from 'react';
import AllContact from '../components/contact/allContact';
import { Box, Typography, Divider, Card, CardContent } from '@mui/material';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';

const Contact = () => {
  return (
    <Box sx={{ margin: "auto", mt: 8, px: 2, minHeight: "100vh" }}>
      {/* En-tête de la page */}
      <Box display="flex" alignItems="center" mb={4}>
        <ContactMailOutlinedIcon sx={{ fontSize: 30, color: "#914091", mr: 1 }} />
        <Box>
          <Typography variant="h5" fontWeight="bold" color="#1E3A8A">
            Gestion des Contacts
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Visualisez et gérez les messages reçus via le formulaire de contact.
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Contenu principal */}
      <Card
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
      >
        <CardContent>
          <AllContact />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Contact;
