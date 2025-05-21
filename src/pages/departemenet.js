import React from "react";
import { Box, Typography, Divider, Card, CardContent } from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ListeDepartement from "../components/departement/ListeDepartement ";

const Departement = () => {
  return (
    <Box sx={{ margin: "auto", mt: 8, px: 2, minHeight: "100vh",  }}>
      {/* Header de la page */}
      <Box display="flex" alignItems="center" mb={4}>
        <ApartmentIcon sx={{ fontSize: 30, color: "#914091", mr: 1, transition: "color 0.3s" }} />
        <Box>
          <Typography variant="h5" fontWeight="bold" color="#1E3A8A">
            Gestion des Départements
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 4, borderColor: "#E5E7EB" }} />

      {/* Contenu principal */}
      <Card
        sx={{
          backgroundColor: "#FFFFFF",
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
      >
        <CardContent>
          <ListeDepartement />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Departement;