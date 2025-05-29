import React from "react";
import AllQcmJob from "../components/QCM/AllQcmJob";
import { Box, Typography, Card, CardContent, Divider } from "@mui/material";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import AllEntretien from "../components/RH/AllEntretien";

const Rh = () => {
  return (
    <Box sx={{ margin: "auto", mt: 8, px: 2, minHeight: "100vh" }}>
      {/* En-tête de la page */}
      <Box display="flex" alignItems="center" mb={4}>
        <FactCheckIcon sx={{ fontSize: 30, color: "#914091", mr: 1 }} />
        <Box>
          <Typography variant="h5" fontWeight="bold" color="#1E3A8A">
            Espace Résultats QCM
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Retrouvez ici les résultats de tests passés par les candidats.
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
          <AllEntretien />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Rh;
